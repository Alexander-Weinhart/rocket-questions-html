# Video 18 - Subnetting and Binary Math

## Overview

Subnetting depends on binary math. IPv4 addresses and subnet masks may be written in decimal, but computers interpret them in bits.

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
