# Textbook 2, Chapter 3: Binary, IP Addressing, and Subnetting 🧠🌐

## Core Terms and Concepts

### 1. Understanding Binary (Base 2) 0️⃣1️⃣
- Binary uses only two digits: **0** and **1**.
- Each position is a power of 2: 128, 64, 32, 16, 8, 4, 2, 1 (for one 8-bit octet).
- Example: `11001010` = 128 + 64 + 8 + 2 = **202**.

### 2. Binary to Decimal 🔢
- Add the place values where bits are `1`.
- Example: `00101101` = 32 + 8 + 4 + 1 = **45**.

### 3. Binary to Hexadecimal (Base 16) 🔡
- Group binary into 4-bit chunks (nibbles).
- Map each nibble to hex (`0000`=0 ... `1001`=9, `1010`=A ... `1111`=F).
- Example: `11011110` -> `1101 1110` -> `DE`.

### 4. Binary to IPv4 🧩
- IPv4 address = **32 bits** split into **4 octets** (8 bits each).
- Convert each octet from binary to decimal.
- Example: `11000000.10101000.00000001.00001010` = **192.168.1.10**.

### 5. IPv4 vs IPv6 🌍➡️🌐
- **IPv4**: 32-bit addressing (~4.3 billion total addresses).
- **IPv6**: 128-bit addressing (massive address space).
- IPv6 solves long-term address exhaustion and improves hierarchical allocation.

### 6. Early Days of IP Addressing (Classful Era) 🕰️
- Original IPv4 design used **classes** (A, B, C) with fixed network/host boundaries.
- This was simple but wasteful, which led to CIDR and modern subnetting.

## Classful IPv4 Table (A, B, C) 📋

| Class | Leading Bits | First Octet Range | Default Mask | Default CIDR | Networks Available* | Hosts per Network* | Typical Historical Use |
|---|---|---|---|---|---:|---:|---|
| A | `0` | 1-126 | 255.0.0.0 | /8 | 126 | 16,777,214 | Very large organizations and backbone-scale allocations |
| B | `10` | 128-191 | 255.255.0.0 | /16 | 16,384 | 65,534 | Medium to large organizations (universities, enterprises) |
| C | `110` | 192-223 | 255.255.255.0 | /24 | 2,097,152 | 254 | Small organizations and smaller LANs |

\*Classful historical counts shown with traditional usable host math (`2^host_bits - 2`).

### CIDR Sizes for /8, /16, /24 (A, B, C defaults) 🧮
- **/8** -> mask `255.0.0.0` -> host bits: 24 -> hosts: `2^24 - 2 = 16,777,214`.
- **/16** -> mask `255.255.0.0` -> host bits: 16 -> hosts: `2^16 - 2 = 65,534`.
- **/24** -> mask `255.255.255.0` -> host bits: 8 -> hosts: `2^8 - 2 = 254`.

## Subnetting Fundamentals ✂️

### 7. What Subnetting Is
- Subnetting divides one network into smaller logical networks.
- Purpose: better address efficiency, smaller broadcast domains, cleaner routing/control.

### 8. Subnet Masks and CIDR Prefixes 🎭
- Subnet mask marks which bits are network bits vs host bits.
- CIDR prefix (`/n`) is a shorthand for "n network bits."
- Examples:
  - `/24` <-> `255.255.255.0`
  - `/26` <-> `255.255.255.192`
- More network bits = more subnets, fewer hosts per subnet.

### 9. Subnets as Block Parties 🏘️
- Think of a network like a city.
- A subnet is a neighborhood block party.
- Everyone on the same block (subnet) talks locally fast.
- Talking to a different block needs the router (the street gate).

## Address Exhaustion and Modern Reality ⛽

### 10. "IPs Are All Used Up" (IPv4 Exhaustion)
- IANA handed out the last unallocated IPv4 /8 blocks on **February 3, 2011**.
- Meaning: no large central free pool remains for easy growth.
- IPv4 still exists heavily via reuse, reclamation, NAT, and transfer markets.

## Private vs Public IP Addresses 🔐🌎

### 11. Private IPv4 Ranges (RFC 1918)
- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`
- Not routable on the public Internet.

### 12. Public IP Addresses
- Public IPs are globally routable on the Internet.
- They must be globally unique at a given time.

## Ports, NAT, and Global Uniqueness 🚪

### 13. Ports (Transport Endpoints)
- IP address identifies the host/device.
- Port identifies the application/service on that host.
- Example: one public IP can still serve web traffic (`:80`, `:443`) and other services on different ports.

### 14. NAT (Network Address Translation)
- NAT maps private internal addresses to one/few public addresses.
- Common home-router pattern: many private hosts share one public IPv4 via PAT (port address translation).
- NAT helps with IPv4 scarcity but is not a full security solution by itself.

## How a Firewall Works 🧱

### 15. Firewall Basics
- A firewall enforces traffic rules: allow/deny based on IPs, ports, protocols, and connection state.
- Common policies:
  - Inbound: block by default, allow only needed services.
  - Outbound: allow required traffic, optionally restrict risky destinations.
- Stateful firewalls track connection context, not just one packet at a time.

## Misconceptions and Common Confusions ⚠️

- **"IPv4 is completely gone."**
  - False. IPv4 is still widely used; the easy free pool is what ran out.

- **"IPv6 and IPv4 can be mixed in one single address."**
  - False. They are different protocols/address formats (though networks can run dual-stack).

- **"Class A/B/C is how all modern networks are designed."**
  - False. Modern design is CIDR/subnetting, not strict classful boundaries.

- **"Subnet mask and CIDR are different things."**
  - They express the same boundary in different notation forms.

- **"NAT = firewall."**
  - False. NAT translates addresses; firewalling is policy enforcement.

- **"Private IPs can be routed globally on the Internet."**
  - False. Private ranges are not publicly routable.

- **"A public IP means a device is unsafe."**
  - Not automatically. Security depends on exposure, firewall rules, patching, and service configuration.

## Quick Memory Hooks 🧠
- Binary = powers of 2.
- IPv4 = 32 bits, 4 octets.
- IPv6 = 128 bits for scale.
- CIDR = how many bits are network bits.
- Subnetting = splitting neighborhoods.
- NAT = private-to-public translation.
- Firewall = traffic rule enforcement.
