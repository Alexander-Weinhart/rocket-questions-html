# Week 1 Notes

## Big Picture

Week 1 is mostly about what a network is, why people build networks, the major network size categories, and the basic shapes a network can take.

- A network is two or more devices connected so they can exchange information.
- The connection can be wired or wireless.
- The point of networking is to share resources, communication, and access.

## Core Networking Terms

### Network

- A network exists when devices can communicate with each other.
- Devices on a network may share files, printers, storage, applications, or internet access.
- A network can be very small, like two connected computers, or very large, like a company with many buildings.

### Node

- A **network node** is any participating device on the network.
- Examples: PC, laptop, printer, phone, switch, router, firewall, server.
- If it participates in communication, it counts as a node.

### Local vs Remote Resource

- A **local resource** is stored on your own device.
- A **remote resource** exists on another device across the network.
- Example:
  - A file saved on your laptop is local.
  - A file opened from a file server is remote.

### Online vs Offline

- **Online** means a device is active and reachable on the network.
- **Offline** means it is unavailable.
- A device can be offline because of power loss, cable failure, wireless problems, shutdown, or bad configuration.

### Up vs Down

- **Up** means a link or service is operating.
- **Down** means it is not operating.
- This language is often used for interfaces, links, and devices.

## Network Size Categories

### LAN

- **LAN** stands for **Local Area Network**.
- A LAN usually covers a building, room, floor, or nearby area.
- A LAN is defined more by locality than by the number of devices.
- Example: a home network or a classroom lab network.

### MAN

- **MAN** stands for **Metropolitan Area Network**.
- A MAN covers a city or metro area.
- It is bigger than a LAN but smaller than a WAN.

### WAN

- **WAN** stands for **Wide Area Network**.
- A WAN connects LANs across large geographic distances.
- Anything outside the local network boundary is generally treated as WAN connectivity.
- Example: a branch office connecting back to the main campus.

### WAN Link

- A **WAN link** is the connection used to join distant networks together.
- It connects one LAN to another LAN over distance.
- WAN links are commonly provided by a carrier or service provider.

## Dedicated WAN Connectivity

- Dedicated WAN connectivity uses provider or carrier circuits.
- These links are meant to provide committed connectivity between sites.
- This is different from simply sending traffic across the public internet.
- Dedicated circuits are often chosen when stability, predictability, or business reliability matters.

## Client-to-Site VPN

- A **client-to-site VPN** lets a remote user connect securely into an internal network.
- The remote user acts like a client entering the organization from outside.
- This is useful for working from home or traveling while still accessing internal resources.
- The VPN creates a protected tunnel across the internet.

## Why Networks Are Valuable

- Networks let many users share one internet connection.
- Networks let many users share devices such as printers.
- Networks let organizations centralize storage and services.
- Networks make communication easier between users and systems.

### Shared Internet Model

- A single router uplink can provide internet access to many internal devices.
- This is one of the biggest practical reasons networks exist in homes and businesses.

### Shared Resource Model

- A shared printer can serve many users.
- A shared file server can hold documents for many users.
- Shared resources reduce duplication and simplify management.

## Client and Server Roles

### Server

- A **server** provides resources or services to other devices.
- Examples:
  - file server
  - print server
  - web server
  - authentication server
- In larger environments, servers are usually optimized for service delivery and reliability.

### Client

- A **client** consumes resources provided by a server.
- Example:
  - Your laptop is a client when it opens a file stored on a server.

### Dedicated Server Model

- In a dedicated-server model, the server's main job is to provide services.
- This is better for reliability, performance, and scale than casual sharing from a normal workstation.

### Peer-to-Peer Model

- In a **peer-to-peer** network, devices can act as both client and server.
- This works for small or informal environments.
- It is simpler at first, but it does not scale as well as a dedicated-server design.

## Basic Network Components

- **NIC**: network interface card; gives a device network connectivity.
- **Twisted-pair cable**: common copper Ethernet cabling.
- **Switch**: central wired LAN device that connects endpoints together.
- **WAP**: wireless access point; gives wireless devices access to the network.
- **Router**: connects different networks together.
- **Firewall**: filters and protects traffic between trust boundaries.

### Wireless Router

- A small-office or home **wireless router** is often an all-in-one device.
- It commonly combines:
  - router
  - firewall
  - wireless access point
  - small switch

## Security Baseline

- Endpoints should not be directly exposed to the internet without protection.
- A firewall is part of the minimum baseline for safe internet-connected networks.
- The basic idea is to place internal devices behind a security boundary rather than leaving them openly reachable.

## Network Topologies

Topology describes the physical or logical shape of a network.

### Bus Topology

- A **bus topology** uses one main shared backbone cable.
- All devices connect to that common cable.
- Every device shares the same medium.
- This is simple in concept, but one cable problem can affect the whole segment.

### Star Topology

- A **star topology** connects all endpoints to a central device.
- That central device is often a switch.
- This is one of the most common modern LAN designs.
- If one endpoint cable fails, the rest of the network can keep working.

### Ring Topology

- A **ring topology** connects devices in a loop.
- Each device connects to two neighbors.
- Data travels around the ring.

### Mesh Topology

- A **mesh topology** has multiple interconnections between nodes.
- It is designed for redundancy and alternate paths.
- Mesh improves resilience, but it increases complexity and cost.

### Partial Mesh

- In a **partial mesh**, only some nodes have redundant direct connections.
- This gives some fault tolerance without the full cost of full mesh.

### Full Mesh

- In a **full mesh**, every node has a direct connection to every other node.
- This gives the greatest path redundancy.
- It is expensive and difficult to scale because links increase quickly as nodes are added.
- In modern environments, some full-mesh style connectivity may be achieved over the internet instead of only through dedicated circuits.

### Hub-and-Spoke

- **Hub-and-spoke** is a centralized form of partial mesh.
- One central site or node acts as the hub.
- Other sites connect back to that hub.
- It is simpler than full mesh, but it creates dependence on the central point.

## Topology Comparison

| Topology | Main idea | Strength | Weakness |
|---|---|---|---|
| Bus | One shared backbone | Simple concept | Backbone is a single shared medium |
| Star | All devices connect to one center | Easy to manage and common in LANs | Central device becomes critical |
| Ring | Devices form a loop | Predictable path structure | Breaks can disrupt the loop |
| Partial Mesh | Some redundant links | Better resilience than star-only WANs | More complexity than simple designs |
| Full Mesh | Every node connects to every node | Maximum redundancy | High cost and poor scalability |
| Hub-and-Spoke | Many nodes connect to one hub | Simple and centralized | Hub can become a bottleneck or failure point |

## Interference and Noise

- **Noise** is any unwanted disturbance that reduces signal quality.
- Interference can make communication less reliable.

### RFI

- **RFI** stands for **Radio Frequency Interference**.
- It comes from radio-frequency sources.
- Wireless devices and radio-emitting equipment can contribute to this kind of noise.

### EMI

- **EMI** stands for **Electromagnetic Interference**.
- It comes from electromagnetic sources such as motors, power equipment, or electrical systems.
- EMI can degrade signal quality on copper media.

## Fiber Degradation

- Fiber is not affected by EMI and RFI the same way copper is because it uses light instead of electrical signaling.
- Even so, fiber still has its own limits and failure conditions.
- Signal quality can degrade because of:
  - distance
  - bends
  - poor connectors
  - damage to the cable

## Quick Exam Reminders

- LAN = local building or nearby area.
- MAN = city-scale area.
- WAN = large geographic span that connects LANs.
- WAN link = connection between distant LANs.
- Bus = one shared cable.
- Star = all devices connect to a central device.
- Ring = devices form a loop.
- Full mesh = every node directly connected to every other node.
- Hub-and-spoke = central site with many branch connections.
- RFI = radio-frequency interference.
- EMI = electromagnetic interference.
- Node = any participating device on the network.
- Client = consumes services.
- Server = provides services.
