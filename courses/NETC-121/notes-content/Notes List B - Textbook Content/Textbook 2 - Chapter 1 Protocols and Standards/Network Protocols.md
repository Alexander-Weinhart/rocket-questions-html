# 📋 Network Protocols and Standards

Before devices from different manufacturers can communicate, everyone has to agree on the rules. That's what protocols and standards are for.

---

## What Is a Protocol?

A protocol is a **defined set of rules** that governs how data is formatted, transmitted, received, and acknowledged between devices.

Think of it as a language: if two devices both speak TCP/IP, they can communicate — regardless of who made them, what OS they run, or what hardware they use.

```
Without protocols:
  Device A: "01001000 01101001" (its own format)
  Device B: ??? doesn't know what to do with this

With protocols:
  Device A: sends HTTP GET (per RFC 2616)
  Device B: knows exactly how to read and respond to an HTTP GET ✅
```

---

## What Is a Standard?

A standard is a **formally documented and agreed-upon protocol** — published by a standards body so that any manufacturer can implement it compatibly.

Key networking standards bodies:

| Organisation | Role | Example Standards |
|---|---|---|
| **IEEE** | Defines networking hardware standards | 802.3 (Ethernet), 802.11 (Wi-Fi) |
| **IETF** | Defines internet protocol standards (RFCs) | TCP, IP, HTTP, DNS |
| **ISO** | Defines the OSI reference model | OSI 7-layer model |
| **IANA** | Manages IP addresses and port numbers | IP address allocation |

---

## Why Standards Matter

Without standards, networking would be a fragmented mess:

```
With standards:
  Cisco router ──► speaks IEEE 802.3 ──► Netgear switch
  Windows PC   ──► speaks TCP/IP     ──► Linux server
  iPhone       ──► speaks 802.11     ──► TP-Link access point

All interoperable because they all follow the same published rules ✅
```

Without standards, every vendor would build proprietary systems that only work with their own equipment.

---

## Key Points

- 📌 **Protocol** — a defined set of rules for data communication
- 📌 **Standard** — a formally published protocol that any manufacturer can implement
- 📌 Standards ensure **interoperability** between different vendors' equipment
- 📌 IEEE publishes hardware standards; IETF publishes internet protocol standards (RFCs)
- 📌 Without standards, devices from different manufacturers couldn't communicate
