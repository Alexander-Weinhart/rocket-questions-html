# rocket-questions-html

NETC-121 practice quiz rebuilt as a browser app using only:
- HTML
- CSS
- JavaScript

Question data stays CSV-backed (`week1...week6_question_bank.csv`, fallback `question_bank.csv`).

## Run
Use the bundled server so change actions are saved server-side to `changes.csv`.

Example:
```bash
cd rocket-questions-html
python3 server.py 8000
```

Open:
`http://localhost:8000`

API endpoint used by the web app:
- `POST /api/changes` -> appends a row to `changes.csv`

## Features Ported From Python App
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
- Base history loads from `question_history.csv`
- Base changes load from `changes.csv`
- Change actions from:
  - `Not in Current Course Scope`
  - `Ineffective Question`
  are written server-side to `changes.csv` via `POST /api/changes`
- Local browser cache is still used for history, overrides, and reports
- Difficulty overrides, removed questions, and auto-saved reports save to `localStorage`

This keeps the app fully static while preserving behavior from the desktop workflow.
