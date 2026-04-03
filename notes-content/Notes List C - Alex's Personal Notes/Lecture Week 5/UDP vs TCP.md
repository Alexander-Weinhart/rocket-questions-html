# ⚡ UDP vs TCP

---

## UDP — Fire and Forget

UDP (User Datagram Protocol) sends data with no setup, no acknowledgment, and no recovery. The moment a datagram is handed to the network, UDP's job is done — it does not look back.

```
Sender ──► [Datagram] ──► [Datagram] ──► [Datagram] ──► Receiver
           (no ACK expected, no retransmit, no ordering)

If one drops:
Sender ──► [1] ──► [2] ──► [3 LOST] ──► [4] ──► Receiver
Receiver gets: 1, 2, 4  ← just moves on
```

---

## UDP "Handshake" — There Isn't One

> This is a deliberate contrast point from the lecture.

| Protocol | Connection setup | Handshake? |
|---|---|---|
| TCP | 3-way handshake (SYN → SYN+ACK → ACK) | ✅ Yes — required before any data |
| UDP | None | ❌ No — data sent immediately |

UDP is **connectionless** — there is no prior agreement between sender and receiver. The sender simply starts sending.

```
TCP:
  Client ──SYN──► Server
  Client ◄─SYN+ACK── Server
  Client ──ACK──► Server
  [now data can flow — 3 round trips before first byte]

UDP:
  Client ──DATA──► Server   ← immediate, no setup
```

---

## TCP Time — Overhead and Timers

TCP introduces several timing elements that add latency but ensure reliability:

| Timer | Purpose |
|---|---|
| **Retransmission timer** | How long to wait for ACK before resending a segment |
| **TIME_WAIT** | After closing, connection waits ~2× MSL (max segment lifetime) before fully closing — prevents stale packets arriving on a reused port |
| **Keepalive timer** | Periodically checks if the other end is still alive on idle connections |
| **SYN timeout** | How long to wait for SYN+ACK before giving up on connection attempt |

This overhead is why TCP is slower than UDP — every segment waits for confirmation before the window advances.

---

## Benefits: TCP vs UDP

### Use TCP When ✅
- Data **must** arrive complete and in order
- Lost data would corrupt the result (file download, database query, email)
- The application cannot handle missing pieces
- A few hundred milliseconds of extra latency is acceptable

| TCP Use Case | Why |
|---|---|
| Web browsing (HTTP/HTTPS) | A missing HTML tag or byte corrupts the page |
| File download | A missing byte corrupts the file |
| Email (SMTP) | Missing characters = garbled message |
| Remote access (SSH) | Commands must arrive complete and in sequence |

### Use UDP When ⚡
- Speed matters more than perfection
- A lost packet just causes a brief glitch, not catastrophic failure
- Low latency is critical (real-time interaction)
- The application handles its own loss tolerance

| UDP Use Case | Why |
|---|---|
| Online gaming | A missed position update is irrelevant 100ms later |
| VoIP / video calls | A dropped audio packet = tiny gap, preferable to delay |
| Live streaming | A dropped frame = brief artifact, not corruption |
| DNS queries | Small, single request/response — fast is better than guaranteed |

---

## Side-by-Side Summary

| Feature | TCP | UDP |
|---|---|---|
| Connection | Required (3-way handshake) | None |
| Reliability | Guaranteed (ACKs + retransmit) | None |
| Ordering | Sequence numbers ensure order | No ordering |
| Speed | Slower (overhead) | Faster (minimal overhead) |
| Header size | 20 bytes minimum | 8 bytes |
| Congestion control | Yes (sliding window) | No |
| Best for | Integrity-critical data | Real-time, speed-critical data |

---

## Key Points

- 📌 UDP = **fire and forget** — no handshake, no ACK, no retransmit
- 📌 TCP = **3-way handshake required** before data — SYN → SYN+ACK → ACK
- 📌 TCP timers (retransmit, TIME_WAIT) add reliability but cost latency
- 📌 Use TCP when **data integrity** matters; UDP when **speed** matters
