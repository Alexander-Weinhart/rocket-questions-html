(function registerNetworkPlusQuizConfig() {
  window.ROCKET_QUIZ_CONFIGS = window.ROCKET_QUIZ_CONFIGS || {};
  window.ROCKET_QUIZ_CONFIGS["comptia-network-plus-n10-009"] = {
    trackId: "comptia-network-plus-n10-009",
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
    passPercent: 77.5,
    scaledScore: {
      min: 100,
      max: 900,
      passing: 720,
    },
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
    domainWeights: {
      1: 23,
      2: 20,
      3: 19,
      4: 14,
      5: 24,
    },
    exam: {
      questionCount: 90,
      pbqCount: 1,
      pbqWeightPercent: 20,
      normalQuestionWeightPercent: 80,
      pbqs: [
        {
          id: "network-plus-port-number-matching",
          title: "Port Number Matching",
          question: "A network administrator is reviewing common service ports. Which one of the following answer choices contains only correct protocol-to-port matches from the Port Number Matching PBQ study set?",
          choices: [
            "FTP tcp/21, DNS udp/53, HTTPS tcp/443, SMB tcp/445",
            "FTP tcp/20, DNS udp/67, HTTPS tcp/3389, RDP tcp/443",
            "TFTP tcp/69, LDAP udp/389, Syslog tcp/514, NTP tcp/25",
            "SMTP tcp/110, SNMP tcp/161, DHCP udp/53, SSH tcp/23",
          ],
          correct_choice: "A",
          explanation: "Choice A is the only all-correct set. FTP commonly uses tcp/21 for control, DNS uses udp/53, HTTPS uses tcp/443, and SMB uses tcp/445.",
          domain: 1,
          week: 1,
          source_path: "courses/Network+/pbqs/port-number-matching/index.html",
        },
      ],
    },
  };
})();
