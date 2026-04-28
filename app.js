(() => {
if (window.__NETC_QUIZ_APP_BOOTED__) {
  window.__NETC_QUIZ_APP_SCRIPT__ = true;
    window.__NETC_QUIZ_APP_VERSION__ = "2026-04-28-10";
  return;
}
window.__NETC_QUIZ_APP_BOOTED__ = true;

const WEEK_CHOICES = Array.from({ length: 15 }, (_, i) => i + 1);
const DOMAIN_CHOICES = Array.from({ length: 5 }, (_, i) => i + 1);
window.__NETC_QUIZ_APP_SCRIPT__ = true;
window.__NETC_QUIZ_APP_VERSION__ = "2026-04-28-10";
window.__NETC_QUIZ_APP_READY__ = false;
const API_PORT = "3003";
const COURSE_STORAGE_KEY = "rocket_questions_selected_course";
const CERTIFICATION_STORAGE_KEY = "rocket_questions_selected_certification";
const TRACK_TYPE_STORAGE_KEY = "rocket_questions_active_track_type";
const HISTORY_STORAGE_KEY = window.__ROCKET_HISTORY_STORAGE_KEY__ || "rocket_questions_history_local";
const CHANGES_STORAGE_KEY = "rocket_questions_changes_local";
const OVERRIDES_STORAGE_KEY = "rocket_questions_overrides";
const REPORTS_STORAGE_KEY = "rocket_questions_reports";
const CONFIG_STORAGE_KEY = "rocket_questions_quiz_config";
const CHANGELOG_PATH = `./changelog.md?v=${window.__NETC_QUIZ_APP_VERSION__}`;
const TOUR_QUESTION_BANK_PATH = `./tour_question_bank.csv?v=${window.__NETC_QUIZ_APP_VERSION__}`;
const NO_COURSE_ID = "";
const NO_CERTIFICATION_ID = "";
const COURSE_CATALOG = [
  {
    id: "netc121",
    browserTitle: "Rocket Questions - Cincinnati State NETC-CS Program",
    pageTitle: "Rocket Questions - Cincinnati State NETC-CS Program",
    insignia: "NETC-121",
    name: "Network Communications 1",
    subtitle: "May we all succeed or fail as a team.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
    contentRoot: "courses/NETC-121",
    manuallyAvailableWeeks: [11, 13],
    questionBankChoices: Array.from({ length: 15 }, (_, i) => i + 1),
  },
];
const CERTIFICATION_CATALOG = [
  {
    id: "comptia-network-plus-n10-009",
    browserTitle: "Rocket Questions - CompTIA Network+ N10-009",
    pageTitle: "Rocket Questions - CompTIA Network+ N10-009",
    insignia: "N10-009",
    name: "The CompTIA N10-009 Network+ Certification",
    subtitle: "Study the objectives, then make the objectives regret meeting you.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
    contentRoot: "courses/Network+",
    questionBankChoices: [1],
    practiceUnit: {
      singular: "Domain",
      plural: "Domains",
      choices: DOMAIN_CHOICES,
      filenamePrefix: "domain",
      comingSoonChoices: new Set(DOMAIN_CHOICES),
      labelForChoice: (choice) => `Domain ${choice}`,
    },
  },
  {
    id: "comptia-security-plus-sy0-701",
    browserTitle: "Rocket Questions - CompTIA Security+ SY0-701",
    pageTitle: "Rocket Questions - CompTIA Security+ SY0-701",
    insignia: "SY0-701",
    name: "The CompTIA Security+ SY0-701 Certification",
    subtitle: "Lock the doors, audit the logs, and make the threat actors file a complaint.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
    contentRoot: "courses/Security+",
    questionBankChoices: [1],
    practiceUnit: {
      singular: "Domain",
      plural: "Domains",
      choices: DOMAIN_CHOICES,
      filenamePrefix: "domain",
      comingSoonChoices: new Set(DOMAIN_CHOICES),
      labelForChoice: (choice) => `Domain ${choice}`,
    },
  },
];
const MANUALLY_AVAILABLE_WEEKS = new Set([11]);
const NETC121_COMING_SOON_CHOICES = new Set([]);
const NETC121_CHOICE_LABELS = new Map([
  [15, "Final Exam Prep"],
]);

const VIDEO_WEEK_MAP = {
  1: 3, 2: 3, 3: 3,
  4: 4, 5: 4, 6: 4,
  7: 5, 8: 5, 9: 5,
  10: 6, 11: 6,
  12: 7, 13: 7, 14: 7, 15: 7,
  16: 8, 17: 8,
  18: 9, 19: 9,
  20: 10, 21: 10,
  22: 11, 23: 11,
  24: 12, 25: 12,
  26: 13, 27: 13,
  28: 14,
};
const VIDEO_TITLE_MAP = {
  1: "Unicast, Broadcast, Multicast",
  2: "Ethernet Frame Structure",
  3: "CSMA-CD and CSMA-CA",
  4: "DHCP",
  5: "TCP-IP Model",
  6: "Wireshark",
  7: "Subnetting",
  8: "Binary Math and Subnetting",
  9: "CIDR and IP Addressing",
  10: "Telnet and SSH",
  11: "Factory Reset Cisco Switch",
  12: "What Is Binary",
  13: "Representing Numbers and Letters with Binary",
  14: "How to Convert Binary to Decimal",
  15: "SolarWinds TFTP Server",
  16: "VLANs Made Easy",
  17: "Trunking and 802.1Q",
  18: "Spanning Tree Protocol Explained Step by Step",
  19: "Micronugget: Spanning Tree Protocol Explained CBT Nuggets",
  20: "What Is a Routing Table?",
  21: "Packet Traveling - How Packets Move Through a Network",
  22: "Routing Fundamentals",
  23: "Dynamic Routing Protocols",
  24: "Route Summarization",
  25: "Router Hierarchies and Default Routes",
  26: "Layer 2 vs Layer 3 Switches",
  27: "Micronugget What is Route Redistribution",
  28: "Wireless Fundamentals Day 55",
};
const SYLLABUS_TEXTBOOK_BY_WEEK = {
  1: "Textbook 1 - Chapter 1 Network Basics",
  2: "Textbook 1 - Chapter 2 Network Fundamentals",
  3: "Textbook 2 - Chapter 1 Protocols and Standards",
  4: "Textbook 2 - Chapters 2-3 Internet Foundations",
  5: "Textbook 2 - Chapters 5-6 DHCP and DNS",
  6: "Textbook 2 - Chapters 6-7 DNS and Name Resolution",
  7: "Essentials - Chapter 8",
  8: "Textbook 1 - Chapter 3",
  9: "Textbook 1 - Chapter 4",
  10: "Essentials - Chapter 9",
  11: "Essentials - Chapter 9",
};
const NO_TEXTBOOK_PLACEHOLDER = "No textbook assignment";
const TEXTBOOK_WEEK_MARKERS = [
  ["textbook 1 - chapter 1", 1],
  ["textbook 1 - chapter 2", 2],
  ["textbook 1 - chapter 3", 8],
  ["textbook 1 - chapter 4", 9],
  ["textbook 2 - chapter 1", 3],
  ["textbook 2 - chapter 2", 4],
  ["textbook 2 - chapter 3", 4],
  ["textbook 2 - chapter 5", 5],
  ["textbook 2 - chapter 6", 6],
  ["textbook 2 - chapter 7", 6],
  ["essential, chap 8", 7],
  ["essential, chap 9", 10],
  ["essentials, chap 8", 7],
  ["essentials, chap 9", 10],
];
const HARD_CODED_SOURCE_REFERENCES = [
  {
    marker: "week 11 - ai master list",
    label: "Week 11 - AI Master List",
  },
  {
    marker: "week 10 - ai master list",
    label: "Week 10 - AI Master List",
  },
  {
    marker: "week 14 - ai master list",
    label: "Week 14 - AI Master List",
  },
  {
    marker: "b_consolidated_config_guide_3850_chapter_01011100.html",
    label: "Week 10 - Cisco: Static Routing and IPv6 Routing",
  },
  {
    marker: "implementing_cisco_express_forwarding.html",
    label: "Week 10 - Cisco: Cisco Express Forwarding",
  },
  {
    marker: "218429-configure-inter-vlan-routing-with-cataly.html",
    label: "Week 10 - Cisco: Inter-VLAN Routing",
  },
  {
    marker: "hot-standby-router-protocol-hsrp",
    label: "Week 10 - Cisco: HSRP",
  },
  {
    marker: "new-comptia-network-plus-certification-strengthens-foundational-skills-expands-security-scope-of-training-for-tech-professionals",
    label: "Week 10 - CompTIA: Current Network+ Topics",
  },
];
const APP_BASE_URL = new URL(".", document.currentScript?.src || window.location.href);
function apiURL(path) {
  const cleanPath = String(path || "").startsWith("/") ? String(path || "") : `/${path || ""}`;
  return `${window.location.protocol}//${window.location.hostname}:${API_PORT}${cleanPath}`;
}

const TOUR_STEPS = [
  {
    screenId: "course-screen",
    selector: "#continue-course",
    title: "Start the Tour",
    body: "This first screen lets you choose your course and preview project updates. Click Continue to move into the workspace chooser.",
    action: "continue-course",
  },
  {
    screenId: "menu-screen",
    selector: "#go-notes",
    title: "Notes Workspace",
    body: "The workspace menu splits the app into study notes and quiz practice. Click Notes Lists so the tour can show the notes view first.",
    action: "go-notes",
  },
  {
    screenId: "notes-screen",
    selector: "#back-notes-to-menu",
    title: "Explore the Notes Screen",
    body: "The notes explorer lives on the left, and the markdown reader lives on the right. When you are ready to continue the tour, click Back to Previous Menu.",
    action: "back-notes-to-menu",
  },
  {
    screenId: "menu-screen",
    selector: "#go-practice-quiz",
    title: "Practice Quiz Workspace",
    body: "Now switch over to the quiz flow. Click Practice Quiz to move into week selection.",
    action: "go-practice-quiz",
  },
  {
    screenId: "week-screen",
    selector: "#continue-setup",
    title: "Week Selection",
    body: "This screen controls which weeks feed the quiz. For the walkthrough, the week controls are just being introduced, so click Continue to Setup.",
    action: "continue-setup",
  },
  {
    screenId: "config-screen",
    selector: "#mode-select",
    title: "Mode Dropdown",
    body: "This dropdown controls difficulty. Click it to inspect the options: easy covers beginner-friendly fundamentals, medium includes easy plus in-scope class content, and hard covers advanced expansion topics.",
    action: "mode-select-click",
  },
  {
    screenId: "config-screen",
    selector: "#mode-select",
    title: "Medium Option",
    body: "Choose medium to preview the broader class-scope pool that includes both easy and medium questions.",
    action: "mode-medium",
  },
  {
    screenId: "config-screen",
    selector: "#mode-select",
    title: "Hard Option",
    body: "Choose hard to preview the advanced expansion pool beyond the core class scope.",
    action: "mode-hard",
  },
  {
    screenId: "config-screen",
    selector: "#mode-select",
    title: "Easy Option",
    body: "Set the dropdown back to easy so the walkthrough can launch the simple demo quiz next.",
    action: "mode-easy",
  },
  {
    screenId: "config-screen",
    selector: "#question-count",
    title: "Questions Field",
    body: "This number field controls quiz length. Set it to 6 for the walkthrough demo.",
    action: "question-count-6",
  },
  {
    screenId: "config-screen",
    selector: "#skip-correct",
    title: "Skip Previously Correct Questions",
    body: "Turn this checkbox on to hide questions you already answered correctly in this browser.",
    action: "skip-correct-on",
  },
  {
    screenId: "config-screen",
    selector: "#include-missed-once",
    title: "Include Questions Missed Once",
    body: "Turn this checkbox on to bring back questions that were missed before, even when skip-correct is enabled.",
    action: "include-missed-on",
  },
  {
    screenId: "config-screen",
    selector: "#start-quiz",
    title: "Start Quiz",
    body: "The configuration summary updates live as you change options. When you are ready, click Start Quiz to launch the special six-question demo bank built for the walkthrough.",
    action: "start-quiz",
  },
  {
    screenId: "quiz-screen",
    selector: "#submit-answer",
    title: "Submit Answer",
    body: "This first demo question shows the standard answer flow. Select B, then click Submit Answer.",
    action: "submit-correct",
  },
  {
    screenId: "quiz-screen",
    selector: "#next-question",
    title: "Feedback and Next Question",
    body: "The app now shows feedback, updates your running score, and enables Next Question after you answer. Click Next Question to continue to the second demo question.",
    action: "next-question",
  },
  {
    screenId: "quiz-screen",
    selector: "#submit-answer",
    title: "Question 2: Miss One On Purpose",
    body: "This second demo question is a riddle. To make sure the walkthrough demonstrates the incorrect-answer flow, choose any wrong answer except n, then click Submit Answer.",
    action: "submit-incorrect",
  },
  {
    screenId: "quiz-screen",
    selector: "#next-question",
    title: "Next Question Again",
    body: "Question 2 is complete now, so Next Question moves you forward through the quiz. Click it to reach the ineffective-question demo.",
    action: "next-question",
  },
  {
    screenId: "quiz-screen",
    selector: "#ineffective-question",
    title: "Ineffective Question",
    body: "This third demo question is gloriously awful: every choice is basically some version of 'your mom.' That means the question itself is the problem, not your studying. Click Ineffective Question so the walkthrough can treat this as a comedy example of a badly written item.",
    action: "open-ineffective-dialog",
  },
  {
    screenId: "quiz-screen",
    selector: "#submit-ineffective",
    title: "Report the Joke Question",
    body: "Amazingly, the tour is now asking you to write feedback about a question whose whole personality is that it deserves feedback. Type a short message in the dialog, then click Submit so the walkthrough can remove it. For the demo, this does not send anything to the server.",
    action: "submit-ineffective",
  },
  {
    screenId: "quiz-screen",
    selector: "#flag-question",
    title: "Not in Current Course Scope",
    body: "This next CISSP-style zero-trust microsegmentation question is far beyond what this selected NETC-121 course is trying to teach right now. We are absolutely not pretending this belongs in the same bucket as your current class fundamentals, so click Not in Current Course Scope.",
    action: "flag-not-in-scope",
  },
  {
    screenId: "quiz-screen",
    selector: "#dont-know-answer",
    title: "I Don't Know",
    body: "This fifth demo question is an ASCII question. Even if you know that decimal 64 is @, the point here is to demonstrate the I Don't Know button. Click it so the app can mark the question incorrect without you guessing.",
    action: "submit-dont-know",
  },
  {
    screenId: "quiz-screen",
    selector: "#next-question",
    title: "Move to the Final Question",
    body: "After using I Don't Know, Next Question becomes available again. Click it to reach the final finish-quiz demo question.",
    action: "next-question",
  },
  {
    screenId: "quiz-screen",
    selector: "#back-setup-from-quiz",
    title: "Back to Setup",
    body: "This button returns you to quiz setup without finishing the session. For the walkthrough, do not click the real button. Click Next in the walkthrough box instead.",
    action: "explain-back-setup",
  },
  {
    screenId: "quiz-screen",
    selector: "#finish-quiz",
    title: "Finish Quiz",
    body: "The sixth demo question is here only to prove you can end a run before answering every remaining question. Do not answer the life, the universe, and everything question. Leave it untouched and click Finish Quiz now.",
    action: "finish-quiz",
  },
  {
    screenId: "review-screen",
    selector: "#review-text",
    title: "Quiz Review Report",
    body: "This review report shows your score, the questions you missed, explanations, and suggested study references. Read this step, then click Next in the walkthrough box to continue.",
    action: "review-report",
  },
  {
    screenId: "review-screen",
    selector: "#copy-report",
    title: "Copy Report",
    body: "Copy Report puts the review text on your clipboard so you can paste it somewhere else. For the walkthrough, do not click the real button. Click Next in the walkthrough box instead.",
    action: "copy-report",
  },
  {
    screenId: "review-screen",
    selector: "#download-report",
    title: "Download Report",
    body: "Download Report saves the review as a text file for later. For the walkthrough, do not click the real button. Click Next in the walkthrough box instead.",
    action: "download-report",
  },
  {
    screenId: "review-screen",
    selector: "#print-report",
    title: "Print Report",
    body: "Print Report opens a print-friendly view of the review. For the walkthrough, do not click the real button. Click Next in the walkthrough box instead.",
    action: "print-report",
  },
  {
    screenId: "review-screen",
    selector: "#retake-incorrect",
    title: "Retake Incorrect Only",
    body: "Retake Incorrect Only launches a focused retry session using the questions you missed. For the walkthrough, do not click the real button. Click Next in the walkthrough box instead.",
    action: "retake-incorrect",
  },
  {
    screenId: "review-screen",
    selector: "#reset-wrong-count",
    title: "Reset All Answered Questions",
    body: "This button erases your answered-question history in this browser. Because that would be a terrible surprise during a walkthrough, the button is logically disabled for this demo. Read this step, then click Next in the walkthrough box to continue.",
    action: "review-reset-demo",
  },
  {
    screenId: "review-screen",
    selector: "#back-setup-from-review",
    title: "Back to Setup",
    body: "Back to Setup returns you to the quiz configuration screen. Click the real Back to Setup button now to finish the walkthrough.",
    action: "review-back-demo",
  },
];

const state = {
  courseId: NO_COURSE_ID,
  certificationId: NO_CERTIFICATION_ID,
  activeTrackType: "course",
  questionBank: [],
  availableWeeks: new Set(),
  weekAvailabilityReady: false,
  selectedWeeks: new Set(WEEK_CHOICES),
  mode: "easy",
  amount: 10,
  skipPreviouslyCorrect: false,
  includeMissedOnce: false,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  answeredCount: 0,
  incorrectRecords: [],
  setupVisited: false,
  lastReportText: "",
  lastAutoReportName: "",
  lastModeFinished: "easy",
  currentLocked: false,
  currentSelectedAnswer: "",
  currentOptionMap: {},
  localHistoryRows: [],
  localChangeRows: [],
  reports: [],
  overrides: { removedKeys: {}, difficultyOverrides: {} },
  notesManifest: null,
  notesFileMap: new Map(),
  currentNotePath: "",
  notesLoadError: "",
  changelogText: "",
  changelogLoadError: "",
  tourQuestionBank: [],
  walkthroughSteps: TOUR_STEPS,
  walkthroughIndex: 0,
  walkthroughScreenId: "",
  walkthroughPromptOpen: false,
  walkthroughActive: false,
  walkthroughOverrideTitle: "",
  walkthroughOverrideBody: "",
  changeServerSaveDisabled: false,
  historyServerSaveWarningShown: false,
  historyServerSaveDisabled: false,
};

const el = {};
let questionBankReloadPromise = null;
let notesManifestReloadPromise = null;

function activeCourse() {
  return COURSE_CATALOG.find((c) => c.id === state.courseId) || COURSE_CATALOG[0];
}

function activeCertification() {
  return CERTIFICATION_CATALOG.find((c) => c.id === state.certificationId) || null;
}

function activeTrack() {
  if (state.activeTrackType === "certification" && activeCertification()) {
    return activeCertification();
  }
  return activeCourse();
}

function activePracticeUnitConfig() {
  const certification = activeCertification();
  if (state.activeTrackType === "certification" && certification?.practiceUnit) {
    return certification.practiceUnit;
  }
  return {
    singular: "Week",
    plural: "Weeks",
    choices: WEEK_CHOICES,
    filenamePrefix: "week",
    comingSoonChoices: new Set(NETC121_COMING_SOON_CHOICES),
    labelForChoice: (choice) => NETC121_CHOICE_LABELS.get(choice) || `Week ${choice}`,
  };
}

function versionedContentURL(...parts) {
  const clean = parts
    .flat()
    .map((part) => String(part || "").replace(/\\/g, "/"))
    .join("/")
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");
  return `./${clean}?v=${encodeURIComponent(window.__NETC_QUIZ_APP_VERSION__)}`;
}

function activeNotesManifestURL() {
  return versionedContentURL(activeTrack().contentRoot, "notes-manifest.json");
}

function activeQuestionBankURL(choice) {
  const config = activePracticeUnitConfig();
  return versionedContentURL(activeTrack().contentRoot, "question-banks", `${config.filenamePrefix}${choice}_question_bank.csv`);
}

function activeQuestionBankChoices() {
  return activeTrack().questionBankChoices || activePracticeUnitConfig().choices;
}

function activeTrackManualWeeks() {
  return new Set(activeTrack().manuallyAvailableWeeks || []);
}

function rocketBrandHTML(text) {
  return `<span class="brand-inline"><img class="brand-inline-icon" src="./rocket_icon.png?v=${window.__NETC_QUIZ_APP_VERSION__}" alt="" aria-hidden="true"><span>${escapeHTML(text)}</span></span>`;
}

function applyCourseBranding() {
  const course = currentScreenId() === "course-screen" ? activeCourse() : activeTrack();
  const browserTitle = course.browserTitle || course.title || `${course.insignia} ${course.name}`;
  const pageTitle = course.pageTitle || course.title || browserTitle;
  document.title = browserTitle;
  if (el.appTitle) el.appTitle.innerHTML = rocketBrandHTML(pageTitle);
  if (el.appSubtitle) el.appSubtitle.textContent = course.subtitle;
  if (el.notesScreenTitle) {
    el.notesScreenTitle.innerHTML = rocketBrandHTML(`Rocket Questions Notes Lists for ${course.name}`);
  }
  renderAutoCopyright(course);
  syncPracticeUnitLabels();
}

function syncPracticeUnitLabels() {
  const config = activePracticeUnitConfig();
  if (el.practiceModeDescription) {
    el.practiceModeDescription.textContent = `Open ${config.singular.toLowerCase()} selection and start a custom practice run.`;
  }
  if (el.practiceUnitTitle) {
    el.practiceUnitTitle.textContent = `${config.singular} Selection`;
  }
  if (el.practiceUnitDescription) {
    el.practiceUnitDescription.textContent = `Select one or more available ${config.plural.toLowerCase()} before setup.`;
  }
}

function renderAutoCopyright(course) {
  if (!el.copy) return;
  const yearCreated = Number(course?.yearCreated || new Date().getFullYear());
  const owners = Array.isArray(course?.copyrightOwners) ? course.copyrightOwners : [];
  const currentYear = new Date().getFullYear();
  const lines = owners.map((owner) => {
    const ownerText = String(owner || "").trim();
    if (!ownerText) return "";
    if (currentYear > yearCreated) return `© ${yearCreated}-${currentYear} ${ownerText}`;
    return `© ${currentYear} ${ownerText}`;
  }).filter(Boolean);

  el.copy.innerHTML = "";
  lines.forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    el.copy.appendChild(p);
  });
}

function setNotesStatus(text) {
  if (el.notesSidebarStatus) el.notesSidebarStatus.textContent = text;
}

function setChangelogStatus(text) {
  if (el.courseChangelogStatus) el.courseChangelogStatus.textContent = text;
}

function currentScreenId() {
  const visible = document.querySelector(".screen:not(.hidden)");
  return visible?.id || "course-screen";
}

function isMobileWalkthroughBlocked() {
  const coarsePointer = window.matchMedia?.("(pointer: coarse)")?.matches;
  const narrowViewport = window.innerWidth <= 900;
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");
  return Boolean(mobileUA || (coarsePointer && narrowViewport));
}

function isMobileNotesLayout() {
  return window.innerWidth <= 1200;
}

function syncMobileNotesLayoutClass() {
  document.body.classList.toggle("mobile-notes-layout", isMobileNotesLayout());
}

function screenLabel(screenId) {
  const labels = {
    "course-screen": "Course Selection",
    "menu-screen": "Workspace Menu",
    "week-screen": "Week Selection",
    "notes-screen": "Notes Lists",
    "config-screen": "Quiz Configuration",
    "quiz-screen": "Practice Quiz",
    "review-screen": "Quiz Review",
  };
  return labels[screenId] || "Screen";
}

function firstVisible(selector, root = document) {
  return [...root.querySelectorAll(selector)].find((node) => {
    if (!(node instanceof HTMLElement)) return false;
    if (node.closest(".hidden")) return false;
    return node.offsetWidth > 0 || node.offsetHeight > 0 || node.getClientRects().length > 0;
  }) || null;
}

function tourCurrentStep() {
  return state.walkthroughSteps[state.walkthroughIndex] || null;
}

function tourCurrentTarget() {
  const step = tourCurrentStep();
  if (!step?.selector) return null;
  return firstVisible(step.selector);
}

function positionWalkthroughStep(target) {
  const rect = target.getBoundingClientRect();
  const padding = 8;
  const viewportPadding = 12;
  const top = Math.max(padding, rect.top - padding);
  const left = Math.max(padding, rect.left - padding);
  const width = Math.min(window.innerWidth - (left + padding), rect.width + padding * 2);
  const height = Math.min(window.innerHeight - (top + padding), rect.height + padding * 2);
  el.walkthroughSpotlight.style.setProperty("--wt-top", `${top}px`);
  el.walkthroughSpotlight.style.setProperty("--wt-left", `${left}px`);
  el.walkthroughSpotlight.style.setProperty("--wt-width", `${Math.max(48, width)}px`);
  el.walkthroughSpotlight.style.setProperty("--wt-height", `${Math.max(48, height)}px`);

  const cardRect = el.walkthroughCard.getBoundingClientRect();
  const gap = 18;
  const step = tourCurrentStep();
  el.walkthroughCard.style.width = "";
  const isQuizAnswerStep = step?.screenId === "quiz-screen" && step?.selector === "#answers-wrap";
  const isFinishQuizStep = step?.screenId === "quiz-screen" && step?.action === "finish-quiz";
  const isFlagScopeStep = step?.screenId === "quiz-screen" && step?.action === "flag-not-in-scope";
  const isReviewStep = step?.screenId === "review-screen";
  const preferUpperRightLane = (
    isQuizAnswerStep
    || isFlagScopeStep
    || (step?.screenId === "notes-screen" && step?.action === "back-notes-to-menu")
  ) && window.innerWidth >= 1100;

  if (isFinishQuizStep) {
    el.walkthroughCard.style.width = "360px";
    const tunedCardRect = el.walkthroughCard.getBoundingClientRect();
    const cardTop = viewportPadding;
    const cardLeft = Math.max(
      viewportPadding,
      window.innerWidth - tunedCardRect.width - 28
    );
    el.walkthroughCard.style.top = `${cardTop}px`;
    el.walkthroughCard.style.left = `${cardLeft}px`;
    return;
  }

  if (isReviewStep) {
    el.walkthroughCard.style.width = "360px";
    const tunedCardRect = el.walkthroughCard.getBoundingClientRect();
    const cardTop = viewportPadding;
    const cardLeft = Math.max(
      viewportPadding,
      window.innerWidth - tunedCardRect.width - 28
    );
    el.walkthroughCard.style.top = `${cardTop}px`;
    el.walkthroughCard.style.left = `${cardLeft}px`;
    return;
  }

  if (preferUpperRightLane) {
    if (isQuizAnswerStep) {
      el.walkthroughCard.style.width = "320px";
    }
    const tunedCardRect = el.walkthroughCard.getBoundingClientRect();
    const cardTop = isFlagScopeStep
      ? Math.max(viewportPadding, Math.min(window.innerHeight - tunedCardRect.height - viewportPadding, rect.bottom - 120))
      : viewportPadding;
    const cardLeft = Math.max(
      viewportPadding,
      window.innerWidth - tunedCardRect.width - 28
    );
    el.walkthroughCard.style.top = `${cardTop}px`;
    el.walkthroughCard.style.left = `${cardLeft}px`;
    return;
  }

  const candidatePlacements = [
    {
      name: "right",
      room: window.innerWidth - rect.right - gap - viewportPadding,
      score: (window.innerWidth - rect.right - gap - viewportPadding) * Math.max(0, window.innerHeight - viewportPadding * 2),
      left: rect.right + gap,
      top: rect.top,
    },
    {
      name: "left",
      room: rect.left - gap - viewportPadding,
      score: (rect.left - gap - viewportPadding) * Math.max(0, window.innerHeight - viewportPadding * 2),
      left: rect.left - cardRect.width - gap,
      top: rect.top,
    },
    {
      name: "below",
      room: window.innerHeight - rect.bottom - gap - viewportPadding,
      score: (window.innerHeight - rect.bottom - gap - viewportPadding) * Math.max(0, window.innerWidth - viewportPadding * 2),
      left: rect.left,
      top: rect.bottom + gap,
    },
    {
      name: "above",
      room: rect.top - gap - viewportPadding,
      score: (rect.top - gap - viewportPadding) * Math.max(0, window.innerWidth - viewportPadding * 2),
      left: rect.left,
      top: rect.top - cardRect.height - gap,
    },
  ].sort((a, b) => b.score - a.score);

  const preferred = candidatePlacements.find((placement) => placement.room >= Math.min(320, cardRect.width)) || candidatePlacements[0];
  let cardTop = preferred.top;
  let cardLeft = preferred.left;

  cardTop = Math.max(viewportPadding, Math.min(window.innerHeight - cardRect.height - viewportPadding, cardTop));
  cardLeft = Math.max(viewportPadding, Math.min(window.innerWidth - cardRect.width - viewportPadding, cardLeft));
  el.walkthroughCard.style.top = `${cardTop}px`;
  el.walkthroughCard.style.left = `${cardLeft}px`;
}

function showWalkthroughPrompt() {
  state.walkthroughPromptOpen = true;
  state.walkthroughActive = false;
  el.walkthroughOverlay.classList.remove("hidden");
  el.walkthroughOverlay.setAttribute("aria-hidden", "false");
  el.walkthroughSpotlight.classList.add("hidden");
  el.walkthroughKicker.textContent = "Guided Tour";
  if (isMobileWalkthroughBlocked()) {
    el.walkthroughTitle.textContent = "Guided Tour Unavailable on Mobile";
    el.walkthroughBody.innerHTML = `the guided tour can only be experienced on your student laptop or any other laptop or desktop web broswer. Please use your laptop or desktop PC or Mac or visit the IT help desk. Information is on Cincinnati State's website, <a href="https://www.cincinnatistate.edu/tech-computer/" target="_blank" rel="noopener noreferrer">https://www.cincinnatistate.edu/tech-computer/</a>`;
    el.walkthroughPromptActions.classList.add("hidden");
    el.walkthroughMobileActions.classList.remove("hidden");
  } else {
    el.walkthroughTitle.textContent = "Would you like a guided walkthrough?";
    el.walkthroughBody.textContent = "The walkthrough will guide you across every major page, including Notes Lists, quiz setup, a special six-question demo quiz, and the final review report.";
    el.walkthroughPromptActions.classList.remove("hidden");
    el.walkthroughMobileActions.classList.add("hidden");
  }
  el.walkthroughProgress.textContent = "";
  el.walkthroughTourActions.classList.add("hidden");
  el.walkthroughCard.style.top = "24px";
  el.walkthroughCard.style.left = "24px";
}

function renderWalkthroughStep() {
  const step = tourCurrentStep();
  const target = tourCurrentTarget();
  if (!step || !(target instanceof HTMLElement)) {
    closeWalkthrough();
    return;
  }
  target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  el.walkthroughOverlay.classList.remove("hidden");
  el.walkthroughOverlay.setAttribute("aria-hidden", "false");
  el.walkthroughSpotlight.classList.remove("hidden");
  el.walkthroughKicker.textContent = `${screenLabel(step.screenId)} Guided Tour`;
  el.walkthroughTitle.textContent = state.walkthroughOverrideTitle || step.title;
  el.walkthroughBody.textContent = state.walkthroughOverrideBody || step.body;
  el.walkthroughProgress.textContent = `Step ${state.walkthroughIndex + 1} of ${state.walkthroughSteps.length}`;
  el.walkthroughPromptActions.classList.add("hidden");
  el.walkthroughMobileActions.classList.add("hidden");
  el.walkthroughTourActions.classList.remove("hidden");
  el.walkthroughNext.classList.toggle("hidden", !walkthroughUsesDialogNext(step.action));
  syncResetCorrectButtons();
  window.requestAnimationFrame(() => {
    positionWalkthroughStep(target);
  });
}

function closeWalkthrough() {
  state.walkthroughIndex = 0;
  state.walkthroughScreenId = "";
  state.walkthroughPromptOpen = false;
  state.walkthroughActive = false;
  state.walkthroughOverrideTitle = "";
  state.walkthroughOverrideBody = "";
  el.walkthroughOverlay.classList.add("hidden");
  el.walkthroughOverlay.setAttribute("aria-hidden", "true");
  if (el.walkthroughNext) el.walkthroughNext.classList.add("hidden");
  syncResetCorrectButtons();
}

function dismissWalkthroughPrompt() {
  if (!state.walkthroughPromptOpen) return;
  state.walkthroughPromptOpen = false;
  state.walkthroughOverrideTitle = "";
  state.walkthroughOverrideBody = "";
  el.walkthroughOverlay.classList.add("hidden");
  el.walkthroughOverlay.setAttribute("aria-hidden", "true");
  if (el.walkthroughNext) el.walkthroughNext.classList.add("hidden");
}

function startWalkthrough() {
  state.walkthroughIndex = 0;
  state.walkthroughActive = true;
  state.walkthroughPromptOpen = false;
  state.walkthroughOverrideTitle = "";
  state.walkthroughOverrideBody = "";
  renderWalkthroughStep();
}

function advanceWalkthrough() {
  if (!state.walkthroughActive) return;
  if (state.walkthroughIndex >= state.walkthroughSteps.length - 1) {
    closeWalkthrough();
    return;
  }
  state.walkthroughIndex += 1;
  state.walkthroughOverrideTitle = "";
  state.walkthroughOverrideBody = "";
  renderWalkthroughStep();
}

function jumpWalkthroughToAction(action, overrideTitle = "", overrideBody = "") {
  if (!state.walkthroughActive) return;
  const index = state.walkthroughSteps.findIndex((step) => step?.action === action);
  if (index < 0) return;
  state.walkthroughIndex = index;
  state.walkthroughOverrideTitle = overrideTitle;
  state.walkthroughOverrideBody = overrideBody;
  renderWalkthroughStep();
}

function syncWalkthroughPosition() {
  if (el.walkthroughOverlay?.classList.contains("hidden")) return;
  if (state.walkthroughPromptOpen) return;
  const target = tourCurrentTarget();
  if (!(target instanceof HTMLElement)) return;
  positionWalkthroughStep(target);
}

function notifyWalkthroughAction(action) {
  if (!state.walkthroughActive) return;
  const step = tourCurrentStep();
  if (!step || step.action !== action) return;
  advanceWalkthrough();
}

function rewindWalkthroughQuestionWithRemark(title, body) {
  state.walkthroughOverrideTitle = title;
  state.walkthroughOverrideBody = body;
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  el.feedback.textContent = "";
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.checked = false;
    rb.disabled = false;
  });
  el.submitAnswer.disabled = false;
  el.dontKnowAnswer.disabled = false;
  el.nextQuestion.disabled = true;
  updateFlagButtonState();
  renderWalkthroughStep();
}

function walkthroughCurrentAction() {
  if (!state.walkthroughActive) return "";
  return String(tourCurrentStep()?.action || "");
}

function walkthroughUsesDialogNext(action = walkthroughCurrentAction()) {
  return [
    "explain-back-setup",
    "review-report",
    "copy-report",
    "download-report",
    "print-report",
    "retake-incorrect",
    "review-reset-demo",
  ].includes(String(action || ""));
}

function isTourWalkthroughDemoQuestion(row) {
  return String(row?.source_path || "").includes("Tour Walkthrough/Demo Quiz.md");
}

function walkthroughQuizStepAction() {
  if (currentScreenId() !== "quiz-screen") return "";
  return walkthroughCurrentAction();
}

function walkthroughGuardQuizAction(expectedAction, message) {
  const currentAction = walkthroughQuizStepAction();
  if (!currentAction) return false;
  if (currentAction === expectedAction) return false;
  alert(message || "Follow the highlighted walkthrough step first.");
  return true;
}

function resetWalkthroughConfigState() {
  state.mode = "easy";
  state.amount = 10;
  state.skipPreviouslyCorrect = false;
  state.includeMissedOnce = false;
  saveQuizConfig();
}

function validateWalkthroughAnswer(selected, row, isDontKnow) {
  if (!state.walkthroughActive) return "";
  const step = tourCurrentStep();
  if (!step || currentScreenId() !== "quiz-screen") return "";
  const correct = String(row.correct_choice || "").toUpperCase();
  if (step.action === "submit-correct") {
    if (isDontKnow || selected !== correct) {
      return "For the first demo question, choose the correct answer in slot B and then click Submit Answer.";
    }
  }
  if (step.action === "submit-incorrect") {
    if (!isDontKnow && selected === correct) {
      rewindWalkthroughQuestionWithRemark(
        "Very Clever. Extremely Inconvenient.",
        "You picked n, which is actually correct. Congratulations on sabotaging my carefully staged demo. Let's rewind and do that again, but this time choose any wrong answer so the walkthrough can show the incorrect-answer flow."
      );
      return "__walkthrough_rewind__";
    }
    if (isDontKnow) {
      return "For the second demo question, choose one of the wrong answer options in the list so the walkthrough can demonstrate the incorrect-answer flow.";
    }
  }
  return "";
}

function buildCourseOptions() {
  if (!el.courseSelect) return;
  el.courseSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = NO_COURSE_ID;
  placeholder.textContent = "Select a Course";
  el.courseSelect.appendChild(placeholder);
  COURSE_CATALOG.forEach((course) => {
    const opt = document.createElement("option");
    opt.value = course.id;
    opt.textContent = `${course.insignia} | ${course.name}`;
    el.courseSelect.appendChild(opt);
  });
  el.courseSelect.value = state.courseId || NO_COURSE_ID;
}

function buildCertificationOptions() {
  if (!el.certificationSelect) return;
  el.certificationSelect.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.value = NO_CERTIFICATION_ID;
  placeholder.textContent = "Select a Certification";
  el.certificationSelect.appendChild(placeholder);
  CERTIFICATION_CATALOG.forEach((certification) => {
    const opt = document.createElement("option");
    opt.value = certification.id;
    opt.textContent = certification.name;
    el.certificationSelect.appendChild(opt);
  });
  el.certificationSelect.value = state.certificationId || NO_CERTIFICATION_ID;
}

function getJSONStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function setJSONStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function setStartupStatus(text) {
  const msg = String(text || "").trim();
  if (msg && el.startupStatus) el.startupStatus.textContent = msg;
  if (msg && el.loadStatus) el.loadStatus.textContent = msg;
}

function hideWalkthroughOverlayOnly() {
  if (!el.walkthroughOverlay) return;
  el.walkthroughOverlay.classList.add("hidden");
  el.walkthroughOverlay.setAttribute("aria-hidden", "true");
}

function setContinueButtonsLoading(activeButton, isLoading) {
  [el.continueCourse, el.continueCertification].forEach((button) => {
    if (!button) return;
    if (!button.dataset.defaultLabel) {
      button.dataset.defaultLabel = button.textContent.trim();
    }
    const isActive = button === activeButton;
    button.disabled = Boolean(isLoading);
    button.classList.toggle("is-loading", Boolean(isLoading && isActive));
    button.setAttribute("aria-busy", isLoading && isActive ? "true" : "false");
    button.textContent = isLoading && isActive ? "Loading" : button.dataset.defaultLabel;
  });
}

function showStartupSplash(text = "") {
  document.body.classList.add("app-loading");
  hideWalkthroughOverlayOnly();
  if (el.startupSplash) el.startupSplash.classList.remove("hidden");
  if (text) setStartupStatus(text);
}

function hideStartupSplash() {
  document.body.classList.remove("app-loading");
  if (el.startupSplash) el.startupSplash.classList.add("hidden");
  if (state.walkthroughPromptOpen) {
    showWalkthroughPrompt();
    return;
  }
  if (state.walkthroughActive) {
    window.requestAnimationFrame(() => {
      renderWalkthroughStep();
    });
  }
}

function validateFeedbackText(text) {
  const value = String(text || "").trim();
  if (!value) return "Please explain why the question is ineffective.";
  if (value.length > 1000) return "Feedback is too long (max 1000 characters).";
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(value)) return "Feedback contains invalid control characters.";
  if (/(--|\/\*|\*\/)/.test(value)) {
    return "Feedback looks like a SQL payload. Use plain sentence feedback.";
  }
  return "";
}

async function postChangeToServer(changeRow) {
  if (state.changeServerSaveDisabled) return false;
  const url = apiURL("/api/changes");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changeRow),
    });
    if (res.ok) return true;
    window.__rocketLastChangeSaveError = `Change save failed. Tried: ${url} (${res.status})`;
  } catch (err) {
    window.__rocketLastChangeSaveError = `Change save failed. Tried: ${url} (${err?.message || "network error"})`;
  }
  state.changeServerSaveDisabled = true;
  return false;
}

async function postHistoryToServer(historyRow) {
  if (window.__ROCKET_DISABLE_HISTORY_SERVER_SYNC__) return false;
  if (state.historyServerSaveDisabled) return false;
  const url = apiURL("/api/history");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(historyRow),
    });
    if (res.ok) return true;
    window.__rocketLastHistorySaveError = `History save failed. Tried: ${url} (${res.status})`;
  } catch (err) {
    window.__rocketLastHistorySaveError = `History save failed. Tried: ${url} (${err?.message || "network error"})`;
  }
  state.historyServerSaveDisabled = true;
  return false;
}

function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let i = 0;
  let inQuotes = false;
  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
    i += 1;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((vals) => {
    const out = {};
    headers.forEach((h, idx) => {
      out[h] = (vals[idx] ?? "").trim();
    });
    return out;
  });
}

function csvPathCandidates(path) {
  const cleaned = String(path || "").replace(/^\.\/+/, "");
  const baseName = cleaned.split("/").pop() || cleaned;
  return [...new Set([
    `./${cleaned}`,
    cleaned,
    `./rocket-questions-html/${baseName}`,
    `/rocket-questions-html/${baseName}`,
  ])];
}

async function loadCSV(path, requiredHeaders = null) {
  const candidates = [...new Set(
    csvPathCandidates(path).map((candidate) => new URL(candidate, APP_BASE_URL).toString())
  )];
  const failures = [];
  for (const candidate of candidates) {
    const resolvedURL = new URL(candidate);
    try {
      const res = await fetch(resolvedURL, { cache: "no-store" });
      if (!res.ok) {
        failures.push(`${resolvedURL.pathname} (${res.status})`);
        continue;
      }
      const rows = parseCSV(await res.text());
      if (requiredHeaders && rows.length) {
        const keys = Object.keys(rows[0]);
        const missing = requiredHeaders.filter((header) => !keys.includes(header));
        if (missing.length) {
          failures.push(`${resolvedURL.pathname} (missing columns: ${missing.join(", ")})`);
          continue;
        }
      }
      return rows;
    } catch (err) {
      failures.push(`${resolvedURL.pathname} (${err?.message || "fetch error"})`);
    }
  }
  throw new Error(`CSV load failed for ${path}. Tried: ${failures.join(" | ")}`);
}

function normalizeKey(text) {
  return String(text || "")
    .trim()
    .toLowerCase()
    .replace(/`+/g, "")
    .replace(/\*+/g, "")
    .replace(/[_#>\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferTopic(questionText) {
  const q = String(questionText || "").toLowerCase();
  const topicRules = [
    [["osi", "layer", "pdu", "encapsulation", "decapsulation", "tcp/ip"], "Models and Layers"],
    [["dhcp", "dora", "lease", "reservation", "scope", "apipa"], "DHCP"],
    [["dns", "fqdn", "resolver", "aaaa", "record"], "DNS and Naming"],
    [["tcp", "udp", "port", "handshake", "ack", "window", "syn", "fin", "rst"], "Transport and Ports"],
    [["arp", "rarp", "mac", "switch", "frame", "ethernet", "fcs", "crc"], "Data Link and Ethernet"],
    [["ip", "subnet", "cidr", "ttl", "icmp", "route", "router", "nat", "/"], "IP Addressing and Routing"],
    [["latency", "jitter", "throughput", "loss"], "Performance and Troubleshooting"],
    [["ddos", "spoof", "security", "telnet", "ssh", "https"], "Security"],
    [["topology", "mesh", "star", "bus", "ring", "wan"], "Topologies and WAN"],
  ];
  for (const [words, topic] of topicRules) {
    if (words.some((w) => q.includes(w))) return topic;
  }
  return "General Networking Fundamentals";
}

function sourceFileTitle(sourcePath) {
  const normalized = String(sourcePath || "").replace(/\\/g, "/");
  const fileName = normalized.split("/").pop() || "";
  const clean = String(fileName)
    .replace(/\.(md|txt|pdf|docx?|csv)$/i, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!clean) return "";
  if (/^week\s*\d+(\s*notes?)?$/i.test(clean)) return "";
  if (/^week\s*\d+\s*_?question[_\s-]*bank$/i.test(clean)) return "";
  return clean;
}

function textbookMarkerForWeek(week) {
  const weekNum = Number(week);
  if (!Number.isFinite(weekNum)) return "";
  return SYLLABUS_TEXTBOOK_BY_WEEK[weekNum] || NO_TEXTBOOK_PLACEHOLDER;
}

function inferStudyReference(sourcePath, fallbackWeek = null) {
  const src = String(sourcePath || "").trim();
  if (!src) {
    if (fallbackWeek !== null && fallbackWeek !== undefined) {
      const weekNum = Number(fallbackWeek);
      if (Number.isFinite(weekNum)) return `Week ${weekNum}`;
    }
    return "";
  }
  const normalized = src.replace(/\\/g, "/");
  const clean = (text) => String(text || "").replace(/\.(md|txt|pdf|docx?)$/i, "").trim();
  const lower = normalized.toLowerCase();

  const hardCoded = HARD_CODED_SOURCE_REFERENCES.find(({ marker }) => lower.includes(marker));
  if (hardCoded) return hardCoded.label;

  const videoMatch = normalized.match(/video\s*(\d+)\s*-\s*([^/]+)/i);
  if (videoMatch) {
    const videoNum = Number(videoMatch[1]);
    const week = VIDEO_WEEK_MAP[videoNum] ?? inferWeekFromSource(normalized, fallbackWeek);
    const title = VIDEO_TITLE_MAP[videoNum] || clean(videoMatch[2]);
    if (week) return `Week ${week} - Video: ${title}`;
    return `Video: ${title}`;
  }

  const textbookMatch = normalized.match(/textbook\s*(\d+)\s*-\s*chapter\s*(\d+)\s*([^/\\\\]*)/i);
  if (textbookMatch) {
    const base = clean(`Textbook ${textbookMatch[1]} - Chapter ${textbookMatch[2]} ${textbookMatch[3] || ""}`);
    const week = inferWeekFromSource(normalized, fallbackWeek);
    if (week) return `Week ${week} - ${base}`;
    return base;
  }

  const essentialMatch = normalized.match(/essential\s*-\s*chapter\s*(\d+)\s*([^/\\\\]*)/i);
  if (essentialMatch) {
    const base = clean(`Essential - Chapter ${essentialMatch[1]} ${essentialMatch[2] || ""}`);
    const week = inferWeekFromSource(normalized, fallbackWeek);
    if (week) return `Week ${week} - ${base}`;
    return base;
  }

  const lectureMatch = normalized.match(/lecture\s*week\s*(\d+)/i);
  if (lectureMatch) {
    const week = Number(lectureMatch[1]);
    return `Week ${week} - ${textbookMarkerForWeek(week)}`;
  }

  const inferredWeek = inferWeekFromSource(normalized, fallbackWeek);
  if (inferredWeek) {
    return `Week ${inferredWeek} - ${textbookMarkerForWeek(inferredWeek)}`;
  }
  const title = sourceFileTitle(normalized);
  if (title) return title;
  return "";
}

function letterGrade(percent) {
  if (percent >= 90) return "A";
  if (percent >= 80) return "B";
  if (percent >= 70) return "C";
  if (percent >= 60) return "D";
  return "F";
}

function inferWeekFromSource(sourcePath, fallbackWeek = null) {
  const src = String(sourcePath || "").toLowerCase();
  const lectureMatch = src.match(/lecture week\s*(\d+)/);
  if (lectureMatch) return Number(lectureMatch[1]);
  const videoMatch = src.match(/video\s*(\d+)/);
  if (videoMatch) return VIDEO_WEEK_MAP[Number(videoMatch[1])] ?? null;
  for (const [marker, week] of TEXTBOOK_WEEK_MARKERS) {
    if (src.includes(marker)) return week;
  }
  const weekCsvMatch = src.match(/week\s*(\d+)\s*_?question[_\s-]*bank/);
  if (weekCsvMatch) return Number(weekCsvMatch[1]);
  const looseWeekMatch = src.match(/\bweek\s*(\d+)\b/);
  if (looseWeekMatch) return Number(looseWeekMatch[1]);
  if (fallbackWeek !== null && fallbackWeek !== undefined) {
    const weekNum = Number(fallbackWeek);
    if (Number.isFinite(weekNum)) return weekNum;
  }
  return null;
}

function questionInSelectedWeeks(question) {
  if (!state.selectedWeeks.size) return true;
  if (question.week !== null && question.week !== undefined) {
    return state.selectedWeeks.has(Number(question.week));
  }
  const inferred = inferWeekFromSource(question.source_path || question.source || "");
  return state.selectedWeeks.has(inferred);
}

function allHistoryRows() {
  // Per-user progress should come from the current browser only.
  const rows = [...state.localHistoryRows];
  const seen = new Set();
  return rows.filter((row) => {
    const signature = [
      row.timestamp || "",
      row.question_key || "",
      row.selected_choice || "",
      row.correct_choice || "",
      row.result || "",
    ].join("||");
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

function historyKeySets(poolKeys = null) {
  const correct = new Set();
  const missed = new Set();
  for (const row of allHistoryRows()) {
    const key = String(row.question_key || "").trim();
    if (!key) continue;
    if (poolKeys && !poolKeys.has(key)) continue;
    const result = String(row.result || "").toLowerCase();
    if (result === "correct") correct.add(key);
    if (result === "incorrect") missed.add(key);
  }
  return { correct, missed };
}

function correctHistoryKeys() {
  return historyKeySets().correct;
}

function missedHistoryKeys() {
  return historyKeySets().missed;
}

function historyStatsForPool(pool) {
  const poolKeys = new Set(
    pool.map((q) => String(q.question_key || "").trim()).filter(Boolean)
  );
  const { correct, missed } = historyKeySets(poolKeys);
  let neverAnswered = 0;
  let answeredEver = 0;
  let missedOnly = 0;
  let missedThenCorrect = 0;
  for (const key of poolKeys) {
    const wasCorrect = correct.has(key);
    const wasMissed = missed.has(key);
    if (wasCorrect || wasMissed) answeredEver += 1;
    if (!wasCorrect && !wasMissed) neverAnswered += 1;
    else if (!wasCorrect && wasMissed) missedOnly += 1;
    else if (wasCorrect && wasMissed) missedThenCorrect += 1;
  }
  return {
    answeredEver,
    neverAnswered,
    unanswered: neverAnswered,
    missedOnly,
    missedThenCorrect,
    missedEver: missedOnly + missedThenCorrect,
  };
}

function browserAnsweredQuestionsForPool(pool) {
  const byKey = new Map(
    pool.map((q) => [String(q.question_key || "").trim(), q]).filter(([key]) => key)
  );
  const answered = new Map();
  for (const row of allHistoryRows()) {
    const key = String(row.question_key || "").trim();
    if (!key || !byKey.has(key)) continue;
    const question = byKey.get(key);
    const current = answered.get(key) || {
      question_key: key,
      question: question.question || row.question || "",
      difficulty: getDifficulty(question),
      week: question.week ?? row.week ?? "",
      source_path: question.source_path || row.source_path || "",
      attempts: 0,
      correct_attempts: 0,
      incorrect_attempts: 0,
      latest_result: "",
      latest_selected_choice: "",
      latest_timestamp: "",
    };
    current.attempts += 1;
    const result = String(row.result || "").toLowerCase();
    if (result === "correct") current.correct_attempts += 1;
    if (result === "incorrect") current.incorrect_attempts += 1;
    if (!current.latest_timestamp || String(row.timestamp || "") >= current.latest_timestamp) {
      current.latest_result = row.result || "";
      current.latest_selected_choice = row.selected_choice || "";
      current.latest_timestamp = row.timestamp || "";
    }
    answered.set(key, current);
  }
  return [...answered.values()].sort((a, b) => String(b.latest_timestamp).localeCompare(String(a.latest_timestamp)));
}

function currentBrowserAnsweredQuestions() {
  return browserAnsweredQuestionsForPool(filteredPoolByDifficulty(state.mode));
}

function installBrowserProgressDiagnostics() {
  window.rocketQuestionsAnsweredQuestions = currentBrowserAnsweredQuestions;
  window.rocketQuestionsAnsweredSummary = () => {
    const pool = filteredPoolByDifficulty(state.mode);
    const stats = historyStatsForPool(pool);
    return {
      course: activeTrack().name,
      mode: state.mode,
      selectedUnits: [...state.selectedWeeks].sort((a, b) => a - b),
      possibleQuestions: pool.length,
      answeredAlreadyInThisBrowser: stats.answeredEver,
      neverAnsweredInThisBrowser: stats.neverAnswered,
      stillMissedInThisBrowser: stats.missedOnly,
      missedThenCorrectInThisBrowser: stats.missedThenCorrect,
      answeredQuestions: currentBrowserAnsweredQuestions(),
    };
  };
}

function filterPoolByHistoryRules(pool) {
  if (!state.skipPreviouslyCorrect) return pool;
  const correctKeys = correctHistoryKeys();
  if (!state.includeMissedOnce) {
    return pool.filter((q) => !correctKeys.has(q.question_key));
  }
  const missedKeys = missedHistoryKeys();
  return pool.filter((q) => !correctKeys.has(q.question_key) || missedKeys.has(q.question_key));
}

function getDifficulty(q) {
  return state.overrides.difficultyOverrides[q.question_key] || q.difficulty;
}

function isRemoved(q) {
  return Boolean(state.overrides.removedKeys[q.question_key]);
}

function filteredPoolByDifficulty(mode) {
  return state.questionBank.filter((q) => {
    if (isRemoved(q)) return false;
    if (!questionInSelectedWeeks(q)) return false;
    const d = getDifficulty(q);
    if (mode === "medium") return d === "easy" || d === "medium";
    return d === mode;
  });
}

function countAvailable(mode) {
  const pool = filteredPoolByDifficulty(mode);
  return filterPoolByHistoryRules(pool).length;
}

function shuffled(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function sample(items, count) {
  if (count >= items.length) return shuffled(items);
  const copy = [...items];
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const idx = Math.floor(Math.random() * copy.length);
    out.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return out;
}

function shuffledAnswerOptions(row) {
  const options = [
    { original: "A", text: row.choice_a || "" },
    { original: "B", text: row.choice_b || "" },
    { original: "C", text: row.choice_c || "" },
    { original: "D", text: row.choice_d || "" },
  ];
  if (row.preserve_choice_order) {
    return options;
  }
  return shuffled(options);
}

function fetchRandomQuestions(mode, count) {
  const basePool = filteredPoolByDifficulty(mode);
  const pool = filterPoolByHistoryRules(basePool);
  return sample(pool, count);
}

function freshSessionQuestion(question, id = question?.id) {
  const copy = {
    ...question,
    id,
  };
  delete copy._sessionAnswer;
  delete copy._sessionOptionMap;
  return copy;
}

function formatTimestamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function formatStamp(d = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

async function sha1Hex(text) {
  // WebCrypto requires a secure context (HTTPS/localhost). Public HTTP deployments need a fallback.
  if (window.crypto && window.crypto.subtle && typeof window.crypto.subtle.digest === "function") {
    const buf = await window.crypto.subtle.digest("SHA-1", new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let hash = 0x811c9dc5;
  const input = String(text || "");
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `fnv1a_${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

async function hydrateRuntimeQuestion(row, idx) {
  const question = (row.question || "").trim();
  const a = (row.choice_a || row.a || "").trim();
  const b = (row.choice_b || row.b || "").trim();
  const c = (row.choice_c || row.c || "").trim();
  const d = (row.choice_d || row.d || "").trim();
  const correct = String(row.correct_choice || row.correct || "A").trim().toUpperCase();
  let difficulty = String(row.difficulty || "medium").trim().toLowerCase();
  if (!["easy", "medium", "hard"].includes(difficulty)) difficulty = "medium";
  const correctText = { A: a, B: b, C: c, D: d }[correct] || a;
  const stable = [question, a, b, c, d].join("||");
  const source = (row.source_path || row.source || "question_bank.csv").trim();
  return {
    id: idx,
    question,
    choice_a: a,
    choice_b: b,
    choice_c: c,
    choice_d: d,
    correct_choice: ["A", "B", "C", "D"].includes(correct) ? correct : "A",
    difficulty,
    explanation: (row.explanation || "").trim() || `Correct answer: ${correct}. ${correctText}`,
    concept_key: (row.concept_key || "").trim() || normalizeKey(inferTopic(question)),
    aspect_key: (row.aspect_key || "").trim() || normalizeKey(question),
    source_path: source,
    week: row.week ?? null,
    question_key: await sha1Hex(stable),
    preserve_choice_order: String(row.preserve_choice_order || "").toLowerCase() === "true",
  };
}

function saveOverrides() {
  setJSONStorage(OVERRIDES_STORAGE_KEY, state.overrides);
}

function saveLocalHistory() {
  setJSONStorage(HISTORY_STORAGE_KEY, state.localHistoryRows);
}

function saveLocalChanges() {
  setJSONStorage(CHANGES_STORAGE_KEY, state.localChangeRows);
}

function saveReports() {
  setJSONStorage(REPORTS_STORAGE_KEY, state.reports);
}

function saveQuizConfig() {
  setJSONStorage(CONFIG_STORAGE_KEY, {
    amount: state.amount,
    skipPreviouslyCorrect: state.skipPreviouslyCorrect,
    includeMissedOnce: state.includeMissedOnce,
  });
}

function appendQuestionHistory(questionRow, selectedChoice, wasCorrect) {
  const row = {
    timestamp: formatTimestamp(),
    question_key: questionRow.question_key,
    question_id: questionRow.id,
    question: questionRow.question,
    selected_choice: selectedChoice,
    correct_choice: questionRow.correct_choice,
    result: wasCorrect ? "correct" : "incorrect",
    difficulty: getDifficulty(questionRow),
    week: questionRow.week ?? "",
    source_path: questionRow.source_path || "",
  };
  state.localHistoryRows.push(row);
  saveLocalHistory();
  postHistoryToServer(row).catch((err) => {
    window.__rocketLastHistorySaveError = err?.message || String(err);
  });
}

async function appendChangeRequest(questionRow, userFeedback, opts = {}) {
  const requestedLevel = String(opts.requestedLevel || getDifficulty(questionRow) || "").toLowerCase();
  const action = String(opts.action || "ineffective_question").trim();
  const row = {
    timestamp: formatTimestamp(),
    action,
    question_key: questionRow.question_key || "",
    question_id: questionRow.id ?? "",
    week: questionRow.week ?? "",
    question: questionRow.question || "",
    choice_a: questionRow.choice_a || "",
    choice_b: questionRow.choice_b || "",
    choice_c: questionRow.choice_c || "",
    choice_d: questionRow.choice_d || "",
    correct_choice: questionRow.correct_choice || "",
    explanation: questionRow.explanation || "",
    difficulty: getDifficulty(questionRow),
    level: requestedLevel || getDifficulty(questionRow),
    concept_key: questionRow.concept_key || "",
    aspect_key: questionRow.aspect_key || "",
    source_path: questionRow.source_path || "",
    user_feedback: String(userFeedback || "").trim(),
  };
  // Include any hint-like fields if present in the source data.
  Object.keys(questionRow || {}).forEach((key) => {
    if (/^hint(_\d+)?$/i.test(key) && !(key in row)) {
      row[key] = questionRow[key] || "";
    }
  });
  state.localChangeRows.push(row);
  saveLocalChanges();
  postChangeToServer(row).catch((err) => {
    window.__rocketLastChangeSaveError = err?.message || String(err);
    state.changeServerSaveDisabled = true;
  });
  return row;
}

function removeQuestionFromBank(questionKey) {
  state.overrides.removedKeys[questionKey] = true;
  saveOverrides();
}

function setQuestionDifficultyOverride(questionKey, difficulty) {
  state.overrides.difficultyOverrides[questionKey] = difficulty;
  saveOverrides();
}

function screen(id) {
  ["course-screen", "menu-screen", "week-screen", "notes-screen", "config-screen", "quiz-screen", "review-screen"].forEach((sid) => {
    document.getElementById(sid).classList.toggle("hidden", sid !== id);
  });
  applyCourseBranding();
  if (state.walkthroughPromptOpen && id !== "course-screen") {
    dismissWalkthroughPrompt();
  }
  if (id !== "notes-screen") {
    closeNotesSidebar();
  }
  if (state.walkthroughActive) {
    window.requestAnimationFrame(() => {
      if (tourCurrentStep()?.screenId === currentScreenId()) {
        renderWalkthroughStep();
      }
    });
  }
}

function normalizeNotePath(path) {
  return String(path || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function noteFetchURL(relativePath) {
  const normalized = normalizeNotePath(relativePath);
  return versionedContentURL(activeTrack().contentRoot, "notes-content", normalized);
}

function noteLabelFromPath(path) {
  const normalized = normalizeNotePath(path);
  const parts = normalized.split("/");
  return parts[parts.length - 1] || normalized;
}

function registerNoteFile(node) {
  const normalized = normalizeNotePath(node?.path);
  if (!normalized) return;
  state.notesFileMap.set(normalized, {
    ...node,
    path: normalized,
  });
}

function indexNoteNodes(nodes) {
  (nodes || []).forEach((node) => {
    if (!node) return;
    if (node.type === "file") {
      registerNoteFile(node);
      return;
    }
    indexNoteNodes(node.children || []);
  });
}

async function loadNotesManifest() {
  const res = await fetch(activeNotesManifestURL(), { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Notes manifest could not be loaded (${res.status}).`);
  }
  const manifest = await res.json();
  state.notesManifest = manifest;
  state.notesFileMap = new Map();
  indexNoteNodes(manifest.roots || []);
  const defaultPath = normalizeNotePath(manifest.defaultNote || "");
  state.currentNotePath = state.notesFileMap.has(defaultPath)
    ? defaultPath
    : (state.notesFileMap.keys().next().value || "");
}

async function reloadNotesManifestForTrack() {
  if (notesManifestReloadPromise) return notesManifestReloadPromise;
  notesManifestReloadPromise = (async () => {
    try {
      state.notesLoadError = "";
      await loadNotesManifest();
    } catch (err) {
      state.notesLoadError = err?.message || "Unable to load notes manifest.";
      state.notesManifest = { roots: [], defaultNote: "" };
      state.notesFileMap = new Map();
      state.currentNotePath = "";
    } finally {
      notesManifestReloadPromise = null;
      if (currentScreenId() === "notes-screen") {
        renderNotesTree();
        if (!state.notesLoadError && state.currentNotePath) {
          await openNote(state.currentNotePath);
        }
      }
    }
  })();
  return notesManifestReloadPromise;
}

async function loadChangelog() {
  const res = await fetch(CHANGELOG_PATH, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Changelog could not be loaded (${res.status}).`);
  }
  state.changelogText = await res.text();
}

async function loadTourQuestionBank() {
  const rows = await loadCSV(TOUR_QUESTION_BANK_PATH, ["difficulty", "question", "choice_a", "choice_b", "choice_c", "choice_d", "correct_choice"]);
  const runtime = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = { ...rows[i], week: "tour" };
    const q = await hydrateRuntimeQuestion(row, `tour-${i + 1}`);
    runtime.push(q);
  }
  state.tourQuestionBank = runtime;
}

function escapeHTML(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function parseInlineMarkdown(text) {
  const raw = escapeHTML(text);
  const codeTokens = [];
  const linkTokens = [];
  const withCodes = raw.replace(/`([^`]+)`/g, (_, code) => {
    const token = `CODETOKEN${codeTokens.length}PLACEHOLDER`;
    codeTokens.push(`<code>${code}</code>`);
    return token;
  });
  const withLinks = withCodes.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const token = `LINKTOKEN${linkTokens.length}PLACEHOLDER`;
      const safeHref = escapeHTML(href).replace(/"/g, "&quot;");
      linkTokens.push(`<a href="${safeHref}">${label}</a>`);
      return token;
    });
  let html = withLinks
    .replace(/https?:\/\/[^\s<]+/g, (url) => {
      const trailing = url.match(/[),.;:!?]+$/)?.[0] || "";
      const cleanUrl = trailing ? url.slice(0, -trailing.length) : url;
      const safeHref = cleanUrl.replace(/"/g, "&quot;");
      return `<a href="${safeHref}">${cleanUrl}</a>${trailing}`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[^\*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_\n]+)_(?!_)/g, "$1<em>$2</em>");
  linkTokens.forEach((tokenHTML, idx) => {
    html = html.replace(`LINKTOKEN${idx}PLACEHOLDER`, tokenHTML);
  });
  codeTokens.forEach((tokenHTML, idx) => {
    html = html.replace(`CODETOKEN${idx}PLACEHOLDER`, tokenHTML);
  });
  return html;
}

function renderMarkdownLines(lines) {
  return (lines || []).map((line) => parseInlineMarkdown(String(line || "").trim())).join("<br>");
}

function isTableSeparator(line) {
  const trimmed = String(line || "").trim();
  return /^\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(trimmed);
}

function parseTableRow(line) {
  const trimmed = String(line || "").trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function consumeTable(lines, startIndex) {
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1];
  if (!isTableSeparator(separatorLine)) {
    return { html: "", nextIndex: startIndex };
  }
  const headers = parseTableRow(headerLine);
  const rows = [];
  let index = startIndex + 2;
  while (index < lines.length && lines[index].trim().includes("|")) {
    rows.push(parseTableRow(lines[index]));
    index += 1;
  }
  return {
    html: `<table><thead><tr>${headers.map((cell) => `<th>${parseInlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${parseInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
    nextIndex: index,
  };
}

function expandedIndentWidth(line) {
  const expanded = String(line || "").replace(/\t/g, "    ");
  const match = expanded.match(/^ */);
  return match ? match[0].length : 0;
}

function parseListMarker(line) {
  const expanded = String(line || "").replace(/\t/g, "    ");
  const match = expanded.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
  if (!match) return null;
  return {
    indent: match[1].length,
    ordered: /\d+\./.test(match[2]),
    text: match[3],
  };
}

function consumeList(lines, startIndex) {
  const first = parseListMarker(lines[startIndex]);
  if (!first) return { html: "", nextIndex: startIndex };
  const baseIndent = first.indent;
  const ordered = first.ordered;
  const items = [];
  let index = startIndex;

  while (index < lines.length) {
    const marker = parseListMarker(lines[index]);
    if (!marker) break;
    if (marker.indent !== baseIndent || marker.ordered !== ordered) break;

    let itemHTML = renderMarkdownLines([marker.text]);
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index];
      const nextMarker = parseListMarker(nextLine);
      const nextTrimmed = String(nextLine || "").trim();

      if (!nextTrimmed) {
        index += 1;
        continue;
      }
      if (nextMarker && nextMarker.indent <= baseIndent) {
        break;
      }
      if (
        nextTrimmed.startsWith("|") &&
        index + 1 < lines.length &&
        isTableSeparator(lines[index + 1])
      ) {
        const table = consumeTable(lines, index);
        itemHTML += table.html;
        index = table.nextIndex;
        continue;
      }
      if (nextMarker && nextMarker.indent > baseIndent) {
        const nested = consumeList(lines, index);
        itemHTML += nested.html;
        index = nested.nextIndex;
        continue;
      }
      if (expandedIndentWidth(nextLine) > baseIndent) {
        itemHTML += `<br>${renderMarkdownLines([nextTrimmed])}`;
        index += 1;
        continue;
      }
      break;
    }

    items.push(`<li>${itemHTML}</li>`);
  }

  const tag = ordered ? "ol" : "ul";
  return { html: `<${tag}>${items.join("")}</${tag}>`, nextIndex: index };
}

function renderMarkdown(text) {
  const src = String(text || "").replace(/\r\n?/g, "\n");
  const lines = src.split("\n");
  const parts = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) {
      i += 1;
      continue;
    }
    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const codeLines = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length) i += 1;
      const languageAttr = language ? ` data-language="${escapeHTML(language)}"` : "";
      parts.push(`<pre><code${languageAttr}>${escapeHTML(codeLines.join("\n"))}</code></pre>`);
      continue;
    }
    if (/^(---|\*\*\*|___)\s*$/.test(trimmed)) {
      parts.push("<hr>");
      i += 1;
      continue;
    }
    const heading = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      parts.push(`<h${level}>${parseInlineMarkdown(heading[2])}</h${level}>`);
      i += 1;
      continue;
    }
    if (trimmed.startsWith(">")) {
      const quoteLines = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      parts.push(`<blockquote>${renderMarkdown(quoteLines.join("\n"))}</blockquote>`);
      continue;
    }
    if ((trimmed.startsWith("|") || (i + 1 < lines.length && isTableSeparator(lines[i + 1])))) {
      const table = consumeTable(lines, i);
      if (table.html) {
        parts.push(table.html);
        i = table.nextIndex;
        continue;
      }
    }
    if (parseListMarker(line)) {
      const list = consumeList(lines, i);
      parts.push(list.html);
      i = list.nextIndex;
      continue;
    }
    const paragraphLines = [trimmed];
    i += 1;
    while (i < lines.length) {
      const nextTrimmed = lines[i].trim();
      if (!nextTrimmed) break;
      if (/^(#{1,6})\s+/.test(nextTrimmed)) break;
      if (/^```/.test(nextTrimmed)) break;
      if (/^(---|\*\*\*|___)\s*$/.test(nextTrimmed)) break;
      if (nextTrimmed.startsWith(">")) break;
      if (/^\s*[-*+]\s+/.test(lines[i])) break;
      if (/^\s*\d+\.\s+/.test(lines[i])) break;
      if (i + 1 < lines.length && isTableSeparator(lines[i + 1])) break;
      paragraphLines.push(nextTrimmed);
      i += 1;
    }
    parts.push(`<p>${renderMarkdownLines(paragraphLines)}</p>`);
  }
  return parts.join("");
}

function updateNotesActiveFile() {
  document.querySelectorAll(".notes-tree-file").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.path === state.currentNotePath);
  });
}

function resolveNoteLink(targetHref) {
  if (!targetHref) return "";
  if (/^(https?:|mailto:|#)/i.test(targetHref)) return targetHref;
  const base = state.currentNotePath || "";
  const baseDir = base.includes("/") ? base.slice(0, base.lastIndexOf("/") + 1) : "";
  const resolved = new URL(targetHref, `https://notes.local/${baseDir}`);
  return normalizeNotePath(resolved.pathname.replace(/^\//, ""));
}

async function openNote(relativePath) {
  const normalized = normalizeNotePath(relativePath);
  const node = state.notesFileMap.get(normalized);
  if (!node) return;
  state.currentNotePath = normalized;
  updateNotesActiveFile();
  if (el.notesCurrentPath) el.notesCurrentPath.textContent = normalized;
  setNotesStatus(`Opening ${noteLabelFromPath(normalized)}...`);
  try {
    const res = await fetch(noteFetchURL(normalized), { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`Could not load note (${res.status}).`);
    }
    const markdown = await res.text();
    el.notesViewer.innerHTML = renderMarkdown(markdown);
    setNotesStatus(`${state.notesFileMap.size} markdown files ready.`);
    if (isMobileNotesLayout()) {
      closeNotesSidebar();
    }
  } catch (err) {
    el.notesViewer.innerHTML = `<div class="notes-empty-state"><h3>Unable to load note</h3><p>${escapeHTML(err?.message || "Unknown error")}</p></div>`;
    setNotesStatus("A notes file failed to load.");
  }
}

function buildNotesTreeNodes(nodes, container, expandFirstBranch = false) {
  (nodes || []).forEach((node, index) => {
    if (node.type === "directory") {
      const shouldStartExpanded = expandFirstBranch && index === 0;
      const folder = document.createElement("div");
      folder.className = "notes-tree-folder";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "notes-tree-toggle";
      toggle.setAttribute("aria-expanded", shouldStartExpanded ? "true" : "false");
      toggle.textContent = node.name;
      const children = document.createElement("div");
      children.className = "notes-tree-children";
      buildNotesTreeNodes(node.children || [], children, shouldStartExpanded);
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
        children.hidden = expanded;
      });
      children.hidden = !shouldStartExpanded;
      folder.appendChild(toggle);
      folder.appendChild(children);
      container.appendChild(folder);
      return;
    }
    const fileButton = document.createElement("button");
    fileButton.type = "button";
    fileButton.className = "notes-tree-file";
    fileButton.dataset.path = normalizeNotePath(node.path);
    fileButton.textContent = node.name;
    fileButton.addEventListener("click", () => {
      openNote(node.path);
    });
    container.appendChild(fileButton);
  });
}

function openNotesSidebar() {
  if (!isMobileNotesLayout()) return;
  el.notesSidebar?.classList.add("is-open");
  el.notesSidebarBackdrop?.classList.remove("hidden");
  el.toggleNotesSidebar?.setAttribute("aria-expanded", "true");
}

function closeNotesSidebar() {
  el.notesSidebar?.classList.remove("is-open");
  el.notesSidebarBackdrop?.classList.add("hidden");
  el.toggleNotesSidebar?.setAttribute("aria-expanded", "false");
}

function toggleNotesSidebar() {
  if (!isMobileNotesLayout()) return;
  if (el.notesSidebar?.classList.contains("is-open")) {
    closeNotesSidebar();
    return;
  }
  openNotesSidebar();
}

function filteredNotesRootsForActiveTrack() {
  const manifestRoots = state.notesManifest?.roots || [];
  if (state.activeTrackType !== "certification") {
    return manifestRoots;
  }
  return manifestRoots.filter((node) => normalizeNotePath(node?.path) !== "Notes List B - Textbook Content");
}

function renderNotesTree() {
  el.notesTree.innerHTML = "";
  if (state.notesLoadError) {
    el.notesTree.innerHTML = `<div class="notes-empty-state"><h3>Notes unavailable</h3><p>${escapeHTML(state.notesLoadError)}</p></div>`;
    return;
  }
  const scopedRoots = [{
    type: "directory",
    name: activeTrack().contentRoot,
    path: activeTrack().contentRoot,
    children: filteredNotesRootsForActiveTrack(),
  }];
  buildNotesTreeNodes(scopedRoots, el.notesTree, true);
  updateNotesActiveFile();
}

function renderCourseChangelog() {
  if (!el.courseChangelogViewer) return;
  if (state.changelogLoadError) {
    el.courseChangelogViewer.innerHTML = `<div class="notes-empty-state"><h3>Changelog unavailable</h3><p>${escapeHTML(state.changelogLoadError)}</p></div>`;
    setChangelogStatus("Could not load changelog.");
    return;
  }
  if (!state.changelogText.trim()) {
    el.courseChangelogViewer.innerHTML = `<div class="notes-empty-state"><h3>No changelog yet</h3><p>Project updates will appear here.</p></div>`;
    setChangelogStatus("No changelog content found.");
    return;
  }
  el.courseChangelogViewer.innerHTML = renderMarkdown(state.changelogText);
  setChangelogStatus("Latest changelog loaded.");
}

async function showNotesScreen() {
  screen("notes-screen");
  closeNotesSidebar();
  renderNotesTree();
  if (state.notesLoadError) {
    setNotesStatus("Run the notes sync script to populate the viewer.");
    return;
  }
  if (!state.currentNotePath && state.notesFileMap.size) {
    state.currentNotePath = state.notesFileMap.keys().next().value || "";
  }
  if (state.currentNotePath) {
    await openNote(state.currentNotePath);
  } else {
    setNotesStatus("No markdown notes were found.");
  }
}

function syncConfigStateFromControls() {
  if (el.modeSelect) state.mode = el.modeSelect.value || state.mode;
  if (el.questionCount) {
    const n = Math.max(1, Number(el.questionCount.value || state.amount || 1));
    state.amount = n;
    el.questionCount.value = String(n);
  }
  if (el.skipCorrect) state.skipPreviouslyCorrect = el.skipCorrect.checked;
  if (el.includeMissedOnce) state.includeMissedOnce = el.includeMissedOnce.checked;
  saveQuizConfig();
}

function applyConfigStateToControls() {
  if (el.modeSelect) {
    el.modeSelect.value = state.mode;
    if (state.mode === "easy") el.modeSelect.selectedIndex = 0;
  }
  if (el.questionCount) el.questionCount.value = String(state.amount);
  if (el.skipCorrect) el.skipCorrect.checked = state.skipPreviouslyCorrect;
  if (el.includeMissedOnce) el.includeMissedOnce.checked = state.includeMissedOnce;
}

function syncConfigScreenAfterPaint() {
  window.requestAnimationFrame(() => {
    applyConfigStateToControls();
    refreshAvailableCount();
  });
}

function nudgeQuestionCount(delta) {
  if (!el.questionCount) return;
  const min = Math.max(1, Number(el.questionCount.min || 1));
  const max = Math.max(min, Number(el.questionCount.max || 100));
  const current = Math.max(min, Number(el.questionCount.value || min));
  const next = Math.min(max, Math.max(min, current + delta));
  el.questionCount.value = String(next);
  el.questionCount.dispatchEvent(new Event("input", { bubbles: true }));
  el.questionCount.dispatchEvent(new Event("change", { bubbles: true }));
}

function refreshAvailableCount() {
  const config = activePracticeUnitConfig();
  const mode = state.mode;
  const modePool = filteredPoolByDifficulty(mode);
  const available = countAvailable(mode);
  const easyTotal = filteredPoolByDifficulty("easy").length;
  const mediumTotal = filteredPoolByDifficulty("medium").length;
  const hardTotal = filteredPoolByDifficulty("hard").length;
  const stats = historyStatsForPool(modePool);
  el.difficultyTotals.textContent = `Possible Questions by Difficulty -> Easy: ${easyTotal} | Medium (incl. Easy): ${mediumTotal} | Hard: ${hardTotal}`;
  const weeks = [...state.selectedWeeks].sort((a, b) => a - b);
  el.weekSummary.textContent = weeks.length
    ? `Selected ${config.plural}: ${weeks.join(", ")}`
    : `Selected ${config.plural}: none`;
  const descriptions = {
    easy: "Easy: Core fundamentals in the class for beginners.",
    medium: "Medium: All questions that have to do with the scope of the class.",
    hard: "Hard: Advanced expansion topics that expand on topics taught in class.",
  };
  let detail = descriptions[mode];
  if (state.skipPreviouslyCorrect) {
    detail += ` Browser save: ${stats.answeredEver} answered already, ${stats.neverAnswered} never answered. Quiz draw pool after filters = ${available} (${stats.neverAnswered} never answered + ${stats.missedOnly} still-missed`;
    if (state.includeMissedOnce) {
      detail += ` + ${stats.missedThenCorrect} previously-corrected questions that were missed at least once`;
    }
    detail += ").";
  }
  el.modeDesc.textContent = detail;
}

function updateFlagButtonState() {
  if (!state.questions.length) {
    el.flagQuestion.disabled = true;
    el.ineffectiveQuestion.disabled = true;
    return;
  }
  el.flagQuestion.textContent = state.mode === "hard"
    ? "Move to Medium"
    : "Not in Current Course Scope";
  el.flagQuestion.disabled = false;
  el.ineffectiveQuestion.disabled = false;
}

function syncScoreFromSession() {
  const answeredRows = state.questions.filter((row) => row?._sessionAnswer);
  state.answeredCount = answeredRows.length;
  state.correctCount = answeredRows.filter((row) => row._sessionAnswer?.wasCorrect).length;
}

function updateLiveScore() {
  syncScoreFromSession();
  if (state.answeredCount === 0) {
    el.liveScore.textContent = "Live Score: 0/0 (0.0%) | Letter: N/A";
    return;
  }
  const pct = (state.correctCount / state.answeredCount) * 100;
  el.liveScore.textContent = `Live Score: ${state.correctCount}/${state.answeredCount} (${pct.toFixed(1)}%) | Letter: ${letterGrade(pct)}`;
}

function setAnswerControlsEnabled(enabled) {
  const radios = [...document.querySelectorAll('input[name="answer"]')];
  radios.forEach((rb) => {
    rb.disabled = !enabled;
    if (!enabled) rb.checked = false;
  });
  el.submitAnswer.disabled = !enabled;
  el.dontKnowAnswer.disabled = !enabled;
  el.trustedAiExplanation.disabled = true;
  el.previousQuestion.disabled = true;
  el.nextQuestion.disabled = true;
  el.finishQuiz.disabled = !enabled;
  el.ineffectiveQuestion.disabled = !enabled;
  if (enabled) updateFlagButtonState();
  else {
    el.flagQuestion.disabled = true;
    el.ineffectiveQuestion.disabled = true;
  }
}

function selectedAnswer() {
  const chosen = document.querySelector('input[name="answer"]:checked');
  return chosen ? chosen.value : "";
}

function previousAnsweredQuestionIndex() {
  for (let idx = state.currentIndex - 1; idx >= 0; idx -= 1) {
    if (state.questions[idx]?._sessionAnswer) return idx;
  }
  return -1;
}

function updatePreviousQuestionButton() {
  if (!el.previousQuestion) return;
  el.previousQuestion.disabled = previousAnsweredQuestionIndex() < 0;
}

function updateTrustedAiButton(row) {
  if (!el.trustedAiExplanation) return;
  el.trustedAiExplanation.disabled = !row?._sessionAnswer;
}

function syncRenderedAnswerState(row) {
  const saved = row?._sessionAnswer || null;
  state.currentSelectedAnswer = saved?.selected || "";
  state.currentLocked = Boolean(saved);
  el.feedback.textContent = saved?.feedback || "";
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.checked = saved?.selected === rb.value;
    rb.disabled = Boolean(saved);
  });
  el.submitAnswer.disabled = Boolean(saved);
  el.dontKnowAnswer.disabled = Boolean(saved);
  el.nextQuestion.disabled = !saved;
  updateTrustedAiButton(row);
  updatePreviousQuestionButton();
}

function trustedAiPromptForQuestion(row) {
  if (!row?._sessionAnswer || !row?._sessionOptionMap) return "";
  const answer = row._sessionAnswer;
  const choiceLines = ["A", "B", "C", "D"].map((slot) => {
    const option = row._sessionOptionMap[slot];
    return `${slot}. ${option?.text || ""}`;
  });
  const selectedLabel = answer.selected === "E"
    ? "I don't know"
    : `${answer.selected}. ${row._sessionOptionMap[answer.selected]?.text || ""}`;
  const correct = String(row.correct_choice || "").toUpperCase();
  const correctSlot = ["A", "B", "C", "D"].find(
    (slot) => row._sessionOptionMap[slot]?.original === correct
  ) || correct;
  const correctLabel = correctSlot
    ? `${correctSlot}. ${row._sessionOptionMap[correctSlot]?.text || row[`choice_${correct.toLowerCase()}`] || ""}`
    : "Unknown";
  return [
    "Please help me understand this quiz question.",
    "",
    `Question: ${row.question || ""}`,
    "",
    ...choiceLines,
    "",
    `User selected answer: ${selectedLabel}`,
    `Correct answer: ${correctLabel}`,
    "",
    "Explain why the correct answer is right, if the user's selected answer is wrong and why it's wrong if it is, and instruct the user how to talk to the AI. Provide examples of useful follow-up responses the user can send after your explanation.",
  ].join("\n");
}

function trustedAiSearchURL(row) {
  const prompt = trustedAiPromptForQuestion(row);
  if (!prompt) return "";
  return `https://www.google.com/search?udm=50&aep=11&q=${encodeURIComponent(prompt)}`;
}

function openTrustedAiExplanation() {
  const row = state.questions[state.currentIndex];
  const url = trustedAiSearchURL(row);
  if (!url) {
    alert("Answer this question first, then Trusted AI Explanation can open.");
    return;
  }
  window.__rocketLastTrustedAiURL = url;
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (opened && typeof opened.focus === "function") {
    opened.focus();
  }
}

function renderCurrentQuestion() {
  if (!state.questions.length || state.currentIndex >= state.questions.length) {
    finishQuiz();
    return;
  }
  const row = state.questions[state.currentIndex];
  const qnum = state.currentIndex + 1;
  el.quizMeta.textContent = `Mode: ${state.mode[0].toUpperCase()}${state.mode.slice(1)} | Question ${qnum} of ${state.questions.length}`;
  el.questionText.textContent = `Q: ${row.question}`;
  if (!row._sessionOptionMap) {
    const shuffledOptions = shuffledAnswerOptions(row);
    row._sessionOptionMap = {
      A: shuffledOptions[0],
      B: shuffledOptions[1],
      C: shuffledOptions[2],
      D: shuffledOptions[3],
    };
  }
  state.currentOptionMap = row._sessionOptionMap;
  el.choiceA.textContent = `A. ${state.currentOptionMap.A.text}`;
  el.choiceB.textContent = `B. ${state.currentOptionMap.B.text}`;
  el.choiceC.textContent = `C. ${state.currentOptionMap.C.text}`;
  el.choiceD.textContent = `D. ${state.currentOptionMap.D.text}`;
  syncRenderedAnswerState(row);
  updateFlagButtonState();
}

function showSetup() {
  screen("config-screen");
  state.questions = [];
  state.currentIndex = 0;
  state.currentLocked = false;
  state.lastAutoReportName = "";
  if (!state.setupVisited) {
    state.mode = "easy";
    state.setupVisited = true;
  }
  applyConfigStateToControls();
  el.questionText.textContent = "Click Start Quiz to begin.";
  el.quizMeta.textContent = "";
  el.feedback.textContent = "";
  setAnswerControlsEnabled(false);
  updateLiveScore();
  refreshAvailableCount();
  syncConfigScreenAfterPaint();
  reloadQuestionBanksForSetup();
}

async function reloadQuestionBanksForSetup() {
  if (questionBankReloadPromise) return questionBankReloadPromise;
  questionBankReloadPromise = (async () => {
    try {
      await loadQuestionBanks();
      if (state.weekAvailabilityReady) {
        state.selectedWeeks = new Set(
          [...state.selectedWeeks].filter((week) => state.availableWeeks.has(Number(week)))
        );
        if (!state.selectedWeeks.size && state.availableWeeks.size) {
          state.selectedWeeks = new Set([...state.availableWeeks].sort((a, b) => a - b));
        }
        buildWeekControls();
      }
    } catch (err) {
      console.warn("Question bank reload failed:", err?.message || err);
    } finally {
      questionBankReloadPromise = null;
      refreshAvailableCount();
    }
  })();
  return questionBankReloadPromise;
}

function startQuiz() {
  syncConfigStateFromControls();
  const config = activePracticeUnitConfig();
  if (!state.selectedWeeks.size) {
    alert(`Select at least one ${config.singular.toLowerCase()} before starting a quiz.`);
    return;
  }
  const reqCount = Math.max(1, Number(el.questionCount.value || 1));
  state.amount = reqCount;
  const available = countAvailable(state.mode);
  if (available === 0) {
    alert(`No questions are available in ${state.mode} mode.`);
    return;
  }
  const useCount = Math.min(reqCount, available);
  if (useCount < reqCount) {
    alert(`Requested ${reqCount}, but only ${available} are available in ${state.mode} mode.\nUsing ${useCount}.`);
  }
  const useTourDemo = state.walkthroughActive && tourCurrentStep()?.action === "start-quiz" && state.tourQuestionBank.length;
  if (useTourDemo) {
    state.mode = "easy";
    state.amount = state.tourQuestionBank.length;
    el.modeSelect.value = "easy";
    el.questionCount.value = String(state.tourQuestionBank.length);
    state.questions = state.tourQuestionBank.map((q, idx) => freshSessionQuestion(q, `tour-live-${idx + 1}`));
  } else {
    state.questions = shuffled(fetchRandomQuestions(state.mode, useCount).map((q) => freshSessionQuestion(q)));
  }
  state.lastModeFinished = state.mode;
  state.currentIndex = 0;
  state.correctCount = 0;
  state.answeredCount = 0;
  state.incorrectRecords = [];
  state.lastReportText = "";
  state.lastAutoReportName = "";
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  state.currentOptionMap = {};
  screen("quiz-screen");
  setAnswerControlsEnabled(true);
  updateLiveScore();
  renderCurrentQuestion();
}

function submitSelectedAnswer(selected) {
  if (state.currentLocked || !state.questions.length) return;
  const isDontKnow = selected === "E";
  const row = state.questions[state.currentIndex];
  const walkthroughError = validateWalkthroughAnswer(selected, row, isDontKnow);
  if (walkthroughError) {
    if (walkthroughError === "__walkthrough_rewind__") {
      return;
    }
    alert(walkthroughError);
    return;
  }
  const selectedOption = state.currentOptionMap[selected] || { original: selected, text: "" };
  const selectedOriginal = isDontKnow ? "E" : selectedOption.original;
  const selectedText = isDontKnow
    ? "User selected that they don't know the answer."
    : (selectedOption.text || row[`choice_${selectedOriginal.toLowerCase()}`]);
  const correct = row.correct_choice.toUpperCase();
  const correctSlot = ["A", "B", "C", "D"].find(
    (slot) => state.currentOptionMap[slot]?.original === correct
  ) || correct;
  const rightText = row[`choice_${correct.toLowerCase()}`];
  const explanation = row.explanation || "";
  state.currentSelectedAnswer = selected;
  state.answeredCount += 1;
  if (!isDontKnow && selectedOriginal === correct) {
    state.correctCount += 1;
    appendQuestionHistory(row, selectedOriginal, true);
    el.feedback.textContent = `Correct. ${explanation}`;
  } else {
    appendQuestionHistory(row, selectedOriginal, false);
    state.incorrectRecords.push({
      question: row.question,
      selected_letter: selected,
      selected_text: selectedText,
      correct_letter: correctSlot,
      correct_text: rightText,
      explanation,
      source_path: row.source_path || row.source || "",
      week: row.week ?? null,
    });
    if (isDontKnow) {
      el.feedback.textContent = `Marked incorrect: I don't know. Correct answer: ${correctSlot}. ${rightText}\n${explanation}`;
    } else {
      el.feedback.textContent = `Incorrect. Correct answer: ${correctSlot}. ${rightText}\n${explanation}`;
    }
  }
  updateLiveScore();
  state.currentLocked = true;
  row._sessionAnswer = {
    selected,
    selectedOriginal,
    feedback: el.feedback.textContent,
    wasCorrect: !isDontKnow && selectedOriginal === correct,
  };
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.disabled = true;
  });
  el.submitAnswer.disabled = true;
  el.dontKnowAnswer.disabled = true;
  el.nextQuestion.disabled = false;
  updateTrustedAiButton(row);
  updatePreviousQuestionButton();
  if (isDontKnow) {
    notifyWalkthroughAction("submit-dont-know");
  } else {
    notifyWalkthroughAction(selectedOriginal === correct ? "submit-correct" : "submit-incorrect");
  }
}

function submitAnswer() {
  if (state.currentLocked || !state.questions.length) return;
  const walkthroughAction = walkthroughQuizStepAction();
  if (walkthroughAction && !["submit-correct", "submit-incorrect"].includes(walkthroughAction)) {
    alert("Follow the highlighted walkthrough step first before using Submit Answer.");
    return;
  }
  const selected = selectedAnswer();
  if (!["A", "B", "C", "D"].includes(selected)) {
    alert("Select A, B, C, or D before submitting.");
    return;
  }
  submitSelectedAnswer(selected);
}

function submitDontKnowAnswer() {
  const walkthroughAction = walkthroughQuizStepAction();
  if (walkthroughAction && walkthroughAction !== "submit-dont-know") {
    alert("Use I Don't Know when the walkthrough is specifically highlighting it.");
    return;
  }
  submitSelectedAnswer("E");
}

function nextQuestion() {
  if (!state.questions.length) return;
  if (walkthroughGuardQuizAction("next-question", "Use Next Question when the walkthrough is specifically highlighting it.")) {
    return;
  }
  state.currentIndex += 1;
  renderCurrentQuestion();
  notifyWalkthroughAction("next-question");
}

function previousQuestion() {
  if (!state.questions.length) return;
  const previousIndex = previousAnsweredQuestionIndex();
  if (previousIndex < 0) return;
  state.currentIndex = previousIndex;
  renderCurrentQuestion();
}

async function flagCurrentQuestion() {
  if (!state.questions.length) return;
  const row = state.questions[state.currentIndex];
  const isDemoQuestion = isTourWalkthroughDemoQuestion(row);
  const movingFromHard = state.mode === "hard";
  const requestedLevel = movingFromHard ? "medium" : "hard";
  const changeAction = movingFromHard ? "move_to_medium" : "not_in_current_scope";
  const feedbackRequest = movingFromHard ? "please change this to medium" : "please change this to hard";
  if (!isDemoQuestion) {
    await appendChangeRequest(row, feedbackRequest, {
      action: changeAction,
      requestedLevel,
    });
  }
  if (!isDemoQuestion) {
    setQuestionDifficultyOverride(row.question_key, requestedLevel);
  }
  if (state.currentLocked) {
    el.feedback.textContent = movingFromHard
      ? "Saved: this question will be moved to Medium mode for future sessions."
      : (isDemoQuestion
        ? "Walkthrough demo: marked out of course scope and skipped without sending a server change."
        : "Saved: this question will be moved to Hard mode for future sessions.");
    refreshAvailableCount();
    return;
  }
  el.feedback.textContent = movingFromHard
    ? "Moved to Medium mode and skipped (no impact on grade)."
    : (isDemoQuestion
      ? "Walkthrough demo: marked not in current course scope and skipped (no impact on grade, no server change recorded)."
      : "Reassigned to Hard mode and skipped (no impact on grade).");
  refreshAvailableCount();
  state.questions.splice(state.currentIndex, 1);
  if (state.currentIndex >= state.questions.length) {
    if (state.answeredCount > 0) finishQuiz();
    else {
      const levelLabel = movingFromHard ? "Medium" : "Hard";
      alert(`Question moved to ${levelLabel} mode and skipped. No questions remain in this session.`);
      showSetup();
    }
    return;
  }
  renderCurrentQuestion();
}

function openIneffectiveDialog() {
  if (!state.questions.length) return;
  el.ineffectiveFeedback.value = "";
  if (typeof el.ineffectiveDialog.showModal === "function") {
    el.ineffectiveDialog.showModal();
  } else {
    const feedback = prompt("Why is this question ineffective? (required)");
    if (feedback && feedback.trim()) {
      const validationError = validateFeedbackText(feedback);
      if (validationError) {
        alert(validationError);
        return;
      }
      applyIneffectiveFeedback(feedback.trim());
    }
  }
}

async function applyIneffectiveFeedback(feedback) {
  if (!state.questions.length) return;
  const row = state.questions[state.currentIndex];
  const selected = state.currentSelectedAnswer;
  const isDemoQuestion = isTourWalkthroughDemoQuestion(row);
  if (!isDemoQuestion) {
    await appendChangeRequest(row, feedback, {
      action: "ineffective_question",
      requestedLevel: getDifficulty(row),
    });
  }
  if (!isDemoQuestion) {
    removeQuestionFromBank(row.question_key);
  }
  if (state.currentLocked && ["A", "B", "C", "D", "E"].includes(selected)) {
    let removedOne = false;
    state.incorrectRecords = state.incorrectRecords.filter((rec) => {
      if (!removedOne && rec.question === row.question && rec.selected_letter === selected) {
        removedOne = true;
        return false;
      }
      return true;
    });
  }
  state.questions.splice(state.currentIndex, 1);
  updateLiveScore();
  el.feedback.textContent = isDemoQuestion
    ? "Walkthrough demo: question marked ineffective and removed from this demo run. No server change was sent."
    : "Question marked ineffective, saved to changes log, and removed from the main question bank.";
  refreshAvailableCount();
  if (state.currentIndex >= state.questions.length) {
    if (state.answeredCount > 0) finishQuiz();
    else {
      alert("Question removed. No more questions remain in this session.");
      showSetup();
    }
    return;
  }
  renderCurrentQuestion();
}

function buildReviewReport(pct, grade) {
  const now = new Date();
  const generated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const mode = `${state.mode[0].toUpperCase()}${state.mode.slice(1)}`;
  const sourcesToReview = [...new Set(state.incorrectRecords.map((rec) => inferStudyReference(rec.source_path, rec.week)).filter(Boolean))].sort();
  const course = activeTrack();
  const lines = [
    `🚀 ${course.insignia} QUIZ REVIEW REPORT`,
    "=".repeat(72),
    `Generated: ${generated}`,
    `Mode: ${mode}`,
    `Answered: ${state.answeredCount}`,
    `Correct: ${state.correctCount}`,
    `Score: ${pct.toFixed(2)}%`,
    `Letter Grade: ${grade}`,
    "",
    "Incorrect Questions",
    "-".repeat(72),
  ];
  if (!state.incorrectRecords.length) {
    lines.push("None. Great job, no incorrect responses.");
  } else {
    state.incorrectRecords.forEach((rec, idx) => {
      lines.push(`${idx + 1}. Question: ${rec.question}`);
      lines.push(`   Selected answer: ${rec.selected_letter}. ${rec.selected_text}`);
      lines.push(`   Correct answer: ${rec.correct_letter}. ${rec.correct_text}`);
      lines.push(`   Explanation: ${(rec.explanation || "").trim()}`);
      const sourceLabel = inferStudyReference(rec.source_path, rec.week);
      lines.push(`   Source: ${sourceLabel || "Not mapped"}`);
      lines.push("");
    });
  }
  lines.push("");
  lines.push("Sources to Review");
  lines.push("-".repeat(72));
  if (sourcesToReview.length) {
    sourcesToReview.forEach((source) => lines.push(`- ${source}`));
  } else {
    lines.push("- No video/chapter source references found for missed questions.");
  }
  return lines.join("\n");
}

function autoSaveReviewReport(reportText) {
  const stamp = formatStamp();
  const courseTag = activeTrack().insignia.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  const filename = `${courseTag || "course"}_practice_review_${state.mode}_${stamp}.txt`;
  state.reports.push({
    filename,
    mode: state.mode,
    created_at: formatTimestamp(),
    text: reportText,
  });
  if (state.reports.length > 100) {
    state.reports = state.reports.slice(-100);
  }
  saveReports();
  return filename;
}

function syncResetCorrectButtons() {
  const disableForWalkthrough = walkthroughUsesDialogNext() && walkthroughCurrentAction() === "review-reset-demo";
  if (el.resetWrongCount) el.resetWrongCount.disabled = disableForWalkthrough;
  if (el.resetWrongCountConfig) el.resetWrongCountConfig.disabled = disableForWalkthrough;
}

function finishQuiz() {
  syncScoreFromSession();
  if (state.answeredCount === 0) {
    alert("No answers submitted yet.");
    screen("config-screen");
    return;
  }
  const pct = (state.correctCount / state.answeredCount) * 100;
  const grade = letterGrade(pct);
  state.lastModeFinished = state.mode;
  const report = buildReviewReport(pct, grade);
  state.lastReportText = report;
  state.lastAutoReportName = autoSaveReviewReport(report);
  el.retakeIncorrect.disabled = !state.incorrectRecords.length;
  syncResetCorrectButtons();
  el.reviewSummary.textContent = `Answered: ${state.answeredCount} | Correct: ${state.correctCount} | Score: ${pct.toFixed(2)}% | Letter: ${grade}`;
  el.reviewText.value = report;
  el.reviewTextPrint.textContent = report;
  screen("review-screen");
}

function retakeIncorrectOnly() {
  if (!state.incorrectRecords.length) {
    alert("There are no incorrect questions to retake.");
    return;
  }
  const wrongQuestions = new Set(state.incorrectRecords.map((rec) => rec.question));
  const mode = state.lastModeFinished;
  const allowed = mode === "medium" ? new Set(["easy", "medium"]) : new Set([mode]);
  const rows = state.questionBank.filter((q) => {
    if (isRemoved(q)) return false;
    const d = getDifficulty(q);
    return allowed.has(d) && wrongQuestions.has(q.question) && questionInSelectedWeeks(q);
  });
  if (!rows.length) {
    alert("Could not load incorrect questions for retake.");
    return;
  }
  state.questions = shuffled(rows.map((q) => freshSessionQuestion(q)));
  state.currentIndex = 0;
  state.correctCount = 0;
  state.answeredCount = 0;
  state.incorrectRecords = [];
  state.lastReportText = "";
  state.lastAutoReportName = "";
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  state.mode = mode;
  el.modeSelect.value = mode;
  setAnswerControlsEnabled(true);
  updateLiveScore();
  screen("quiz-screen");
  renderCurrentQuestion();
}

function openResetWrongCountDialog() {
  if (walkthroughCurrentAction() === "review-reset-demo") {
    return;
  }
  if (typeof el.resetWrongCountDialog.showModal === "function") {
    el.resetWrongCountDialog.showModal();
    return;
  }
  const ok = window.confirm("Are you sure you want to reset all answered questions?");
  if (ok) {
    resetWrongQuestionCount();
  }
}

function resetWrongQuestionCount() {
  const before = allHistoryRows().length;
  state.localHistoryRows = [];
  saveLocalHistory();
  refreshAvailableCount();
  syncResetCorrectButtons();
  const after = allHistoryRows().length;
  alert(`Answered-question history reset. Total answered rows: ${before} -> ${after}.`);
}

function copyTextWithSelectionFallback(text) {
  const activeElement = document.activeElement;
  const selection = document.getSelection();
  const selectedRanges = [];
  if (selection) {
    for (let i = 0; i < selection.rangeCount; i += 1) {
      selectedRanges.push(selection.getRangeAt(i).cloneRange());
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "0";
  textarea.style.left = "-9999px";
  textarea.style.width = "1px";
  textarea.style.height = "1px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch (err) {
    copied = false;
  }
  textarea.remove();
  if (selection) {
    selection.removeAllRanges();
    selectedRanges.forEach((range) => selection.addRange(range));
  }
  if (activeElement instanceof HTMLElement) {
    activeElement.focus({ preventScroll: true });
  }
  return copied;
}

async function copyReviewText() {
  const text = state.lastReportText || el.reviewText?.value || "";
  if (!text) return;
  window.__rocketLastCopyText = text;
  if (copyTextWithSelectionFallback(text)) {
    alert("Report copied to clipboard.");
    return;
  }
  try {
    if (!navigator.clipboard?.writeText) throw new Error("Clipboard API unavailable.");
    await navigator.clipboard.writeText(text);
    alert("Report copied to clipboard.");
  } catch (err) {
    el.reviewText.focus();
    el.reviewText.select();
    alert("Copy failed. The report text is selected now; press Ctrl+C to copy it, or use Download Report.");
  }
}

function saveReviewText() {
  if (!state.lastReportText) return;
  const blob = new Blob([state.lastReportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const courseTag = activeTrack().insignia.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  a.download = `${courseTag || "course"}_quiz_review_report.txt`;
  window.__rocketLastDownloadMeta = { filename: a.download, text: state.lastReportText };
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printReviewText() {
  if (!state.lastReportText) return;
  el.reviewTextPrint.textContent = state.lastReportText;
  window.__rocketLastPrintText = state.lastReportText;
  window.print();
}

function bindElements() {
  el.appTitle = document.getElementById("app-title");
  el.appSubtitle = document.getElementById("app-subtitle");
  el.copy = document.getElementById("copy");
  el.loadStatus = document.getElementById("load-status");
  el.startupSplash = document.getElementById("startup-splash");
  el.startupStatus = document.getElementById("startup-status");
  el.practiceModeDescription = document.getElementById("practice-mode-description");
  el.practiceUnitTitle = document.getElementById("practice-unit-title");
  el.practiceUnitDescription = document.getElementById("practice-unit-description");
  el.courseSelect = document.getElementById("course-select");
  el.certificationSelect = document.getElementById("certification-select");
  el.continueCourse = document.getElementById("continue-course");
  el.continueCertification = document.getElementById("continue-certification");
  el.goPracticeQuiz = document.getElementById("go-practice-quiz");
  el.goNotes = document.getElementById("go-notes");
  el.backCourseFromMenu = document.getElementById("back-course-from-menu");
  el.weekGrid = document.getElementById("week-grid");
  el.backCourseFromWeek = document.getElementById("back-course-from-week");
  el.selectAllWeeks = document.getElementById("select-all-weeks");
  el.clearAllWeeks = document.getElementById("clear-all-weeks");
  el.continueSetup = document.getElementById("continue-setup");
  el.courseChangelogStatus = document.getElementById("course-changelog-status");
  el.courseChangelogViewer = document.getElementById("course-changelog-viewer");
  el.notesScreenTitle = document.getElementById("notes-screen-title");
  el.backNotesToMenu = document.getElementById("back-notes-to-menu");
  el.toggleNotesSidebar = document.getElementById("toggle-notes-sidebar");
  el.notesSidebarBackdrop = document.getElementById("notes-sidebar-backdrop");
  el.notesSidebar = document.getElementById("notes-sidebar");
  el.closeNotesSidebar = document.getElementById("close-notes-sidebar");
  el.notesSidebarStatus = document.getElementById("notes-sidebar-status");
  el.notesTree = document.getElementById("notes-tree");
  el.notesCurrentPath = document.getElementById("notes-current-path");
  el.notesViewer = document.getElementById("notes-viewer");
  el.modeSelect = document.getElementById("mode-select");
  el.questionCount = document.getElementById("question-count");
  el.questionCountUp = document.getElementById("question-count-up");
  el.questionCountDown = document.getElementById("question-count-down");
  el.modeDesc = document.getElementById("mode-desc");
  el.weekSummary = document.getElementById("week-summary");
  el.difficultyTotals = document.getElementById("difficulty-totals");
  el.skipCorrect = document.getElementById("skip-correct");
  el.includeMissedOnce = document.getElementById("include-missed-once");
  el.startQuiz = document.getElementById("start-quiz");
  el.changeWeeks = document.getElementById("change-weeks");
  el.resetWrongCountConfig = document.getElementById("reset-wrong-count-config");
  el.quizMeta = document.getElementById("quiz-meta");
  el.liveScore = document.getElementById("live-score");
  el.questionText = document.getElementById("question-text");
  el.choiceA = document.getElementById("choice-a");
  el.choiceB = document.getElementById("choice-b");
  el.choiceC = document.getElementById("choice-c");
  el.choiceD = document.getElementById("choice-d");
  el.feedback = document.getElementById("feedback");
  el.submitAnswer = document.getElementById("submit-answer");
  el.dontKnowAnswer = document.getElementById("dont-know-answer");
  el.trustedAiExplanation = document.getElementById("trusted-ai-explanation");
  el.previousQuestion = document.getElementById("previous-question");
  el.nextQuestion = document.getElementById("next-question");
  el.flagQuestion = document.getElementById("flag-question");
  el.ineffectiveQuestion = document.getElementById("ineffective-question");
  el.finishQuiz = document.getElementById("finish-quiz");
  el.backSetupFromQuiz = document.getElementById("back-setup-from-quiz");
  el.reviewSummary = document.getElementById("review-summary");
  el.reviewText = document.getElementById("review-text");
  el.reviewTextPrint = document.getElementById("review-text-print");
  el.copyReport = document.getElementById("copy-report");
  el.downloadReport = document.getElementById("download-report");
  el.printReport = document.getElementById("print-report");
  el.retakeIncorrect = document.getElementById("retake-incorrect");
  el.resetWrongCount = document.getElementById("reset-wrong-count");
  el.backSetupFromReview = document.getElementById("back-setup-from-review");
  el.resetWrongCountDialog = document.getElementById("reset-wrong-count-dialog");
  el.confirmResetWrongCount = document.getElementById("confirm-reset-wrong-count");
  el.cancelResetWrongCount = document.getElementById("cancel-reset-wrong-count");
  el.ineffectiveDialog = document.getElementById("ineffective-dialog");
  el.ineffectiveFeedback = document.getElementById("ineffective-feedback");
  el.submitIneffective = document.getElementById("submit-ineffective");
  el.cancelIneffective = document.getElementById("cancel-ineffective");
  el.walkthroughOverlay = document.getElementById("walkthrough-overlay");
  el.walkthroughBackdrop = document.getElementById("walkthrough-backdrop");
  el.walkthroughSpotlight = document.getElementById("walkthrough-spotlight");
  el.walkthroughCard = document.getElementById("walkthrough-card");
  el.walkthroughKicker = document.getElementById("walkthrough-kicker");
  el.walkthroughTitle = document.getElementById("walkthrough-title");
  el.walkthroughBody = document.getElementById("walkthrough-body");
  el.walkthroughProgress = document.getElementById("walkthrough-progress");
  el.walkthroughPromptActions = document.getElementById("walkthrough-prompt-actions");
  el.walkthroughMobileActions = document.getElementById("walkthrough-mobile-actions");
  el.walkthroughTourActions = document.getElementById("walkthrough-tour-actions");
  el.walkthroughYes = document.getElementById("walkthrough-yes");
  el.walkthroughNo = document.getElementById("walkthrough-no");
  el.walkthroughMobileContinue = document.getElementById("walkthrough-mobile-continue");
  el.walkthroughNext = document.getElementById("walkthrough-next");
  el.walkthroughClose = document.getElementById("walkthrough-close");
  syncResetCorrectButtons();

  // Defensive: prevent accidental form-submit behavior even if stale HTML is cached.
  document.querySelectorAll("button").forEach((btn) => {
    btn.type = "button";
  });
  syncMobileNotesLayoutClass();

  if (el.notesViewer) {
    el.notesViewer.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (!href) return;
      const resolved = resolveNoteLink(href);
      if (state.notesFileMap.has(resolved)) {
        event.preventDefault();
        openNote(resolved);
      }
    });
  }

  if (el.reviewText) {
    el.reviewText.addEventListener("click", () => {
      if (walkthroughUsesDialogNext("review-report")) {
        return;
      }
    });
  }
}

function buildWeekControls() {
  const config = activePracticeUnitConfig();
  el.weekGrid.innerHTML = "";
  config.choices.forEach((week) => {
    const isComingSoon = config.comingSoonChoices.has(week);
    const isAvailable = !isComingSoon && state.weekAvailabilityReady && (
      state.availableWeeks.has(week) || activeTrackManualWeeks().has(week)
    );
    if (!isAvailable && state.selectedWeeks.has(week)) {
      state.selectedWeeks.delete(week);
    }
    const syncWeekSelection = (checked) => {
      if (!isAvailable) return;
      cb.checked = Boolean(checked);
      if (cb.checked) state.selectedWeeks.add(week);
      else state.selectedWeeks.delete(week);
      refreshAvailableCount();
    };
    const lbl = document.createElement("label");
    lbl.classList.toggle("is-disabled", !isAvailable);
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.disabled = !isAvailable;
    cb.checked = state.selectedWeeks.has(week);
    cb.addEventListener("change", () => {
      syncWeekSelection(cb.checked);
    });
    cb.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    const txt = document.createElement("span");
    const choiceLabel = typeof config.labelForChoice === "function"
      ? config.labelForChoice(week)
      : `${config.singular} ${week}`;
    txt.textContent = state.weekAvailabilityReady
      ? (isAvailable ? choiceLabel : `${choiceLabel} (coming soon)`)
      : `${choiceLabel} (loading...)`;
    lbl.addEventListener("click", (event) => {
      if (!isAvailable) return;
      if (event.target === cb) return;
      event.preventDefault();
      syncWeekSelection(!cb.checked);
    });
    lbl.appendChild(cb);
    lbl.appendChild(txt);
    el.weekGrid.appendChild(lbl);
  });
}

async function continueFromCourseScreen(target = "course", triggerButton = null) {
  dismissWalkthroughPrompt();
  state.courseId = el.courseSelect.value;
  if (target === "course" && !state.courseId && state.walkthroughActive && walkthroughCurrentAction() === "continue-course") {
    state.courseId = COURSE_CATALOG[0]?.id || NO_COURSE_ID;
    if (el.courseSelect) {
      el.courseSelect.value = state.courseId;
    }
  }
  if (target === "course" && !state.courseId) {
    alert("Select a course before continuing.");
    return;
  }
  setJSONStorage(COURSE_STORAGE_KEY, state.courseId);
  if (target === "certification" && el.certificationSelect) {
    state.certificationId = el.certificationSelect.value;
    if (!state.certificationId) {
      alert("Select a certification before continuing.");
      return;
    }
    setJSONStorage(CERTIFICATION_STORAGE_KEY, state.certificationId);
  } else if (el.certificationSelect) {
    state.certificationId = el.certificationSelect.value;
    setJSONStorage(CERTIFICATION_STORAGE_KEY, state.certificationId);
  }
  state.activeTrackType = target === "certification" ? "certification" : "course";
  setJSONStorage(TRACK_TYPE_STORAGE_KEY, state.activeTrackType);
  setContinueButtonsLoading(triggerButton, true);
  showStartupSplash("Loading your course workspace...");
  setStartupStatus(`Loading ${activeTrack().name} content...`);
  try {
    await Promise.all([reloadQuestionBanksForSetup(), reloadNotesManifestForTrack()]);
    setNotesStatus(
      state.notesLoadError
        ? "Notes manifest missing. Run the notes manifest builder."
        : `${state.notesFileMap.size} markdown files ready.`
    );
    screen("menu-screen");
    notifyWalkthroughAction("continue-course");
  } catch (err) {
    alert(err?.message || "The course workspace could not be loaded.");
  } finally {
    setContinueButtonsLoading(triggerButton, false);
    hideStartupSplash();
  }
}

function wireEvents() {
  // Capture phase blocks submits before any default navigation can run.
  document.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);
  window.addEventListener("resize", syncWalkthroughPosition);
  window.addEventListener("resize", () => {
    syncMobileNotesLayoutClass();
    if (!isMobileNotesLayout()) {
      closeNotesSidebar();
    }
  });
  window.addEventListener("scroll", syncWalkthroughPosition, true);
  document.addEventListener("keydown", (event) => {
    if (el.walkthroughOverlay.classList.contains("hidden")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeWalkthrough();
    }
  });
  el.walkthroughYes.addEventListener("click", (event) => {
    event.preventDefault();
    startWalkthrough();
  });
  el.walkthroughNo.addEventListener("click", (event) => {
    event.preventDefault();
    closeWalkthrough();
  });
  el.walkthroughMobileContinue.addEventListener("click", (event) => {
    event.preventDefault();
    closeWalkthrough();
  });
  el.walkthroughNext.addEventListener("click", (event) => {
    event.preventDefault();
    const action = walkthroughCurrentAction();
    if (action === "review-back-demo") {
      showSetup();
    }
    if (walkthroughUsesDialogNext(action)) {
      advanceWalkthrough();
    }
  });

  el.courseSelect.addEventListener("change", () => {
    state.courseId = el.courseSelect.value;
    setJSONStorage(COURSE_STORAGE_KEY, state.courseId);
  });
  if (el.certificationSelect) {
    el.certificationSelect.addEventListener("change", () => {
      state.certificationId = el.certificationSelect.value;
      setJSONStorage(CERTIFICATION_STORAGE_KEY, state.certificationId);
    });
  }
  el.continueCourse.addEventListener("click", (event) => {
    event.preventDefault();
    continueFromCourseScreen("course", el.continueCourse);
  });
  if (el.continueCertification) {
    el.continueCertification.addEventListener("click", (event) => {
      event.preventDefault();
      continueFromCourseScreen("certification", el.continueCertification);
    });
  }
  el.goPracticeQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    screen("week-screen");
    notifyWalkthroughAction("go-practice-quiz");
  });
  el.goNotes.addEventListener("click", async (event) => {
    event.preventDefault();
    await showNotesScreen();
    notifyWalkthroughAction("go-notes");
  });
  el.backCourseFromMenu.addEventListener("click", (event) => {
    event.preventDefault();
    screen("course-screen");
  });
  el.backCourseFromWeek.addEventListener("click", (event) => {
    event.preventDefault();
    screen("menu-screen");
  });
  el.backNotesToMenu.addEventListener("click", (event) => {
    event.preventDefault();
    screen("menu-screen");
    notifyWalkthroughAction("back-notes-to-menu");
  });
  el.toggleNotesSidebar.addEventListener("click", (event) => {
    event.preventDefault();
    toggleNotesSidebar();
  });
  el.closeNotesSidebar.addEventListener("click", (event) => {
    event.preventDefault();
    closeNotesSidebar();
  });
  el.notesSidebarBackdrop.addEventListener("click", () => {
    closeNotesSidebar();
  });
  el.selectAllWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    const config = activePracticeUnitConfig();
    const targetWeeks = state.weekAvailabilityReady
      ? config.choices.filter((week) => state.availableWeeks.has(week) && !config.comingSoonChoices.has(week))
      : [];
    state.selectedWeeks = new Set(targetWeeks);
    buildWeekControls();
    refreshAvailableCount();
  });
  el.clearAllWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    state.selectedWeeks = new Set();
    buildWeekControls();
    refreshAvailableCount();
  });
  el.continueSetup.addEventListener("click", (event) => {
    event.preventDefault();
    const config = activePracticeUnitConfig();
    if (!state.selectedWeeks.size) {
      alert(`Choose at least one ${config.singular.toLowerCase()} to continue.`);
      return;
    }
    if (state.walkthroughActive && tourCurrentStep()?.action === "continue-setup") {
      resetWalkthroughConfigState();
    }
    showSetup();
    notifyWalkthroughAction("continue-setup");
  });
  el.modeSelect.addEventListener("click", () => {
    notifyWalkthroughAction("mode-select-click");
  });
  el.modeSelect.addEventListener("change", () => {
    state.mode = el.modeSelect.value;
    refreshAvailableCount();
    notifyWalkthroughAction(`mode-${state.mode}`);
  });
  el.questionCount.addEventListener("input", () => {
    const n = Math.max(1, Number(el.questionCount.value || 1));
    state.amount = n;
    if (Number.isFinite(n) && n === 6) {
      notifyWalkthroughAction("question-count-6");
    }
  });
  el.questionCount.addEventListener("change", () => {
    const n = Math.max(1, Number(el.questionCount.value || 1));
    state.amount = n;
    el.questionCount.value = String(n);
    if (Number.isFinite(n) && n === 6) {
      notifyWalkthroughAction("question-count-6");
    }
  });
  el.questionCountUp.addEventListener("click", (event) => {
    event.preventDefault();
    nudgeQuestionCount(1);
  });
  el.questionCountDown.addEventListener("click", (event) => {
    event.preventDefault();
    nudgeQuestionCount(-1);
  });
  el.skipCorrect.addEventListener("change", () => {
    state.skipPreviouslyCorrect = el.skipCorrect.checked;
    refreshAvailableCount();
    if (el.skipCorrect.checked) {
      notifyWalkthroughAction("skip-correct-on");
    }
  });
  if (el.includeMissedOnce) {
    el.includeMissedOnce.addEventListener("change", () => {
      state.includeMissedOnce = el.includeMissedOnce.checked;
      refreshAvailableCount();
      if (el.includeMissedOnce.checked) {
        notifyWalkthroughAction("include-missed-on");
      }
    });
  }
  el.startQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    startQuiz();
    notifyWalkthroughAction("start-quiz");
  });
  el.changeWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    screen("week-screen");
  });
  el.submitAnswer.addEventListener("click", (event) => {
    event.preventDefault();
    submitAnswer();
  });
  el.dontKnowAnswer.addEventListener("click", (event) => {
    event.preventDefault();
    submitDontKnowAnswer();
  });
  el.trustedAiExplanation.addEventListener("click", (event) => {
    event.preventDefault();
    openTrustedAiExplanation();
  });
  el.previousQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    previousQuestion();
  });
  el.nextQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    nextQuestion();
  });
  el.flagQuestion.addEventListener("click", async (event) => {
    event.preventDefault();
    if (walkthroughGuardQuizAction(
      "flag-not-in-scope",
      "The walkthrough will let you use Not in Current Course Scope when it reaches that question."
    )) {
      return;
    }
    await flagCurrentQuestion();
    notifyWalkthroughAction("flag-not-in-scope");
  });
  el.ineffectiveQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughGuardQuizAction(
      "open-ineffective-dialog",
      "The walkthrough will let you use Ineffective Question when it reaches the joke question."
    )) {
      return;
    }
    openIneffectiveDialog();
    notifyWalkthroughAction("open-ineffective-dialog");
  });
  el.finishQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughGuardQuizAction("finish-quiz", "The walkthrough is not ready for Finish Quiz yet.")) {
      return;
    }
    finishQuiz();
    notifyWalkthroughAction("finish-quiz");
  });
  el.backSetupFromQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "explain-back-setup") {
      return;
    }
    showSetup();
  });
  el.copyReport.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "copy-report") {
      return;
    }
    copyReviewText();
  });
  el.downloadReport.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "download-report") {
      return;
    }
    saveReviewText();
  });
  el.printReport.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "print-report") {
      return;
    }
    printReviewText();
  });
  el.retakeIncorrect.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "retake-incorrect") {
      return;
    }
    retakeIncorrectOnly();
  });
  if (el.resetWrongCount) {
    el.resetWrongCount.addEventListener("click", (event) => {
      event.preventDefault();
      openResetWrongCountDialog();
    });
  }
  el.resetWrongCountConfig.addEventListener("click", (event) => {
    event.preventDefault();
    openResetWrongCountDialog();
  });
  el.backSetupFromReview.addEventListener("click", (event) => {
    event.preventDefault();
    if (walkthroughCurrentAction() === "review-back-demo") {
      showSetup();
      notifyWalkthroughAction("review-back-demo");
      return;
    }
    showSetup();
  });
  el.confirmResetWrongCount.addEventListener("click", (event) => {
    event.preventDefault();
    el.resetWrongCountDialog.close("yes");
    resetWrongQuestionCount();
  });
  el.cancelResetWrongCount.addEventListener("click", (event) => {
    event.preventDefault();
    el.resetWrongCountDialog.close("no");
  });
  el.submitIneffective.addEventListener("click", async (event) => {
    event.preventDefault();
    if (walkthroughGuardQuizAction(
      "submit-ineffective",
      "The walkthrough will let you submit ineffective-question feedback after it opens the dialog."
    )) {
      return;
    }
    const feedback = String(el.ineffectiveFeedback.value || "").trim();
    const validationError = validateFeedbackText(feedback);
    if (validationError) {
      alert(validationError);
      return;
    }
    el.ineffectiveDialog.close("submit");
    await applyIneffectiveFeedback(feedback);
    notifyWalkthroughAction("submit-ineffective");
  });
  el.cancelIneffective.addEventListener("click", (event) => {
    event.preventDefault();
    el.ineffectiveDialog.close("cancel");
    if (walkthroughCurrentAction() === "submit-ineffective") {
      jumpWalkthroughToAction(
        "open-ineffective-dialog",
        "Open the Ineffective Question Dialog",
        "The walkthrough needs that joke question to be reported, so canceling just rewinds you one step. Click Ineffective Question again, type a short note, and then submit it."
      );
    }
  });
  el.walkthroughClose.addEventListener("click", (event) => {
    event.preventDefault();
    closeWalkthrough();
  });
  el.walkthroughOverlay.addEventListener("click", (event) => {
    if (event.target === el.walkthroughOverlay || event.target === el.walkthroughBackdrop) {
      closeWalkthrough();
    }
  });
}

async function loadQuestionBanks() {
  const weekRows = [];
  const loadedWeeks = new Set();
  const config = activePracticeUnitConfig();
  const questionHeaders = ["difficulty", "question", "choice_a", "choice_b", "choice_c", "choice_d", "correct_choice"];
  for (const week of activeQuestionBankChoices()) {
    const path = activeQuestionBankURL(week);
    try {
      const rows = await loadCSV(path, questionHeaders);
      if (rows.length) loadedWeeks.add(week);
      rows.forEach((row) => {
        row.week = week;
      });
      weekRows.push(...rows);
    } catch {
      // Keep going; fallback below can handle missing weekly files.
    }
  }
  const sourceRows = weekRows;
  if (!sourceRows.length) {
    state.questionBank = [];
    state.availableWeeks = new Set([...activeTrackManualWeeks()]);
    state.weekAvailabilityReady = true;
    return;
  }
  const runtime = [];
  for (let i = 0; i < sourceRows.length; i += 1) {
    const row = sourceRows[i];
    const q = await hydrateRuntimeQuestion(row, i + 1);
    if (q.question && q.choice_a && q.choice_b && q.choice_c && q.choice_d) {
      runtime.push(q);
    }
  }
  state.questionBank = runtime;
  state.availableWeeks = new Set([...loadedWeeks, ...activeTrackManualWeeks()]);
  state.weekAvailabilityReady = true;
}

function loadLocalState() {
  const storedCourse = String(getJSONStorage(COURSE_STORAGE_KEY, NO_COURSE_ID) || NO_COURSE_ID);
  state.courseId = storedCourse === NO_COURSE_ID || COURSE_CATALOG.some((c) => c.id === storedCourse)
    ? storedCourse
    : NO_COURSE_ID;
  const storedCertification = String(
    getJSONStorage(CERTIFICATION_STORAGE_KEY, NO_CERTIFICATION_ID) || NO_CERTIFICATION_ID
  );
  state.certificationId = storedCertification === NO_CERTIFICATION_ID || CERTIFICATION_CATALOG.some((c) => c.id === storedCertification)
    ? storedCertification
    : NO_CERTIFICATION_ID;
  const storedTrackType = String(getJSONStorage(TRACK_TYPE_STORAGE_KEY, "course") || "course");
  state.activeTrackType = storedTrackType === "certification" && state.certificationId
    ? "certification"
    : "course";
  const storedConfig = getJSONStorage(CONFIG_STORAGE_KEY, {});
  const storedAmount = Number(storedConfig.amount);
  if (Number.isFinite(storedAmount) && storedAmount >= 1) state.amount = Math.max(1, Math.floor(storedAmount));
  state.skipPreviouslyCorrect = Boolean(storedConfig.skipPreviouslyCorrect);
  state.includeMissedOnce = Boolean(storedConfig.includeMissedOnce);
  state.localHistoryRows = getJSONStorage(HISTORY_STORAGE_KEY, []);
  state.localChangeRows = getJSONStorage(CHANGES_STORAGE_KEY, []);
  state.reports = getJSONStorage(REPORTS_STORAGE_KEY, []);
  state.overrides = getJSONStorage(OVERRIDES_STORAGE_KEY, { removedKeys: {}, difficultyOverrides: {} });
}

async function boot() {
  bindElements();
  syncMobileNotesLayoutClass();
  loadLocalState();
  installBrowserProgressDiagnostics();
  buildCourseOptions();
  buildCertificationOptions();
  applyCourseBranding();
  buildWeekControls();
  wireEvents();
  window.addEventListener("pageshow", () => {
    applyConfigStateToControls();
    refreshAvailableCount();
  });
  setAnswerControlsEnabled(false);
  updateLiveScore();
  try {
    setStartupStatus("Loading changelog and demo quiz...");
    await Promise.all([
      loadChangelog().catch((err) => {
        state.changelogLoadError = err?.message || "Unable to load changelog.";
      }),
      loadTourQuestionBank().catch(() => {
        state.tourQuestionBank = [];
      }),
    ]);
    state.questionBank = [];
    state.availableWeeks = new Set();
    state.weekAvailabilityReady = false;
    state.notesManifest = { roots: [], defaultNote: "" };
    state.notesFileMap = new Map();
    state.currentNotePath = "";
    state.notesLoadError = "";
    setNotesStatus("Choose a course or certification to load notes.");
    renderCourseChangelog();
    setStartupStatus("Choose a course or certification to load the workspace.");
    refreshAvailableCount();
    screen("course-screen");
    window.__NETC_QUIZ_APP_READY__ = true;
    showWalkthroughPrompt();
  } catch (err) {
    setStartupStatus(`Load failed: ${err?.message || "Unknown error"}`);
    if (el.startupStatus) {
      el.startupStatus.textContent = `Load failed: ${err?.message || "Unknown error"}. Refresh to retry.`;
    }
    window.__NETC_QUIZ_APP_READY__ = false;
    console.error(err);
  }
}

boot();
})();
