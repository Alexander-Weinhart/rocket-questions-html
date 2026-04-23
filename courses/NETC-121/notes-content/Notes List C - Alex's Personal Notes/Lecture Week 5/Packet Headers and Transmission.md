# 📋 Packet Headers and Transmission

---

## What Is a Packet Header?

Every IP packet begins with a **header** — a structured block of fields that tell routers and the destination device everything they need to know about how to handle the packet.

### IPv4 Header Fields

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
├───────┬───────┬───────────────────────────────────────────────────┤
│Version│  IHL  │    DSCP / TOS       │         Total Length        │
├───────────────────────────────────────┬───────────────────────────┤
│         Identification                │ Flags  │  Fragment Offset  │
├───────────────┬───────────────────────┴───────────────────────────┤
│      TTL      │    Protocol           │      Header Checksum       │
├───────────────────────────────────────────────────────────────────┤
│                       Source IP Address                           │
├───────────────────────────────────────────────────────────────────┤
│                    Destination IP Address                         │
├───────────────────────────────────────────────────────────────────┤
│                       Options (if any)                            │
└───────────────────────────────────────────────────────────────────┘
```

| Field | Purpose |
|---|---|
| **Version** | IPv4 or IPv6 |
| **IHL** | Header length (how many 32-bit words) |
| **TTL** | Time to Live — decrements at each router; packet dropped at 0 |
| **Protocol** | What's inside: 6=TCP, 17=UDP, 1=ICMP |
| **Source IP** | Where the packet came from |
| **Destination IP** | Where it's going |
| **Header Checksum** | Error check on the header itself |
| **Flags / Fragment Offset** | Controls fragmentation of oversized packets |

---

## Packet Transmission

When a packet is too large for a link's MTU (Maximum Transmission Unit), it is **fragmented** — split into smaller pieces that are reassembled at the destination.

```
Original packet: 3000 bytes
MTU of link: 1500 bytes

Fragment 1: bytes 0–1479     (1480 bytes data + 20 byte header)
Fragment 2: bytes 1480–2959  (1480 bytes data + 20 byte header)
Fragment 3: bytes 2960–2999  (40 bytes data + 20 byte header)

All fragments carry the same Identification field
Destination reassembles using Fragment Offset values
```

---

## Datagram vs Virtual Circuit

Two fundamentally different philosophies for how packets travel across a network:

### Datagram (Connectionless) 📦

Each packet is **independent** — it carries its own full destination address and routers decide the best path for each packet individually.

```
Packet 1 → Router A → Router C → Destination
Packet 2 → Router A → Router B → Router D → Destination  (different path)
Packet 3 → Router A → Router C → Destination

Packets may arrive out of order — TCP reassembles them
```

- How the **modern internet** works
- Resilient — if a router fails, packets reroute automatically
- No setup required — packets just go

### Virtual Circuit (Connection-Oriented) 🛤️

A **dedicated path** is established before data flows. Every packet follows the same predetermined route.

```
Setup: A → B → C → D (path reserved)
Data:  all packets follow A → B → C → D in order
Close: path released
```

- How **MPLS, ATM, Frame Relay** work (WAN technologies)
- Predictable latency and ordering
- Path failure = connection drops

---

## WAN Packet Technologies

| Technology | Type | Notes |
|---|---|---|
| **MPLS** | Virtual circuit (label switching) | Enterprise WAN backbone; fast label-based forwarding |
| **Frame Relay** | Virtual circuit | Legacy WAN — mostly replaced by MPLS and internet VPN |
| **ATM** | Virtual circuit | Fixed 53-byte cells; used in telco backbone and DSL |
| **IP / Internet** | Datagram | Connectionless; each packet routes independently |
| **SD-WAN** | Overlay (datagram) | Software-defined WAN over internet — modern replacement for MPLS |

---

## Key Points

- 📌 IP packet header contains: version, TTL, protocol, src/dst IP, checksum, flags
- 📌 TTL decrements at each hop — prevents packets looping forever
- 📌 **Datagram** = connectionless, each packet independent (how the internet works)
- 📌 **Virtual circuit** = pre-established path, all packets follow same route (MPLS, ATM)
- 📌 Fragmentation splits oversized packets; destination reassembles using fragment offset
