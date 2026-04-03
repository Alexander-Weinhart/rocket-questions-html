# 🌐 Application Layer

The Application layer is the **top layer** of the TCP/IP model (combining OSI layers 5, 6, and 7). This is where end users and programs interact with the network — browsers, email clients, file transfer tools, and everything visible to humans lives here.

---

## What It Does

The Application layer is responsible for:
- Providing network services **directly to user applications**
- Defining the **format and rules** for how data is presented and exchanged
- Initiating communication that gets passed down to the Transport layer

It does **not** handle how data gets from A to B — that's the lower layers' job. It just defines what the data looks like and means.

---

## Where It Sits

```
┌──────────────────────────────────────┐
│         Application Layer            │  ← you are here
│  HTTP, HTTPS, SMTP, DNS, FTP, DHCP  │
└──────────────────────┬───────────────┘
                       │ hands data down to
┌──────────────────────▼───────────────┐
│           Transport Layer            │
│            TCP / UDP                 │
└──────────────────────────────────────┘
```

---

## Common Application Layer Protocols

| Protocol | Port | Purpose |
|---|---|---|
| HTTP | 80 | Web browsing (unencrypted) |
| HTTPS | 443 | Web browsing (encrypted via TLS) |
| SMTP | 25 | Sending email |
| DNS | 53 | Resolving domain names to IPs |
| FTP | 20/21 | File transfer |
| DHCP | 67/68 | Automatic IP address assignment |
| SSH | 22 | Encrypted remote terminal access |
| Telnet | 23 | Unencrypted remote terminal (legacy) |

---

## How Applications Hand Off to the Network

When a browser loads a webpage:

```
1. User types google.com into browser (Application layer)
2. Browser creates an HTTP GET request
3. HTTP data is passed down to Transport layer (TCP, port 80 or 443)
4. TCP wraps it in a segment
5. Passes to Internet layer (IP packet with destination IP)
6. Passes to Network Access layer (Ethernet frame for local delivery)
7. Sent across the wire
```

The Application layer only knows about **what** to send. Everything below handles **how** to get it there.

---

## Key Points

- 📌 Top layer — the only one users directly interact with
- 📌 Covers OSI layers 5 (Session), 6 (Presentation), and 7 (Application)
- 📌 Examples: HTTP (port 80), SMTP (email), DNS (name resolution)
- 📌 Browsers and applications operate at this layer
- 📌 Passes data down to the Transport layer for delivery
