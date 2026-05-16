# Video 35 - Rack and Patch panel overview

## Overview

This video explains the physical rack and patch-panel layout used in the networking lab. The main goal is to help students understand which ports connect to the internet, which ports connect to devices like the switch and router, and how to patch the lab for different activities.

## Rack Layout

Each rack supports two workstations and contains multiple network devices.

| Rack Position | Device |
| --- | --- |
| Top | `ASA5516` firewall |
| Below firewall | `4221` router |
| Below router | `3650` switch |

The front of the switch exposes switch ports directly, while rear connections from the firewall, router, and switch are brought forward through the upper patch panel.

## Patch Panels

The rack uses two patch panels.

| Patch Panel | Purpose |
| --- | --- |
| Upper 24-port panel | Brings equipment connections from the rack devices to the front |
| Lower panel | Serves the left and right workstation connections |

The lower panel is divided between the two workstations:

| Ports | Workstation Side |
| --- | --- |
| `1-6` | Left workstation |
| `7-12` | Right workstation |

## Lower Panel Legend

The video explains the key workstation ports.

| Port | Meaning |
| --- | --- |
| `1` | Left PC NIC |
| `2` | Left internet connection |
| `4` | Left `RS-232` serial port |
| `7` | Right PC NIC |
| `8` | Right internet connection |
| `10` | Right `RS-232` serial option in the demo context |

The right side is presented as a mirror of the left side.

## Common Internet Patch

To give both stations internet access:

| Connection | Purpose |
| --- | --- |
| `1 -> 2` | Left NIC to internet |
| `7 -> 8` | Right NIC to internet |

The video notes that these internet connections are also switched together across the room.

## Connecting to the Switch

Some labs require the PCs to connect directly to the switch instead of only to the internet feed.

| Example Patch | Result |
| --- | --- |
| Left NIC to an upper switch-facing port | Left PC reaches the switch |
| Right NIC to another upper switch-facing port | Right PC reaches the switch |

The exact chosen switch-facing ports can vary in the demonstration.

## Console Connections

Console access is required when configuring network devices.

| Patch Panel Port | Device Console |
| --- | --- |
| `24` | Switch console |
| `19` | Router console |

The workstation serial port can be patched to those console ports for configuration work.

## Pod Connectivity

The lab layout also supports connecting neighboring stations in a pod.

| Port | Purpose |
| --- | --- |
| `15` | One side pod link |
| `16` | Other side pod link |

By patching those through the switch, the local side of the pod can be connected together. Neighboring stations must also make their own matching connections for the full pod.

## Why the Patching Changes

The required connections depend on the lab goal.

| Goal | Typical Connection Choice |
| --- | --- |
| Just need internet | NIC to internet port |
| Need switch access | NIC patched to switch-facing port |
| Need to configure switch or router | Serial port patched to console port |

## Key Takeaways

- The rack is designed so two workstations share one equipment stack.
- The upper patch panel exposes device-side connections at the front.
- The lower patch panel maps workstation NIC, internet, and serial access.
- Different labs require different patch choices depending on whether you need internet, switch access, or console configuration.
