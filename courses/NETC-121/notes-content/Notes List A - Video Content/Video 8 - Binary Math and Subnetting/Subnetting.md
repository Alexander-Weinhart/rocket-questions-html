# Subnetting

Subnetting divides a large network into smaller, more manageable sub-networks (subnets).
Each subnet is its own logical network with its own range of IP addresses.

---

## Why Subnet?

- Reduces broadcast traffic — broadcasts stay inside their subnet.
- Improves security — isolates groups of devices.
- Efficient use of IP address space.

---

## Subnet Classes (Classful)

| Class | First Octet Range | Default Subnet Mask | CIDR | Network / Host Structure     |
|-------|-------------------|---------------------|------|------------------------------|
| A     | 1 – 127           | 255.0.0.0           | /8   | Network . Host . Host . Host |
| B     | 128 – 191         | 255.255.0.0         | /16  | Network . Network . Host . Host |
| C     | 192 – 223         | 255.255.255.0       | /24  | Network . Network . Network . Host |

> The subnet mask tells the network where the **network portion** ends and the **host portion** begins.

---

## Network Address, Host Addresses, Broadcast Address

For any subnet, the addresses are split into three roles:

```
Example subnet: 192.168.1.0 / 24   (subnet mask: 255.255.255.0)

192.168.1.  0    ← Network address   (host bits all 0s — identifies the subnet)
192.168.1.  1    ┐
192.168.1.  2    │
   ...           ├── Host addresses  (assignable to devices)
192.168.1.254   ┘
192.168.1.255    ← Broadcast address (host bits all 1s — sent to all hosts in subnet)
```

### Network Address
- First address in the subnet.
- Host portion is all **0s** in binary.
- Identifies the subnet itself — **never assigned to a device**.

### Host Addresses
- Everything between the network and broadcast address.
- Total usable hosts = **2ⁿ − 2** (n = number of host bits; subtract 2 for network + broadcast).

### Broadcast Address
- Last address in the subnet.
- Host portion is all **1s** in binary.
- A packet sent here goes to **every device** in the subnet — **never assigned to a device**.

---

## Usable Hosts Formula

| CIDR | Subnet Mask       | Host Bits | Total Addresses | Usable Hosts     |
|------|-------------------|-----------|-----------------|------------------|
| /24  | 255.255.255.0     | 8         | 256             | 254              |
| /25  | 255.255.255.128   | 7         | 128             | 126              |
| /26  | 255.255.255.192   | 6         | 64              | 62               |
| /27  | 255.255.255.224   | 5         | 32              | 30               |
| /28  | 255.255.255.240   | 4         | 16              | 14               |
| /30  | 255.255.255.252   | 2         | 4               | 2                |

**Usable hosts = 2ⁿ − 2**

---

## Quick Example: Breaking a /24 into Two /25s

```
Original:  192.168.1.0 /24  (256 addresses, 254 hosts)

Subnet 1:  192.168.1.0   /25  → hosts 192.168.1.1   – 192.168.1.126
                                  broadcast 192.168.1.127

Subnet 2:  192.168.1.128 /25  → hosts 192.168.1.129 – 192.168.1.254
                                  broadcast 192.168.1.255
```
