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

Professor Messer transcript puller:
```bash
python3 scripts/pull_youtube_transcripts.py --course 'Network+' --limit 1
```
Add `--day 'Day 3'`, `--match 'Routing'`, or `--overwrite` as needed.

API endpoint used by the web app:
- `POST /api/changes` -> appends a row to `changes.csv`
- `POST /api/history` -> appends a row to `question_history.csv` only; history cannot be read, replaced, updated, or deleted through the API

Cross-origin API access:
- the API server sends CORS headers for `https://rocketquestions.com`, `https://www.rocketquestions.com`, `https://alex-online.win`, and local development on port `3003`
- this lets either deployed domain append to its matching `:3003` API endpoint directly when Apache serves the page from `443`

Dual-domain deployment notes:
- `rocketquestions.com` and `rocketquestions.com/test1` can serve the live app normally
- `alex-online.win/test1` can also serve the live app normally
- `alex-online.win/` can remain a legacy splash page that points visitors to `rocketquestions.com`
- if both domains point to the same server, Apache should expose the same document root for both hosts and make `/test1` resolve to the same Rocket Questions build tree

Apache Content Security Policy:
- if Apache or Cloudflare reports `connect-src 'none'` warnings, replace that policy with a Rocket Questions-aware policy
- a ready-to-copy Apache header snippet lives in `deploy/apache-csp.conf`

Server-side record storage directory:
- default: `$XDG_STATE_HOME/rocket-questions-html/` when `XDG_STATE_HOME` is set
- otherwise: `~/.local/state/rocket-questions-html/`
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
- Server sync is one-way from browser to server; the browser does not read server-side change or history CSVs
- Change actions from:
  - `Not in Current Course Scope`
  - `Ineffective Question`
  save browser-locally first, then best-effort append server-side to `changes.csv` via `POST /api/changes`
- Answer history may still be written server-side to `question_history.csv` via append-only `POST /api/history`, but it is not used to drive per-user quiz filtering
- Per-user correct/incorrect tracking uses browser-local history only, so one user's attempts do not affect another user's quiz filtering
- Local browser cache is still used for history, overrides, and reports
- Difficulty overrides, removed questions, and auto-saved reports save to `localStorage`

This keeps the app website-first with CSV-backed content and browser persistence.
