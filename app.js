(() => {
if (window.__NETC_QUIZ_APP_BOOTED__) {
  window.__NETC_QUIZ_APP_SCRIPT__ = true;
  window.__NETC_QUIZ_APP_VERSION__ = "2026-04-02-07";
  return;
}
window.__NETC_QUIZ_APP_BOOTED__ = true;

const WEEK_CHOICES = Array.from({ length: 15 }, (_, i) => i + 1);
window.__NETC_QUIZ_APP_SCRIPT__ = true;
window.__NETC_QUIZ_APP_VERSION__ = "2026-04-02-07";
window.__NETC_QUIZ_APP_READY__ = false;
const COURSE_STORAGE_KEY = "rocket_questions_selected_course";
const HISTORY_STORAGE_KEY = "rocket_questions_history_local";
const CHANGES_STORAGE_KEY = "rocket_questions_changes_local";
const OVERRIDES_STORAGE_KEY = "rocket_questions_overrides";
const REPORTS_STORAGE_KEY = "rocket_questions_reports";
const CONFIG_STORAGE_KEY = "rocket_questions_quiz_config";
const NOTES_MANIFEST_PATH = `./notes-manifest.json?v=${window.__NETC_QUIZ_APP_VERSION__}`;
const CHANGELOG_PATH = `./changelog.md?v=${window.__NETC_QUIZ_APP_VERSION__}`;
const COURSE_CATALOG = [
  {
    id: "netc121",
    browserTitle: "Rocket Questions - Cincinnati State NETC-CS Program",
    pageTitle: "🚀 Rocket Questions - Cincinnati State NETC-CS Program",
    insignia: "NETC-121",
    name: "Network Communications 1",
    subtitle: "May we all succeed or fail as a team.",
    yearCreated: 2026,
    copyrightOwners: ["Alexander Weinhart"],
  },
];

const VIDEO_WEEK_MAP = {
  1: 3, 2: 3, 3: 3,
  4: 4, 5: 4, 6: 4,
  7: 5, 8: 5, 9: 5,
  10: 6, 11: 6,
  12: 7, 13: 7, 14: 7, 15: 7,
  16: 8, 17: 8,
  18: 9, 19: 9,
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
    marker: "week 10 - ai master list",
    label: "Week 10 - AI Master List",
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

const state = {
  courseId: COURSE_CATALOG[0].id,
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
  baseChangeRows: [],
  localChangeRows: [],
  reports: [],
  overrides: { removedKeys: {}, difficultyOverrides: {} },
  notesManifest: null,
  notesFileMap: new Map(),
  currentNotePath: "",
  notesLoadError: "",
  changelogText: "",
  changelogLoadError: "",
};

const el = {};
let questionBankReloadPromise = null;

function activeCourse() {
  return COURSE_CATALOG.find((c) => c.id === state.courseId) || COURSE_CATALOG[0];
}

function applyCourseBranding() {
  const course = activeCourse();
  const browserTitle = course.browserTitle || course.title || `${course.insignia} ${course.name}`;
  const pageTitle = course.pageTitle || course.title || browserTitle;
  document.title = browserTitle;
  if (el.appTitle) el.appTitle.textContent = pageTitle;
  if (el.appSubtitle) el.appSubtitle.textContent = course.subtitle;
  if (el.notesScreenTitle) {
    el.notesScreenTitle.textContent = `🚀 Rocket Questions Notes Lists for ${course.name}`;
  }
  renderAutoCopyright(course);
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

function buildCourseOptions() {
  if (!el.courseSelect) return;
  el.courseSelect.innerHTML = "";
  COURSE_CATALOG.forEach((course) => {
    const opt = document.createElement("option");
    opt.value = course.id;
    opt.textContent = `${course.insignia} | ${course.name}`;
    opt.selected = course.id === state.courseId;
    el.courseSelect.appendChild(opt);
  });
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

function showStartupSplash(text = "") {
  document.body.classList.add("app-loading");
  if (el.startupSplash) el.startupSplash.classList.remove("hidden");
  if (text) setStartupStatus(text);
}

function hideStartupSplash() {
  document.body.classList.remove("app-loading");
  if (el.startupSplash) el.startupSplash.classList.add("hidden");
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
  const overrideURL = String(window.NETC_CHANGES_API_URL || "").trim();
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";
  const host = window.location.hostname;
  const baseApi = new URL("./api/changes", APP_BASE_URL).toString();
  const rootApi = new URL("/api/changes", window.location.origin).toString();
  const appPath = APP_BASE_URL.pathname.endsWith("/") ? APP_BASE_URL.pathname : `${APP_BASE_URL.pathname}/`;
  const appRootApi = new URL(`${appPath.replace(/^\/+/, "/")}api/changes`, window.location.origin).toString();
  const api3003 = `${protocol}//${host}:3003/api/changes`;
  const candidates = [
    ...(overrideURL ? [overrideURL] : []),
    ...(!overrideURL ? [baseApi, rootApi, appRootApi, api3003] : []),
  ].filter((value, idx, list) => value && list.indexOf(value) === idx);
  const errors = [];
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changeRow),
      });
      if (res.ok) return;
      errors.push(`${url} (${res.status})`);
    } catch (err) {
      errors.push(`${url} (${err?.message || "network error"})`);
    }
  }
  const hint = overrideURL
    ? ""
    : " Set window.NETC_CHANGES_API_URL to your deployed endpoint if this app is behind a reverse proxy.";
  throw new Error(`Server save failed. Tried: ${errors.join(" | ")}.${hint}`);
}

async function postHistoryToServer(historyRow) {
  const overrideURL = String(window.NETC_HISTORY_API_URL || "").trim();
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";
  const host = window.location.hostname;
  const baseApi = new URL("./api/history", APP_BASE_URL).toString();
  const rootApi = new URL("/api/history", window.location.origin).toString();
  const appPath = APP_BASE_URL.pathname.endsWith("/") ? APP_BASE_URL.pathname : `${APP_BASE_URL.pathname}/`;
  const appRootApi = new URL(`${appPath.replace(/^\/+/, "/")}api/history`, window.location.origin).toString();
  const api3003 = `${protocol}//${host}:3003/api/history`;
  const candidates = [
    ...(overrideURL ? [overrideURL] : []),
    ...(!overrideURL ? [baseApi, rootApi, appRootApi, api3003] : []),
  ].filter((value, idx, list) => value && list.indexOf(value) === idx);
  const errors = [];
  for (const url of candidates) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historyRow),
      });
      if (res.ok) return;
      errors.push(`${url} (${res.status})`);
    } catch (err) {
      errors.push(`${url} (${err?.message || "network error"})`);
    }
  }
  throw new Error(`History save failed. Tried: ${errors.join(" | ")}`);
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
  const candidates = csvPathCandidates(path);
  const failures = [];
  for (const candidate of candidates) {
    const resolvedURL = new URL(candidate, APP_BASE_URL);
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
  let unanswered = 0;
  let missedOnly = 0;
  let missedThenCorrect = 0;
  for (const key of poolKeys) {
    const wasCorrect = correct.has(key);
    const wasMissed = missed.has(key);
    if (!wasCorrect && !wasMissed) unanswered += 1;
    else if (!wasCorrect && wasMissed) missedOnly += 1;
    else if (wasCorrect && wasMissed) missedThenCorrect += 1;
  }
  return {
    unanswered,
    missedOnly,
    missedThenCorrect,
    missedEver: missedOnly + missedThenCorrect,
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
  return shuffled(options);
}

function fetchRandomQuestions(mode, count) {
  const basePool = filteredPoolByDifficulty(mode);
  const pool = filterPoolByHistoryRules(basePool);
  return sample(pool, count);
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
    console.warn("Question history server save failed:", err?.message || err);
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
  await postChangeToServer(row);
  state.localChangeRows.push(row);
  saveLocalChanges();
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
}

function normalizeNotePath(path) {
  return String(path || "").replace(/\\/g, "/").replace(/^\/+/, "");
}

function noteFetchURL(relativePath) {
  const normalized = normalizeNotePath(relativePath);
  return `./notes-content/${normalized.split("/").map(encodeURIComponent).join("/")}`;
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
  const res = await fetch(NOTES_MANIFEST_PATH, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Notes manifest could not be loaded (${res.status}). Run the sync script.`);
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

async function loadChangelog() {
  const res = await fetch(CHANGELOG_PATH, { cache: "no-cache" });
  if (!res.ok) {
    throw new Error(`Changelog could not be loaded (${res.status}).`);
  }
  state.changelogText = await res.text();
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
  const withCodes = raw.replace(/`([^`]+)`/g, (_, code) => {
    const token = `CODETOKEN${codeTokens.length}PLACEHOLDER`;
    codeTokens.push(`<code>${code}</code>`);
    return token;
  });
  let html = withCodes
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
      const safeLabel = label;
      const safeHref = escapeHTML(href).replace(/"/g, "&quot;");
      return `<a href="${safeHref}">${safeLabel}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[^\*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/(^|[^_])_([^_\n]+)_(?!_)/g, "$1<em>$2</em>");
  codeTokens.forEach((tokenHTML, idx) => {
    html = html.replace(`CODETOKEN${idx}PLACEHOLDER`, tokenHTML);
  });
  return html;
}

function isTableSeparator(line) {
  const trimmed = String(line || "").trim();
  return /^\|?(?:\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(trimmed);
}

function parseTableRow(line) {
  const trimmed = String(line || "").trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function consumeList(lines, startIndex, ordered) {
  const items = [];
  let index = startIndex;
  const pattern = ordered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
  while (index < lines.length && pattern.test(lines[index])) {
    items.push(lines[index].match(pattern)[1]);
    index += 1;
  }
  const tag = ordered ? "ol" : "ul";
  const html = `<${tag}>${items.map((item) => `<li>${parseInlineMarkdown(item)}</li>`).join("")}</${tag}>`;
  return { html, nextIndex: index };
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
      const headerLine = lines[i];
      const separatorLine = lines[i + 1];
      if (isTableSeparator(separatorLine)) {
        const headers = parseTableRow(headerLine);
        const rows = [];
        i += 2;
        while (i < lines.length && lines[i].trim().includes("|")) {
          rows.push(parseTableRow(lines[i]));
          i += 1;
        }
        parts.push(
          `<table><thead><tr>${headers.map((cell) => `<th>${parseInlineMarkdown(cell)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${parseInlineMarkdown(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
        );
        continue;
      }
    }
    if (/^\s*[-*+]\s+/.test(line)) {
      const list = consumeList(lines, i, false);
      parts.push(list.html);
      i = list.nextIndex;
      continue;
    }
    if (/^\s*\d+\.\s+/.test(line)) {
      const list = consumeList(lines, i, true);
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
    parts.push(`<p>${parseInlineMarkdown(paragraphLines.join(" "))}</p>`);
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
  } catch (err) {
    el.notesViewer.innerHTML = `<div class="notes-empty-state"><h3>Unable to load note</h3><p>${escapeHTML(err?.message || "Unknown error")}</p></div>`;
    setNotesStatus("A notes file failed to load.");
  }
}

function buildNotesTreeNodes(nodes, container) {
  (nodes || []).forEach((node) => {
    if (node.type === "directory") {
      const folder = document.createElement("div");
      folder.className = "notes-tree-folder";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "notes-tree-toggle";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = node.name;
      const children = document.createElement("div");
      children.className = "notes-tree-children";
      buildNotesTreeNodes(node.children || [], children);
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", expanded ? "false" : "true");
        children.hidden = expanded;
      });
      children.hidden = true;
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

function renderNotesTree() {
  el.notesTree.innerHTML = "";
  if (state.notesLoadError) {
    el.notesTree.innerHTML = `<div class="notes-empty-state"><h3>Notes unavailable</h3><p>${escapeHTML(state.notesLoadError)}</p></div>`;
    return;
  }
  buildNotesTreeNodes(state.notesManifest?.roots || [], el.notesTree);
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

function refreshAvailableCount() {
  const mode = state.mode;
  const modePool = filteredPoolByDifficulty(mode);
  const available = countAvailable(mode);
  const easyTotal = countAvailable("easy");
  const mediumTotal = countAvailable("medium");
  const hardTotal = countAvailable("hard");
  const stats = historyStatsForPool(modePool);
  const historyLine = state.skipPreviouslyCorrect
    ? ` | Missed ever in current pool: ${stats.missedEver} (${stats.missedOnly} still missed + ${stats.missedThenCorrect} corrected later)`
    : "";
  el.availableCount.textContent = `Available in ${mode[0].toUpperCase()}${mode.slice(1)}: ${available}${historyLine}`;
  el.difficultyTotals.textContent = `Possible Questions by Difficulty -> Easy: ${easyTotal} | Medium (incl. Easy): ${mediumTotal} | Hard: ${hardTotal}`;
  const weeks = [...state.selectedWeeks].sort((a, b) => a - b);
  el.weekSummary.textContent = weeks.length ? `Selected Weeks: ${weeks.join(", ")}` : "Selected Weeks: none";
  const descriptions = {
    easy: "Easy: Core fundamentals in the class for beginners.",
    medium: "Medium: All questions that have to do with the scope of the class.",
    hard: "Hard: Advanced expansion topics that expand on topics taught in class.",
  };
  let detail = descriptions[mode];
  if (state.skipPreviouslyCorrect) {
    detail += ` Currently available = ${stats.unanswered} unanswered + ${stats.missedOnly} still-missed`;
    if (state.includeMissedOnce) {
      detail += ` + ${stats.missedThenCorrect} previously-corrected questions that were missed at least once`;
    }
    detail += ".";
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

function updateLiveScore() {
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

function renderCurrentQuestion() {
  if (!state.questions.length || state.currentIndex >= state.questions.length) {
    finishQuiz();
    return;
  }
  const row = state.questions[state.currentIndex];
  const qnum = state.currentIndex + 1;
  el.quizMeta.textContent = `Mode: ${state.mode[0].toUpperCase()}${state.mode.slice(1)} | Question ${qnum} of ${state.questions.length}`;
  el.questionText.textContent = `Q: ${row.question}`;
  const shuffledOptions = shuffledAnswerOptions(row);
  state.currentOptionMap = {
    A: shuffledOptions[0],
    B: shuffledOptions[1],
    C: shuffledOptions[2],
    D: shuffledOptions[3],
  };
  el.choiceA.textContent = `A. ${state.currentOptionMap.A.text}`;
  el.choiceB.textContent = `B. ${state.currentOptionMap.B.text}`;
  el.choiceC.textContent = `C. ${state.currentOptionMap.C.text}`;
  el.choiceD.textContent = `D. ${state.currentOptionMap.D.text}`;
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
  if (!state.selectedWeeks.size) {
    alert("Select at least one week before starting a quiz.");
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
  state.questions = shuffled(fetchRandomQuestions(state.mode, useCount));
  state.lastModeFinished = state.mode;
  state.currentIndex = 0;
  state.correctCount = 0;
  state.answeredCount = 0;
  state.incorrectRecords = [];
  state.lastReportText = "";
  state.lastAutoReportName = "";
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  screen("quiz-screen");
  setAnswerControlsEnabled(true);
  updateLiveScore();
  renderCurrentQuestion();
}

function submitSelectedAnswer(selected) {
  if (state.currentLocked || !state.questions.length) return;
  const isDontKnow = selected === "E";
  const row = state.questions[state.currentIndex];
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
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.disabled = true;
  });
  el.submitAnswer.disabled = true;
  el.dontKnowAnswer.disabled = true;
  el.nextQuestion.disabled = false;
}

function submitAnswer() {
  if (state.currentLocked || !state.questions.length) return;
  const selected = selectedAnswer();
  if (!["A", "B", "C", "D"].includes(selected)) {
    alert("Select A, B, C, or D before submitting.");
    return;
  }
  submitSelectedAnswer(selected);
}

function submitDontKnowAnswer() {
  submitSelectedAnswer("E");
}

function nextQuestion() {
  if (!state.questions.length) return;
  state.currentIndex += 1;
  renderCurrentQuestion();
}

async function flagCurrentQuestion() {
  if (!state.questions.length) return;
  const row = state.questions[state.currentIndex];
  const movingFromHard = state.mode === "hard";
  const requestedLevel = movingFromHard ? "medium" : "hard";
  const changeAction = movingFromHard ? "move_to_medium" : "not_in_current_scope";
  const feedbackRequest = movingFromHard ? "please change this to medium" : "please change this to hard";
  try {
    await appendChangeRequest(row, feedbackRequest, {
      action: changeAction,
      requestedLevel,
    });
  } catch (err) {
    alert(`Could not save this change to server.\n${err?.message || err}`);
    return;
  }
  setQuestionDifficultyOverride(row.question_key, requestedLevel);
  if (state.currentLocked) {
    el.feedback.textContent = movingFromHard
      ? "Saved: this question will be moved to Medium mode for future sessions."
      : "Saved: this question will be moved to Hard mode for future sessions.";
    refreshAvailableCount();
    return;
  }
  el.feedback.textContent = movingFromHard
    ? "Moved to Medium mode and skipped (no impact on grade)."
    : "Reassigned to Hard mode and skipped (no impact on grade).";
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
  try {
    await appendChangeRequest(row, feedback, {
      action: "ineffective_question",
      requestedLevel: getDifficulty(row),
    });
  } catch (err) {
    alert(`Could not save this change to server.\n${err?.message || err}`);
    return;
  }
  removeQuestionFromBank(row.question_key);
  if (state.currentLocked && ["A", "B", "C", "D", "E"].includes(selected) && state.answeredCount > 0) {
    state.answeredCount -= 1;
    if (selected === row.correct_choice.toUpperCase() && state.correctCount > 0) {
      state.correctCount -= 1;
    } else {
      let removedOne = false;
      state.incorrectRecords = state.incorrectRecords.filter((rec) => {
        if (!removedOne && rec.question === row.question && rec.selected_letter === selected) {
          removedOne = true;
          return false;
        }
        return true;
      });
    }
    updateLiveScore();
  }
  state.questions.splice(state.currentIndex, 1);
  el.feedback.textContent = "Question marked ineffective, saved to changes log, and removed from the main question bank.";
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
  const course = activeCourse();
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
  const courseTag = activeCourse().insignia.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
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
  if (el.resetWrongCount) el.resetWrongCount.disabled = false;
  if (el.resetWrongCountConfig) el.resetWrongCountConfig.disabled = false;
}

function finishQuiz() {
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
  state.questions = shuffled(rows);
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

function copyReviewText() {
  if (!state.lastReportText) return;
  navigator.clipboard.writeText(state.lastReportText).then(
    () => alert("Report copied to clipboard."),
    () => alert("Copy failed. You can still Download Report.")
  );
}

function saveReviewText() {
  if (!state.lastReportText) return;
  const blob = new Blob([state.lastReportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const courseTag = activeCourse().insignia.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  a.download = `${courseTag || "course"}_quiz_review_report.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printReviewText() {
  if (!state.lastReportText) return;
  el.reviewTextPrint.textContent = state.lastReportText;
  window.print();
}

function bindElements() {
  el.appTitle = document.getElementById("app-title");
  el.appSubtitle = document.getElementById("app-subtitle");
  el.copy = document.getElementById("copy");
  el.loadStatus = document.getElementById("load-status");
  el.startupSplash = document.getElementById("startup-splash");
  el.startupStatus = document.getElementById("startup-status");
  el.courseSelect = document.getElementById("course-select");
  el.continueCourse = document.getElementById("continue-course");
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
  el.notesSidebarStatus = document.getElementById("notes-sidebar-status");
  el.notesTree = document.getElementById("notes-tree");
  el.notesCurrentPath = document.getElementById("notes-current-path");
  el.notesViewer = document.getElementById("notes-viewer");
  el.modeSelect = document.getElementById("mode-select");
  el.questionCount = document.getElementById("question-count");
  el.availableCount = document.getElementById("available-count");
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
  syncResetCorrectButtons();

  // Defensive: prevent accidental form-submit behavior even if stale HTML is cached.
  document.querySelectorAll("button").forEach((btn) => {
    btn.type = "button";
  });

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
}

function buildWeekControls() {
  el.weekGrid.innerHTML = "";
  WEEK_CHOICES.forEach((week) => {
    const isAvailable = state.weekAvailabilityReady && state.availableWeeks.has(week);
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
    txt.textContent = state.weekAvailabilityReady
      ? (isAvailable ? `Week ${week}` : `Week ${week} (coming soon)`)
      : `Week ${week} (loading...)`;
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

function wireEvents() {
  // Capture phase blocks submits before any default navigation can run.
  document.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();
  }, true);

  el.courseSelect.addEventListener("change", () => {
    state.courseId = el.courseSelect.value;
    setJSONStorage(COURSE_STORAGE_KEY, state.courseId);
    applyCourseBranding();
  });
  el.continueCourse.addEventListener("click", (event) => {
    event.preventDefault();
    if (!state.weekAvailabilityReady) {
      alert("Question banks are still loading. Please try again in a moment.");
      return;
    }
    state.courseId = el.courseSelect.value;
    setJSONStorage(COURSE_STORAGE_KEY, state.courseId);
    applyCourseBranding();
    screen("menu-screen");
  });
  el.goPracticeQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    screen("week-screen");
  });
  el.goNotes.addEventListener("click", async (event) => {
    event.preventDefault();
    await showNotesScreen();
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
  });
  el.selectAllWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    const targetWeeks = state.weekAvailabilityReady
      ? WEEK_CHOICES.filter((week) => state.availableWeeks.has(week))
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
    if (!state.selectedWeeks.size) {
      alert("Choose at least one week to continue.");
      return;
    }
    showSetup();
  });
  el.modeSelect.addEventListener("change", () => {
    state.mode = el.modeSelect.value;
    refreshAvailableCount();
  });
  el.questionCount.addEventListener("change", () => {
    const n = Math.max(1, Number(el.questionCount.value || 1));
    state.amount = n;
    el.questionCount.value = String(n);
  });
  el.skipCorrect.addEventListener("change", () => {
    state.skipPreviouslyCorrect = el.skipCorrect.checked;
    refreshAvailableCount();
  });
  if (el.includeMissedOnce) {
    el.includeMissedOnce.addEventListener("change", () => {
      state.includeMissedOnce = el.includeMissedOnce.checked;
      refreshAvailableCount();
    });
  }
  el.startQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    startQuiz();
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
  el.nextQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    nextQuestion();
  });
  el.flagQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    flagCurrentQuestion();
  });
  el.ineffectiveQuestion.addEventListener("click", (event) => {
    event.preventDefault();
    openIneffectiveDialog();
  });
  el.finishQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    finishQuiz();
  });
  el.backSetupFromQuiz.addEventListener("click", (event) => {
    event.preventDefault();
    showSetup();
  });
  el.copyReport.addEventListener("click", (event) => {
    event.preventDefault();
    copyReviewText();
  });
  el.downloadReport.addEventListener("click", (event) => {
    event.preventDefault();
    saveReviewText();
  });
  el.printReport.addEventListener("click", (event) => {
    event.preventDefault();
    printReviewText();
  });
  el.retakeIncorrect.addEventListener("click", (event) => {
    event.preventDefault();
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
    const feedback = String(el.ineffectiveFeedback.value || "").trim();
    const validationError = validateFeedbackText(feedback);
    if (validationError) {
      alert(validationError);
      return;
    }
    el.ineffectiveDialog.close("submit");
    await applyIneffectiveFeedback(feedback);
  });
  el.cancelIneffective.addEventListener("click", (event) => {
    event.preventDefault();
    el.ineffectiveDialog.close("cancel");
  });
}

async function loadQuestionBanks() {
  const weekRows = [];
  const loadedWeeks = new Set();
  const questionHeaders = ["difficulty", "question", "choice_a", "choice_b", "choice_c", "choice_d", "correct_choice"];
  for (const week of WEEK_CHOICES) {
    const path = `./week${week}_question_bank.csv`;
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
    throw new Error("No weekly question banks were found. Add weekN_question_bank.csv files.");
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
  state.availableWeeks = loadedWeeks;
  state.weekAvailabilityReady = true;
}

async function loadBaseChanges() {
  try {
    state.baseChangeRows = await loadCSV("/api/changes");
  } catch {
    try {
      state.baseChangeRows = await loadCSV("./changes.csv");
    } catch {
      state.baseChangeRows = [];
    }
  }
}

function reconcileOverridesWithBaseChanges() {
  const changedKeys = new Set(
    (state.baseChangeRows || [])
      .map((row) => String(row?.question_key || "").trim())
      .filter(Boolean)
  );
  state.overrides.removedKeys = Object.fromEntries(
    Object.entries(state.overrides.removedKeys || {}).filter(([questionKey]) => changedKeys.has(questionKey))
  );
  state.overrides.difficultyOverrides = Object.fromEntries(
    Object.entries(state.overrides.difficultyOverrides || {}).filter(([questionKey]) => changedKeys.has(questionKey))
  );
  saveOverrides();
}

function loadLocalState() {
  const storedCourse = String(getJSONStorage(COURSE_STORAGE_KEY, COURSE_CATALOG[0].id) || COURSE_CATALOG[0].id);
  state.courseId = COURSE_CATALOG.some((c) => c.id === storedCourse) ? storedCourse : COURSE_CATALOG[0].id;
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
  showStartupSplash("Loading local preferences...");
  loadLocalState();
  buildCourseOptions();
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
    setStartupStatus("Loading question banks, notes, changelog, and change history...");
    await Promise.all([
      loadQuestionBanks(),
      loadBaseChanges(),
      loadNotesManifest().catch((err) => {
        state.notesLoadError = err?.message || "Unable to load notes manifest.";
      }),
      loadChangelog().catch((err) => {
        state.changelogLoadError = err?.message || "Unable to load changelog.";
      }),
    ]);
    reconcileOverridesWithBaseChanges();
    if (state.weekAvailabilityReady) {
      state.selectedWeeks = new Set(
        [...state.selectedWeeks].filter((week) => state.availableWeeks.has(Number(week)))
      );
      if (!state.selectedWeeks.size && state.availableWeeks.size) {
        state.selectedWeeks = new Set([...state.availableWeeks].sort((a, b) => a - b));
      }
      buildWeekControls();
    }
    setNotesStatus(
      state.notesLoadError
        ? "Notes manifest missing. Run the sync script."
        : `${state.notesFileMap.size} markdown files ready.`
    );
    renderCourseChangelog();
    setStartupStatus(`Loaded ${state.questionBank.length} questions.`);
    refreshAvailableCount();
    screen("course-screen");
    window.__NETC_QUIZ_APP_READY__ = true;
    hideStartupSplash();
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
