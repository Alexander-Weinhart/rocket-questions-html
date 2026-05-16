# Video 19 - CIDR & Subnet Mask

## Overview

This note combines three connected topics:

- `CIDR`
- public vs private IP addressing
- the historical background that grew out of early internet development

## CIDR

`CIDR`, or `Classless Inter-Domain Routing`, replaced rigid classful addressing with flexible prefix lengths.

| CIDR | Subnet Mask | Usable Hosts |
| --- | --- | --- |
| `/24` | `255.255.255.0` | 254 |
| `/25` | `255.255.255.128` | 126 |
| `/26` | `255.255.255.192` | 62 |
| `/27` | `255.255.255.224` | 30 |
| `/28` | `255.255.255.240` | 14 |
| `/30` | `255.255.255.252` | 2 |

### Main CIDR Idea

More network bits create more subnets but fewer hosts per subnet. Fewer network bits create fewer subnets but larger host ranges.

## Public vs Private IP Addresses

| Type | Meaning |
| --- | --- |
| Public IP | Routable on the internet and globally unique |
| Private IP | Used inside local networks and not routable on the public internet |

### Private IPv4 Ranges

| Range | CIDR |
| --- | --- |
| `10.0.0.0 - 10.255.255.255` | `/8` |
| `172.16.0.0 - 172.31.255.255` | `/12` |
| `192.168.0.0 - 192.168.255.255` | `/16` |

Private addresses usually reach the internet through `NAT`, where a router translates internal addressing to a public IP.

## Historically Important Background

The source notes also tied this topic to the early internet and the old `DARPANET` idea.

| Historical Point | Why It Matters |
| --- | --- |
| Early packet-switched networking | Showed that traffic could reroute around failures |
| Need for unique node identification | Helped drive the need for structured IP addressing |
| Classful addressing | Early attempt to divide address space at scale |
| Growth of the internet | Forced the move toward CIDR and more efficient allocation |

## Special Addresses to Know

| Address | Meaning |
| --- | --- |
| `127.0.0.1` | Loopback |
| `169.254.x.x` | APIPA / self-assigned after DHCP failure |
| `255.255.255.255` | Limited broadcast |

## Key Takeaways

- CIDR gives flexible control over subnet size.
- Public IPs are internet-routable; private IPs are local-use only.
- NAT connects private networks to the public internet.
- Early internet design and address growth are part of why modern IP allocation looks the way it does.
