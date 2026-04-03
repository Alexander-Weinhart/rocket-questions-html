# 🖧 Network Devices

Each network device operates at a specific OSI layer and performs a specific function. Understanding which layer a device works at tells you what it can and cannot do.

---

## Repeater — Layer 1 🔌

A repeater's only job is to **regenerate a signal** that has weakened over distance.

```
Device A ──────────────── [signal degrades] ──── Repeater ──── [signal restored] ──── Device B
         ◄── long cable ──►                                    ◄── extended reach ──►
```

- Operates at Layer 1 — no awareness of MAC or IP addresses
- Amplifies and retimes the signal bit-by-bit
- **Does not filter traffic** — all bits pass through regardless
- Used to extend the physical reach of a network segment
- Modern equivalents: fibre repeaters, signal boosters

---

## Hub — Layer 1 🔌

A hub is a **multiport repeater**. Whatever signal arrives on one port is immediately copied out to every other port.

```
                 ┌──► Device B (gets everything)
Device A ──► Hub ┼──► Device C (gets everything)
                 └──► Device D (gets everything)
```

- Operates at Layer 1 — no intelligence, no MAC table
- All devices share the same **collision domain** — only one can transmit at a time
- Traffic intended for Device B is also sent to Device C and D (a security and efficiency issue)
- **Obsolete** — replaced entirely by switches
- Still useful to know for exams: hubs = half-duplex, collision-prone

---

## Switch — Layer 2 🔗

A switch **learns MAC addresses** and forwards frames only to the correct destination port. This is the workhorse of modern wired LANs.

```
Device A sends frame to Device C:

Switch MAC table:
  Port 1 → AA:AA:AA:AA:AA:AA (Device A)
  Port 2 → BB:BB:BB:BB:BB:BB (Device B)
  Port 3 → CC:CC:CC:CC:CC:CC (Device C)

Switch forwards frame only to Port 3 ──► Device C
Port 2 (Device B) sees nothing
```

**How a switch learns:**
1. A frame arrives on port 1 from Device A
2. Switch records: "Device A's MAC is on port 1"
3. This builds the **MAC address table** over time
4. Unknown destinations are **flooded** (sent to all ports) until the MAC is learned

- Full-duplex — no collisions between switch ports
- Each port is its own **collision domain**
- Creates separate **broadcast domains** only when combined with VLANs

---

## Router — Layer 3 🌐

A router connects **different networks** and forwards packets between them based on IP addresses.

```
Network A: 192.168.1.0/24 ──► Router ──► Network B: 10.0.0.0/8
                                │
                                └──► Internet (0.0.0.0/0 default route)
```

- Reads **IP addresses** (Layer 3), not MAC addresses
- Maintains a **routing table** — a map of which networks are reachable via which interfaces
- Strips and rebuilds the Ethernet frame at each hop (MAC addresses change, IPs don't)
- **Stops broadcasts** — a broadcast on Network A never crosses to Network B
- Default gateway for all devices on a subnet

---

## Device Summary Table

| Device | OSI Layer | Addresses Used | Forwards To | Collision Domain | Broadcast Domain |
|---|---|---|---|---|---|
| Repeater | 1 | None | All ports | Extends 1 | Extends 1 |
| Hub | 1 | None | All ports | All share 1 | All share 1 |
| Switch | 2 | MAC | Specific port | 1 per port | All ports (unless VLAN) |
| Router | 3 | IP | Specific interface | 1 per interface | 1 per interface |

---

## Key Points

- 📌 **Repeater** — extends signal distance, Layer 1, no filtering
- 📌 **Hub** — multiport repeater, Layer 1, sends to everyone, obsolete
- 📌 **Switch** — learns MACs, Layer 2, forwards selectively, full-duplex
- 📌 **Router** — routes by IP, Layer 3, separates networks, blocks broadcasts
