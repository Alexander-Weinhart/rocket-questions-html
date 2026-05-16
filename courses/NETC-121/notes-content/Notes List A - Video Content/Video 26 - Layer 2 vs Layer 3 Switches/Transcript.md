# Week 13 - Video 26: Layer 2 vs Layer 3 Switches

## Main Idea

- A `Layer 2 switch` forwards traffic using MAC addresses.
- A `Layer 3 switch`, also called a `multilayer switch`, can route traffic using IP addresses and can also switch traffic using MAC addresses.
- Layer 3 switches are especially useful for `inter-VLAN routing`, where traffic must move between different VLANs or subnets.

## What a Switch Does

A switch is a network device with multiple ports that accepts Ethernet connections from network devices.

Its basic job is to create a local network by allowing connected devices to communicate and exchange data.

Examples of devices that commonly connect to a switch:

- desktop computers
- laptops
- printers
- servers
- wireless access points
- other switches

## OSI Model Context

The word `layer` refers to the OSI model.

OSI stands for `Open Systems Interconnection`.

The OSI model describes how data moves from software on one device, through the network, and up to software on another device. It breaks network communication into seven layers so each layer has a specific responsibility.

For this video, the important layers are:

| OSI Layer | Name | Main Address Type |
|---|---|---|
| Layer 2 | Data Link | MAC address |
| Layer 3 | Network | IP address |

## Layer 2 Switch

A Layer 2 switch operates at Layer 2 of the OSI model, the `Data Link` layer.

Layer 2 deals with MAC addresses. A Layer 2 switch uses the destination MAC address of a frame to decide which port should receive the traffic.

Basic Layer 2 switching process:

1. Devices connect to switch ports.
2. The switch learns the source MAC addresses of connected devices.
3. The switch stores MAC addresses in a MAC address table.
4. When a frame arrives, the switch checks the destination MAC address.
5. The switch forwards the frame out the port associated with that destination MAC address.

## Layer 2 Example

Suppose Computer A wants to communicate with Computer B.

Computer A creates a frame with Computer B's MAC address as the destination MAC address. Then Computer A sends the frame to the switch.

The switch reads the destination MAC address and checks its MAC address table. If the switch knows which port Computer B is connected to, it forwards the frame only out that port.

This is more efficient than sending every frame to every device.

## Where Layer 2 Switches Are Used

Layer 2 switches are the most common type of switch.

They are used in:

- homes
- small businesses
- medium-sized businesses
- access-layer networks

Layer 2 switches are common because they are fast, inexpensive, and require little configuration for basic use.

## Layer 3 Switch

A Layer 3 switch operates at Layer 3 of the OSI model, the `Network` layer.

Layer 3 deals with IP addresses and routing.

A Layer 3 switch can:

- forward frames using MAC addresses like a Layer 2 switch
- route packets using IP addresses like a router

This is why Layer 3 switches are also called `multilayer switches`. They combine switching and routing features in one device.

## VLAN Review

A VLAN is a Virtual Local Area Network.

VLANs divide a switched network into separate broadcast domains.

Example:

- Support department: VLAN 10
- Sales department: VLAN 20

Each VLAN can have its own IP subnet.

Example:

| Department | VLAN | Example Subnet |
|---|---:|---|
| Support | `10` | `192.168.10.0/24` |
| Sales | `20` | `192.168.20.0/24` |

Because these VLANs use different subnets, devices in VLAN 10 cannot communicate with devices in VLAN 20 using Layer 2 switching alone.

## Why VLANs Need a Layer 3 Device

Layer 2 switches forward traffic within the same VLAN, but they do not route between VLANs.

If the administrator wants VLAN 10 and VLAN 20 to communicate, the network needs a Layer 3 device.

That Layer 3 device could be:

- a router
- a Layer 3 switch

Using a Layer 3 switch is often easier and faster inside a LAN because it can perform inter-VLAN routing directly on the switch.

## Inter-VLAN Routing

`Inter-VLAN routing` means routing traffic between different VLANs.

Example:

- Computer A is in VLAN 10.
- Computer D is in VLAN 20.
- VLAN 10 and VLAN 20 are different IP subnets.
- A Layer 3 device is needed for Computer A to reach Computer D.

A Layer 3 switch can route the traffic between the two VLANs.

## SVIs

An `SVI` is a Switched Virtual Interface.

SVIs are virtual Layer 3 interfaces created on a Layer 3 switch. They allow the switch to route traffic between VLANs.

Each SVI usually acts as the default gateway for devices in that VLAN.

Example:

```ios
interface vlan 10
ip address 192.168.10.1 255.255.255.0
no shutdown
```

Devices in VLAN 10 would use:

```text
192.168.10.1
```

as their default gateway.

## Inter-VLAN Routing with SVIs

Suppose Computer A in VLAN 10 wants to communicate with Computer D in VLAN 20.

The process is:

1. Computer A sees that Computer D is in a different IP subnet.
2. Computer A sends the packet to its default gateway.
3. The default gateway is the SVI for VLAN 10 on the Layer 3 switch.
4. The Layer 3 switch checks its routing table.
5. The Layer 3 switch forwards the packet toward VLAN 20.
6. The packet reaches Computer D.

The important point is that the Layer 3 switch routes between the VLANs the same way a router would, but it does so inside the switching infrastructure.

## Router vs Layer 3 Switch

Routers and Layer 3 switches both operate at Layer 3, but they are not identical.

A router is a dedicated Layer 3 device. It routes packets between networks using IP addresses.

A Layer 3 switch combines two roles:

- Layer 2 switching
- Layer 3 routing

However, a Layer 3 switch cannot do everything a router can do. Routers usually have broader WAN, internet edge, firewall, VPN, NAT, and advanced routing capabilities depending on the model and configuration.

Layer 3 switches are usually best for fast routing inside a LAN or campus network.

Routers are usually best for WAN links, internet edges, and more complex routing roles.

## Layer 2 vs Layer 3 Switch Comparison

| Feature | Layer 2 Switch | Layer 3 Switch |
|---|---|---|
| Main OSI layer | Layer 2 Data Link | Layer 2 and Layer 3 |
| Main address used | MAC address | MAC address and IP address |
| Main job | Switch frames inside a LAN/VLAN | Switch frames and route packets |
| Routes between VLANs | No | Yes |
| Typical configuration | Simple | More complex |
| Typical cost | Lower | Higher |
| Typical speed | Very fast switching | Fast, but routing adds complexity |

## Review

- A switch connects Ethernet devices and allows them to communicate.
- Layer 2 switches use MAC addresses.
- Layer 3 switches use IP addresses for routing and MAC addresses for switching.
- VLANs divide a network into separate broadcast domains.
- Devices in different VLANs usually need a Layer 3 device to communicate.
- Layer 3 switches support inter-VLAN routing.
- SVIs act as virtual interfaces and default gateways for VLANs.
- Routers and Layer 3 switches both route, but routers usually have more complete routing and WAN features.
