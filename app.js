const WEEK_CHOICES = [1, 2, 3, 4, 5, 6];
window.__NETC_QUIZ_APP_SCRIPT__ = true;
window.__NETC_QUIZ_APP_VERSION__ = "2026-02-27-01";
window.__NETC_QUIZ_APP_READY__ = false;
const HISTORY_STORAGE_KEY = "rocket_questions_history_local";
const CHANGES_STORAGE_KEY = "rocket_questions_changes_local";
const OVERRIDES_STORAGE_KEY = "rocket_questions_overrides";
const REPORTS_STORAGE_KEY = "rocket_questions_reports";

const VIDEO_WEEK_MAP = { 1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 5, 8: 5, 9: 5, 10: 6, 11: 6 };
const TEXTBOOK_WEEK_MARKERS = [
  ["textbook 1 - chapter 1", 1],
  ["textbook 1 - chapter 2", 2],
  ["textbook 2 - chapter 1", 3],
  ["textbook 2 - chapter 2", 4],
  ["textbook 2 - chapter 3", 4],
  ["textbook 2 - chapter 5", 5],
  ["textbook 2 - chapter 6", 5],
  ["textbook 2 - chapter 7", 6],
];
const APP_BASE_URL = new URL(".", document.currentScript?.src || window.location.href);

const state = {
  questionBank: [],
  selectedWeeks: new Set(WEEK_CHOICES),
  mode: "easy",
  amount: 10,
  skipPreviouslyCorrect: false,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  answeredCount: 0,
  incorrectRecords: [],
  lastReportText: "",
  lastAutoReportName: "",
  lastModeFinished: "easy",
  currentLocked: false,
  currentSelectedAnswer: "",
  baseHistoryRows: [],
  localHistoryRows: [],
  baseChangeRows: [],
  localChangeRows: [],
  reports: [],
  overrides: { removedKeys: {}, difficultyOverrides: {} },
};

const el = {};

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
  const api3003 = `http://${window.location.hostname}:3003/api/changes`;
  const candidates = [
    ...(overrideURL ? [overrideURL] : []),
    ...(!overrideURL ? [api3003] : []),
    new URL("./api/changes", APP_BASE_URL).toString(),
    "/api/changes",
    "./api/changes",
  ];
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
  throw new Error(`Server save failed. Tried: ${errors.join(" | ")}`);
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

function letterGrade(percent) {
  if (percent >= 90) return "A";
  if (percent >= 80) return "B";
  if (percent >= 70) return "C";
  if (percent >= 60) return "D";
  return "F";
}

function inferWeekFromSource(sourcePath) {
  const src = String(sourcePath || "").toLowerCase();
  const lectureMatch = src.match(/lecture week\s*(\d+)/);
  if (lectureMatch) return Number(lectureMatch[1]);
  const videoMatch = src.match(/video\s*(\d+)/);
  if (videoMatch) return VIDEO_WEEK_MAP[Number(videoMatch[1])] ?? null;
  for (const [marker, week] of TEXTBOOK_WEEK_MARKERS) {
    if (src.includes(marker)) return week;
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
  return [...state.baseHistoryRows, ...state.localHistoryRows];
}

function correctHistoryKeys() {
  const keys = new Set();
  for (const row of allHistoryRows()) {
    if (String(row.result || "").toLowerCase() === "correct" && row.question_key) {
      keys.add(row.question_key);
    }
  }
  return keys;
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
  if (!state.skipPreviouslyCorrect) return pool.length;
  const correctKeys = correctHistoryKeys();
  return pool.filter((q) => !correctKeys.has(q.question_key)).length;
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

function fetchRandomQuestions(mode, count) {
  let pool = filteredPoolByDifficulty(mode);
  if (state.skipPreviouslyCorrect) {
    const correctKeys = correctHistoryKeys();
    pool = pool.filter((q) => !correctKeys.has(q.question_key));
  }
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

function flagNotCovered(questionKey) {
  state.overrides.difficultyOverrides[questionKey] = "hard";
  saveOverrides();
}

function screen(id) {
  ["week-screen", "config-screen", "quiz-screen", "review-screen"].forEach((sid) => {
    document.getElementById(sid).classList.toggle("hidden", sid !== id);
  });
}

function refreshAvailableCount() {
  const mode = state.mode;
  const available = countAvailable(mode);
  const easyTotal = countAvailable("easy");
  const mediumTotal = countAvailable("medium");
  const hardTotal = countAvailable("hard");
  el.availableCount.textContent = `Available in ${mode[0].toUpperCase()}${mode.slice(1)}: ${available}`;
  el.difficultyTotals.textContent = `Possible Questions by Difficulty -> Easy: ${easyTotal} | Medium (incl. Easy): ${mediumTotal} | Hard: ${hardTotal}`;
  const weeks = [...state.selectedWeeks].sort((a, b) => a - b);
  el.weekSummary.textContent = weeks.length ? `Selected Weeks: ${weeks.join(", ")}` : "Selected Weeks: none";
  const descriptions = {
    easy: "Easy: Core fundamentals in the class for beginners.",
    medium: "Medium: All questions that have to do with the scope of the class.",
    hard: "Hard: Advanced expansion topics that expand on topics taught in class.",
  };
  el.modeDesc.textContent = descriptions[mode];
}

function updateFlagButtonState() {
  if (!state.questions.length) {
    el.flagQuestion.disabled = true;
    el.ineffectiveQuestion.disabled = true;
    return;
  }
  el.flagQuestion.disabled = state.mode === "hard";
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
  el.choiceA.textContent = `A. ${row.choice_a}`;
  el.choiceB.textContent = `B. ${row.choice_b}`;
  el.choiceC.textContent = `C. ${row.choice_c}`;
  el.choiceD.textContent = `D. ${row.choice_d}`;
  state.currentSelectedAnswer = "";
  state.currentLocked = false;
  el.feedback.textContent = "";
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.checked = false;
    rb.disabled = false;
  });
  el.submitAnswer.disabled = false;
  el.nextQuestion.disabled = true;
  updateFlagButtonState();
}

function showSetup() {
  screen("config-screen");
  state.questions = [];
  state.currentIndex = 0;
  state.currentLocked = false;
  state.lastAutoReportName = "";
  el.questionText.textContent = "Click Start Quiz to begin.";
  el.quizMeta.textContent = "";
  el.feedback.textContent = "";
  setAnswerControlsEnabled(false);
  updateLiveScore();
  refreshAvailableCount();
}

function startQuiz() {
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

function submitAnswer() {
  if (state.currentLocked || !state.questions.length) return;
  const selected = selectedAnswer();
  if (!["A", "B", "C", "D"].includes(selected)) {
    alert("Select A, B, C, or D before submitting.");
    return;
  }
  const row = state.questions[state.currentIndex];
  const correct = row.correct_choice.toUpperCase();
  const explanation = row.explanation || "";
  state.currentSelectedAnswer = selected;
  state.answeredCount += 1;
  if (selected === correct) {
    state.correctCount += 1;
    appendQuestionHistory(row, selected, true);
    el.feedback.textContent = `Correct. ${explanation}`;
  } else {
    appendQuestionHistory(row, selected, false);
    const rightText = row[`choice_${correct.toLowerCase()}`];
    const selectedText = row[`choice_${selected.toLowerCase()}`];
    state.incorrectRecords.push({
      question: row.question,
      selected_letter: selected,
      selected_text: selectedText,
      correct_letter: correct,
      correct_text: rightText,
      explanation,
    });
    el.feedback.textContent = `Incorrect. Correct answer: ${correct}. ${rightText}\n${explanation}`;
  }
  updateLiveScore();
  state.currentLocked = true;
  [...document.querySelectorAll('input[name="answer"]')].forEach((rb) => {
    rb.disabled = true;
  });
  el.submitAnswer.disabled = true;
  el.nextQuestion.disabled = false;
}

function nextQuestion() {
  if (!state.questions.length) return;
  state.currentIndex += 1;
  renderCurrentQuestion();
}

async function flagCurrentQuestion() {
  if (!state.questions.length) return;
  if (state.mode === "hard") return;
  if (state.currentLocked) {
    alert("This question was already answered. Use this action before submitting to skip without grade impact.");
    return;
  }
  const row = state.questions[state.currentIndex];
  try {
    await appendChangeRequest(row, "please change this to hard", {
      action: "not_in_current_scope",
      requestedLevel: "hard",
    });
  } catch (err) {
    alert(`Could not save this change to server.\n${err?.message || err}`);
    return;
  }
  flagNotCovered(row.question_key);
  el.feedback.textContent = "Reassigned to Hard mode and skipped (no impact on grade).";
  refreshAvailableCount();
  state.questions.splice(state.currentIndex, 1);
  if (state.currentIndex >= state.questions.length && state.currentIndex > 0) {
    state.currentIndex -= 1;
  }
  if (!state.questions.length) {
    if (state.answeredCount > 0) finishQuiz();
    else {
      alert("Question moved to Hard mode and skipped. No questions remain in this session.");
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
  if (state.currentLocked && ["A", "B", "C", "D"].includes(selected) && state.answeredCount > 0) {
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
  if (state.currentIndex >= state.questions.length && state.currentIndex > 0) {
    state.currentIndex -= 1;
  }
  el.feedback.textContent = "Question marked ineffective, saved to changes log, and removed from the main question bank.";
  refreshAvailableCount();
  if (!state.questions.length) {
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
  const topicsToReview = [...new Set(state.incorrectRecords.map((rec) => inferTopic(rec.question)))].sort();
  const lines = [
    "NETC-121 QUIZ REVIEW REPORT",
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
      lines.push(`   Topic: ${inferTopic(rec.question)}`);
      lines.push("");
    });
  }
  lines.push("");
  lines.push("Topics to Review");
  lines.push("-".repeat(72));
  if (topicsToReview.length) {
    topicsToReview.forEach((topic) => lines.push(`- ${topic}`));
  } else {
    lines.push("- Continue balanced review across all modules.");
  }
  return lines.join("\n");
}

function autoSaveReviewReport(reportText) {
  const stamp = formatStamp();
  const filename = `netc_practice_review_${state.mode}_${stamp}.txt`;
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
  el.reviewSummary.textContent = `Answered: ${state.answeredCount} | Correct: ${state.correctCount} | Score: ${pct.toFixed(2)}% | Letter: ${grade} | Auto-saved: ${state.lastAutoReportName}`;
  el.reviewText.value = report;
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
  a.download = "netc_quiz_review_report.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function printReviewText() {
  if (!state.lastReportText) return;
  window.print();
}

function bindElements() {
  el.loadStatus = document.getElementById("load-status");
  el.weekGrid = document.getElementById("week-grid");
  el.selectAllWeeks = document.getElementById("select-all-weeks");
  el.clearAllWeeks = document.getElementById("clear-all-weeks");
  el.continueSetup = document.getElementById("continue-setup");
  el.modeSelect = document.getElementById("mode-select");
  el.questionCount = document.getElementById("question-count");
  el.availableCount = document.getElementById("available-count");
  el.modeDesc = document.getElementById("mode-desc");
  el.weekSummary = document.getElementById("week-summary");
  el.difficultyTotals = document.getElementById("difficulty-totals");
  el.skipCorrect = document.getElementById("skip-correct");
  el.startQuiz = document.getElementById("start-quiz");
  el.changeWeeks = document.getElementById("change-weeks");
  el.quizMeta = document.getElementById("quiz-meta");
  el.liveScore = document.getElementById("live-score");
  el.questionText = document.getElementById("question-text");
  el.choiceA = document.getElementById("choice-a");
  el.choiceB = document.getElementById("choice-b");
  el.choiceC = document.getElementById("choice-c");
  el.choiceD = document.getElementById("choice-d");
  el.feedback = document.getElementById("feedback");
  el.submitAnswer = document.getElementById("submit-answer");
  el.nextQuestion = document.getElementById("next-question");
  el.flagQuestion = document.getElementById("flag-question");
  el.ineffectiveQuestion = document.getElementById("ineffective-question");
  el.finishQuiz = document.getElementById("finish-quiz");
  el.backSetupFromQuiz = document.getElementById("back-setup-from-quiz");
  el.reviewSummary = document.getElementById("review-summary");
  el.reviewText = document.getElementById("review-text");
  el.copyReport = document.getElementById("copy-report");
  el.downloadReport = document.getElementById("download-report");
  el.printReport = document.getElementById("print-report");
  el.retakeIncorrect = document.getElementById("retake-incorrect");
  el.backSetupFromReview = document.getElementById("back-setup-from-review");
  el.ineffectiveDialog = document.getElementById("ineffective-dialog");
  el.ineffectiveFeedback = document.getElementById("ineffective-feedback");
  el.submitIneffective = document.getElementById("submit-ineffective");
  el.cancelIneffective = document.getElementById("cancel-ineffective");

  // Defensive: prevent accidental form-submit behavior even if stale HTML is cached.
  document.querySelectorAll("button").forEach((btn) => {
    btn.type = "button";
  });
}

function buildWeekControls() {
  el.weekGrid.innerHTML = "";
  WEEK_CHOICES.forEach((week) => {
    const lbl = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = state.selectedWeeks.has(week);
    cb.addEventListener("change", () => {
      if (cb.checked) state.selectedWeeks.add(week);
      else state.selectedWeeks.delete(week);
      refreshAvailableCount();
    });
    const txt = document.createElement("span");
    txt.textContent = `Week ${week}`;
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

  el.selectAllWeeks.addEventListener("click", (event) => {
    event.preventDefault();
    state.selectedWeeks = new Set(WEEK_CHOICES);
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
    screen("config-screen");
    refreshAvailableCount();
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
  el.backSetupFromReview.addEventListener("click", (event) => {
    event.preventDefault();
    showSetup();
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
  const questionHeaders = ["difficulty", "question", "choice_a", "choice_b", "choice_c", "choice_d", "correct_choice"];
  for (const week of WEEK_CHOICES) {
    const path = `./week${week}_question_bank.csv`;
    try {
      const rows = await loadCSV(path, questionHeaders);
      rows.forEach((row) => {
        row.week = week;
      });
      weekRows.push(...rows);
    } catch {
      // Keep going; fallback below can handle missing weekly files.
    }
  }
  let sourceRows = weekRows;
  if (!sourceRows.length) {
    sourceRows = await loadCSV("./question_bank.csv", questionHeaders);
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
}

async function loadBaseHistoryAndChanges() {
  try {
    state.baseHistoryRows = await loadCSV("./question_history.csv");
  } catch {
    state.baseHistoryRows = [];
  }
  try {
    state.baseChangeRows = await loadCSV("./changes.csv");
  } catch {
    state.baseChangeRows = [];
  }
}

function loadLocalState() {
  state.localHistoryRows = getJSONStorage(HISTORY_STORAGE_KEY, []);
  state.localChangeRows = getJSONStorage(CHANGES_STORAGE_KEY, []);
  state.reports = getJSONStorage(REPORTS_STORAGE_KEY, []);
  state.overrides = getJSONStorage(OVERRIDES_STORAGE_KEY, { removedKeys: {}, difficultyOverrides: {} });
}

async function boot() {
  bindElements();
  loadLocalState();
  buildWeekControls();
  wireEvents();
  setAnswerControlsEnabled(false);
  updateLiveScore();
  try {
    await Promise.all([loadQuestionBanks(), loadBaseHistoryAndChanges()]);
    el.loadStatus.textContent = `Loaded ${state.questionBank.length} questions.`;
    refreshAvailableCount();
    screen("week-screen");
    window.__NETC_QUIZ_APP_READY__ = true;
  } catch (err) {
    el.loadStatus.textContent = `Load failed: ${err?.message || "Unknown error"}`;
    window.__NETC_QUIZ_APP_READY__ = false;
    console.error(err);
  }
}

boot();
