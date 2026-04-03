# ⚡ CSMA/CD — Carrier Sense Multiple Access with Collision Detection

CSMA/CD is the protocol that governed how devices shared a wired Ethernet network in the early days. When multiple devices share the same cable, they need rules to avoid stepping on each other — CSMA/CD is those rules.

---

## The Problem It Solves

Old Ethernet used a **shared cable** — every device on the network could hear everything, and only one device could transmit at a time. Without coordination, two devices transmitting simultaneously would destroy each other's signals.

```
Device A ──────────────────── shared cable ──────────────── Device B
                         ↑ collision zone ↑
```

---

## The 4-Step Process

### Step 1 — If Idle, Transmit 👂📤
The device listens to the cable.
- Cable is **idle** → begin transmitting immediately while continuing to monitor.
- Cable is **busy** → go to Step 2.

### Step 2 — If Not Idle, Wait ⏸️
The cable is in use. The device waits until it goes idle, then returns to Step 1.

```
Device A is transmitting ──────────────────────────►
Device B listens: busy → waits → waits → idle → go to Step 1
```

### Step 3 — If Collision, Stop and Jam 💥
If two devices entered Step 1 at the same moment and both transmitted, a **collision** occurs (voltage mismatch on the cable).
The detecting device immediately:
1. **Stops transmitting**
2. Sends a **jam signal** to notify all devices on the cable

```
Device A ──►──────────── COLLISION ──────────────── ◄── Device B
                              💥
          ◄─── JAM SIGNAL broadcast to all devices ───►
```

### Step 4 — Wait Random Backoff, Repeat Step 1 ⏱️
Each device waits a **random** amount of time before returning to Step 1.
Randomness ensures they don't immediately collide again.
If another collision happens, the backoff window **doubles** (exponential backoff).

---

## Where CSMA/CD Is Used

- **Early wired Ethernet** using shared coaxial cable (10BASE-2, 10BASE-5)
- **10BASE-T hubs** (half-duplex) — devices still share a collision domain
- Modern **full-duplex switched Ethernet** does not use CSMA/CD — each port is its own dedicated connection with no shared medium

---

## Key Points

- 📌 Used in **wired Ethernet**, especially legacy shared networks
- 📌 Detects collisions **after they happen** and recovers
- 📌 Jam signal alerts all devices to back off
- 📌 Random backoff prevents immediate re-collision
- 📌 Modern switches eliminated collision domains — CSMA/CD is mostly historical now
