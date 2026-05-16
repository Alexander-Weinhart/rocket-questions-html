(function registerNETC121QuizConfig() {
  window.ROCKET_QUIZ_CONFIGS = window.ROCKET_QUIZ_CONFIGS || {};
  window.ROCKET_QUIZ_CONFIGS.netc121 = {
    trackId: "netc121",
    confettiPercent: 80,
    pbqs: [
      {
        id: "classful-ip-addressing",
        title: "Classful IP Addressing",
        description: "Work a random class A-E address on one screen: identify its class, network address, broadcast address, first host, and last host with built-in calculator and scratch paper.",
        path: "classful-ip-addressing/index.html",
      },
      {
        id: "classless-ip-subnetting",
        title: "Classless IP Subnetting",
        description: "Given an IP address and subnet mask, convert the mask to binary, identify the CIDR, and calculate the network, broadcast, first host, and last host using the built-in calculator and scratch paper.",
        path: "classless-ip-subnetting/index.html",
      },
    ],
    gradingModes: [
      {
        id: "regular",
        label: "Regular",
        showPassFail: true,
        useCompTIAWeightedScoring: false,
      },
    ],
    defaultGradingMode: "regular",
    passPercent: 70,
  };
})();
