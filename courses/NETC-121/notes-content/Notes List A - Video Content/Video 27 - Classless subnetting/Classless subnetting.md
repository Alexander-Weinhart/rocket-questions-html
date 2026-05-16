# Video 27 - Classless subnetting

## Overview

This video explains why classful `A`, `B`, and `C` addressing is often too rigid and why `CIDR`-style classless subnetting is used instead. The main theme is efficient address use, especially for limited public `IPv4` space.

## Why Classless Subnetting Matters

| Problem | Why It Matters |
| --- | --- |
| Public `IPv4` space is limited | Large fixed classful blocks waste addresses |
| Many organizations need only a few public IPs | A full Class C block is often too large |
| Security and isolation matter | Smaller subnets can limit which devices can participate |

## Review of Classful Defaults

| Classful Size | Default Mask | CIDR Form |
| --- | --- | --- |
| Class A | `255.0.0.0` | `/8` |
| Class B | `255.255.0.0` | `/16` |
| Class C | `255.255.255.0` | `/24` |

The video starts by reviewing these familiar defaults and then shows why we often need blocks that are smaller than a full Class C.

## Cutting a Class C Into Smaller Pieces

Classless subnetting divides a `/24` block into equal power-of-two pieces.

| CIDR | Number of Blocks in a `/24` | Addresses per Block |
| --- | --- | --- |
| `/24` | 1 | 256 |
| `/25` | 2 | 128 |
| `/26` | 4 | 64 |
| `/27` | 8 | 32 |
| `/28` | 16 | 16 |
| `/29` | 32 | 8 |
| `/30` | 64 | 4 |

## Network and Broadcast Reminder

Every subnet still reserves its first and last addresses.

| Reserved Address | Purpose |
| --- | --- |
| First address | Network address |
| Last address | Broadcast address |

That means usable host addresses are always the raw block size minus `2`.

## Smallest Practical Subnet

The video points out that a `/30` is the smallest practical subnet for a normal network connection.

| CIDR | Raw Addresses | Usable Hosts |
| --- | --- | --- |
| `/30` | 4 | 2 |
| `/31` | 2 | 0 in the course model |
| `/32` | 1 | 0 in the course model |

In the course framing, `/31` and `/32` are not useful for normal host subnetting because network and broadcast consume the available space.

## Decimal Mask Pattern

The transcript also walks through how the last subnet-mask octet is built from binary powers of two.

| CIDR | Final Octet |
| --- | --- |
| `/24` | `0` |
| `/25` | `128` |
| `/26` | `192` |
| `/27` | `224` |
| `/28` | `240` |
| `/29` | `248` |
| `/30` | `252` |

## Security Angle

Smaller subnets can also improve control.

| Example | Why It Helps |
| --- | --- |
| `/30` point-to-point router link | Only two usable devices can participate |
| Small subnet for a specific role | Limits the size of the local broadcast domain |

## Public IP Allocation Angle

If a company needs only a handful of static public IPs, classless subnetting avoids wasting an entire Class C block.

| Need | Better Fit |
| --- | --- |
| 1 usable public IP | `/30` link to ISP can support that model |
| Around 5 usable public IPs | `/29` may be more appropriate |
| More public services | Larger block as needed |

## Key Takeaways

- Classless subnetting replaces rigid A/B/C-only thinking.
- It lets address space be divided into practical smaller blocks.
- `/30` is the smallest normal subnet used in these examples.
- Smaller subnets help with both address conservation and tighter network control.
