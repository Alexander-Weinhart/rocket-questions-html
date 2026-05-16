# Video 9 - [IP Address - IPv4 vs IPv6 Tutorial](https://www.youtube.com/watch?v=ThdO9beHhpA)

## Overview

This video explains what an IP address is, how `IPv4` and `IPv6` differ, and how computers interpret addresses in binary or hexadecimal form.

## What an IP Address Does

An IP address identifies a device on a network and supports communication.

| IP Address Part | Purpose |
| --- | --- |
| Network portion | Identifies the network |
| Host portion | Identifies the device on that network |

## IPv4 Basics

| Characteristic | IPv4 |
| --- | --- |
| Length | 32 bits |
| Format | Four decimal octets |
| Octet range | `0` to `255` |
| Approximate total addresses | Over 4 billion |

Example structure:

`66.94.29.13`

## Why Binary Matters

Computers do not interpret the dotted-decimal form directly. They work with bits.

| Concept | Meaning |
| --- | --- |
| Bit | A binary digit, either `0` or `1` |
| Octet | Eight bits grouped together |
| Binary conversion | Decimal values are represented by bit positions |

### Octet Values

| Bit Position | Value |
| --- | --- |
| 1 | 128 |
| 2 | 64 |
| 3 | 32 |
| 4 | 16 |
| 5 | 8 |
| 6 | 4 |
| 7 | 2 |
| 8 | 1 |

## Binary Conversion Examples

| Decimal | Binary |
| --- | --- |
| 66 | `01000010` |
| 94 | `01011110` |
| 29 | `00011101` |
| 13 | `00001101` |

This is how an IPv4 address can be represented in a form the computer understands.

## Why IPv6 Exists

`IPv4` eventually became too limited because the internet grew far beyond early expectations.

| Characteristic | IPv6 |
| --- | --- |
| Length | 128 bits |
| Format | Hexadecimal groups separated by colons |
| Address capacity | Vastly larger than IPv4 |

IPv6 provides an enormous address space, enough for the foreseeable future.

## Hexadecimal Basics

IPv6 uses hexadecimal characters.

| Decimal Value | Hexadecimal |
| --- | --- |
| 10 | A |
| 11 | B |
| 12 | C |
| 13 | D |
| 14 | E |
| 15 | F |

Each hexadecimal character represents four bits.

## Binary to Hex for IPv6

| 4-bit Binary | Hex Result |
| --- | --- |
| `0010` | `2` |
| `0110` | `6` |
| `1101` | `D` |
| `1011` | `B` |

This is why a binary section can become something like `26DB` in IPv6 notation.

## IPv4 vs IPv6 Summary

| Feature | IPv4 | IPv6 |
| --- | --- | --- |
| Address length | 32 bits | 128 bits |
| Written form | Decimal octets with periods | Hexadecimal groups with colons |
| Address space | Limited compared to modern needs | Extremely large |

## Key Takeaways

- IP addresses identify devices for network communication.
- IPv4 uses dotted decimal and 32 bits.
- Computers actually process those addresses in binary.
- IPv6 uses 128 bits and hexadecimal notation.
- IPv6 was created to solve the address exhaustion problem of IPv4.
