# CIDR — Classless Inter-Domain Routing

CIDR replaced the old classful system (A/B/C) to allow **flexible, efficient allocation** of IP address space.
Instead of being locked into fixed block sizes, CIDR lets you define exactly how many bits belong to the network.

---

## The Problem with Classful Addressing

Under classful rules, you had only three choices:

| Class | Hosts per network | Problem                                               |
|-------|-------------------|-------------------------------------------------------|
| A     | 16,777,214        | Way too large — wasteful for almost any organization  |
| B     | 65,534            | Still too large for most — thousands of IPs wasted    |
| C     | 254               | Too small for many organizations — had to buy multiple |

There was no in-between. CIDR fixed this.

---

## How CIDR Works

CIDR uses a **prefix length** (the `/` number) to define exactly how many bits are the network portion.
The remaining bits are the host portion.

```
192.168.1.0 / 24

/24 means: first 24 bits = network, last 8 bits = hosts

11000000.10101000.00000001 . 00000000
└──────── network (24 bits) ─────────┘ └─ hosts ─┘
```

You can use **any prefix length from /1 to /32** — not just /8, /16, /24.

---

## The Tradeoff: Network Size vs Host Addresses

Every bit you add to the network portion is a bit taken away from hosts.
More subnets = fewer hosts per subnet. Fewer subnets = more hosts per subnet.

```
← More hosts per subnet          More subnets →
/8      /16      /24      /25      /26      /30
```

### Full Tradeoff Table

| CIDR | Network Bits | Host Bits | Usable Hosts  | Typical Use                        |
|------|-------------|-----------|---------------|------------------------------------|
| /8   | 8           | 24        | 16,777,214    | Very large network (Class A equiv) |
| /16  | 16          | 16        | 65,534        | Large network (Class B equiv)      |
| /24  | 24          | 8         | 254           | Small LAN (Class C equiv)          |
| /25  | 25          | 7         | 126           | Two equal halves of a /24          |
| /26  | 26          | 6         | 62            | Four subnets from a /24            |
| /27  | 27          | 5         | 30            | Small department                   |
| /28  | 28          | 4         | 14            | Very small group                   |
| /29  | 29          | 3         | 6             | Tiny segment                       |
| /30  | 30          | 2         | 2             | Point-to-point link (router to router) |
| /32  | 32          | 0         | 1 (host only) | Single host route                  |

**Formula: Usable hosts = 2ⁿ − 2** (n = host bits; −2 for network and broadcast addresses)

---

## Visualizing the Tradeoff

Splitting a /24 into smaller subnets:

```
192.168.1.0 /24   →   256 addresses, 254 hosts

Split into /25:
  192.168.1.0   /25  →  128 addresses, 126 hosts
  192.168.1.128 /25  →  128 addresses, 126 hosts

Split into /26:
  192.168.1.0   /26  →  64 addresses, 62 hosts
  192.168.1.64  /26  →  64 addresses, 62 hosts
  192.168.1.128 /26  →  64 addresses, 62 hosts
  192.168.1.192 /26  →  64 addresses, 62 hosts
```

Each extra bit borrowed **doubles the number of subnets** and **halves the hosts per subnet**.

---

## CIDR Notation vs Subnet Mask

Both express the same thing — two different formats:

| CIDR | Subnet Mask       | Binary                              |
|------|-------------------|-------------------------------------|
| /8   | 255.0.0.0         | 11111111.00000000.00000000.00000000 |
| /16  | 255.255.0.0       | 11111111.11111111.00000000.00000000 |
| /24  | 255.255.255.0     | 11111111.11111111.11111111.00000000 |
| /25  | 255.255.255.128   | 11111111.11111111.11111111.10000000 |
| /26  | 255.255.255.192   | 11111111.11111111.11111111.11000000 |
| /27  | 255.255.255.224   | 11111111.11111111.11111111.11100000 |
| /28  | 255.255.255.240   | 11111111.11111111.11111111.11110000 |
| /30  | 255.255.255.252   | 11111111.11111111.11111111.11111100 |

---

## Key Points

- CIDR notation is written as **IP/prefix** (e.g. 192.168.1.0/24).
- The prefix length tells you how many bits are the **network portion**.
- Adding bits to the network = **more subnets, fewer hosts each**.
- Removing bits from the network = **fewer subnets, more hosts each**.
- /30 is the smallest practical subnet — only 2 usable hosts (used for router-to-router links).
- /32 is a single host — used in routing tables to refer to one specific device.
