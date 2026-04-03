# Week 8 - Video 17: Trunking and 802.1Q

## Core Idea

The most important thing to know about **trunking** is this:

- Trunking allows multiple VLANs to travel between network devices over the same link.

To understand trunking, you first need a solid understanding of VLANs.

## VLANs and Subnets

- VLANs are a Layer 2 concept used to segment a switched network.
- Each VLAN creates a separate broadcast domain.
- In practical design, a VLAN usually maps to a subnet.
- This ties the Layer 2 VLAN concept to Layer 3 routing.

If VLANs only worked on one switch, network design would not scale well.  
Trunk links solve that problem by carrying VLAN traffic between switches and other devices.

## Trunking vs Tagging

- **Trunking** is the Cisco term.
- Many vendors describe the same idea as **tagging**.
- The purpose is the same: keep VLAN traffic identified as it moves between devices.

## ISL vs 802.1Q

Cisco originally used **ISL** (**Inter-Switch Link**) for trunking between Cisco switches.

That was replaced by the industry standard:

- **802.1Q**

Today, **802.1Q** is the real standard used across vendors.

## How 802.1Q Works

When traffic belongs to a VLAN, the frame is marked with VLAN information as it crosses a trunk link.

Example:

- A wireless client joins a public SSID
- The public SSID maps to VLAN 10
- As traffic leaves the access point and moves across the network, it is tagged for VLAN 10

That tag tells network devices which VLAN the traffic belongs to.

Devices that do not understand 802.1Q tagging cannot properly process tagged traffic, which is why switches and other participating devices must support it.

## Where Trunks Are Used

Trunks are commonly used between:

- Switch and switch
- Switch and router
- Switch and server
- Switch and IP phone in voice VLAN scenarios

### Router-on-a-Stick

In a **router-on-a-stick** design:

- One physical router interface handles multiple VLANs
- The router uses **subinterfaces**
- The switch-to-router link is configured as an **802.1Q trunk**

This is common in small and many midsize networks.

### Servers and Virtualization

A server can also use trunking when it hosts virtual machines on different VLANs.

Examples:

- VMware
- Hyper-V

One server NIC can carry traffic for multiple VLANs if the connection is configured for 802.1Q tagging.

### IP Phones and Voice VLANs

IP phones can understand 802.1Q tags.

- Voice traffic can be tagged for a voice VLAN
- A computer connected through the phone can still send normal untagged traffic

This behaves like a limited trunk arrangement, even though Cisco typically refers to it as a **voice VLAN** configuration.

## VTP: Not Real Trunking

**VTP** stands for **VLAN Trunking Protocol**, but the name is misleading.

- VTP is not the real trunking method
- It does not carry VLAN traffic itself
- It replicates VLAN information between switches

What VTP does:

- If VLANs are created on one switch
- VTP can copy that VLAN database to other switches
- It works over actual trunk links

Important limitation:

- VTP can replicate VLAN definitions
- It does **not** assign switch ports to VLANs for you

Port assignments still have to be configured manually.

## DTP: Cisco Dynamic Trunking Protocol

**DTP** is another Cisco protocol.

Its job is to let switches negotiate whether a link should become a trunk.

Two important DTP modes:

- **Auto**: waits passively for the other side to initiate trunking
- **Desirable**: actively tries to form a trunk

Behavior summary:

- Auto + Auto = no trunk
- Desirable + Auto = trunk
- Desirable + Desirable = trunk
- Trunk mode on one side can still send DTP messages and form a trunk with compatible settings on the other side

## Security Concern: VLAN Hopping

DTP was designed to make trunking easier, but it introduced security concerns.

One major risk is a **VLAN hopping attack**, where an unauthorized device gains access to trunk behavior and reaches traffic from multiple VLANs.

Because of that, best practice is:

- Do not rely on DTP negotiation
- Manually configure trunk ports as trunks
- Manually configure access ports as access ports
- Disable automatic trunk negotiation where possible

## Key Takeaways

- Trunking carries multiple VLANs across one link.
- The real standard used today is **802.1Q**.
- ISL was Cisco's older proprietary method and has been replaced.
- VTP replicates VLAN information but is not true trunking.
- DTP negotiates trunks automatically but is usually avoided for security reasons.
- Best practice is to hardcode access ports and trunk ports intentionally.
