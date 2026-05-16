(function registerSecurityPlusQuizConfig() {
  window.ROCKET_QUIZ_CONFIGS = window.ROCKET_QUIZ_CONFIGS || {};
  window.ROCKET_QUIZ_CONFIGS["comptia-security-plus-sy0-701"] = {
    trackId: "comptia-security-plus-sy0-701",
    gradingModes: [
      {
        id: "regular",
        label: "Regular",
        showPassFail: true,
        useCompTIAWeightedScoring: false,
      },
      {
        id: "comptia",
        label: "CompTIA grading",
        showPassFail: true,
        useCompTIAWeightedScoring: true,
      },
      {
        id: "exam",
        label: "Exam mode",
        showPassFail: true,
        useCompTIAWeightedScoring: true,
        isExamMode: true,
      },
    ],
    defaultGradingMode: "regular",
    confettiPercent: 77.5,
    passPercent: 81.25,
    scaledScore: {
      min: 100,
      max: 900,
      passing: 750,
    },
    domainWeights: {
      1: 23,
      2: 20,
      3: 19,
      4: 14,
      5: 24,
    },
    exam: {
      questionCount: 90,
      pbqCount: 0,
      pbqWeightPercent: 20,
      normalQuestionWeightPercent: 80,
      pbqs: [],
    },
  };
})();
