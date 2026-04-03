# 📦 Encapsulation

Encapsulation is how data gets wrapped in layers as it travels down the network stack. Each layer adds its own header (and sometimes footer) around the data from the layer above — like putting a letter in an envelope, then that envelope in a box, then labelling the box for shipping.

---

## The Core Idea

An IP packet cannot exist by itself on a physical wire. It must be placed **inside** an Ethernet frame to be transmitted locally. The frame is the vehicle; the IP packet is the cargo.

```
┌─────────────────────────────────────────────┐
│             Ethernet Frame                  │
│  (MAC src/dst — local delivery only)        │
│  ┌───────────────────────────────────────┐  │
│  │             IP Packet                 │  │
│  │  (IP src/dst — end-to-end delivery)   │  │
│  │  ┌─────────────────────────────────┐  │  │
│  │  │         TCP/UDP Segment         │  │  │
│  │  │  ┌───────────────────────────┐  │  │  │
│  │  │  │       App Data            │  │  │  │
│  │  │  │  (HTTP, DHCP, DNS, etc.)  │  │  │  │
│  │  │  └───────────────────────────┘  │  │  │
│  │  └─────────────────────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## Two Separate Addressing Systems

This is the key insight of encapsulation — **two different address systems serve two different purposes** at the same time:

| Layer | Address Type | Purpose | Scope |
|---|---|---|---|
| Frame (Layer 2) | MAC address | Delivers to the next device on the local network | Local only — replaced at each hop |
| Packet (Layer 3) | IP address | Delivers to the final destination across the internet | End-to-end — unchanged entire trip |

---

## What Happens at Each Router Hop

The IP packet stays the same the entire journey. The Ethernet frame is **discarded and rebuilt** at every router.

```
[Device A] ──frame1──► [Router 1] ──frame2──► [Router 2] ──frame3──► [Device B]

frame1:  src MAC = A,        dst MAC = Router1   (local hop 1)
frame2:  src MAC = Router1,  dst MAC = Router2   (local hop 2)
frame3:  src MAC = Router2,  dst MAC = B         (local hop 3)

IP packet inside: src IP = A,  dst IP = B   ← never changes
```

Each time a router receives a frame, it:
1. Strips off the Ethernet frame
2. Reads the IP packet's destination IP
3. Determines the next hop
4. Wraps the IP packet in a **brand new frame** with new MAC addresses for the next segment

---

## Why Two Layers?

- **MAC addresses** are flat — they don't contain routing information and only make sense on one network segment.
- **IP addresses** are hierarchical — they encode location information (network + host) so routers can make forwarding decisions.
- Encapsulation lets both systems work together: IP handles the route, Ethernet handles each step.

---

## Key Points

- 📌 IP packet is placed inside the Ethernet frame's **data field**
- 📌 Frame uses MAC addresses for **local delivery** (hop to hop)
- 📌 IP packet uses IP addresses for **end-to-end delivery** (source to destination)
- 📌 Frame is replaced at every router; IP packet is not
- 📌 This layered approach is the foundation of how the internet works
