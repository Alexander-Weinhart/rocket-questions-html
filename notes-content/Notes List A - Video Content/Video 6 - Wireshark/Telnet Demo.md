# 🔓 Wireshark Telnet Demo

This demo captures a live Telnet session to a Cisco 3750 switch and shows how **every keystroke and credential is visible in plaintext** — no decryption required.

---

## Setup

| Field | Value |
|---|---|
| Client IP | 192.168.1.85 |
| Target device | Cisco 3750 switch at 192.168.254.x |
| Protocol | Telnet (port 23) |
| Wireshark filter | `telnet` |

---

## What the Demo Shows

The operator connects to the switch via Telnet. In Wireshark, each packet contains the raw characters typed or received.

```
Wireshark capture (telnet filter):

Packet 1:  → "w"
Packet 2:  → "i"
Packet 3:  → "r"
Packet 4:  → "e"
Packet 5:  → "s"
...

(Each keypress is a separate packet — fully readable)
```

Credentials visible in capture:

| Username | Password |
|---|---|
| wireshark | cisco |
| bob | cisco |
| david | [encrypted — service password-encryption was set] |

---

## Following the TCP Stream

Using **Follow → TCP Stream** reassembles the entire session:

```
Blue (switch output):
  User Access Verification
  Username:

Red (what was typed):
  wireshark
  cisco

Blue:
  3750# show version
  Cisco IOS Software, Version 12.2...

Red:
  show run
  exit
```

Every command, every response, the entire session — readable by anyone on the network with Wireshark running.

---

## Why This Is a Security Disaster

- Anyone on the same network segment can run Wireshark
- Telnet sends **zero encryption** — username, password, commands, output all in plaintext
- Even a port SPAN or RSPAN on a managed switch lets an attacker capture remote traffic

> ⚠️ **Telnet should never be used on any network.** SSH (Secure Shell) encrypts the entire session — Wireshark captures it but cannot read it.

---

## Key Points

- 📌 Telnet transmits everything in **cleartext** — visible in Wireshark with no effort
- 📌 **Follow → TCP Stream** shows the complete login session
- 📌 Blue = switch output, Red = what you typed
- 📌 Credentials and commands are fully exposed to anyone sniffing the network
- 📌 Modern standard: use **SSH** instead — Wireshark goes blind
