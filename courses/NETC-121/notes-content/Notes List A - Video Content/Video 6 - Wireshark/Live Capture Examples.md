# 🔬 Wireshark — Live Capture Examples

Once Wireshark is capturing, the packet list fills in real time. The real power comes from **display filters** — they let you narrow thousands of packets down to exactly what you're looking for.

---

## Starting a Capture

1. Open Wireshark
2. On the home screen, **double-click** the active interface (look for the one with a moving graph)
3. Packets begin flowing immediately

```
Interfaces:
  Npcap Loopback Adapter  ───── (flat line — no loopback traffic)
  Ethernet0               ~~~~~ (active — double-click this one)
```

---

## Display Filters

Filters are typed into the filter bar at the top. They narrow the view without stopping the capture.

| Filter | What It Shows |
|---|---|
| `eigrp` | EIGRP routing protocol hello packets (router-to-router) |
| `ospf` | OSPF routing protocol packets |
| `telnet` | All Telnet traffic — **cleartext login sessions** |
| `http` | All unencrypted HTTP web traffic |
| `arp` | All ARP requests and replies |
| `ip.addr == 192.168.1.1` | All traffic to or from a specific IP |
| `tcp.port == 443` | All HTTPS traffic |

---

## Following a TCP Stream

Individual packets show fragmented data. To read an entire conversation:

1. Right-click any packet in a session
2. Select **Follow → TCP Stream**

```
Result window:
  Blue text  = data sent by the server (or switch)
  Red text   = data typed by the client (you)
```

This reassembles the entire session from first packet to last — extremely useful for reading Telnet sessions or HTTP requests.

---

## What You Can See in Routing Protocol Captures

```
Filter: eigrp

Wireshark shows:
  Source: 192.168.1.1 (Router A)
  Destination: 224.0.0.10 (EIGRP multicast group)
  Protocol: EIGRP
  Info: Hello  ← routers send these to confirm neighbours are alive
```

These hello packets are sent every few seconds to maintain neighbour relationships between routers.

---

## Key Points

- 📌 Double-click the active interface (with graph movement) to start capture
- 📌 Display filters narrow results without stopping the capture
- 📌 `eigrp`, `ospf` — routing protocol traffic between routers
- 📌 `telnet` — shows cleartext credentials in plain view
- 📌 **Follow → TCP Stream** reconstructs an entire conversation
