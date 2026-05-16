<wizard-report>
# PostHog post-wizard report

The wizard completed a deep integration of PostHog analytics into Rocket Questions. PostHog was already partially integrated (browser snippet in `index.html`, a `phCapture` helper in `app.js`, and six tracked events). This integration added seven new events covering workspace navigation, notes engagement, quiz hygiene actions, and the standalone Port Number Matching PBQ page — which previously had no analytics at all.

## Events added

| Event | Description | File |
|---|---|---|
| `workspace selected` | User clicks Practice Quiz, Notes, or PBQs from the menu screen; includes `workspace` property | `app.js` |
| `pbq launched` | User clicks the Launch PBQ button to open an interactive scenario; includes `pbq_id` and `pbq_title` | `app.js` |
| `quiz history reset` | User confirms resetting all answered-question history; includes `rows_cleared` count | `app.js` |
| `ineffective question reported` | User submits feedback marking a question as ineffective; it is removed from the bank | `app.js` |
| `note opened` | User opens a markdown note file in the notes viewer; includes `note_path`, `note_label`, `is_video_note` | `app.js` |
| `pbq submitted` | User submits the Port Number Matching PBQ for grading; includes `slot_count` | `courses/Network+/pbqs/port-number-matching/index.html` |
| `pbq graded` | Port Number Matching grading completes; includes `score_percent`, `correct_count`, `total_slots`, `perfect_protocols` | `courses/Network+/pbqs/port-number-matching/index.html` |

The port-number-matching page also received the PostHog browser snippet and a local `phCapture` helper, since it is a standalone HTML file that does not share `index.html`'s script context.

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/1590069)
- [Course Selections (Daily)](/insights/VkP1FCBg) — daily unique users who selected a course
- [Quiz Started → Finished Conversion](/insights/4Ezn1Ngs) — funnel showing quiz completion rate
- [Workspace Usage by Mode](/insights/Wiu7sCMc) — breakdown of practice quiz vs notes vs PBQs usage
- [Notes Opened Over Time](/insights/AE695Qxp) — daily notes engagement
- [Course Selection → Quiz Finished Funnel](/insights/40VxhUZI) — full three-step study-session conversion funnel

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_node/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
