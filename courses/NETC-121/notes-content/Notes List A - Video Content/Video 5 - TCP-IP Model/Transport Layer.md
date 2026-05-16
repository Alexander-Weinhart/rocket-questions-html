# Transport Layer (TCP/IP Model)

The Transport layer sits between the Application layer above and the Internet layer below. It is responsible for **getting data reliably from one application to the correct application** on the destination machine.

---

## Two Protocols

The Transport layer uses one of two protocols depending on what the application needs:

| | TCP | UDP |
|---|---|---|
| Full name | Transmission Control Protocol | User Datagram Protocol |
| Connection | Connection-oriented (handshake) | Connectionless |
| Reliability | Guaranteed delivery | Best effort — no guarantee |
| Speed | Slower (overhead) | Faster (low overhead) |
| Use when | Data integrity matters | Speed matters more than perfection |

---

## TCP — The Reliable Protocol

TCP chops application data into **segments**, numbers them, sends them, and waits for the receiver to confirm each one.

```
Sender                              Receiver
  │──── [Seg 1, seq=1] ────────────►│
  │◄─── ACK 2 (got 1, send 2) ──────│
  │──── [Seg 2, seq=2] ────────────►│
  │◄─── ACK 3 ──────────────────────│
  │──── [Seg 3, seq=3] ────────────►│  (lost!)
  │                                  │
  │  [timeout — no ACK received]     │
  │──── [Seg 3, seq=3] ────────────►│  retransmit
  │◄─── ACK 4 ──────────────────────│  
```

---

## UDP — The Fast Protocol

UDP just fires datagrams and moves on. No handshake, no ACK, no retransmit.

```
Sender ──► [Data] ──► [Data] ──► [Data] ──► [Data] ──► Receiver
           (no waiting, no confirming)
```

A dropped packet is just dropped. The application handles it if needed (or ignores it).

---

## Ports — Directing Traffic to the Right App

Every segment/datagram carries a **source port** and a **destination port**.
The destination port tells the receiving machine which application to hand the data to.

```
IP address  →  identifies the correct machine
Port number →  identifies the correct application on that machine

192.168.1.50 : 443  →  the HTTPS server on that machine
192.168.1.50 : 80   →  the HTTP server on that machine
```

---

## Key Points

- Transport layer sits between Application and Internet layers
- TCP: reliable, ordered, acknowledged — for web, email, file transfer
- UDP: fast, connectionless — for gaming, streaming, DNS
- Ports identify which application receives the data
- TCP handles retransmission when segments are lost
