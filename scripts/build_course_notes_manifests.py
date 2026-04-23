#!/usr/bin/env python3
"""Generate notes manifests for each course/certification content root."""

from __future__ import annotations

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
COURSES_ROOT = ROOT / "courses"


def natural_sort_key(path: Path) -> tuple[int, list[object]]:
    parts = re.split(r"(\d+)", path.name.lower())
    key: list[object] = []
    for part in parts:
        if part.isdigit():
            key.append((0, int(part)))
        elif part:
            key.append((1, part))
    return (1 if path.is_file() else 0, key)


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
    return {
        "type": "file",
        "name": path.name,
        "path": relative_path,
    }


def choose_default_note(notes_root: Path, roots: list[dict]) -> str:
    preferred = [
        "MASTER LIST/Master List.md",
        "MASTER LIST/Exam Objectives.md",
        "SURVIVAL GUIDE.md",
    ]
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
        "defaultNote": choose_default_note(notes_root, roots),
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
