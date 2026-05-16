# Video 21 - Subnetting and Binary Math

## Overview

Subnetting depends on binary math. IPv4 addresses and subnet masks may be written in decimal, but computers interpret them in bits.

The transcript also emphasizes the practical subnetting question every `NIC` must answer: is the destination local, or must the packet be sent to the default gateway?

## Local vs Remote Decision

| If the destination is... | What the host does |
| --- | --- |
| In the local subnet | Sends directly |
| Outside the local subnet | Sends to the default gateway |

In classful examples, the number of `255` octets in the subnet mask tells you how many leading octets must match for two addresses to be considered local.

## Decimal vs Binary

| Number System | Base | Digits Used |
| --- | --- | --- |
| Decimal | 10 | `0-9` |
| Binary | 2 | `0` and `1` |

## IPv4 and Octets

An IPv4 address has 32 bits divided into four octets.

| Bit Place Values in One Octet |
| --- |
| `128 64 32 16 8 4 2 1` |

## Useful Binary Values

| Decimal | Binary |
| --- | --- |
| 0 | `00000000` |
| 1 | `00000001` |
| 128 | `10000000` |
| 192 | `11000000` |
| 224 | `11100000` |
| 240 | `11110000` |
| 248 | `11111000` |
| 252 | `11111100` |
| 254 | `11111110` |
| 255 | `11111111` |

These values appear often in subnet masks.

## Binary and Subnet Masks

| Mask Value | Binary Meaning |
| --- | --- |
| `255` | All 8 bits belong to the network |
| `0` | All 8 bits belong to the host |

More complex masks mix 1s and 0s to create subnet boundaries.

## Classful Size Comparison

The transcript spends more time on how the address space can be carved up in different ways.

| Class | Default Mask | Approximate Networks | Approximate Hosts per Network |
| --- | --- | --- | --- |
| Class A | `255.0.0.0` | 256 | More than 16 million |
| Class B | `255.255.0.0` | About 65,000 | About 65,000 |
| Class C | `255.255.255.0` | About 16 million | 254 usable hosts |

### Why This Matters

- a small home or `SOHO` setup usually fits a Class C-sized network
- larger organizations often need bigger subnets or multiple routed networks
- the first octet can hint at the original classful range

## Decimal/Binary Conversion Idea

The transcript walks through converting values in both directions.

| Direction | Method |
| --- | --- |
| Binary to decimal | Add the placeholder values for each `1` bit |
| Decimal to binary | Subtract the largest fitting powers of two from left to right |

This matters because subnet-mask values come directly from binary bit patterns.

## Bitwise AND

Devices use a bitwise `AND` between the IP address and the subnet mask to calculate the network address.

| Rule | Result |
| --- | --- |
| `1 AND 1` | `1` |
| `1 AND 0` | `0` |
| `0 AND 0` | `0` |

### Example

| Item | Value |
| --- | --- |
| IP | `192.168.1.5` |
| Mask | `255.255.255.0` |
| Network | `192.168.1.0` |

## Why This Matters for Subnetting

Binary math explains:

- where the subnet boundary is
- how many hosts fit in a subnet
- how addresses are grouped into networks

## Key Takeaways

- IPv4 addressing is really binary underneath the decimal notation.
- Understanding octet values makes subnetting easier.
- Common subnet-mask numbers are just binary patterns.
- Bitwise AND is how devices determine the network portion of an address.
