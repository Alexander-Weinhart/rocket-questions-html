# Essential Chapter 8 - Introduction to Switch Configuration

## Chapter Focus

Chapter 8 covers practical switch administration topics:

- VLAN concepts and VLAN membership methods
- Core Cisco switch configuration workflow
- Static VLAN setup and verification
- Spanning Tree Protocol (STP) behavior
- Power over Ethernet (PoE) and PoE+/PoE++
- Switch troubleshooting commands and interpretation

## Objectives You Should Know

- Identify and describe the three VLAN types.
- Explain static vs dynamic VLAN membership.
- Use Cisco IOS commands to configure a switch.
- Configure a static VLAN and assign ports.
- Explain why STP is needed and how it prevents loops.
- Describe the five STP states.
- Explain PoE benefits and power sourcing roles.
- Apply switch security and troubleshooting best practices.

## Key Terms

- VLAN (virtual LAN)
- port-based VLAN
- tag-based VLAN
- protocol-based VLAN
- static VLAN
- dynamic VLAN
- `configure terminal` (`conf t`)
- `switch#`, `switch(config)#`, `switch(config-line)#`
- Spanning Tree Protocol (STP)
- BPDU, configuration BPDU, TCN, TCA
- PoE, PD, PSE, endpoint PSE, midspan PSE
- resistive power discovery
- PoE+

## 8-2 Introduction to VLANs

### What a VLAN Does

A VLAN groups hosts as if they are on one LAN, even when physically distributed.  
Main benefits:

- Segmentation by department/location/function
- Better broadcast control
- Better security isolation
- Improved traffic organization

### Three VLAN Types

1. **Port-based VLAN**
- VLAN assignment tied to switch port numbers.
- Devices on assigned ports share that VLAN broadcast domain.

2. **Tag-based VLAN (802.1Q)**
- VLAN ID is inserted into Ethernet frames.
- Enables trunk links to carry multiple VLANs.
- Useful for inter-switch transport and segmentation.

3. **Protocol-based VLAN**
- Membership depends on protocol type.
- Frames not matching configured protocol rules are dropped.

### VLAN Membership Methods

1. **Static VLAN**
- Port-to-VLAN assignment done manually.
- Most common and predictable.

2. **Dynamic VLAN**
- Assignment by MAC address or username.
- Preserves logical membership when users/devices move.

### Trunking and VLAN Tagging

- Trunk ports carry multiple VLANs between network devices.
- Both ends must agree on tagging protocol (normally 802.1Q).
- Endpoint/user ports are usually untagged access ports.
- Tagged trunk frames preserve VLAN identity across switches.

### VTP Note

VLAN Trunking Protocol (VTP) is Cisco proprietary and can propagate VLAN definitions across VTP-capable switches. Useful in some Cisco-only environments, but requires careful design control.

## 8-3 Introduction to Switch Configuration

### Core Mode Progression

```text
Switch> enable
Switch# configure terminal
Switch(config)#
```

### Basic Security and Identity Setup

```text
Switch(config)# hostname SwitchA
SwitchA(config)# enable secret <password>

SwitchA(config)# line console 0
SwitchA(config-line)# login
SwitchA(config-line)# password <console-password>

SwitchA(config)# line vty 0 15
SwitchA(config-line)# login
SwitchA(config-line)# password <vty-password>
```

### Management SVI (Layer 2 Switch Management IP)

```text
SwitchA(config)# interface vlan 1
SwitchA(config-if)# ip address 192.168.1.1 255.255.255.0
SwitchA(config-if)# no shutdown
```

Important: On a Layer 2 switch, this IP is for management access, not inter-network routing.

### Core Show/Save Commands

```text
show running-config
show startup-config
show interfaces status
show interface vlan 1
show interface fa0/1
copy running-config startup-config
```

### Static VLAN Configuration Workflow (Example)

Create VLANs:

```text
Switch(config)# vlan 2
Switch(config-vlan)# name Sales
Switch(config)# vlan 3
Switch(config-vlan)# name Engineering
```

Assign interface to VLAN 2:

```text
Switch(config)# interface fa0/2
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 2
```

Verify:

```text
show vlan
show vlan brief
show vlan name Engineering
show vlan id 3
```

### Voice VLAN

For IP phone traffic on an interface:

```text
switchport voice vlan 219
```

### Inter-VLAN Routing (Router-on-a-Stick)

Use one trunk from switch to router, then create router subinterfaces:

```text
interface fa0/0.2
 encapsulation dot1Q 2
 ip address 172.16.20.1 255.255.255.0
```

Repeat per VLAN, usually keeping subinterface number equal to VLAN ID.

## 8-4 Spanning Tree Protocol (STP)

### Why STP Exists

Redundant links can create Layer 2 loops. STP prevents loops by selecting one active path and blocking redundant alternatives until needed.

### BPDU Role

Switches exchange BPDUs to:

- Elect root switch
- Compute best path to root
- Select forwarding/blocking ports
- Remove loop paths

Related BPDU message types:

- Configuration BPDU (root election/topology info)
- TCN (Topology Change Notification)
- TCA (TCN acknowledgment)

### Root Election and Timers

- Switch with lowest bridge ID wins root election.
- Default hello time commonly 2 seconds.
- Forward delay commonly 15 seconds.

### STP States

1. Blocking
2. Listening
3. Learning
4. Forwarding
5. Disabled (administrative state, not STP decision logic)

### Modern Variants

- RSTP: Faster convergence (often <10 seconds)
- MSTP: Multiple spanning tree instances, VLAN-aware load-sharing
- Cisco PVST/PVST+: Per-VLAN spanning tree implementations

### Link Aggregation Reminder

LACP bundles multiple physical links into one logical channel for bandwidth and redundancy. Member ports should match speed/duplex.

## 8-5 Power over Ethernet (PoE)

### What PoE Solves

PoE delivers data + electrical power over Ethernet cable, reducing separate power-circuit requirements.

### Device Roles

- **PD (Powered Device):** endpoint receiving power (phone, AP, camera)
- **PSE (Power Sourcing Equipment):** provides power
- **Endpoint PSE:** PoE switch port
- **Midspan PSE:** external injector when switch is not PoE-capable

### Standards and Power Levels

- **802.3af (PoE):** up to 15.4W per port
- **802.3at (PoE+):** up to 30W per port
- **802.3bt (PoE++):**
- Type 3 up to 60W
- Type 4 up to 100W

### PoE Discovery

Resistive power discovery checks for a valid PD signature (typically 25 kOhm) before full power is applied.

### Useful PoE Command

```text
show power inline
```

Use it to confirm available, used, and per-port power status.

## 8-6 Troubleshooting the Switch Interface

### Physical-First Troubleshooting

Before CLI deep-dive:

- check cables
- check link LEDs
- check patch panel/device power

### Core Troubleshooting Commands

```text
show ip interface brief
show interface status
show interface <interface-id>
show mac address-table
show version
```

### What to Watch For

- Interface status/protocol mismatches (`up/down`, `down/down`, `administratively down`)
- Wrong VLAN assignment (common cause of “connected but no access”)
- Duplex/speed mismatches causing drops/collisions
- Error counters that keep increasing

Important error counters from `show interface`:

- input errors
- CRC
- runts
- giants
- collisions

### MAC Table for Device Mapping

`show mac address-table` maps learned device MACs to switch ports, useful to locate users/devices and confirm forwarding behavior.

### Uptime/Restart Checks

`show version` confirms uptime and reboot history.  
Frequent restarts may indicate power instability or hardware/software faults.

## Best Practices Summary

- Use explicit access/trunk port configuration.
- Keep VLAN design documented and consistent across switches.
- Secure management access (enable secret, console/vty controls).
- Save config changes (`copy run start`) after validation.
- Verify after every change with show commands.
- Monitor STP, interface errors, and PoE power budget proactively.

## Quick Exam Review

- VLAN type question: port-based, tag-based, protocol-based.
- Static VLAN equals manual port assignment.
- STP prevents loops, not routing.
- BPDU Config packets support root election.
- PoE discovery is done by PSE using resistive discovery.
- `show interface status` and `show mac address-table` are high-value troubleshooting tools.
