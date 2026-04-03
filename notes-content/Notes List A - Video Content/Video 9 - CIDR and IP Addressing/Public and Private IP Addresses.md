# Public and Private IP Addresses

---

## Public IP Addresses

- Assigned by your **ISP** (Internet Service Provider).
- **Routable** on the public internet — packets can reach them from anywhere.
- Unique globally — no two devices on the internet share a public IP.
- Managed and allocated by **IANA** (Internet Assigned Numbers Authority).

---

## Private IP Addresses

- Used **inside** a local network (home, office, school).
- **Not routable** on the public internet — routers drop them at the boundary.
- Can be reused freely by anyone — millions of networks all use 192.168.1.x internally.
- Devices on a private network reach the internet through **NAT** (Network Address Translation), which swaps the private IP for the router's public IP.

```
Private network                   Internet
─────────────────────────────     ──────────────────
192.168.1.10  ─┐
192.168.1.11  ─┼──► Router (NAT) ──► 203.0.113.5 (public IP) ──► internet
192.168.1.12  ─┘
```

---

## Private IP Blocks (RFC 1918)

These three ranges are reserved for private use across all classes:

| Class | Private Range                        | CIDR        | Subnet Mask   | # of Addresses |
|-------|--------------------------------------|-------------|---------------|----------------|
| A     | 10.0.0.0 – 10.255.255.255            | 10.0.0.0/8  | 255.0.0.0     | 16,777,216     |
| B     | 172.16.0.0 – 172.31.255.255          | 172.16.0.0/12 | 255.240.0.0 | 1,048,576      |
| C     | 192.168.0.0 – 192.168.255.255        | 192.168.0.0/16 | 255.255.0.0 | 65,536         |

### Class A Private — 10.0.0.0/8
- Massive block — over 16 million addresses.
- Used by large enterprises, data centers, cloud providers.
- All addresses starting with **10.x.x.x** are private.

### Class B Private — 172.16.0.0/12
- Mid-size block — just over 1 million addresses.
- Range runs from 172.16.x.x through 172.31.x.x.
- Common in medium-sized enterprise networks.

### Class C Private — 192.168.0.0/16
- Smallest of the three — 65,536 addresses.
- The most commonly seen in homes and small offices.
- Most home routers default to **192.168.1.x** or **192.168.0.x**.

---

## Special Addresses to Know

| Address / Range       | Purpose                                              |
|-----------------------|------------------------------------------------------|
| 127.0.0.1             | Loopback — refers to the local machine itself        |
| 169.254.x.x           | APIPA — auto-assigned when DHCP fails                |
| 0.0.0.0               | Unspecified / default route                          |
| 255.255.255.255        | Limited broadcast (all devices on local subnet)      |

---

## Public vs Private — Quick Comparison

| Property         | Public IP              | Private IP                  |
|------------------|------------------------|-----------------------------|
| Routable         | Yes — internet-wide    | No — local network only     |
| Assigned by      | ISP / IANA             | Network admin / DHCP        |
| Unique globally  | Yes                    | No — reused everywhere      |
| Examples         | 203.0.113.5, 8.8.8.8   | 192.168.1.1, 10.0.0.1       |
