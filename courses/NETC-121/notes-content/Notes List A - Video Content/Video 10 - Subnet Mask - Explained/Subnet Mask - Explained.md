# Video 10 - [Subnet Mask - Explained](https://www.youtube.com/watch?v=s_Ntt6eTn94)

## Overview

A subnet mask tells you which part of an IP address is the network portion and which part is the host portion. It is essential for understanding local delivery, subnetting, and how large networks are broken into smaller pieces.

## IP Address and Subnet Mask Relationship

| Item | Purpose |
| --- | --- |
| IP address | Identifies a device on a network |
| Subnet mask | Reveals how much of that IP belongs to the network |

Example:

| Value | Example |
| --- | --- |
| IP address | `192.168.1.0` |
| Subnet mask | `255.255.255.0` |

## Binary Idea

Computers understand binary, not dotted decimal. The subnet mask works by using:

- `1` bits for the network portion
- `0` bits for the host portion

| Subnet Mask Bit | Meaning |
| --- | --- |
| `1` | This part belongs to the network |
| `0` | This part belongs to the host |

## Easy Default Examples

| Subnet Mask | Network Portion | Host Portion |
| --- | --- | --- |
| `255.0.0.0` | First octet | Last three octets |
| `255.255.0.0` | First two octets | Last two octets |
| `255.255.255.0` | First three octets | Last octet |

## Why Subnetting Exists

Large flat networks create too much broadcast traffic. Subnetting solves that problem by splitting one large network into smaller ones.

| Without Subnetting | With Subnetting |
| --- | --- |
| One huge broadcast domain | Multiple smaller broadcast domains |
| More broadcast noise | Less unnecessary traffic |
| Harder troubleshooting | Easier management |

Routers separate these subnetworks and keep broadcasts from crossing automatically.

## Borrowing Host Bits

Subnetting works by borrowing bits from the host portion and turning them into network bits.

| Borrowed Bits | Result |
| --- | --- |
| More borrowed bits | More subnets |
| More borrowed bits | Fewer hosts per subnet |

## Example Subnet Growth

Starting from `255.255.255.0`:

| New Mask | Subnets | Usable Hosts per Subnet |
| --- | --- | --- |
| `255.255.255.128` | 2 | 126 |
| `255.255.255.192` | 4 | 62 |
| `255.255.255.224` | 8 | 30 |
| `255.255.255.240` | 16 | 14 |
| `255.255.255.248` | 32 | 6 |
| `255.255.255.252` | 64 | 2 |

This tradeoff is one of the most important ideas in subnetting.

## Subnet Classes

Traditional IPv4 networks were often described with default classes.

| Class | Default Mask | Typical Host Capacity |
| --- | --- | --- |
| A | `255.0.0.0` | Very large |
| B | `255.255.0.0` | Medium to large |
| C | `255.255.255.0` | Small |

## CIDR Notation

CIDR, or classless inter-domain routing, is the slash notation form of a subnet mask.

| CIDR | Subnet Mask |
| --- | --- |
| `/8` | `255.0.0.0` |
| `/24` | `255.255.255.0` |
| `/25` | `255.255.255.128` |
| `/26` | `255.255.255.192` |

The slash number counts how many `1` bits are in the mask.

## Key Takeaways

- A subnet mask separates the network and host parts of an IP address.
- `1`s indicate network bits and `0`s indicate host bits.
- Subnetting reduces broadcast traffic and improves manageability.
- Borrowing host bits creates more networks but fewer hosts per network.
- CIDR is a short way to write subnet masks.
