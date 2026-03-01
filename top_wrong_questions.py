#!/usr/bin/env python3
"""Print the most-missed quiz questions from question_history.csv."""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass
from datetime import date, datetime, timedelta
from pathlib import Path


@dataclass
class QuestionStats:
    question: str
    week: str
    incorrect: int = 0
    total: int = 0
    correct_choice: str = ""
    answer_counts: dict[str, int] | None = None

    @property
    def miss_rate(self) -> float:
        if self.total == 0:
            return 0.0
        return (self.incorrect / self.total) * 100.0

    def __post_init__(self) -> None:
        if self.answer_counts is None:
            self.answer_counts = {"A": 0, "B": 0, "C": 0, "D": 0}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Print the top N questions students get wrong."
    )
    parser.add_argument(
        "--history",
        default="question_history.csv",
        help="Path to question history CSV (default: question_history.csv).",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Number of rows to print (default: 20).",
    )
    parser.add_argument(
        "--week",
        default="",
        help=(
            "Filter to the calendar week containing this date "
            "(supports M/D/YYYY or M/D/YY, e.g. 2/28/2026 or 2/28/26)."
        ),
    )
    parser.add_argument(
        "--bank",
        default="question_bank.csv",
        help="Path to question bank CSV for answer text lookup (default: question_bank.csv).",
    )
    return parser.parse_args()


def parse_user_date(text: str) -> date:
    value = text.strip()
    for fmt in ("%m/%d/%Y", "%m/%d/%y"):
        try:
            return datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    raise ValueError(
        f"Invalid --week value '{text}'. Use M/D/YYYY or M/D/YY, for example 2/28/2026."
    )


def sunday_to_saturday_window(day: date) -> tuple[date, date]:
    # US-style week window: Sunday through Saturday.
    days_since_sunday = (day.weekday() + 1) % 7
    week_start = day - timedelta(days=days_since_sunday)
    week_end = week_start + timedelta(days=6)
    return week_start, week_end


def row_date(row: dict[str, str]) -> date | None:
    raw = str(row.get("timestamp", "")).strip()
    if not raw:
        return None
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00")).date()
    except ValueError:
        return None


def load_stats(
    history_path: Path, week_start: date | None = None, week_end: date | None = None
) -> dict[str, QuestionStats]:
    if not history_path.exists():
        raise FileNotFoundError(f"History file not found: {history_path}")

    stats: dict[str, QuestionStats] = {}
    with history_path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            if week_start and week_end:
                d = row_date(row)
                if d is None or d < week_start or d > week_end:
                    continue
            question = str(row.get("question", "")).strip()
            if not question:
                continue
            question_key = str(row.get("question_key", "")).strip() or question
            week = str(row.get("week", "")).strip()
            result = str(row.get("result", "")).strip().lower()
            selected = str(row.get("selected_choice", "")).strip().upper()
            correct = str(row.get("correct_choice", "")).strip().upper()

            entry = stats.get(question_key)
            if entry is None:
                entry = QuestionStats(question=question, week=week)
                stats[question_key] = entry

            entry.total += 1
            if selected in {"A", "B", "C", "D"}:
                entry.answer_counts[selected] += 1
            if correct in {"A", "B", "C", "D"} and not entry.correct_choice:
                entry.correct_choice = correct
            if result == "incorrect":
                entry.incorrect += 1

    return stats


def load_answer_text_map(bank_path: Path) -> dict[str, dict[str, str]]:
    if not bank_path.exists():
        return {}
    out: dict[str, dict[str, str]] = {}
    with bank_path.open("r", encoding="utf-8", newline="") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            question = str(row.get("question", "")).strip()
            if not question:
                continue
            out[question] = {
                "A": str(row.get("choice_a", "")).strip(),
                "B": str(row.get("choice_b", "")).strip(),
                "C": str(row.get("choice_c", "")).strip(),
                "D": str(row.get("choice_d", "")).strip(),
            }
    return out


def print_report(
    stats: dict[str, QuestionStats],
    limit: int,
    answer_text_map: dict[str, dict[str, str]],
    week_start: date | None = None,
    week_end: date | None = None,
) -> None:
    rows = [item for item in stats.values() if item.incorrect > 0]
    rows.sort(key=lambda s: (-s.incorrect, -s.miss_rate, -s.total, s.question.lower()))

    print("Top Most-Missed Questions")
    print("=" * 72)
    if week_start and week_end:
        print(f"Week Filter: {week_start.isoformat()} to {week_end.isoformat()} (Sunday-Saturday)")
        print("=" * 72)
    if not rows:
        print("No incorrect answers found in the history file.")
        return

    limit = max(1, limit)
    for idx, row in enumerate(rows[:limit], start=1):
        week_label = row.week if row.week else "N/A"
        print(
            f"{idx:>2}. Wrong: {row.incorrect:>3} | Attempts: {row.total:>3} | "
            f"Miss Rate: {row.miss_rate:>5.1f}% | Week: {week_label}"
        )
        print(f"    {row.question}")
        choice_texts = answer_text_map.get(row.question, {})
        for letter in ("A", "B", "C", "D"):
            marker = " (correct)" if row.correct_choice == letter else ""
            choice_text = choice_texts.get(letter, "")
            if choice_text:
                print(f"    {letter}: {row.answer_counts[letter]:>3}{marker} | {choice_text}")
            else:
                print(f"    {letter}: {row.answer_counts[letter]:>3}{marker}")


def main() -> None:
    args = parse_args()
    history_path = Path(args.history).expanduser().resolve()
    bank_path = Path(args.bank).expanduser().resolve()
    week_start: date | None = None
    week_end: date | None = None
    if args.week:
        anchor_day = parse_user_date(args.week)
        week_start, week_end = sunday_to_saturday_window(anchor_day)
    stats = load_stats(history_path, week_start=week_start, week_end=week_end)
    answer_text_map = load_answer_text_map(bank_path)
    print_report(
        stats,
        args.limit,
        answer_text_map=answer_text_map,
        week_start=week_start,
        week_end=week_end,
    )


if __name__ == "__main__":
    main()
