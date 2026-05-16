# Video 24 - DNS-DHCP

## Overview

This note is for the Week 5 video on `DHCP` servers and leases. The actual title is `DNS-DHCP`, and the topic connects automatic addressing with supporting network services.

## DHCP Server Basics

`DHCP`, or `Dynamic Host Configuration Protocol`, automatically provides network settings to devices.

| Setting Provided | Purpose |
| --- | --- |
| IP address | Identifies the device on the network |
| Subnet mask | Defines the local network size |
| Default gateway | Provides a path to remote networks |
| DNS server | Resolves names into IP addresses |

## Lease Concept

A `DHCP` lease means the IP configuration is assigned for a limited amount of time.

| Lease Event | What Happens |
| --- | --- |
| Lease issued | Device receives network settings |
| Lease active | Device uses the assigned address |
| Lease renewal | Device asks to keep or refresh the assignment |
| Lease expiration | Address may be reassigned if not renewed |

## Why Leases Are Useful

| Benefit | Why It Helps |
| --- | --- |
| Efficient address use | Addresses can be reused |
| Less manual setup | Endpoints are configured automatically |
| Easier network management | Central server controls assignments |

## DNS and DHCP Together

The title links `DNS` and `DHCP` because both help endpoints become usable on a network.

| Service | Role |
| --- | --- |
| `DHCP` | Gives the device its addressing information |
| `DNS` | Helps the device find systems by name |

Without `DHCP`, devices may need manual configuration. Without `DNS`, users would need to remember IP addresses instead of names.

## Key Takeaways

- `DHCP` servers automatically assign IP configuration to devices.
- A lease gives that configuration for a set time period.
- Devices renew leases to continue using their addresses.
- `DNS` and `DHCP` work together to make network access easier and more practical.
