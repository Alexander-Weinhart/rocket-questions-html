# 🔍 CRC Error Detection

CRC (Cyclic Redundancy Check) is the error detection mechanism built into every Ethernet frame. It catches frames that were corrupted in transit — flipped bits, electrical noise, cable damage.

---

## What Is a CRC?

A CRC is a **mathematical checksum** — a value calculated by running the frame's contents through a fixed algorithm. Think of it as a fingerprint of the data.

- If the data is unchanged, the CRC will always produce the same result.
- If even a single bit is flipped, the CRC produces a completely different value.

---

## Where It Lives

The CRC value is stored in the **FCS (Frame Check Sequence)** field — the last 4 bytes of every Ethernet frame.

```
┌───────────┬──────────────┬────────────┬───────┬──────────┬──────────┐
│ Preamble  │  Dest MAC    │  Src MAC   │ Type  │   Data   │   FCS    │
│           │              │            │       │          │ CRC here │
└───────────┴──────────────┴────────────┴───────┴──────────┴──────────┘
                                                             ↑
                                              4-byte CRC checksum
```

---

## How It Works Step by Step

### Step 1 — Sender calculates CRC
Before sending, the sender runs the CRC algorithm over the frame contents (everything except the preamble and FCS itself).
The result is placed into the FCS field.

```
Sender:
  Frame contents ──► [CRC algorithm] ──► result: 0xA3F2C1D8
  Stored in FCS field of outgoing frame
```

### Step 2 — Frame travels across the wire
During transmission, electrical noise, interference, or cable faults can **flip bits** in the frame.

### Step 3 — Receiver recalculates CRC
The receiver runs the same CRC algorithm over the received frame contents.
Then it compares its result to the FCS value in the frame.

```
Receiver:
  Received frame contents ──► [CRC algorithm] ──► result: 0xA3F2C1D8
  Compare to FCS value:                                    0xA3F2C1D8
  Match ✅ → frame is intact, pass it up
```

### Step 4 — Mismatch means corruption
If the values don't match, the frame was damaged in transit.

```
Receiver:
  Recalculated CRC: 0xA3F2C1D8
  FCS in frame:     0x00000000  ← different
  Result: ❌ frame dropped silently
```

---

## What Happens After a Drop?

- Ethernet itself does **not** request a retransmission.
- CRC only detects — it does not correct.
- Retransmission is handled by **higher-layer protocols** (TCP at Layer 4 will notice the missing segment and request it again).

---

## Key Points

- 📌 CRC is calculated over the entire frame by both sender and receiver
- 📌 If CRC values match → frame is good
- 📌 If CRC values don't match → frame is **silently dropped**
- 📌 Ethernet does not retransmit — TCP handles that at Layer 4
- 📌 CRC detects errors but cannot identify **where** the corruption occurred
