# Essential Chapter 9 - Routing Protocols

# This is an example chapter from the NETC-121 class so the AI Can figure out how to do chapter notes.

## Chapter Focus

Chapter 9 covers the major routing approaches used in campus and WAN environments:

- Static routing
- Dynamic routing
- Distance vector vs link-state behavior
- RIP and RIPv2
- OSPF
- EIGRP
- BGP
- IPv6 routing equivalents

## Objectives You Should Know

- Explain the difference between static and dynamic routing.
- Explain the difference between distance vector and link-state protocols.
- Configure a basic static route.
- Understand how much routing traffic different protocols generate.
- Understand the basics of OSPF, IS-IS, and EIGRP.
- Configure basic RIP and RIPv2.
- Configure basic OSPF, EIGRP, and BGP.
- Recognize how these ideas apply to IPv6.

## Key Terms

- static route
- `netstat -r`
- `route print`
- loopback
- `ip route`
- variable-length subnet masking (`VLSM`)
- `show ip route` (`sh ip route`)
- routing table code `S`
- routing table code `C`
- gateway of last resort
- `show ip route static`
- `show running-config` (`sh run`)
- `show startup-config` (`sh start`)
- `copy running-config startup-config` (`copy run start`)
- `write memory` (`wr m`)
- dynamic routing protocol
- administrative distance
- distance vector protocol
- RIP
- RIPv2
- routing loop
- advertise
- class network address
- classful addressing
- contiguous network
- `show ip protocol`
- link-state protocol
- OSPF
- IETF
- link-state advertisement (`LSA`)
- hello packets
- areas
- backbone
- wildcard bits
- area 0
- route flapping
- IS-IS
- NET
- `router ospf [process id]`
- EIGRP
- RIPng
- OSPFv3
- BGP

## 9-2 Static Routing

## What Static Routing Means

- A `static route` is a route entered manually into a host or router routing table.
- On a host, the most common static route is the `default gateway`.
- On a router, static routes tell the router which next hop to use for remote networks.

## Default Gateway and Default Route

- The default gateway is used when the destination is not on the local subnet or the route is otherwise unknown.
- In a routing table, the default route appears as:

```text
0.0.0.0  0.0.0.0
```

- On routers, the equivalent idea is the `gateway of last resort`.

## Host Routing Table Commands

Use these to view a host computer routing table:

```text
netstat -r
route print
```

## Loopback

- `127.0.0.1` is the IPv4 loopback address.
- `::1` is the IPv6 loopback address.
- Loopback sends traffic back to the local host itself.
- It is commonly used to test whether the local TCP/IP stack and NIC path are functioning.

## Cisco Static Route Syntax

```ios
ip route <destination-network> <subnet-mask> <next-hop-ip>
```

Example:

```ios
ip route 10.10.10.0 255.255.255.0 10.10.200.2
```

- Destination: remote network you want to reach
- Subnet mask: mask for that destination
- Next hop: the neighboring router interface to send traffic to

## Static Routing Is Bidirectional

- Configuring a route on RouterA only fixes the path in one direction.
- The return route must also be configured on the other router.
- This is one of the most important practical routing rules in the chapter.

## VLSM with Static Routes

- Different static routes can use different subnet masks.
- This is `VLSM` (variable-length subnet masking).
- Example:
- one route might use `255.255.255.0`
- another might use `255.255.255.252`

## Verifying Static Routes

Useful Cisco commands:

```ios
show ip route
show ip route static
show running-config
show startup-config
show ip interface brief
```

### Routing Table Codes

- `S` = static route
- `C` = connected route
- `L` = local interface address

## Gateway of Last Resort

- The gateway of last resort is where the router sends packets for unknown destinations.
- Configure it with:

```ios
ip route 0.0.0.0 0.0.0.0 <next-hop-address>
```

- If this is missing, `show ip route` often displays:

```text
Gateway of last resort is not set
```

## Saving Router Configuration

```ios
copy run start
write memory
```

- These save the running configuration to NVRAM.

## Static Routing Strengths and Weaknesses

### Good for

- Small networks
- Simple topologies
- Stub/WAN links with only one possible path
- Default routes toward an ISP or upstream router

### Weaknesses

- Does not scale well
- High maintenance burden
- Every change requires manual updates
- The administrator effectively becomes the routing protocol

## 9-3 Dynamic Routing Protocols

## Why Dynamic Routing Exists

- Static routing becomes difficult to maintain as networks grow.
- Dynamic routing protocols let routers exchange routing information and update their tables automatically.

## What Dynamic Routing Protocols Handle

- What information routers exchange
- When updates are exchanged
- How routers react to changes
- How the best route is selected

## Four Key Dynamic Routing Concepts

### Path Determination

- The protocol’s method for deciding the best route.

### Metric

- A numeric value used to rank routes.
- Smaller is better.

### Convergence

- The point where routers agree on the current best paths.
- Faster convergence means faster recovery after failures.

### Load Balancing

- The ability to use multiple available paths to the destination.
- Improves reliability and can distribute traffic across links.

## Common Metrics

- hop count
- reliability
- bandwidth
- delay
- cost
- load
- ticks
- latency

## Administrative Distance

- Administrative distance decides which routing source is preferred when multiple protocols know the same route.
- Lower is better.

Common defaults from the chapter:

| Protocol | Administrative Distance |
|---|---:|
| Connected | 0 |
| Static | 1 |
| BGP | 20 |
| EIGRP | 90 |
| OSPF | 110 |
| RIP | 120 |

## 9-4 Distance Vector Protocols

## Distance Vector Basics

- A distance vector protocol periodically sends its entire routing table to neighboring routers.
- Neighbors use that information to update their own routes.
- Hop count is a common metric in this family.

## Core Idea

- Routers first learn who their immediate neighbors are.
- Directly connected routes have hop count `0`.
- Each additional router crossed increases the hop count.

## RIP

- `RIP` is a dynamic distance vector routing protocol.
- It uses `hop count` as its metric.
- Maximum hop count is `15`.
- A route with hop count `16` is unreachable.

## Routing Loops

- A routing loop happens when routers forward packets back and forth instead of toward the destination.
- RIP limits hop count partly to prevent loops from continuing indefinitely.

## Distance Vector Tradeoff

- Easy to configure
- But periodic full-table updates consume bandwidth
- Convergence is slower than link-state protocols

## 9-5 Configuring RIP and RIPv2

## RIP Configuration Basics

Enable RIP:

```ios
router rip
network 10.0.0.0
```

- The `network` statement uses the `classful` network address.
- RIP advertises routes for interfaces that fall inside that classful network.

## Advertise

- To `advertise` a network means to share route information about that network with neighbors.

## RIP Uses Classful Addressing

- RIP uses class network addresses like `10.0.0.0`.
- It expects `contiguous networks`, meaning connected routes use the same major classful address block.

## Important Verification Commands

```ios
show ip interface brief
show ip protocol
show ip route
show running-config
```

### `show ip protocol`

Used to verify:

- RIP is running
- update timers
- which networks RIP is advertising
- where updates are being learned from

## RIP Limitations

- Classful only
- No support for VLSM or CIDR
- No router authentication
- Maximum of 15 hops
- Uses only hop count, so it ignores bandwidth quality differences

## Why RIPv2 Exists

`RIPv2` improves RIPv1 by adding:

- VLSM support
- CIDR support
- router authentication
- next-hop support
- route tags
- multicast updates

## RIPv2 Configuration

```ios
router rip
version 2
network 10.0.0.0
```

- If `version 2` is not specified, RIPv1 is used by default in the chapter examples.

## RIPv2 Verification

Use:

```ios
show ip protocol
show ip route
```

- In `show ip protocol`, look for:

```text
Default version control: send version 2, receive version 2
```

## Key Difference Between RIP and RIPv2

- RIP v1 cannot advertise differently sized subnets properly.
- RIPv2 can advertise VLSM subnets such as `/25`.

## 9-6 Link-State Protocols

## Link-State Basics

- Link-state protocols form relationships with neighboring routers.
- They exchange `LSAs` (link-state advertisements) instead of periodic full routing tables.
- They send updates when the network changes.
- They converge faster than distance vector protocols.

## Core Link-State Features

- find neighbors / adjacencies
- use route advertisements to build routing tables
- send hello packets
- update on change

## OSPF

- `OSPF` stands for `Open Shortest Path First`.
- It is a dynamic link-state protocol.
- It was developed by the `IETF`.
- It is an open standard supported by many vendors.

## OSPF Advantages

- Fast convergence
- Low bandwidth use after initial exchange
- VLSM support
- Area-based design for scaling

## OSPF Hello Packets

- Hello packets verify that adjacent routers are still up and communicating.
- If hello traffic stops, the neighbor is assumed down.

## OSPF Areas

- OSPF can partition large networks into smaller `areas`.
- `Area 0` is the `backbone`.
- All other areas must connect to Area 0.
- Area 0 cannot be split.

## Route Flapping

- Route flapping means a route goes up and down repeatedly.
- In OSPF this causes excessive LSA recalculations and churn.

## IS-IS

- `IS-IS` is another link-state protocol.
- It is heavily used in many service-provider core networks.
- It also supports VLSM and uses hello packets and area concepts.

## IS-IS NET

- Each router uses a `NET` (Network Entity Title).
- The NET includes:
- area ID
- system ID
- NSEL

## 9-7 Configuring OSPF

## Enable OSPF

```ios
router ospf 100
```

- The number is the `process ID`.
- The book uses the same process ID across routers for easier management.

## OSPF Network Statement

```ios
network <network> <wildcard-bits> area <area-id>
```

Example:

```ios
network 10.10.20.0 0.0.0.255 area 0
```

## Wildcard Bits

- Wildcard bits are the inverse of the subnet mask.
- `0` = must match
- `255` = don’t care in that octet

Example:

- subnet mask `255.255.255.0`
- wildcard `0.0.0.255`

## OSPF Configuration Examples

Per-network style:

```ios
router ospf 100
network 10.10.20.0 0.0.0.255 area 0
network 10.10.200.0 0.0.0.255 area 0
network 10.10.100.0 0.0.0.255 area 0
```

Broad match style:

```ios
router ospf 100
network 10.0.0.0 0.255.255.255 area 0
```

- This says any interface starting with `10` participates in OSPF Area 0.

## OSPF Verification Commands

```ios
show ip interface brief
show ip protocol
show ip route
show ip route ospf
show running-config
```

### Routing Table Code

- `O` = OSPF learned route

## 9-8 Configuring EIGRP

## What EIGRP Is

- `EIGRP` stands for `Enhanced Interior Gateway Routing Protocol`.
- It is described in the chapter as an `advanced distance vector` protocol.
- It combines ideas from distance vector and link-state behavior.

## EIGRP Strengths

- Supports VLSM
- Uses hello packets
- Sends updates only when changes occur
- Converges quickly
- Conserves bandwidth better than periodic full-table protocols

## Four EIGRP Components

- Neighbor Discovery/Recovery
- Reliable Transport Protocol
- DUAL Finite State Machine
- Protocol-dependent modules

## Enable EIGRP

```ios
router eigrp 150
network 10.0.0.0
```

- The number is the `AS number` (ASN in the EIGRP context).
- Routers must use the same AS number to become neighbors and exchange updates.

## Example with Wildcard Range

```ios
router eigrp 150
network 10.10.0.0 0.0.255.255
```

- This enables EIGRP on interfaces in the `10.10.x.x` range.

## EIGRP Verification

```ios
show ip protocol
show ip route
show ip interface brief
show running-config
```

### Routing Table Codes

- `D` = EIGRP internal route
- `EX` = EIGRP external route

## Important EIGRP Chapter Notes

- Updates occur when the network changes, not at fixed periodic full-table intervals.
- Routers exchange routes only with matching AS numbers.

## 9-9 Internet Routing with BGP

## When BGP Is Used

- `BGP` is used for WAN and Internet routing between different organizations or autonomous systems.
- If a customer has only one Internet connection, static routes may be enough.
- If a customer is `multihomed` (more than one Internet connection), BGP is usually used.

## BGP Basics

- BGP is considered an `external routing protocol`.
- It routes between `autonomous systems` (`AS`).
- Each AS uses an `ASN`.
- BGP uses `TCP` to establish neighbor peering and exchange routes.

## Private and Public ASNs

- Private ASNs: `64512` to `65535`
- Public ASNs: `1` to `64511`

## Basic BGP Configuration

ISP side:

```ios
router bgp 65000
network 10.20.20.0 mask 255.255.255.0
neighbor 192.168.1.2 remote-as 65001
neighbor 192.168.1.2 description Customer B BGP
```

Customer side:

```ios
router bgp 65001
network 10.10.10.0 mask 255.255.255.0
neighbor 192.168.1.1 remote-as 65000
neighbor 192.168.1.1 description ISP BGP
```

## Three Ways to Originate BGP Routes

- `network` statement
- `aggregate-address`
- `redistribute`

## BGP Verification

```ios
show ip bgp summary
show ip route
```

### Routing Table Code

- `B` = BGP route

## 9-10 IPv6 Routing

## Big Idea

- IPv6 supports static routing and dynamic routing protocols similar to IPv4.
- The routing logic is fundamentally the same, but commands are updated for IPv6 addressing and protocol behavior.

## IPv6 Static Routing

Examples:

```ios
ipv6 route 2001:0db8:BEEF::/32 FA1/0
ipv6 route 2001:0db8:BEEF::/32 FA1/0 fe80::2
ipv6 route 2001:0db8:BEEF::/32 2001:0db8:FEED::1
```

- IPv6 lets you point a route by:
- exit interface
- interface plus link-local next hop
- global next-hop address

## RIPng

- `RIPng` = RIP next generation for IPv6
- Same general role as RIPv2, but for IPv6
- Uses IPv6 multicast address:

```text
FF02::9
```

### Enable RIPng

```ios
ipv6 router rip RIP100
interface Gig3/1
 ipv6 rip RIP100 enable
```

- RIPng is configured per interface, not by IPv4-style network statements.

## OSPFv3

- `OSPFv3` is OSPF for IPv6.
- It remains a link-state protocol.
- It uses multicast:

```text
FF02::5
```

### Enable OSPFv3

```ios
ipv6 router ospf 99
router-id 9.9.9.9
interface Gig3/1
 ipv6 ospf 99 area 0.0.0.0
```

- OSPFv3 is configured per link/interface.
- A router ID is still required.

## EIGRP for IPv6

- EIGRP also supports IPv6.
- It uses multicast:

```text
FF02::A
```

### Enable EIGRP for IPv6

```ios
ipv6 router eigrp 999
eigrp router-id 9.9.9.9
no shut
interface Gig3/1
 ipv6 eigrp 999
```

- EIGRP for IPv6 is shutdown by default until `no shut` is entered in router configuration mode.
- No IPv4-style network statement is needed.

## BGP for IPv6

- IPv6 BGP uses multiprotocol BGP (`BGP4+`).
- Same BGP process can support IPv4 and IPv6 address families.

Example:

```ios
router bgp 65203
 no bgp default ipv4-unicast
 neighbor 2001:DB8:1:128::2 remote-as 65200
 neighbor 2001:DB8:1:128::2 description ISP
 address-family ipv6
  neighbor 2001:DB8:1:128::2 activate
  neighbor 2001:DB8:1:128::2 soft-reconfiguration inbound
  network 2001:D00::/32
 exit-address-family
```

## Summary You Should Retain

- Static routing is manual, predictable, and useful in small/simple designs.
- Dynamic routing scales better because routers exchange routing information automatically.
- Distance vector protocols share routing tables regularly and usually converge more slowly.
- Link-state protocols build a topology view, send change-based updates, and converge faster.
- RIP is simple but limited.
- RIPv2 adds VLSM/CIDR and other improvements.
- OSPF is the main standards-based link-state protocol covered here.
- EIGRP is an advanced distance vector Cisco-focused protocol with fast convergence.
- BGP is used for inter-AS and Internet routing.
- IPv6 uses the same routing ideas with updated commands and protocol versions.
