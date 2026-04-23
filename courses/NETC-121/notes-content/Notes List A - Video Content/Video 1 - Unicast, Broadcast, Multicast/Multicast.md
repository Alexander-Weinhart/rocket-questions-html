# 📡 Multicast — One-to-Many (Selected Group)

Multicast is the middle ground between unicast and broadcast. One sender delivers data to a **specific group** of receivers — only devices that have opted in receive it.

---

## How It Works

Devices that want multicast data **join a multicast group**. The sender transmits once, and the network delivers it only to group members.

```
Sender ──► [Multicast Group 224.0.0.1]
               │
               ├──► Device A  ✅ (joined the group)
               ├──► Device B  ❌ (not in group — ignored)
               ├──► Device C  ✅ (joined the group)
               └──► Device D  ❌ (not in group — ignored)
```

---

## Why Multicast Exists — The Efficiency Problem

| Method | 100 receivers watching the same stream |
|---|---|
| Unicast | 100 separate streams — 100× bandwidth |
| Broadcast | 1 stream — but sent to everyone, even those who don't want it |
| Multicast | 1 stream — delivered only to interested devices ✅ |

Multicast lets the server send **one copy** of the data, and the network handles distribution to all group members. The server doesn't even need to know how many are watching.

---

## Real-World Uses

| Use Case | Why Multicast |
|---|---|
| Live video streaming (IPTV) | One stream distributed to many viewers efficiently |
| Stock market data feeds | Real-time price data pushed to subscribed clients |
| Online gaming (server updates) | Game state broadcast to all players in a session |
| Network routing protocols | OSPF and EIGRP use multicast to exchange routing info between routers |

---

## Multicast IP Address Range

Multicast uses a reserved IP range: **224.0.0.0 – 239.255.255.255**

| Range | Use |
|---|---|
| 224.0.0.x | Local network control (routing protocols) |
| 224.0.1.x | Internetwork control |
| 239.x.x.x | Administratively scoped (private/local use) |

---

## Requirements

> ⚙️ Multicast requires **special network configuration**. Routers must be set up to support multicast routing protocols (like **PIM — Protocol Independent Multicast**) to forward multicast traffic between network segments. Without this, multicast stays local.

---

## Key Properties

- 📌 Destination: a multicast group address (224.x.x.x range)
- 📌 Receivers must **opt in** by joining the group
- 📌 Single stream from sender — far more efficient than unicast for groups
- 📌 Used for live streams, routing protocols, stock feeds
- 📌 Requires special router configuration to cross network boundaries
