# 🗺️ Network Topologies

A network topology describes the **physical or logical arrangement** of devices and connections in a network. The topology affects performance, fault tolerance, cost, and scalability.

---

## Bus Topology 🚌

All devices connect to a **single shared cable** (the bus). Signals travel in both directions along the cable and every device receives every transmission.

```
Device A ──┬── Device B ──┬── Device C ──┬── Device D
           │              │              │
        (shared coaxial cable — one collision domain)
```

**Characteristics:**
- Simple and cheap to set up
- All devices share bandwidth — heavy traffic degrades performance for everyone
- One cable break = entire network goes down
- Collision-prone — CSMA/CD required
- **Legacy technology** — not used in modern networks

---

## Star Topology ⭐

All devices connect to a **central device** (switch or hub). No device connects directly to another.

```
         Device A
             │
Device D ───Switch─── Device B
             │
         Device C
```

**Characteristics:**
- Most common modern topology
- A single device failing affects only that device — not the rest
- Central switch failure = entire network goes down (single point of failure)
- Easy to add or remove devices
- Switches make this efficient — no unnecessary traffic forwarding

---

## Ring Topology 💍

Devices connect in a **closed loop**. Data travels in one direction (or both in dual-ring) around the ring until it reaches its destination.

```
Device A ──► Device B ──► Device C
   ▲                          │
   └────── Device D ◄─────────┘
```

**Characteristics:**
- Each device acts as a repeater, regenerating the signal
- Predictable performance — no collisions
- A single break in the ring can disable the network (unless dual-ring)
- Used in **Token Ring** (legacy) and **SONET/SDH** fibre networks (still used in telecoms)

---

## Mesh Topology 🕸️

Every device connects to **multiple other devices** directly. Offers maximum redundancy.

### Full Mesh
Every device connects to every other device.

```
A ──── B
│ ╲  ╱ │
│  ╲╱  │
│  ╱╲  │
│ ╱  ╲ │
C ──── D
```

- Maximum redundancy — multiple paths exist
- Very expensive (cables and ports multiply rapidly)
- Used in **core network infrastructure** and critical WAN links

### Partial Mesh
Some devices have multiple connections, others have just one.
- Balance between redundancy and cost
- Common in enterprise WAN and internet backbone design

---

## Topology Comparison

| Topology | Redundancy | Cost | Fault Tolerance | Common Use |
|---|---|---|---|---|
| Bus | None | Very low | Very poor | Legacy only |
| Star | Low | Low–Medium | Good (per device) | Modern LANs |
| Ring | Low–Medium | Medium | Moderate | Telecoms/legacy |
| Full Mesh | Very high | Very high | Excellent | Core/WAN |
| Partial Mesh | Medium | Medium | Good | Enterprise WAN |

---

## Key Points

- 📌 **Bus** — single cable, all share, one break = everything fails (legacy)
- 📌 **Star** — central switch, most common, easy to manage
- 📌 **Ring** — circular loop, token-based, used in telecoms
- 📌 **Mesh** — multiple paths, expensive but highly redundant
