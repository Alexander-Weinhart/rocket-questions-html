# Rocket Questions HTML Changelog

> A dated history of the features, improvements, and fixes added to Rocket Questions HTML.

## 2026-05-15

### Network+ Survival Guide Replaced the Placeholder Draft

The Network+ survival-guide note is no longer a stub. It now opens with a full student-facing guidance letter instead of the earlier under-construction placeholder.

**Content updates**

- Replaced the placeholder opening with a long-form introduction that sets expectations for how much hands-on experience and lab practice the course assumes
- Added a first-person guidance section explaining the recommended preparation path before attempting Network+ study
- Added a stronger motivational framing around certification prep, study habits, and using the site as part of a longer learning journey

**Validation**

- Confirmed the `SURVIVAL GUIDE.md` placeholder header was removed
- Confirmed the file now starts with the new survival-guide letter content instead of an under-construction notice

### Domain 1 Notes Cleanup and Question-Bank Precision Pass

The Network+ Domain 1 notes and question bank both received a cleanup pass focused on consistency, readability, and misconception-resistant wording.

**Question-bank updates**

- Reworded Domain 1 NAT questions so they explicitly test NAT session/state tracking for returning internet traffic
- Removed distractor wording that could become plausible under same-subnet, local-server, or changed-subnet-mask assumptions
- Continued the broader Domain 1 wording cleanup so questions read more like standalone quiz prompts and less like transformed notes

**Notes cleanup**

- Removed the leading teaching asterisks from the Domain 1 `Notes List C - Alex's Personal Notes` files
- Converted literal tab-escape text to real tabs, then normalized the resulting indentation so Markdown no longer renders large note sections as code blocks
- Capitalized markdown headings, non-heading note lines, and table header rows across the Domain 1 `Notes List C` notes

**Validation**

- Verified there are no remaining leading asterisk markers in the Domain 1 `Notes List C` files
- Verified there are no remaining literal `\\t` sequences or leading tab-indented Markdown code-block artifacts in the cleaned notes set
- Verified the targeted NAT misconception questions now use unambiguous return-traffic and translation-state wording

### Classful and Classless IP PBQs Expanded Across Tracks

The IP-addressing PBQ set now reflects the split between classful and classless subnetting practice, and the classless subnetting PBQ is now available from the Network+ launcher in addition to NETC-121.

**PBQs and track coverage**

- Kept the classful IP PBQ focused on random class A-C addresses only, with answers for class, network address, broadcast address, first host, and last host
- Added the classless IP subnetting PBQ to the Network+ PBQ launcher so it matches the already published NETC-121 availability
- Preserved the built-in calculator, scratch paper, and single-screen review flow across both IP-addressing PBQs

**Versioning and cache refresh**

- Bumped the shared app version query from `1.0.14` to `1.0.15`
- Bumped the package version from `1.0.14` to `1.0.15`

**Validation**

- Previously verified the NETC-121 classful PBQ, NETC-121 classless PBQ, and Network+ classful PBQ with the focused Playwright PBQ suite
- Added the remaining Network+ classless PBQ wiring in both the shared app catalog and the Network+ config so the launcher and config metadata stay aligned

## 2026-05-14

### PBQ Design Cleanup and URL Cache-Busting Refresh

The first published Network+ PBQ now avoids red/green grading language before the results screen, and the live site links that point to Rocket Questions routes/domains were refreshed with cache-busting query strings where needed.

**PBQ and UI polish**

- Removed the red/green graded-slot border treatment from the active `Port Number Matching` PBQ workspace
- Replaced the workspace-only correct/incorrect grading icons with a neutral post-submit slot treatment
- Kept the results/review screen pass-fail color language intact so the final report still shows clear outcome badges

**Cache-busting and routing**

- Added a cache-busting query string to the root legacy-domain CTA that sends users to `rocketquestions.com`
- Added a cache-busting query string to the Network+ port-number-matching PBQ back-to-menu route
- Switched Rocket Questions app-owned URLs from mixed hardcoded cache keys to a unified `?q=1.0.14` version query so browser cache refreshes line up with the current site release
- Verified the live user-facing `.html` and `.js` files do not contain remaining direct `rocketquestions.com` or `alex-online.win` URLs without query strings

**Validation**

- Searched the repo for Rocket Questions and Alex-Online URLs to isolate live site links from documentation and server/config references
- Re-checked the user-facing site HTML/JS files after the updates to confirm the targeted direct-domain links are now cache-busted

## 2026-05-08

### Route-Based App Screens, PBQs, and Notes Video Upgrades

The shared app moved further into route-backed screen flows, added a real PBQ launcher surface, and upgraded the notes viewer with embedded video playback and transcript-driven caption support.

**App and navigation**

- Added route-slug-aware track handling for `netc-121`, `network-plus`, and `security-plus`
- Added route-backed entrypoints for menu, notes, PBQs, practice setup, quiz, and review screens
- Added `route-map.json` support so generated notes routes can resolve back to source markdown paths
- Rebuilt the generated route entrypoints so the route-backed pages stay aligned across the app

**PBQs and certification flows**

- Added a dedicated PBQ screen to the shared app menu flow
- Published the first selectable Network+ PBQ launcher card for `Port Number Matching`
- Preserved the direct `courses/Network+/practice-quiz/live` and `results` routes inside the newer route-aware navigation flow

**Notes viewer and video support**

- Added top-of-note video playback for supported video notes using Plyr
- Added transcript-path lookup and transcript parsing support for video notes
- Added a hard-of-hearing toggle with a custom live caption panel driven by transcript timestamps
- Kept non-video notes on the normal notes-only rendering path

**Quiz and exam polish**

- Added a grading-mode selector to the shared quiz setup flow for tracks that support multiple grading systems
- Made the setup label show `Questions (there are ## on the exam)` from the active quiz configuration
- Added exam question navigation UI, deferred-question handling, and stronger exam progress feedback
- Added review-screen confetti polish for finished results

**Validation**

- Expanded the Playwright coverage around app smoke behavior and notes video playback
- Bumped the frontend cache key through `2026-05-08-04` and the package version to `1.0.13`
- Bumped the frontend cache key through `2026-05-08-03` and the package version to `1.0.12`

## 2026-05-07

### CompTIA Grading Mode Added

Network+ and Security+ practice quizzes now have course-specific quiz configuration files that can add grading behavior without changing NETC-121's existing quiz behavior.

**Exam mode**

- Added Exam mode to the shared grading configuration system
- Added no-live-grading exam behavior with saved answers, deferred items, and final-only grading
- Added desktop exam navigation and mobile question-menu behavior
- Added Network+ PBQ-style exam scenario items while the dedicated PBQ section is still being built out
- Bumped the frontend cache key through `2026-05-07-03` and the package version to `1.0.7`
- Bumped the frontend cache key through `2026-05-07-04` and the package version to `1.0.8`
- Busted cache for `course-configs/*.js` so new grading modes appear reliably, and bumped the frontend cache key through `2026-05-07-05` and the package version to `1.0.9`
- Tightened the config-script loader so grading-mode configs must load successfully before the app boots, and bumped the frontend cache key through `2026-05-07-06` and the package version to `1.0.10`
- Removed placeholder PBQs from Exam mode so only real published PBQs can appear later, and bumped the frontend cache key through `2026-05-07-07` and the package version to `1.0.11`

**Pause 2 polish**

- Added a plain-language grading systems table to the quiz configuration screen for configured certification quizzes
- Bumped the frontend cache key through `2026-05-07-02` and the package version to `1.0.6`

**Content updates**

- Added shared quiz configuration files under `course-configs/`
- Added Network+ and Security+ Regular and CompTIA grading modes
- Added Network+ Domain 1 question-bank coverage with 150 questions across objectives `1.1` through `1.8`
- Added Network+ direct quiz URLs at `courses/Network+/practice-quiz/live` and `courses/Network+/practice-quiz/results`

**Bugs fixed / behavior changes**

- Enabled Network+ Domain 1 in the Domain Selection screen now that the question bank exists
- Added pass/fail display for configured certification grading modes
- Added CompTIA scaled-score display using the 100-900 scale
- Added weighted CompTIA scoring using configured domain weights
- Preserved NETC-121's existing practice quiz behavior through its own configuration file
- Bumped the frontend cache key through `2026-05-07-01` and the package version to `1.0.5`

## 2026-05-06

### Network+ Domain 1 Textbook Notes Expanded

The Network+ textbook-note track now includes full teaching notes for Domain `1.0 Networking Concepts`, split by objective subdomain instead of using short concept lists.

**Content updates**

- Added `courses/Network+/notes-content/Notes List B - Textbook Notes/1.0/` with separate markdown notes for objectives `1.1` through `1.8`
- Expanded the notes from the Network+ textbook PDF chapter mappings into lesson-style explanations, comparison tables, scenario cues, and exam-focused differentiators
- Covered Domain 1 textbook material across OSI layers, networking appliances and functions, cloud concepts, ports and protocols, transmission media, topologies, IPv4 addressing, and modern network environments
- Updated the Domain 1 README so it describes the files as teaching notes rather than concept indexes

**Validation**

- Re-checked the textbook PDF chapter ranges for Domain 1 coverage before the final expansion pass
- Verified the Domain 1 notes include the expected textbook concepts such as `SNMPv3`, `GRE`, `IPsec`, cloud service models, plenum cabling, transceivers, APIPA, CIDR, VXLAN, SASE/SSE, and infrastructure drift
- Scanned the new notes for local/private PDF footer text and sensitive local details

### Network+ Notes Manifest Refreshed

The Network+ notes browser manifest was regenerated so the app can see the current Network+ notes tree and video-note metadata.

**Content updates**

- Rebuilt `courses/Network+/notes-manifest.json` from `courses/Network+/notes-content`
- Added the current Network+ personal notes, video notes, transcript entries, master-list content, and survival guide entries to the generated manifest
- Preserved the manifest metadata fields used by the shared notes viewer, including `video`, `Video`, `youtubeVideo`, `videoUrl`, and `videoId`

**Validation**

- Ran `python3 scripts/build_course_notes_manifests.py`
- Kept the committed change scoped to the Network+ manifest after the shared builder regenerated all course manifests

## 2026-05-01

### Notes Video Player and Hard-of-Hearing Mode Added

YouTube-backed notes can now open with an embedded player at the top of the note, and an optional hard-of-hearing mode can surface live transcript captions in a larger high-contrast panel while the video plays.

**Content updates**

- Added a `Hard of hearing` toggle inside the notes header that saves its state in browser storage
- Added a notes-viewer video shell that embeds YouTube-backed note videos above the markdown body
- Added transcript cue parsing for `Transcript.md` files that use timestamp-range headings
- Added a live caption panel that follows the active transcript segment while the video plays

**Bugs fixed / behavior changes**

- Updated the shared notes renderer so video-note behavior works from manifest metadata instead of course-specific hardcoding
- Rebuilt `scripts/build_course_notes_manifests.py` so note entries expose `video`, `Video`, `youtubeVideo`, `videoUrl`, and `videoId` metadata when the markdown contains a YouTube link
- Restricted the hard-of-hearing toggle, YouTube player, and live caption panel to notes with `youtubeVideo: true` in the manifest
- Prevented `Transcript.md` files inside video folders from being treated like YouTube player notes
- Regenerated `courses/NETC-121/notes-manifest.json`, `courses/Network+/notes-manifest.json`, and `courses/Security+/notes-manifest.json` with the new video metadata
- Prevented Playwright smoke tests from writing feedback or history records back to the local API server during automated runs
- Bumped the frontend cache key through `2026-05-02-02` and the package version to `1.0.4`

**Validation**

- Ran `python3 scripts/build_course_notes_manifests.py`
- Verified the regenerated NETC-121 manifest reflects the current notes tree and retains `MASTER LIST/Master List.md` as the default note
- Ran `npx playwright test tests/notes-video-player.spec.js`; the focused notes-player suite passed after the manifest and notes-header updates

### Professor Messer Transcript Puller Added

The repo now includes a practical local transcript tool for pulling Professor Messer captions directly into the course notes tree instead of relying on one-off manual steps.

**Content updates**

- Added `scripts/pull_youtube_transcripts.py` for pulling transcripts into the repo from course notes and Professor Messer pages
- Documented the new transcript-puller workflow in `README.md`
- Ignored the local `tools/` workspace and the whole `.vscode/` folder in `.gitignore` so local helper tooling and editor config stay out of tracked changes

### Record Storage Paths Made Portable

The local API server now uses portable state-directory defaults instead of a machine-specific records folder path.

**Bugs fixed / behavior changes**

- Changed `server.py` to prefer `$XDG_STATE_HOME/rocket-questions-html/` for server-side records when available
- Changed the fallback records directory to `~/.local/state/rocket-questions-html/`
- Bound the local dev server to `127.0.0.1` instead of `0.0.0.0`

## 2026-04-30

### NETC-121 Early-Week Syllabus Video Titles Expanded

The NETC-121 syllabus no longer uses shorthand placeholders like `Video 1` or `Videos 2-8` for the opening weeks. Those rows now list the actual video titles so the syllabus matches the renamed notes library all the way from Week 1 onward.

**Content updates**

- Updated the Week 1 syllabus row to list `Video 1 - TWISTED: The dramatic history of twisted-pair Ethernet`
- Expanded the Week 2 syllabus row to list the full titles for videos `2-8`
- Kept the existing week assignments unchanged while making the video column consistent with the later title-based rows

### NETC-121 Video Library Renumbered and Title-Synced

The NETC-121 video-note library was reorganized so the numbering, titles, linked video headers, master lists, syllabus rows, and note-browser manifest all reflect the current course sequence and the verified screenshot-based video titles.

**Content updates**

- Inserted two new Week 4 video slots after `Video 14`, creating `Video 15 - Network Ports Explained` and `Video 16 - How to Take Notes - Study Tips - Cornell Notes`
- Shifted the existing NETC-121 video sequence from old `Video 15-36` to new `Video 17-38`
- Renamed NETC-121 `Notes List A - Video Content` folders and note files for videos `9-38` to match the current screenshot-confirmed titles
- Added or corrected line-1 linked video headers for the YouTube-backed NETC-121 notes through `Video 38`
- Renamed the non-YouTube notes for videos `17-19` to `Subnetting and IP`, `Subnetting and Binary Math`, and `CIDR & Subnet Mask`
- Converted older `Transcript.md` note files in the retitled video folders to title-based markdown filenames so the note tree shows the actual video names

**Bugs fixed / behavior changes**

- Synced `courses/NETC-121/notes-content/syllabus.md` with the current video names while preserving each video in its assigned course week
- Synced the weekly AI master lists to the renamed NETC-121 video folders and note files
- Updated lingering NETC-121 question-bank source references from stale transcript paths and pre-rename folder names to the current title-based note paths
- Corrected rename artifacts such as duplicated fragments like `Subnetting and IP and IP` and `Animated - Animated`
- Corrected the video 36 title to use `Animated` instead of the screenshot typo `Adimated`
- Rebuilt `courses/NETC-121/notes-manifest.json` multiple times during the rename sweep so the in-app notes browser reflects the final folder/file structure

**Validation**

- Verified the final NETC-121 notes tree contains videos `1-38` with the expected current folder names
- Verified the syllabus rows for Weeks `3-14` now reference the updated video titles
- Verified the weekly master lists and question-bank note references no longer contain the targeted stale video-title/path strings

## 2026-04-28

### CompTIA Security+ Certification Track Added

The certification picker can now open a dedicated CompTIA Security+ workspace that behaves like the existing Network+ flow, with its own notes tree, practice-quiz domain logic, and starter domain content.

**Content updates**

- Added a new `Security+` certification entry to the certification catalog in `app.js`
- Added starter `courses/Security+` notes content including a survival guide, a copyright placeholder note, and a Security+ exam-objectives page
- Added `courses/Security+/question-banks/domain1_question_bank.csv` so the Security+ practice quiz has a live first domain instead of a blank shell
- Generated `courses/Security+/notes-manifest.json` so the notes list page can render the new certification tree immediately

**Bugs fixed / behavior changes**

- Generalized certification practice-unit logic so certification tracks can define their own domain-style quiz structure instead of relying on a Network+-only branch
- Generalized certification notes filtering so textbook-placeholder roots stay hidden across certification tracks, not just Network+
- Extended the Playwright smoke test to verify the Security+ certification can load its notes page and domain-selection quiz flow
- Restored browser-cached course and certification dropdown persistence across refresh and updated the walkthrough/course-selection logic to coexist with the explicit placeholder defaults
- Bumped the frontend app cache key through `2026-04-28-10` so browsers fetch the Security+ release, dropdown-persistence fix, and Week 14 availability update
- Bumped the package version through `1.0.3`

### Course Selection Persistence Fix

The course and certification selectors now keep their saved values across refresh without breaking the new placeholder defaults or the guided tour.

**Bugs fixed / behavior changes**

- Restored local-storage loading for the course and certification dropdowns on startup
- Made the rebuilt `<select>` elements explicitly apply their saved `.value` after options are rendered
- Let the guided tour auto-pick the first course only for its own first step so the new blank default no longer triggers the validation alert
- Unblocked Week `14` by removing its stale `coming soon` hardcode and adding the missing Week `14` video/source mappings
- Corrected `courses/Security+/notes-manifest.json` so it reflects the actual Security+ notes filesystem
- Kept dropdown placeholders as the default when no valid saved selection exists

**Validation**

- Regenerated course notes manifests with `python3 scripts/build_course_notes_manifests.py`
- Ran `npx playwright test tests/app-smoke.spec.js`; the smoke test passed with the new Security+ flow included
- Ran a focused Playwright refresh test and confirmed both dropdown selections persisted before and after reload
- Removed the temporary diagnostic test after verification

### Question Bank Cleanup and Week 14 Refresh

The NETC-121 question banks were cleaned up so the generated review material is less repetitive, less source-dependent, and more technically precise. Week 14 also received a fresh 150-question bank tied to the current routing and wireless coverage.

**Content updates**

- Added `courses/NETC-121/question-banks/week14_question_bank.csv` with `150` questions split evenly across `easy`, `medium`, and `hard`
- Removed approved duplicate question text from later-repeat NETC-121 week banks so repeated concepts are not overcounted across weeks
- Reworded source-dependent questions that asked students to remember note phrasing or certification wording instead of the actual networking concept
- Reworded vague question stems across the routing and switching banks so the prompts use clearer nouns and less implied context
- Corrected the approved misconception patterns for NAT return traffic, classic STP forward delay, router-on-a-stick subinterfaces, and remote-subnet first-hop delivery
- Removed the leading `*` concept markers from the Week 14 lecture and wireless transcript files after the question generation pass was complete

**Bugs fixed / behavior changes**

- Bumped the frontend app cache key to `2026-04-28-08` so browsers fetch the refreshed question-bank content and latest changelog entry
- Bumped the package version to `1.0.1` to match the content and release-note update

**Validation**

- Confirmed the Week 14 bank contains `150` generated questions with an even `50 / 50 / 50` difficulty split
- Confirmed the approved duplicate-removal list was applied to the affected NETC-121 weekly banks
- Confirmed the targeted memorization, clarity, and misconception rewrites were applied to the approved question IDs and week banks
- Confirmed the Week 14 lecture and wireless transcript files no longer contain line-leading asterisk markers

### NETC-121 Week 14 Notes and Syllabus Refresh

Week 14 study content was extended with the wireless fundamentals video note, and the syllabus was cleaned up so the listed readings and videos match the current course materials more explicitly.

**Content updates**

- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 28 - Wireless Fundamentals Day 55/Transcript.md`
- Covered wireless LAN basics including `802.11`, Wi-Fi bands, `RF`, `CSMA/CA`, `SSID`, `BSSID`, service sets, AP roles, and the `1 / 6 / 11` channel recommendation
- Updated `courses/NETC-121/notes-content/syllabus.md` so Week 14 now lists `Video 28 - Wireless Fundamentals Day 55`
- Replaced blank reading cells in Weeks `12` through `15` with `no reading assignment` so the table no longer leaves missing textbook rows ambiguous

### Expired Maintenance Notice Removed

The old maintenance window announcement was removed from the course selection screen after the scheduled outage had already passed.

**Bugs fixed / behavior changes**

- Removed the expired maintenance notice block from `index.html`
- Removed the unused `.maintenance-notice` CSS from `styles.css`
- Left the rest of the course selection screen and changelog panel behavior unchanged

**Validation**

- Confirmed the updated Week 14 row exists in `courses/NETC-121/notes-content/syllabus.md`
- Confirmed the maintenance notice markup and CSS selectors no longer exist in `index.html` or `styles.css`

---

## 2026-04-23

### Notes Explorer Default Expansion

The notes explorer now opens the first branch in the hierarchy by default so users land on visible note folders instead of a fully collapsed tree.

**Bugs fixed / behavior changes**

- Updated the notes tree builder in `app.js` so the first folder path at each level starts expanded on initial render
- Added a smoke-test assertion in `tests/app-smoke.spec.js` to verify the first notes-tree toggle starts with `aria-expanded="true"`
- Regenerated `courses/NETC-121/notes-manifest.json` and `courses/Network+/notes-manifest.json` after the notes-explorer update
- Added both course manifest files to git tracking in this repo

### Local Sync and Ignore Rule Cleanup

Deployment and local-workflow ignore rules were tightened so development artifacts and feedback logs stop creating noisy sync and git status churn.

**Bugs fixed / behavior changes**

- Restored `node_modules/**` to `.vscode/sftp.json` so the VS Code SFTP extension stops trying to upload Playwright and dependency binaries
- Added `FEEDBACK/changes.csv` and `FEEDBACK/question_history.csv` to `.gitignore` so local feedback logs stay out of git status

**Validation**

- Ran `npx playwright test tests/app-smoke.spec.js`; the smoke test passed
- Regenerated course notes manifests with `python3 scripts/build_course_notes_manifests.py`

---

## 2026-04-17

### Week 12 and Week 13 Lecture Notes Expanded

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

## 2026-04-16

### Week 12 AI Master List Added

Week 12 now has a dedicated AI master list generated from the Week 12 syllabus scope and the local Week 12 routing notes.

**Content updates**

- Added `courses/NETC-121/notes-content/MASTER LIST/Weekly AI Master Lists/Week 12 - AI Master List.md`
- Scoped the Week 12 list to static routing review, route summarization, router hierarchies, default routes, RIP routing, and intro dynamic-routing concepts
- Documented that Week 12 has no listed textbook reading assignment in the syllabus
- Documented that EIGRP, OSPF, and BGP are mentioned only as comparison/context for Week 12 rather than required focus topics
- Added Week 12 to `courses/NETC-121/notes-manifest.json` so it appears in the in-app notes browser
- Updated the weekly AI master list `README.md` index through Week 12

### NETC-121 Master List Coverage Expanded

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

### Linux Clipboard and Report Action Fixes

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

## 2026-04-12

### Week 12 Notes, Syllabus, and Routing Scope Updates

Week 12 content was expanded around route summarization and hierarchical routing, and the course planning files were updated to reflect that scope.

**Content updates**

- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 24 - Route Summarization/Transcript.md`
- Added `courses/NETC-121/notes-content/Notes List A - Video Content/Video 25 - Router Hierarchies and Default Routes/Transcript.md`
- Updated `courses/NETC-121/notes-content/MASTER LIST/syllabus.md` so Week 12 includes Videos `24-25`
- Used the Week 12 lecture scope to identify advanced routing topics that should not be emphasized yet

### Week 11 and Week 12 Question Bank Cleanup

The routing banks were adjusted to better match current class coverage and reduce overlap, especially around advanced protocol topics.

**Content updates**

- Trimmed clearly out-of-scope advanced-routing questions from `courses/NETC-121/question-banks/week11_question_bank.csv`
- Added `courses/NETC-121/question-banks/week12_question_bank.csv` with an initial `150` questions built in `50 easy / 50 medium / 50 hard` distribution
- Removed duplicate or redundant Week 12 questions after review against older banks and against the new Week 12 bank itself
- Removed Week 12 questions that explicitly quizzed `OSPF` or `EIGRP` after the scope was narrowed away from those protocols
- Left Week 12 content focused on dynamic routing basics, RIP behavior, route summarization, longest-prefix match, default routes, and hierarchical router design

### Week 12 Clarity Rewording Pass

The Week 12 bank received a wording pass to make stems more self-contained and easier to parse without hidden context.

**Bugs fixed / behavior changes**

- Reworded vague Week 12 question stems to use more explicit nouns and less course-dependent shorthand
- Clarified prefix-length questions so `/24`, `/16`, `/8`, and `/0` are framed in terms of IPv4 destination-address matching
- Clarified hierarchy and default-route questions so the networking decision context appears directly in the stem
- Preserved concept coverage while making the questions less ambiguous for first-read comprehension

### Targeted Misconception Fixes in Existing Banks

Several previously-identified question patterns were rewritten so the intended answer remains technically correct even under realistic alternate scenarios.

**Bugs fixed / behavior changes**

- Rewrote the NAT return-traffic question in `courses/NETC-121/question-banks/week5_question_bank.csv` so the answer depends on NAT translation/state tracking rather than any ARP-based interpretation
- Rewrote the router-on-a-stick gateway question in `courses/NETC-121/question-banks/week7_question_bank.csv` so it clearly refers to each router subinterface rather than the entire physical trunk interface
- Rewrote the remote-subnet first-step question in `courses/NETC-121/question-banks/week10_question_bank.csv` so the destination is fixed as remote and the only correct first action is learning the default gateway MAC with ARP
- Confirmed the classic STP forward-delay question already matched the corrected interpretation: `15 seconds` for the timer itself, distinct from the combined `30 seconds` spent across listening plus learning

---

## 2026-04-09

### Course Loading, Network+ Domains, and Ignore Rules

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

### Notes Explorer and Markdown Rendering Fixes

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

### Week 11 Availability UI Fix

Week 11 is now treated as a live quiz week in the frontend instead of lingering in placeholder mode after the new content rollout.

**Bugs fixed / behavior changes**

- Bumped the frontend app version in `app.js` to force the browser to pick up the latest week availability state
- Added Video `22` and Video `23` to the frontend video-to-week mapping as Week `11`
- Added a hard-coded source label for the Week 11 AI master list so review/report references stay aligned with the new week
- Added an explicit Week `11` availability override in the frontend so the selector no longer falls back to the `coming soon` placeholder

---

## 2026-04-08

### Week 11 Question Bank Added

Week 11 now has a dedicated 150-question bank built from the current Week 11 master list scope.

**Content updates**

- Added `week11_question_bank.csv` with `150` questions
- Structured the bank by request with:
  - `easy` for foundational Week 11 concepts
  - `medium` for tougher in-scope Week 11 concepts
- `hard` for adjacent CCNA / Network+ style extensions outside class scope
- Kept the questions conceptual rather than source-memorization based

---

### Week 11 Syllabus and Master List Updated

Week 11 planning content now reflects the new routing videos and includes a dedicated Week 11 AI master list.

**Content updates**

- Updated the Week 11 row in `notes-content/MASTER LIST/syllabus.md` to include Videos `22-23`
- Added `notes-content/MASTER LIST/Weekly AI Master Lists/Week 11 - AI Master List.md`
- Documented the current Week 11 source gap for `BPDU guard` and the empty `Lecture Week 11.md` note

---

### Week 10 Video 23 Notes Added

Week 10 notes now also include a new video transcript summary for dynamic routing protocol categories.

**Content updates**

- Added `Notes List A - Video Content/Video 23 - Dynamic Routing Protocols/Transcript.md`
- Updated the notes manifest so Video 23 appears in the in-app Notes Explorer
- Updated the Week 10 AI master list source references from videos `20-22` to `20-23`

---

### Week 10 Video 22 Notes Added

Week 10 notes now include a new video transcript summary for routing fundamentals.

**Content updates**

- Added `Notes List A - Video Content/Video 22 - Routing Fundamentals/Transcript.md`
- Updated the notes manifest so Video 22 appears in the in-app Notes Explorer
- Updated the Week 10 AI master list source references from videos `20-21` to `20-22`

---

## 2026-04-03

### Guided Tour, Mobile Notes Menu, and Walkthrough Polish

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

## 2026-04-02

### Notes Workspace, Local-Only Progress, and Week 9-10 Expansion

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

## 2026-03-31

### Notes Mirror and Local Codex Placeholders

The local notes library takes shape to support the new study workspace.

**Features added**

- Repo-local `.codex` placeholder file appears
- `test1/.codex` placeholder file appears
- Synced notes content begins appearing in the repo-local `notes-content/` mirror
- `MASTER LIST/syllabus.md` appears in the synced note set
- Week 9 and Week 10 AI master-list note files are present in generated notes content

---

## 2026-03-28

### Alternate Workspace Server Iteration

Parallel app and server work supports the next feature wave.

**Features added**

- `test1/server.py` establishes a parallel app/server working copy for iterating on later features

---

## 2026-03-26

### Early Scratch Work For the Next Wave

The next round of features begins taking shape.

**Features added**

- Early work starts in `test1/` before the main repo-local update wave
- `test1/week1_question_bank.csv` changed first, with Week 9 and Week 10 files following shortly after

---

## 2026-03-14

### Major Content and Quiz Logic Expansion

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

## 2026-03-06

### Records Safety Guard + Week 7 Content

This update strengthens deployment safety while expanding course content.

**Features added**

- Week 7 question bank added
- Records-root resolver in `server.py`

**Bugs fixed**

- Added a safety guard so `PRACTICE_QUIZ_RECORDS_DIR` values under `/var/www/html` fall back to the project directory instead of writing quiz records into the web root

---

## 2026-02-28

### UX Expansion: Splash Screen, Branding, Course Setup

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

### API Port and Deployment Docs Update

**Features added**

- README updated to reflect the API server workflow and port `3003`

**Bugs / docs issues addressed**

- Corrected outdated run instructions that still referenced port `8000`
- Clarified that the app was intended for web-server deployment

### Quiz UX, Answer History Sync, Records Tooling

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

## 2026-02-26

### Browser App Rewrite Begins

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

## 2026-02-25

### Project Foundation

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

### License Added

**Features added**

- MIT license added to the repository

---

## Feature Timeline At A Glance

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

## Historical Confidence

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
