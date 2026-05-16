# Video 2 - Windows CLI

## Overview

This video is a quick introduction to the `Windows` command-line interface using `Command Prompt`. The instructor focuses on a few practical commands used throughout the course for addressing, troubleshooting, and path testing.

## Opening the Command Prompt

The video starts by showing how to open the CLI with `Windows + R`, then typing `cmd`.

| Step | Action |
| --- | --- |
| 1 | Press `Windows + R` |
| 2 | Type `cmd` |
| 3 | Open the Command Prompt window |

This gives a typed interface for interacting with the system.

## `ipconfig` Basics

The first major command is `ipconfig`, which displays IP configuration details.

| Value Shown | Why It Matters |
| --- | --- |
| `IPv4` address | Identifies the host on the network |
| Subnet mask | Helps decide whether traffic is local or remote |
| Default gateway | Tells the host where to send remote traffic |

The instructor notes that `IPv6` appears in the output, but the course is focused on `IPv4` during this part of the semester.

### IPv4 Formatting Reminder

An address like `10.211.55.3` is written with dots between values. Leading zeroes are not used.

## IP Address Analogy

The instructor compares the IP address to a phone number.

| Idea | Meaning |
| --- | --- |
| Phone number | Needed to place and receive calls |
| IP address | Needed for a device to communicate on the network |

Without an IP address, a device cannot properly communicate on the network.

## Subnet Mask and Gateway

The subnet mask helps a device decide whether a destination is local or whether the traffic must be sent to the gateway.

| Term | Meaning |
| --- | --- |
| Subnet mask | Defines the size of the local network grouping |
| Default gateway | Exit point to reach outside networks |

The classroom analogy in the video is simple:

- if the destination is in the classroom, it is local
- if it is outside the classroom, it goes out the door
- that door represents the gateway

The instructor also notes that some early labs may not use a gateway because the machines are only communicating locally.

## `ipconfig /all`

Using `ipconfig /all` provides more detail than plain `ipconfig`.

| Extra Information | Why It Helps |
| --- | --- |
| Physical address | Shows the `MAC` address |
| Vendor clue | First part of the MAC can identify the manufacturer |
| DNS server | Shows what system resolves names into IPs |
| Lease information | Shows whether the address was assigned dynamically |

The slash in `/all` is presented as a switch for the command.

## DNS Concept

The video explains `DNS` as a lookup service.

| Human-Friendly Input | What DNS Provides |
| --- | --- |
| `google.com` | The corresponding IP address |
| `espn.com` | The corresponding IP address |

This is compared to looking up a phone number in directory assistance or a phone book. People remember names more easily than IP addresses, so the computer asks a DNS server for the matching address.

## DHCP Lease Idea

The transcript explains that there are two ways to get an IP configuration:

| Method | Description |
| --- | --- |
| Static | Typed in manually |
| Dynamic | Requested automatically from a local server |

For most endpoints, the address is assigned automatically. The server also provides the subnet mask, gateway, and DNS server.

### Lease Behavior

When an address is assigned dynamically, it comes with a lease time.

| Lease Event | What Happens |
| --- | --- |
| Lease active | Device uses the assigned address |
| Lease expires | Device asks to renew |
| Renewal response | Server may keep the same address or assign a different one |

The instructor compares this to musical chairs: you get an address that works, but you do not control exactly which one.

## `cls`

The `cls` command is used to clear the screen and tidy up the display.

## `ping`

The next major command is `ping`, which is used to test connectivity.

| Command | Purpose |
| --- | --- |
| `ping google.com` | Test whether the destination can be reached |

The video points out that `ping` first causes a DNS lookup when a hostname is used. Once the name is resolved, the system sends traffic to the returned IP address.

### Ping Timing

The important result is the response time, measured in milliseconds.

| Ping Detail | Meaning |
| --- | --- |
| Reply received | Destination responded |
| Time in `ms` | Round-trip delay |
| Minimum / maximum / average | Summary statistics after the test |

The instructor notes that Windows sends four pings by default and then stops automatically.

## `tracert`

The video then shows `tracert`, short for trace route.

| Command | Purpose |
| --- | --- |
| `tracert google.com` | Show the path traffic takes to the destination |
| `tracert espn.com` | Show another example route |

`Tracert` shows timing information and the systems encountered along the path.

### Failed Trace Example

The instructor also demonstrates tracing to an address that is not expected to work, which leads to timeouts.

| Situation | Result |
| --- | --- |
| Valid route | Trace completes |
| Bad or unreachable target | Repeated timeouts may appear |

If the command needs to be stopped manually, `Ctrl + C` ends it.

## Commands Covered

| Command | Main Use |
| --- | --- |
| `cmd` | Open the Command Prompt |
| `ipconfig` | Show IP address, subnet mask, and gateway |
| `ipconfig /all` | Show detailed configuration including MAC and DNS |
| `cls` | Clear the screen |
| `ping` | Test connectivity |
| `tracert` | Show the route to a destination |
| `Ctrl + C` | Stop a running command |

## Key Takeaways

- `Windows` CLI is a practical tool for networking work.
- `ipconfig` and `ipconfig /all` reveal core addressing information.
- The subnet mask helps determine whether traffic is local.
- The gateway is used to reach outside networks.
- `DNS` translates names into IP addresses.
- `Ping` measures connectivity and delay.
- `Tracert` shows the path traffic takes across the network.
