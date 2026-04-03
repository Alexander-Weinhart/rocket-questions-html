# 🧱 OSI Model — Layers 1, 2, and 3

The OSI (Open Systems Interconnection) model has 7 layers. Chapters 1–3 of networking focus on the bottom three — the layers that handle physical transmission, local delivery, and routing between networks.

---

## Layer 1 — Physical 🔌

The Physical layer deals with the **raw transmission of bits** across a medium. It has no concept of addresses, packets, or protocols — just electrical signals, light pulses, or radio waves.

**What it handles:**
- Cables: copper (Cat5e, Cat6), fibre optic, coaxial
- Connectors: RJ-45, LC, SC
- Signaling: voltage levels for electrical, light intensity for fibre, frequency for wireless
- Bit rate and timing

**Devices at Layer 1:**
- **Hub** — receives a signal on one port, re-broadcasts it out all other ports (no intelligence)
- **Repeater** — regenerates a degraded signal to extend cable distance

```
Device A ─── signal ───► Hub ─── copies to all ports ───► Device B, C, D
                                  (no filtering, no addressing)
```

---

## Layer 2 — Data Link 🔗

The Data Link layer manages **frame-level communication** between devices on the same local network. It introduces addressing via MAC addresses and provides basic error detection.

**What it handles:**
- Packaging data into **frames**
- MAC addressing (source and destination)
- Error detection via CRC/FCS
- Access control (who gets to transmit — CSMA/CD, CSMA/CA)

**Devices at Layer 2:**
- **Switch** — reads destination MAC, forwards frame only to the correct port
- **NIC (Network Interface Card)** — every device's hardware interface to the network

```
Device A ──► [Frame: src=A, dst=B] ──► Switch ──► only port connected to Device B
                                        (all other ports not disturbed)
```

---

## Layer 3 — Network 🌐

The Network layer handles **routing packets between different networks**. It introduces IP addresses, which unlike MAC addresses, carry location information that routers can use to make forwarding decisions.

**What it handles:**
- IP addressing (IPv4 and IPv6)
- Packet routing from source to destination across multiple networks
- Logical addressing (IP addresses assigned by network design, not burned into hardware)
- Fragmentation of packets that are too large for a link

**Devices at Layer 3:**
- **Router** — reads destination IP, determines next hop, forwards accordingly

```
Network A (192.168.1.0/24) ──► Router ──► Network B (10.0.0.0/8)
                                  ↑
                         reads IP, decides route
```

---

## Side-by-Side Summary

| | Layer 1 Physical | Layer 2 Data Link | Layer 3 Network |
|---|---|---|---|
| Unit | Bit | Frame | Packet |
| Address | None | MAC address | IP address |
| Scope | Signal on wire | Local network | Across networks |
| Device | Hub, Repeater | Switch, NIC | Router |
| Intelligence | None | Learns MACs | Routes by IP |

---

## Key Points

- 📌 Layer 1 — bits, cables, signals, hubs (no addressing)
- 📌 Layer 2 — frames, MAC addresses, switches (local delivery)
- 📌 Layer 3 — packets, IP addresses, routers (inter-network routing)
- 📌 Each layer only communicates with the layer directly above and below it
