# Book 1 Chapter 1 - Network Basics

## Chapter Focus
- Getting a handle on networks
- Why networking is useful and common
- Server vs client roles
- How networks change daily computing
- Basic topology concepts
- What a network administrator does

## Core Definition
- A network is two or more computers/devices connected (wired or wireless) so they can exchange information.

## Basic Home/Small Office Design
- Wired devices connect through a switch.
- Wireless devices connect through a WAP (wireless access point).
- In most homes/small offices, a wireless router combines:
- Router
- Firewall
- WAP
- Small built-in switch (often 3-5 wired ports)
- Router links internal network to the internet.

## Network Lingo (Must Know)
- `LAN` (Local Area Network): local network in a building/campus area.
- `Node`: any device on the network.
- `Online`: device is on and can access network.
- `Offline`: device cannot access network.
- `Up`: device is operational.
- `Down`: device is off, failed, or under maintenance.
- `Local resource`: on your own device.
- `Remote resource`: on another network device.
- `Internet`: global network of networks.

## Why Networks Are Useful
- Shared internet access for all devices through one connection.
- File sharing between users/devices.
- Resource sharing (printers, storage).
- Program sharing through shared drives and licensing models.
- User communication (email, messaging, meetings, video calls).

## Security Baseline
- A firewall is mandatory when connected to the internet.
- Never expose a computer directly to the internet without firewall protection.
- Most modern home routers include built-in firewall functions.

## Servers and Clients
- `Server`: provides shared resources (files, printers, apps) to others.
- `Client`: consumes shared resources.
- Typical pattern:
- Fewer servers
- More clients
- Servers are usually more powerful because many users depend on them.

## Network Models
### Dedicated-server model
- Server runs server-focused OS and mainly provides network services.
- Better for performance and centralized control.

### Peer-to-peer model
- Any device can share resources and also act as a client.
- Simpler and cheaper for small environments.
- Less efficient/scalable for larger networks.

### Hybrid model
- Common in real environments: dedicated servers plus some peer sharing.

## Key Network Components
- `Network interface (NIC)`: hardware enabling network connectivity.
- `Twisted-pair cable`: common copper cabling for Ethernet.
- `Switch`: connects wired devices in a LAN.
- `WAP`: provides wireless access to wired network.
- `Router`: connects internal network to external networks (internet).
- `Firewall`: filters/protects traffic between trusted and untrusted networks.
- `Wireless router`: combined firewall + router + WAP + switch for small networks.

## Putting Components Together
### Small network
- One wireless router can handle firewall/routing/Wi-Fi/some wired ports.

### Growing network
- Add a dedicated switch when router port count is not enough.
- In larger layouts, firewall router, switch, and WAP may be separate devices.

## Network Size Categories
- `LAN`: local area (single building or nearby buildings).
- `MAN`: city-scale network connecting multiple LANs.
- `WAN`: large geographic network connecting distant LANs.
- Size category is based on geographic scope, not just device count.

## How Networks Change Personal Computing
- Your computer is no longer fully independent on a network.
- You must follow shared rules for files, security, storage, and resource use.
- Shared environments introduce wait times, maintenance windows, and policy controls.

## Practical Constraints in Shared Networks
- Cannot delete or alter shared files carelessly.
- Must use credentials (user ID/password) for controlled access.
- Shared printers/files may be busy or locked.
- Shared storage is limited and must be managed.
- Malware can spread over network if controls are weak.
- Sensitive data on shared systems requires careful handling.
- Servers can go offline for updates/maintenance.

## Network Administrator Role
- Owns network reliability, organization, and day-to-day operations.
- Typical duties:
- Capacity/storage monitoring
- Backups
- User access management
- Basic troubleshooting/escalation
- Coordination of maintenance windows
- Organizational discipline is as important as technical skill.

## High-Value Takeaways
1. Networks are about structured sharing (internet, files, resources, software, communication).
2. Security is non-optional when connected to the internet.
3. Server/client roles determine how resources are provided and consumed.
4. Small networks often use all-in-one devices; larger networks split roles across components.
5. A managed network environment trades personal independence for shared capability and scale.
