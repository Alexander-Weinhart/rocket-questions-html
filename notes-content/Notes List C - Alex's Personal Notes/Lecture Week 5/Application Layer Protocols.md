# 🌐 Application Layer Protocols

> **Lecture note:** The application layer is not explained in detail in this class. The goal is enough knowledge to **understand what you're seeing in Wireshark** — recognise a protocol name, know roughly what it does, and know if it uses TCP, UDP, or ICMP.

The Application layer is the interface between user programs and the network. Browsers, email clients, file transfer tools — all live here.

---

## Protocol Reference Table

| Protocol | Full Name | Port | TCP / UDP / ICMP | Purpose |
|---|---|---|---|---|
| **HTTP** | HyperText Transfer Protocol | 80 | TCP | Unencrypted web browsing |
| **HTTPS** | HTTP Secure | 443 | TCP | Encrypted web browsing (TLS) |
| **SNMP** | Simple Network Management Protocol | 161 (queries) / 162 (traps) | UDP | Monitor and manage network devices remotely |
| **ping** | — | — | ICMP (type 8 req / type 0 reply) | Test reachability, measure latency |
| **tracert/traceroute** | — | — | ICMP (type 11 time exceeded) | Map the route and hops to a destination |
| **DNS** | Domain Name System | 53 | UDP (queries) / TCP (zone transfers) | Resolve domain names to IP addresses |
| **FTP** | File Transfer Protocol | 20 (data) / 21 (control) | TCP | Transfer files — cleartext |
| **TFTP** | Trivial File Transfer Protocol | 69 | UDP | Simple file transfer, no auth — used for firmware/config |
| **NTP** | Network Time Protocol | 123 | UDP | Synchronise clocks across network devices |

---

## Notes on Each Protocol

### HTTP / HTTPS
- HTTP = plaintext — Wireshark can read everything including passwords
- HTTPS = TLS encrypted — Wireshark sees gibberish
- Both use TCP because web pages must arrive complete

### SNMP
- Used by network management software (SolarWinds, PRTG, Nagios)
- UDP because monitoring polls are small and speed matters; a missed poll just tries again
- **Traps** (port 162) = device sends an alert to the management server unsolicited

### ping / tracert
- Not a "protocol" in the application sense — uses raw **ICMP**
- `ping` = ICMP Echo Request (type 8) → Echo Reply (type 0)
- `tracert` = exploits ICMP Time Exceeded (type 11) messages at each hop

### DNS
- Uses **UDP** for standard queries (fast, small packets)
- Uses **TCP** when the response is too large for one UDP packet, or for **zone transfers** (full DNS database replication between servers)
- If you see DNS over TCP in Wireshark, it's usually a zone transfer

### FTP
- Two ports: **21** for commands (login, cd, ls) and **20** for actual data transfer
- Cleartext — username and password visible in Wireshark
- Replaced by **SFTP** (SSH-based) or **FTPS** (FTP over TLS) in secure environments

### TFTP
- Stripped-down FTP — no authentication, no directory listing
- Used for: router/switch firmware upgrades, PXE booting, config file backups
- UDP because it's designed for small trusted networks where reliability is assumed

### NTP
- Every device on a network needs accurate time (for logs, Kerberos authentication, certificate validation)
- UDP because time sync packets are small and frequent; a missed packet just waits for the next one
- Stratum system: Stratum 0 = atomic clock, Stratum 1 = directly synced to atomic, Stratum 2 = synced to Stratum 1...

---

## TCP vs UDP vs ICMP — Quick Rule

```
Needs reliability (data must arrive complete)?  → TCP
Fast, small, or real-time?                      → UDP
Network diagnostic / error reporting?          → ICMP
```

---

## Key Points

- 📌 Application layer = where user programs meet the network
- 📌 This layer is learned enough to **read Wireshark** — not in deep detail
- 📌 HTTP (80) TCP / HTTPS (443) TCP / DNS (53) UDP+TCP / FTP (20/21) TCP
- 📌 TFTP (69) UDP / NTP (123) UDP / SNMP (161/162) UDP
- 📌 ping and tracert use **ICMP**, not TCP or UDP
