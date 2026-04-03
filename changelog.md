# 🚀 Rocket Questions HTML Changelog

> A dated history of the features, improvements, and fixes added to Rocket Questions HTML.

## 📅 2026-04-02

### 🧠 Notes Workspace, Local-Only Progress, and Week 9-10 Expansion

Rocket Questions expands into a fuller study platform with both quiz and notes workflows.

**Features added**

- New post-course workspace chooser:
  - `Practice Quiz`
  - `Notes Lists`
- Full notes viewer built into the web app with:
  - split-pane layout
  - file tree explorer
  - markdown reading pane
  - internal markdown-link navigation
- Generated `notes-content/` mirror now present in the app workspace
- `notes-manifest.json` added to drive the notes tree
- `scripts/sync_notes_content.py` added to copy notes folders and regenerate the manifest
- Week 9 question bank added
- Week 10 question bank added
- Week 10 hard-coded source labeling added for:
  - AI Master List
  - Cisco static routing / IPv6 routing docs
  - Cisco Express Forwarding docs
  - Cisco Inter-VLAN routing docs
  - HSRP references
  - CompTIA Network+ topic references
- Quiz configuration now persists in browser storage
- Setup screen now shows richer history-aware availability stats
- App boot guard added to prevent duplicate initialization

**Bugs fixed / behavior changes**

- Per-user quiz filtering now uses browser-local history only, so one user's answers do not change another user's available-question pool
- Removed reliance on live-polled server history for question filtering
- Local history rows are deduplicated before availability calculations
- Startup now loads question banks, notes manifest, and change history together
- Notes-viewer failures now show a clear fallback telling the user to run the sync script
- Button handling is more defensive to avoid accidental submit/navigation behavior from stale cached HTML
- README now documents the required notes-sync step before serving the app

**Content updates**

- `week1_question_bank.csv` was expanded substantially after `2026-03-14`
- Week 1 now includes many more fundamentals and Cisco-backed extension questions:
  - duplex mismatch
  - Auto-MDIX
  - SFP media choices
  - patch-cable fundamentals
  - peer-to-peer, dedicated-server, and hybrid-model reinforcement

---

## 📅 2026-03-31

### 📝 Notes Mirror and Local Codex Placeholders

The local notes library takes shape to support the new study workspace.

**Features added**

- Repo-local `.codex` placeholder file appears
- `test1/.codex` placeholder file appears
- Synced notes content begins appearing in the repo-local `notes-content/` mirror
- `MASTER LIST/syllabus.md` appears in the synced note set
- Week 9 and Week 10 AI master-list note files are present in generated notes content

---

## 📅 2026-03-28

### 🧪 Alternate Workspace Server Iteration

Parallel app and server work supports the next feature wave.

**Features added**

- `test1/server.py` establishes a parallel app/server working copy for iterating on later features

---

## 📅 2026-03-26

### 🧱 Early Scratch Work For the Next Wave

The next round of features begins taking shape.

**Features added**

- Early work starts in `test1/` before the main repo-local update wave
- `test1/week1_question_bank.csv` changed first, with Week 9 and Week 10 files following shortly after

---

## 📅 2026-03-14

### 📚 Major Content and Quiz Logic Expansion

This release brings a major expansion of content and quiz logic.

**Features added**

- Week 8 question bank added
- Expanded source mapping for:
  - Video 12-17
  - Essentials Chapter 8
  - Essentials Chapter 9
  - Textbook 1 Chapter 3
  - Textbook 1 Chapter 4
- Better browser-title vs page-title separation
- "Include missed once" history option
- "I don't know" answer path
- Question-bank reload during setup
- Missed-question tracking separate from correct-question tracking
- Override reconciliation against server-side base changes
- More flexible source-title fallback logic for reports
- Broader week/textbook mapping for newer course material

**Bugs fixed**

- Skip-history filtering now supports "include missed once" instead of only hard-skipping previously-correct questions
- Reset action now clears full answered-question history, not only correct answers
- Source-to-week inference became more accurate for CSV banks and loose week labels
- Flagging and ineffective-question flows behave better at end-of-quiz boundaries
- Post-answer difficulty-change requests now save future overrides even when the question is already locked
- "I don't know" answers are treated explicitly as incorrect instead of breaking the normal answer path
- Local override cleanup now removes stale entries that no longer exist in server-side change records

---

## 📅 2026-03-06

### 🛡️ Records Safety Guard + Week 7 Content

This update strengthens deployment safety while expanding course content.

**Features added**

- Week 7 question bank added
- Records-root resolver in `server.py`

**Bugs fixed**

- Added a safety guard so `PRACTICE_QUIZ_RECORDS_DIR` values under `/var/www/html` fall back to the project directory instead of writing quiz records into the web root

---

## 📅 2026-02-28

### ✨ UX Expansion: Splash Screen, Branding, Course Setup

This release significantly refines the browser version.

**Features added**

- Startup splash/loading experience
- Course-selection screen
- Course branding metadata and dynamic title/subtitle rendering
- Expanded week support from Weeks 1-6 to Weeks 1-15 in the UI
- Week availability detection with:
  - loading labels
  - disabled future weeks
  - "coming soon" states
- Better study-reference mapping in reports:
  - video titles
  - textbook chapter labels
  - lecture week inference
- Course-tagged review filenames
- Printable review-text mirror
- Reset-history dialog and reset action from the UI
- `alex.jpg` branding asset

**Bugs / cleanup addressed**

- Reworked API URL fallback logic for reverse-proxy and non-root deployments
- Improved startup status messaging while content loads
- Prevented unavailable weeks from staying selected
- Replaced topic-only review output with stronger source-based review guidance
- Removed old Python desktop app and Windows installer files after the web-first transition

### 🔌 API Port and Deployment Docs Update

**Features added**

- README updated to reflect the API server workflow and port `3003`

**Bugs / docs issues addressed**

- Corrected outdated run instructions that still referenced port `8000`
- Clarified that the app was intended for web-server deployment

### 🧠 Quiz UX, Answer History Sync, Records Tooling

Later that same day, the app gains another major layer of polish and durability.

**Features added**

- Server-side answer-history writing via `POST /api/history`
- `GET /api/history` and `GET /api/changes`
- Configurable records directory via `PRACTICE_QUIZ_RECORDS_DIR`
- Live history polling and refresh while the app is open
- Shuffled answer-option ordering
- Auto-generated copyright footer
- Emoji branding in titles and review report headers
- Hard-mode questions can now be moved back to Medium
- `top_wrong_questions.py` records/reporting utility

**Bugs fixed**

- Correct-answer checking now survives shuffled answer order
- History loading falls back more safely if API files are unavailable
- Disabled-week labels became clickable in a more intentional way
- Review summary no longer exposes the auto-saved filename inline
- Save/load behavior became more resilient when records live outside the repo

---

## 📅 2026-02-26

### 🌐 Browser App Rewrite Begins

Rocket Questions pivots from a desktop Python GUI into a browser-based app.

**Features added**

- New HTML/CSS/JavaScript frontend:
  - `index.html`
  - `styles.css`
  - `app.js`
- Bundled Python API/static server in `server.py`
- Browser-side persistence model using `localStorage`
- CSV-backed web app workflow instead of desktop-only execution
- Week selection before quiz setup
- Difficulty modes: Easy, Medium, Hard
- Question-count clamping to available questions
- Live score and letter-grade updates
- Skip previously-correct questions
- "Not in Current Course Scope" flow
- "Ineffective Question" reporting flow with required feedback
- Review report generation
- Copy / download / print review tools
- Retake incorrect questions flow
- Source/topic inference in reports

**Bugs / design problems addressed**

- Eliminated dependence on the original desktop runtime for core quiz use
- Moved change reporting into a server-backed workflow using `POST /api/changes`
- Preserved much of the old Python-app behavior in a static-site-friendly browser architecture

---

## 📅 2026-02-25

### 🌱 Project Foundation

Initial import of the original Rocket Questions project.

**Features added**

- Desktop Python quiz app via `netc_pop_quiz.py`
- Week-based question banks for Weeks 1-6
- Combined fallback `question_bank.csv`
- Change-request tracking via `changes.csv`
- Windows setup pipeline with Inno Setup files
- Windows dependency bootstrap script
- Project README and dependency docs
- Rocket app icon asset

**Bugs / gaps addressed**

- Established the first usable project structure, packaging flow, and content layout

### ⚖️ License Added

**Features added**

- MIT license added to the repository

---

## 🧩 Feature Timeline At A Glance

### Core App Milestones

- `2026-03-26` to `2026-04-02`: Local workspace iteration begins in `test1/`, then lands as notes viewer + Week 9/10 + local-history changes in the main tree
- `2026-02-25`: Original Python desktop quiz app imported
- `2026-02-26`: Browser app, static frontend, and API server introduced
- `2026-02-28`: Startup splash, course setup, richer report/source mapping, history APIs, shuffled answers
- `2026-03-06`: Safer server record-storage behavior, Week 7 content
- `2026-03-14`: Week 8 content, "I don't know," "include missed once," stronger history/reset/report logic

### Notable Bug-Fix Milestones

- `2026-04-02`: Switched question filtering back to per-browser local history to avoid cross-user interference
- `2026-04-02`: Added stronger startup, notes-manifest, and cached-form fallback handling
- `2026-02-28`: Fixed deployment/API path handling for more hosting layouts
- `2026-02-28`: Fixed correctness tracking after answer choices began shuffling
- `2026-03-06`: Prevented accidental record writes into `/var/www/html`
- `2026-03-14`: Fixed reset-history semantics to clear all answered history
- `2026-03-14`: Fixed edge cases around locked questions, end-of-quiz transitions, and stale overrides

---

## 📝 Historical Confidence

**High confidence**

- Exact commit dates
- When major files first appeared
- When clearly visible features entered the codebase
- When explicitly coded bug fixes landed
- Post-`2026-03-14` local file additions and modifications dated by filesystem timestamps

**Medium confidence**

- A few feature labels summarized from large commits with vague commit messages like `did a lot of stuff` and `a lot of additions`
- The exact sequencing inside the uncommitted `2026-03-26` to `2026-04-02` local-history window

**Low confidence**

- Anything that would have depended on now-empty `.codex` session logs
- Any exact post-`2026-03-14` claim that would require a commit timestamp rather than file modification history

If more `.codex` history ever gets restored from backups, this changelog could be expanded with finer-grained day-by-day implementation notes.
