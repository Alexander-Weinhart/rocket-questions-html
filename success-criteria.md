# Rocket Questions HTML Success Criteria

This document defines app-level success criteria based on the implemented functionality, UI flows, persistence behavior, backend support, and historical feature work in this repository through April 14, 2026.

It is written as acceptance criteria: the app is successful when all of the statements below are true in the current build.

## 1. App Boot and Content Loading

- The app loads in a browser without a blank screen, fatal script error, or broken primary layout.
- The course-selection screen renders on first load and shows both `Courses` and `Certifications` selectors.
- The startup/loading experience can transition cleanly into the course workspace flow.
- The app can load the changelog view on the course-selection screen.
- The app can load question-bank metadata, notes manifest data, and change-history data without duplicating initialization.
- If notes content is missing, the app shows a clear fallback message instead of failing silently.
- Cache/versioned asset loading does not leave users stuck on obviously stale UI state after a deploy.

## 2. Course and Track Selection

- A user can choose a course or certification and explicitly continue into that track.
- The selected dropdown value does not accidentally switch the active track until the corresponding `Continue` button is used.
- Track-specific branding, labels, and content roots update to reflect the selected course/certification.
- The workspace can support both `NETC-121` and `Network+` content structures.
- `Network+` can use domain-based practice units rather than week-based assumptions.
- Unavailable future units can be shown as `coming soon` without breaking the selector flow.

## 3. Workspace Menu

- After track selection, the user reaches a workspace chooser with both `Practice Quiz` and `Notes Lists`.
- The user can move from workspace chooser back to course selection without a broken state.
- The workspace chooser descriptions accurately reflect the destination behavior.

## 4. Notes Experience

- The `Notes Lists` workspace opens an in-app notes viewer rather than requiring external files to be opened manually.
- The notes viewer presents a file explorer and markdown reading pane together.
- The notes explorer is scoped to the active track rather than mixing content across courses.
- Markdown files listed in the manifest can be opened and rendered in the viewer.
- Internal markdown-link navigation works for linked note files.
- Markdown rendering preserves common source formatting well enough to remain readable and structurally correct.
- Mobile layout supports a usable notes explorer drawer/hamburger flow.
- The notes screen header remains functional and readable on mobile.
- Network+ filtering rules exclude intentionally hidden textbook content while preserving allowed note files.

## 5. Practice Unit Selection

- The quiz path presents a unit selector appropriate to the active track, such as weeks for `NETC-121`.
- Users can select one or more available units before starting setup.
- Unit cards display availability or readiness in a way that does not mislead the user.
- The app handles newer added units, including later-course weeks, without regressing earlier ones.

## 6. Quiz Setup and Configuration

- The setup screen allows difficulty selection across `easy`, `medium`, and `hard`.
- Difficulty rules are enforced correctly, including the intended pool expansion for medium mode.
- The question-count control can be changed through the custom stepper and remains usable on desktop and mobile.
- Requested question count is clamped to actual available questions.
- Availability text updates as setup options change.
- `Skip Previously Correct Questions` can be toggled and affects pool selection.
- `Include Questions Missed Once` can be toggled and affects pool selection.
- Quiz configuration persists in browser storage and restores without corrupting the setup UI.
- The user can return to unit selection from setup without stale or broken configuration state.
- `Reset All Answered Questions` is available from setup and is guarded by confirmation.

## 7. Quiz Execution

- Starting a quiz builds a question session from the selected track, units, difficulty, and filtering options.
- The quiz screen shows question text, four answer choices, live quiz metadata, and live score feedback.
- A user can submit an answer and receive clear correctness feedback.
- The app advances correctly from one question to the next without losing session state.
- `I Don't Know` records an unresolved attempt without breaking the flow.
- `Finish Quiz` can end the session early and still produce a valid review report.
- `Back to Setup` from an in-progress quiz returns safely without corrupting saved state.
- If no questions are available after filtering, the app fails gracefully with clear user feedback.

## 8. Question Quality and Scope Controls

- `Not in Current Course Scope` is available during quiz play.
- Marking a question as out of scope reclassifies it according to the implemented behavior and excludes it from the active run without affecting quiz score unfairly.
- `Ineffective Question` opens a feedback dialog instead of silently discarding the item.
- Ineffective-question feedback is required before submission.
- Submitted ineffective questions are removed from the active session according to the implemented local override behavior.
- The app preserves the distinction between content-quality issues and learner-performance issues.

## 9. Review Report and Study Feedback

- Completing or finishing a quiz produces a review screen.
- The review report summarizes score and performance in a readable text format.
- The report includes missed-question review detail and explanation content where implemented.
- The report includes a usable topics-to-review or study-guidance section inferred from quiz results.
- `Copy Report` is available from review and invokes the implemented clipboard copy path without breaking the review workflow.
- `Download Report` saves the current review text to a file successfully, using a track-tagged report filename.
- `Print Report` presents a print-friendly version of the current review text rather than a blank print surface.
- `Retake Incorrect Only` launches a follow-up session limited to missed questions when such questions exist.
- `Back to Setup` from review returns the user to quiz setup cleanly.
- `Reset All Answered Questions` is available from review, is guarded by confirmation, and clears local answered-question history when confirmed.

## 10. Guided Walkthrough

- On supported desktop layouts, the app can offer a guided walkthrough prompt on load.
- The walkthrough can progress from course selection through workspace selection, notes, setup, quiz, and review screens.
- Walkthrough spotlight positioning does not cover critical controls so badly that the user cannot continue.
- Tour-only steps that should not trigger live actions provide a `Next` path from the overlay.
- The demo walkthrough question flow can show correct-answer, wrong-answer, ineffective-question, out-of-scope, `I Don't Know`, and early-finish behaviors.
- Walkthrough-only demo actions do not pollute real server-side change records.
- If the ineffective-question dialog is canceled during the walkthrough, the tour rewinds cleanly instead of dead-ending.
- On mobile layouts where the desktop walkthrough is not appropriate, the app shows a graceful unavailable/continue path instead of a broken overlay.

## 11. Persistence and Per-User State

- Per-user answered-question history is browser-local and does not alter another user’s filtering behavior.
- Local history is deduplicated before availability calculations.
- Browser storage persists quiz history, local overrides, reports, and setup state without preventing future app loads.
- Local persistence can coexist with server-backed change logging.
- Removing or flagging questions in one browser session does not incorrectly rewrite the source question-bank files.
- Auto-saved report/history behavior does not break when the server is unavailable.

## 12. Server and API Support

- The bundled Python server can serve the static app and respond to API requests from the same workspace.
- `POST /api/changes` accepts valid change rows and persists them to CSV.
- `GET /api/changes` returns current change data as CSV.
- `POST /api/history` accepts valid answer-history rows and persists them to CSV.
- `GET /api/history` returns current answer-history data as CSV.
- The records directory is created automatically when needed.
- The environment-variable override for the records directory works.
- The server guards against writing records under `/var/www/html` by redirecting storage back to the project directory.
- Ineffective-question feedback validation rejects empty feedback, oversized feedback, invalid control characters, and blocked SQL-like patterns.
- CSV writes preserve headers safely as fields evolve over time.

## 13. Data and Content Integrity

- Question-bank loading works across the current multi-course folder structure.
- Newly added weeks or domains can be introduced without breaking earlier banks.
- Notes manifests can be regenerated to reflect real note files in the active track.
- Changelog content can be displayed inside the app as a project-updates surface.
- Added content revisions, wording fixes, and scope cleanups in question banks do not create duplicate or obviously contradictory runtime behavior.

## 14. Responsive and Usability Expectations

- The app remains usable on desktop and mobile layouts.
- Core actions remain discoverable after layout changes, including notes navigation, setup controls, quiz controls, and review actions.
- Important buttons are not hidden behind overlays, clipped off-screen, or merged into unusable touch targets.
- Visual emphasis supports the study workflow without making text difficult to read.
- The app uses clear screen-to-screen transitions so the user understands where they are in the workflow.

## 15. Regression Gate

The app should be considered functionally successful only if all major end-to-end journeys still work:

- Journey 1: select a course, open notes, read notes, and return safely.
- Journey 2: select a course, configure a quiz, answer questions, finish, and review the report.
- Journey 3: mark one question out of scope and one question ineffective without crashing the session.
- Journey 4: use post-quiz actions from a completed report, including copy, download, print, retake, back-to-setup, and reset-history confirmation.
- Journey 5: refresh the page and confirm locally saved state restores appropriately.
- Journey 6: run the app through the bundled server and confirm change/history APIs still function.
- Journey 7: on supported desktop layout, complete the guided walkthrough from start through review.

## 16. Suggested Test Outcome

If this document is used as a release gate, the simplest pass/fail standard is:

- Pass: every criterion above is either confirmed working or intentionally marked not applicable for the active track/build.
- Fail: any core learning journey, persistence rule, reporting path, or backend logging path is broken, misleading, or silently non-functional.
