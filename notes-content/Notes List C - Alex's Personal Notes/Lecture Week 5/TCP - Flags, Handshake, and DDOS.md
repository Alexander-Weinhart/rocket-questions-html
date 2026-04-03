# 🔗 TCP — Flags, Handshake, and DDoS

TCP (Transmission Control Protocol) is the reliable, connection-oriented transport protocol. This note covers ACKs, TCP flags, the 3-way handshake, sequence numbers, and how DDoS attacks exploit the handshake.

---

## ACK Packets

Every TCP segment sent must be **acknowledged** by the receiver. The ACK (Acknowledgment) is TCP's confirmation mechanism.

```
Sender ──── [Data, seq=100] ────────────────────► Receiver
Sender ◄─── [ACK, ack=101] ─────────────────────  Receiver
            "Got seq 100, send seq 101 next"
```

- ACK number = next expected sequence number
- If no ACK arrives within a timeout, TCP **retransmits** the segment
- ACKs are the backbone of TCP reliability

---

## Sequence Numbers and the Sliding Window

Every byte of TCP data is assigned a **sequence number**. The receiver uses these to:
- Detect missing segments (gap in sequence numbers = something was lost)
- Reorder out-of-order segments
- Prevent duplicate data

> **The range of sequence numbers currently in flight (sent but not yet ACK'd) is called the sliding window.**

```
Sequence space:

Already ACK'd │ Sent, awaiting ACK  │ Can send next │ Not yet allowed
──────────────┼─────────────────────┼───────────────┼────────────────
  [1–100]     │     [101–200]       │   [201–300]   │    [301+]
              └──── sliding window ─┘
                      size = 100

As ACKs arrive, the window slides right ──────────────────────────►
```

The window size is set by the receiver and tells the sender how much data can be in flight at once.

---

## TCP Flags — Items in the TCP Header

TCP flags are **1-bit fields in the TCP header** that control how the connection behaves. They are sometimes called IP options in loose usage, but technically they live in the **TCP header**.

| Flag | Full Name | Purpose |
|---|---|---|
| **SYN** | Synchronize | Opens a connection; synchronizes sequence numbers |
| **ACK** | Acknowledgment | Confirms receipt; present in almost all packets after initial SYN |
| **RST** | Reset | Hard-kills a connection immediately |
| **FIN** | Finish | Gracefully signals "I'm done sending" |
| **PSH** | Push | Tell receiver to pass data up immediately (not buffer) |
| **URG** | Urgent | Urgent data — process this first |

---

## The 3-Way Handshake

Before any data flows, TCP establishes a connection using exactly three messages:

```
Client                              Server
  │                                    │
  │──── SYN (seq=x) ──────────────────►│   "I want to connect, my seq starts at x"
  │                                    │
  │◄─── SYN + ACK (seq=y, ack=x+1) ───│   "OK, my seq starts at y, I got your x"
  │                                    │
  │──── ACK (ack=y+1) ────────────────►│   "Got your y — connection established"
  │                                    │
  │           [DATA FLOWS]             │
```

1. **SYN** — client picks a random starting sequence number and sends it
2. **SYN+ACK** — server acknowledges client's SYN and sends its own sequence number
3. **ACK** — client acknowledges server's SYN — both sides are synchronised

---

## DDoS — Distributed Denial of Service 💀

DDoS attacks exploit the 3-way handshake (and other mechanisms) to overwhelm a server with traffic until it can no longer serve legitimate users.

### SYN Flood (most common TCP-based DDoS)

```
Attacker (thousands of bots) ──► SYN ──► Server
                               ──► SYN ──► Server  (no ACK ever sent back)
                               ──► SYN ──► Server
                               ──► SYN ──► Server  ...tens of thousands/second

Server allocates memory for each half-open connection and waits for ACK
→ Server's connection table fills up
→ Legitimate users' SYNs are dropped — server unreachable ❌
```

**Why it's "distributed":** Using a single machine, the server could block the source IP. DDoS uses **thousands of compromised machines (a botnet)** from different IPs worldwide — impossible to block by IP alone.

### Other DDoS Vectors

| Attack | Method |
|---|---|
| SYN flood | Half-open TCP connections exhaust server memory |
| UDP flood | Massive UDP packets exhaust bandwidth |
| HTTP flood | Legitimate-looking HTTP requests overwhelm web server |
| Amplification | Small request → huge response bounced to victim (DNS, NTP amplification) |

---

## Key Points

- 📌 ACK confirms receipt — missing ACK triggers retransmission
- 📌 Sequence numbers track every byte; **sliding window** = range of unacknowledged bytes in flight
- 📌 TCP flags (SYN, ACK, RST, FIN) are bits in the **TCP header**
- 📌 3-way handshake: SYN → SYN+ACK → ACK
- 📌 DDoS SYN flood exploits the handshake — bots send SYNs but never complete the handshake
