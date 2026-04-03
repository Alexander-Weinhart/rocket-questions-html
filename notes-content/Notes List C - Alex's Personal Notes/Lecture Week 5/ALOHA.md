# 📡 ALOHA — The Origin of Random Access Protocols

ALOHA is the earliest random-access protocol for shared network media. Developed at the University of Hawaii in the early 1970s, it directly influenced all later protocols including CSMA/CD. Understanding ALOHA explains *why* CSMA/CD works the way it does.

---

## The Problem ALOHA Solved

Multiple devices share a single radio channel (originally used for inter-island communication in Hawaii). Without coordination, transmissions collide and destroy each other. ALOHA established the first set of rules for handling this.

---

## Pure ALOHA — How It Works

The simplest possible approach: **transmit whenever you want**.

```
Device A ──► [frame transmitted anytime]
Device B ──► [frame transmitted anytime]
                    ↓
         If they overlap in time → COLLISION → both retransmit
```

### Messages and Acknowledgements

```
Sender ──────────────── [Frame] ──────────────────► Receiver
Sender ◄──────────────── [ACK]  ───────────────────  Receiver  ✅ success

If no ACK within timeout:
Sender assumes collision → waits random backoff → retransmits
```

- Sender sends the frame
- Receiver sends an ACK if it arrived intact
- No ACK = collision or loss → random wait → retry

### Efficiency Problem

Pure ALOHA is only about **18% efficient** — the channel is wasted most of the time on collisions and idle periods. The vulnerability window for a collision is **2× the frame transmission time** (a frame can collide with the tail of the previous transmission or the start of the next).

---

## Slotted ALOHA — Time-Based Improvement ⏱️

Slotted ALOHA divides time into **fixed slots** equal to one frame transmission time. Devices may only **begin transmitting at the start of a slot** — never mid-slot.

```
Time:    |──Slot 1──|──Slot 2──|──Slot 3──|──Slot 4──|
Device A:           [  frame  ]
Device B:                      [  frame  ]
Device C:           [  frame  ]              ← same slot as A → COLLISION

vs Pure ALOHA where they could collide at any partial overlap
```

### Why Slotted Is Better

By synchronising transmissions to slot boundaries, the collision window is cut in half:
- **Pure ALOHA** vulnerable window: 2× frame time
- **Slotted ALOHA** vulnerable window: 1× frame time (only same-slot collisions)
- **Efficiency improves** from ~18% to ~37%

### Similarities to Token Ring

Slotted ALOHA and **Token Ring** both use **time-based coordination** to manage access:

| Feature | Slotted ALOHA | Token Ring |
|---|---|---|
| Time structure | Fixed time slots | Token rotation time |
| When to transmit | Only at slot start | Only when holding the token |
| Collision possible? | Yes — same-slot transmissions | No — token ensures exclusive access |
| Efficiency | ~37% | Near 100% under load |

The key difference: Token Ring **eliminates** collisions entirely by guaranteeing only one device can transmit at a time. Slotted ALOHA only **reduces** the collision probability.

---

## ALOHA → CSMA/CD — The Evolution

```
Pure ALOHA          → transmit anytime, random retry on collision
     ↓
Slotted ALOHA       → transmit at slot boundaries only
     ↓
CSMA                → listen before transmitting (carrier sense added)
     ↓
CSMA/CD             → listen + detect collision mid-transmission + jam + backoff
     ↓
CSMA/CA             → avoid collisions with pre-transmission backoff (Wi-Fi)
```

ALOHA's core contribution — **random backoff after collision** — survives unchanged all the way to CSMA/CD and CSMA/CA.

> 📌 For CSMA/CD — see updated 4-step process in Video 3 notes.

---

## Key Points

- 📌 **Pure ALOHA** — transmit anytime; ACK confirms receipt; random backoff on no-ACK; ~18% efficient
- 📌 **Slotted ALOHA** — transmit only at slot boundaries; halves collision window; ~37% efficient
- 📌 Slotted ALOHA is time-based like Token Ring, but doesn't eliminate collisions
- 📌 ALOHA's random backoff principle is the ancestor of all CSMA protocols
