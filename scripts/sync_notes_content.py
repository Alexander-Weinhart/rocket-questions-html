#!/usr/bin/env python3
"""Copy markdown note folders into the web app and generate a tree manifest."""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[2]
WEB_ROOT = PROJECT_ROOT / "rocket-questions-html"
NOTES_TARGET = WEB_ROOT / "notes-content"
MANIFEST_PATH = WEB_ROOT / "notes-manifest.json"

SOURCE_DIRS = [
    {
        "source": PROJECT_ROOT / "MASTER LIST",
        "target_name": "MASTER LIST",
    },
    {
        "source": PROJECT_ROOT / "Notes List A - Video Content",
        "target_name": "Notes List A - Video Content",
    },
    {
        "source": PROJECT_ROOT / "Notes List B - Textbook Content",
        "target_name": "Notes List B - Textbook Content",
    },
    {
        "source": PROJECT_ROOT / "Notes List C - Personal Notes",
        "target_name": "Notes List C - Alex's Personal Notes",
    },
]

LEGACY_NOTES_TARGETS = [
    "Notes List C - Personal Notes",
    "Notes List C - Alex's Notes",
]


def natural_sort_key(path: Path) -> tuple[int, list[object]]:
    parts = re.split(r"(\d+)", path.name.lower())
    key: list[object] = []
    for part in parts:
        if part.isdigit():
            key.append(int(part))
        elif part:
            key.append(part)
    return (1 if path.is_file() else 0, key)


def set_readable_permissions(path: Path) -> None:
    if path.is_dir():
        path.chmod(0o755)
        for child in path.iterdir():
            set_readable_permissions(child)
        return
    path.chmod(0o644)


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


def main() -> None:
    NOTES_TARGET.mkdir(parents=True, exist_ok=True)
    NOTES_TARGET.chmod(0o755)

    for legacy_name in LEGACY_NOTES_TARGETS:
        legacy_path = NOTES_TARGET / legacy_name
        if legacy_path.exists():
            shutil.rmtree(legacy_path)

    for entry in SOURCE_DIRS:
        source = entry["source"]
        target_name = entry["target_name"]
        if not source.exists():
            raise FileNotFoundError(f"Missing notes source: {source}")
        destination = NOTES_TARGET / target_name
        if destination.exists():
            shutil.rmtree(destination)
        shutil.copytree(source, destination)
        set_readable_permissions(destination)

    roots = []
    for entry in SOURCE_DIRS:
        copied_root = NOTES_TARGET / entry["target_name"]
        node = build_tree(copied_root, NOTES_TARGET)
        if node is not None:
            roots.append(node)

    manifest = {
        "roots": roots,
        "defaultNote": "MASTER LIST/Master List.md",
    }
    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    MANIFEST_PATH.chmod(0o644)

    print(f"Copied {len(SOURCE_DIRS)} note folders into {NOTES_TARGET}")
    print(f"Wrote manifest to {MANIFEST_PATH}")


if __name__ == "__main__":
    main()
