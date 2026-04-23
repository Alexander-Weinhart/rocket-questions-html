# Lecture Week 12

## Main Idea

Week 12 connects static routing review with the first dynamic routing protocol examples. The big shift is this:

- Static routing means the administrator manually tells routers where to send traffic.
- Dynamic routing means routers learn routes from each other automatically.

Dynamic routing becomes useful when a network has many routers, many subnets, or frequent changes. Instead of editing every router by hand after every topology change, routers run a routing protocol and exchange route information.

## Static Routing Review

A static route is a manually configured path to a remote network.

Example:

```ios
ip route 192.168.30.0 255.255.255.0 10.0.0.2
```

This means:

- Destination network: `192.168.30.0`
- Destination mask: `255.255.255.0`
- Next-hop router: `10.0.0.2`

Static routes are predictable and simple, but they do not automatically adapt. If the next-hop router or link fails, the static route still exists unless the administrator changes it or tracking is configured.

The most important rule with routing is that communication needs a path both directions. If PC A can send a packet to PC B, but PC B's router does not know how to send the reply back, the conversation still fails.

## Default Routes

A default route is the catch-all route used when no more specific route matches.

IPv4 default route:

```text
0.0.0.0/0
```

Static default route example:

```ios
ip route 0.0.0.0 0.0.0.0 10.0.0.1
```

This means: "If you do not have a better route, send the packet to `10.0.0.1`."

Default routes are common on edge routers, small branch routers, and networks that have one upstream path toward the rest of the world.

## Longest Prefix Match

Routers can have multiple routes that match the same destination. When that happens, the router chooses the route with the longest prefix, meaning the most specific match.

Example routing table:

```text
10.0.0.0/8       -> Router A
10.20.0.0/16     -> Router B
10.20.30.0/24    -> Router C
0.0.0.0/0        -> Router D
```

Destination: `10.20.30.55`

This matches all four routes, but the router chooses `10.20.30.0/24` because `/24` is more specific than `/16`, `/8`, or `/0`.

This rule is what makes route summarization and default routing safe. A broad route can exist, but a more specific route wins when it is available.

## Route Summarization

Route summarization, also called route aggregation, combines multiple specific routes into one larger route.

Instead of advertising this:

```text
10.20.1.0/24
10.20.2.0/24
10.20.3.0/24
10.20.4.0/24
```

A router might advertise this:

```text
10.20.0.0/16
```

Summarization helps by:

- reducing routing table size
- reducing routing updates
- making large networks easier to understand
- supporting hierarchical network design

The danger is over-summarizing. A summary route can accidentally include networks that do not really exist behind that router. Good summarization depends on clean address planning.

## Route Summarization Example

Summarize:

```text
10.0.0.4
10.0.0.5
10.0.0.6
```

The first three octets are the same: `10.0.0`.

Convert the last octet to binary:

```text
4 = 00000100
5 = 00000101
6 = 00000110
```

The common bits are:

```text
000001
```

The last two bits vary, so they become host bits. Six matching bits in the last octet plus the first 24 matching bits gives a `/30`.

Final summary:

```text
10.0.0.4/30
```

or:

```text
10.0.0.4 255.255.255.252
```

That `/30` covers:

```text
10.0.0.4 through 10.0.0.7
```

## Router Hierarchy

Router hierarchy means the network is organized in layers instead of being one flat chain of routers.

A simple hierarchy might look like:

- Access layer: local routers or switches near users
- Distribution layer: routers that aggregate several local networks
- Core layer: high-speed backbone between major locations

Hierarchy helps because local details can be summarized before being advertised upward. For example, a New York site might contain many `10.20.x.x` networks, but the rest of the company might only need to know:

```text
10.20.0.0/16 is reachable through the New York router
```

This keeps the rest of the network from needing every individual New York subnet.

## Dynamic Routing Protocols

A dynamic routing protocol lets routers exchange route information automatically.

Dynamic routing protocols decide best paths using a metric. A metric is the value the protocol uses to compare routes.

Examples:

- RIP uses hop count.
- EIGRP commonly uses bandwidth and delay.
- OSPF uses cost, which is based mainly on bandwidth.

The routing protocol with the best metric wins inside that protocol. If routes come from different sources, administrative distance decides which source is trusted more.

## Distance Vector Routing

Distance vector protocols learn routes from neighboring routers.

The basic idea is:

- "I know these networks."
- "Here is my distance to each one."
- "You can reach those networks through me."

RIP is the classic distance vector example.

Distance vector protocols are easy to understand, but they can converge slowly. Convergence means all routers have updated and agree on the current best paths.

## Link-State Routing

Link-state protocols work more like a map.

Instead of only learning a neighbor's opinion, each router builds a view of the network topology. The lecture analogy is like having Google Maps-style driving directions: the router has enough topology information to calculate a path.

OSPF is the main link-state protocol in these notes.

Link-state protocols usually:

- discover neighbors
- exchange link-state advertisements
- build a topology database
- calculate best paths
- update quickly when the network changes

## RIPv1: Need to Know

RIPv1 is Routing Information Protocol version 1.

Key facts:

- It is a distance vector protocol.
- It is classful.
- It does not carry subnet mask information in route updates.
- It uses hop count as the metric.
- It is limited to `15` hops.
- A route with `16` hops is considered unreachable.
- It is insecure by modern standards.
- It is mostly obsolete and not used in modern production networks.

Classful means RIPv1 assumes the old class A, B, or C boundary. That causes problems with VLSM and modern subnetting because different subnet masks may exist inside the same major network.

Basic RIPv1 configuration:

```ios
router rip
network 192.168.1.0
network 10.0.0.0
```

The `network` command tells RIP which connected networks should participate in RIP. Interfaces that match those network statements send and receive RIP updates.

## RIPv2: Need to Know

RIPv2 improves RIPv1, but it is still old and uncommon in modern production networks.

Key facts:

- It is still a distance vector protocol.
- It is classless.
- It includes subnet mask information in route updates.
- It supports VLSM and CIDR.
- It supports authentication/security features.
- It is still limited to `15` hops.
- It still uses hop count as the metric.

Basic RIPv2 configuration:

```ios
router rip
version 2
network 192.168.1.0
network 10.0.0.0
```

The important difference in configuration is:

```ios
version 2
```

That forces RIP to use RIPv2 behavior.

## RIP Metric: Hop Count

RIP chooses paths by counting routers.

Example:

- Path A crosses 2 routers.
- Path B crosses 4 routers.

RIP chooses Path A because `2` hops is better than `4` hops.

The weakness is that RIP does not care about link speed. A path with two slow links might be worse than a path with three fast links, but RIP still chooses the lower hop count.

## RIP Loop Prevention

Distance vector protocols can accidentally create routing loops because routers learn secondhand information from neighbors.

### Split Horizon

Split horizon means a router does not advertise a route back out the same interface where it learned that route.

Simple version:

- Router A tells Router B about Network X.
- Router B should not turn around and tell Router A, "I can reach Network X through you."

That would be useless and could create confusion during failures.

### Route Poisoning

Route poisoning marks a failed route with a bad metric.

In RIP, a poisoned route is advertised with metric `16`, which means unreachable.

Instead of silently removing the route, the router tells neighbors:

```text
This route is bad. Do not use it.
```

### Hold-Down Timers

A hold-down timer temporarily prevents routers from accepting unstable route information after a route fails.

This helps prevent route flapping. Route flapping means a route repeatedly goes up, down, up, down. Without timers, every flap could trigger more updates and instability.

## VLSM

VLSM stands for Variable Length Subnet Mask.

It means different subnets inside the same larger network can use different prefix lengths.

Example:

- One subnet might be `/24`.
- Another might be `/26`.
- A point-to-point link might be `/30`.

VLSM allows more efficient address use because each subnet can be sized for its actual need.

RIPv1 does not support VLSM well because it is classful. RIPv2, EIGRP, and OSPF support VLSM.

## Grouping Networks: `/22` Example

The notes list:

```text
192.168.0.0/22
```

A `/22` mask is:

```text
255.255.252.0
```

This network covers:

```text
192.168.0.0 through 192.168.3.255
```

Breakdown:

- Network address: `192.168.0.0/22`
- Usable hosts: `192.168.0.1` through `192.168.3.254`
- Broadcast address: `192.168.3.255`

The network address identifies the subnet itself and is not assigned to a host. The broadcast address reaches all hosts in the subnet and is also not assigned to a host.

## Wildcard Masks

A wildcard mask is the inverse of a subnet mask. It is sometimes called the one's complement of the subnet mask.

Subnet mask:

```text
255.255.255.0
```

Wildcard mask:

```text
0.0.0.255
```

In wildcard masks:

- `0` means the bits must match.
- `1` means the bits can vary.

Shortcut:

```text
255.255.255.255
- subnet mask
= wildcard mask
```

Examples:

| Prefix | Subnet Mask | Wildcard Mask |
|---|---|---|
| `/24` | `255.255.255.0` | `0.0.0.255` |
| `/16` | `255.255.0.0` | `0.0.255.255` |
| `/8` | `255.0.0.0` | `0.255.255.255` |
| `/30` | `255.255.255.252` | `0.0.0.3` |

Wildcard masks are used in OSPF network statements and access control lists.

## Week 12 Takeaways

- Dynamic routing lets routers learn routes automatically.
- RIP is the main Week 12 dynamic routing protocol.
- RIPv1 is classful; RIPv2 is classless.
- RIP uses hop count and cannot use paths longer than 15 hops.
- Route summarization reduces routing table size.
- Default routes are the broadest possible summary route.
- Longest prefix match means the most specific matching route wins.
- Split horizon, route poisoning, and hold-down timers help prevent routing loops and instability.
- VLSM allows different subnet sizes inside the same larger network.
- Wildcard masks are inverse subnet masks used by protocols such as OSPF.
