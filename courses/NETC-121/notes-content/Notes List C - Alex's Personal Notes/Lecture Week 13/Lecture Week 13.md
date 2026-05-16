# Lecture Week 13

## Main Idea

Week 13 moves from basic routing into more advanced routing behavior:

- Layer 3 switches
- inter-VLAN routing
- redistributed routes
- EIGRP
- OSPF

The theme is that routing is not only done by standalone routers. A Layer 3 switch can switch traffic at Layer 2 and route traffic at Layer 3, which makes it useful in campus and lab networks.

## Layer 3 Switches

A normal Layer 2 switch forwards frames using MAC addresses. It works inside a broadcast domain or VLAN.

A router forwards packets using IP addresses. It moves traffic between different networks or VLANs.

A Layer 3 switch combines both roles:

- It acts like a switch for local VLAN traffic.
- It acts like a router for traffic between VLANs or routed networks.

The Week 13 note says:

```text
The 3650 in the lab is a layer 3 switch
```

A Cisco Catalyst 3650 can support routed interfaces, SVIs, and routing protocols depending on licensing and configuration.

## Why Layer 3 Switches Are Used

Layer 3 switches are common because they can route between VLANs very quickly inside a LAN.

Example:

- VLAN 10: Students
- VLAN 20: Faculty
- VLAN 30: Servers

Devices in the same VLAN can be switched normally. When a device in VLAN 10 needs to reach a server in VLAN 30, the Layer 3 switch routes the packet between VLAN interfaces.

This avoids sending every inter-VLAN packet to a separate physical router.

## Enabling Routing on a Layer 3 Switch

On many Cisco switches, routing is not active until you enable it.

Command:

```ios
ip routing
```

This tells the switch to behave as a Layer 3 device and maintain a routing table.

Without `ip routing`, the switch may still have IP addresses for management, but it will not route packets between networks.

## SVIs: Switched Virtual Interfaces

An SVI is a VLAN interface that gives the switch a Layer 3 IP address for that VLAN.

Example from the notes, cleaned up:

```ios
ip routing
interface vlan 10
no shutdown
ip address 192.168.10.1 255.255.255.0
exit
```

This creates a Layer 3 gateway for VLAN 10.

Devices in VLAN 10 could use:

```text
Default gateway: 192.168.10.1
```

Important detail: the SVI usually comes up only if the VLAN exists and at least one active port in that VLAN is up, or a trunk carrying that VLAN is up.

## Inter-VLAN Routing Example

Suppose the Layer 3 switch has:

```ios
ip routing

interface vlan 10
ip address 192.168.10.1 255.255.255.0
no shutdown

interface vlan 20
ip address 192.168.20.1 255.255.255.0
no shutdown
```

Hosts:

- PC in VLAN 10: `192.168.10.50/24`, gateway `192.168.10.1`
- PC in VLAN 20: `192.168.20.50/24`, gateway `192.168.20.1`

When the VLAN 10 PC sends traffic to the VLAN 20 PC:

1. The PC sees that `192.168.20.50` is remote.
2. It sends the frame to its default gateway, `192.168.10.1`.
3. The Layer 3 switch receives the frame on VLAN 10.
4. The switch routes the packet out VLAN 20.
5. The destination PC receives the packet.

## Routed Ports vs SVIs

Layer 3 switches can route in two common ways.

An SVI routes for an entire VLAN:

```ios
interface vlan 10
ip address 192.168.10.1 255.255.255.0
```

A routed port behaves more like a router interface:

```ios
interface gigabitEthernet 1/0/1
no switchport
ip address 10.0.0.1 255.255.255.252
no shutdown
```

Use an SVI when routing for a VLAN. Use a routed port when connecting the Layer 3 switch to another router or Layer 3 switch over a point-to-point routed link.

## Redistributed Routes

Route redistribution means taking routes learned from one routing source or protocol and injecting them into another.

The note says:

```text
not all routers support the same dynamic routes
RIP and Static for example
```

That is the main reason redistribution exists. One part of a network may use RIP, another part may use OSPF, and another may use static routes. A router between those areas can redistribute routes so each side can learn about the other.

Examples of redistribution:

- Static routes redistributed into OSPF
- RIP routes redistributed into EIGRP
- EIGRP routes redistributed into OSPF
- Connected routes redistributed into a dynamic protocol

## Redistribution Warning

Redistribution is powerful, but it can create problems if done casually.

Risks:

- routing loops
- duplicate routes
- bad metrics
- routes being advertised too broadly
- one unstable protocol affecting another

When redistributing, administrators usually control the process with route maps, prefix lists, metrics, and filtering. In an intro class, the key concept is simply that redistribution lets routing information cross between different routing systems.

## Dynamic Routing Protocol Comparison

| Protocol | Type | Metric | Notes |
|---|---|---|---|
| RIP | Distance vector | Hop count | Simple, old, 15-hop limit |
| EIGRP | Advanced distance vector | Bandwidth and delay by default | Cisco-focused, fast convergence |
| OSPF | Link state | Cost based mainly on bandwidth | Open standard, common in larger networks |
| BGP | Path vector | Policy/path attributes | Internet/inter-AS routing |

Week 13 focuses on EIGRP and OSPF.

## EIGRP

EIGRP stands for Enhanced Interior Gateway Routing Protocol.

Key facts:

- It is commonly associated with Cisco.
- It is often described as an advanced distance vector or hybrid protocol.
- It supports VLSM and CIDR.
- It uses neighbor relationships.
- It sends updates when changes happen, not constant full-table updates like old distance vector protocols.
- It commonly uses bandwidth and delay for its metric.
- It converges much faster than RIP.

## EIGRP Metric

EIGRP's classic default metric is based mainly on:

- bandwidth
- delay

Bandwidth means the slowest link along the path matters. Delay means the accumulated interface delay along the path matters.

This is better than RIP because RIP only counts routers. EIGRP can prefer a path with more hops if that path has better bandwidth and delay.

## EIGRP Neighbors

EIGRP routers form neighbor relationships before exchanging routing information.

For two EIGRP routers to become neighbors, they generally need:

- interfaces in the same subnet
- matching EIGRP autonomous system number
- compatible EIGRP settings
- working Layer 1, Layer 2, and Layer 3 connectivity

The EIGRP autonomous system number in basic configuration is locally significant to the EIGRP domain. Routers must match it to exchange EIGRP routes.

## EIGRP Basic Configuration

Example from the notes:

```ios
router eigrp 1
network 192.168.1.0
network 10.0.0.0
```

Meaning:

- `router eigrp 1` starts EIGRP process/AS `1`.
- `network 192.168.1.0` enables EIGRP on matching interfaces.
- `network 10.0.0.0` enables EIGRP on matching interfaces.

More specific example with a wildcard mask:

```ios
router eigrp 1
network 10.10.0.0 0.0.255.255
```

This enables EIGRP on interfaces in the `10.10.x.x` range.

## EIGRP Routing Table Codes

In `show ip route`, EIGRP routes commonly appear with:

```text
D
```

`D` means an internal EIGRP route.

External EIGRP routes can appear as:

```text
D EX
```

External means the route came from outside EIGRP and was redistributed into EIGRP.

## EIGRP Verification Commands

Useful commands:

```ios
show ip eigrp neighbors
show ip route
show ip route eigrp
show ip protocols
show running-config
show ip interface brief
```

What to check:

- Are interfaces up/up?
- Are EIGRP neighbors forming?
- Are expected networks being advertised?
- Do EIGRP routes appear in the routing table?
- Do all routers use the same EIGRP AS number?

## OSPF

OSPF stands for Open Shortest Path First.

Key facts:

- It is a link-state routing protocol.
- It is used in larger networks.
- It is an open standard supported by many vendors.
- It uses bandwidth-based cost as its metric.
- It discovers neighbors.
- It exchanges LSAs, or Link-State Advertisements.
- Each router builds a link-state database.
- Each router calculates best paths from that database.

The notes say OSPF keeps the network map in memory. That means each OSPF router in an area has a topology view of that area, then uses that information to calculate routes.

## OSPF Metric: Cost

OSPF uses cost as its metric.

Cost is based mainly on bandwidth. Faster links usually have lower cost, and lower cost is preferred.

Simple idea:

- Lower OSPF cost = better path
- Higher OSPF cost = less preferred path

This is different from RIP. RIP only asks, "How many routers away is it?" OSPF asks, "What is the best path through the topology based on cost?"

## OSPF Neighbors and LSAs

OSPF routers send hello packets to discover and maintain neighbors.

Once routers become neighbors, they exchange LSAs. LSA stands for Link-State Advertisement.

An LSA describes routing topology information, such as:

- what links exist
- what networks are attached
- what costs are associated with paths
- what routers are reachable

Routers use LSAs to build the link-state database. Then they calculate routes from that database.

## OSPF Areas

OSPF uses areas to scale.

Without areas, every router would need to maintain a very large topology database in a big network. Areas break the network into smaller logical sections.

Important area facts:

- Area `0` is the backbone area.
- Other areas should connect to Area `0`.
- Area design reduces how much topology detail every router must track.
- A router with interfaces in multiple areas is an Area Border Router, or ABR.

Example:

- Interface G0/0 is in Area 0.
- Interface G0/1 is in Area 1.
- That router connects Area 1 to the backbone, so it is an ABR.

## OSPF and Summarization

The notes say:

```text
does not summarize routes, auto-summarization is not favorable
```

The clean way to understand this:

- OSPF does not use old classful auto-summarization like some older protocols did.
- OSPF is classless and understands subnet masks.
- Summarization can be configured in OSPF at proper boundary points, such as area border routers.
- Automatic classful summarization is not desirable because modern networks use VLSM and non-classful designs.

So OSPF can summarize, but you do not want blind classful auto-summary behavior.

## OSPF Basic Configuration

Example from the notes:

```ios
router ospf 1
network 192.168.1.0 0.0.0.255 area 1
network 10.0.0.0 0.255.255.255 area 1
```

Meaning:

- `router ospf 1` starts OSPF process ID `1`.
- The process ID is locally significant; it does not have to match on every router.
- `network 192.168.1.0 0.0.0.255 area 1` enables OSPF on interfaces matching `192.168.1.x` and places them in Area 1.
- `network 10.0.0.0 0.255.255.255 area 1` enables OSPF on interfaces matching `10.x.x.x` and places them in Area 1.

## Wildcard Masks in OSPF

OSPF network statements use wildcard masks.

Wildcard masks are inverse subnet masks:

| Subnet Mask | Wildcard Mask |
|---|---|
| `255.255.255.0` | `0.0.0.255` |
| `255.255.0.0` | `0.0.255.255` |
| `255.0.0.0` | `0.255.255.255` |
| `255.255.255.252` | `0.0.0.3` |

In a wildcard mask:

- `0` means must match.
- `255` means do not care in that octet.

Example:

```ios
network 192.168.1.0 0.0.0.255 area 1
```

This matches:

```text
192.168.1.0 through 192.168.1.255
```

## OSPF Routing Table Code

In `show ip route`, OSPF routes appear with:

```text
O
```

Example:

```text
O 192.168.40.0/24 [110/2] via 10.0.0.2
```

The `110` is the administrative distance for OSPF. The `2` is the OSPF metric/cost in this example.

## OSPF Verification Commands

Useful commands:

```ios
show ip ospf neighbor
show ip route
show ip route ospf
show ip protocols
show running-config
show ip interface brief
```

What to check:

- Are interfaces up/up?
- Are OSPF neighbors forming?
- Are interfaces in the correct area?
- Are wildcard masks correct?
- Do OSPF routes appear in the routing table?

## EIGRP vs OSPF

| Feature | EIGRP | OSPF |
|---|---|---|
| Protocol type | Advanced distance vector | Link state |
| Common metric basis | Bandwidth and delay | Cost based mainly on bandwidth |
| Standards | Cisco-focused | Open standard |
| Neighbor relationships | Yes | Yes |
| Scales with areas | Not like OSPF areas | Yes, Area 0 backbone |
| Routing table code | `D` | `O` |
| Typical administrative distance | `90` internal | `110` |

For exams and labs:

- EIGRP is usually easier to configure.
- OSPF is more common as a standards-based enterprise protocol.
- OSPF area design matters a lot.
- EIGRP AS numbers must match for neighbors.
- OSPF process IDs do not need to match, but area settings and neighbor parameters must be compatible.

## Administrative Distance Reminder

Administrative distance decides which routing source is trusted when the same destination is learned from multiple sources.

Lower is better.

Common values:

| Route Source | Administrative Distance |
|---|---:|
| Connected | `0` |
| Static | `1` |
| EIGRP internal | `90` |
| OSPF | `110` |
| RIP | `120` |
| EIGRP external | `170` |

Example:

If a router learns `192.168.50.0/24` from both EIGRP and OSPF:

- EIGRP AD: `90`
- OSPF AD: `110`

The router installs the EIGRP route because `90` is lower than `110`.

## Week 13 Lab Troubleshooting Checklist

Use this order when a routing lab is not working:

1. Check physical/logical interface status.

```ios
show ip interface brief
```

2. Check whether the switch has routing enabled.

```ios
show running-config
```

Look for:

```ios
ip routing
```

3. Check VLAN interfaces.

```ios
show ip interface brief
show vlan brief
```

4. Check routing protocol neighbors.

```ios
show ip eigrp neighbors
show ip ospf neighbor
```

5. Check the routing table.

```ios
show ip route
```

6. Check routing protocol configuration.

```ios
show ip protocols
show running-config
```

7. Test with ping and traceroute.

```ios
ping <destination>
traceroute <destination>
```

## Week 13 Takeaways

- A Layer 3 switch can switch frames and route packets.
- `ip routing` enables Layer 3 routing behavior on a switch.
- An SVI gives a VLAN a Layer 3 gateway.
- Redistributed routes are routes moved from one routing source or protocol into another.
- EIGRP is Cisco-focused and commonly uses bandwidth and delay.
- EIGRP routers must use the same AS number to become neighbors.
- OSPF is a standards-based link-state protocol.
- OSPF uses LSAs and keeps a topology database.
- OSPF Area 0 is the backbone area.
- OSPF uses wildcard masks in network statements.
- In the routing table, EIGRP usually shows as `D` and OSPF shows as `O`.
