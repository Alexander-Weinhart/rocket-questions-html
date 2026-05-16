(() => {
if (window.__NETC_QUIZ_APP_BOOTED__) {
  window.__NETC_QUIZ_APP_SCRIPT__ = true;
    window.__NETC_QUIZ_APP_VERSION__ = "1.0.15";
  return;
}
window.__NETC_QUIZ_APP_BOOTED__ = true;

const WEEK_CHOICES = Array.from({ length: 15 }, (_, i) => i + 1);
const DOMAIN_CHOICES = Array.from({ length: 5 }, (_, i) => i + 1);
window.__NETC_QUIZ_APP_SCRIPT__ = true;
window.__NETC_QUIZ_APP_VERSION__ = "1.0.15";
window.__NETC_QUIZ_APP_READY__ = false;
const DEBUG_ROUTING = true; // Set to true to enable routing debug logs
const API_PORT = "3003";
const COURSE_STORAGE_KEY = "rocket_questions_selected_course";
const CERTIFICATION_STORAGE_KEY = "rocket_questions_selected_certification";
const TRACK_TYPE_STORAGE_KEY = "rocket_questions_active_track_type";
const HISTORY_STORAGE_KEY = window.__ROCKET_HISTORY_STORAGE_KEY__ || "rocket_questions_history_local";
const CHANGES_STORAGE_KEY = "rocket_questions_changes_local";
const OVERRIDES_STORAGE_KEY = "rocket_questions_overrides";
const REPORTS_STORAGE_KEY = "rocket_questions_reports";
const CONFIG_STORAGE_KEY = "rocket_questions_quiz_config";
const ACCESSIBILITY_STORAGE_KEY = "rocket_questions_accessibility";
const SESSION_STORAGE_KEY = "rocket_questions_session";
const KNOWN_TRACK_ROUTE_SLUGS = ["netc-121", "network-plus", "security-plus"];

// PostHog analytics helpers
const POSTHOG_DISTINCT_ID_KEY = "rocket_questions_ph_distinct_id";
function phDistinctId() {
  let id = localStorage.getItem(POSTHOG_DISTINCT_ID_KEY);
  if (!id) {
    id = "anon_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(POSTHOG_DISTINCT_ID_KEY, id);
  }
  return id;
}
function phCapture(event, properties) {
  try {
    if (typeof window.posthog === "undefined" || !window.posthog.capture) return;
    window.posthog.capture(event, properties || {});
  } catch (_) {
    // Never let analytics errors affect the quiz.
  }
}

function detectAppBasePath(pathname = window.location.pathname) {
  const normalized = String(pathname || "/").split(/[?#]/, 1)[0];
  let segments = normalized.split("/").filter(Boolean);
  if (segments.length > 0 && segments[segments.length - 1].endsWith(".html")) {
    segments = segments.slice(0, -1);
  }
  const courseContentRouteIndex = segments.findIndex((segment, index) => (
    segment === "courses" && segments[index + 2] === "practice-quiz"
  ));
  if (courseContentRouteIndex !== -1) {
    const baseSegments = segments.slice(0, courseContentRouteIndex);
    return `/${baseSegments.length ? `${baseSegments.join("/")}/` : ""}`;
  }
  const trackIndex = segments.findIndex((segment) => KNOWN_TRACK_ROUTE_SLUGS.includes(segment));
  const baseSegments = trackIndex === -1 ? segments : segments.slice(0, trackIndex);
  return `/${baseSegments.length ? `${baseSegments.join("/")}/` : ""}`;
}

const APP_BASE_PATH = detectAppBasePath();
const APP_VERSION_QUERY_KEY = "q";
const CHANGELOG_PATH = `${APP_BASE_PATH}changelog.md?q=${window.__NETC_QUIZ_APP_VERSION__}`;
const TOUR_QUESTION_BANK_PATH = `${APP_BASE_PATH}tour_question_bank.csv?q=${window.__NETC_QUIZ_APP_VERSION__}`;
const NOTE_ROUTE_MAP_PATH = `${APP_BASE_PATH}route-map.json?q=${window.__NETC_QUIZ_APP_VERSION__}`;
const NO_COURSE_ID = "";
const NO_CERTIFICATION_ID = "";
const COURSE_CATALOG = [
  {
    id: "netc121",
    routeSlug: "netc-121",
    browserTitle: "Rocket Questions",
    pageTitle: "Rocket Questions",
    insignia: "NETC-121",
    name: "Network Communications 1",
    subtitle: "May we all succeed or fail as a team.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
    contentRoot: "courses/NETC-121",
    manuallyAvailableWeeks: [11, 13],
    questionBankChoices: Array.from({ length: 15 }, (_, i) => i + 1),
    pbqs: [
      {
        id: "classful-ip-addressing",
        title: "Classful IP Addressing",
        description: "Work a random class A-C address on one screen: identify its class, network address, broadcast address, first host, and last host with built-in calculator and scratch paper.",
        path: "classful-ip-addressing/index.html",
      },
      {
        id: "classless-ip-subnetting",
        title: "Classless IP Subnetting",
        description: "Given an IP address and subnet mask, convert the mask to binary, identify the CIDR, and calculate the network, broadcast, first host, and last host using the built-in calculator and scratch paper.",
        path: "classless-ip-subnetting/index.html",
      },
    ],
  },
];
const CERTIFICATION_CATALOG = [
  {
    id: "comptia-network-plus-n10-009",
    routeSlug: "network-plus",
    browserTitle: "Rocket Questions",
    pageTitle: "Rocket Questions",
    insignia: "N10-009",
    name: "The CompTIA N10-009 Network+ Certification",
    subtitle: "Study the objectives, then make the objectives regret meeting you.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
    contentRoot: "courses/Network+",
    questionBankChoices: [1],
    pbqs: [
      {
        id: "port-number-matching",
        title: "Port Number Matching",
        description: "Drag every port from Alex's 1.4.2 Common Ports notes beside the correct protocol, then submit for a practice-quiz-style review report.",
        path: "port-number-matching/index.html",
      },
      {
        id: "classful-ip-addressing",
        title: "Classful IP Addressing",
        description: "Work a random class A-C address on one screen: identify its class, network address, broadcast address, first host, and last host with built-in calculator and scratch paper.",
        path: "../../NETC-121/pbqs/classful-ip-addressing/index.html",
      },
      {
        id: "classless-ip-subnetting",
        title: "Classless IP Subnetting",
        description: "Given an IP address and subnet mask, convert the mask to binary, identify the CIDR, and calculate the network, broadcast, first host, and last host using the built-in calculator and scratch paper.",
        path: "../../NETC-121/pbqs/classless-ip-subnetting/index.html",
      },
    ],
    practiceUnit: {
      singular: "Domain",
      plural: "Domains",
      choices: DOMAIN_CHOICES,
      filenamePrefix: "domain",
      comingSoonChoices: new Set(DOMAIN_CHOICES.filter((choice) => choice !== 1)),
      labelForChoice: (choice) => `Domain ${choice}`,
    },
  },
  {
    id: "comptia-security-plus-sy0-701",
    routeSlug: "security-plus",
    browserTitle: "Rocket Questions",
    pageTitle: "Rocket Questions",
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
      comingSoonChoices: new Set(DOMAIN_CHOICES.filter((choice) => choice !== 1)),
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
  1: 1, 2: 1, 3: 1,
  4: 2, 5: 2, 6: 2, 7: 2, 8: 2, 9: 2, 10: 2, 11: 2,
  12: 3, 13: 3, 14: 3,
  15: 4, 16: 4, 17: 4, 18: 4, 19: 4,
  20: 5, 21: 5, 22: 5, 23: 5, 24: 5,
  25: 6, 26: 6, 27: 6,
  28: 7, 29: 7, 30: 7, 31: 7,
  32: 8, 33: 8, 34: 8, 35: 8,
  36: 9, 37: 9,
  38: 10, 39: 10,
  40: 11, 41: 11,
  42: 12, 43: 12,
  44: 13, 45: 13,
  46: 14,
};
const VIDEO_TITLE_MAP = {
  1: "TWISTED: The dramatic history of twisted-pair Ethernet",
  2: "Windows CLI",
  3: "Mac CLI",
  4: "What is OSI Model?",
  5: "What is a MAC Address?",
  6: "Traceroute (tracert) Explained - Network Troubleshooting",
  7: "ARP Explained - Address Resolution Protocol",
  8: "what is an IP Address? You SUCK at Subnetting EP 1",
  9: "IP Address - IPv4 vs IPv6 Tutorial",
  10: "Subnet Mask - Explained",
  11: "MASTER the OSI Model in Just 5 Minutes! BEST EXPLANATION WITH ANIMATION",
  12: "Unicast, Multicast, and Broadcast - CompTIA Network+ N10-006 - 1.8",
  13: "Ethernet Frame Format Explanation",
  14: "CSMA-CD and CSMA-CA Explained",
  15: "DHCP Explained - Dynamic Host Configuration Protocol",
  16: "What is TCP-IP?",
  17: "Wireshark Tutorial - Installation and Password sniffing",
  18: "Network Ports Explained",
  19: "How to Take Notes - Study Tips - Cornell Notes",
  20: "Subnetting and IP",
  21: "Subnetting and Binary Math",
  22: "CIDR & Subnet Mask",
  23: "Certificate",
  24: "DNS-DHCP",
  25: "Telnet vs SSH Explained",
  26: "How to Factory Reset Cisco Switch",
  27: "Classless subnetting",
  28: "Why Do Computers Use 1s and 0s? Binary and Transistors Explained.",
  29: "Representing Numbers and Letters with Binary Crash Course Computer Science 4",
  30: "How to Convert Binary to Decimal",
  31: "SolarWinds TFTP Server",
  32: "VLAN Explained",
  33: "What is Trunking in Networking?",
  34: "SSH setup Packet Tracer",
  35: "Rack and Patch panel overview",
  36: "Spanning Tree Protocol Explained | Step by Step",
  37: "MicroNugget: Spanning Tree Protocol Explained | CBT Nuggets",
  38: "Routing Tables | CCNA - Explained",
  39: "Packet Traveling - How Packets Move Through a Network",
  40: "CCNA Routing Fundamentals - Part 1",
  41: "EGP / IGP :: Distance Vector / Link State :: Dynamic Routing Protocols :: OSPF EIGRP BGP RIP IS-IS",
  42: "Quick route summarization",
  43: "Router Hierarchies and Route Summarization - Networking Fundamentals - Lesson 5 - Part 3",
  44: "Layer 2 vs Layer 3 Switches - Animated",
  45: "What is Route Redistribution?",
  46: "Free CCNA | Wireless Fundamentals | Day 55 | CCNA 200-301 Complete Course",
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
const PAGE_ROUTES = {
  "course-screen": "/",
};
const NOTE_ROUTE_PATTERN = /^\/([^/]+)\/notes\/(.+)\.html$/;
const TRACK_SCREEN_ROUTE_PATTERN = /^\/([^/]+)(?:\/(notes|pbqs|practice\/weeks|practice\/setup|practice\/quiz|practice\/review))?$/;

function withAppBase(path) {
  const normalized = String(path || "/").startsWith("/") ? String(path || "/") : `/${path || ""}`;
  if (APP_BASE_PATH === "/") return normalized;
  const base = APP_BASE_PATH.replace(/\/$/, "");
  if (normalized === base || normalized.startsWith(`${base}/`)) return normalized;
  return `${base}${normalized}`;
}

function withoutAppBase(path) {
  const normalized = normalizeRoutePath(path);
  if (APP_BASE_PATH === "/") return normalized;
  const base = APP_BASE_PATH.replace(/\/$/, "");
  if (normalized === base) return "/";
  if (normalized.startsWith(`${base}/`)) return normalized.slice(base.length) || "/";
  return normalized;
}

function trackRouteIdForState() {
  return String(activeTrack()?.routeSlug || "").trim();
}

function findTrackSelectionByRouteId(trackId) {
  const normalized = String(trackId || "").trim();
  const course = COURSE_CATALOG.find((entry) => entry.routeSlug === normalized || entry.id === normalized);
  if (course) {
    return { activeTrackType: "course", courseId: course.id, certificationId: NO_CERTIFICATION_ID };
  }
  const certification = CERTIFICATION_CATALOG.find((entry) => entry.routeSlug === normalized || entry.id === normalized);
  if (certification) {
    return { activeTrackType: "certification", courseId: state.courseId || COURSE_CATALOG[0]?.id || NO_COURSE_ID, certificationId: certification.id };
  }
  return null;
}

function applyTrackSelection(selection) {
  if (!selection) return;
  state.activeTrackType = selection.activeTrackType;
  state.courseId = selection.courseId;
  state.certificationId = selection.certificationId;
  setJSONStorage(TRACK_TYPE_STORAGE_KEY, state.activeTrackType);
  setJSONStorage(COURSE_STORAGE_KEY, state.courseId || NO_COURSE_ID);
  setJSONStorage(CERTIFICATION_STORAGE_KEY, state.certificationId || NO_CERTIFICATION_ID);
}

function buildNoteRoutePath(trackId, relativePath) {
  const notePath = normalizeNotePath(relativePath);
  const slugRoute = state.noteRouteTokensByPath.get(String(trackId || ""))?.get(notePath);
  if (!trackId || !notePath || !slugRoute) return withAppBase(`/${trackId || ""}/notes`);
  return withAppBase(`/${trackId}/notes/${slugRoute}.html`);
}

function parseAppRoute(path) {
  const normalized = withoutAppBase(path);
  const coursePracticeMatch = normalized.match(/^\/courses\/([^/]+)\/practice-quiz\/(live|results)$/);
  if (coursePracticeMatch) {
    const contentRoot = `courses/${decodeURIComponent(coursePracticeMatch[1])}`;
    const track = [...COURSE_CATALOG, ...CERTIFICATION_CATALOG].find((entry) => entry.contentRoot === contentRoot);
    if (track) {
      return {
        screenId: coursePracticeMatch[2] === "live" ? "quiz-screen" : "review-screen",
        trackId: track.routeSlug,
        noteToken: "",
        notePath: "",
      };
    }
  }
  const noteMatch = normalized.match(NOTE_ROUTE_PATTERN);
  if (noteMatch) {
    return {
      screenId: "notes-screen",
      trackId: noteMatch[1],
      noteToken: noteMatch[2],
      notePath: state.noteRoutePathsByToken.get(noteMatch[1])?.get(noteMatch[2]) || "",
    };
  }
  const trackMatch = normalized.match(TRACK_SCREEN_ROUTE_PATTERN);
  if (trackMatch) {
    const section = trackMatch[2] || "";
    const screenId = {
      "": "menu-screen",
      notes: "notes-screen",
      pbqs: "pbq-screen",
      "practice/weeks": "week-screen",
      "practice/setup": "config-screen",
      "practice/quiz": "quiz-screen",
      "practice/review": "review-screen",
    }[section] || "course-screen";
    return {
      screenId,
      trackId: trackMatch[1],
      noteToken: "",
      notePath: "",
    };
  }
  return {
    screenId: PAGE_ROUTES[normalized] || "course-screen",
    trackId: "",
    noteToken: "",
    notePath: "",
  };
}
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
  gradingMode: "regular",
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
  lastGradingModeFinished: "regular",
  currentLocked: false,
  currentSelectedAnswer: "",
  currentOptionMap: {},
  examNavOpen: false,
  localHistoryRows: [],
  localChangeRows: [],
  reports: [],
  overrides: { removedKeys: {}, difficultyOverrides: {} },
  currentScreenId: "course-screen",
  pendingRoutePath: "",
  routeReady: false,
  notesSidebarOpen: true,
  notesManifest: null,
  notesFileMap: new Map(),
  noteRouteTokensByPath: new Map(),
  noteRoutePathsByToken: new Map(),
  currentNotePath: "",
  notesVideoPlayer: null,
  notesVideoControlsTimer: null,
  notesVideoTranscriptPath: "",
  notesVideoCaptions: [],
  notesVideoActiveCaption: null,
  hardOfHearingEnabled: false,
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
let noteRouteMapReloadPromise = null;
let resultsConfettiHideTimer = null;
const RESULTS_CONFETTI_COLORS = ["#44cfaa", "#ff735c", "#f5d76e", "#7dcfff", "#f58fb0", "#9fefc2"];
const RESULTS_CONFETTI_SHAPES = ["shape-square", "shape-ribbon", "shape-circle", "shape-diamond", "shape-triangle"];
const RESULTS_CONFETTI_BURST_MS = 3000;
const RESULTS_CONFETTI_MAX_FALL_MS = 5200;
const RESULTS_CONFETTI_CLEAR_BUFFER_MS = 220;

function buildReviewConfetti() {
  if (!el.resultsConfetti) return 0;
  el.resultsConfetti.replaceChildren();
  let latestFinishMs = 0;
  for (let index = 0; index < 96; index += 1) {
    const piece = document.createElement("span");
    piece.className = "results-confetti-piece";
    piece.style.setProperty("--x", String(3 + ((index * 11) % 94)));
    piece.style.setProperty("--drift-start", String(((index % 6) - 2.5) * 1.8));
    piece.style.setProperty("--drift-end", String((((index * 5) % 11) - 5) * 1.9));
    const fallDurationMs = 3800 + (index % 6) * 280;
    const delayMs = Math.round((index / 95) * RESULTS_CONFETTI_BURST_MS);
    piece.style.setProperty("--fall-duration", `${fallDurationMs}ms`);
    piece.style.setProperty("--delay", `${delayMs}ms`);
    latestFinishMs = Math.max(latestFinishMs, delayMs + fallDurationMs);

    const shape = document.createElement("span");
    shape.className = `results-confetti-shape ${RESULTS_CONFETTI_SHAPES[index % RESULTS_CONFETTI_SHAPES.length]}`;
    shape.style.setProperty("--piece-color", RESULTS_CONFETTI_COLORS[index % RESULTS_CONFETTI_COLORS.length]);
    shape.style.setProperty("--size", `${8 + (index % 5) * 2}px`);
    shape.style.setProperty("--stretch", `${1 + ((index + 2) % 4) * 0.28}`);
    shape.style.setProperty("--spin-duration", `${1700 + (index % 5) * 260}ms`);
    shape.style.setProperty("--spin-delay", `${delayMs}ms`);
    shape.style.setProperty("--turn-direction", index % 2 === 0 ? "1" : "-1");

    piece.appendChild(shape);
    el.resultsConfetti.appendChild(piece);
  }
  return Math.max(latestFinishMs, RESULTS_CONFETTI_BURST_MS + RESULTS_CONFETTI_MAX_FALL_MS);
}

function shouldShowReviewConfetti(details = currentScoreDetails()) {
  if (!details || details.answered <= 0) return false;
  const confettiPercent = Number(details.quizConfig?.confettiPercent);
  if (Number.isFinite(confettiPercent)) {
    return details.percent >= confettiPercent;
  }
  return Boolean(details.passed);
}

function hideReviewConfetti() {
  if (resultsConfettiHideTimer) {
    window.clearTimeout(resultsConfettiHideTimer);
    resultsConfettiHideTimer = null;
  }
  if (!el.resultsConfetti) return;
  el.resultsConfetti.classList.remove("active");
  el.resultsConfetti.classList.add("hidden");
  el.resultsConfetti.replaceChildren();
}

function syncReviewConfetti(details = currentScoreDetails()) {
  if (!el.resultsConfetti) return;
  if (!shouldShowReviewConfetti(details)) {
    hideReviewConfetti();
    return;
  }
  const totalRunMs = buildReviewConfetti();
  el.resultsConfetti.classList.remove("active");
  el.resultsConfetti.classList.remove("hidden");
  void el.resultsConfetti.offsetWidth;
  el.resultsConfetti.classList.add("active");
  if (resultsConfettiHideTimer) {
    window.clearTimeout(resultsConfettiHideTimer);
  }
  resultsConfettiHideTimer = window.setTimeout(() => {
    hideReviewConfetti();
  }, totalRunMs + RESULTS_CONFETTI_CLEAR_BUFFER_MS);
}

window.__ROCKET_TEST__ = Object.assign(window.__ROCKET_TEST__ || {}, {
  getCurrentQuestionCorrectChoice() {
    const row = state.questions[state.currentIndex];
    const correct = String(row?.correct_choice || "").toUpperCase();
    return ["A", "B", "C", "D"].find((slot) => row?._sessionOptionMap?.[slot]?.original === correct) || correct;
  },
});

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

window.__ROCKET_DEBUG__ = Object.assign(window.__ROCKET_DEBUG__ || {}, {
  getTrackSnapshot() {
    const track = activeTrack();
    return {
      activeTrackType: state.activeTrackType,
      courseId: state.courseId,
      certificationId: state.certificationId,
      trackId: track?.id || "",
      trackName: track?.name || "",
      pbqs: Array.isArray(track?.pbqs) ? track.pbqs.map((pbq) => ({ ...pbq })) : [],
    };
  },
});

function setNoteRouteMap(rawMap) {
  state.noteRouteTokensByPath = new Map();
  state.noteRoutePathsByToken = new Map();
  Object.entries(rawMap || {}).forEach(([trackId, tokenMap]) => {
    if (!tokenMap || typeof tokenMap !== "object") return;
    const pathToToken = new Map();
    const tokenToPath = new Map();
    Object.entries(tokenMap).forEach(([token, notePath]) => {
      const normalized = normalizeNotePath(notePath);
      if (!token || !normalized) return;
      pathToToken.set(normalized, token);
      tokenToPath.set(token, normalized);
    });
    state.noteRouteTokensByPath.set(trackId, pathToToken);
    state.noteRoutePathsByToken.set(trackId, tokenToPath);
  });
}

async function reloadNoteRouteMap() {
  if (noteRouteMapReloadPromise) return noteRouteMapReloadPromise;
  noteRouteMapReloadPromise = (async () => {
    try {
      const res = await fetch(NOTE_ROUTE_MAP_PATH, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Could not load note route map (${res.status}).`);
      setNoteRouteMap(await res.json());
    } catch (_) {
      setNoteRouteMap({});
    } finally {
      noteRouteMapReloadPromise = null;
    }
  })();
  return noteRouteMapReloadPromise;
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

function activeQuizConfig() {
  const config = window.ROCKET_QUIZ_CONFIGS || {};
  return config[activeTrack().id] || config.netc121 || {
    gradingModes: [{ id: "regular", label: "Regular", showPassFail: false, useCompTIAWeightedScoring: false }],
    defaultGradingMode: "regular",
  };
}

function activeGradingModeConfig() {
  const quizConfig = activeQuizConfig();
  const modes = Array.isArray(quizConfig.gradingModes) && quizConfig.gradingModes.length
    ? quizConfig.gradingModes
    : [{ id: "regular", label: "Regular", showPassFail: false, useCompTIAWeightedScoring: false }];
  return modes.find((mode) => mode.id === state.gradingMode) || modes[0];
}

function isExamMode() {
  return Boolean(activeGradingModeConfig().isExamMode);
}

function questionCountLabelText() {
  const examCount = Math.max(1, Number(activeQuizConfig().exam?.questionCount || 0));
  return examCount
    ? `Questions (there are ${examCount} on the exam)`
    : "Questions";
}

function updateQuestionCountLabel() {
  if (!el.questionCountLabel) return;
  el.questionCountLabel.textContent = questionCountLabelText();
}

function setDefaultGradingModeForTrack() {
  const quizConfig = activeQuizConfig();
  const modes = Array.isArray(quizConfig.gradingModes) ? quizConfig.gradingModes : [];
  const currentModeStillValid = modes.some((mode) => mode.id === state.gradingMode);
  if (!currentModeStillValid) {
    state.gradingMode = quizConfig.defaultGradingMode || modes[0]?.id || "regular";
  }
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
  return withAppBase(`/${clean}?q=${encodeURIComponent(window.__NETC_QUIZ_APP_VERSION__)}`);
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
  return `<a href="https://rocketquestions.com" class="app-title-link"><span class="brand-inline"><img class="brand-inline-icon" src="${withAppBase(`/rocket_icon.png?q=${window.__NETC_QUIZ_APP_VERSION__}`)}" alt="" aria-hidden="true"><span>${escapeHTML(text)}</span></span></a>`;
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
  syncNotesMenuToggle();
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
  return state.currentScreenId || document.querySelector(".screen:not(.hidden)")?.id || "course-screen";
}

function normalizeRoutePath(path) {
  const input = String(path || "/").trim() || "/";
  const withoutOrigin = input.replace(/^[a-z]+:\/\/[^/]+/i, "");
  const clean = withoutOrigin.split(/[?#]/, 1)[0] || "/";
  const collapsed = clean.startsWith("/") ? clean.replace(/\/{2,}/g, "/") : `/${clean.replace(/\/{2,}/g, "/")}`;
  if (collapsed.length > 1 && collapsed.endsWith("/")) return collapsed.slice(0, -1);
  return collapsed || "/";
}

function versionedURLForBrowser(path) {
  const normalizedPath = normalizeRoutePath(path);
  const url = new URL(normalizedPath, window.location.origin);
  url.searchParams.set(APP_VERSION_QUERY_KEY, window.__NETC_QUIZ_APP_VERSION__);
  return `${url.pathname}${url.search}${url.hash}`;
}

function ensureVersionQueryInAddressBar() {
  const targetURL = versionedURLForBrowser(window.location.pathname);
  const currentURL = `${normalizeRoutePath(window.location.pathname)}${window.location.search}`;
  if (currentURL === targetURL) return;
  window.history.replaceState({}, "", targetURL);
}

function routePathForScreen(screenId) {
  const trackSlug = trackRouteIdForState();
  if (screenId === "notes-screen" && state.currentNotePath && trackRouteIdForState()) {
    return buildNoteRoutePath(trackRouteIdForState(), state.currentNotePath);
  }
  if (trackSlug) {
    const track = activeTrack();
    if (track.contentRoot === "courses/Network+") {
      const contentRoutes = {
        "quiz-screen": withAppBase("/courses/Network+/practice-quiz/live"),
        "review-screen": withAppBase("/courses/Network+/practice-quiz/results"),
      };
      if (contentRoutes[screenId]) return contentRoutes[screenId];
    }
    const trackRoutes = {
      "menu-screen": withAppBase(`/${trackSlug}`),
      "notes-screen": withAppBase(`/${trackSlug}/notes`),
      "pbq-screen": withAppBase(`/${trackSlug}/pbqs`),
      "week-screen": withAppBase(`/${trackSlug}/practice/weeks`),
      "config-screen": withAppBase(`/${trackSlug}/practice/setup`),
      "quiz-screen": withAppBase(`/${trackSlug}/practice/quiz`),
      "review-screen": withAppBase(`/${trackSlug}/practice/review`),
    };
    if (trackRoutes[screenId]) return trackRoutes[screenId];
  }
  return withAppBase(PAGE_ROUTES[screenId] || PAGE_ROUTES["course-screen"]);
}

function screenIdForRoutePath(path) {
  return parseAppRoute(path).screenId;
}

function screenNeedsWorkspace(screenId) {
  return screenId !== "course-screen";
}

function screenNeedsQuizSession(screenId) {
  return screenId === "quiz-screen" || screenId === "review-screen";
}

function hasSavedTrackSelection() {
  if (state.activeTrackType === "certification") return Boolean(state.certificationId);
  return Boolean(state.courseId);
}

function serializeSessionState() {
  return {
    currentScreenId: currentScreenId(),
    currentNotePath: state.currentNotePath,
    selectedWeeks: [...state.selectedWeeks],
    setupVisited: state.setupVisited,
    mode: state.mode,
    gradingMode: state.gradingMode,
    amount: state.amount,
    skipPreviouslyCorrect: state.skipPreviouslyCorrect,
    includeMissedOnce: state.includeMissedOnce,
    lastModeFinished: state.lastModeFinished,
    lastGradingModeFinished: state.lastGradingModeFinished,
    lastReportText: state.lastReportText,
    lastAutoReportName: state.lastAutoReportName,
    incorrectRecords: state.incorrectRecords,
    questions: state.questions,
    currentIndex: state.currentIndex,
    correctCount: state.correctCount,
    answeredCount: state.answeredCount,
    examNavOpen: state.examNavOpen,
  };
}

function saveSessionState() {
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(serializeSessionState()));
  } catch (_) {
    // Ignore session-storage quota or privacy-mode failures.
  }
}

function loadSessionState() {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (_) {
    return {};
  }
}

function restoreSessionState() {
  const stored = loadSessionState();
  const storedWeeks = Array.isArray(stored.selectedWeeks) ? stored.selectedWeeks.map(Number).filter(Number.isFinite) : [];
  if (storedWeeks.length) state.selectedWeeks = new Set(storedWeeks);
  if (typeof stored.currentNotePath === "string") state.currentNotePath = stored.currentNotePath;
  if (typeof stored.mode === "string" && stored.mode) state.mode = stored.mode;
  if (typeof stored.gradingMode === "string" && stored.gradingMode) state.gradingMode = stored.gradingMode;
  if (Number.isFinite(Number(stored.amount)) && Number(stored.amount) >= 1) state.amount = Math.floor(Number(stored.amount));
  state.setupVisited = Boolean(stored.setupVisited);
  state.skipPreviouslyCorrect = Boolean(stored.skipPreviouslyCorrect);
  state.includeMissedOnce = Boolean(stored.includeMissedOnce);
  state.lastModeFinished = typeof stored.lastModeFinished === "string" && stored.lastModeFinished ? stored.lastModeFinished : state.lastModeFinished;
  state.lastGradingModeFinished = typeof stored.lastGradingModeFinished === "string" && stored.lastGradingModeFinished ? stored.lastGradingModeFinished : state.lastGradingModeFinished;
  state.lastReportText = typeof stored.lastReportText === "string" ? stored.lastReportText : "";
  state.lastAutoReportName = typeof stored.lastAutoReportName === "string" ? stored.lastAutoReportName : "";
  state.incorrectRecords = Array.isArray(stored.incorrectRecords) ? stored.incorrectRecords : [];
  state.questions = Array.isArray(stored.questions) ? stored.questions : [];
  state.currentIndex = Number.isFinite(Number(stored.currentIndex)) ? Math.max(0, Math.floor(Number(stored.currentIndex))) : 0;
  state.correctCount = Number.isFinite(Number(stored.correctCount)) ? Math.max(0, Math.floor(Number(stored.correctCount))) : 0;
  state.answeredCount = Number.isFinite(Number(stored.answeredCount)) ? Math.max(0, Math.floor(Number(stored.answeredCount))) : 0;
  state.examNavOpen = Boolean(stored.examNavOpen);
}

function syncBrowserRoute(screenId, { replace = false } = {}) {
  const path = routePathForScreen(screenId);
  const targetURL = versionedURLForBrowser(path);
  if (
    `${normalizeRoutePath(window.location.pathname)}${window.location.search}` === targetURL &&
    state.routeReady
  ) {
    return;
  }
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({}, "", targetURL);
  if (DEBUG_ROUTING) {
    console.log(`[ROUTE] Screen changed to: ${screenId}, URL: ${targetURL}`);
  }
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
  syncNotesSidebarUI();
}

function syncNotesMenuToggle() {
  if (!el.toggleNotesSidebar) return;
  const canOpenMenu = true;
  const isOpen = currentScreenId() === "notes-screen" && state.notesSidebarOpen;
  el.toggleNotesSidebar.classList.toggle("hidden", !canOpenMenu);
  el.toggleNotesSidebar.setAttribute("aria-expanded", String(isOpen));
  el.toggleNotesSidebar.setAttribute("aria-label", isOpen ? "Close notes explorer" : "Open notes explorer");
}

function syncNotesSidebarUI() {
  const onNotesScreen = currentScreenId() === "notes-screen";
  const isMobile = isMobileNotesLayout();
  const shouldBeOpen = onNotesScreen && state.notesSidebarOpen;

  el.notesLayout?.classList.toggle("is-collapsed", onNotesScreen && !isMobile && !shouldBeOpen);
  el.notesSidebar?.classList.toggle("is-open", shouldBeOpen);
  el.notesSidebarBackdrop?.classList.toggle("hidden", !(onNotesScreen && isMobile && shouldBeOpen));
  syncNotesMenuToggle();
}

function screenLabel(screenId) {
  const labels = {
    "course-screen": "Course Selection",
    "menu-screen": "Workspace Menu",
    "pbq-screen": "PBQs",
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

function buildAccessibilityDefaults() {
  return {
    hardOfHearingEnabled: false,
  };
}

function loadAccessibilityPreferences() {
  const stored = getJSONStorage(ACCESSIBILITY_STORAGE_KEY, buildAccessibilityDefaults());
  const merged = {
    ...buildAccessibilityDefaults(),
    ...(stored && typeof stored === "object" ? stored : {}),
  };
  state.hardOfHearingEnabled = Boolean(merged.hardOfHearingEnabled);
}

function saveAccessibilityPreferences() {
  setJSONStorage(ACCESSIBILITY_STORAGE_KEY, {
    hardOfHearingEnabled: state.hardOfHearingEnabled,
  });
}

function syncAccessibilityUI() {
  if (el.hardOfHearingToggle) {
    el.hardOfHearingToggle.checked = state.hardOfHearingEnabled;
  }
  document.body.classList.toggle("hard-of-hearing-enabled", state.hardOfHearingEnabled);
}

function hardOfHearingToggleContainer() {
  return el.hardOfHearingToggle?.closest(".header-toggle") || null;
}

function shouldShowHardOfHearingToggle() {
  if (currentScreenId() !== "notes-screen") return false;
  const node = state.notesFileMap.get(state.currentNotePath);
  return isYouTubeVideoNoteNode(node);
}

function syncHardOfHearingToggleVisibility() {
  const container = hardOfHearingToggleContainer();
  if (!container) return;
  container.classList.toggle("hidden", !shouldShowHardOfHearingToggle());
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
  if (window.__ROCKET_DISABLE_CHANGE_SERVER_SYNC__) return false;
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
  return [String(path || "").trim()].filter(Boolean);
}

async function loadCSV(path, requiredHeaders = null) {
  const candidates = [...new Set(csvPathCandidates(path))];
  const failures = [];
  for (const candidate of candidates) {
    try {
      const res = await fetch(candidate, { cache: "no-store" });
      if (!res.ok) {
        failures.push(`${candidate} (${res.status})`);
        continue;
      }
      const rows = parseCSV(await res.text());
      if (requiredHeaders && rows.length) {
        const keys = Object.keys(rows[0]);
        const missing = requiredHeaders.filter((header) => !keys.includes(header));
        if (missing.length) {
          failures.push(`${candidate} (missing columns: ${missing.join(", ")})`);
          continue;
        }
      }
      return rows;
    } catch (err) {
      failures.push(`${candidate} (${err?.message || "fetch error"})`);
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

function statusLabelHTML(status) {
  if (!status) return "";
  const normalized = String(status).toLowerCase() === "pass" ? "pass" : "fail";
  return `<span class="score-status score-status-${normalized}">${normalized.toUpperCase()}</span>`;
}

function scaledScoreFromPercent(percent, quizConfig = activeQuizConfig()) {
  const scaled = quizConfig.scaledScore || {};
  const min = Number.isFinite(Number(scaled.min)) ? Number(scaled.min) : 100;
  const max = Number.isFinite(Number(scaled.max)) ? Number(scaled.max) : 900;
  const bounded = Math.max(0, Math.min(100, Number(percent) || 0));
  return Math.round(min + (bounded / 100) * (max - min));
}

function questionDomain(question) {
  const direct = Number(question?.domain ?? question?.week);
  if (Number.isFinite(direct) && direct > 0) return direct;
  const source = String(question?.source_path || question?.source || "");
  const match = source.match(/(?:domain|\/)([1-5])(?:[.\s_-]|$)/i);
  return match ? Number(match[1]) : null;
}

function normalizedWeightsForDomains(domains, quizConfig = activeQuizConfig()) {
  const rawWeights = quizConfig.domainWeights || {};
  const uniqueDomains = [...new Set(domains.map(Number).filter((domain) => Number.isFinite(domain) && domain > 0))];
  if (!uniqueDomains.length) return new Map();
  const rawTotal = uniqueDomains.reduce((sum, domain) => {
    const weight = Number(rawWeights[domain] ?? rawWeights[String(domain)] ?? 1);
    return sum + (Number.isFinite(weight) && weight > 0 ? weight : 1);
  }, 0);
  const weights = new Map();
  uniqueDomains.forEach((domain) => {
    const raw = Number(rawWeights[domain] ?? rawWeights[String(domain)] ?? 1);
    const safe = Number.isFinite(raw) && raw > 0 ? raw : 1;
    weights.set(domain, rawTotal > 0 ? safe / rawTotal : 1 / uniqueDomains.length);
  });
  return weights;
}

function calculateRegularPercent(answeredRows) {
  if (!answeredRows.length) return 0;
  const correct = answeredRows.filter((row) => row._sessionAnswer?.wasCorrect).length;
  return (correct / answeredRows.length) * 100;
}

function calculateWeightedPercent(answeredRows) {
  if (!answeredRows.length) return 0;
  const selectedDomains = [...state.selectedWeeks].map(Number).filter(Number.isFinite);
  const answeredDomains = [...new Set(answeredRows.map(questionDomain).filter(Boolean))];
  const domainsForLiveGrade = answeredDomains.length
    ? selectedDomains.filter((domain) => answeredDomains.includes(domain))
    : selectedDomains;
  const weights = normalizedWeightsForDomains(domainsForLiveGrade.length ? domainsForLiveGrade : answeredDomains);
  if (!weights.size) return calculateRegularPercent(answeredRows);
  let weightedPercent = 0;
  weights.forEach((weight, domain) => {
    const domainRows = answeredRows.filter((row) => questionDomain(row) === domain);
    const domainPercent = domainRows.length ? calculateRegularPercent(domainRows) : 0;
    weightedPercent += domainPercent * weight;
  });
  return weightedPercent;
}

function calculateExamPercent(answeredRows) {
  const quizConfig = activeQuizConfig();
  const examConfig = quizConfig.exam || {};
  const normalRows = state.questions.filter((row) => !row._isPBQ);
  const pbqRows = state.questions.filter((row) => row._isPBQ);
  const answeredNormalRows = answeredRows.filter((row) => !row._isPBQ);
  const answeredPbqRows = answeredRows.filter((row) => row._isPBQ);
  const normalWeight = Number(examConfig.normalQuestionWeightPercent ?? 80) / 100;
  const pbqWeight = Number(examConfig.pbqWeightPercent ?? 20) / 100;
  const normalPercent = normalRows.length ? calculateWeightedPercent(answeredNormalRows) : 0;
  const pbqPercent = pbqRows.length ? calculateRegularPercent(answeredPbqRows) : 0;
  if (!pbqRows.length) return normalPercent;
  return (normalPercent * normalWeight) + (pbqPercent * pbqWeight);
}

function currentScoreDetails() {
  const quizConfig = activeQuizConfig();
  const gradingMode = activeGradingModeConfig();
  const answeredRows = state.questions.filter((row) => row?._sessionAnswer);
  const correct = answeredRows.filter((row) => row._sessionAnswer?.wasCorrect).length;
  const percent = gradingMode.isExamMode
    ? calculateExamPercent(answeredRows)
    : gradingMode.useCompTIAWeightedScoring
    ? calculateWeightedPercent(answeredRows)
    : calculateRegularPercent(answeredRows);
  const scaledScore = scaledScoreFromPercent(percent, quizConfig);
  const passingScaled = Number(quizConfig.scaledScore?.passing);
  const passPercent = Number(quizConfig.passPercent);
  const passed = gradingMode.useCompTIAWeightedScoring && Number.isFinite(passingScaled)
    ? scaledScore >= passingScaled
    : Number.isFinite(passPercent) && percent >= passPercent;
  return {
    answered: answeredRows.length,
    correct,
    percent,
    letter: letterGrade(percent),
    scaledScore,
    passed,
    status: passed ? "PASS" : "FAIL",
    showPassFail: Boolean(gradingMode.showPassFail),
    showScaledScore: Boolean(gradingMode.useCompTIAWeightedScoring),
    gradingMode,
    quizConfig,
  };
}

function scoreSummaryHTML(details, { includeLabel = true } = {}) {
  const label = includeLabel ? "Live Score: " : "";
  const pieces = [
    `${label}${details.correct}/${details.answered} (${details.percent.toFixed(1)}%)`,
  ];
  if (details.showScaledScore) pieces.push(`CompTIA Score: ${details.scaledScore}`);
  if (details.showPassFail && details.answered > 0) pieces.push(statusLabelHTML(details.status));
  if (!details.showPassFail && !details.showScaledScore) pieces.push(`Letter: ${details.letter}`);
  return pieces.join(" | ");
}

function examProgressSummaryHTML() {
  const answered = state.questions.filter((row) => row?._sessionAnswer).length;
  const deferred = state.questions.filter((row) => row?._deferred && !row?._sessionAnswer).length;
  const unanswered = Math.max(0, state.questions.length - answered);
  return `Exam in progress: ${answered} answered | ${unanswered} unanswered | ${deferred} deferred. Score appears after Finish Quiz.`;
}

function reviewSummaryHTML(details) {
  const pieces = [
    `Answered: ${details.answered}`,
    `Correct: ${details.correct}`,
    `Score: ${details.percent.toFixed(2)}%`,
  ];
  if (details.showScaledScore) pieces.push(`CompTIA Score: ${details.scaledScore}`);
  if (details.showPassFail && details.answered > 0) pieces.push(statusLabelHTML(details.status));
  if (!details.showPassFail && !details.showScaledScore) pieces.push(`Letter: ${details.letter}`);
  return pieces.join(" | ");
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
    _isPBQ: Boolean(question?._isPBQ),
  };
  delete copy._sessionAnswer;
  delete copy._sessionOptionMap;
  delete copy._deferred;
  return copy;
}

function freshPBQSessionQuestion(pbq, index) {
  const choices = Array.isArray(pbq.choices) ? pbq.choices : [];
  return freshSessionQuestion({
    id: pbq.id || `pbq-${index + 1}`,
    question_key: pbq.id || `pbq-${index + 1}`,
    question: pbq.question || pbq.title || `PBQ${index + 1}`,
    choice_a: choices[0] || pbq.choice_a || "",
    choice_b: choices[1] || pbq.choice_b || "",
    choice_c: choices[2] || pbq.choice_c || "",
    choice_d: choices[3] || pbq.choice_d || "",
    correct_choice: String(pbq.correct_choice || "A").toUpperCase(),
    explanation: pbq.explanation || "",
    difficulty: "exam",
    week: Number(pbq.domain || pbq.week || 1),
    domain: Number(pbq.domain || pbq.week || 1),
    source_path: pbq.source_path || "courses/Network+/pbqs",
    preserve_choice_order: true,
    _isPBQ: true,
    _examLabel: pbq.title || `PBQ${index + 1}`,
  }, pbq.id || `pbq-${index + 1}`);
}

function buildExamQuestions() {
  const quizConfig = activeQuizConfig();
  const examConfig = quizConfig.exam || {};
  const defaultCount = Math.max(1, Number(examConfig.questionCount || 90));
  const normalCount = Math.max(1, Number(state.amount || defaultCount));
  const pbqCount = Math.max(0, Number(examConfig.pbqCount || 0));
  const normalPool = filterPoolByHistoryRules(filteredPoolByDifficulty(state.mode));
  const normalQuestions = sample(normalPool, Math.min(normalCount, normalPool.length))
    .map((q, index) => ({
      ...freshSessionQuestion(q),
      _examLabel: `Question ${index + 1}`,
    }));
  const configuredPbqs = Array.isArray(examConfig.pbqs) ? examConfig.pbqs : [];
  const pbqQuestions = configuredPbqs.slice(0, pbqCount).map(freshPBQSessionQuestion);
  const mixed = [];
  const firstPair = normalQuestions.splice(0, 2);
  mixed.push(...firstPair);
  pbqQuestions.forEach((pbq) => {
    mixed.push(pbq);
    mixed.push(...normalQuestions.splice(0, 2));
  });
  mixed.push(...normalQuestions);
  let questionNumber = 1;
  let pbqNumber = 1;
  mixed.forEach((row) => {
    if (row._isPBQ) {
      row._examLabel = `PBQ${pbqNumber}`;
      pbqNumber += 1;
    } else {
      row._examLabel = `Question ${questionNumber}`;
      questionNumber += 1;
    }
  });
  return mixed;
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
    gradingMode: state.gradingMode,
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

function screen(id, options = {}) {
  const { updateRoute = true, replaceRoute = false } = options;
  state.currentScreenId = id;
  ["course-screen", "menu-screen", "pbq-screen", "week-screen", "notes-screen", "config-screen", "quiz-screen", "review-screen"].forEach((sid) => {
    document.getElementById(sid).classList.toggle("hidden", sid !== id);
  });
  applyCourseBranding();
  syncHardOfHearingToggleVisibility();
  if (state.walkthroughPromptOpen && id !== "course-screen") {
    dismissWalkthroughPrompt();
  }
  if (id !== "notes-screen") {
    syncNotesSidebarUI();
  }
  if (id === "review-screen") {
    syncReviewConfetti();
  } else {
    hideReviewConfetti();
  }
  if (state.walkthroughActive) {
    window.requestAnimationFrame(() => {
      if (tourCurrentStep()?.screenId === currentScreenId()) {
        renderWalkthroughStep();
      }
    });
  }
  if (state.routeReady && updateRoute) {
    syncBrowserRoute(id, { replace: replaceRoute });
  }
  if (DEBUG_ROUTING) {
    console.log(`[ROUTE] Screen changed to: ${id}, Path: ${window.location.pathname}`);
  }
  saveSessionState();
  syncNotesMenuToggle();
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

function noteTranscriptPath(relativePath) {
  const normalized = normalizeNotePath(relativePath);
  if (!normalized || /(^|\/)Transcript\.md$/i.test(normalized)) return "";
  const lastSlash = normalized.lastIndexOf("/");
  if (lastSlash < 0) return "Transcript.md";
  return `${normalized.slice(0, lastSlash + 1)}Transcript.md`;
}

function parseTimestampToSeconds(rawValue) {
  const text = String(rawValue || "").trim();
  if (!text) return Number.NaN;
  const parts = text.split(":").map((part) => Number(part));
  if (parts.some((part) => !Number.isFinite(part))) return Number.NaN;
  if (parts.length === 2) {
    return (parts[0] * 60) + parts[1];
  }
  if (parts.length === 3) {
    return (parts[0] * 3600) + (parts[1] * 60) + parts[2];
  }
  return Number.NaN;
}

function parseTranscriptMarkdown(markdown) {
  const source = String(markdown || "");
  if (!source.trim()) return [];
  const normalized = source.replace(/\r\n/g, "\n");
  
  // Matches timestamps and captures optional same-line text.
  const headingPattern = /^[ \t]*(?:###[ \t]+|[-*][ \t]+)?(?:\[|\(|\*\*|`)?\s*(\d{1,2}:\d{2}(?::\d{2})?)(?:\s*(?:-|to)\s*(\d{1,2}:\d{2}(?::\d{2})?))?\s*(?:\]|\)|\*\*|`)?:?[ \t]*(.*?)?\s*$/gm;
  
  const matches = [...normalized.matchAll(headingPattern)];
  return matches.map((match, index) => {
    const start = parseTimestampToSeconds(match[1]);
    
    let text = (match[3] || "").trim();
    if (!text) {
      const contentStart = match.index + match[0].length + 1;
      const contentEnd = index + 1 < matches.length ? matches[index + 1].index : normalized.length;
      text = normalized.slice(contentStart, contentEnd).trim().replace(/\n/g, " ");
    }
      
    let end = index + 1 < matches.length 
      ? parseTimestampToSeconds(matches[index + 1][1]) 
      : parseTimestampToSeconds(match[2]);
      
    if (!Number.isFinite(end)) {
      end = start + 600;
    }
    
    const label = match[2] ? `${match[1]} - ${match[2]}` : match[1];
    
    return {
      start,
      end,
      text,
      label,
    };
  }).filter((cue) => Number.isFinite(cue.start) && Number.isFinite(cue.end) && cue.end > cue.start && cue.text);
}

function isShortFormTranscript(cues) {
  if (!cues || cues.length < 10) return false;
  let finiteDurationCues = 0;
  const totalDuration = cues.reduce((sum, cue) => {
    const duration = cue.end - cue.start;
    if (Number.isFinite(duration) && duration > 0) {
      finiteDurationCues++;
      return sum + duration;
    }
    return sum;
  }, 0);
  if (finiteDurationCues < 10) return false;
  const avgDuration = totalDuration / finiteDurationCues;
  return avgDuration < 15;
}

function findTranscriptCueAtTime(cues, seconds) {
  if (!Array.isArray(cues) || !Number.isFinite(seconds)) return null;
  return cues.find((cue) => seconds >= cue.start && seconds < cue.end) || null;
}

window.__ROCKET_NOTES_TEST_HOOKS__ = {
  noteTranscriptPath,
  parseTimestampToSeconds,
  parseTranscriptMarkdown,
  findTranscriptCueAtTime,
  formatPlayerClock,
};

function destroyNotesVideoPlayer() {
  if (state.notesVideoControlsTimer) {
    window.clearTimeout(state.notesVideoControlsTimer);
    state.notesVideoControlsTimer = null;
  }
  if (state.notesVideoPlayer && typeof state.notesVideoPlayer.destroy === "function") {
    try {
      state.notesVideoPlayer.destroy();
    } catch (_) {
      // Ignore teardown errors from stale embeds.
    }
  }
  state.notesVideoPlayer = null;
  state.notesVideoActiveCaption = null;
}

function setNotesVideoControlsVisibility(visible) {
  const playerRoot = el.notesViewer?.querySelector("[data-notes-video-player]");
  if (!playerRoot) return;
  playerRoot.setAttribute("data-notes-video-controls-visible", visible ? "true" : "false");
}

function hideNotesVideoControlsAfterDelay() {
  if (!state.notesVideoPlayer) return;
  const playerRoot = el.notesViewer?.querySelector("[data-notes-video-player]");
  if (playerRoot?.hasAttribute("data-notes-video-pristine")) return;
  window.clearTimeout(state.notesVideoControlsTimer);
  state.notesVideoControlsTimer = window.setTimeout(() => {
    if (state.notesVideoPlayer) setNotesVideoControlsVisibility(false);
  }, 4000);
}

function showNotesVideoControls({ keepVisible = false } = {}) {
  if (!state.notesVideoPlayer) return;
  const playerRoot = el.notesViewer?.querySelector("[data-notes-video-player]");
  if (playerRoot?.hasAttribute("data-notes-video-pristine")) return;
  window.clearTimeout(state.notesVideoControlsTimer);
  state.notesVideoControlsTimer = null;
  setNotesVideoControlsVisibility(true);
  if (!keepVisible) {
    hideNotesVideoControlsAfterDelay();
  }
}

function extractYouTubeURL(markdown) {
  if (!markdown) return "";
  const markdownLink = markdown.match(/\]\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^)\s]+|youtu\.be\/[^)\s]+))\)/i);
  if (markdownLink) return markdownLink[1];
  const bareUrl = markdown.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?[^\s)]+|youtu\.be\/[^\s)]+)/i);
  return bareUrl ? bareUrl[0] : "";
}

function extractYouTubeId(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./i, "");
    if (host === "youtu.be") {
      return parsed.pathname.replace(/^\/+/, "").split("/")[0] || "";
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v") || "";
      }
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0] === "embed" || parts[0] === "shorts") {
        return parts[1] || "";
      }
    }
  } catch (_) {
    return "";
  }
  return "";
}

function isVideoNoteNode(node) {
  const rawValue = node?.video ?? node?.Video;
  if (typeof rawValue === "string") return rawValue.trim().toLowerCase() === "true";
  return Boolean(rawValue);
}

function isYouTubeVideoNoteNode(node) {
  const rawValue = node?.youtubeVideo;
  if (typeof rawValue === "string") return rawValue.trim().toLowerCase() === "true";
  return Boolean(rawValue);
}

function noteVideoUrl(node, markdown) {
  const manifestUrl = typeof node?.videoUrl === "string" ? node.videoUrl : "";
  if (manifestUrl) return manifestUrl;
  return extractYouTubeURL(markdown);
}

function noteVideoId(node, markdown) {
  const manifestId = typeof node?.videoId === "string" ? node.videoId : "";
  if (manifestId) return manifestId;
  return extractYouTubeId(noteVideoUrl(node, markdown));
}

function buildNotesVideoPlayerMarkup(node, markdown) {
  if (!isYouTubeVideoNoteNode(node)) return "";
  const youtubeUrl = noteVideoUrl(node, markdown);
  const youtubeId = noteVideoId(node, markdown);
  if (!youtubeId) return "";
  const title = escapeHTML(String(node?.name || noteLabelFromPath(node?.path || "")).replace(/\.md$/i, ""));
  const embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtubeId)}?iv_load_policy=3&modestbranding=1&rel=0&playsinline=1`;
  return `
    <section class="notes-video-shell" data-notes-video-shell>
      <div class="notes-video-player" data-notes-video-player>
        <div class="plyr__video-embed notes-video-player-frame">
          <iframe
            src="${embedUrl}"
            data-notes-video-source="${escapeHTML(youtubeUrl)}"
            allowfullscreen
            allowtransparency
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerpolicy="strict-origin-when-cross-origin"
            title="${title}"
          ></iframe>
        </div>
      </div>
      <section class="notes-video-caption-panel hidden" data-notes-video-caption-panel aria-live="polite" aria-atomic="true">
        <p class="notes-video-caption-kicker">Live Captions</p>
        <p class="notes-video-caption-time" data-notes-video-caption-time>--:--</p>
        <p class="notes-video-caption-text" data-notes-video-caption-text>Captions will appear here while the video plays.</p>
      </section>
    </section>
  `;
}

function renderNoteContent(markdown, node) {
  const player = buildNotesVideoPlayerMarkup(node, markdown);
  return `${player}<div class="notes-markdown-body">${renderMarkdown(markdown)}</div>`;
}

function formatPlayerClock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const secs = wholeSeconds % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

function renderVideoCaptionState() {
  const panel = el.notesViewer?.querySelector("[data-notes-video-caption-panel]");
  const timeEl = el.notesViewer?.querySelector("[data-notes-video-caption-time]");
  const textEl = el.notesViewer?.querySelector("[data-notes-video-caption-text]");
  if (!panel || !timeEl || !textEl) return;
  const hasCaptions = state.hardOfHearingEnabled && state.notesVideoCaptions.length > 0;
  panel.classList.toggle("hidden", !hasCaptions);
  if (!hasCaptions) return;
  if (state.notesVideoActiveCaption) {
    timeEl.textContent = state.notesVideoActiveCaption.label;
    textEl.textContent = state.notesVideoActiveCaption.text;
    return;
  }
  timeEl.textContent = "--:--";
  textEl.textContent = "Captions will appear here while the video plays.";
}

function updateVideoCaptionForTime(seconds) {
  const cues = state.notesVideoCaptions;
  if (!Array.isArray(cues) || !cues.length || !Number.isFinite(seconds)) {
    state.notesVideoActiveCaption = null;
    renderVideoCaptionState();
    return;
  }

  const currentIndex = cues.findIndex((cue) => seconds >= cue.start && seconds < cue.end);
  if (currentIndex === -1) {
    state.notesVideoActiveCaption = null;
    renderVideoCaptionState();
    return;
  }

  if (isShortFormTranscript(cues)) {
    const firstCueIndex = currentIndex % 2 === 0 ? currentIndex : currentIndex - 1;
    const firstCue = cues[firstCueIndex];
    const secondCue = cues[firstCueIndex + 1];

    if (secondCue) {
      state.notesVideoActiveCaption = {
        start: firstCue.start,
        end: secondCue.end,
        text: `${firstCue.text} ${secondCue.text}`,
        label: `${firstCue.label} & ${secondCue.label}`,
      };
    } else {
      state.notesVideoActiveCaption = firstCue;
    }
  } else {
    state.notesVideoActiveCaption = cues[currentIndex];
  }
  renderVideoCaptionState();
}

async function loadNoteTranscript(relativePath) {
  const transcriptPath = noteTranscriptPath(relativePath);
  state.notesVideoTranscriptPath = transcriptPath;
  state.notesVideoCaptions = [];
  state.notesVideoActiveCaption = null;
  if (!transcriptPath) return;
  try {
    const res = await fetch(noteFetchURL(transcriptPath), { cache: "no-cache" });
    if (!res.ok) return;
    const markdown = await res.text();
    state.notesVideoCaptions = parseTranscriptMarkdown(markdown);
  } catch (_) {
    state.notesVideoCaptions = [];
  }
}

function initializeNotesVideoPlayer() {
  const playerRoot = el.notesViewer?.querySelector("[data-notes-video-player]");
  if (!playerRoot) return;
  playerRoot.setAttribute("data-notes-video-pristine", "true");
  setNotesVideoControlsVisibility(false);
  const insertNotesVideoBlankSpace = () => {
    const controls = playerRoot.querySelector(".plyr__controls");
    if (!controls) return;
    controls.querySelector(".plyr__blankspace")?.remove();
    const menu = controls.querySelector(".plyr__menu");
    if (!menu) return;
    const blank = document.createElement("div");
    blank.className = "plyr__blankspace";
    blank.setAttribute("aria-hidden", "true");
    menu.insertAdjacentElement("afterend", blank);
  };
  const placeFullscreenControl = () => {
    const controls = playerRoot.querySelector(".plyr__controls");
    const fullscreenButton = controls?.querySelector('[data-plyr="fullscreen"]');
    if (!fullscreenButton) return;
    let corner = playerRoot.querySelector(".plyr__corner-controls");
    if (!corner) {
      corner = document.createElement("div");
      corner.className = "plyr__corner-controls";
      playerRoot.appendChild(corner);
    }
    corner.replaceChildren(fullscreenButton);
  };
  const preserveNotesVideoProgressStyles = () => {
    const progress = playerRoot.querySelector(".plyr__progress");
    const range = progress?.querySelector('input[type="range"]');
    const overlayPlayButtons = playerRoot.querySelectorAll(".plyr__control--overlaid");
    if (progress) {
      progress.style.setProperty("--plyr-video-progress-buffered-background", "#0ff5");
      progress.style.setProperty("--plyr-video-range-track-background", "#0ff5");
      progress.style.setProperty("--plyr-range-fill-background", "#0ff5");
      progress.style.setProperty("background", "transparent", "important");
      progress.style.setProperty("background-color", "transparent", "important");
      progress.style.setProperty("color", "#0ff5", "important");
    }
    if (range) {
      range.style.setProperty("--plyr-range-track-background", "#0ff5");
      range.style.setProperty("--plyr-range-fill-background", "#0ff5");
      range.style.setProperty("background", "transparent", "important");
      range.style.setProperty("background-color", "transparent", "important");
      range.style.setProperty("color", "#0ff5", "important");
    }
    overlayPlayButtons.forEach((button) => {
      button.style.setProperty("align-items", "center", "important");
      button.style.setProperty("background", "#0a2a50", "important");
      button.style.setProperty("box-shadow", "0 16px 30px rgba(0, 0, 0, 0.38)", "important");
      button.style.setProperty("color", "#0ff", "important");
      button.style.setProperty("display", "inline-flex", "important");
      button.style.setProperty("height", "4.75rem", "important");
      button.style.setProperty("justify-content", "center", "important");
      button.style.setProperty("min-height", "4.75rem", "important");
      button.style.setProperty("min-width", "4.75rem", "important");
      button.style.setProperty("opacity", "1", "important");
      button.style.setProperty("padding", "0", "important");
      button.style.setProperty("transition", "none", "important");
      button.style.setProperty("transform", "translate(-50%, -50%)", "important");
      button.style.setProperty("width", "4.75rem", "important");
      button.querySelectorAll("svg, svg path, svg use").forEach((icon) => {
        icon.style.setProperty("color", "#0ff", "important");
        icon.style.setProperty("fill", "#0ff", "important");
        icon.style.setProperty("height", "2rem", "important");
        icon.style.setProperty("left", "0", "important");
        icon.style.setProperty("position", "static", "important");
        icon.style.setProperty("stroke", "#0ff", "important");
        icon.style.setProperty("transition", "none", "important");
        icon.style.setProperty("transform", "none", "important");
        icon.style.setProperty("width", "2rem", "important");
      });
    });
  };
  const setup = () => {
    if (!window.Plyr || !playerRoot.isConnected) return false;
    destroyNotesVideoPlayer();
    state.notesVideoPlayer = new window.Plyr(playerRoot, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "settings",
        "fullscreen",
      ],
      youtube: {
        noCookie: true,
        rel: 0,
        modestbranding: 1,
      },
      resetOnEnd: false,
    });
    const syncCaptionTime = () => {
      updateVideoCaptionForTime(Number(state.notesVideoPlayer?.currentTime));
    };
    const markNotesVideoStarted = () => {
      playerRoot.removeAttribute("data-notes-video-pristine");
      showNotesVideoControls();
    };
    state.notesVideoPlayer.on("ready", () => {
      insertNotesVideoBlankSpace();
      placeFullscreenControl();
      preserveNotesVideoProgressStyles();
      syncCaptionTime();
    });
    state.notesVideoPlayer.on("timeupdate", () => {
      preserveNotesVideoProgressStyles();
      syncCaptionTime();
    });
    state.notesVideoPlayer.on("seeked", () => {
      preserveNotesVideoProgressStyles();
      syncCaptionTime();
    });
    state.notesVideoPlayer.on("ended", syncCaptionTime);
    state.notesVideoPlayer.on("play", () => {
      preserveNotesVideoProgressStyles();
      markNotesVideoStarted();
      hideNotesVideoControlsAfterDelay();
    });
    state.notesVideoPlayer.on("pause", () => showNotesVideoControls({ keepVisible: true }));
    state.notesVideoPlayer.on("enterfullscreen", showNotesVideoControls);
    state.notesVideoPlayer.on("exitfullscreen", showNotesVideoControls);
    window.setTimeout(() => {
      insertNotesVideoBlankSpace();
      placeFullscreenControl();
      preserveNotesVideoProgressStyles();
    }, 0);
    window.setTimeout(() => {
      insertNotesVideoBlankSpace();
      placeFullscreenControl();
      preserveNotesVideoProgressStyles();
    }, 180);
    preserveNotesVideoProgressStyles();
    syncCaptionTime();
    hideNotesVideoControlsAfterDelay();
    return true;
  };
  if (setup()) return;
  window.setTimeout(setup, 120);
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

async function openNote(relativePath, options = {}) {
  const { updateRoute = true, replaceRoute = false } = options;
  const normalized = normalizeNotePath(relativePath);
  const node = state.notesFileMap.get(normalized);
  if (!node) return;
  destroyNotesVideoPlayer();
  state.notesVideoTranscriptPath = "";
  state.notesVideoCaptions = [];
  state.notesVideoActiveCaption = null;
  state.currentNotePath = normalized;
  updateNotesActiveFile();
  syncHardOfHearingToggleVisibility();
  if (updateRoute && currentScreenId() === "notes-screen") {
    syncBrowserRoute("notes-screen", { replace: replaceRoute });
  }
  saveSessionState();
  if (el.notesCurrentPath) el.notesCurrentPath.textContent = normalized;
  setNotesStatus(`Opening ${noteLabelFromPath(normalized)}...`);
  try {
    const res = await fetch(noteFetchURL(normalized), { cache: "no-cache" });
    if (!res.ok) {
      throw new Error(`Could not load note (${res.status}).`);
    }
    const markdown = await res.text();
    if (isYouTubeVideoNoteNode(node)) {
      await loadNoteTranscript(normalized);
      if (state.notesVideoCaptions.length === 0) {
        state.notesVideoCaptions = parseTranscriptMarkdown(markdown);
      }
    }
    el.notesViewer.innerHTML = renderNoteContent(markdown, node);
    renderVideoCaptionState();
    initializeNotesVideoPlayer();
    setNotesStatus(`${state.notesFileMap.size} markdown files ready.`);
    phCapture("note opened", {
      note_path: normalized,
      note_label: noteLabelFromPath(normalized),
      is_video_note: isYouTubeVideoNoteNode(node),
      track_id: activeTrack()?.routeSlug || "",
    });
    if (isMobileNotesLayout()) {
      closeNotesSidebar();
    }
  } catch (err) {
    destroyNotesVideoPlayer();
    el.notesViewer.innerHTML = `<div class="notes-empty-state"><h3>Unable to load note</h3><p>${escapeHTML(err?.message || "Unknown error")}</p></div>`;
    setNotesStatus("A notes file failed to load.");
  }
  syncHardOfHearingToggleVisibility();
  saveSessionState();
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
  state.notesSidebarOpen = true;
  syncNotesSidebarUI();
}

function closeNotesSidebar() {
  state.notesSidebarOpen = false;
  syncNotesSidebarUI();
}

async function toggleNotesSidebar() {
  if (!hasSavedTrackSelection()) return;
  if (currentScreenId() !== "notes-screen") {
    await showNotesScreen();
    openNotesSidebar();
    return;
  }
  if (state.notesSidebarOpen) {
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

async function showNotesScreen(options = {}) {
  screen("notes-screen", options);
  syncNotesSidebarUI();
  renderNotesTree();
  if (state.notesLoadError) {
    setNotesStatus("Run the notes sync script to populate the viewer.");
    return;
  }
  if (!state.currentNotePath && state.notesFileMap.size) {
    state.currentNotePath = state.notesFileMap.keys().next().value || "";
  }
  if (state.currentNotePath) {
    await openNote(state.currentNotePath, {
      updateRoute: options.updateRoute,
      replaceRoute: options.replaceRoute,
    });
  } else {
    setNotesStatus("No markdown notes were found.");
  }
  saveSessionState();
}

function syncConfigStateFromControls() {
  if (el.modeSelect) state.mode = el.modeSelect.value || state.mode;
  if (el.gradingModeSelect && !el.gradingModeField?.classList.contains("hidden")) {
    state.gradingMode = el.gradingModeSelect.value || state.gradingMode;
  }
  if (el.questionCount) {
    const n = Math.max(1, Number(el.questionCount.value || state.amount || 1));
    state.amount = n;
    el.questionCount.value = String(n);
  }
  if (el.skipCorrect) state.skipPreviouslyCorrect = el.skipCorrect.checked;
  if (el.includeMissedOnce) state.includeMissedOnce = el.includeMissedOnce.checked;
  saveQuizConfig();
  saveSessionState();
}

function applyConfigStateToControls() {
  if (el.modeSelect) {
    el.modeSelect.value = state.mode;
    if (state.mode === "easy") el.modeSelect.selectedIndex = 0;
  }
  renderGradingModeControls();
  if (el.questionCount) el.questionCount.value = String(state.amount);
  if (el.skipCorrect) el.skipCorrect.checked = state.skipPreviouslyCorrect;
  if (el.includeMissedOnce) el.includeMissedOnce.checked = state.includeMissedOnce;
}

function renderGradingModeControls() {
  if (!el.gradingModeSelect || !el.gradingModeField) return;
  setDefaultGradingModeForTrack();
  updateQuestionCountLabel();
  const quizConfig = activeQuizConfig();
  const modes = Array.isArray(quizConfig.gradingModes) ? quizConfig.gradingModes : [];
  el.gradingModeSelect.innerHTML = "";
  modes.forEach((mode) => {
    const option = document.createElement("option");
    option.value = mode.id;
    option.textContent = mode.label || mode.id;
    el.gradingModeSelect.appendChild(option);
  });
  const shouldShow = modes.length > 1 || activeGradingModeConfig().showPassFail;
  el.gradingModeField.classList.toggle("hidden", !shouldShow);
  el.gradingModeSelect.value = state.gradingMode;
  const examActive = isExamMode();
  const examCount = Number(activeQuizConfig().exam?.questionCount || 90);
  if (examActive && el.questionCount) {
    state.amount = Math.max(1, Number(state.amount || examCount));
    el.questionCount.value = String(state.amount);
  }
  if (el.questionCount) el.questionCount.disabled = false;
  if (el.questionCountUp) el.questionCountUp.disabled = false;
  if (el.questionCountDown) el.questionCountDown.disabled = false;
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
  const quizConfig = activeQuizConfig();
  const gradingModes = Array.isArray(quizConfig.gradingModes) ? quizConfig.gradingModes : [];
  const showGradingGuide = gradingModes.length > 1 || gradingModes.some((mode) => mode.showPassFail);
  const mode = state.mode;
  const modePool = filteredPoolByDifficulty(mode);
  const available = countAvailable(mode);
  const easyTotal = filteredPoolByDifficulty("easy").length;
  const mediumTotal = filteredPoolByDifficulty("medium").length;
  const hardTotal = filteredPoolByDifficulty("hard").length;
  const stats = historyStatsForPool(modePool);
  el.difficultyTotals.innerHTML = `
    <div class="quiz-config-summary${showGradingGuide ? " quiz-config-summary-with-grading" : ""}">
      <div class="difficulty-totals-card">
        <p class="difficulty-totals-title">Possible Questions by Difficulty</p>
        <table class="difficulty-totals-table">
          <thead>
            <tr>
              <th scope="col">Mode</th>
              <th scope="col">What It Includes</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Easy</th>
              <td>Beginner-friendly class fundamentals</td>
              <td>${easyTotal}</td>
            </tr>
            <tr>
              <th scope="row">Medium</th>
              <td>All in-scope class questions, including easy</td>
              <td>${mediumTotal}</td>
            </tr>
            <tr>
              <th scope="row">Hard</th>
              <td>Advanced expansion topics</td>
              <td>${hardTotal}</td>
            </tr>
          </tbody>
        </table>
      </div>
      ${showGradingGuide ? `
        <div class="difficulty-totals-card grading-guide-card">
          <p class="difficulty-totals-title">Grading Systems</p>
          <table class="difficulty-totals-table grading-guide-table">
            <thead>
              <tr>
                <th scope="col">Quiz Mode</th>
                <th scope="col">Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Regular Mode</th>
                <td>Each question is worth one point. The quiz shows your percentage and whether that percentage is a pass or fail.</td>
              </tr>
              <tr>
                <th scope="row">CompTIA Grading Mode</th>
                <td>The quiz still gives immediate feedback, but your score also uses CompTIA-style domain weighting and a 100-900 scaled score.</td>
              </tr>
              <tr>
                <th scope="row">Exam Mode</th>
                <td>The quiz saves your answers without grading them live. You can defer items, jump around the exam, and see your final weighted CompTIA-style score only after you finish.</td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ""}
    </div>
  `;
  const weeks = [...state.selectedWeeks].sort((a, b) => a - b);
  el.weekSummary.textContent = weeks.length
    ? `Selected ${config.plural}: ${weeks.join(", ")}`
    : `Selected ${config.plural}: none`;
  const descriptions = {
    easy: "Easy: Core fundamentals in the class for beginners.",
    medium: "Medium: All questions that have to do with the scope of the class.",
    hard: "Hard: Advanced expansion topics that expand on topics taught in class.",
  };
  let detailMarkup = `
    <div class="mode-desc-card">
      <p class="mode-desc-lead">${escapeHTML(descriptions[mode])}</p>
  `;
  if (state.skipPreviouslyCorrect) {
    detailMarkup += `
      <table class="mode-desc-table">
        <thead>
          <tr>
            <th scope="col">Metric</th>
            <th scope="col">Count</th>
            <th scope="col">Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Answered Already</th>
            <td>${stats.answeredEver}</td>
            <td>Questions already answered in browser save history</td>
          </tr>
          <tr>
            <th scope="row">Never Answered</th>
            <td>${stats.neverAnswered}</td>
            <td>Questions with no saved answer history yet</td>
          </tr>
          <tr>
            <th scope="row">Still Missed</th>
            <td>${stats.missedOnly}</td>
            <td>Questions that are still marked wrong in browser save history</td>
          </tr>
    `;
    if (state.includeMissedOnce) {
      detailMarkup += `
          <tr>
            <th scope="row">Previously Corrected</th>
            <td>${stats.missedThenCorrect}</td>
            <td>Questions missed before but answered correctly later</td>
          </tr>
      `;
    }
    detailMarkup += `
          <tr>
            <th scope="row">Quiz Draw Pool</th>
            <td>${available}</td>
            <td>Questions left after the active filters are applied</td>
          </tr>
        </tbody>
      </table>
    `;
  }
  detailMarkup += `</div>`;
  el.modeDesc.innerHTML = detailMarkup;
}

function updateFlagButtonState() {
  if (isExamMode()) {
    el.flagQuestion.disabled = true;
    el.ineffectiveQuestion.disabled = true;
    return;
  }
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
  if (isExamMode()) {
    el.liveScore.textContent = examProgressSummaryHTML();
    return;
  }
  if (state.answeredCount === 0) {
    const emptyDetails = currentScoreDetails();
    el.liveScore.innerHTML = scoreSummaryHTML(emptyDetails);
    return;
  }
  el.liveScore.innerHTML = scoreSummaryHTML(currentScoreDetails());
}

function setAnswerControlsEnabled(enabled) {
  const radios = [...document.querySelectorAll('input[name="answer"]')];
  radios.forEach((rb) => {
    rb.disabled = !enabled;
    if (!enabled) rb.checked = false;
  });
  el.submitAnswer.disabled = !enabled;
  el.dontKnowAnswer.disabled = !enabled;
  if (el.deferQuestion) el.deferQuestion.disabled = !enabled;
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

function handleAnswerSelectionChange(selected) {
  state.currentSelectedAnswer = selected;
  if (!isExamMode() || !state.questions.length) return;
  const row = state.questions[state.currentIndex];
  const saved = row?._sessionAnswer;
  if (!saved || saved.selected === selected) return;
  row._sessionAnswer = null;
  el.feedback.textContent = "";
  el.nextQuestion.disabled = true;
  updateTrustedAiButton(row);
  renderExamNavigation();
  updateLiveScore();
  saveSessionState();
}

function previousAnsweredQuestionIndex() {
  for (let idx = state.currentIndex - 1; idx >= 0; idx -= 1) {
    if (state.questions[idx]?._sessionAnswer) return idx;
  }
  return -1;
}

function updatePreviousQuestionButton() {
  if (!el.previousQuestion) return;
  el.previousQuestion.disabled = isExamMode() ? state.currentIndex <= 0 : previousAnsweredQuestionIndex() < 0;
}

function examItemStatus(row) {
  if (row?._sessionAnswer) return "answered";
  if (row?._deferred) return "deferred";
  return "unanswered";
}

function examItemLabel(row, index) {
  if (row?._examLabel) return row._examLabel;
  return row?._isPBQ ? `PBQ${index + 1}` : `Question ${index + 1}`;
}

function renderExamNavigation() {
  const examActive = isExamMode() && state.questions.length;
  if (el.examLayout) el.examLayout.classList.toggle("is-exam", Boolean(examActive));
  if (el.examNav) {
    el.examNav.classList.toggle("hidden", !examActive);
    el.examNav.classList.toggle("exam-nav-mobile-closed", examActive && !state.examNavOpen);
  }
  if (el.examNavToggle) {
    el.examNavToggle.classList.toggle("hidden", !examActive);
    el.examNavToggle.setAttribute("aria-expanded", state.examNavOpen ? "true" : "false");
  }
  if (!el.examNavList) return;
  el.examNavList.innerHTML = "";
  if (!examActive) return;
  state.questions.forEach((row, index) => {
    const status = examItemStatus(row);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `exam-nav-item${index === state.currentIndex ? " is-current" : ""}`;
    button.dataset.examIndex = String(index);
    button.innerHTML = `
      <span>${escapeHTML(examItemLabel(row, index))}</span>
      <span class="exam-nav-status exam-nav-status-${status}">${status === "deferred" ? "Deferred" : status === "answered" ? "Answered" : "Unanswered"}</span>
    `;
    button.addEventListener("click", () => {
      state.currentIndex = index;
      state.currentLocked = false;
      state.examNavOpen = false;
      renderCurrentQuestion();
      saveSessionState();
    });
    el.examNavList.appendChild(button);
  });
}

function updateTrustedAiButton(row) {
  if (!el.trustedAiExplanation) return;
  el.trustedAiExplanation.disabled = !row?._sessionAnswer;
}

function syncRenderedAnswerState(row) {
  const saved = row?._sessionAnswer || null;
  state.currentSelectedAnswer = saved?.selected || "";
  state.currentLocked = isExamMode() ? false : Boolean(saved);
  el.feedback.textContent = saved?.feedback || "";
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.checked = saved?.selected === rb.value;
    rb.disabled = isExamMode() ? false : Boolean(saved);
  });
  el.submitAnswer.disabled = isExamMode() ? false : Boolean(saved);
  el.submitAnswer.textContent = isExamMode() ? "Save Answer" : "Submit Answer";
  el.dontKnowAnswer.disabled = isExamMode() ? false : Boolean(saved);
  if (el.deferQuestion) {
    el.deferQuestion.classList.toggle("hidden", !isExamMode());
    el.deferQuestion.textContent = row?._deferred ? "Remove Defer" : "Defer";
    el.deferQuestion.disabled = false;
  }
  el.nextQuestion.disabled = isExamMode() ? state.currentIndex >= state.questions.length - 1 : !saved;
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
  const gradingLabel = activeGradingModeConfig().label || "Regular";
  const itemLabel = row._isPBQ ? (row._examLabel || `PBQ${qnum}`) : `Question ${qnum}`;
  el.quizMeta.textContent = `Mode: ${state.mode[0].toUpperCase()}${state.mode.slice(1)} | Grading: ${gradingLabel} | ${itemLabel} of ${state.questions.length}`;
  el.questionText.textContent = `${row._isPBQ ? "PBQ" : "Q"}: ${row.question}`;
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
  renderExamNavigation();
  updateFlagButtonState();
}

function showSetup(options = {}) {
  const { preserveQuizSession = false } = options;
  screen("config-screen", options);
  if (!preserveQuizSession) {
    state.questions = [];
    state.currentIndex = 0;
    state.currentLocked = false;
    state.lastAutoReportName = "";
  }
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
  renderExamNavigation();
  refreshAvailableCount();
  syncConfigScreenAfterPaint();
  reloadQuestionBanksForSetup();
  saveSessionState();
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
  const examActive = isExamMode();
  const targetQuestionCount = reqCount;
  const useCount = Math.min(targetQuestionCount, available);
  if (useCount < targetQuestionCount) {
    alert(`Requested ${targetQuestionCount}, but only ${available} are available in ${state.mode} mode.\nUsing ${useCount}.`);
  }
  const useTourDemo = state.walkthroughActive && tourCurrentStep()?.action === "start-quiz" && state.tourQuestionBank.length;
  if (useTourDemo) {
    state.mode = "easy";
    state.amount = state.tourQuestionBank.length;
    el.modeSelect.value = "easy";
    el.questionCount.value = String(state.tourQuestionBank.length);
    state.questions = state.tourQuestionBank.map((q, idx) => freshSessionQuestion(q, `tour-live-${idx + 1}`));
  } else if (examActive) {
    state.questions = buildExamQuestions();
    state.amount = state.questions.length;
  } else {
    state.questions = shuffled(fetchRandomQuestions(state.mode, useCount).map((q) => freshSessionQuestion(q)));
  }
  state.lastModeFinished = state.mode;
  state.lastGradingModeFinished = state.gradingMode;
  state.currentIndex = 0;
  state.correctCount = 0;
  state.answeredCount = 0;
  state.incorrectRecords = [];
  state.lastReportText = "";
  state.lastAutoReportName = "";
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  state.currentOptionMap = {};
  state.examNavOpen = false;
  phCapture("quiz started", {
    mode: state.mode,
    grading_mode: state.gradingMode,
    question_count: state.questions.length,
    selected_units: [...state.selectedWeeks].sort((a, b) => a - b),
    track_id: activeTrack()?.routeSlug || "",
    track_name: activeTrack()?.name || "",
    is_exam_mode: isExamMode(),
  });
  screen("quiz-screen");
  setAnswerControlsEnabled(true);
  updateLiveScore();
  renderCurrentQuestion();
  saveSessionState();
}

function submitSelectedAnswer(selected) {
  if ((state.currentLocked && !isExamMode()) || !state.questions.length) return;
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
  if (isExamMode()) {
    row._sessionAnswer = {
      selected,
      selectedOriginal,
      feedback: "Answer saved. Final grading appears after Finish Quiz.",
      wasCorrect: !isDontKnow && selectedOriginal === correct,
    };
    row._deferred = false;
    state.currentLocked = false;
    el.feedback.textContent = "Answer saved. Final grading appears after Finish Quiz.";
    updateLiveScore();
    renderExamNavigation();
    updatePreviousQuestionButton();
    el.nextQuestion.disabled = state.currentIndex >= state.questions.length - 1;
    saveSessionState();
    return;
  }
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
  state.currentLocked = true;
  row._sessionAnswer = {
    selected,
    selectedOriginal,
    feedback: el.feedback.textContent,
    wasCorrect: !isDontKnow && selectedOriginal === correct,
  };
  phCapture("quiz answer submitted", {
    was_correct: !isDontKnow && selectedOriginal === correct,
    is_dont_know: isDontKnow,
    mode: state.mode,
    grading_mode: state.gradingMode,
    track_id: activeTrack()?.routeSlug || "",
    question_index: state.currentIndex + 1,
    question_count: state.questions.length,
  });
  updateLiveScore();
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
  saveSessionState();
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
  if (!isExamMode() && state.currentIndex >= state.questions.length - 1) {
    finishQuiz();
    notifyWalkthroughAction("next-question");
    return;
  }
  state.currentIndex = Math.min(state.questions.length - 1, state.currentIndex + 1);
  renderCurrentQuestion();
  notifyWalkthroughAction("next-question");
  saveSessionState();
}

function previousQuestion() {
  if (!state.questions.length) return;
  if (isExamMode()) {
    state.currentIndex = Math.max(0, state.currentIndex - 1);
    renderCurrentQuestion();
    saveSessionState();
    return;
  }
  const previousIndex = previousAnsweredQuestionIndex();
  if (previousIndex < 0) return;
  state.currentIndex = previousIndex;
  renderCurrentQuestion();
  saveSessionState();
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
  phCapture("question flagged", {
    action: changeAction,
    requested_level: requestedLevel,
    is_demo: isDemoQuestion,
    mode: state.mode,
    track_id: activeTrack()?.routeSlug || "",
  });
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
  phCapture("ineffective question reported", {
    is_demo: isDemoQuestion,
    mode: state.mode,
    track_id: activeTrack()?.routeSlug || "",
    week: row.week ?? null,
  });
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

function buildReviewReport(scoreDetails) {
  const now = new Date();
  const generated = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
  const mode = `${state.mode[0].toUpperCase()}${state.mode.slice(1)}`;
  const gradingMode = scoreDetails.gradingMode?.label || scoreDetails.gradingMode?.id || "Regular";
  const sourcesToReview = [...new Set(state.incorrectRecords.map((rec) => inferStudyReference(rec.source_path, rec.week)).filter(Boolean))].sort();
  const course = activeTrack();
  const lines = [
    `${course.insignia} QUIZ REVIEW REPORT`,
    "=".repeat(72),
    `Generated: ${generated}`,
    `Mode: ${mode}`,
    `Grading: ${gradingMode}`,
    `Answered: ${state.answeredCount}`,
    `Correct: ${state.correctCount}`,
    `Score: ${scoreDetails.percent.toFixed(2)}%`,
  ];
  if (scoreDetails.showScaledScore) lines.push(`CompTIA Score: ${scoreDetails.scaledScore}`);
  if (scoreDetails.showPassFail) lines.push(`Result: ${scoreDetails.status}`);
  if (!scoreDetails.showPassFail && !scoreDetails.showScaledScore) lines.push(`Letter Grade: ${scoreDetails.letter}`);
  lines.push("", "Incorrect Questions", "-".repeat(72));
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

function rebuildExamIncorrectRecords() {
  state.incorrectRecords = [];
  state.questions.forEach((row) => {
    const answer = row._sessionAnswer;
    if (!answer || answer.wasCorrect) return;
    const correct = String(row.correct_choice || "").toUpperCase();
    const optionMap = row._sessionOptionMap || {};
    const correctSlot = ["A", "B", "C", "D"].find((slot) => optionMap[slot]?.original === correct) || correct;
    const selected = answer.selected || "Unanswered";
    const selectedOption = optionMap[answer.selected];
    state.incorrectRecords.push({
      question: row.question,
      selected_letter: selected,
      selected_text: selectedOption?.text || (answer.selected ? row[`choice_${String(answer.selectedOriginal || answer.selected).toLowerCase()}`] : "No answer selected."),
      correct_letter: correctSlot,
      correct_text: optionMap[correctSlot]?.text || row[`choice_${correct.toLowerCase()}`] || "",
      explanation: row.explanation || "",
      source_path: row.source_path || row.source || "",
      week: row.week ?? null,
    });
  });
}

function autoSaveReviewReport(reportText) {
  const stamp = formatStamp();
  const courseTag = activeTrack().insignia.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  const gradingTag = String(state.gradingMode || "regular").replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "").toLowerCase();
  const filename = `${courseTag || "course"}_practice_review_${state.mode}_${gradingTag}_${stamp}.txt`;
  state.reports.push({
    filename,
    mode: state.mode,
    grading_mode: state.gradingMode,
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
  if (isExamMode()) {
    state.questions.forEach((row) => {
      if (!row._sessionAnswer) {
        row._sessionAnswer = {
          selected: "",
          selectedOriginal: "",
          feedback: "Unanswered. Marked incorrect at final grading.",
          wasCorrect: false,
        };
      }
    });
  }
  syncScoreFromSession();
  if (state.answeredCount === 0) {
    alert("No answers submitted yet.");
    screen("config-screen");
    saveSessionState();
    return;
  }
  const scoreDetails = currentScoreDetails();
  state.lastModeFinished = state.mode;
  if (isExamMode()) rebuildExamIncorrectRecords();
  const report = buildReviewReport(scoreDetails);
  state.lastReportText = report;
  state.lastAutoReportName = autoSaveReviewReport(report);
  phCapture("quiz finished", {
    mode: state.mode,
    grading_mode: state.gradingMode,
    answered_count: state.answeredCount,
    correct_count: state.correctCount,
    score_percent: scoreDetails.percent,
    pass_fail: scoreDetails.showPassFail ? scoreDetails.status : null,
    is_exam_mode: isExamMode(),
    track_id: activeTrack()?.routeSlug || "",
    track_name: activeTrack()?.name || "",
    selected_units: [...state.selectedWeeks].sort((a, b) => a - b),
  });
  el.retakeIncorrect.disabled = !state.incorrectRecords.length;
  syncResetCorrectButtons();
  el.reviewSummary.innerHTML = reviewSummaryHTML(scoreDetails);
  el.reviewText.value = report;
  el.reviewTextPrint.textContent = report;
  screen("review-screen");
  saveSessionState();
}

function restoreReviewScreen() {
  syncResetCorrectButtons();
  el.retakeIncorrect.disabled = !state.incorrectRecords.length;
  el.reviewSummary.innerHTML = reviewSummaryHTML(currentScoreDetails());
  el.reviewText.value = state.lastReportText || "";
  el.reviewTextPrint.textContent = state.lastReportText || "";
}

function restoreQuizScreen() {
  if (!state.questions.length) return false;
  setAnswerControlsEnabled(true);
  updateLiveScore();
  renderCurrentQuestion();
  return true;
}

function renderPBQScreen() {
  const track = activeTrack();
  const pbqs = Array.isArray(track.pbqs) ? track.pbqs : [];
  if (el.pbqScreenTitle) {
    el.pbqScreenTitle.textContent = `PBQs - Performance-Based Questions for ${track.name}`;
  }
  if (el.pbqScreenDescription) {
    el.pbqScreenDescription.textContent = "HTML5 interactive experiences for this track will appear here.";
  }
  if (!el.pbqList) return;
  el.pbqList.innerHTML = "";
  if (!pbqs.length) {
    const empty = document.createElement("article");
    empty.className = "pbq-empty-state";
    const title = document.createElement("h3");
    title.textContent = "No PBQs published yet";
    const body = document.createElement("p");
    body.textContent = "This category is ready for interactive performance-based scenarios as they are added.";
    empty.append(title, body);
    el.pbqList.appendChild(empty);
    return;
  }
  pbqs.forEach((pbq) => {
    const card = document.createElement("article");
    card.className = "pbq-card";
    const title = document.createElement("h3");
    title.textContent = pbq.title || "Untitled PBQ";
    const body = document.createElement("p");
    body.textContent = pbq.description || "Interactive performance-based scenario.";
    card.append(title, body);
    if (pbq.path) {
      const link = document.createElement("a");
      link.className = "btn accent";
      link.href = versionedContentURL(activeTrack().contentRoot, "pbqs", pbq.path);
      link.textContent = "Launch PBQ";
      link.addEventListener("click", () => {
        phCapture("pbq launched", {
          pbq_id: pbq.id || "",
          pbq_title: pbq.title || "",
          track_id: activeTrack()?.routeSlug || "",
          track_name: activeTrack()?.name || "",
        });
      });
      card.appendChild(link);
    }
    el.pbqList.appendChild(card);
  });
}

async function restoreWorkspaceForRoute() {
  state.questionBank = [];
  state.availableWeeks = new Set();
  state.weekAvailabilityReady = false;
  await Promise.all([reloadQuestionBanksForSetup(), reloadNotesManifestForTrack(), reloadNoteRouteMap()]);
  setNotesStatus(
    state.notesLoadError
      ? "Notes manifest missing. Run the notes manifest builder."
      : `${state.notesFileMap.size} markdown files ready.`
  );
}

async function applyRouteFromLocation({ replace = false } = {}) {
  await reloadNoteRouteMap();
  const routeInfo = parseAppRoute(window.location.pathname);
  const targetScreen = routeInfo.screenId;
  const routeSelection = findTrackSelectionByRouteId(routeInfo.trackId);
  if (routeSelection) {
    applyTrackSelection(routeSelection);
  }
  if (routeInfo.notePath) {
    state.currentNotePath = routeInfo.notePath;
  }
  if (!screenNeedsWorkspace(targetScreen)) {
    if (window.location.pathname !== routePathForScreen("course-screen")) {
      syncBrowserRoute("course-screen", { replace: true });
    }
    screen("course-screen", { updateRoute: false, replaceRoute: replace });
    return;
  }
  if (!hasSavedTrackSelection()) {
    screen("course-screen", { updateRoute: false, replaceRoute: true });
    syncBrowserRoute("course-screen", { replace: true });
    return;
  }
  await restoreWorkspaceForRoute();
  if (!routeInfo.notePath && routeInfo.noteToken && routeInfo.trackId) {
    routeInfo.notePath = state.noteRoutePathsByToken.get(routeInfo.trackId)?.get(routeInfo.noteToken) || "";
  }
  if (routeInfo.notePath) {
    state.currentNotePath = routeInfo.notePath;
  }
  if (routeInfo.notePath && !state.notesFileMap.has(routeInfo.notePath)) {
    state.currentNotePath = state.notesFileMap.keys().next().value || "";
  }
  if (window.location.pathname !== routePathForScreen(targetScreen)) {
    if (DEBUG_ROUTING) {
      console.log(`[ROUTE] Correcting URL from "${window.location.pathname}" to canonical path for "${targetScreen}": "${routePathForScreen(targetScreen)}"`);
    }
    syncBrowserRoute(targetScreen, { replace: true });
  }
  if (targetScreen === "menu-screen") {
    screen("menu-screen", { updateRoute: false, replaceRoute: replace });
    return;
  }
  if (targetScreen === "notes-screen") {
    await showNotesScreen({ updateRoute: false, replaceRoute: replace });
    return;
  }
  if (targetScreen === "pbq-screen") {
    renderPBQScreen();
    screen("pbq-screen", { updateRoute: false, replaceRoute: replace });
    return;
  }
  if (targetScreen === "week-screen") {
    buildWeekControls();
    refreshAvailableCount();
    screen("week-screen", { updateRoute: false, replaceRoute: replace });
    return;
  }
  if (targetScreen === "config-screen") {
    showSetup({ updateRoute: false, replaceRoute: replace, preserveQuizSession: true });
    return;
  }
  if (screenNeedsQuizSession(targetScreen) && !state.questions.length) {
    showSetup({ updateRoute: false, replaceRoute: true });
    syncBrowserRoute("config-screen", { replace: true });
    return;
  }
  if (targetScreen === "quiz-screen") {
    if (!restoreQuizScreen()) {
      showSetup({ updateRoute: false, replaceRoute: true });
      syncBrowserRoute("config-screen", { replace: true });
      return;
    }
    screen("quiz-screen", { updateRoute: false, replaceRoute: replace });
    return;
  }
  if (targetScreen === "review-screen") {
    restoreReviewScreen();
    screen("review-screen", { updateRoute: false, replaceRoute: replace });
  }
}

function retakeIncorrectOnly() {
  if (!state.incorrectRecords.length) {
    alert("There are no incorrect questions to retake.");
    return;
  }
  const wrongQuestions = new Set(state.incorrectRecords.map((rec) => rec.question));
  const mode = state.lastModeFinished;
  const gradingMode = state.lastGradingModeFinished || state.gradingMode;
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
  state.gradingMode = gradingMode;
  el.modeSelect.value = mode;
  if (el.gradingModeSelect) el.gradingModeSelect.value = gradingMode;
  phCapture("incorrect quiz retaken", {
    retake_count: state.questions.length,
    mode: mode,
    grading_mode: gradingMode,
    track_id: activeTrack()?.routeSlug || "",
    track_name: activeTrack()?.name || "",
  });
  setAnswerControlsEnabled(true);
  updateLiveScore();
  screen("quiz-screen");
  renderCurrentQuestion();
  saveSessionState();
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
  phCapture("quiz history reset", {
    rows_cleared: before - after,
    track_id: activeTrack()?.routeSlug || "",
    track_name: activeTrack()?.name || "",
  });
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
  el.hardOfHearingToggle = document.getElementById("hard-of-hearing-toggle");
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
  el.goPBQs = document.getElementById("go-pbqs");
  el.pbqScreenTitle = document.getElementById("pbq-screen-title");
  el.pbqScreenDescription = document.getElementById("pbq-screen-description");
  el.pbqList = document.getElementById("pbq-list");
  el.backPBQsToMenu = document.getElementById("back-pbqs-to-menu");
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
  el.notesLayout = document.getElementById("notes-layout");
  el.notesSidebarBackdrop = document.getElementById("notes-sidebar-backdrop");
  el.notesSidebar = document.getElementById("notes-sidebar");
  el.closeNotesSidebar = document.getElementById("close-notes-sidebar");
  el.notesSidebarStatus = document.getElementById("notes-sidebar-status");
  el.notesTree = document.getElementById("notes-tree");
  el.notesCurrentPath = document.getElementById("notes-current-path");
  el.notesViewer = document.getElementById("notes-viewer");
  el.modeSelect = document.getElementById("mode-select");
  el.gradingModeField = document.getElementById("grading-mode-field");
  el.gradingModeSelect = document.getElementById("grading-mode-select");
  el.questionCountLabel = document.getElementById("question-count-label");
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
  el.examLayout = document.getElementById("exam-layout");
  el.examNavToggle = document.getElementById("exam-nav-toggle");
  el.examNav = document.getElementById("exam-nav");
  el.examNavList = document.getElementById("exam-nav-list");
  el.questionText = document.getElementById("question-text");
  el.choiceA = document.getElementById("choice-a");
  el.choiceB = document.getElementById("choice-b");
  el.choiceC = document.getElementById("choice-c");
  el.choiceD = document.getElementById("choice-d");
  el.feedback = document.getElementById("feedback");
  el.submitAnswer = document.getElementById("submit-answer");
  el.deferQuestion = document.getElementById("defer-question");
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
  el.resultsConfetti = document.getElementById("results-confetti");
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
  syncAccessibilityUI();

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
      saveSessionState();
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
    await Promise.all([reloadQuestionBanksForSetup(), reloadNotesManifestForTrack(), reloadNoteRouteMap()]);
    setNotesStatus(
      state.notesLoadError
        ? "Notes manifest missing. Run the notes manifest builder."
        : `${state.notesFileMap.size} markdown files ready.`
    );
    phCapture("course selected", {
      track_id: activeTrack()?.routeSlug || "",
      track_name: activeTrack()?.name || "",
      track_type: state.activeTrackType,
    });
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
  window.addEventListener("popstate", () => {
    applyRouteFromLocation({ replace: true }).catch((err) => {
      console.error("Route restore failed:", err);
    });
  });
  window.addEventListener("resize", syncWalkthroughPosition);
  window.addEventListener("resize", () => {
    syncMobileNotesLayoutClass();
    syncNotesSidebarUI();
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
  if (el.hardOfHearingToggle) {
    el.hardOfHearingToggle.addEventListener("change", () => {
      state.hardOfHearingEnabled = Boolean(el.hardOfHearingToggle.checked);
      saveAccessibilityPreferences();
      syncAccessibilityUI();
      renderVideoCaptionState();
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
    phCapture("workspace selected", {
      workspace: "practice_quiz",
      track_id: activeTrack()?.routeSlug || "",
      track_name: activeTrack()?.name || "",
    });
    screen("week-screen");
    notifyWalkthroughAction("go-practice-quiz");
  });
  el.goNotes.addEventListener("click", async (event) => {
    event.preventDefault();
    phCapture("workspace selected", {
      workspace: "notes",
      track_id: activeTrack()?.routeSlug || "",
      track_name: activeTrack()?.name || "",
    });
    await showNotesScreen();
    notifyWalkthroughAction("go-notes");
  });
  el.goPBQs.addEventListener("click", (event) => {
    event.preventDefault();
    phCapture("workspace selected", {
      workspace: "pbqs",
      track_id: activeTrack()?.routeSlug || "",
      track_name: activeTrack()?.name || "",
    });
    renderPBQScreen();
    screen("pbq-screen");
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
  el.backPBQsToMenu.addEventListener("click", (event) => {
    event.preventDefault();
    screen("menu-screen");
  });
  if (el.toggleNotesSidebar) {
    el.toggleNotesSidebar.addEventListener("click", async (event) => {
      event.preventDefault();
      await toggleNotesSidebar();
    });
  }
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
    saveSessionState();
  });
  el.clearAllWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    state.selectedWeeks = new Set();
    buildWeekControls();
    refreshAvailableCount();
    saveSessionState();
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
    saveSessionState();
    notifyWalkthroughAction(`mode-${state.mode}`);
  });
  el.questionCount.addEventListener("input", () => {
    const n = Math.max(1, Number(el.questionCount.value || 1));
    state.amount = n;
    saveSessionState();
    if (Number.isFinite(n) && n === 6) {
      notifyWalkthroughAction("question-count-6");
    }
  });
  if (el.gradingModeSelect) {
    el.gradingModeSelect.addEventListener("change", () => {
      state.gradingMode = el.gradingModeSelect.value || state.gradingMode;
      renderGradingModeControls();
      updateLiveScore();
      refreshAvailableCount();
      saveQuizConfig();
      saveSessionState();
    });
  }
  el.questionCount.addEventListener("change", () => {
    const n = Math.max(1, Number(el.questionCount.value || 1));
    state.amount = n;
    el.questionCount.value = String(n);
    saveSessionState();
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
    saveSessionState();
    if (el.skipCorrect.checked) {
      notifyWalkthroughAction("skip-correct-on");
    }
  });
  if (el.includeMissedOnce) {
    el.includeMissedOnce.addEventListener("change", () => {
      state.includeMissedOnce = el.includeMissedOnce.checked;
      refreshAvailableCount();
      saveSessionState();
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
  if (el.deferQuestion) {
    el.deferQuestion.addEventListener("click", (event) => {
      event.preventDefault();
      if (!isExamMode() || !state.questions.length) return;
      const row = state.questions[state.currentIndex];
      row._deferred = !row._deferred;
      el.feedback.textContent = row._deferred ? "Deferred. You can return to this item from the exam navigation." : "Defer removed.";
      renderExamNavigation();
      updateLiveScore();
      saveSessionState();
    });
  }
  if (el.examNavToggle) {
    el.examNavToggle.addEventListener("click", (event) => {
      event.preventDefault();
      state.examNavOpen = !state.examNavOpen;
      renderExamNavigation();
      saveSessionState();
    });
  }
  el.dontKnowAnswer.addEventListener("click", (event) => {
    event.preventDefault();
    submitDontKnowAnswer();
  });
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.addEventListener("change", () => {
      if (!rb.checked) return;
      handleAnswerSelectionChange(rb.value);
    });
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
  loadAccessibilityPreferences();
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
  if (typeof storedConfig.gradingMode === "string" && storedConfig.gradingMode) state.gradingMode = storedConfig.gradingMode;
  state.skipPreviouslyCorrect = Boolean(storedConfig.skipPreviouslyCorrect);
  state.includeMissedOnce = Boolean(storedConfig.includeMissedOnce);
  state.localHistoryRows = getJSONStorage(HISTORY_STORAGE_KEY, []);
  state.localChangeRows = getJSONStorage(CHANGES_STORAGE_KEY, []);
  state.reports = getJSONStorage(REPORTS_STORAGE_KEY, []);
  state.overrides = getJSONStorage(OVERRIDES_STORAGE_KEY, { removedKeys: {}, difficultyOverrides: {} });
  restoreSessionState();
}

async function boot() {
  ensureVersionQueryInAddressBar();
  bindElements();
  syncMobileNotesLayoutClass();
  loadLocalState();
  // Ensure a stable anonymous distinct ID is set for PostHog
  if (typeof window.posthog !== "undefined" && window.posthog.identify) {
    window.posthog.identify(phDistinctId());
  }
  syncAccessibilityUI();
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
    state.routeReady = true;
    await applyRouteFromLocation({ replace: true });
    window.__NETC_QUIZ_APP_READY__ = true;
    if (currentScreenId() === "course-screen") {
      showWalkthroughPrompt();
    }
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
