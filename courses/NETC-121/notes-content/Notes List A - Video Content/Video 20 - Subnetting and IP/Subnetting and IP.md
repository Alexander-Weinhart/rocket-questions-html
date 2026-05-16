# Video 20 - Subnetting and IP

## Overview

Subnetting divides a larger network into smaller subnetworks. This improves manageability, reduces unnecessary broadcast traffic, and uses address space more efficiently.

The Week 5 transcript also ties subnetting to how data actually travels: the only thing sent on the wire is a `frame`, and that frame needs both addressing information and a payload.

## Frames and Delivery

| Frame Part | Purpose |
| --- | --- |
| Source MAC | Identifies the sender on the local link |
| Destination MAC | Identifies the receiver on the local link |
| Payload | Carries encapsulated Layer 3 and higher data |

Before a frame can be sent locally, the sender needs the destination `MAC` address.

## Why Subnetting Matters

| Benefit | Why It Helps |
| --- | --- |
| Reduced broadcasts | Broadcast traffic stays inside a smaller network |
| Better organization | Departments or functions can be separated logically |
| Better security | Smaller network boundaries reduce exposure |
| Better address use | Network space can be carved into practical sizes |

## Core Address Roles

| Address Type | Purpose |
| --- | --- |
| Network address | Identifies the subnet itself |
| Host addresses | Assigned to devices |
| Broadcast address | Reaches all hosts in the subnet |

## Host Count Formula

Usable hosts are calculated with:

`2^n - 2`

where `n` is the number of host bits.

| CIDR | Subnet Mask | Usable Hosts |
| --- | --- | --- |
| `/24` | `255.255.255.0` | 254 |
| `/25` | `255.255.255.128` | 126 |
| `/26` | `255.255.255.192` | 62 |
| `/27` | `255.255.255.224` | 30 |
| `/28` | `255.255.255.240` | 14 |
| `/30` | `255.255.255.252` | 2 |

## Simple Example

Breaking `192.168.1.0/24` into two `/25` subnets creates:

| Subnet | Host Range | Broadcast |
| --- | --- | --- |
| `192.168.1.0/25` | `192.168.1.1 - 192.168.1.126` | `192.168.1.127` |
| `192.168.1.128/25` | `192.168.1.129 - 192.168.1.254` | `192.168.1.255` |

## ARP and Local Delivery

The original folder also covered `ARP`, which is important when devices communicate inside a subnet.

| Concept | Meaning |
| --- | --- |
| ARP | Resolves an IP address to a MAC address |
| ARP request | Broadcast asking who owns an IP |
| ARP reply | Unicast response giving the MAC address |
| ARP cache | Local table of learned IP-to-MAC mappings |

ARP matters in subnetting because it only works within the local subnet. Once traffic must cross a router, the host uses the default gateway instead of ARPing for the remote destination.

## Public, Private, and Classful Context

The transcript also connects subnetting to older classful addressing and common private IPv4 blocks.

| Class | Default Mask | Approximate Size |
| --- | --- | --- |
| Class A | `255.0.0.0` | About 16 million addresses per network |
| Class B | `255.255.0.0` | About 65,000 addresses per network |
| Class C | `255.255.255.0` | 256 total addresses, 254 usable hosts |

### Common Private Blocks

| Private Range | Class Context |
| --- | --- |
| `10.0.0.0/8` | Class A private block |
| `172.16.0.0` to `172.31.255.255` | Class B private block |
| `192.168.0.0/16` | Class C private block |

## Unicast and Broadcast

The transcript explicitly distinguishes one-to-one delivery from one-to-all delivery.

| Traffic Type | Meaning |
| --- | --- |
| Unicast | Sent to one specific destination |
| Broadcast | Sent to every node on the local network |

ARP relies on broadcast when it asks all devices who owns a target IP address, then receives a unicast reply from the matching device.

## Key Takeaways

- Subnetting breaks a large network into smaller logical pieces.
- Every subnet has a network address, host range, and broadcast address.
- Smaller subnets reduce broadcast noise and improve control.
- ARP supports local communication by mapping IP addresses to MAC addresses within the subnet.
