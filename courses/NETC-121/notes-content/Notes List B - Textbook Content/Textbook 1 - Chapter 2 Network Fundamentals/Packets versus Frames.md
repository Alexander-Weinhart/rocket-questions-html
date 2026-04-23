# 📬 Packets vs Frames

Packets and frames are both units of data, but they exist at **different layers** and serve different purposes. Understanding the distinction is fundamental to understanding how networks work.

---

## The Short Version

| | Frame | Packet |
|---|---|---|
| OSI Layer | 2 — Data Link | 3 — Network |
| Address type | MAC address | IP address |
| Scope | Local delivery — one hop | End-to-end delivery across networks |
| Lifetime | Replaced at every router | Unchanged entire journey |
| Protocol | Ethernet, Wi-Fi | IPv4, IPv6 |

---

## Frame (Layer 2 Unit) 🚚

A frame is the **vehicle for local delivery**. It carries data from one device to the next device on the same network segment — one hop at a time.

```
Frame:
┌──────────────┬─────────────┬──────┬──────────┬─────┐
│  Dest MAC    │  Src MAC    │ Type │  Data    │ FCS │
│ (next device)│(this device)│      │(IP pkt)  │     │
└──────────────┴─────────────┴──────┴──────────┴─────┘
```

- Uses **MAC addresses** which only have meaning on the local segment
- A frame cannot travel beyond its own network — routers strip it
- At every router, the old frame is discarded and a **new frame** is created for the next segment
- Broadcast frame: destination MAC = `FF-FF-FF-FF-FF-FF`

---

## Packet (Layer 3 Unit) 📦

A packet is the **cargo inside the frame**. It carries the actual data from the original source all the way to the final destination across multiple networks.

```
Packet:
┌─────────┬──────────┬─────┬──────────────────┐
│ Src IP  │ Dest IP  │ TTL │     Data         │
│(my IP)  │(final IP)│     │(TCP segment etc) │
└─────────┴──────────┴─────┴──────────────────┘
```

- Uses **IP addresses** which encode routing information
- The packet stays the same from source to destination (IP addresses don't change)
- Routers read the destination IP to decide where to forward the packet next

---

## How They Work Together

The packet rides inside the frame's data field. They work at the same time but serve completely different purposes:

```
Journey from your laptop to a server:

Hop 1: Laptop → Router (your home router)
  Frame: src MAC=Laptop,  dst MAC=Router    ← local delivery
  Packet: src IP=your IP, dst IP=server IP  ← end-to-end addressing

Hop 2: Router → ISP Router
  Frame: src MAC=Router,    dst MAC=ISP     ← NEW frame, new MACs
  Packet: src IP=your IP, dst IP=server IP  ← SAME packet unchanged

Hop 3: ISP Router → Server
  Frame: src MAC=ISP,    dst MAC=Server     ← NEW frame again
  Packet: src IP=your IP, dst IP=server IP  ← still the same packet
```

**The delivery truck analogy:**
- Packet = the cargo (goods being shipped)
- Frame = the truck (changes at every depot/router)
- The cargo stays the same; the truck is swapped at each stop

---

## Key Points

- 📌 **Frame** = Layer 2, MAC addresses, local hop only, replaced at each router
- 📌 **Packet** = Layer 3, IP addresses, end-to-end, unchanged entire trip
- 📌 Packet lives **inside** the frame's data field
- 📌 Broadcast frame = `FF-FF-FF-FF-FF-FF` destination MAC
- 📌 This two-layer system is what allows the internet to scale globally
