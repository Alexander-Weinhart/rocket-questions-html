# VLAN - Virtual Local Area Network (Week 7)

## Overview

Many network designs need traffic isolation between groups of devices.  
One option is physical separation: put Network A on one switch and Network B on another switch.  
That works, but it is less flexible, less scalable, and often more expensive than logical separation.

**VLANs** provide logical separation on the same managed switch hardware.

## What a VLAN Is

On a managed switch, each port can be configured individually (speed, duplex, etc.).  
Ports can also be grouped into VLANs.

Example:

- Ports 1-12 in VLAN/Group 10
- Ports 13-24 in VLAN/Group 20

Traffic does not pass directly between VLANs at Layer 2. Devices in VLAN 10 are isolated from VLAN 20 unless routed by a Layer 3 device.

## VLAN Standards and Numbering

- IEEE standard: **802.1Q** (`dot1q`)
- VLAN ID field size: **12 bits**
- 12 bits gives 4096 values (`0-4095`)
- Common statement: VLAN IDs are in the range `0-4095`
- Default switch VLAN is typically **VLAN 1**

By default, many switches boot with all ports in VLAN 1, so all hosts can initially see each other on that switch.

## Frame Tagging (802.1Q)

Inside one switch, the switch can track VLAN membership internally.  
Between switches, VLAN membership must be carried in the Ethernet frame so the next switch knows where that frame belongs.

802.1Q does this by adding a VLAN tag to frames on trunk links.

Analogy: cattle tags.  
Different owners share open land, then tags identify which cattle belong to which owner when it is time to separate them.

## Native VLAN

- By default, **VLAN 1** is the native VLAN on many Cisco-style configs.
- Native VLAN traffic is sent **untagged** on an 802.1Q trunk.
- When two switches connect with default settings, native VLAN frames may cross without a tag.
- Native VLAN can be changed to another VLAN ID for design/security reasons.

## Access Ports vs Trunk Ports

Each switch port should be intentionally configured as one of two modes:

- **Access port**
- Connects to an endpoint (PC, printer, camera, phone in data VLAN mode, etc.)
- Carries one VLAN only (untagged for the endpoint)

- **Trunk port**
- Connects to another switch (or sometimes router/firewall/server NIC with tagging)
- Carries multiple VLANs over one physical link
- Uses 802.1Q tags so receiving switch can keep traffic separated

## Why Tagging Matters Between Switches

A switch can only keep VLAN traffic separate across inter-switch links if frames are tagged on the trunk.  
Without tagging, receiving switches cannot determine original VLAN membership reliably.

When a frame reaches the destination access port, the switch removes VLAN tagging before sending the frame to the end host.  
Because of this, packet captures on endpoints usually do not show VLAN tags unless the NIC is specifically receiving tagged traffic.

## Basic Interface Configuration Example

Put port FastEthernet 0/5 into VLAN 20 as an access port:

```text
configure terminal
interface fa0/5
switchport mode access
switchport access vlan 20
```

Now `fa0/5` belongs to VLAN 20.

Another example for VLAN 10:

```text
interface fa0/1
switchport mode access
switchport access vlan 10
```

## Verifying Behavior

In mixed VLAN designs, hosts in the same VLAN should communicate normally.  
Hosts in different VLANs should not communicate at Layer 2 without routing.

Use show commands (for example `show running-config`, `show vlan brief`, `show interfaces trunk`) to verify actual port membership and trunk state.

## Trunk Links and Bandwidth Concepts

A trunk carries multiple VLANs over one link.  
If two physical links exist between switches, VLAN distribution can be split so each link serves a different VLAN in access mode, or links can be trunked and controlled by STP/LAG design.

If links are in different VLAN contexts, STP behavior can differ by VLAN depending on switch capabilities and STP mode.

## MTU, VLAN Overhead, and Fragmentation

802.1Q tagging adds overhead to Ethernet frames.

- Standard Ethernet payload MTU is commonly 1500 bytes.
- Tagging increases frame size overhead.

If intermediate devices strictly enforce smaller frame limits, larger tagged frames can trigger fragmentation or drops, reducing efficiency.

Operational practice is to ensure MTU consistency across the path and to account for encapsulation overhead when designing tunnels/VLAN paths.

## MSS and TCP Considerations

TCP MSS tuning is often used to avoid fragmentation:

- Typical IP header: 20 bytes
- Typical TCP header: 20 bytes
- Common MSS value: **1460** (fits within 1500-byte MTU with 40 bytes headers)

If PMTUD/MTU discovery fails and packets are oversized, fragmentation or blackholing can occur.  
Adjusting MSS can stabilize flows across constrained links.

## Cisco 2950 Notes

- Cisco 2950 is primarily a Layer 2 switch.
- Uses 802.1Q for VLAN trunking.
- Management access can be configured using an SVI (for example VLAN 1) with an IP address.

Example management SVI:

```text
interface vlan 1
ip address 1.1.1.1 255.0.0.0
```

## ISL vs 802.1Q

Some older Cisco platforms supported proprietary **ISL** in addition to 802.1Q.  
Current multi-vendor practice is 802.1Q (`dot1q`), and that is the standard approach for interoperability.

## Security: Why Explicit Port Modes Matter

Auto trunk negotiation can be a security risk.

Risk scenario:

- User plugs an unmanaged/rogue switch into a wall jack.
- If switchport behavior is permissive, port may negotiate trunking.
- Attacker gains visibility/access across multiple VLANs.

Best practice:

- Force endpoint-facing ports to access mode.
- Assign only required VLAN.
- Disable unused ports.
- Use port-security features where available.

## Practical VLAN Use Case

Scenario:

- Main office has Internet and WAN connectivity.
- Remote office needs a third-party standalone system.
- Security policy says third-party device should not join internal production VLAN.

VLAN solution:

- Place third-party device in dedicated VLAN.
- Carry that VLAN across trunk/WAN path as needed.
- Keep corporate and third-party traffic logically separated without deploying completely separate physical switching infrastructure.

## Key Takeaways

- VLANs provide logical segmentation on shared switch hardware.
- Access ports connect endpoints; trunk ports connect network devices and carry multiple VLANs.
- 802.1Q tagging preserves VLAN identity between switches.
- Native VLAN traffic is typically untagged unless design changes it.
- Correct MTU/MSS planning prevents fragmentation and performance issues.
- Explicit switchport mode configuration is critical for security.
