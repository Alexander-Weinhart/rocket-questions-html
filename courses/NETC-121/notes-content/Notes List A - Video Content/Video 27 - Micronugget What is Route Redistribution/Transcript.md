# Week 13 - Video 27: Micronugget - What is Route Redistribution?

## Main Idea

`Route redistribution` means taking routes learned from one routing source or routing protocol and advertising them into another routing protocol.

It is useful when different parts of a network use different routing methods but still need to communicate.

Examples:

- EIGRP routes redistributed into OSPF
- OSPF routes redistributed into EIGRP
- Static routes redistributed into a dynamic routing protocol
- Connected routes redistributed into a dynamic routing protocol

## Why the Ingredients Matter

The video compares route redistribution to baking a cake. If you do not understand the ingredients, the result probably will not come out correctly.

For route redistribution, the important ingredients are:

- routing
- routing tables
- static routes
- dynamic routing protocols
- sharing routes between protocols
- mutual redistribution

Understanding these pieces makes route redistribution much easier to understand.

## What Routing Means

Routing has two related meanings.

First, routing can mean the learning process:

- A router learns which remote networks exist.
- A router learns which next hop should be used to reach those networks.
- A router stores that information in its routing table.

Second, routing can mean the forwarding process:

- A packet arrives at the router.
- The router checks the destination IP address.
- The router looks in its routing table.
- The router forwards the packet toward the best next hop.

So routing is both:

- learning what to do before traffic arrives
- forwarding packets when traffic actually arrives

## Routing Table Example

Suppose Router 2 needs to reach a remote network behind Router 5.

Router 2 needs to know ahead of time:

```text
To reach the remote network, forward traffic to Router 4.
```

Router 4 also needs to know:

```text
To continue toward that network, forward traffic to Router 5.
```

Each router makes its own forwarding decision based on its routing table. Routers do not magically know the entire path unless they have learned enough route information.

## Static Routes

One way to teach routers is with static routes.

A static route is a manual instruction configured by the administrator.

Example idea:

```text
Router 2, to reach Network A, forward packets to Router 4.
Router 2, to reach Network B, forward packets to Router 1.
```

Cisco-style example:

```ios
ip route 172.16.56.0 255.255.255.0 10.0.0.4
```

Static routes are useful because they are simple and predictable.

The problem is scale. If a network has hundreds or thousands of routes, manually configuring every route on every router becomes painful. If the topology changes often, static routing becomes even harder to maintain.

## Dynamic Routing Protocols

A better option in larger networks is to let routers share route information automatically.

That is what routing protocols do.

Instead of manually configuring every remote network, routers advertise what they know to their neighbors. Those neighbors can then learn routes and advertise them onward.

Example flow:

1. Router 6 advertises its networks to Router 5.
2. Router 5 learns those networks and shares route information with Router 4.
3. Router 4 shares route information with Router 2.
4. Other routers dynamically learn how to reach those remote networks.

This automatic route learning is the purpose of dynamic routing protocols.

## Routing Protocol Examples

The video mentions two routing protocols:

| Protocol | Full Name | Notes |
|---|---|---|
| OSPF | Open Shortest Path First | Open standard |
| EIGRP | Enhanced Interior Gateway Routing Protocol | Cisco-associated/proprietary in the video context |

`OSPF` is an open standard, which means many vendors support it.

`EIGRP` is strongly associated with Cisco environments. In a mixed-vendor network, relying on EIGRP may create compatibility issues if non-Cisco devices need to participate.

## Why Redistribution Is Needed

Route redistribution becomes important when one part of the network uses one routing protocol and another part uses a different routing protocol.

Example:

- Company A uses EIGRP.
- Company B uses OSPF.
- The companies merge.
- Their networks are connected together.
- Devices on the EIGRP side need to reach networks on the OSPF side.
- Devices on the OSPF side need to reach networks on the EIGRP side.

Each routing protocol works inside its own area of the network, but the two sides do not automatically exchange routes with each other.

## The Problem After a Network Merger

Before the merger:

- Routers using EIGRP know the EIGRP-side routes.
- Routers using OSPF know the OSPF-side routes.

After the networks are physically connected:

- The physical connection exists.
- But the routing knowledge is incomplete.
- EIGRP routers do not automatically know all OSPF routes.
- OSPF routers do not automatically know all EIGRP routes.

Physical connectivity is not enough. Routers also need routing table information.

## Possible Solutions

One solution is to convert every router to the same routing protocol.

Example:

- Replace EIGRP everywhere with OSPF.
- Or replace OSPF everywhere with EIGRP.

That can work, but it may require major reconfiguration and downtime.

A more flexible solution is route redistribution.

## Route Redistribution

Route redistribution lets a router learn routes from one routing protocol and advertise them into another routing protocol.

For redistribution to work, at least one router usually sits between the two routing domains and runs both protocols.

Example:

- Router 2 runs EIGRP.
- Router 2 also runs OSPF.
- Router 2 learns EIGRP routes from the EIGRP side.
- Router 2 learns OSPF routes from the OSPF side.
- Router 2 becomes the router that understands both routing domains.

That router can then share routes between the protocols.

## Redistribution as Translation

The video describes the redistributing router like a translator.

Router 2 understands both routing protocols:

- It speaks EIGRP to the EIGRP side.
- It speaks OSPF to the OSPF side.

Then Router 2 can be configured to do two jobs:

```text
Take routes learned from EIGRP and advertise them into OSPF.
Take routes learned from OSPF and advertise them into EIGRP.
```

This allows both sides of the network to learn about each other's routes.

## Mutual Redistribution

`Mutual redistribution` means redistributing routes in both directions.

Example:

- EIGRP routes are redistributed into OSPF.
- OSPF routes are redistributed into EIGRP.

This is different from one-way redistribution.

One-way redistribution example:

```text
EIGRP routes go into OSPF, but OSPF routes do not go into EIGRP.
```

Mutual redistribution example:

```text
EIGRP routes go into OSPF, and OSPF routes go into EIGRP.
```

Mutual redistribution is useful when both sides need full two-way reachability.

## Redistribution with Static Routes

Redistribution is not only for dynamic routing protocols.

Static routes can also be redistributed into a dynamic protocol.

Example:

- A router has a static route to a special network.
- Other routers do not know that static route.
- The administrator redistributes static routes into OSPF.
- OSPF routers can now learn about that static route through OSPF.

Conceptual example:

```ios
router ospf 1
redistribute static
```

The exact command requirements can vary depending on the protocol, platform, metrics, and lab instructions.

## Why Metrics Matter During Redistribution

Different routing protocols use different metrics.

Examples:

- RIP uses hop count.
- EIGRP uses a composite metric based mainly on bandwidth and delay.
- OSPF uses cost based mainly on bandwidth.

When routes move from one protocol into another, the receiving protocol may need a metric value it understands.

For example, if an OSPF route is redistributed into EIGRP, EIGRP needs EIGRP-style metric information. If that metric is missing or wrong, the redistributed routes may not work as expected.

This is one reason redistribution has to be configured carefully.

## Redistribution Risks

Route redistribution is powerful, but it can cause problems.

Common risks:

- routing loops
- routes being advertised back into the protocol they came from
- bad or missing metrics
- too many routes being advertised
- unstable routes spreading between routing domains
- one routing protocol learning less-preferred paths and choosing them anyway

In real networks, administrators often control redistribution with:

- route maps
- prefix lists
- distribute lists
- metrics
- tags
- filtering

For this class, the key point is that redistribution shares routes between routing systems, but it needs care.

## Practical Example Summary

Imagine this merged-company network:

```text
Left side:  EIGRP, 10.x.x.x networks
Right side: OSPF, 172.16.x.x networks
Middle:     Router 2 connects both sides
```

Router 2 runs both protocols.

Router 2 learns:

- `10.x.x.x` routes from EIGRP
- `172.16.x.x` routes from OSPF

Then Router 2 redistributes:

- EIGRP routes into OSPF
- OSPF routes into EIGRP

After redistribution, routers on both sides can learn how to reach the other side's networks.

## Review

- Routing means learning routes and forwarding packets.
- Static routes are manual route instructions.
- Dynamic routing protocols let routers share route information automatically.
- OSPF is an open-standard routing protocol.
- EIGRP is commonly associated with Cisco environments.
- Route redistribution shares routes from one routing source or protocol into another.
- Mutual redistribution shares routes in both directions.
- A redistributing router often runs both routing protocols and acts like a translator between them.
- Redistribution is useful during mergers, migrations, mixed-protocol networks, and static-to-dynamic route sharing.
- Redistribution must be handled carefully because metrics, loops, and filtering matter.
