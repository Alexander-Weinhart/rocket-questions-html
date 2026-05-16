# Video 9 - [Unicast, Multicast, and Broadcast - CompTIA Network+ N10-006 - 1.8](https://www.youtube.com/watch?v=J3W2BAoI3vI)

## Overview

These are the three classic traffic delivery models used on networks. The difference is simple: who receives the traffic.

| Traffic Type | Delivery Pattern | Best Use |
| --- | --- | --- |
| Unicast | One sender to one receiver | Most everyday network traffic |
| Broadcast | One sender to all devices on the local segment | Discovery tasks like ARP or DHCP |
| Multicast | One sender to a selected group | Streaming or group-based delivery |

## Unicast

Unicast is the most common form of communication on modern networks.

| Property | Unicast |
| --- | --- |
| Destination | One specific device |
| Typical examples | Web browsing, file downloads, SSH, email |
| Advantage | Private and direct |
| Drawback | Scales poorly for large groups |

### Why It Matters

If 100 users want the same content and the server uses unicast, the server may need 100 separate streams.

## Broadcast

Broadcast sends one frame to every device on the local network segment.

| Property | Broadcast |
| --- | --- |
| Destination MAC | `FF:FF:FF:FF:FF:FF` |
| Scope | Local network only |
| Router behavior | Routers stop broadcasts |
| Typical examples | ARP request, DHCP discovery |

### Common Uses

| Protocol | Broadcast Purpose |
| --- | --- |
| ARP | Ask which device owns a specific IP address |
| DHCP | Ask whether any DHCP server can assign an IP |

### Important Limitation

Too much broadcast traffic can slow down a network. That is one reason networks are segmented into smaller broadcast domains.

## Multicast

Multicast is the middle ground between unicast and broadcast. It sends traffic to devices that have joined a specific group.

| Property | Multicast |
| --- | --- |
| Destination | A subscribed group |
| Typical range | `224.0.0.0` to `239.255.255.255` |
| Efficiency | Better than unicast for large groups |
| Requirement | Routers and network devices must support it properly |

### Why It Helps

| Method | 100 Viewers Watching the Same Stream |
| --- | --- |
| Unicast | 100 separate copies |
| Broadcast | 1 copy to everyone, even people who do not want it |
| Multicast | 1 copy to interested group members only |

## Quick Comparison

| Question | Unicast | Broadcast | Multicast |
| --- | --- | --- | --- |
| Who receives it? | One device | Everyone on the subnet | Only joined members |
| Efficient for large groups? | No | No | Yes |
| Crosses routers by default? | Yes, if routed | No | Only with multicast support |

## Key Takeaways

- Unicast is one-to-one and is the most common internet traffic model.
- Broadcast is one-to-all but stays within the local network.
- Multicast is one-to-many for selected receivers.
- ARP and DHCP rely on broadcast, while streaming and routing updates often use multicast.
