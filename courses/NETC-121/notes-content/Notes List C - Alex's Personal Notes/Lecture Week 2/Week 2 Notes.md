# Week 2 Notes

## The OSI Model

| TX (goes down) | Layer Name | Device type | Scope | Number | RX (goes up) |
|---|---|---|---|---|---|
| V | Application | Printer, HIDs, device drivers |  | 7 | ^ |
| V | Presentation |  |  | 6 | ^ |
| V | Session | Client and server |  | 5 | ^ |
| V | Transport | DNS server? |  | 4 | ^ |
| V | Network | Routers | Moving between multiple LANs | 3 | ^ |
| V | Data Link | Switches, NICs | Devices in a LAN, MAC addresses | 2 | ^ |
| V | Physical | RJ-45 cables, hubs | From device to device | 1 | ^ |

## IP Address

- An IP address is a number to resolve MAC addresses in a subnet.
- IPv4 examples: `192.168.1.xxx`, `127.0.0.1`, `169.254.xxx.xxx`

### Classes

| Class | Octet rule | Classful IPs (first octet) | RFC 1918 (classless) | Classless subnet mask examples (CIDR included) | Scope |
|---|---|---|---|---|---|
| A | The first octet | `1-127.0.0.0` | `10.0.0.0/8` | `255.0.0.0/8` | Network.host.host.host |
| B | The first two octets | `128-191.0.0.0` | `172.16.0.0/12` | `255.255.0.0/16` | Network.Network.host.host |
| C | The first three octets | `192-223.0.0.0` | `192.168.0.0/16` | `255.255.255.0/24` | Network.Network.Network.host |

### Reserved addresses

- Class C: `192.168.1.0` and `192.168.1.255`
- `0` = network address
- `255` = broadcast address
- Classful has no CIDR or subnet mask.
- `/16` and `/24` are on Class C, but `/16` can be Class B because it is on the borderline.

## MAC Addresses

- Example: `01:32:54:76:85:AB`
- A: 01:32:54
- B: 76:85:AB
- `A` : OUI (Organizationally Unique Identifier), unique to the brand of device or interface card.
- `B` : NIC (Network Interface Card).

## ARP and RARP

- The association between MAC addresses and IP addresses.
- ARP: sends out IP and requests MAC address.
- RARP: sends out MAC address and requests an IP.

## ARP Table

- A database that associates IP and MAC addresses for referencing network devices.
- It is only accessed by the device the table is stored on.
