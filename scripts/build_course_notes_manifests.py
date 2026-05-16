#!/usr/bin/env python3
"""Generate notes manifests for each course/certification content root."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
COURSES_ROOT = ROOT / "courses"
COURSE_DEFAULT_NOTES = {
    "Network+": [
        "SURVIVAL GUIDE.md",
        "MASTER LIST/Exam Objectives.md",
        "MASTER LIST/Master List.md",
    ],
}
YOUTUBE_URL_PATTERN = re.compile(
    r"https?://(?:www\.)?(?:youtube\.com/watch\?[^\s)]+|youtu\.be/[^\s)]+)",
    re.IGNORECASE,
)


def natural_sort_key(path: Path) -> tuple[int, list[object]]:
    parts = re.split(r"(\d+)", path.name.lower())
    key: list[object] = []
    for part in parts:
        if part.isdigit():
            key.append((0, int(part)))
        elif part:
            key.append((1, part))
    return (1 if path.is_file() else 0, key)


def extract_youtube_url(markdown: str) -> str:
    if not markdown:
        return ""
    match = YOUTUBE_URL_PATTERN.search(markdown)
    return match.group(0) if match else ""


def extract_youtube_id(url: str) -> str:
    if not url:
        return ""
    from urllib.parse import parse_qs, urlparse

    parsed = urlparse(url)
    host = parsed.hostname.lower() if parsed.hostname else ""
    if host == "youtu.be":
        return parsed.path.lstrip("/").split("/")[0]
    if host in {"youtube.com", "www.youtube.com", "m.youtube.com"}:
        if parsed.path == "/watch":
            return parse_qs(parsed.query).get("v", [""])[0]
        parts = [part for part in parsed.path.split("/") if part]
        if parts and parts[0] in {"embed", "shorts"}:
            return parts[1] if len(parts) > 1 else ""
    return ""


def is_video_folder_markdown(path: Path, path_parts: tuple[str, ...]) -> bool:
    if len(path_parts) < 3:
        return False
    if path_parts[0] != "Notes List A - Video Content":
        return False
    return path.name.lower() == "video notes.md"


def build_tree(path: Path, relative_root: Path) -> dict | None:
    relative_path = path.relative_to(relative_root).as_posix()
    if path.is_dir():
        children = []
        for child in sorted(path.iterdir(), key=natural_sort_key):
            node = build_tree(child, relative_root)
            if node is not None:
                children.append(node)
        if not children:
            return None
        return {
            "type": "directory",
            "name": path.name,
            "path": relative_path,
            "children": children,
        }
    if path.suffix.lower() != ".md":
        return None
    path_parts = Path(relative_path).parts
    is_video_folder_note = len(path_parts) >= 3 and path_parts[0] == "Notes List A - Video Content"
    is_video_note = is_video_folder_markdown(path, path_parts)
    node = {
        "type": "file",
        "name": path.name,
        "path": relative_path,
        "video": is_video_folder_note,
        "Video": "true" if is_video_folder_note else "false",
        "youtubeVideo": False,
    }
    if is_video_note:
        markdown = path.read_text(encoding="utf-8")
        youtube_url = extract_youtube_url(markdown)
        youtube_id = extract_youtube_id(youtube_url)
        if youtube_url and youtube_id:
            node["youtubeVideo"] = True
            node["videoUrl"] = youtube_url
            node["videoId"] = youtube_id
    return node


def choose_default_note(course_root: Path, notes_root: Path, roots: list[dict]) -> str:
    preferred = COURSE_DEFAULT_NOTES.get(course_root.name, [
        "MASTER LIST/Master List.md",
        "MASTER LIST/Exam Objectives.md",
        "SURVIVAL GUIDE.md",
    ])
    for candidate in preferred:
        if (notes_root / candidate).exists():
            return candidate

    def first_file(nodes: list[dict]) -> str:
        for node in nodes:
            if node.get("type") == "file":
                return str(node.get("path") or "")
            child = first_file(node.get("children") or [])
            if child:
                return child
        return ""

    return first_file(roots)


def build_manifest_for_course(course_root: Path) -> bool:
    notes_root = course_root / "notes-content"
    if not notes_root.is_dir():
        return False

    roots = []
    for child in sorted(notes_root.iterdir(), key=natural_sort_key):
        node = build_tree(child, notes_root)
        if node is not None:
            roots.append(node)

    manifest = {
        "roots": roots,
        "defaultNote": choose_default_note(course_root, notes_root, roots),
    }
    (course_root / "notes-manifest.json").write_text(
        json.dumps(manifest, indent=2),
        encoding="utf-8",
    )
    return True


def main() -> None:
    built = []
    for course_root in sorted(COURSES_ROOT.iterdir(), key=natural_sort_key):
        if build_manifest_for_course(course_root):
            built.append(course_root.name)
    print(f"Built {len(built)} course notes manifest(s): {', '.join(built)}")


if __name__ == "__main__":
    main()
