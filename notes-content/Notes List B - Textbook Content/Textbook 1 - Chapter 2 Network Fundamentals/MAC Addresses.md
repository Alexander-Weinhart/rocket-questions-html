# 🪪 MAC Addresses

A MAC (Media Access Control) address is a **hardware identifier** burned into every network interface card at the factory. It operates at Layer 2 and is used for local frame delivery within a network segment.

---

## Structure

A MAC address is **48 bits** long, written as 6 groups of 2 hexadecimal digits:

```
01 : 32 : 54 : 76 : 85 : AB
│         │         │         │         │         │
└─────────┴─────────┘         └─────────┴─────────┘
      OUI (24 bits)                 NIC (24 bits)
  Organizationally Unique       Device-specific portion
      Identifier                 (unique per device)
  (identifies the manufacturer)
```

---

## The Two Halves

| Portion | Bits | Purpose |
|---|---|---|
| **OUI** (first 3 bytes) | 24 bits | Identifies the **manufacturer** of the NIC |
| **NIC-specific** (last 3 bytes) | 24 bits | Unique identifier assigned by the manufacturer |

Every network hardware manufacturer registers their OUI with IEEE. This means you can look up a MAC address and identify the manufacturer (e.g. Intel, Cisco, Apple).

---

## Hexadecimal — Quick Review

MAC addresses use **hexadecimal (base 16)** notation.

| Hex | Decimal | Binary |
|---|---|---|
| 0 | 0 | 0000 |
| 9 | 9 | 1001 |
| A | 10 | 1010 |
| B | 11 | 1011 |
| F | 15 | 1111 |

Each hex digit represents **4 bits**. Two hex digits = 1 byte (8 bits).
So `AB` in hex = `1010 1011` in binary = `171` in decimal.

---

## How MAC Addresses Are Written

You'll see MAC addresses in several formats — all represent the same thing:

| Format | Example |
|---|---|
| Hyphen-separated | `01-32-54-76-85-AB` |
| Colon-separated | `01:32:54:76:85:AB` |
| Cisco dot notation | `0132.5476.85AB` |

---

## Broadcast MAC Address

| Address | Meaning |
|---|---|
| `FF-FF-FF-FF-FF-FF` | Broadcast — every device on the local network receives this frame |

When all 48 bits are set to 1 (`FF` in hex), the frame is addressed to everyone.

---

## MAC vs IP — Key Difference

| | MAC Address | IP Address |
|---|---|---|
| Layer | 2 (Data Link) | 3 (Network) |
| Purpose | Local delivery (one hop) | End-to-end delivery |
| Assigned by | Manufacturer (burned in) | Network admin / DHCP |
| Changes at router? | ✅ Yes — new frame each hop | ❌ No — same end-to-end |
| Scope | Local network segment only | Global |

---

## Key Points

- 📌 48 bits total — 6 bytes written in hex
- 📌 First 3 bytes = **OUI** (manufacturer ID)
- 📌 Last 3 bytes = **device-specific** (unique per NIC)
- 📌 Broadcast MAC = `FF-FF-FF-FF-FF-FF`
- 📌 MAC addresses stay local — they are **replaced at every router hop**
