# Video 14 - [Wireshark Tutorial - Installation and Password sniffing](https://www.youtube.com/watch?v=4_7A8Ikp5Cc)

## Overview

`Wireshark` is a packet analyzer used to capture and inspect network traffic. It helps administrators and students see what is really happening on the wire.

## What Wireshark Does

| Capability | Use |
| --- | --- |
| Live capture | Watch packets as they move through an interface |
| Display filters | Narrow traffic to protocols or addresses of interest |
| Stream following | Reconstruct a TCP conversation |
| Protocol inspection | See headers, fields, and behavior in detail |

## Installation Basics

| Component | Why It Matters |
| --- | --- |
| Wireshark GUI | Main packet analysis interface |
| TShark | Command-line version |
| Npcap | Required on Windows for live capture |

## Common Filters

| Filter | What It Shows |
| --- | --- |
| `arp` | ARP traffic |
| `http` | Cleartext web traffic |
| `telnet` | Telnet sessions |
| `ospf` | OSPF routing traffic |
| `eigrp` | EIGRP traffic |
| `ip.addr == x.x.x.x` | Traffic involving a chosen address |

## Follow TCP Stream

Following a TCP stream lets you reconstruct the full conversation from individual packets.

| Benefit | Why It Helps |
| --- | --- |
| Session visibility | Easier to read application-level exchanges |
| Troubleshooting | Helpful for protocols like Telnet and HTTP |
| Demonstration | Shows why encryption matters |

## Security Lessons from Wireshark

### Telnet

Telnet sends credentials and commands in plaintext.

### HTTP

HTTP sends page content and form data in plaintext.

### HTTPS and SSH

These encrypt the traffic so Wireshark can still capture packets but cannot easily read the payload.

| Protocol | Wireshark Can Read the Content? |
| --- | --- |
| Telnet | Yes |
| HTTP | Yes |
| SSH | No, not normally |
| HTTPS | No, not normally |

## SPAN and RSPAN

Modern switched networks do not automatically send all traffic to every port, so Wireshark usually sees only traffic that reaches its own interface.

| Feature | Purpose |
| --- | --- |
| SPAN | Mirror traffic from one switch port to another on the same switch |
| RSPAN | Mirror traffic from a remote switch across the network |

## Key Takeaways

- Wireshark is one of the best tools for seeing how protocols really behave.
- Filters and stream-following make large captures manageable.
- Telnet and HTTP demonstrate why plaintext protocols are dangerous.
- SSH and HTTPS show the value of encryption.
