# DARPANET

> Note: This class uses **DARPANET** (Defense Advanced Research Projects Agency Network).

---

## What Was DARPANET?

- A military research network funded by **DARPA** (Defense Advanced Research Projects Agency).
- Launched in **1969** — the direct predecessor to the modern internet.
- Originally connected universities and military research institutions.
- The first message ever sent crashed the receiving node after two letters ("LO" of "LOGIN").

---

## Core Design Idea

- The idea was **packet switching** — if one node or route is destroyed, packets automatically reroute around the damage.
- No single point of failure; the network could keep functioning even with nodes knocked out.
- This distributed design became the foundation of how the internet works today.

```
Normal route destroyed:

  A ──── B ──── C            A ──── B  ✗  C
  │             │    →        │             │
  D ──── E ──── F             D ──── E ──── F
                                  ↑
                            packets reroute automatically
```

---

## How DARPANET Relates to IP Addresses

- DARPANET needed a way to **uniquely identify every node** on the network so packets could be addressed and routed.
- This led to the development of the **Internet Protocol (IP)** and the IP address system.
- Each machine on the network was assigned a numeric address — the origin of what we now call an IPv4 address.
- The original addressing was classful (Class A, B, C) to assign large blocks to universities, agencies, and governments.
- As the network grew into the public internet, the address space became a global resource managed by **IANA**.

---

## Security Risks of DARPANET

DARPANET was designed as a **trusted network** among known research partners — security was an afterthought.

| Risk                  | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| No encryption         | All data transmitted in plaintext — anyone on the network could read it     |
| No authentication     | Nodes trusted each other by default — no login or identity verification     |
| No access control     | Any connected node could send packets to any other node                     |
| Cleartext protocols   | Protocols like Telnet and FTP (still in use today) were born here — no encryption built in |
| Single routing table  | Early routing was centralized — a corrupted table could misdirect all traffic |

> These foundational weaknesses are why modern networks require **encryption (HTTPS/SSH)**, **firewalls**, and **authentication** — the original design assumed everyone on the network could be trusted.
