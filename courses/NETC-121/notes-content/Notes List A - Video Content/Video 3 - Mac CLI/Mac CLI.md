# Video 3 - Mac CLI

## Overview

This note covers key `macOS` command-line ideas that support networking, troubleshooting, and file navigation. The Mac terminal gives access to many Unix-style tools that help inspect connectivity, system behavior, and local files.

## Why the Mac CLI Matters

| Benefit | Why It Helps |
| --- | --- |
| Direct system access | Useful tools are available from the terminal |
| Strong troubleshooting support | Network checks can be run quickly |
| Cross-platform value | Many commands are similar to Linux workflows |
| Practical lab use | Students can test commands while learning networking concepts |

## Common Navigation Commands

| Command | Purpose |
| --- | --- |
| `ls` | Lists files and folders |
| `cd` | Changes directories |
| `pwd` | Shows the current directory |
| `mkdir` | Creates a folder |
| `cp` | Copies files |

These commands help users move around the system and manage lab materials from the terminal.

## Common Networking Commands

| Command | Purpose |
| --- | --- |
| `ifconfig` | Displays interface information |
| `ping` | Tests reachability to another host |
| `traceroute` | Shows the hop-by-hop path to a destination |
| `nslookup` | Checks DNS results |
| `netstat` | Shows network sessions and port information |

These commands provide quick visibility into addressing, routing, and connectivity.

## Example Troubleshooting Flow

| Step | Command | Reason |
| --- | --- | --- |
| 1 | `ifconfig` | Check interface status and addressing |
| 2 | `ping` | Test nearby or remote connectivity |
| 3 | `nslookup` | Verify name resolution |
| 4 | `traceroute` | Identify where path problems begin |
| 5 | `netstat` | Review connection and port details |

## Mac CLI Strengths

### Unix-Style Tools

The `macOS` terminal shares many commands and ideas with Linux, which makes it useful for broader networking and server work.

### Fast Testing

Terminal tools let users test network behavior without opening multiple graphical apps.

### Useful for Study and Labs

The command line helps reinforce important concepts like interfaces, DNS, routes, and remote reachability.

## Key Takeaways

- The `macOS` CLI is useful for networking and troubleshooting tasks.
- Commands like `ifconfig`, `ping`, `traceroute`, and `nslookup` are core tools.
- The terminal gives practical experience with system and network behavior.
- Learning the Mac CLI builds skills that transfer well to Linux-style environments.
