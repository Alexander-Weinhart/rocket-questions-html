#!/usr/bin/env python3
"""
NETC-121 Practice Quiz GUI
Cross-platform desktop app for Windows, macOS, and Linux.

Features:
- CSV-backed MCQ question bank (A/B/C/D choices)
- Easy / Medium / Hard modes
- User-selectable number of questions
- Live grading and running score
- Final percentage + letter grade
- "Outside course scope" flag (Easy/Medium only) reassigns question to Hard
"""

from __future__ import annotations

import csv
import hashlib
import random
import re
import tkinter as tk
import platform
import subprocess
import tempfile
from datetime import datetime
from pathlib import Path
from tkinter import filedialog, messagebox, ttk


QUESTION_BANK_PATH = Path(__file__).with_name("question_bank.csv")
CHANGES_PATH = Path(__file__).with_name("changes.csv")
REPORTS_DIR = Path(__file__).with_name("quiz_reports")
HISTORY_PATH = Path(__file__).with_name("question_history.csv")
APP_ICON_PATH = Path(__file__).with_name("rocket_icon.png")
NOTES_ROOT = Path(__file__).resolve().parent.parent
NOTE_DIRS = [
    NOTES_ROOT / "Notes List A - Video Content",
    NOTES_ROOT / "Notes List B - Textbook Content",
    NOTES_ROOT / "Notes List C - Personal Notes",
    NOTES_ROOT / "Notes List D - Quiz 4 Incorrect Answers",
]
MASTER_LIST_PATH = NOTES_ROOT / "MASTER LIST" / "Master List.md"

EASY_PATH_MARKERS = [
    "notes list b - textbook content/textbook 1 - chapter 2 network fundamentals",
    "notes list b - textbook content/textbook 2 - chapter 1 protocols and standards",
]

EASY_TOPIC_KEYWORDS = [
    "layer 1",
    "layer 2",
    "layer 3",
    "physical",
    "data link",
    "network layer",
    "frame",
    "packet",
    "switch",
    "ethernet cable",
    "cat5",
    "cat5e",
    "cat6",
    "cat6a",
    "encapsulation",
    "unicast",
    "broadcast",
    "multicast",
    "frame structure",
    "frame fields",
    "dhcp",
    "dora",
    "wireshark",
    "arp",
    "rarp",
    "duplex",
    "half-duplex",
    "full-duplex",
    "interference",
    "emi",
    "rfi",
    "ipv4",
    "ipv6",
    "ip address",
    "delivery truck",
    "packets versus frames",
]
QUESTION_BANK_CACHE: list[dict[str, str]] = []
QUESTION_BANK_MTIMES: dict[str, float | None] = {}
HISTORY_CORRECT_KEYS: set[str] = set()
HISTORY_MTIME: float | None = None
WEEK_CHOICES = (1, 2, 3, 4, 5, 6)
WEEK_QUESTION_BANK_PATHS = {week: Path(__file__).with_name(f"week{week}_question_bank.csv") for week in WEEK_CHOICES}
VIDEO_WEEK_MAP = {
    1: 3,
    2: 3,
    3: 3,
    4: 4,
    5: 4,
    6: 4,
    7: 5,
    8: 5,
    9: 5,
    10: 6,
    11: 6,
}
TEXTBOOK_WEEK_MARKERS = [
    ("textbook 1 - chapter 1", 1),
    ("textbook 1 - chapter 2", 2),
    ("textbook 2 - chapter 1", 3),
    ("textbook 2 - chapter 2", 4),
    ("textbook 2 - chapter 3", 4),
    ("textbook 2 - chapter 5", 5),
    ("textbook 2 - chapter 6", 5),
    ("textbook 2 - chapter 7", 6),
]


SEED_QUESTIONS = [
    # Easy
    {
        "difficulty": "easy",
        "question": "Which OSI layer handles logical IP addressing and routing?",
        "a": "Layer 2 - Data Link",
        "b": "Layer 3 - Network",
        "c": "Layer 4 - Transport",
        "d": "Layer 7 - Application",
        "correct": "B",
        "explanation": "Layer 3 handles IP addresses and routing decisions.",
    },
    {
        "difficulty": "easy",
        "question": "Which protocol is used to securely access a remote CLI?",
        "a": "Telnet",
        "b": "HTTP",
        "c": "SSH",
        "d": "FTP",
        "correct": "C",
        "explanation": "SSH encrypts remote terminal sessions.",
    },
    {
        "difficulty": "easy",
        "question": "What does DHCP primarily do?",
        "a": "Resolves domain names",
        "b": "Assigns IP settings automatically",
        "c": "Encrypts packets",
        "d": "Detects collisions on Wi-Fi",
        "correct": "B",
        "explanation": "DHCP provides IP address, mask, gateway, DNS, and lease.",
    },
    {
        "difficulty": "easy",
        "question": "What is the broadcast MAC address?",
        "a": "00:00:00:00:00:00",
        "b": "FF:FF:FF:FF:FF:FF",
        "c": "AA:AA:AA:AA:AA:AA",
        "d": "11:22:33:44:55:66",
        "correct": "B",
        "explanation": "All 1s in MAC form is the Ethernet broadcast address.",
    },
    {
        "difficulty": "easy",
        "question": "Which port is used by HTTPS?",
        "a": "80",
        "b": "53",
        "c": "443",
        "d": "22",
        "correct": "C",
        "explanation": "HTTPS uses TCP 443 by default.",
    },
    {
        "difficulty": "easy",
        "question": "In a /24 network, which address is typically the broadcast?",
        "a": ".0",
        "b": ".1",
        "c": ".128",
        "d": ".255",
        "correct": "D",
        "explanation": "In a /24, host bits all 1s equals x.x.x.255.",
    },
    {
        "difficulty": "easy",
        "question": "What does ARP resolve?",
        "a": "MAC to DNS",
        "b": "IP to Port",
        "c": "IP to MAC",
        "d": "DNS to IP",
        "correct": "C",
        "explanation": "ARP resolves an IPv4 address to a MAC address on the local LAN.",
    },
    {
        "difficulty": "easy",
        "question": "Which transmission type is one sender to all devices on a LAN?",
        "a": "Unicast",
        "b": "Multicast",
        "c": "Broadcast",
        "d": "Anycast",
        "correct": "C",
        "explanation": "Broadcast reaches all hosts in the local broadcast domain.",
    },
    {
        "difficulty": "easy",
        "question": "Which protocol is connection-oriented and reliable?",
        "a": "UDP",
        "b": "ICMP",
        "c": "TCP",
        "d": "ARP",
        "correct": "C",
        "explanation": "TCP provides sequencing, acknowledgments, and retransmissions.",
    },
    {
        "difficulty": "easy",
        "question": "What does DNS do?",
        "a": "Assigns MAC addresses",
        "b": "Converts names to IP addresses",
        "c": "Provides VPN tunnels",
        "d": "Segments broadcast domains",
        "correct": "B",
        "explanation": "DNS maps human-readable names to IPs.",
    },
    {
        "difficulty": "easy",
        "question": "Which device mainly forwards based on MAC addresses?",
        "a": "Router",
        "b": "Switch",
        "c": "Hub",
        "d": "DNS server",
        "correct": "B",
        "explanation": "Switches forward frames using a MAC table.",
    },
    {
        "difficulty": "easy",
        "question": "What is APIPA range used for DHCP failure fallback?",
        "a": "10.0.0.0/8",
        "b": "172.16.0.0/12",
        "c": "192.168.0.0/16",
        "d": "169.254.0.0/16",
        "correct": "D",
        "explanation": "APIPA addresses are in 169.254.0.0/16.",
    },
    # Medium
    {
        "difficulty": "medium",
        "question": "Which two steps of DORA are typically broadcasts from the client?",
        "a": "Offer and Acknowledge",
        "b": "Discover and Request",
        "c": "Discover and Offer",
        "d": "Request and Acknowledge",
        "correct": "B",
        "explanation": "Client Discover and Request are broadcasts in common LAN setup.",
    },
    {
        "difficulty": "medium",
        "question": "What does TTL prevent in IP networks?",
        "a": "ARP spoofing",
        "b": "Broadcast storms",
        "c": "Infinite routing loops",
        "d": "Port exhaustion",
        "correct": "C",
        "explanation": "TTL decrements each hop and drops packets at 0.",
    },
    {
        "difficulty": "medium",
        "question": "Which field is used by Ethernet for frame integrity checking?",
        "a": "TTL",
        "b": "FCS with CRC",
        "c": "DSCP",
        "d": "ACK number",
        "correct": "B",
        "explanation": "Ethernet frame check sequence contains CRC result.",
    },
    {
        "difficulty": "medium",
        "question": "Why are MAC addresses changed at each router hop?",
        "a": "Routers encrypt each packet",
        "b": "Layer 2 is local to each link segment",
        "c": "TCP requires new MAC per segment",
        "d": "DNS refreshes MAC mappings",
        "correct": "B",
        "explanation": "Routers decapsulate and re-encapsulate with next-hop Layer 2 headers.",
    },
    {
        "difficulty": "medium",
        "question": "How many usable hosts are in a /30 IPv4 subnet?",
        "a": "1",
        "b": "2",
        "c": "4",
        "d": "6",
        "correct": "B",
        "explanation": "A /30 has 4 total addresses, 2 usable hosts.",
    },
    {
        "difficulty": "medium",
        "question": "Which protocol/port pair is correct?",
        "a": "DNS - TCP 3389",
        "b": "SSH - TCP 22",
        "c": "DHCP - TCP 67/68",
        "d": "SNMP - TCP 161",
        "correct": "B",
        "explanation": "SSH is TCP 22; DHCP and SNMP are commonly UDP-based.",
    },
    {
        "difficulty": "medium",
        "question": "What is a DHCP reservation?",
        "a": "Entire scope for one VLAN",
        "b": "Permanent static route",
        "c": "Specific MAC always gets specific IP",
        "d": "A blocked exclusion range",
        "correct": "C",
        "explanation": "Reservation binds one MAC to one IP from DHCP logic.",
    },
    {
        "difficulty": "medium",
        "question": "Which statement about half-duplex is true?",
        "a": "Transmit and receive simultaneously",
        "b": "One-way only forever",
        "c": "Both directions, but one at a time",
        "d": "No collisions can happen",
        "correct": "C",
        "explanation": "Half-duplex supports both directions but not at the same time.",
    },
    {
        "difficulty": "medium",
        "question": "Which command scenario most directly maps each hop in a path?",
        "a": "Ping with default settings",
        "b": "Traceroute using increasing TTL",
        "c": "ARP scan of local LAN",
        "d": "DNS zone transfer",
        "correct": "B",
        "explanation": "Traceroute relies on TTL expiration replies hop-by-hop.",
    },
    {
        "difficulty": "medium",
        "question": "Which is true about UDP compared to TCP?",
        "a": "UDP guarantees ordering",
        "b": "UDP has larger header overhead",
        "c": "UDP has no built-in retransmission",
        "d": "UDP requires 3-way handshake",
        "correct": "C",
        "explanation": "UDP is connectionless and does not provide retransmit/order guarantees.",
    },
    {
        "difficulty": "medium",
        "question": "A switch receives an unknown unicast destination. What is the usual behavior?",
        "a": "Drop immediately",
        "b": "Send to default gateway only",
        "c": "Flood out all other ports in VLAN",
        "d": "Convert to broadcast at Layer 3",
        "correct": "C",
        "explanation": "Unknown unicast flooding occurs until MAC table learns destination port.",
    },
    {
        "difficulty": "medium",
        "question": "What does a zero receive window in TCP indicate?",
        "a": "Network cable unplugged",
        "b": "Receiver buffer full, sender should pause",
        "c": "SYN flood condition",
        "d": "Encryption negotiation failed",
        "correct": "B",
        "explanation": "TCP flow control window of 0 means temporary stop.",
    },
    {
        "difficulty": "medium",
        "question": "Which best defines jitter?",
        "a": "Maximum throughput",
        "b": "Packet loss percentage",
        "c": "Variation in latency over time",
        "d": "Average CPU load on router",
        "correct": "C",
        "explanation": "Jitter is inconsistency in packet delay, critical for voice/video.",
    },
    {
        "difficulty": "medium",
        "question": "Why are routers said to stop broadcasts?",
        "a": "They disable all multicast traffic",
        "b": "They do not forward Layer 2 broadcast frames between subnets",
        "c": "They delete DHCP leases by default",
        "d": "They convert every broadcast to unicast",
        "correct": "B",
        "explanation": "Broadcasts are Layer 2 domain-local and not routed by default.",
    },
    # Hard
    {
        "difficulty": "hard",
        "question": "Which protocol is most associated with path-vector routing on the public internet?",
        "a": "OSPF",
        "b": "RIP",
        "c": "BGP",
        "d": "EIGRP",
        "correct": "C",
        "explanation": "BGP is the inter-domain routing protocol of the internet.",
    },
    {
        "difficulty": "hard",
        "question": "In CIDR, what is a key benefit over classful addressing?",
        "a": "Eliminates need for subnet masks",
        "b": "Supports variable-length prefixes for efficient allocation",
        "c": "Requires fewer routers",
        "d": "Replaces DNS",
        "correct": "B",
        "explanation": "CIDR allows flexible prefix lengths and route aggregation.",
    },
    {
        "difficulty": "hard",
        "question": "Which attack abuses ARP trust to intercept local traffic?",
        "a": "SYN ACK reflection",
        "b": "ARP spoofing/poisoning",
        "c": "DNSSEC downgrade",
        "d": "MAC flooding at Layer 3",
        "correct": "B",
        "explanation": "ARP has no authentication, enabling false mapping injection.",
    },
    {
        "difficulty": "hard",
        "question": "What is the primary purpose of MPLS labels in WANs?",
        "a": "Encrypt traffic payload",
        "b": "Replace IP headers entirely",
        "c": "Enable fast forwarding based on labels",
        "d": "Provide DNS caching",
        "correct": "C",
        "explanation": "MPLS forwards on labels, often improving traffic engineering behavior.",
    },
    {
        "difficulty": "hard",
        "question": "Which statement about /31 IPv4 links is most accurate today?",
        "a": "Always invalid because no broadcast exists",
        "b": "Commonly usable on point-to-point links (RFC 3021)",
        "c": "Required for all WAN links",
        "d": "Only used for loopbacks",
        "correct": "B",
        "explanation": "Modern networks can use /31 for point-to-point with no wasted addresses.",
    },
    {
        "difficulty": "hard",
        "question": "Which DNS record type maps a name to an IPv6 address?",
        "a": "A",
        "b": "PTR",
        "c": "CNAME",
        "d": "AAAA",
        "correct": "D",
        "explanation": "AAAA records hold IPv6 addresses.",
    },
    {
        "difficulty": "hard",
        "question": "What does TCP TIME_WAIT primarily protect against?",
        "a": "Packet encryption failures",
        "b": "Old duplicate segments affecting new connection reuse",
        "c": "ARP cache poisoning",
        "d": "DNS cache misses",
        "correct": "B",
        "explanation": "TIME_WAIT allows old in-flight packets to expire safely.",
    },
    {
        "difficulty": "hard",
        "question": "Which control-plane protocol is often used to prevent switching loops?",
        "a": "DHCP",
        "b": "STP/RSTP",
        "c": "FTP",
        "d": "SNMP traps",
        "correct": "B",
        "explanation": "Spanning Tree blocks redundant paths to avoid Layer 2 loops.",
    },
    {
        "difficulty": "hard",
        "question": "Which metric is most directly tied to real-time voice quality degradation?",
        "a": "MTU size only",
        "b": "ARP timeout only",
        "c": "High jitter and packet loss",
        "d": "DNS TTL only",
        "correct": "C",
        "explanation": "Voice traffic is highly sensitive to delay variation and loss.",
    },
    {
        "difficulty": "hard",
        "question": "Which best describes SD-WAN compared with classic private WAN design?",
        "a": "Single fixed path only",
        "b": "Policy-based path selection over multiple transports",
        "c": "No encryption support",
        "d": "Only for home networks",
        "correct": "B",
        "explanation": "SD-WAN dynamically chooses links based on policies and app needs.",
    },
    {
        "difficulty": "hard",
        "question": "Why might a firewall allow outbound DNS UDP 53 but also need TCP 53?",
        "a": "TCP handles large responses and zone transfers",
        "b": "UDP cannot carry DNS at all",
        "c": "TCP 53 is only for DHCP relay",
        "d": "UDP 53 is deprecated",
        "correct": "A",
        "explanation": "DNS mostly uses UDP but falls back to TCP for larger exchanges and transfers.",
    },
    {
        "difficulty": "hard",
        "question": "Which IPv6 behavior replaced most broadcast use cases?",
        "a": "Anycast only",
        "b": "Multicast and solicited-node mechanisms",
        "c": "RARP",
        "d": "Classful addressing",
        "correct": "B",
        "explanation": "IPv6 generally uses multicast instead of broadcast.",
    },
    {
        "difficulty": "hard",
        "question": "If a switch CAM table is flooded with fake MACs, likely impact is:",
        "a": "All routing protocols stop",
        "b": "Switch behaves more like a hub for unknown destinations",
        "c": "DHCP scopes are erased",
        "d": "OSPF adjacency resets only",
        "correct": "B",
        "explanation": "CAM exhaustion can cause excessive flooding behavior.",
    },
    {
        "difficulty": "hard",
        "question": "Which field identifies the upper-layer protocol inside an IPv4 packet?",
        "a": "EtherType",
        "b": "Protocol",
        "c": "DSCP",
        "d": "Fragment Offset",
        "correct": "B",
        "explanation": "IPv4 Protocol field indicates TCP, UDP, ICMP, and others.",
    },
    {
        "difficulty": "hard",
        "question": "Which statement best distinguishes private vs public IP addressing?",
        "a": "Private addresses are globally routed by default",
        "b": "Public addresses are never unique",
        "c": "Private addresses are reused internally and need NAT for internet egress",
        "d": "Public addresses work only on Wi-Fi",
        "correct": "C",
        "explanation": "Private ranges are not internet-routable without translation.",
    },
]


def _make_mcq(
    question: str,
    correct: str,
    distractors: list[str],
    difficulty: str,
    explanation: str,
) -> dict[str, str]:
    uniq: list[str] = []
    for d in distractors:
        if d != correct and d not in uniq:
            uniq.append(d)
    filler = [
        "All of the above",
        "None of the above",
        "Depends on topology",
        "Cannot be determined",
    ]
    for d in filler:
        if len(uniq) >= 3:
            break
        if d != correct and d not in uniq:
            uniq.append(d)

    h = int(hashlib.sha1(question.encode("utf-8")).hexdigest(), 16)
    correct_pos = h % 4
    choices = uniq[:3]
    choices.insert(correct_pos, correct)
    letters = ["A", "B", "C", "D"]
    return {
        "difficulty": difficulty,
        "question": question,
        "a": choices[0],
        "b": choices[1],
        "c": choices[2],
        "d": choices[3],
        "correct": letters[correct_pos],
        "explanation": explanation,
    }


def build_bulk_questions() -> list[dict[str, str]]:
    bulk: list[dict[str, str]] = []

    port_facts = [
        ("HTTP", 80, "TCP", "cleartext web traffic"),
        ("HTTPS", 443, "TCP", "encrypted web traffic"),
        ("SSH", 22, "TCP", "secure remote terminal"),
        ("Telnet", 23, "TCP", "legacy insecure terminal"),
        ("DNS", 53, "UDP", "name resolution queries"),
        ("SMTP", 25, "TCP", "sending email"),
        ("POP3", 110, "TCP", "pulling email from server"),
        ("IMAP", 143, "TCP", "mailbox sync"),
        ("DHCP Server", 67, "UDP", "server side DHCP"),
        ("DHCP Client", 68, "UDP", "client side DHCP"),
        ("SNMP", 161, "UDP", "network management polling"),
        ("SNMP Trap", 162, "UDP", "async management alerts"),
        ("NTP", 123, "UDP", "time sync"),
        ("LDAP", 389, "TCP", "directory access"),
        ("SMB", 445, "TCP", "windows file sharing"),
        ("RDP", 3389, "TCP", "remote desktop"),
        ("FTP Control", 21, "TCP", "ftp command channel"),
        ("FTP Data", 20, "TCP", "ftp data channel"),
        ("TFTP", 69, "UDP", "simple file transfer"),
    ]
    all_ports = [p for _, p, _, _ in port_facts]
    all_names = [n for n, _, _, _ in port_facts]
    for name, port, transport, purpose in port_facts:
        wrong_ports = [str(p) for p in all_ports if p != port][:8]
        wrong_names = [n for n in all_names if n != name][:8]
        bulk.append(
            _make_mcq(
                f"Which default port is associated with {name}?",
                str(port),
                wrong_ports,
                "easy",
                f"{name} commonly uses port {port}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"Which protocol/service most commonly uses port {port}?",
                name,
                wrong_names,
                "medium",
                f"Port {port} maps to {name}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"Which transport protocol is most commonly used by {name} on port {port}?",
                transport,
                ["UDP" if transport == "TCP" else "TCP", "ICMP", "ARP", "IP"],
                "medium",
                f"{name} typically uses {transport}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"What is the main purpose of {name} traffic?",
                purpose,
                [
                    "dynamic routing updates",
                    "link-layer collision detection",
                    "frame checksum generation",
                    "arp table poisoning prevention",
                ],
                "easy",
                f"{name} is mainly used for {purpose}.",
            )
        )

    osi_facts = [
        (1, "Physical", "Network Access", "Bits", "cables, signals, connectors"),
        (2, "Data Link", "Network Access", "Frame", "local delivery by MAC"),
        (3, "Network", "Internet", "Packet", "routing with IP"),
        (4, "Transport", "Transport", "Segment/Datagram", "end-to-end delivery and ports"),
        (5, "Session", "Application", "Data", "session control"),
        (6, "Presentation", "Application", "Data", "format/encryption"),
        (7, "Application", "Application", "Data", "user-facing network services"),
    ]
    layer_names = [name for _, name, _, _, _ in osi_facts]
    for layer, name, tcpip, pdu, role in osi_facts:
        bulk.append(
            _make_mcq(
                f"Which OSI layer is Layer {layer}?",
                name,
                [n for n in layer_names if n != name],
                "easy",
                f"OSI Layer {layer} is {name}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"OSI {name} layer maps most directly to which TCP/IP layer?",
                tcpip,
                ["Application", "Transport", "Internet", "Network Access"],
                "medium",
                f"{name} maps to TCP/IP {tcpip}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"What PDU is most associated with OSI {name} layer?",
                pdu,
                ["Bits", "Frame", "Packet", "Segment/Datagram", "Data"],
                "medium",
                f"{name} typically handles {pdu}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"Which statement best describes OSI {name} layer?",
                role,
                [
                    "assigning dhcp leases",
                    "converting fqdn to ip globally",
                    "building spanning tree",
                    "performing nat translations only",
                ],
                "hard",
                f"{name} layer is primarily about {role}.",
            )
        )

    mask_map = {
        8: "255.0.0.0",
        16: "255.255.0.0",
        24: "255.255.255.0",
        25: "255.255.255.128",
        26: "255.255.255.192",
        27: "255.255.255.224",
        28: "255.255.255.240",
        29: "255.255.255.248",
        30: "255.255.255.252",
    }
    prefixes = list(mask_map.keys())
    for pfx, mask in mask_map.items():
        wrong_masks = [m for k, m in mask_map.items() if k != pfx]
        bulk.append(
            _make_mcq(
                f"Which subnet mask matches /{pfx}?",
                mask,
                wrong_masks,
                "easy" if pfx in (8, 16, 24) else "medium",
                f"/{pfx} corresponds to {mask}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"Which CIDR prefix matches subnet mask {mask}?",
                f"/{pfx}",
                [f"/{x}" for x in prefixes if x != pfx],
                "medium",
                f"Mask {mask} is CIDR /{pfx}.",
            )
        )

    rng = random.Random(121)
    seen_questions: set[str] = set()
    for _ in range(700):
        pfx = rng.choice([24, 25, 26, 27, 28, 29, 30])
        oct2 = rng.randint(16, 31) if rng.choice([True, False]) else rng.randint(0, 255)
        if rng.choice([True, False]):
            base = f"192.168.{rng.randint(0,255)}.0"
        elif rng.choice([True, False]):
            base = f"10.{rng.randint(0,255)}.{rng.randint(0,255)}.0"
        else:
            base = f"172.{oct2}.{rng.randint(0,255)}.0"
        usable = (2 ** (32 - pfx)) - 2
        if pfx == 30:
            difficulty = "hard"
        elif pfx >= 28:
            difficulty = "medium"
        else:
            difficulty = "easy"
        q = f"For subnet {base}/{pfx}, how many usable host addresses are available?"
        if q in seen_questions:
            continue
        seen_questions.add(q)
        bulk.append(
            _make_mcq(
                q,
                str(usable),
                [
                    str(max(1, usable - 1)),
                    str(usable + 1),
                    str((2 ** (32 - pfx))),
                    str(max(1, usable // 2)),
                ],
                difficulty,
                f"Usable hosts for /{pfx} is 2^(32-{pfx}) - 2 = {usable}.",
            )
        )

    values = [1, 2, 4, 8, 16, 32, 64, 128, 192, 224, 240, 248, 252, 254, 255]
    for val in values:
        binary = format(val, "08b")
        wrong_bin = [format(x, "08b") for x in values if x != val][:8]
        wrong_dec = [str(x) for x in values if x != val][:8]
        bulk.append(
            _make_mcq(
                f"What is decimal value of binary {binary}?",
                str(val),
                wrong_dec,
                "easy",
                f"{binary} in binary equals {val}.",
            )
        )
        bulk.append(
            _make_mcq(
                f"What is binary form of decimal {val}?",
                binary,
                wrong_bin,
                "easy",
                f"{val} in decimal equals {binary}.",
            )
        )

    concept_items = [
        ("Which protocol resolves IPv4 address to MAC?", "ARP", ["RARP", "DNS", "ICMP"], "easy"),
        ("Which protocol is connectionless?", "UDP", ["TCP", "SSH", "TLS"], "easy"),
        ("Which protocol uses echo request/reply for testing reachability?", "ICMP", ["ARP", "DNS", "TCP"], "easy"),
        ("Which address range is APIPA?", "169.254.0.0/16", ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"], "easy"),
        ("Which protocol is most associated with encrypted remote login?", "SSH", ["Telnet", "HTTP", "FTP"], "easy"),
        ("Which layer performs routing decisions?", "Layer 3 (Network)", ["Layer 2 (Data Link)", "Layer 1 (Physical)", "Layer 7 (Application)"], "easy"),
        ("Which attack fills TCP half-open connection table entries?", "SYN flood", ["ARP flood", "DNS recursion", "MAC aging"], "hard"),
        ("Which mechanism forwards DHCP requests across subnets?", "DHCP relay / IP helper", ["Spanning Tree", "ARP proxy only", "NAT overload"], "medium"),
        ("Which DNS record maps host name to IPv6 address?", "AAAA", ["A", "MX", "PTR"], "hard"),
        ("Which topology offers highest path redundancy?", "Full mesh", ["Bus", "Star", "Ring"], "medium"),
    ]
    for idx in range(50):
        c = concept_items[idx % len(concept_items)]
        bulk.append(
            _make_mcq(
                f"{c[0]} (variant {idx + 1})",
                c[1],
                c[2],
                c[3],
                f"{c[1]} is the best match for this concept.",
            )
        )

    return bulk


def letter_grade(percent: float) -> str:
    if percent >= 90:
        return "A"
    if percent >= 80:
        return "B"
    if percent >= 70:
        return "C"
    if percent >= 60:
        return "D"
    return "F"


def infer_topic(question_text: str) -> str:
    q = question_text.lower()
    topic_rules = [
        (["osi", "layer", "pdu", "encapsulation", "decapsulation", "tcp/ip"], "Models and Layers"),
        (["dhcp", "dora", "lease", "reservation", "scope", "apipa"], "DHCP"),
        (["dns", "fqdn", "resolver", "aaaa", "record"], "DNS and Naming"),
        (["tcp", "udp", "port", "handshake", "ack", "window", "syn", "fin", "rst"], "Transport and Ports"),
        (["arp", "rarp", "mac", "switch", "frame", "ethernet", "fcs", "crc"], "Data Link and Ethernet"),
        (["ip", "subnet", "cidr", "ttl", "icmp", "route", "router", "nat", "/"], "IP Addressing and Routing"),
        (["latency", "jitter", "throughput", "loss"], "Performance and Troubleshooting"),
        (["ddos", "spoof", "security", "telnet", "ssh", "https"], "Security"),
        (["topology", "mesh", "star", "bus", "ring", "wan"], "Topologies and WAN"),
    ]
    for words, topic in topic_rules:
        if any(w in q for w in words):
            return topic
    return "General Networking Fundamentals"


def normalize_key(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r"`+", "", s)
    s = re.sub(r"\*+", "", s)
    s = re.sub(r"[_#>\-]+", " ", s)
    s = re.sub(r"\s+", " ", s)
    return s.strip()


def extract_markdown_points(path: Path) -> list[str]:
    points: list[str] = []
    banned_phrases = [
        "propaganda",
        "nuclear attack",
        "tim berners",
        "berners-lee",
        "personal note",
    ]
    try:
        content = path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return points

    for raw in content.splitlines():
        line = raw.strip()
        if not line or line == "---":
            continue
        if re.match(r"^\|?[-:\s]+\|[-|:\s]*$", line):
            continue
        if line.startswith(">"):
            continue

        if re.match(r"^#{1,6}\s+", line):
            line = re.sub(r"^#{1,6}\s+", "", line)
        elif re.match(r"^[-*]\s+", line):
            line = re.sub(r"^[-*]\s+", "", line)
        elif re.match(r"^\d+\.\s+", line):
            line = re.sub(r"^\d+\.\s+", "", line)
        elif line.startswith("|"):
            line = line.strip("|").strip()
            parts = [p.strip() for p in line.split("|")]
            if len(parts) >= 2:
                line = " | ".join(parts)

        line = re.sub(r"\s+", " ", line).strip()
        if len(line) < 12:
            continue
        lower = line.lower()
        if any(bp in lower for bp in banned_phrases):
            continue
        points.append(line)
    return points


def _select_distractors(pool: list[str], seed: str, count: int = 3) -> list[str]:
    unique = list(dict.fromkeys(pool))
    if len(unique) <= count:
        return unique[:count]
    rnd = random.Random(hashlib.sha1(seed.encode("utf-8")).hexdigest())
    return rnd.sample(unique, count)


def in_easy_scope(source_path: str, concept: str, aspect: str) -> bool:
    src = source_path.lower()
    if any(marker in src for marker in EASY_PATH_MARKERS):
        return True
    combined = f"{concept} {aspect}".lower()
    return any(k in combined for k in EASY_TOPIC_KEYWORDS)


def build_master_hard_questions() -> list[dict[str, str]]:
    if not MASTER_LIST_PATH.exists():
        return []
    points = extract_markdown_points(MASTER_LIST_PATH)
    uniq_points = []
    seen = set()
    for p in points:
        k = normalize_key(p)
        if not k or k in seen:
            continue
        seen.add(k)
        uniq_points.append(p)

    records: list[dict[str, str]] = []
    for pt in uniq_points:
        distractors = _select_distractors([x for x in uniq_points if x != pt], pt, 3)
        q = _make_mcq(
            question="Which statement aligns with comprehensive Network 1 review material?",
            correct=pt,
            distractors=distractors,
            difficulty="hard",
            explanation="Source: Master List comprehensive review.",
        )
        q["concept_key"] = "hard master list"
        q["aspect_key"] = normalize_key(pt)
        q["source"] = MASTER_LIST_PATH.as_posix()
        records.append(q)
    return records


def build_hard_expansion_questions() -> list[dict[str, str]]:
    advanced_bank = [
        ("Which protocol is used for inter-domain routing on the public internet?", "BGP", ["OSPF", "RIP", "STP"], "BGP is the internet's path-vector routing protocol."),
        ("Which Layer 2 mechanism helps prevent loops in switched networks?", "STP/RSTP", ["DHCP Relay", "NAT", "ARP"], "Spanning Tree blocks redundant loops."),
        ("Which concept allows one public IP to map many private sessions?", "PAT (NAT overload)", ["CIDR", "VLAN", "SNMP Trap"], "PAT multiplexes sessions using ports."),
        ("What does VLAN trunking primarily do?", "Carries multiple VLANs over one link", ["Disables broadcasts", "Encrypts traffic by default", "Replaces routing"], "802.1Q trunks tag frames for VLAN transport."),
        ("Which DNS security extension adds record authenticity checking?", "DNSSEC", ["DHCP Snooping", "ARP Inspection", "Port Security"], "DNSSEC validates DNS data integrity/authenticity."),
        ("Which IPv6 method provides automatic host addressing without stateful DHCP?", "SLAAC", ["RARP", "PAT", "PPPoE"], "SLAAC uses router advertisements."),
        ("Which metric is commonly prioritized in QoS for voice traffic?", "Low latency and jitter", ["Maximum MTU only", "Largest window size", "Longest TTL"], "Real-time media is jitter/latency sensitive."),
        ("Which tool category is used to observe packet flows at interface level?", "Packet analyzer", ["Compiler", "Hypervisor", "Version control"], "Packet analyzers inspect frame/packet details."),
        ("What is a key benefit of route summarization?", "Smaller routing tables", ["Higher cable bandwidth", "Automatic encryption", "No need for DNS"], "Summarization reduces route table complexity."),
        ("Which technology commonly provides encrypted site-to-site connectivity over public networks?", "IPsec VPN", ["ARP", "STP", "CSMA/CD"], "IPsec protects traffic across untrusted paths."),
        ("What does MTU mismatch commonly cause?", "Fragmentation or dropped packets", ["Faster convergence", "Better DNS caching", "ARP table expansion"], "MTU inconsistencies can break large packets."),
        ("Which security control limits unknown MAC addresses on a switch port?", "Port security", ["NTP", "DHCP Offer", "ICMP Echo"], "Port security restricts MAC usage per port."),
    ]
    records: list[dict[str, str]] = []
    for idx, (question, correct, wrong, explanation) in enumerate(advanced_bank, start=1):
        q = _make_mcq(
            question=question,
            correct=correct,
            distractors=wrong,
            difficulty="hard",
            explanation=explanation,
        )
        q["concept_key"] = "hard expansion"
        q["aspect_key"] = normalize_key(f"{idx} {question}")
        q["source"] = "hard_expansion"
        records.append(q)
    return records


def default_generated_questions() -> list[dict[str, str]]:
    coverage_questions = build_note_coverage_questions()
    hard_from_master = build_master_hard_questions()
    hard_expansion = build_hard_expansion_questions()
    hard_seed = [q for q in SEED_QUESTIONS if q["difficulty"] == "hard"]
    return coverage_questions + hard_from_master + hard_expansion + hard_seed


def write_question_bank_csv(records: list[dict[str, str]], csv_path: Path) -> None:
    csv_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "difficulty",
        "question",
        "choice_a",
        "choice_b",
        "choice_c",
        "choice_d",
        "correct_choice",
        "explanation",
        "concept_key",
        "aspect_key",
        "source_path",
    ]
    with open(csv_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for q in records:
            writer.writerow(
                {
                    "difficulty": q.get("difficulty", "medium").lower(),
                    "question": q.get("question", "").strip(),
                    "choice_a": q.get("a", q.get("choice_a", "")).strip(),
                    "choice_b": q.get("b", q.get("choice_b", "")).strip(),
                    "choice_c": q.get("c", q.get("choice_c", "")).strip(),
                    "choice_d": q.get("d", q.get("choice_d", "")).strip(),
                    "correct_choice": q.get("correct", q.get("correct_choice", "A")).upper(),
                    "explanation": q.get("explanation", "").strip(),
                    "concept_key": q.get("concept_key", normalize_key(infer_topic(q.get("question", "")))),
                    "aspect_key": q.get("aspect_key", normalize_key(q.get("question", ""))),
                    "source_path": q.get("source", q.get("source_path", "generated")),
                }
            )


def ensure_human_question_bank() -> None:
    # CSV is the standalone source of truth. If missing, bootstrap once.
    if QUESTION_BANK_PATH.exists():
        return
    write_question_bank_csv(default_generated_questions(), QUESTION_BANK_PATH)


def load_questions_from_csv(csv_path: Path) -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    if not csv_path.exists():
        return records

    with open(csv_path, "r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            question = (row.get("question") or "").strip()
            a = (row.get("choice_a") or "").strip()
            b = (row.get("choice_b") or "").strip()
            c = (row.get("choice_c") or "").strip()
            d = (row.get("choice_d") or "").strip()
            correct = (row.get("correct_choice") or "A").strip().upper()
            difficulty = (row.get("difficulty") or "medium").strip().lower()
            if not question or not a or not b or not c or not d:
                continue
            if correct not in {"A", "B", "C", "D"}:
                continue
            if difficulty not in {"easy", "medium", "hard"}:
                difficulty = "medium"

            concept_key = (row.get("concept_key") or "").strip() or normalize_key(infer_topic(question))
            aspect_key = (row.get("aspect_key") or "").strip() or normalize_key(question)
            explanation = (row.get("explanation") or "").strip()
            correct_text = {"A": a, "B": b, "C": c, "D": d}[correct]
            if not explanation:
                explanation = f"Correct answer: {correct}. {correct_text}"
            records.append(
                {
                    "difficulty": difficulty,
                    "question": question,
                    "a": a,
                    "b": b,
                    "c": c,
                    "d": d,
                    "correct": correct,
                    "explanation": explanation,
                    "concept_key": concept_key,
                    "aspect_key": aspect_key,
                    "source": (row.get("source_path") or "question_bank.csv").strip(),
                }
            )
    return records


def build_note_coverage_questions() -> list[dict[str, str]]:
    records: list[dict[str, str]] = []
    seen_aspect_by_concept: set[tuple[str, str]] = set()
    all_points: list[dict[str, str]] = []

    for note_dir in NOTE_DIRS:
        if not note_dir.exists():
            continue
        for md in sorted(note_dir.rglob("*.md")):
            concept = md.stem.replace("-", " ").strip()
            points = extract_markdown_points(md)
            for pt in points:
                aspect_key = normalize_key(pt)
                if not aspect_key:
                    continue
                concept_key = normalize_key(concept)
                key = (concept_key, aspect_key)
                if key in seen_aspect_by_concept:
                    continue
                seen_aspect_by_concept.add(key)
                all_points.append(
                    {
                        "concept": concept,
                        "concept_key": concept_key,
                        "aspect_text": pt,
                        "aspect_key": aspect_key,
                        "source": md.as_posix(),
                    }
                )

    if not all_points:
        return records

    by_concept: dict[str, list[dict[str, str]]] = {}
    for p in all_points:
        by_concept.setdefault(p["concept_key"], []).append(p)

    global_texts = [p["aspect_text"] for p in all_points]
    for p in all_points:
        concept_pool = [x["aspect_text"] for x in by_concept[p["concept_key"]] if x["aspect_key"] != p["aspect_key"]]
        distractors = _select_distractors(concept_pool, p["aspect_text"], 3)
        if len(distractors) < 3:
            fallback = [t for t in global_texts if t != p["aspect_text"] and t not in distractors]
            distractors.extend(_select_distractors(fallback, p["aspect_text"] + "fallback", 3 - len(distractors)))

        source_path = p["source"]
        difficulty = "easy" if in_easy_scope(source_path, p["concept"], p["aspect_text"]) else "medium"

        q = _make_mcq(
            question=f"Which statement best matches this Network 1 topic: {p['concept']}?",
            correct=p["aspect_text"],
            distractors=distractors,
            difficulty=difficulty,
            explanation=f"Source focus: {p['source']}",
        )
        q["concept_key"] = p["concept_key"]
        q["aspect_key"] = p["aspect_key"]
        q["source"] = p["source"]
        records.append(q)

    return records

def _hydrate_runtime_question(q: dict[str, str], idx: int) -> dict[str, str]:
    out = dict(q)
    out["id"] = idx
    out["choice_a"] = out.get("choice_a", out.get("a", ""))
    out["choice_b"] = out.get("choice_b", out.get("b", ""))
    out["choice_c"] = out.get("choice_c", out.get("c", ""))
    out["choice_d"] = out.get("choice_d", out.get("d", ""))
    out["correct_choice"] = out.get("correct_choice", out.get("correct", "A")).upper()
    out["difficulty"] = out.get("difficulty", "medium").lower()
    out["explanation"] = out.get("explanation", "")
    stable = "||".join(
        [
            out.get("question", "").strip(),
            out.get("choice_a", "").strip(),
            out.get("choice_b", "").strip(),
            out.get("choice_c", "").strip(),
            out.get("choice_d", "").strip(),
        ]
    )
    out["question_key"] = hashlib.sha1(stable.encode("utf-8")).hexdigest()
    if "week" in out and out["week"] is not None:
        try:
            out["week"] = int(out["week"])
        except Exception:
            out["week"] = None
    return out


def _save_question_bank_cache() -> None:
    write_question_bank_csv(QUESTION_BANK_CACHE, QUESTION_BANK_PATH)


def _reindex_question_cache() -> None:
    for idx, q in enumerate(QUESTION_BANK_CACHE, start=1):
        q["id"] = idx


def _current_bank_mtimes() -> dict[str, float | None]:
    mtimes: dict[str, float | None] = {}
    for week_path in WEEK_QUESTION_BANK_PATHS.values():
        key = str(week_path)
        if week_path.exists():
            mtimes[key] = week_path.stat().st_mtime
        else:
            mtimes[key] = None
    mtimes[str(QUESTION_BANK_PATH)] = QUESTION_BANK_PATH.stat().st_mtime if QUESTION_BANK_PATH.exists() else None
    return mtimes


def _reload_question_bank_cache(force: bool = False) -> bool:
    """
    Reload question banks if source CSV files changed.
    Returns True when a reload occurred.
    """
    global QUESTION_BANK_CACHE, QUESTION_BANK_MTIMES
    latest_mtimes = _current_bank_mtimes()
    if not force and QUESTION_BANK_MTIMES == latest_mtimes:
        return False

    all_questions: list[dict[str, str]] = []
    for week, week_path in WEEK_QUESTION_BANK_PATHS.items():
        if not week_path.exists():
            continue
        week_rows = load_questions_from_csv(week_path)
        for row in week_rows:
            row["week"] = week
        all_questions.extend(week_rows)

    if not all_questions:
        ensure_human_question_bank()
        all_questions = load_questions_from_csv(QUESTION_BANK_PATH)
    if not all_questions:
        all_questions = default_generated_questions()
        write_question_bank_csv(all_questions, QUESTION_BANK_PATH)
        all_questions = load_questions_from_csv(QUESTION_BANK_PATH)

    QUESTION_BANK_CACHE = [_hydrate_runtime_question(q, idx) for idx, q in enumerate(all_questions, start=1)]
    QUESTION_BANK_MTIMES = latest_mtimes
    return True


def _reload_history_cache(force: bool = False) -> None:
    global HISTORY_CORRECT_KEYS, HISTORY_MTIME
    mtime = HISTORY_PATH.stat().st_mtime if HISTORY_PATH.exists() else None
    if not force and mtime == HISTORY_MTIME:
        return

    keys: set[str] = set()
    if HISTORY_PATH.exists():
        with open(HISTORY_PATH, "r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                if (row.get("result") or "").strip().lower() == "correct":
                    key = (row.get("question_key") or "").strip()
                    if key:
                        keys.add(key)
    HISTORY_CORRECT_KEYS = keys
    HISTORY_MTIME = mtime


def _question_key_from_csv_row(row: dict[str, str]) -> str:
    stable = "||".join(
        [
            (row.get("question") or "").strip(),
            (row.get("choice_a") or "").strip(),
            (row.get("choice_b") or "").strip(),
            (row.get("choice_c") or "").strip(),
            (row.get("choice_d") or "").strip(),
        ]
    )
    return hashlib.sha1(stable.encode("utf-8")).hexdigest()


def _persist_question_difficulty(question_row: dict[str, str], new_difficulty: str) -> bool:
    """
    Persist a difficulty change to the source CSV row.
    Returns True if at least one row was updated.
    """
    candidate_paths: list[Path] = []
    week = question_row.get("week")
    if week in WEEK_QUESTION_BANK_PATHS:
        candidate_paths.append(WEEK_QUESTION_BANK_PATHS[int(week)])
    candidate_paths.append(QUESTION_BANK_PATH)

    qkey = (question_row.get("question_key") or "").strip()
    if not qkey:
        return False

    for path in candidate_paths:
        if not path.exists():
            continue
        with open(path, "r", newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            fieldnames = list(reader.fieldnames or [])
            rows = list(reader)
        if not fieldnames:
            continue
        if "difficulty" not in fieldnames:
            fieldnames = ["difficulty"] + fieldnames

        changed = False
        for row in rows:
            if _question_key_from_csv_row(row) == qkey:
                row["difficulty"] = new_difficulty
                changed = True

        if changed:
            with open(path, "w", newline="", encoding="utf-8") as f:
                writer = csv.DictWriter(f, fieldnames=fieldnames)
                writer.writeheader()
                for row in rows:
                    writer.writerow(row)
            return True
    return False


def append_question_history(question_row: dict[str, str], selected_choice: str, was_correct: bool) -> None:
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "timestamp",
        "question_key",
        "question_id",
        "question",
        "selected_choice",
        "correct_choice",
        "result",
        "difficulty",
        "week",
        "source_path",
    ]
    write_header = not HISTORY_PATH.exists()
    with open(HISTORY_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if write_header:
            writer.writeheader()
        writer.writerow(
            {
                "timestamp": datetime.now().isoformat(timespec="seconds"),
                "question_key": question_row.get("question_key", ""),
                "question_id": question_row.get("id", ""),
                "question": question_row.get("question", ""),
                "selected_choice": selected_choice,
                "correct_choice": question_row.get("correct_choice", ""),
                "result": "correct" if was_correct else "incorrect",
                "difficulty": question_row.get("difficulty", ""),
                "week": question_row.get("week", ""),
                "source_path": question_row.get("source_path", question_row.get("source", "")),
            }
        )
    _reload_history_cache(force=True)


def append_change_request(question_row: dict[str, str], user_feedback: str) -> None:
    CHANGES_PATH.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = [
        "timestamp",
        "question",
        "choice_a",
        "choice_b",
        "choice_c",
        "choice_d",
        "correct_choice",
        "explanation",
        "difficulty",
        "concept_key",
        "aspect_key",
        "source_path",
        "user_feedback",
    ]
    write_header = not CHANGES_PATH.exists()
    with open(CHANGES_PATH, "a", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if write_header:
            writer.writeheader()
        writer.writerow(
            {
                "timestamp": datetime.now().isoformat(timespec="seconds"),
                "question": question_row.get("question", ""),
                "choice_a": question_row.get("choice_a", ""),
                "choice_b": question_row.get("choice_b", ""),
                "choice_c": question_row.get("choice_c", ""),
                "choice_d": question_row.get("choice_d", ""),
                "correct_choice": question_row.get("correct_choice", ""),
                "explanation": question_row.get("explanation", ""),
                "difficulty": question_row.get("difficulty", ""),
                "concept_key": question_row.get("concept_key", ""),
                "aspect_key": question_row.get("aspect_key", ""),
                "source_path": question_row.get("source_path", ""),
                "user_feedback": user_feedback.strip(),
            }
        )


def remove_question_from_bank(question_id: int) -> bool:
    removed = False
    for idx, q in enumerate(list(QUESTION_BANK_CACHE)):
        if int(q.get("id", -1)) == int(question_id):
            QUESTION_BANK_CACHE.pop(idx)
            removed = True
            break
    if removed:
        _reindex_question_cache()
        _save_question_bank_cache()
    return removed


def init_db() -> None:
    _reload_question_bank_cache(force=True)


def infer_week_from_source(source_path: str) -> int | None:
    src = (source_path or "").lower()

    week_match = re.search(r"lecture week\s*(\d+)", src)
    if week_match:
        return int(week_match.group(1))

    video_match = re.search(r"video\s*(\d+)", src)
    if video_match:
        return VIDEO_WEEK_MAP.get(int(video_match.group(1)))

    for marker, week in TEXTBOOK_WEEK_MARKERS:
        if marker in src:
            return week
    return None


def _question_in_selected_weeks(question: dict[str, str], selected_weeks: set[int] | None) -> bool:
    if not selected_weeks:
        return True
    explicit_week = question.get("week")
    if explicit_week is not None:
        try:
            return int(explicit_week) in selected_weeks
        except Exception:
            pass
    source_path = str(question.get("source_path") or question.get("source") or "")
    inferred_week = infer_week_from_source(source_path)
    return inferred_week in selected_weeks


def fetch_random_questions(
    difficulty: str,
    count: int,
    selected_weeks: set[int] | None = None,
    skip_previously_correct: bool = False,
) -> list[dict[str, str]]:
    if difficulty == "medium":
        pool = [
            q
            for q in QUESTION_BANK_CACHE
            if q["difficulty"] in {"easy", "medium"} and _question_in_selected_weeks(q, selected_weeks)
        ]
    else:
        pool = [
            q for q in QUESTION_BANK_CACHE if q["difficulty"] == difficulty and _question_in_selected_weeks(q, selected_weeks)
        ]
    if skip_previously_correct:
        _reload_history_cache()
        pool = [q for q in pool if q.get("question_key") not in HISTORY_CORRECT_KEYS]
    if not pool:
        return []
    if count >= len(pool):
        rows = list(pool)
        random.shuffle(rows)
        return rows
    return random.sample(pool, count)


def count_available(
    difficulty: str,
    selected_weeks: set[int] | None = None,
    skip_previously_correct: bool = False,
) -> int:
    if difficulty == "medium":
        total = sum(
            1
            for q in QUESTION_BANK_CACHE
            if q["difficulty"] in {"easy", "medium"} and _question_in_selected_weeks(q, selected_weeks)
        )
    else:
        total = sum(
            1 for q in QUESTION_BANK_CACHE if q["difficulty"] == difficulty and _question_in_selected_weeks(q, selected_weeks)
        )
    if not skip_previously_correct:
        return total
    _reload_history_cache()
    if difficulty == "medium":
        return sum(
            1
            for q in QUESTION_BANK_CACHE
            if q["difficulty"] in {"easy", "medium"}
            and _question_in_selected_weeks(q, selected_weeks)
            and q.get("question_key") not in HISTORY_CORRECT_KEYS
        )
    return sum(
        1
        for q in QUESTION_BANK_CACHE
        if q["difficulty"] == difficulty
        and _question_in_selected_weeks(q, selected_weeks)
        and q.get("question_key") not in HISTORY_CORRECT_KEYS
    )


def flag_not_covered(question_id: int) -> None:
    target: dict[str, str] | None = None
    for q in QUESTION_BANK_CACHE:
        if int(q.get("id", -1)) == int(question_id):
            q["difficulty"] = "hard"
            q["flagged_not_covered"] = 1
            target = q
            break
    if target is None:
        return
    updated = _persist_question_difficulty(target, "hard")
    if not updated:
        _save_question_bank_cache()


class QuizApp(tk.Tk):
    def __init__(self) -> None:
        super().__init__()
        self.title("NETC-121 Practice Quiz")
        self.geometry("1650x820")
        self.minsize(1570, 760)
        self.configure(bg="#0B1020")
        self._icon_image: tk.PhotoImage | None = None
        self._set_app_icon()

        self.style = ttk.Style(self)
        self.style.theme_use("clam")
        self._configure_styles()

        self.mode_var = tk.StringVar(value="easy")
        self.amount_var = tk.IntVar(value=10)
        self.available_var = tk.StringVar(value="")
        self.mode_desc_var = tk.StringVar(value="")
        self.week_summary_var = tk.StringVar(value="")
        self.difficulty_totals_var = tk.StringVar(value="")
        self.skip_previously_correct_var = tk.BooleanVar(value=False)
        self.week_vars: dict[int, tk.BooleanVar] = {week: tk.BooleanVar(value=True) for week in WEEK_CHOICES}

        self.questions: list[dict[str, str]] = []
        self.current_index = 0
        self.correct_count = 0
        self.answered_count = 0
        self.incorrect_records: list[dict[str, str]] = []
        self.last_report_text = ""
        self.last_auto_report_path = ""
        self.last_mode_finished = "easy"
        self.current_answer_var = tk.StringVar(value="")
        self.current_locked = False

        self._build_ui()
        self._refresh_available_count()

    def _set_app_icon(self) -> None:
        if not APP_ICON_PATH.exists():
            return
        try:
            self._icon_image = tk.PhotoImage(file=str(APP_ICON_PATH))
            self.iconphoto(True, self._icon_image)
        except Exception:
            # Fallback: keep app running even if icon loading fails on a platform.
            self._icon_image = None

    def _configure_styles(self) -> None:
        self.style.configure("Root.TFrame", background="#0B1020")
        self.style.configure("Card.TFrame", background="#121A33", relief="flat")
        self.style.configure(
            "Title.TLabel",
            background="#121A33",
            foreground="#EAF2FF",
            font=("Segoe UI", 24, "bold"),
        )
        self.style.configure(
            "Body.TLabel",
            background="#121A33",
            foreground="#D7E0F3",
            font=("Segoe UI", 11),
        )
        self.style.configure(
            "Body.TCheckbutton",
            background="#121A33",
            foreground="#D7E0F3",
            font=("Segoe UI", 11),
        )
        self.style.map("Body.TCheckbutton", background=[("active", "#121A33")])
        self.style.configure(
            "BigQ.TLabel",
            background="#121A33",
            foreground="#F2F6FF",
            font=("Segoe UI", 14, "bold"),
            wraplength=840,
            justify="left",
        )
        self.style.configure(
            "Choice.TRadiobutton",
            background="#121A33",
            foreground="#E9F1FF",
            font=("Segoe UI", 11),
        )
        self.style.map(
            "Choice.TRadiobutton",
            background=[("active", "#121A33")],
            foreground=[("active", "#FFFFFF")],
        )
        self.style.configure(
            "Accent.TButton",
            background="#4A7CFF",
            foreground="#FFFFFF",
            borderwidth=0,
            focusthickness=3,
            focuscolor="none",
            font=("Segoe UI", 11, "bold"),
            padding=(14, 10),
        )
        self.style.map(
            "Accent.TButton",
            background=[("active", "#5E8CFF"), ("pressed", "#3569EF")],
        )
        self.style.configure(
            "Ghost.TButton",
            background="#1E294A",
            foreground="#DDE8FF",
            borderwidth=0,
            font=("Segoe UI", 10, "bold"),
            padding=(12, 9),
        )
        self.style.map(
            "Ghost.TButton",
            background=[("active", "#2A3965"), ("pressed", "#23325A")],
        )
        self.style.configure(
            "Warn.TButton",
            background="#AB3B5D",
            foreground="#FFFFFF",
            borderwidth=0,
            font=("Segoe UI", 10, "bold"),
            padding=(12, 9),
        )
        self.style.map(
            "Warn.TButton",
            background=[("active", "#BF4A6D"), ("pressed", "#922F4F")],
        )

    def _build_ui(self) -> None:
        root = ttk.Frame(self, style="Root.TFrame", padding=16)
        root.pack(fill="both", expand=True)

        self.card = ttk.Frame(root, style="Card.TFrame", padding=20)
        self.card.pack(fill="both", expand=True)

        self.week_select_screen = ttk.Frame(self.card, style="Card.TFrame")
        self.config_screen = ttk.Frame(self.card, style="Card.TFrame")
        self.quiz_screen = ttk.Frame(self.card, style="Card.TFrame")
        self.review_screen = ttk.Frame(self.card, style="Card.TFrame")

        self._build_week_select_screen()
        self._build_config_screen()
        self._build_quiz_screen()
        self._build_review_screen()
        self._set_quiz_controls_enabled(False)
        self._show_week_select_screen()

    def _build_week_select_screen(self) -> None:
        top = ttk.Frame(self.week_select_screen, style="Card.TFrame")
        top.pack(fill="x", pady=(0, 12))

        ttk.Label(top, text="🗓️ Week Selection", style="Title.TLabel").pack(anchor="w")
        ttk.Label(
            top,
            text="Select one or more weeks (1-6) before opening quiz setup.",
            style="Body.TLabel",
        ).pack(anchor="w", pady=(4, 0))

        checks = ttk.Frame(self.week_select_screen, style="Card.TFrame")
        checks.pack(fill="x", pady=(12, 10))

        for idx, week in enumerate(WEEK_CHOICES):
            cb = ttk.Checkbutton(checks, text=f"Week {week}", variable=self.week_vars[week], style="Body.TCheckbutton")
            cb.grid(row=idx // 3, column=idx % 3, sticky="w", padx=(0, 28), pady=(4, 4))

        actions = ttk.Frame(self.week_select_screen, style="Card.TFrame")
        actions.pack(fill="x", pady=(8, 0))

        ttk.Button(actions, text="Select All", style="Ghost.TButton", command=self._select_all_weeks).pack(side="left")
        ttk.Button(actions, text="Clear All", style="Ghost.TButton", command=self._clear_all_weeks).pack(
            side="left", padx=(10, 0)
        )
        ttk.Button(
            actions, text="Continue to Setup ➡️", style="Accent.TButton", command=self._continue_to_setup
        ).pack(side="right")

    def _build_config_screen(self) -> None:
        top = ttk.Frame(self.config_screen, style="Card.TFrame")
        top.pack(fill="x", pady=(0, 12))

        ttk.Label(top, text="⚙️ Quiz Configuration", style="Title.TLabel").pack(anchor="w")
        ttk.Label(
            top,
            text="Pick mode, choose question count, then start a practice session.",
            style="Body.TLabel",
        ).pack(anchor="w", pady=(4, 0))
        ttk.Label(top, textvariable=self.week_summary_var, style="Body.TLabel").pack(anchor="w", pady=(6, 0))
        ttk.Label(top, textvariable=self.difficulty_totals_var, style="Body.TLabel").pack(anchor="w", pady=(2, 0))

        setup = ttk.Frame(self.config_screen, style="Card.TFrame")
        setup.pack(fill="x", pady=(8, 10))

        ttk.Label(setup, text="Mode", style="Body.TLabel").grid(row=0, column=0, sticky="w")
        mode_combo = ttk.Combobox(
            setup,
            textvariable=self.mode_var,
            values=["easy", "medium", "hard"],
            state="readonly",
            width=14,
        )
        mode_combo.grid(row=1, column=0, sticky="w", pady=(4, 0))
        mode_combo.bind("<<ComboboxSelected>>", self._on_mode_changed)

        ttk.Label(setup, text="Questions", style="Body.TLabel").grid(row=0, column=1, sticky="w", padx=(16, 0))
        spin = ttk.Spinbox(setup, from_=1, to=100, textvariable=self.amount_var, width=8)
        spin.grid(row=1, column=1, sticky="w", padx=(16, 0), pady=(4, 0))

        ttk.Label(setup, textvariable=self.available_var, style="Body.TLabel").grid(
            row=1, column=2, sticky="w", padx=(18, 0), pady=(4, 0)
        )

        self.start_btn = ttk.Button(setup, text="Start Quiz 🚀", style="Accent.TButton", command=self.start_quiz)
        self.start_btn.grid(row=1, column=3, sticky="e", padx=(22, 0), pady=(2, 0))
        ttk.Button(setup, text="Change Weeks 🗓️", style="Ghost.TButton", command=self._show_week_select_screen).grid(
            row=1, column=4, sticky="e", padx=(10, 0), pady=(2, 0)
        )
        ttk.Checkbutton(
            setup,
            text="Skip Previously Correct Questions",
            variable=self.skip_previously_correct_var,
            style="Body.TCheckbutton",
            command=self._refresh_available_count,
        ).grid(row=2, column=0, columnspan=3, sticky="w", pady=(8, 0))
        setup.columnconfigure(4, weight=1)

        desc_card = ttk.Frame(self.config_screen, style="Card.TFrame")
        desc_card.pack(fill="x", pady=(12, 0))
        ttk.Label(desc_card, text="Mode Descriptions", style="Body.TLabel").pack(anchor="w")
        ttk.Label(desc_card, textvariable=self.mode_desc_var, style="Body.TLabel", wraplength=860, justify="left").pack(
            anchor="w", pady=(8, 0)
        )

    def _build_quiz_screen(self) -> None:
        top = ttk.Frame(self.quiz_screen, style="Card.TFrame")
        top.pack(fill="x", pady=(0, 12))
        ttk.Label(top, text="⚡ NETC-121 Practice Quiz", style="Title.TLabel").pack(anchor="w")
        ttk.Label(
            top,
            text="Answer questions, see live scoring, and finish for final grade.",
            style="Body.TLabel",
        ).pack(anchor="w", pady=(4, 0))

        self.quiz_meta_lbl = ttk.Label(self.quiz_screen, text="", style="Body.TLabel")
        self.quiz_meta_lbl.pack(anchor="w", pady=(0, 6))

        self.score_live_lbl = ttk.Label(self.quiz_screen, text="", style="Body.TLabel")
        self.score_live_lbl.pack(anchor="w", pady=(0, 12))

        self.question_lbl = ttk.Label(self.quiz_screen, text="Click Start Quiz to begin.", style="BigQ.TLabel")
        self.question_lbl.pack(anchor="w", fill="x", pady=(8, 10))

        self.answer_frame = ttk.Frame(self.quiz_screen, style="Card.TFrame")
        self.answer_frame.pack(fill="x")

        self.choice_buttons: dict[str, ttk.Radiobutton] = {}
        for idx, choice in enumerate(["A", "B", "C", "D"]):
            rb = ttk.Radiobutton(
                self.answer_frame,
                text=f"{choice}. ",
                value=choice,
                variable=self.current_answer_var,
                style="Choice.TRadiobutton",
            )
            rb.grid(row=idx, column=0, sticky="w", pady=6)
            self.choice_buttons[choice] = rb

        self.feedback_lbl = ttk.Label(self.quiz_screen, text="", style="Body.TLabel")
        self.feedback_lbl.pack(anchor="w", pady=(14, 6))

        actions = ttk.Frame(self.quiz_screen, style="Card.TFrame")
        actions.pack(fill="x", pady=(8, 0))

        self.submit_btn = ttk.Button(actions, text="Submit Answer ✅", style="Accent.TButton", command=self.submit_answer)
        self.submit_btn.pack(side="left")

        self.next_btn = ttk.Button(actions, text="Next Question ➡️", style="Ghost.TButton", command=self.next_question)
        self.next_btn.pack(side="left", padx=(10, 0))

        self.flag_btn = ttk.Button(
            actions,
            text="Not in Current Course Scope 🚩",
            style="Warn.TButton",
            command=self.flag_current_question,
        )
        self.flag_btn.pack(side="left", padx=(10, 0))

        self.ineffective_btn = ttk.Button(
            actions,
            text="Ineffective Question 📝",
            style="Warn.TButton",
            command=self.mark_ineffective_question,
        )
        self.ineffective_btn.pack(side="left", padx=(10, 0))

        self.end_btn = ttk.Button(actions, text="Finish Quiz 🏁", style="Ghost.TButton", command=self.finish_quiz)
        self.end_btn.pack(side="right")

        self.back_btn = ttk.Button(actions, text="Back to Setup ⬅️", style="Ghost.TButton", command=self._show_config_screen)
        self.back_btn.pack(side="right", padx=(10, 0))

    def _build_review_screen(self) -> None:
        top = ttk.Frame(self.review_screen, style="Card.TFrame")
        top.pack(fill="x", pady=(0, 12))
        ttk.Label(top, text="🧾 Quiz Review Report", style="Title.TLabel").pack(anchor="w")
        ttk.Label(
            top,
            text="Incorrect questions with selected answer and correct answer.",
            style="Body.TLabel",
        ).pack(anchor="w", pady=(4, 0))
        ttk.Button(top, text="Back to Setup ⬅️", style="Ghost.TButton", command=self._reset_to_setup).pack(
            anchor="w", pady=(10, 0)
        )

        self.review_summary_lbl = ttk.Label(self.review_screen, text="", style="Body.TLabel")
        self.review_summary_lbl.pack(anchor="w", pady=(0, 10))
        ttk.Label(
            self.review_screen,
            text=(
                "Print tip: Click 'Copy Report', paste into a text document (Notepad/TextEdit/Word), "
                "then print from that document. You can also use 'Download Report'."
            ),
            style="Body.TLabel",
            wraplength=860,
            justify="left",
        ).pack(anchor="w", pady=(0, 10))

        text_wrap = ttk.Frame(self.review_screen, style="Card.TFrame")
        text_wrap.pack(fill="both", expand=True)

        self.review_text = tk.Text(
            text_wrap,
            wrap="word",
            bg="#0E1730",
            fg="#EAF2FF",
            insertbackground="#EAF2FF",
            relief="flat",
            font=("Consolas", 11),
            padx=12,
            pady=12,
        )
        self.review_text.pack(side="left", fill="both", expand=True)
        self.review_text.configure(state="disabled")

        scroll = ttk.Scrollbar(text_wrap, orient="vertical", command=self.review_text.yview)
        scroll.pack(side="right", fill="y")
        self.review_text.configure(yscrollcommand=scroll.set)

        actions = ttk.Frame(self.review_screen, style="Card.TFrame")
        actions.pack(fill="x", pady=(12, 0))

        ttk.Button(actions, text="Copy Report 📋", style="Ghost.TButton", command=self.copy_review_text).pack(
            side="left"
        )
        ttk.Button(actions, text="Download Report 💾", style="Ghost.TButton", command=self.save_review_text).pack(
            side="left", padx=(10, 0)
        )
        ttk.Button(actions, text="Print Report 🖨️", style="Accent.TButton", command=self.print_review_text).pack(
            side="left", padx=(10, 0)
        )
        self.retake_incorrect_btn = ttk.Button(
            actions, text="Retake Incorrect Only 🔁", style="Accent.TButton", command=self.retake_incorrect_only
        )
        self.retake_incorrect_btn.pack(side="left", padx=(10, 0))
        ttk.Button(actions, text="Back to Setup ⬅️", style="Ghost.TButton", command=self._reset_to_setup).pack(
            side="right"
        )

    def _selected_weeks(self) -> set[int]:
        return {week for week, var in self.week_vars.items() if var.get()}

    def _select_all_weeks(self) -> None:
        for var in self.week_vars.values():
            var.set(True)
        self._refresh_available_count()

    def _clear_all_weeks(self) -> None:
        for var in self.week_vars.values():
            var.set(False)
        self._refresh_available_count()

    def _continue_to_setup(self) -> None:
        if not self._selected_weeks():
            messagebox.showwarning("Select Weeks", "Choose at least one week to continue.")
            return
        self._show_config_screen()

    def _show_week_select_screen(self) -> None:
        self.config_screen.pack_forget()
        self.quiz_screen.pack_forget()
        self.review_screen.pack_forget()
        self.week_select_screen.pack(fill="both", expand=True)

    def _show_config_screen(self) -> None:
        self.week_select_screen.pack_forget()
        self.quiz_screen.pack_forget()
        self.review_screen.pack_forget()
        self.config_screen.pack(fill="both", expand=True)
        self._refresh_available_count()

    def _show_quiz_screen(self) -> None:
        self.week_select_screen.pack_forget()
        self.config_screen.pack_forget()
        self.review_screen.pack_forget()
        self.quiz_screen.pack(fill="both", expand=True)

    def _show_review_screen(self) -> None:
        self.week_select_screen.pack_forget()
        self.config_screen.pack_forget()
        self.quiz_screen.pack_forget()
        self.review_screen.pack(fill="both", expand=True)

    def _on_mode_changed(self, _event: tk.Event | None = None) -> None:
        self._refresh_available_count()

    def _refresh_available_count(self) -> None:
        _reload_question_bank_cache()
        mode = self.mode_var.get().strip().lower()
        selected_weeks = self._selected_weeks()
        skip_correct = self.skip_previously_correct_var.get()
        available = count_available(mode, selected_weeks, skip_correct)
        easy_total = count_available("easy", selected_weeks, skip_correct)
        medium_total = count_available("medium", selected_weeks, skip_correct)
        hard_total = count_available("hard", selected_weeks, skip_correct)
        self.available_var.set(f"Available in {mode.title()}: {available}")
        self.difficulty_totals_var.set(
            f"Possible Questions by Difficulty -> Easy: {easy_total} | Medium (incl. Easy): {medium_total} | Hard: {hard_total}"
        )
        if selected_weeks:
            weeks = ", ".join(str(w) for w in sorted(selected_weeks))
            self.week_summary_var.set(f"Selected Weeks: {weeks}")
        else:
            self.week_summary_var.set("Selected Weeks: none")
        descriptions = {
            "easy": "Easy: Core fundamentals in the class for beginners.",
            "medium": "Medium: All questions that have to do with the scope of the class.",
            "hard": "Hard: Advanced expansion topics that expand on topics taught in class.",
        }
        self.mode_desc_var.set(descriptions.get(mode, ""))

    def _set_quiz_controls_enabled(self, enabled: bool) -> None:
        state = "normal" if enabled else "disabled"
        for rb in self.choice_buttons.values():
            rb.configure(state=state)
        self.submit_btn.configure(state=state)
        self.next_btn.configure(state=state)
        self.end_btn.configure(state=state)
        self.ineffective_btn.configure(state=state)
        if enabled:
            self._update_flag_button_state()
        else:
            self.flag_btn.configure(state="disabled")
            self.ineffective_btn.configure(state="disabled")

    def _update_flag_button_state(self) -> None:
        if not self.questions:
            self.flag_btn.configure(state="disabled")
            self.ineffective_btn.configure(state="disabled")
            return
        mode = self.mode_var.get().lower()
        if mode == "hard":
            self.flag_btn.configure(state="disabled")
        else:
            self.flag_btn.configure(state="normal")
        self.ineffective_btn.configure(state="normal")

    def _update_live_score(self) -> None:
        if self.answered_count == 0:
            self.score_live_lbl.configure(text="Live Score: 0/0 (0.0%) | Letter: N/A")
            return
        pct = (self.correct_count / self.answered_count) * 100
        self.score_live_lbl.configure(
            text=f"Live Score: {self.correct_count}/{self.answered_count} ({pct:.1f}%) | Letter: {letter_grade(pct)}"
        )

    def start_quiz(self) -> None:
        _reload_question_bank_cache()
        mode = self.mode_var.get().strip().lower()
        req_count = max(1, int(self.amount_var.get()))
        selected_weeks = self._selected_weeks()
        skip_correct = self.skip_previously_correct_var.get()
        if not selected_weeks:
            messagebox.showerror("No Weeks Selected", "Select at least one week before starting a quiz.")
            return

        available = count_available(mode, selected_weeks, skip_correct)
        if available == 0:
            messagebox.showerror("No Questions", f"No questions are available in {mode.title()} mode.")
            return

        use_count = min(req_count, available)
        if use_count < req_count:
            messagebox.showinfo(
                "Adjusted Question Count",
                f"Requested {req_count}, but only {available} are available in {mode.title()}.\nUsing {use_count}.",
            )

        self.questions = fetch_random_questions(mode, use_count, selected_weeks, skip_correct)
        random.shuffle(self.questions)
        self.last_mode_finished = mode
        self.current_index = 0
        self.correct_count = 0
        self.answered_count = 0
        self.incorrect_records = []
        self.last_report_text = ""
        self.last_auto_report_path = ""
        self.current_answer_var.set("")
        self.current_locked = False

        self._show_quiz_screen()
        self._set_quiz_controls_enabled(True)
        self._update_live_score()
        self._render_current_question()

    def _render_current_question(self) -> None:
        if not self.questions or self.current_index >= len(self.questions):
            self.finish_quiz()
            return

        row = self.questions[self.current_index]
        qnum = self.current_index + 1
        total = len(self.questions)
        mode = self.mode_var.get().title()

        self.quiz_meta_lbl.configure(text=f"Mode: {mode} | Question {qnum} of {total}")
        self.question_lbl.configure(text=f"❓ {row['question']}")
        self.choice_buttons["A"].configure(text=f"A. {row['choice_a']}")
        self.choice_buttons["B"].configure(text=f"B. {row['choice_b']}")
        self.choice_buttons["C"].configure(text=f"C. {row['choice_c']}")
        self.choice_buttons["D"].configure(text=f"D. {row['choice_d']}")

        self.current_answer_var.set("")
        self.current_locked = False
        self.feedback_lbl.configure(text="")
        for rb in self.choice_buttons.values():
            rb.configure(state="normal")

        self.submit_btn.configure(state="normal")
        self.next_btn.configure(state="disabled")
        self._update_flag_button_state()

    def submit_answer(self) -> None:
        if self.current_locked or not self.questions:
            return

        selected = self.current_answer_var.get().strip().upper()
        if selected not in {"A", "B", "C", "D"}:
            messagebox.showwarning("Choose an Answer", "Select A, B, C, or D before submitting.")
            return

        row = self.questions[self.current_index]
        correct = row["correct_choice"].upper()
        explanation = row["explanation"] or ""

        self.answered_count += 1
        if selected == correct:
            self.correct_count += 1
            append_question_history(row, selected, True)
            self.feedback_lbl.configure(text=f"✅ Correct! {explanation}")
        else:
            append_question_history(row, selected, False)
            right_text = row[f"choice_{correct.lower()}"]
            selected_text = row[f"choice_{selected.lower()}"]
            self.incorrect_records.append(
                {
                    "question": row["question"],
                    "selected_letter": selected,
                    "selected_text": selected_text,
                    "correct_letter": correct,
                    "correct_text": right_text,
                    "explanation": explanation,
                }
            )
            self.feedback_lbl.configure(text=f"❌ Incorrect. Correct answer: {correct}. {right_text}\n{explanation}")

        self._update_live_score()
        self.current_locked = True
        for rb in self.choice_buttons.values():
            rb.configure(state="disabled")
        self.submit_btn.configure(state="disabled")
        self.next_btn.configure(state="normal")

    def next_question(self) -> None:
        if not self.questions:
            return
        self.current_index += 1
        self._render_current_question()

    def flag_current_question(self) -> None:
        if not self.questions:
            return
        mode = self.mode_var.get().strip().lower()
        if mode == "hard":
            return
        if self.current_locked:
            messagebox.showinfo(
                "Already Answered",
                "This question was already answered. Use this action before submitting to skip without grade impact.",
            )
            return
        row = self.questions[self.current_index]
        flag_not_covered(int(row["id"]))
        self.feedback_lbl.configure(text="🚩 Reassigned to Hard mode and skipped (no impact on grade).")
        self._refresh_available_count()

        # Skip the current question as if it was never asked.
        self.questions.pop(self.current_index)
        if self.current_index >= len(self.questions) and self.current_index > 0:
            self.current_index -= 1

        if not self.questions:
            if self.answered_count > 0:
                self.finish_quiz()
            else:
                messagebox.showinfo(
                    "Session Updated",
                    "Question moved to Hard mode and skipped. No questions remain in this session.",
                )
                self._reset_to_setup()
            return
        self._render_current_question()

    def mark_ineffective_question(self) -> None:
        if not self.questions:
            return

        dialog = tk.Toplevel(self)
        dialog.title("Mark Ineffective Question")
        dialog.transient(self)
        dialog.grab_set()
        dialog.geometry("760x680")
        dialog.configure(bg="#121A33")

        ttk.Label(
            dialog,
            text="Why is this question ineffective? (required)",
            style="Body.TLabel",
        ).pack(anchor="w", padx=14, pady=(14, 8))

        text = tk.Text(
            dialog,
            wrap="word",
            height=24,
            bg="#0E1730",
            fg="#EAF2FF",
            insertbackground="#EAF2FF",
            relief="flat",
            font=("Consolas", 10),
            padx=10,
            pady=10,
        )
        text.pack(fill="both", expand=True, padx=14)

        btn_row = ttk.Frame(dialog, style="Card.TFrame")
        btn_row.pack(fill="x", padx=14, pady=(10, 14))

        def submit_feedback() -> None:
            feedback = text.get("1.0", "end").strip()
            if not feedback:
                messagebox.showwarning("Feedback Required", "Please explain why the question is ineffective.")
                return
            dialog.destroy()
            self._apply_ineffective_feedback(feedback)

        ttk.Button(btn_row, text="Submit Feedback ✅", style="Accent.TButton", command=submit_feedback).pack(
            side="left"
        )
        ttk.Button(btn_row, text="Cancel", style="Ghost.TButton", command=dialog.destroy).pack(side="left", padx=(10, 0))

    def _apply_ineffective_feedback(self, feedback: str) -> None:
        if not self.questions:
            return
        row = self.questions[self.current_index]
        selected = self.current_answer_var.get().strip().upper()

        append_change_request(row, feedback)
        removed = remove_question_from_bank(int(row["id"]))
        if not removed:
            messagebox.showerror("Update Failed", "Could not remove this question from the main question bank.")
            return

        # If this question was already submitted, remove its impact from grading.
        if self.current_locked and selected in {"A", "B", "C", "D"} and self.answered_count > 0:
            self.answered_count -= 1
            if selected == row["correct_choice"].upper() and self.correct_count > 0:
                self.correct_count -= 1
            else:
                removed_one = False
                filtered: list[dict[str, str]] = []
                for rec in self.incorrect_records:
                    if (
                        not removed_one
                        and rec.get("question") == row.get("question")
                        and rec.get("selected_letter") == selected
                    ):
                        removed_one = True
                        continue
                    filtered.append(rec)
                self.incorrect_records = filtered
            self._update_live_score()

        self.questions.pop(self.current_index)
        if self.current_index >= len(self.questions) and self.current_index > 0:
            self.current_index -= 1

        self.feedback_lbl.configure(
            text="📝 Question marked ineffective, saved to changes.csv, and removed from the main question bank."
        )
        self._refresh_available_count()

        if not self.questions:
            if self.answered_count > 0:
                self.finish_quiz()
            else:
                messagebox.showinfo("Session Updated", "Question removed. No more questions remain in this session.")
                self._reset_to_setup()
            return
        self._render_current_question()

    def finish_quiz(self) -> None:
        if self.answered_count == 0:
            messagebox.showinfo("Quiz Ended", "No answers submitted yet.")
            self._show_config_screen()
            return

        pct = (self.correct_count / self.answered_count) * 100
        grade = letter_grade(pct)
        self.last_mode_finished = self.mode_var.get().strip().lower()
        report = self._build_review_report(pct, grade)
        self.last_report_text = report
        self.last_auto_report_path = self.auto_save_review_report(report)
        if self.incorrect_records:
            self.retake_incorrect_btn.configure(state="normal")
        else:
            self.retake_incorrect_btn.configure(state="disabled")
        self.review_summary_lbl.configure(
            text=f"Answered: {self.answered_count} | Correct: {self.correct_count} | "
            f"Score: {pct:.2f}% | Letter: {grade} | Auto-saved: {Path(self.last_auto_report_path).name}"
        )
        self._set_review_text(report)
        self._show_review_screen()

    def retake_incorrect_only(self) -> None:
        if not self.incorrect_records:
            messagebox.showinfo("No Incorrect Questions", "There are no incorrect questions to retake.")
            return

        wrong_questions = {rec["question"] for rec in self.incorrect_records}
        mode = self.last_mode_finished
        if mode == "medium":
            allowed = {"easy", "medium"}
        else:
            allowed = {mode}
        rows = [q for q in QUESTION_BANK_CACHE if q["difficulty"] in allowed and q["question"] in wrong_questions]
        selected_weeks = self._selected_weeks()
        rows = [q for q in rows if _question_in_selected_weeks(q, selected_weeks)]

        if not rows:
            messagebox.showerror("Retake Failed", "Could not load incorrect questions for retake.")
            return

        self.questions = list(rows)
        random.shuffle(self.questions)
        self.current_index = 0
        self.correct_count = 0
        self.answered_count = 0
        self.incorrect_records = []
        self.last_report_text = ""
        self.last_auto_report_path = ""
        self.current_answer_var.set("")
        self.current_locked = False

        self.mode_var.set(mode)
        self._set_quiz_controls_enabled(True)
        self._update_live_score()
        self._show_quiz_screen()
        self._render_current_question()

    def _build_review_report(self, pct: float, grade: str) -> str:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        mode = self.mode_var.get().strip().title()
        topics_to_review = sorted({infer_topic(rec["question"]) for rec in self.incorrect_records})
        lines: list[str] = [
            "NETC-121 QUIZ REVIEW REPORT",
            "=" * 72,
            f"Generated: {timestamp}",
            f"Mode: {mode}",
            f"Answered: {self.answered_count}",
            f"Correct: {self.correct_count}",
            f"Score: {pct:.2f}%",
            f"Letter Grade: {grade}",
            "",
            "Incorrect Questions",
            "-" * 72,
        ]

        if not self.incorrect_records:
            lines.append("None. Great job, no incorrect responses.")
        else:
            for idx, rec in enumerate(self.incorrect_records, start=1):
                lines.append(f"{idx}. Question: {rec['question']}")
                lines.append(f"   Selected answer: {rec['selected_letter']}. {rec['selected_text']}")
                lines.append(f"   Correct answer: {rec['correct_letter']}. {rec['correct_text']}")
                lines.append(f"   Explanation: {rec.get('explanation', '').strip()}")
                lines.append(f"   Topic: {infer_topic(rec['question'])}")
                lines.append("")
        lines.append("")
        lines.append("Topics to Review")
        lines.append("-" * 72)
        if topics_to_review:
            for topic in topics_to_review:
                lines.append(f"- {topic}")
        else:
            lines.append("- Continue balanced review across all modules.")
        return "\n".join(lines)

    def auto_save_review_report(self, report_text: str) -> str:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        stamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        mode = self.mode_var.get().strip().lower()
        file_path = REPORTS_DIR / f"netc_practice_review_{mode}_{stamp}.txt"
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(report_text)
        return str(file_path)

    def _set_review_text(self, text: str) -> None:
        self.review_text.configure(state="normal")
        self.review_text.delete("1.0", "end")
        self.review_text.insert("1.0", text)
        self.review_text.configure(state="disabled")

    def copy_review_text(self) -> None:
        if not self.last_report_text:
            return
        self.clipboard_clear()
        self.clipboard_append(self.last_report_text)
        self.update()
        messagebox.showinfo("Copied", "Report copied to clipboard.")

    def save_review_text(self) -> None:
        if not self.last_report_text:
            return
        file_path = filedialog.asksaveasfilename(
            title="Save Quiz Review Report",
            defaultextension=".txt",
            filetypes=[("Text files", "*.txt"), ("All files", "*.*")],
            initialfile="netc_quiz_review_report.txt",
        )
        if not file_path:
            return
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(self.last_report_text)
        messagebox.showinfo("Saved", f"Report saved to:\n{file_path}")

    def print_review_text(self) -> None:
        if not self.last_report_text:
            return

        with tempfile.NamedTemporaryFile("w", delete=False, suffix=".txt", encoding="utf-8") as tf:
            tf.write(self.last_report_text)
            temp_path = tf.name

        system = platform.system().lower()
        try:
            if "windows" in system:
                subprocess.Popen(["notepad.exe", "/p", temp_path])
            elif "darwin" in system:
                subprocess.run(["lp", temp_path], check=True)
            else:
                try:
                    subprocess.run(["lp", temp_path], check=True)
                except Exception:
                    subprocess.run(["lpr", temp_path], check=True)
            messagebox.showinfo("Print Sent", "Formatted report sent to printer queue.")
        except Exception as exc:
            messagebox.showerror(
                "Print Failed",
                "Could not print automatically.\n"
                f"Reason: {exc}\n\n"
                "Use Download Report and print the saved file with any text editor.",
            )

    def _reset_to_setup(self) -> None:
        self.questions = []
        self.current_index = 0
        self.current_locked = False
        self.last_auto_report_path = ""
        self.question_lbl.configure(text="Click Start Quiz to begin.")
        self.quiz_meta_lbl.configure(text="")
        self.feedback_lbl.configure(text="")
        self.current_answer_var.set("")
        self._set_quiz_controls_enabled(False)
        self._update_live_score()
        self._refresh_available_count()
        self._show_config_screen()


def main() -> None:
    init_db()
    app = QuizApp()
    app.mainloop()


if __name__ == "__main__":
    main()
