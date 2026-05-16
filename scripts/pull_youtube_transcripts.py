#!/usr/bin/env python3
"""Pull YouTube transcripts for course video lists into note folders."""

from __future__ import annotations

import argparse
import logging
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from requests import exceptions as requests_exceptions


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_COURSE = "Network+"
VIDEO_LIST_RELATIVE = Path("notes-content") / "Notes List A - Video Content" / "video-list.md"
TRANSCRIPT_NAME = "Transcript.md"
VIDEO_LINE_PATTERN = re.compile(
    r"^- ([0-9.]+): \[(.+?) \((\d+:\d+(?::\d+)?)\)\]\((https?://[^\s)]+)\)\s*$"
)
INVALID_PATH_CHARS = re.compile(r'[<>:"/\\|?*]')


@dataclass(slots=True)
class VideoEntry:
    day: str
    objective: str
    title: str
    duration: str
    url: str
    video_id: str
    ordinal: int

    @property
    def folder_name(self) -> str:
        title = INVALID_PATH_CHARS.sub("", self.title).strip().rstrip(".")
        title = re.sub(r"\s+", " ", title)
        return f"Video {self.ordinal} - {title}"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Fetch Professor Messer transcripts from a course video list."
    )
    parser.add_argument(
        "--course",
        default=DEFAULT_COURSE,
        help="Course folder under courses/. Default: Network+",
    )
    parser.add_argument(
        "--day",
        action="append",
        default=[],
        help="Only pull videos from a specific day heading, e.g. 'Day 1'. Repeatable.",
    )
    parser.add_argument(
        "--match",
        default="",
        help="Only pull videos whose objective or title contains this text.",
    )
    parser.add_argument(
        "--start-objective",
        default="",
        help="Only pull videos whose objective is at or after this objective code.",
    )
    parser.add_argument(
        "--end-objective",
        default="",
        help="Only pull videos whose objective is at or before this objective code.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=0,
        help="Only pull the first N matching videos.",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing transcript files.",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="Enable debug logging while diagnosing fetch issues.",
    )
    parser.add_argument(
        "--fail-fast",
        action="store_true",
        help="Stop on the first transcript fetch failure.",
    )
    return parser.parse_args()


def configure_logging(verbose: bool) -> None:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(level=level, format="%(levelname)s: %(message)s")


def extract_youtube_id(url: str) -> str:
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if host == "youtu.be":
        return parsed.path.lstrip("/").split("/")[0]
    if host in {"youtube.com", "www.youtube.com", "m.youtube.com"}:
        if parsed.path == "/watch":
            return parse_qs(parsed.query).get("v", [""])[0]
        parts = [part for part in parsed.path.split("/") if part]
        if parts and parts[0] in {"embed", "shorts"} and len(parts) > 1:
            return parts[1]
    return ""


def load_video_entries(course_root: Path) -> list[VideoEntry]:
    video_list_path = course_root / VIDEO_LIST_RELATIVE
    if not video_list_path.is_file():
        raise FileNotFoundError(f"Missing video list: {video_list_path.relative_to(ROOT)}")

    entries: list[VideoEntry] = []
    current_day = ""
    ordinal = 0
    for raw_line in video_list_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if line.startswith("## "):
            current_day = line[3:].strip()
            continue
        match = VIDEO_LINE_PATTERN.match(line)
        if not match:
            continue
        objective, title, duration, url = match.groups()
        video_id = extract_youtube_id(url)
        if not video_id:
            logging.warning("Skipping line with no YouTube ID: %s", line)
            continue
        ordinal += 1
        entries.append(
            VideoEntry(
                day=current_day,
                objective=objective,
                title=title,
                duration=duration,
                url=url,
                video_id=video_id,
                ordinal=ordinal,
            )
        )
    return entries


def filter_entries(entries: list[VideoEntry], args: argparse.Namespace) -> list[VideoEntry]:
    filtered = entries
    if args.day:
        day_set = {day.casefold() for day in args.day}
        filtered = [entry for entry in filtered if entry.day.casefold() in day_set]
    if args.match:
        needle = args.match.casefold()
        filtered = [
            entry
            for entry in filtered
            if needle in entry.title.casefold() or needle in entry.objective.casefold()
        ]
    if args.start_objective:
        start_key = objective_sort_key(args.start_objective)
        filtered = [
            entry for entry in filtered if objective_sort_key(entry.objective) >= start_key
        ]
    if args.end_objective:
        end_key = objective_sort_key(args.end_objective)
        filtered = [
            entry for entry in filtered if objective_sort_key(entry.objective) <= end_key
        ]
    if args.limit > 0:
        filtered = filtered[: args.limit]
    return filtered


def objective_sort_key(objective: str) -> tuple[int, ...]:
    parts = []
    for part in objective.split("."):
        if part.isdigit():
            parts.append(int(part))
        else:
            parts.append(-1)
    return tuple(parts)


def timestamp_from_seconds(seconds: float) -> str:
    whole = max(int(seconds), 0)
    hours, remainder = divmod(whole, 3600)
    minutes, secs = divmod(remainder, 60)
    if hours:
        return f"{hours:02d}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def build_transcript_markdown(entry: VideoEntry, transcript: list[object]) -> str:
    lines = [
        f"# [Video {entry.ordinal} - {entry.title}]({entry.url})",
        "",
        f"## {entry.objective} - {entry.title}",
        "",
        f"- Day: {entry.day or 'Unlabeled'}",
        f"- Duration: {entry.duration}",
        "",
        "## Transcript",
        "",
    ]
    for snippet in transcript:
        text = " ".join(str(snippet.text).split())
        if not text:
            continue
        lines.append(f"- `{timestamp_from_seconds(float(snippet.start))}` {text}")
    lines.append("")
    return "\n".join(lines)


def ensure_transcript(
    course_root: Path,
    entry: VideoEntry,
    transcript: list[object],
    overwrite: bool,
) -> tuple[Path, bool]:
    note_root = course_root / "notes-content" / "Notes List A - Video Content" / entry.folder_name
    note_root.mkdir(parents=True, exist_ok=True)
    transcript_path = note_root / TRANSCRIPT_NAME
    if transcript_path.exists() and not overwrite:
        return transcript_path, False
    transcript_path.write_text(
        build_transcript_markdown(entry, transcript),
        encoding="utf-8",
    )
    return transcript_path, True


def main() -> int:
    args = parse_args()
    configure_logging(args.verbose)

    course_root = ROOT / "courses" / args.course
    if not course_root.is_dir():
        logging.error("Course folder not found: courses/%s", args.course)
        return 1

    entries = filter_entries(load_video_entries(course_root), args)
    if not entries:
        logging.error("No matching videos found in %s", VIDEO_LIST_RELATIVE.as_posix())
        return 1

    sys.path.insert(0, str(ROOT / "tools" / "yt" / "lib" / "python3.12" / "site-packages"))
    from youtube_transcript_api import YouTubeTranscriptApi

    api = YouTubeTranscriptApi()
    written = 0
    skipped = 0
    failed = 0

    for entry in entries:
        logging.info("Fetching transcript for %s (%s)", entry.title, entry.video_id)
        try:
            transcript = api.fetch(entry.video_id)
            path, did_write = ensure_transcript(course_root, entry, transcript, args.overwrite)
            if did_write:
                written += 1
                logging.info("Wrote %s", path.relative_to(ROOT).as_posix())
            else:
                skipped += 1
                logging.info("Skipped existing %s", path.relative_to(ROOT).as_posix())
        except requests_exceptions.RequestException as exc:
            failed += 1
            logging.error("Network fetch failed for %s: %s", entry.video_id, exc)
            if args.fail_fast:
                break
        except Exception as exc:
            failed += 1
            logging.error("Transcript fetch failed for %s: %s", entry.video_id, exc)
            if args.fail_fast:
                break

    logging.info(
        "Finished: wrote %s transcript(s), skipped %s existing file(s), failed %s video(s)",
        written,
        skipped,
        failed,
    )
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
