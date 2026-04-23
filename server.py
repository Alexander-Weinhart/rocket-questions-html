#!/usr/bin/env python3
"""Static server + append-only API endpoints for server-side logging."""

from __future__ import annotations

import csv
import json
import os
import re
import sys
import threading
from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def _resolve_records_root() -> Path:
    """Choose where changes/history CSV files are stored."""
    env_root = os.environ.get("PRACTICE_QUIZ_RECORDS_DIR", "").strip()
    if not env_root:
        return Path("/home/citadel/practice-quiz-records").expanduser()

    configured = Path(env_root).expanduser()
    # Guard against web-root writes; keep records in this project directory instead.
    try:
        if configured.resolve().as_posix().startswith("/var/www/html"):
            return ROOT
    except OSError:
        pass
    return configured


RECORDS_ROOT = _resolve_records_root()
CHANGES_PATH = RECORDS_ROOT / "changes.csv"
HISTORY_PATH = RECORDS_ROOT / "question_history.csv"
LOCK = threading.Lock()
ALLOWED_CORS_ORIGINS = {
    "https://alex-online.win",
    "http://alex-online.win",
    "http://localhost:3003",
    "http://127.0.0.1:3003",
}

PREFERRED_HEADERS = [
    "timestamp",
    "action",
    "question_key",
    "question_id",
    "week",
    "question",
    "choice_a",
    "choice_b",
    "choice_c",
    "choice_d",
    "correct_choice",
    "explanation",
    "difficulty",
    "level",
    "concept_key",
    "aspect_key",
    "source_path",
    "user_feedback",
]
HISTORY_HEADERS = [
    "timestamp",
    "question_key",
    "question_id",
    "question",
    "selected_choice",
    "correct_choice",
    "result",
    "difficulty",
    "week",
    "source_path",
]
SQLI_PATTERN = re.compile(
    r"(--|/\*|\*/)",
    re.IGNORECASE,
)


def _read_existing_rows(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    if not path.exists() or path.stat().st_size == 0:
        return [], []
    with path.open("r", newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        headers = list(reader.fieldnames or [])
        rows = [{k: (v or "") for k, v in row.items()} for row in reader]
    return headers, rows


def _read_text(path: Path) -> str:
    if not path.exists():
        return ""
    return path.read_text(encoding="utf-8")


def _merge_headers(existing: list[str], row_keys: list[str]) -> list[str]:
    merged: list[str] = []
    for h in PREFERRED_HEADERS:
        if h in existing or h in row_keys:
            merged.append(h)
    for h in existing:
        if h not in merged:
            merged.append(h)
    for h in row_keys:
        if h not in merged:
            merged.append(h)
    return merged or list(PREFERRED_HEADERS)


def append_change_row(payload: dict[str, object]) -> None:
    if not isinstance(payload, dict):
        raise ValueError("payload must be a JSON object")

    row = {str(k): ("" if v is None else str(v)) for k, v in payload.items()}
    feedback = row.get("user_feedback", "").strip()
    if not feedback:
        raise ValueError("user_feedback is required")
    if len(feedback) > 1000:
        raise ValueError("user_feedback too long (max 1000 characters)")
    if any(ord(ch) < 32 and ch not in {"\n", "\r", "\t"} for ch in feedback):
        raise ValueError("user_feedback contains invalid control characters")
    if SQLI_PATTERN.search(feedback):
        raise ValueError("user_feedback contains blocked SQL-like patterns")
    row["user_feedback"] = feedback
    if not row.get("timestamp"):
        row["timestamp"] = datetime.now().isoformat(timespec="seconds")

    with LOCK:
        headers, existing_rows = _read_existing_rows(CHANGES_PATH)
        merged_headers = _merge_headers(headers, list(row.keys()))
        existing_rows.append(row)

        tmp_path = CHANGES_PATH.with_suffix(".csv.tmp")
        with tmp_path.open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=merged_headers, extrasaction="ignore")
            writer.writeheader()
            for existing in existing_rows:
                writer.writerow({h: existing.get(h, "") for h in merged_headers})
        tmp_path.replace(CHANGES_PATH)


def append_history_row(payload: dict[str, object]) -> None:
    if not isinstance(payload, dict):
        raise ValueError("payload must be a JSON object")

    row = {str(k): ("" if v is None else str(v)) for k, v in payload.items()}
    if not row.get("question", "").strip():
        raise ValueError("question is required")
    selected = row.get("selected_choice", "").strip().upper()
    correct = row.get("correct_choice", "").strip().upper()
    if selected not in {"A", "B", "C", "D", "E"}:
        raise ValueError("selected_choice must be A/B/C/D/E")
    if correct not in {"A", "B", "C", "D"}:
        raise ValueError("correct_choice must be A/B/C/D")
    result = row.get("result", "").strip().lower()
    if result not in {"correct", "incorrect"}:
        raise ValueError("result must be correct or incorrect")
    row["selected_choice"] = selected
    row["correct_choice"] = correct
    row["result"] = result
    if not row.get("timestamp"):
        row["timestamp"] = datetime.now().isoformat(timespec="seconds")

    with LOCK:
        headers, existing_rows = _read_existing_rows(HISTORY_PATH)
        merged_headers = _merge_headers(headers, HISTORY_HEADERS)
        existing_rows.append(row)

        tmp_path = HISTORY_PATH.with_suffix(".csv.tmp")
        with tmp_path.open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=merged_headers, extrasaction="ignore")
            writer.writeheader()
            for existing in existing_rows:
                writer.writerow({h: existing.get(h, "") for h in merged_headers})
        tmp_path.replace(HISTORY_PATH)


class RequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def _send_cors_headers(self) -> None:
        origin = self.headers.get("Origin", "").strip()
        if origin in ALLOWED_CORS_ORIGINS:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        else:
            self.send_header("Access-Control-Allow-Origin", "https://alex-online.win")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "86400")

    def _send_json(self, code: int, body: dict[str, object]) -> None:
        data = json.dumps(body).encode("utf-8")
        self.send_response(code)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _send_text(self, code: int, text: str, content_type: str) -> None:
        data = text.encode("utf-8")
        self.send_response(code)
        self._send_cors_headers()
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self._send_cors_headers()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        path = self.path.split("?", 1)[0].rstrip("/")
        if path.endswith("/api/changes"):
            self._send_text(200, _read_text(CHANGES_PATH), "text/csv; charset=utf-8")
            return
        if path.endswith("/api/history"):
            self._send_json(405, {"ok": False, "error": "History is append-only. Use POST /api/history."})
            return
        super().do_GET()

    def do_DELETE(self) -> None:  # noqa: N802
        self._send_json(405, {"ok": False, "error": "Delete is not supported."})

    def do_PUT(self) -> None:  # noqa: N802
        self._send_json(405, {"ok": False, "error": "Replace is not supported."})

    def do_PATCH(self) -> None:  # noqa: N802
        self._send_json(405, {"ok": False, "error": "Update is not supported."})

    def do_POST(self) -> None:  # noqa: N802
        path = self.path.split("?", 1)[0].rstrip("/")
        if path.endswith("/api/changes"):
            try:
                length = int(self.headers.get("Content-Length", "0"))
                body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
                payload = json.loads(body or "{}")
                append_change_row(payload)
            except Exception as exc:  # pragma: no cover - runtime guard
                self._send_json(400, {"ok": False, "error": str(exc)})
                return
            self._send_json(201, {"ok": True})
            return
        if path.endswith("/api/history"):
            try:
                length = int(self.headers.get("Content-Length", "0"))
                body = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
                payload = json.loads(body or "{}")
                append_history_row(payload)
            except Exception as exc:  # pragma: no cover - runtime guard
                self._send_json(400, {"ok": False, "error": str(exc)})
                return
            self._send_json(201, {"ok": True})
            return
        self._send_json(404, {"ok": False, "error": "Not found"})


def main() -> None:
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    RECORDS_ROOT.mkdir(parents=True, exist_ok=True)
    httpd = ThreadingHTTPServer(("0.0.0.0", port), RequestHandler)
    print(f"Serving {ROOT} at http://0.0.0.0:{port}")
    print(f"Records directory: {RECORDS_ROOT}")
    print("POST changes to /api/changes")
    print("GET changes from /api/changes")
    print("POST append-only history to /api/history")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
