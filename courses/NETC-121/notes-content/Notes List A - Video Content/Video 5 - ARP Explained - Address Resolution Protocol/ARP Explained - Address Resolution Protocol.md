# Video 5 - [ARP Explained - Address Resolution Protocol](https://www.youtube.com/watch?v=cn8Zxh9bPio)

## Overview

`ARP`, or `Address Resolution Protocol`, is used on a local network to match an IP address to a MAC address. A device may know the target IP already, but it still needs the target MAC address to send data on the LAN.

## Why ARP Is Needed

| Address Type | What It Does |
| --- | --- |
| IP address | Locates the device logically on the network |
| MAC address | Identifies the actual local network interface |

A host can know the destination IP and still be unable to send the frame until it learns the destination MAC.

## ARP Process

| Step | What Happens |
| --- | --- |
| 1 | Device checks its ARP cache |
| 2 | If no match exists, it sends a broadcast asking who owns the target IP |
| 3 | The correct device replies with its MAC address |
| 4 | The sender stores the result in its ARP cache |
| 5 | Communication can proceed |

## ARP Cache

The ARP cache is a local table of IP-to-MAC mappings.

| Benefit | Why It Matters |
| --- | --- |
| Faster communication | Avoids repeating broadcasts every time |
| Less traffic | Reduces unnecessary LAN-wide ARP requests |

### Windows Example

`arp -a` shows the current ARP cache entries.

## Dynamic vs Static ARP

| Type | How It Is Created | Typical Behavior |
| --- | --- | --- |
| Dynamic | Learned automatically through ARP broadcasts | Temporary and aged out over time |
| Static | Added manually by an administrator | Remains until removed or changed |

## Static ARP Entry Example

`arp -s <ip-address> <mac-address>`

Administrators may use static entries when devices communicate often or when they want tighter control and fewer broadcasts.

## Broadcast Role in ARP

ARP begins with a broadcast because the sender does not yet know which device owns the target IP.

| ARP Message Type | Purpose |
| --- | --- |
| Broadcast request | Ask everyone on the subnet who owns a target IP |
| Unicast reply | Send the MAC address back to the requester |

## Why ARP Matters in Networking

- It connects Layer 3 addressing to Layer 2 delivery.
- It allows a device to send frames to the correct local interface.
- It improves efficiency through ARP caching.

## Key Takeaways

- ARP resolves IP addresses to MAC addresses.
- It is primarily used inside the local network.
- ARP broadcasts ask who owns an IP, and the owner replies with its MAC.
- ARP caches make future communication faster and quieter.
