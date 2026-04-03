# 🎯 Unicast — One-to-One Communication

Unicast is the most common transmission method on modern networks. One sender, one receiver — a direct, private line of communication between two specific devices.

---

## How It Works

Every unicast packet is addressed to **one specific destination IP address**. The network delivers it only to that device and no one else.

```
Sender ──────────────────────────► Receiver A   ✅ gets the data
                                   Receiver B   ❌ nothing
                                   Receiver C   ❌ nothing
```

---

## Real-World Examples

| Scenario | Why it's Unicast |
|---|---|
| Loading a webpage | Your browser requests data from one server; the server replies to you specifically |
| Downloading a file | The file server streams directly to your IP address |
| SSH / Remote Desktop | One machine communicating privately with another |
| Streaming Netflix | Server sends a separate stream to each individual viewer |

---

## The Scaling Problem

Unicast is efficient for one-to-one, but it does not scale well for large audiences.

```
100 users watching the same video stream:

Server → [Stream 1]  ───► User 1
Server → [Stream 2]  ───► User 2
Server → [Stream 3]  ───► User 3
...
Server → [Stream 100] ──► User 100

= 100 separate streams, 100× the bandwidth cost
```

This is why **multicast** exists — to solve this exact problem.

---

## Key Properties

- 📌 Destination: one specific device (one IP address)
- 📌 Used for: web browsing, file transfers, email, most everyday traffic
- 📌 Bandwidth: multiplies per additional receiver — not efficient for groups
- 📌 Most internet traffic today is unicast
