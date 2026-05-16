# Routers and Routing

## What a Router Does

- A router is a Layer 3 device that forwards packets between different IP networks.
- Routers use destination IP addresses, not destination MAC addresses, to decide where traffic should go next.
- A router separates broadcast domains. A broadcast sent on one subnet does not pass through the router to another subnet.
- In most networks, the router is the default gateway for hosts on that subnet.

## Routers and Gateways

- A `gateway` is any device that serves as an exit point from one network to another.
- In normal LAN design, the router interface on your local subnet is the `default gateway`.
- Hosts send local-subnet traffic directly to the destination host.
- Hosts send remote-subnet traffic to the default gateway, which then forwards it toward the destination network.

### Important Distinction

- People often use `router` and `gateway` like they mean the same thing.
- More precisely:
- `Router` describes the device role: forwarding between networks.
- `Gateway` describes the function from the host's perspective: "send remote traffic here."

## Connecting Separate LANs

- Two separate LANs are commonly connected through a router.
- Each router interface belongs to a different IP subnet.
- Example:
- `192.168.10.0/24` on interface `G0/0`
- `192.168.20.0/24` on interface `G0/1`
- Devices on `192.168.10.0/24` use the router's `G0/0` IP as their gateway.
- Devices on `192.168.20.0/24` use the router's `G0/1` IP as their gateway.

### What Actually Happens When a Host Sends to Another Subnet

1. The source host compares the destination IP to its own subnet mask.
2. If the destination is remote, the host sends the frame to the default gateway's MAC address.
3. The router removes the incoming Layer 2 frame.
4. The router checks the Layer 3 destination IP address.
5. The router looks up the best route in its routing table.
6. The router builds a new Layer 2 frame for the next hop and forwards the packet.

## Routers Can Connect to Other Routers

- A router is not limited to connecting only end-user LANs.
- Routers often connect to other routers across WAN links, leased lines, metro Ethernet, MPLS, or ISP handoffs.
- In larger networks, a router may have:
- one interface to a local LAN
- one interface to another router
- one interface to an ISP
- one interface to a separate branch or server network

## Routing Tables

- A routing table is the list of known destination networks and how to reach them.
- Each route tells the router:
- the destination network or prefix
- the subnet mask or prefix length
- the next hop or exit interface
- sometimes the metric and administrative distance

### Common Route Sources

- `Connected`: network is directly attached to one router interface
- `Static`: manually configured by an administrator
- `Dynamic`: learned from a routing protocol such as RIP, EIGRP, or OSPF

## How a Routing Table Works

- When a router receives a packet, it checks the destination IP address.
- It compares that destination against entries in the routing table.
- The router chooses the `most specific match`, also called the `longest prefix match`.
- If multiple routes exist to the same destination prefix, the router prefers the route with the lowest administrative distance first, then the best metric within that routing source.

### Longest Prefix Match Example

- Suppose a router knows:
- `10.0.0.0/8`
- `10.10.0.0/16`
- `10.10.10.0/24`
- A packet going to `10.10.10.55` matches all three, but the router uses `10.10.10.0/24` because it is the most specific route.

## Default Route

- A `default route` is the route used when no more specific route exists.
- In IPv4, the default route is `0.0.0.0/0`.
- It means "if you do not know any better match, send the packet this way."
- Home routers usually point their default route to the ISP.
- End devices usually point their default gateway to the local router.

### Why Default Routes Matter

- Without a default route, a router can forward only to networks already listed in its table.
- Without a default gateway, a host can communicate only with devices on its own local subnet.

## Static Routing

- `Static routing` means routes are entered manually by an administrator.
- The router does not automatically discover alternative paths.
- To configure static routing correctly, you must know the network topology and the path to each destination.

### When Static Routing Is Good

- Small networks
- Simple hub-and-spoke designs
- Stub networks with only one path out
- Lab environments
- Default routes to an ISP or upstream router

### Advantages of Static Routing

- Simple on small networks
- Predictable behavior
- No routing protocol overhead
- More control over exactly where traffic goes
- Better security in some cases because no route advertisements are exchanged

### Disadvantages of Static Routing

- Does not scale well in large networks
- Manual updates are required whenever topology changes
- Easy to make human mistakes
- No automatic failover unless additional static routes are designed on purpose

## Configuring a Static Route

- This is exam-worthy because it tests whether you understand destination network, mask, and next hop.
- Basic Cisco IOS syntax:

```ios
ip route <destination-network> <subnet-mask> <next-hop-ip>
```

Example:

```ios
ip route 192.168.50.0 255.255.255.0 10.1.1.2
```

- Meaning:
- To reach `192.168.50.0/24`, send traffic to next-hop router `10.1.1.2`.

### Static Default Route

```ios
ip route 0.0.0.0 0.0.0.0 10.1.1.1
```

- This tells the router to send all unknown destinations to `10.1.1.1`.

### Alternate Syntax Using Exit Interface

```ios
ip route 192.168.50.0 255.255.255.0 g0/0
```

- This can work, but using a next-hop IP is often clearer, especially on multi-access networks.

## Dynamic Routing

- `Dynamic routing` means routers exchange route information automatically using routing protocols.
- Instead of manually entering every route, routers learn networks from neighboring routers.
- Dynamic routing is used in larger or more complex environments where routes may change.

### Why Dynamic Routing Exists

- Networks get too large to manage route-by-route by hand.
- Link failures may require traffic to take a different path.
- New networks may be added often.
- Dynamic routing reduces manual administrative work.

## Router Convergence

- `Convergence` is the process of all routers updating and agreeing on the current best paths after a topology change.
- Example topology changes:
- a link fails
- a new router is added
- a route disappears
- a better route becomes available

### Why Convergence Matters

- During convergence, routes may be missing, unstable, or temporarily incorrect.
- Fast convergence means the network recovers more quickly after failures.
- Slow convergence can cause packet loss, black holes, or temporary routing loops.

## Routing Terminology

### Autonomous System

- An `autonomous system` (AS) is a collection of networks under one administrative control that presents a common routing policy.
- Inside one organization, routers may share routing information as part of one AS.
- BGP uses AS numbers to identify different organizations or routing domains.

### Split Horizon

- `Split horizon` is a loop-prevention rule used by distance vector protocols.
- Basic idea: a router should not advertise a route back out the same interface where it learned that route.
- This helps prevent neighbors from feeding the same bad routing information back and forth.

### Administrative Distance

- `Administrative distance` (AD) is a router's trust rating for the source of a route.
- Lower AD is preferred.
- AD decides which route source wins when the same destination is learned from different places.

### Default Route

- The route of last resort used when no specific network match is found.

### Convergence

- The state where all routers have a consistent view of the topology and best paths.

## Distance Vector Routing Protocols

- Distance vector protocols tell neighbors about routes and the distance to those routes.
- They are sometimes described as relying on "neighbor rumors" because each router trusts what its neighbors advertise.
- Routers do not build a full map of the entire network.
- They generally know:
- which direction to send traffic
- how far away the destination is according to the metric

### Examples

- `RIP`
- `RIPv2`
- `IGRP`
- `EIGRP`

### Distance Vector Characteristics

- Simpler conceptually
- Can be easier to configure
- Historically slower convergence than link-state protocols
- Need loop-prevention techniques such as split horizon, route poisoning, and hold-down behavior

## Link-State Routing Protocols

- Link-state protocols build a map of the network topology rather than relying only on neighbor summaries.
- Each router learns the state of links and computes the best path using an algorithm such as SPF (Shortest Path First).
- This usually allows faster and more intelligent convergence in larger networks.

### Examples

- `OSPF`
- `IS-IS`

### Important Note About BGP

- Class lists sometimes group `BGP` beside other advanced routing protocols, but strictly speaking BGP is `path vector`, not link-state.
- BGP is designed mainly for routing between autonomous systems on the internet and between large organizations.

## Metrics

- A `metric` is the value a routing protocol uses to decide which path is better.
- Different protocols use different metrics.

### Common Metric Ideas

- `Hop count`: number of routers crossed
- `Bandwidth`: prefer faster links
- `Congestion`: how busy a path is
- `Latency`: delay across the path
- `Reliability`: stability or error history of the link

### Metric by Protocol

- `RIP`: hop count
- `OSPF`: cost based largely on bandwidth
- `EIGRP`: composite metric, traditionally bandwidth and delay by default, with reliability and load available

## RIP

- `RIP` stands for Routing Information Protocol.
- RIP is a classic distance vector routing protocol.
- It uses hop count as its metric.
- The best route is the one with the fewest router hops.
- Maximum usable hop count is 15.
- A hop count of 16 means unreachable.

### RIP Limitations

- Slow convergence compared with modern protocols
- Small maximum network diameter because of the 15-hop limit
- Not ideal for large or complex modern networks

### RIP Versions

- `RIPv1`: classful, does not send subnet mask information
- `RIPv2`: classless, includes subnet masks, supports CIDR and route summarization control, uses multicast updates

## EIGRP

- `EIGRP` stands for Enhanced Interior Gateway Routing Protocol.
- Cisco originally developed it as a proprietary protocol, though parts were later opened.
- EIGRP is usually taught alongside distance vector protocols, but it has advanced features that make it more accurate to call it an advanced distance vector or hybrid protocol.
- It converges much faster than RIP in most cases.
- It uses the DUAL algorithm to calculate loop-free backup paths.

### EIGRP Metric Concepts

- Bandwidth
- Delay
- Reliability
- Load
- MTU is tracked, but not part of the main route metric calculation

### Why EIGRP Is Popular in Cisco Environments

- Fast convergence
- Efficient use of bandwidth
- Good scalability compared with RIP
- Supports unequal-cost load balancing

## OSPF

- `OSPF` stands for Open Shortest Path First.
- OSPF is a link-state routing protocol.
- It uses the SPF algorithm to compute best paths.
- OSPF sends link-state advertisements rather than full routing tables every update cycle.
- OSPF is widely used in enterprise networks because it scales better than RIP and is standards-based.

### OSPF Concepts

- Routers form adjacencies with neighbors.
- Routers exchange LSAs (Link-State Advertisements).
- Each router builds a link-state database.
- Each router runs SPF to choose best routes.
- OSPF organizes large networks using areas, with Area 0 as the backbone.

## Administrative Distance on Cisco Routers

- These are the common Cisco administrative distances you are most likely to be expected to know:

| Route Source | Administrative Distance |
|---|---:|
| Connected interface | 0 |
| Static route | 1 |
| EIGRP summary route | 5 |
| External BGP | 20 |
| Internal EIGRP | 90 |
| IGRP | 100 |
| OSPF | 110 |
| IS-IS | 115 |
| RIP | 120 |
| External EIGRP | 170 |
| Internal BGP | 200 |
| Unknown / unusable | 255 |

### Easy Memory Pattern

- Lower number = more trusted source.
- Connected beats static.
- Static beats dynamic protocols.
- Among common dynamic routes, EIGRP usually beats OSPF, and OSPF usually beats RIP.

## Router on a Stick

- `Router on a stick` is inter-VLAN routing using one physical router interface connected to a switch trunk.
- The single router interface is divided into multiple `subinterfaces`.
- Each subinterface is assigned to one VLAN and uses `802.1Q` tagging.

### Why It Is Called "On a Stick"

- One physical cable carries traffic for multiple VLANs.
- Instead of one router interface per VLAN, one trunk link handles them all.

### Example Concept

- VLAN 10 users and VLAN 20 users are on the same switch.
- The switch uplink to the router is a trunk.
- Router subinterface `G0/0.10` serves VLAN 10 gateway traffic.
- Router subinterface `G0/0.20` serves VLAN 20 gateway traffic.

### Basic Cisco-Style Example

```ios
interface g0/0
 no shutdown

interface g0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.0

interface g0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.1 255.255.255.0
```

## Pros of Router on a Stick

- Saves router interfaces
- Lower cost than using many separate physical interfaces
- Good for small to medium lab or branch designs
- Simple way to provide inter-VLAN routing when a Layer 3 switch is not available

## Cons of Router on a Stick

- One physical link can become a bottleneck
- The router processes all inter-VLAN traffic through one interface
- If the trunk link fails, all inter-VLAN routing fails
- Less scalable than a multilayer switch
- Higher latency than switching-based inter-VLAN routing in larger environments

## Wildcard Masks (Inverse Subnet Masks)

- A `wildcard mask` is the inverse of a subnet mask.
- Where the subnet mask has `255`, the wildcard usually has `0`.
- Where the subnet mask has `0`, the wildcard usually has `255`.
- In simple terms:
- `0` means "these bits must match exactly"
- `1` bits in binary mean "these bits can vary"

### Common Examples

| Subnet Mask | Wildcard Mask |
|---|---|
| `255.255.255.0` | `0.0.0.255` |
| `255.255.0.0` | `0.0.255.255` |
| `255.255.255.252` | `0.0.0.3` |

### Why Wildcard Masks Matter

- Used heavily in Cisco ACLs
- Used in some routing protocol configuration, especially OSPF `network` statements

### Quick Way to Calculate

- Subtract each subnet mask octet from `255`.
- Example:
- `255.255.255.0`
- `255-255 = 0`
- `255-255 = 0`
- `255-255 = 0`
- `255-0 = 255`
- Result: `0.0.0.255`

## Steps to Configure Dynamic Routing

- The exact commands depend on the protocol, but the general process is:

1. Plan the IP addressing and know which networks belong on which interfaces.
2. Configure and verify basic interface IP addresses first.
3. Choose the routing protocol that fits the network.
4. Enable the routing protocol on the router.
5. Advertise the directly connected networks into that routing process.
6. Configure any protocol-specific settings such as router ID, areas, auto-summary behavior, or passive interfaces.
7. Verify neighbors, learned routes, and reachability.
8. Troubleshoot missing routes, incorrect masks, adjacency problems, or metric issues.

### Generic Cisco Examples

RIP v2:

```ios
router rip
 version 2
 no auto-summary
 network 192.168.10.0
 network 10.0.0.0
```

OSPF:

```ios
router ospf 1
 network 192.168.10.0 0.0.0.255 area 0
 network 10.0.0.0 0.0.0.255 area 0
```

EIGRP:

```ios
router eigrp 100
 no auto-summary
 network 192.168.10.0 0.0.0.255
 network 10.0.0.0 0.0.0.255
```

## Study Reminders

- Routers forward by IP address, but every hop still uses local MAC addresses on the actual link.
- Routing tables answer "where should this packet go next?"
- Default routes are the catch-all path for unknown networks.
- Static routing is manual and best for small/simple designs.
- Dynamic routing is automatic and better for larger/changing networks.
- RIP uses hop count, OSPF uses link-state logic and cost, and EIGRP uses a composite metric.
- Router on a stick provides inter-VLAN routing over one trunk link.
- Wildcard masks are inverse subnet masks and show up often in Cisco syntax.
