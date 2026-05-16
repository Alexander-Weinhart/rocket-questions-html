# Video 10 - [Ethernet Frame Format Explanation](https://www.youtube.com/watch?v=JsYqqDqmQaE)

## Overview

An Ethernet frame is the Layer 2 container that carries data across a local network. It includes addressing, protocol identification, payload, and error detection.

## Main Ethernet Frame Fields

| Field | Purpose |
| --- | --- |
| Preamble / SFD | Synchronizes communication and marks frame start |
| Destination MAC | Identifies the intended local receiver |
| Source MAC | Identifies who sent the frame |
| Type / EtherType | Identifies the Layer 3 protocol inside |
| Data | Carries the payload, usually an IP packet |
| FCS | Detects corruption using CRC |

## Frame Layout

| Field | Typical Size |
| --- | --- |
| Destination MAC | 6 bytes |
| Source MAC | 6 bytes |
| Type | 2 bytes |
| Data | 46 to 1500 bytes |
| FCS | 4 bytes |

## Encapsulation

Encapsulation means one layer wraps another.

| Layer | What It Carries |
| --- | --- |
| Application | User data |
| Transport | TCP or UDP segment |
| Network | IP packet |
| Data Link | Ethernet frame |

An Ethernet frame carries the IP packet across the local link. The IP packet is the end-to-end cargo; the Ethernet frame is the local delivery vehicle.

## MAC vs IP Addressing

| Address Type | Scope | Role |
| --- | --- | --- |
| MAC address | Local link only | Next-hop delivery on the LAN |
| IP address | End-to-end path | Logical destination across networks |

Routers remove the old Ethernet frame and build a new one for the next hop, but the IP packet continues toward the final destination.

## EtherType Examples

| EtherType | Protocol |
| --- | --- |
| `0x0800` | IPv4 |
| `0x86DD` | IPv6 |
| `0x0806` | ARP |

## CRC and FCS

The `FCS` field stores a `CRC` value so the receiver can detect whether the frame was damaged in transit.

| Step | What Happens |
| --- | --- |
| 1 | Sender calculates CRC and places it in the FCS |
| 2 | Frame travels across the wire |
| 3 | Receiver recalculates CRC |
| 4 | If the values differ, the frame is dropped |

### Important Note

Ethernet detects damage but does not fix it. Retransmission is handled by higher-layer protocols like TCP.

## Key Takeaways

- Ethernet frames are the basic Layer 2 structure of wired LAN communication.
- MAC addresses handle local delivery; IP addresses handle wider routing.
- Encapsulation allows each layer to do a separate job.
- The FCS uses CRC to catch damaged frames before they move upward in the stack.
