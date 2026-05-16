# Video 34 - SSH setup Packet Tracer

## Overview

This video walks through configuring `SSH` access on a switch in `Packet Tracer`. The goal is to move from a local console connection to secure remote management using a username, password, hostname, domain name, and `RSA` keys.

## Starting Conditions

The lab begins with:

| Device | Purpose |
| --- | --- |
| `R3650` switch | Device being configured |
| PC | Used first for console access, then for `SSH` |
| Matching subnet IPs | Needed so the PC and switch can communicate |

The PC begins through the console connection, using Terminal as the Packet Tracer equivalent of PuTTY.

## Core Switch Setup Steps

| Step | Command Idea | Why It Matters |
| --- | --- | --- |
| 1 | `enable` then `config t` | Enter privileged and global config mode |
| 2 | `interface vlan 1` | Prepare the management interface |
| 3 | `ip address ...` and `no shutdown` | Give the switch a reachable management IP |
| 4 | `line console 0` with password and `login` | Secure the console |

The transcript uses `VLAN 1` with a management IP of `1.1.1.1` as the example.

## Console Login Prerequisite

Cisco requires the console login portion to be configured before adding the remote access security features in this demo.

| Console Item | Purpose |
| --- | --- |
| Console password | Protects local access |
| `login` | Forces password checking on the console line |

## Hostname and Domain Name

`SSH` setup also needs identity information.

| Setting | Example from Video |
| --- | --- |
| Hostname | `MySwitch` |
| Domain name | `cnet.local` |

The hostname changes the prompt, which also helps confirm the configuration is active.

## RSA Key Generation

The switch must generate cryptographic keys for `SSH`.

| Command Idea | Important Point |
| --- | --- |
| `crypto key generate rsa` | Creates the key pair |
| `2048` bits | The video says this is the only size to use here |

The transcript notes that smaller key sizes like `512` are not useful for real support tools such as PuTTY.

## VTY Line Configuration

Remote access is then configured on the `VTY` lines.

| Setting | Reason |
| --- | --- |
| `line vty 0 4` | Select remote login lines |
| `transport input ssh` | Allow only secure remote access |
| `login local` | Use the locally created username and secret |

This prevents `Telnet`, which the video calls insecure.

## Local User Creation

The final setup step is creating a local administrator account.

| Setting | Example |
| --- | --- |
| Username | `admin` |
| Privilege level | `15` |
| Secret | `Cisco` |

This gives the user full administrative access after login.

## Testing SSH

After configuration, the PC uses the command prompt to connect over the network.

| Step | Purpose |
| --- | --- |
| `ssh -l admin 1.1.1.1` | Connect to the switch |
| Enter secret | Authenticate |
| `enable` / `show run` | Confirm remote management works |

The password is not echoed back during login, which is normal.

## Key Takeaways

- `SSH` setup requires a reachable switch management IP.
- Cisco setup in this demo includes console security, hostname, and domain name first.
- `RSA` keys are required before secure remote access can work.
- `transport input ssh` disables insecure `Telnet` access.
- A local admin account is used to log in securely from the PC.
