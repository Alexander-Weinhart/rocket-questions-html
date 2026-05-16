# Video 12 - [DHCP Explained - Dynamic Host Configuration Protocol](https://www.youtube.com/watch?v=e6-TaH5bkjo&vl=en)

## Overview

`DHCP`, or `Dynamic Host Configuration Protocol`, automatically assigns IP settings to clients. It makes address management scalable and avoids the manual labor of static configuration on every endpoint.

## Dynamic vs Static Addressing

| Method | Main Idea | Strength | Weakness |
| --- | --- | --- | --- |
| Static IP | Admin configures each device by hand | Predictable address | Slow to manage and easy to make mistakes |
| Dynamic IP via DHCP | Server assigns settings automatically | Fast, scalable, centralized | Needs a DHCP service available |

## What DHCP Can Assign

| Setting | Purpose |
| --- | --- |
| IP address | Host address for the client |
| Subnet mask | Network boundary |
| Default gateway | Route out of the local subnet |
| DNS server | Name resolution |
| Lease duration | How long the assignment lasts |

## DORA Process

The client typically receives its configuration through the `DORA` exchange.

| Step | Meaning |
| --- | --- |
| Discover | Client asks whether any DHCP server is available |
| Offer | Server offers an address and options |
| Request | Client asks to use the offered address |
| Acknowledge | Server confirms the lease |

## DHCP Scope

A DHCP scope is the address pool the server is allowed to hand out.

| Scope Item | Example |
| --- | --- |
| Start IP | `192.168.1.100` |
| End IP | `192.168.1.200` |
| Exclusion | Reserved addresses kept out of the pool |
| Lease duration | 8 hours, 1 day, or more |

If the scope is exhausted, new clients cannot receive addresses until leases expire or more addresses are added.

## Lease Concept

A DHCP lease is temporary.

| Why Leases Matter | Result |
| --- | --- |
| Devices leave the network | Their addresses can return to the pool later |
| High-turnover environments | Short leases help recycle addresses faster |
| Stable environments | Longer leases reduce DHCP chatter |

## DHCP Reservation

A reservation ties one MAC address to one consistent IP.

| Reservation Benefit | Why It Helps |
| --- | --- |
| Predictable address | Good for printers, servers, cameras |
| Central management | Still managed through DHCP |
| No manual client config | Device can still obtain its IP automatically |

## Where DHCP Runs

| Environment | Typical DHCP Location |
| --- | --- |
| Home / small office | On the router or gateway |
| Enterprise | On a dedicated Windows or Linux server |

On larger segmented networks, a relay agent can forward DHCP requests across routers.

## Key Takeaways

- DHCP automates IP configuration.
- Scopes define the pool of addresses available.
- Leases prevent address waste.
- Reservations give stable addresses to selected devices.
- DHCP is one of the most important services for everyday network operation.
