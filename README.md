# rocket-questions-html

NETC-121 practice quiz rebuilt as a browser app using only:
- HTML
- CSS
- JavaScript

Question data stays CSV-backed (`week1...week6_question_bank.csv`, fallback `question_bank.csv`).

## Run
Use the bundled api server so change actions are saved server-side to `changes.csv`.

Before serving the app, sync the notes folders into the web root:
```bash
python3 scripts/sync_notes_content.py
```

Example:
```bash
cd rocket-questions-html
python3 server.py 3003
```
This all goes on a web server.

API endpoint used by the web app:
- `POST /api/changes` -> appends a row to `changes.csv`
- `POST /api/history` -> appends a row to `question_history.csv`
- `GET /api/changes` -> returns current `changes.csv`

Server-side record storage directory:
- default: `/home/citadel/practice-quiz-records/`
- override with env var: `PRACTICE_QUIZ_RECORDS_DIR`
- safety guard: if env var points under `/var/www/html`, records write to the project folder

## Website Features
- Post-course workspace chooser for `Practice Quiz` or `Notes Lists`
- Notes viewer with VS Code-style tree and markdown reading pane
- Week selection (1-6) before setup
- Mode selection: easy / medium / hard
- Medium mode includes easy + medium pools
- Configurable question count with automatic clamp to availability
- Live score + letter grade updates
- Skip previously correct questions
- Not in Current Course Scope -> reassign to Hard + skip (no score impact)
- Ineffective Question flow with required feedback
- Remove ineffective question from active bank (browser-local override)
- Finish flow with generated review report
- Topics-to-review section inferred from incorrect questions
- Copy / Download / Print report
- Retake Incorrect Only

## Persistence Model
- Base changes load from `changes.csv`
- Change actions from:
  - `Not in Current Course Scope`
  - `Ineffective Question`
  are written server-side to `changes.csv` via `POST /api/changes`
- Answer history may still be written server-side to `question_history.csv` via `POST /api/history`, but it is not used to drive per-user quiz filtering
- Per-user correct/incorrect tracking uses browser-local history only, so one user's attempts do not affect another user's quiz filtering
- Local browser cache is still used for history, overrides, and reports
- Difficulty overrides, removed questions, and auto-saved reports save to `localStorage`

This keeps the app website-first with CSV-backed content and browser persistence.
