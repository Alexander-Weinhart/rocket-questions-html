# 📦 Packets, Frames, and Collisions

A foundational recap of the three concepts that underpin how data physically moves across a network — and what happens when it goes wrong.

---

## Packets vs Frames — Recap

| | Packet | Frame |
|---|---|---|
| OSI Layer | 3 — Network | 2 — Data Link |
| Address | IP (logical, end-to-end) | MAC (physical, local hop) |
| Lifetime | Unchanged entire journey | Rebuilt at every router |
| Contains | TCP/UDP segment + headers | Packet + MAC headers + FCS |
| PDU name | Packet | Frame |

```
┌─────────────────────────── Frame ────────────────────────────┐
│ Dest MAC │ Src MAC │ Type │        Packet         │ FCS      │
│          │         │      │  Dest IP │ Src IP │ … │          │
└──────────────────────────────────────────────────────────────┘
                              └────── travels end-to-end ──────┘
              └────────── rebuilt each hop ────────────────────┘
```

---

## How Packets Travel

A packet never travels alone — it is always **encapsulated inside a frame** for each local hop.

```
Your PC → Router → ISP → Internet → Server

Hop 1:  [Frame: PC_MAC → Router_MAC]  wraps  [Packet: Your_IP → Server_IP]
Hop 2:  [Frame: Router_MAC → ISP_MAC] wraps  [Packet: Your_IP → Server_IP]
Hop 3:  [Frame: ISP_MAC → Server_MAC] wraps  [Packet: Your_IP → Server_IP]
                                              ↑ packet unchanged every hop
```

---

## Collisions — When Two Devices Transmit at Once

A collision happens when two devices on a **shared medium** (hub, legacy coaxial cable) transmit simultaneously. Their electrical signals overlap and corrupt each other.

```
Device A ──────────────────────────────────────────────►
Device B ──────────────────────────────────────────────►
                        💥 COLLISION — both frames destroyed
```

### Collision Domain

A **collision domain** is any group of devices that share the same medium and can cause collisions with each other.

| Device | Collision Domain Effect |
|---|---|
| Hub | All ports in **one** collision domain — collisions affect everyone |
| Switch | Each port is its **own** collision domain — no collisions between ports |
| Router | Each interface is its own collision domain |

```
Hub:                          Switch:
[A]─┐                         [A]──[Port 1]
[B]─┼──HUB  ← all share       [B]──[Port 2]  ← each port isolated
[C]─┘   one collision domain  [C]──[Port 3]   no inter-port collisions
```

---

## Half-Duplex vs Full-Duplex and Collisions

- **Half-duplex** (hubs) — collisions possible, CSMA/CD manages them
- **Full-duplex** (switches) — no shared medium, no collisions possible

Modern switched networks effectively **eliminated** collision domains. CSMA/CD is a legacy concept because of this.

---

## Key Points

- 📌 Packet = Layer 3 cargo (IP, end-to-end); Frame = Layer 2 vehicle (MAC, one hop)
- 📌 Frame is rebuilt at each router; packet is not
- 📌 Collisions occur on shared media — hubs create one big collision domain
- 📌 Switches isolate collision domains per port — no collisions in modern LANs
