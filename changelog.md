# 🚀 Rocket Questions HTML Changelog

> A dated history of the features, improvements, and fixes added to Rocket Questions HTML.

## 📅 2026-04-17

### 📚 Week 12 and Week 13 Lecture Notes Expanded

The personal lecture notes for Weeks 12 and 13 were rewritten from rough classroom bullets into detailed study-ready explanations.

**Content updates**

- Expanded `courses/NETC-121/notes-content/Notes List C - Alex's Personal Notes/Lecture Week 12/Lecture Week 12.md`
- Expanded `courses/NETC-121/notes-content/Notes List C - Alex's Personal Notes/Lecture Week 13/Lecture Week 13.md`
- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 26 - Layer 2 vs Layer 3 Switches/Transcript.md`
- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 27 - Micronugget What is Route Redistribution/Transcript.md`
- Added detailed Week 12 coverage for static routing review, default routes, longest-prefix match, route summarization, router hierarchy, dynamic routing, RIP, RIPv2, VLSM, wildcard masks, and loop-prevention tools
- Added detailed Week 13 coverage for Layer 3 switches, SVIs, inter-VLAN routing, routed ports, redistributed routes, EIGRP, OSPF, OSPF areas, wildcard masks, administrative distance, and routing lab troubleshooting
- Added Video 26 coverage for Layer 2 switching, MAC-address forwarding, Layer 3 switching, VLANs, SVIs, inter-VLAN routing, and router-versus-multilayer-switch differences
- Added Video 27 coverage for routing basics, static routes, dynamic routing protocols, EIGRP/OSPF mixed environments, route redistribution, mutual redistribution, metric handling, and redistribution risks
- Preserved the original classroom command examples while correcting formatting and expanding the surrounding explanations
- Rebuilt course notes manifests so the new video transcript can appear in the notes browser

---

## 📅 2026-04-16

### 📚 Week 12 AI Master List Added

Week 12 now has a dedicated AI master list generated from the Week 12 syllabus scope and the local Week 12 routing notes.

**Content updates**

- Added `courses/NETC-121/notes-content/MASTER LIST/Weekly AI Master Lists/Week 12 - AI Master List.md`
- Scoped the Week 12 list to static routing review, route summarization, router hierarchies, default routes, RIP routing, and intro dynamic-routing concepts
- Documented that Week 12 has no listed textbook reading assignment in the syllabus
- Documented that EIGRP, OSPF, and BGP are mentioned only as comparison/context for Week 12 rather than required focus topics
- Added Week 12 to `courses/NETC-121/notes-manifest.json` so it appears in the in-app notes browser
- Updated the weekly AI master list `README.md` index through Week 12

### 🗂️ NETC-121 Master List Coverage Expanded

The course-level master guide was checked against the previous weekly AI master lists and expanded with missing high-value concepts from earlier weeks.

**Content updates**

- Updated `courses/NETC-121/notes-content/MASTER LIST/Master List.md`
- Added missing Week 1 network-role and network-type concepts
- Added Week 7-8 switching coverage for managed switches, uplinks, SFPs, VLANs, trunks, `802.1Q`, VTP, DTP, VLAN hopping, and router-on-a-stick
- Added Week 7 Cisco switch setup, security, verification, PoE, and TFTP backup concepts
- Added Week 9 STP coverage for root election, BPDUs, port roles, timers, RSTP/PVST/MSTP, PortFast, and BPDU Guard
- Added Week 9 cybersecurity coverage for prevention/recovery, asset management, backups, NIST functions, and cybersecurity frameworks
- Added Week 10-11 routing coverage for administrative distance, floating static routes, packet forwarding, router verification commands, IPv6 routing, and dynamic-routing protocol context
- Added Week 7-8 supplemental concepts for ASCII/Unicode, bits/bytes, and VPN basics

### 🧰 Linux Clipboard and Report Action Fixes

The quiz review report actions were made more reliable, especially for Linux browser environments where direct Clipboard API access can fail.

**Bugs fixed / behavior changes**

- Fixed `Copy Report` returning early because its walkthrough guard always treated `copy-report` as a dialog-only walkthrough action
- Fixed the same report-action guard pattern for `Download Report`, `Print Report`, and `Retake Incorrect Only`
- Added a textarea/selection-based clipboard fallback before using `navigator.clipboard.writeText`
- Added a final manual fallback that selects the report text and tells the user to press `Ctrl+C` if browser clipboard access still fails
- Updated the smoke test reset-history assertion to use the actual pre-reset history count instead of a hard-coded duplicate-row count
- Fixed `Possible Questions by Difficulty` so it shows raw possible selected-unit totals instead of browser-history-filtered availability totals
- Updated quiz setup detail text to show browser-save progress as answered already, never answered, still missed, and final draw-pool size
- Added browser-local diagnostics: `rocketQuestionsAnsweredSummary()` and `rocketQuestionsAnsweredQuestions()` for inspecting the current browser's saved answered-question history
- Isolated Playwright answer-history tests behind `rocket_questions_history_local_playwright` so the smoke test cannot reset the normal browser history key
- Disabled answer-history API posting during Playwright runs so test attempts do not write to the shared/server-side question-history log
- Made `/api/history` explicitly append-only: browser clients can `POST` answer attempts to the server, but cannot read, replace, update, or delete server-side history through that endpoint
- Stopped the app from probing known-missing NETC-121 Week 13-15 question banks during normal question-bank loading
- Deduplicated CSV fetch fallback URLs so the same missing file does not get requested twice
- Made history server saves local-first and non-spammy: after a failed `POST /api/history`, the app stops retrying history saves for that page session, avoids repeated console warnings, and keeps the last failure in `window.__rocketLastHistorySaveError`
- Made change requests local-first: out-of-scope and ineffective-question actions save to browser-local changes immediately, while `POST /api/changes` becomes a best-effort append attempt with a one-shot circuit breaker
- Removed startup reads of server-side `changes.csv`; browser sync is now strictly one-way append-only from client to server for both changes and answer history
- Removed API URL fallback probing and pinned frontend API calls to port `3003` for `/api/changes` and `/api/history`
- Moved the Playwright smoke-test server to port `3003` as well so local validation uses the same fixed port as deployment
- Added a `Previous Question` button during quizzes so users can return to the prior answered question and reread the saved correct/incorrect explanation
- Preserved each answered question's shuffled choice order, selected answer, locked state, and feedback text while navigating backward and forward in a quiz attempt
- Added a `Trusted AI Explanation` button that appears after a question is answered and opens the Gemini/Google AI search prompt in a new browser tab
- Expanded the Playwright smoke test to verify the `Previous Question` button restores saved feedback and keeps answered controls locked
- Expanded the Playwright smoke test to verify the `Trusted AI Explanation` new-tab URL, prompt contents, and `_blank` target
- Expanded the Playwright smoke test to verify `POST /api/changes` and `POST /api/history` requests, including an ineffective-question payload with `PLAYWRIGHT TEST`
- Added CORS headers and preflight handling to the port `3003` API server so the deployed `https://alex-online.win` site can call `https://alex-online.win:3003/api/changes` and `/api/history`
- Added `deploy/apache-csp.conf` with a Rocket Questions-aware Apache CSP header that allows same-origin app content, the port `3003` API, Google analytics/tag scripts, Google fonts, and optional Cloudflare beacon reporting
- Updated the `Trusted AI Explanation` prompt so it only asks the AI to explain why the user's selected answer is wrong when the selected answer is actually wrong
- Fixed impossible live-score ratios after removing answered ineffective questions by recalculating score totals from the current session's saved answers
- Allowed `changelog.md` to upload through the SFTP config so the main-page changelog can receive the latest 4/16 notes
- Bumped the frontend app cache key to `2026-04-16-13` so browsers fetch the fixed JavaScript and refreshed changelog

**Validation**

- Confirmed `courses/NETC-121/notes-manifest.json` parses as valid JSON
- Confirmed `app.js` and `tests/app-smoke.spec.js` pass `node --check`
- Ran `npx playwright test`; the smoke test passes with Playwright on `3003`, including the review report copy action

---

## 📅 2026-04-12

### 📚 Week 12 Notes, Syllabus, and Routing Scope Updates

Week 12 content was expanded around route summarization and hierarchical routing, and the course planning files were updated to reflect that scope.

**Content updates**

- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 24 - Route Summarization/Transcript.md`
- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 25 - Router Hierarchies and Default Routes/Transcript.md`
- Updated `courses/NETC-121/notes-content/MASTER LIST/syllabus.md` so Week 12 includes Videos `24-25`
- Used the Week 12 lecture scope to identify advanced routing topics that should not be emphasized yet

### 🧠 Week 11 and Week 12 Question Bank Cleanup

The routing banks were adjusted to better match current class coverage and reduce overlap, especially around advanced protocol topics.

**Content updates**

- Trimmed clearly out-of-scope advanced-routing questions from `courses/NETC-121/question-banks/week11_question_bank.csv`
- Added `courses/NETC-121/question-banks/week12_question_bank.csv` with an initial `150` questions built in `50 easy / 50 medium / 50 hard` distribution
- Removed duplicate or redundant Week 12 questions after review against older banks and against the new Week 12 bank itself
- Removed Week 12 questions that explicitly quizzed `OSPF` or `EIGRP` after the scope was narrowed away from those protocols
- Left Week 12 content focused on dynamic routing basics, RIP behavior, route summarization, longest-prefix match, default routes, and hierarchical router design

### ✍️ Week 12 Clarity Rewording Pass

The Week 12 bank received a wording pass to make stems more self-contained and easier to parse without hidden context.

**Bugs fixed / behavior changes**

- Reworded vague Week 12 question stems to use more explicit nouns and less course-dependent shorthand
- Clarified prefix-length questions so `/24`, `/16`, `/8`, and `/0` are framed in terms of IPv4 destination-address matching
- Clarified hierarchy and default-route questions so the networking decision context appears directly in the stem
- Preserved concept coverage while making the questions less ambiguous for first-read comprehension

### 🛠️ Targeted Misconception Fixes in Existing Banks

Several previously-identified question patterns were rewritten so the intended answer remains technically correct even under realistic alternate scenarios.

**Bugs fixed / behavior changes**

- Rewrote the NAT return-traffic question in `courses/NETC-121/question-banks/week5_question_bank.csv` so the answer depends on NAT translation/state tracking rather than any ARP-based interpretation
- Rewrote the router-on-a-stick gateway question in `courses/NETC-121/question-banks/week7_question_bank.csv` so it clearly refers to each router subinterface rather than the entire physical trunk interface
- Rewrote the remote-subnet first-step question in `courses/NETC-121/question-banks/week10_question_bank.csv` so the destination is fixed as remote and the only correct first action is learning the default gateway MAC with ARP
- Confirmed the classic STP forward-delay question already matched the corrected interpretation: `15 seconds` for the timer itself, distinct from the combined `30 seconds` spent across listening plus learning

---

## 📅 2026-04-09

### 🧭 Course Loading, Network+ Domains, and Ignore Rules

The course-selection flow, Network+ track behavior, and local deployment rules were refined to match the new split content layout.

**Bugs fixed / behavior changes**

- Moved the `Tell Alex thank you!` loading screen so it appears after course/certification selection instead of during initial app boot
- Shifted track-specific notes/question-bank loading out of startup and into the `Continue` flow for the selected course or certification
- Added separate `Courses` and `Certifications` dropdown rows with their own inline `Continue` buttons
- Added inline loading feedback to the course-selection `Continue` buttons while workspace content loads
- Prevented the guided-tour overlay from sitting on top of the post-selection loading screen
- Separated selected dropdown values from the active content track so `Courses` and `Certifications` now choose the path explicitly
- Switched the Network+ certification track from week-based question-bank loading to domain-based loading using `domainN_question_bank.csv`
- Updated the Network+ practice selector to label units as `Domains` and show `Domain 1` through `Domain 5` as `coming soon`
- Added ignore rules for Network+ `Exam Objectives.md` and `Notes List B - Textbook Content` in both `.gitignore` and `.vscode/sftp.json`
- Added `.vscode/settings.json` excludes for `.codex`
- Added and used `scripts/build_course_notes_manifests.py` to rebuild course-specific notes manifests
- Synced frontend cache/version keys through `2026-04-09-51`

### 📝 Notes Explorer and Markdown Rendering Fixes

The in-app notes experience was tightened up so the explorer respects the active track and markdown layout is rendered much closer to the source files.

**Bugs fixed / behavior changes**

- Dismissed only the first guided-tour prompt card when leaving the course-selection screen, while keeping the actual guided walkthrough active across later screens
- Scoped the notes explorer to the active root folder so it now displays under either `courses/NETC-121` or `courses/Network+`
- Filtered `Notes List B - Textbook Content` out of the Network+ notes explorer without removing the underlying files
- Regenerated the Network+ notes manifest so `Notes List B - Why it's not here.md` appears in the notes tree
- Cleaned up `courses/Network+/notes-content/Notes List B - Why it's not here.md` so its heading and closing lines render correctly in the viewer
- Updated the markdown renderer to respect tab-indented nested lists instead of flattening them
- Updated the markdown renderer to preserve authored single newlines inside paragraphs and list items instead of collapsing them into spaces
- Updated the markdown renderer to recognize nested markdown tables inside indented list items
- Updated the markdown renderer to auto-link pasted `http://` and `https://` URLs in notes content
- Updated notes-viewer wrapping rules so long URLs and unbroken text wrap cleanly instead of stretching or clipping lines
- Replaced visible rocket emoji branding in the splash/header/notes title with `rocket_icon.png`

---

## 📅 2026-04-08

### 🧪 Week 11 Question Bank Added

Week 11 now has a dedicated 150-question bank built from the current Week 11 master list scope.

**Content updates**

- Added `week11_question_bank.csv` with `150` questions
- Structured the bank by request with:
  - `easy` for foundational Week 11 concepts
  - `medium` for tougher in-scope Week 11 concepts
- `hard` for adjacent CCNA / Network+ style extensions outside class scope
- Kept the questions conceptual rather than source-memorization based

---

### 🗂️ Week 11 Syllabus and Master List Updated

Week 11 planning content now reflects the new routing videos and includes a dedicated Week 11 AI master list.

**Content updates**

- Updated the Week 11 row in `notes-content/MASTER LIST/syllabus.md` to include Videos `22-23`
- Added `notes-content/MASTER LIST/Weekly AI Master Lists/Week 11 - AI Master List.md`
- Documented the current Week 11 source gap for `BPDU guard` and the empty `Lecture Week 11.md` note

---

### 📚 Week 10 Video 23 Notes Added

Week 10 notes now also include a new video transcript summary for dynamic routing protocol categories.

**Content updates**

- Added `Notes List A - Video Content/Video 23 - Dynamic Routing Protocols/Transcript.md`
- Updated the notes manifest so Video 23 appears in the in-app Notes Explorer
- Updated the Week 10 AI master list source references from videos `20-22` to `20-23`

---

### 📚 Week 10 Video 22 Notes Added

Week 10 notes now include a new video transcript summary for routing fundamentals.

**Content updates**

- Added `Notes List A - Video Content/Video 22 - Routing Fundamentals/Transcript.md`
- Updated the notes manifest so Video 22 appears in the in-app Notes Explorer
- Updated the Week 10 AI master list source references from videos `20-21` to `20-22`

---

## 📅 2026-04-09

### 🛠️ Week 11 Availability UI Fix

Week 11 is now treated as a live quiz week in the frontend instead of lingering in placeholder mode after the new content rollout.

**Bugs fixed / behavior changes**

- Bumped the frontend app version in `app.js` to force the browser to pick up the latest week availability state
- Added Video `22` and Video `23` to the frontend video-to-week mapping as Week `11`
- Added a hard-coded source label for the Week 11 AI master list so review/report references stay aligned with the new week
- Added an explicit Week `11` availability override in the frontend so the selector no longer falls back to the `coming soon` placeholder

---

## 📅 2026-04-03

### 🧭 Guided Tour, Mobile Notes Menu, and Walkthrough Polish

Rocket Questions grows into a fully guided teaching experience, with a foreground tour that can walk students through the app from course selection to the review report.

**Features added**

- New full-app guided walkthrough added across:
  - course selection
  - workspace chooser
  - notes screen
  - week selection
  - quiz configuration
  - live quiz controls
  - review report tools
- Walkthrough now offers a foreground yes/no prompt on load instead of a manual tour button
- Special walkthrough demo quiz bank added and expanded into a multi-question guided scenario with:
  - one correct-answer demo
  - one intentional wrong-answer demo
  - an ineffective-question comedy demo
  - a "not in current course scope" advanced-networking demo
  - an `I Don't Know` demo
  - an early `Finish Quiz` demo
- Review-screen tour coverage added for:
  - report overview
  - `Copy Report`
  - `Download Report`
  - `Print Report`
  - `Retake Incorrect Only`
  - `Reset All Answered Questions`
- Walkthrough overlay gained a dedicated `Next` button for tour-only steps that should not trigger live app actions
- Mobile notes experience upgraded with a responsive hamburger-driven Notes Explorer drawer
- Notes-screen mobile header redesigned so the title and hamburger live together on the top row
- Week selection layout improved on mobile with:
  - multi-column week tiles
  - action buttons that no longer stretch full width
- Quiz configuration question-count control upgraded with a custom themed stepper:
  - larger `+` / `-` controls
  - buttons flush to the field edge
  - styling matched to the app theme instead of browser-default spinners
- Course chooser now displays the changelog directly in the app

**Bugs fixed / behavior changes**

- Walkthrough spotlight and card placement refined across quiz and review screens to avoid covering key controls
- Finish-quiz, review-report, and out-of-scope walkthrough steps now pin into clearer top-right/open-lane placements
- Walkthrough no longer dead-ends if the ineffective-question dialog is canceled; it rewinds to the prior tour step
- Demo ineffective-question and out-of-scope steps no longer send fake walkthrough changes to the server
- `Reset All Answered Questions` can now be logically disabled during walkthrough steps so accidental clicks cannot fire the reset action
- Review-screen walkthrough steps can advance from the overlay instead of forcing clicks on live controls
- Mobile devices now show a guided-tour unavailable message and continue path instead of attempting the desktop walkthrough
- `Available in Easy` status text was simplified to show only the easy-count summary

---

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
- `GET /api/changes`
- Configurable records directory via `PRACTICE_QUIZ_RECORDS_DIR`
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
