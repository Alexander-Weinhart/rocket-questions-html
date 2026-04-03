# 🗺️ Packet Journey Through the TCP/IP Stack

When you load a webpage, data doesn't just teleport — it travels down through every layer of the TCP/IP model on the sender's side, across the network, then back up through every layer on the receiver's side. This is called **encapsulation** going down and **decapsulation** going up.

---

## The Full Journey (Top to Bottom)

```
[Your Browser]
      │  HTTP GET request: "Give me google.com"
      ▼
┌─────────────────────────────────────┐
│  APPLICATION LAYER                  │
│  Protocol: HTTP / HTTPS             │
│  Data: the actual request/webpage   │
└────────────────────┬────────────────┘
                     │ adds port numbers
                     ▼
┌─────────────────────────────────────┐
│  TRANSPORT LAYER                    │
│  Protocol: TCP (or UDP)             │
│  Adds: src/dst port, seq number,    │
│        ACK, checksum                │
└────────────────────┬────────────────┘
                     │ adds IP addresses
                     ▼
┌─────────────────────────────────────┐
│  INTERNET LAYER                     │
│  Protocol: IP                       │
│  Adds: src IP, dst IP, TTL          │
└────────────────────┬────────────────┘
                     │ adds MAC addresses
                     ▼
┌─────────────────────────────────────┐
│  NETWORK ACCESS LAYER               │
│  Protocol: Ethernet / Wi-Fi         │
│  Adds: src MAC, dst MAC, FCS        │
└────────────────────┬────────────────┘
                     │
              [sent on the wire]
```

---

## Each Layer's Contribution

| Layer | What It Adds | Why |
|---|---|---|
| Application | HTTP/HTTPS headers + content | Defines what is being requested |
| Transport | TCP segment header (ports, seq, ACK) | Ensures reliable delivery, correct application |
| Internet | IP packet header (src/dst IP) | Routes packet to correct machine on internet |
| Network Access | Ethernet frame header/trailer (MAC, FCS) | Delivers to next device on local network |

---

## At the Destination — Decapsulation (Going Back Up)

Each layer strips its own header and passes the remaining data upward:

```
[Ethernet frame arrives at NIC]
  → Network Access strips frame header/trailer
  → IP packet passed to Internet layer
  → Internet layer strips IP header
  → TCP segment passed to Transport layer
  → Transport layer strips TCP header
  → HTTP data passed to Application layer
  → Browser renders the webpage 🎉
```

---

## Analogy: Mailing a Letter

```
Application  = the letter you write
Transport    = putting it in an envelope with a return address
Internet     = adding the full mailing address (city, zip code)
Network      = the mail truck that drives it to the next post office
```

At each stop (router), the truck (frame) changes, but the letter (IP packet and above) stays the same.

---

## Key Points

- 📌 Data travels **down** the stack on the sender (encapsulation)
- 📌 Data travels **up** the stack on the receiver (decapsulation)
- 📌 Each layer adds its own header when sending, strips it when receiving
- 📌 The IP packet is unchanged end-to-end; the Ethernet frame changes at every router hop
- 📌 Port numbers identify the correct application at the destination
