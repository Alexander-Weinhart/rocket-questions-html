# 🔍 Error Detection — Checksum and CRC

Two methods for detecting data corruption in transit. Both work by computing a value from the data before sending, then recomputing it at the destination and comparing — any difference means something changed.

---

## Why Error Detection Is Needed

Bits flip. Electrical interference, cable damage, and hardware faults can change a 0 to a 1 mid-transmission. Without error detection, the receiver would silently accept corrupted data.

---

## Checksum — The Older Method ➕

A checksum is calculated by **adding up the values of all bytes** in the data and sending the result as a small field in the header.

### How It Works

```
Data bytes: 0x12, 0x34, 0x56, 0x78

Sum: 0x12 + 0x34 + 0x56 + 0x78 = 0x114
Checksum stored in header: 0x114 (or 1's complement: 0xEB)

Receiver adds up received bytes:
  If sum matches checksum → data intact ✅
  If sum doesn't match   → data corrupted ❌ → discard
```

### Used In

- IPv4 header checksum (covers only the IP header, not the payload)
- TCP and UDP checksums (covers header + data)
- ICMP checksum

### Problems with Checksum

Checksum addition has a known weakness — **two errors can cancel each other out**:

```
Original bytes: 0x10, 0x20   → sum = 0x30
Corrupted:      0x20, 0x10   → sum = 0x30  (same checksum — corruption undetected!)
```

- Checksum detects **single-bit errors** and **most burst errors** reliably
- But it can miss **multiple simultaneous bit flips** that happen to cancel out mathematically
- This is why CRC replaced it for frame-level error detection

---

## CRC — Cyclic Redundancy Check 🔄

CRC is a much more robust error detection algorithm based on **polynomial division** rather than simple addition.

### How It Works

1. Both sender and receiver agree on a **generator polynomial** (a fixed bit pattern)
2. Sender treats the data as a large binary number and **divides** it by the generator polynomial
3. The **remainder** of that division is the CRC value
4. CRC is appended to the data (stored in the FCS field of an Ethernet frame)
5. Receiver performs the same division on the received data + CRC
6. If the remainder is **zero** → no errors; if non-zero → data was corrupted

```
Sender:
  Data bits: 110101100
  Generator: 1011
  Division remainder: 011   ← CRC value
  Transmitted: 110101100 011

Receiver:
  Receives: 110101100 011
  Divides by generator 1011
  Remainder = 000 → ✅ no corruption

If a bit flipped:
  Receives: 110101110 011
  Divides by 1011
  Remainder ≠ 000 → ❌ corrupted — frame dropped
```

### CRC Covers Header AND Data

Unlike the IPv4 checksum (which only covers the IP header), Ethernet's CRC covers the **entire frame** — header and payload together. This makes it far more comprehensive.

### Why CRC Is Better Than Checksum

| | Checksum | CRC |
|---|---|---|
| Method | Addition of byte values | Polynomial division |
| Detects single-bit errors | ✅ Yes | ✅ Yes |
| Detects burst errors | Sometimes | ✅ Much more reliably |
| Cancellation vulnerability | ✅ Yes — two errors can cancel | Extremely unlikely |
| Where used | IP, TCP, UDP headers | Ethernet FCS, HDLC, storage |

---

## What Happens After Detection

Both checksum and CRC are **detect-only** — they do not correct errors and do not request retransmission themselves.

```
CRC mismatch detected → Ethernet frame silently dropped
                                ↓
TCP at Layer 4 notices the missing segment (no ACK received)
                                ↓
TCP retransmits the segment
```

Error **correction** is handled by higher-layer protocols (TCP), not at Layer 2.

---

## Key Points

- 📌 **Checksum** — add up all bytes, compare at receiver; fast but can miss cancelling errors
- 📌 **CRC** — polynomial division over header + data; far more reliable, used in Ethernet FCS
- 📌 Both are **detect only** — no correction, no retransmit (that's TCP's job)
- 📌 Checksum weakness: two flipped bytes can produce the same sum → undetected corruption
- 📌 CRC covers the **entire frame** (header and data); IP checksum covers only the IP header
