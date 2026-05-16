# Book 1 Chapter 3 - Switches, Routers, and VLANs

## Chapter Focus
- Considering the value of switches
- Understanding how switches do their magic
- Examining the role of routers
- Getting to know VLANs

## Why This Chapter Matters
- Switches and routers are foundational network devices.
- Even small networks usually need at least one switch and one router.
- VLANs let one physical network be divided into multiple logical networks.
- Learning VLANs before a network grows makes later scaling much easier.

## Understanding Switches

### Hub Review
- A hub is a Layer 1 device.
- It repeats incoming electrical signals out all other ports.
- A hub does not inspect traffic and does not know the destination.
- If a hub has 8 ports, traffic arriving on one port is repeated to the other ports.

### Why Hubs Were a Problem
- Early Ethernet used shared media.
- All devices on the segment could see all transmitted data.
- Every device examined the destination MAC address and decided whether to keep or ignore the frame.
- A broadcast frame uses destination MAC `FF-FF-FF-FF-FF-FF`, so every device accepts it.
- If two devices transmitted at the same time, a collision occurred and both had to retry after a random delay.

### Key Ethernet Facts from the Chapter
- Ethernet was invented in the late 1970s and became commercially available in 1980.
- Ethernet replaced older technologies such as `ARCNET` and `Token Ring`.
- MAC addresses are 48 bits long.
- MAC addresses are written as six octets separated by hyphens.
- Example MAC: `21-76-3D-7A-F6-1E`

### Problems with Shared Ethernet
- Collisions increase as more devices are added.
- Broadcast traffic also increases as the network grows.
- Performance drops because devices waste time retransmitting after collisions.
- Security is weaker because every device sees every frame on the wire.

## Switches to the Rescue
- A switch is essentially an intelligent replacement for a hub.
- A switch is a Layer 2 device.
- It reads Ethernet frame headers and makes forwarding decisions based on destination MAC addresses.
- Unlike a hub, a switch sends a frame only to the port that leads to the destination.

## How Switches Work

### The Three Basic Switch Functions
1. Learning
2. Forwarding
3. Flooding

### Learning
- A switch learns by reading the source MAC address of incoming frames.
- It associates that source MAC address with the port the frame arrived on.
- This information is stored in the `MAC address table`.
- The MAC address table is also called the `forwarding database`.

Example:

- If the switch receives a frame from MAC `21-76-3D-7A-F6-1E` on port 3, it learns that this MAC is reachable through port 3.

### MAC Table Concept
- The switch keeps a running list of which MAC addresses are reachable on which ports.
- One port can map to more than one MAC address.
- That happens when the port connects to another switch instead of directly to one computer.

Important implication:

- A single switch port can be the path to multiple downstream devices.

### Forwarding
- When the destination MAC address is known, the switch looks it up in the MAC table.
- The switch sends the frame only out the matching port.
- This is called `forwarding`.

Example:

- If a frame arrives on port 1 with destination MAC `CD-34-E4-B3-2C-76`, and the switch knows that MAC is on port 7, the switch forwards the frame only to port 7.

### Buffers
- Switches use memory buffers on ports.
- The switch can temporarily hold a complete frame before forwarding it.
- This helps when the destination port is already busy sending or receiving other traffic.

### What the Switch Does Not Change
- The switch forwards an exact replica of the received frame.
- It does not add tracing information to the frame.
- The destination host cannot tell from the frame itself that it passed through a switch.

### Layer 2 Limitation
- Standard switching decisions are based on MAC addresses, not IP addresses.
- The switch does not care what payload is inside the Ethernet frame.
- IP addresses are Layer 3 information and are normally outside the switch's concern.

### Advanced Switches
- Some advanced switches have Layer 3 features.
- When they inspect IP information, they are acting more like routers than simple Layer 2 switches.

### Flooding
- If the switch does not know the destination MAC address, it cannot choose one output port.
- In that case, it floods the frame out all ports except the incoming port.

Important distinction:

- `Broadcasting` means the frame is intended for everyone.
- `Flooding` means the frame has one destination, but the switch has not learned where that destination is yet.

### Why Flooding Is Usually Temporary
- The unknown destination often replies.
- When it replies, the switch learns its source MAC and updates the MAC table.
- Future frames can then be forwarded normally instead of flooded.

## Looking Deeper into Switches

### Collision Domains
- A major advantage of switches is that they reduce collisions.
- A switch divides a network into separate `collision domains`.
- A collision domain is a part of the network where collisions are possible.

With hubs:

- Many devices share one collision domain.

With switches:

- Each switch port and its attached device typically form a separate collision domain.
- An 8-port switch can split one large collision domain into 8 smaller ones.

Important nuance:

- Switches reduce collisions dramatically but do not completely eliminate them in every possible timing scenario.

### Bridging
- A bridge is similar to a switch but usually has fewer ports, often as few as 2.
- A bridge examines destination MAC addresses and decides whether to forward traffic to the other side.
- Historically, bridges were used before switches became common and inexpensive.
- A switch is basically a multiport bridge.

### Media and Speed Bridging
- Bridges can connect different network media types.
- Example: one side could be `Cat5e`, while the other side could be fiber-optic.
- Modern switches can do similar work automatically.
- They can also bridge links with different speeds, such as `1 Gbps` computers and `100 Mbps` printers.
- The switch handles buffering and forwarding between fast and slow ports.

### SFP Ports and Uplinks
- Some switches include `SFP` (small form-factor pluggable) ports.
- SFP ports can support different high-speed media types.
- Examples mentioned in the chapter:
- `10 Gigabit Ethernet (GbE)` over copper
- `8 Gbps Fibre Channel` over fiber

### Why Uplinks Matter
- A link between switches is often called an `uplink`.
- Uplink ports often carry much more traffic than end-user ports.
- If 40 computers are on one switch and 40 are on another, inter-switch traffic must cross the uplink.
- Because of that, faster uplinks make sense.

### SFP Use Cases
- High-speed switch-to-switch uplinks
- High-speed switch-to-server links

### Broadcast Domains
- A broadcast domain is the set of devices that receive a broadcast frame.
- By default, a switch forwards broadcast frames to all ports except the one they came in on.
- Large broadcast domains can waste bandwidth and reduce performance.

### ARP as a Broadcast Example
- `ARP` is a common source of broadcast traffic.
- A host uses ARP to ask for the MAC address associated with a known IP address.
- The ARP request is broadcast to all devices in the broadcast domain.

### Reducing Broadcast Traffic
- Reducing broadcast traffic improves network performance.
- Two main ways to split broadcast domains:
- Routers
- VLANs

### Managed vs Unmanaged Switches
- Managed switches can be monitored and configured remotely.
- They often provide a web interface for management.
- Managed switches need an IP address for management access.
- Unmanaged switches are common in small consumer environments.
- Managed switches are recommended when the network grows and needs better control, troubleshooting, and VLAN support.

## Understanding Routers

### What a Router Is
- A router is a Layer 3 device.
- Routers make decisions using IP addresses.
- At least one router is essential in most modern networks.

### How Routers Differ from Switches
- Switches work with MAC addresses.
- Routers work with IP addresses.
- Switches split collision domains.
- Routers split broadcast domains.
- Switches usually have many ports.
- Routers typically have fewer ports.

### What Routers Can Do
- Connect different IP subnets
- Connect a private network to the internet
- Prevent broadcasts from crossing network boundaries

### Routing Between Subnets
- A router can connect a `10.0.100.x` network to a `192.168.0.x` network.
- A sender on one subnet sends traffic toward the router.
- The router reads the destination IP address.
- It forwards the packet out the interface that leads to the destination subnet.

### Router Path Concept
- In a routed exchange, switches still need MAC addresses.
- The sender needs the router's MAC as the next hop.
- The router also has to know the MAC addresses relevant to each local segment.
- Routing is conceptually simple at the chapter level, but the real packet exchange includes both IP and MAC logic.

## Network Address Translation
- `NAT` is commonly used when a private network connects to the internet.
- The router replaces the private sender IP with its own public IP address.
- The router keeps track of which inside host started the connection.
- When reply traffic returns, the router maps it back to the original private host.
- NAT allows many private devices to share one public IP address.

## Virtual Private Networks
- A `VPN` is a secure connection over a public network such as the internet.
- VPN traffic is encrypted.
- A VPN is often described as a `tunnel`.
- Only the endpoints of the tunnel can meaningfully access the traffic.

### Common VPN Use Cases
- Remote workers securely connecting to the company network
- Site-to-site VPNs connecting offices in different cities

Example idea from the chapter:

- A VPN can connect offices in Los Angeles and Las Vegas so they operate securely across the internet.

## Understanding VLANs

### What a VLAN Is
- A `VLAN` is a virtual network that runs on top of the physical switch infrastructure.
- VLANs operate at Layer 2.
- VLANs are based on switching and MAC-address behavior, not directly on IP.
- In practice, VLANs usually align with IP subnets.

### Why VLANs Matter
- VLANs let one physical switch behave like multiple separate logical switches.
- VLANs help control broadcasts and flooding.
- VLANs make networks easier to organize and scale.

### What VLANs Change
- Frames sent within the same VLAN are forwarded normally.
- Unknown destination flooding is limited to the ports in the same VLAN.
- Broadcast traffic is also limited to the same VLAN.
- VLANs therefore break up broadcast domains.

### VLANs and Routing
- If traffic must move from one VLAN to another VLAN, routing is required.
- Separate VLANs are effectively separate networks.

### Trunk Ports
- Many VLAN-capable switches support `trunk ports`.
- A trunk port can carry traffic for two or more VLANs.
- Trunks let VLANs extend across multiple switches.

### Access Ports
- A port configured for only one VLAN is an `access port`.
- By default, switch ports are usually access ports on `VLAN1`.

### Basic VLAN Setup
- Create the VLAN on the switch.
- Assign the correct ports to that VLAN.
- Repeat across multiple switches as needed.

Example:

- An accounting department VLAN can exist across several switches by assigning the correct access ports on each switch.

## High-Value Takeaways
1. Hubs repeat everything; switches inspect MAC addresses and forward intelligently.
2. The three core switch jobs are learning, forwarding, and flooding.
3. Switches divide collision domains, while routers divide broadcast domains.
4. Broadcast traffic, especially ARP, can become a major performance issue on large networks.
5. Routers connect different IP networks and commonly provide NAT and VPN functions.
6. VLANs create separate logical Layer 2 networks on the same physical switch hardware.
7. Access ports carry one VLAN; trunk ports carry multiple VLANs.
