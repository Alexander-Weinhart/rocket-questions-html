# Video 22 - CIDR & Subnet Mask

## Overview

This note combines three connected topics:

- `CIDR`
- public vs private IP addressing
- the historical background that grew out of early internet development

The transcript also focuses on why `CIDR` became necessary: public IPv4 space is limited, companies usually need only small static blocks, and `NAT` lets many internal devices share very few public addresses.

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

## Why CIDR Replaced Rigid Classful Allocation

The transcript explains that giving every customer a full Class C block was wasteful.

| Problem | CIDR Fix |
| --- | --- |
| Public IPv4 space is limited | Carve address blocks into smaller pieces |
| Many customers need only a few static IPs | Sell smaller prefixes like `/30` or `/29` |
| Large internal networks still need many devices | Use private IP space behind `NAT` |

### Public and Private in Practice

| Scenario | Typical Result |
| --- | --- |
| Home router or firewall | One public-facing address |
| Internal home or company devices | Many private addresses behind the router |
| Company web/VPN services | Static public IPs may be needed |

## CIDR Block-Carving Idea

The transcript walks through carving a `/24` Class C-sized block into smaller subnet pieces.

| CIDR | Number of Equal Blocks in a `/24` | Addresses per Block |
| --- | --- | --- |
| `/24` | 1 | 256 |
| `/25` | 2 | 128 |
| `/26` | 4 | 64 |
| `/27` | 8 | 32 |
| `/28` | 16 | 16 |
| `/29` | 32 | 8 |
| `/30` | 64 | 4 |

Each subnet still loses two addresses to the network and broadcast roles.

## Valid Final-Octet Mask Values

The transcript explicitly builds the last-octet subnet-mask values from binary.

| CIDR | Final Octet in Decimal |
| --- | --- |
| `/24` | `0` |
| `/25` | `128` |
| `/26` | `192` |
| `/27` | `224` |
| `/28` | `240` |
| `/29` | `248` |
| `/30` | `252` |

Values outside that progression are not valid subnet-mask endings for this kind of IPv4 subnetting.

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
- CIDR lets providers carve public address space into practical smaller blocks.
