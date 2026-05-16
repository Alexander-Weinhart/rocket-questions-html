# Week 10 - Video 23: Dynamic Routing Protocols

## Main Idea

- Dynamic routing protocols let routers automatically share route information with one another.
- This video introduces the major protocol categories rather than diving deeply into one protocol.
- The main comparisons are:
- `IGP` vs `EGP`
- `distance vector` vs `link state`

## Why Dynamic Routing Exists

- Routers can populate a routing table in three main ways:
- directly connected routes
- static routes
- dynamic routes
- With dynamic routing, neighboring routers automatically exchange the networks they know about.
- This reduces the need to manually enter every remote route.

## Five Major Dynamic Routing Protocols

- `RIP`
- `EIGRP`
- `OSPF`
- `IS-IS`
- `BGP`

## IGP vs EGP

### Interior Gateway Protocols (`IGPs`)

- `IGP` stands for `Interior Gateway Protocol`.
- IGPs are used to share routes within a single `autonomous system`.
- Protocols named in this category:
- `RIP`
- `EIGRP`
- `OSPF`
- `IS-IS`
- IGPs are generally tuned for:
- speed
- responsiveness
- quick reaction to failures
- Because of that, they are often more chatty inside the network they serve.

### Exterior Gateway Protocols (`EGPs`)

- `EGP` stands for `Exterior Gateway Protocol`.
- EGPs are used to share routes between different autonomous systems.
- The only EGP in major internet use today is `BGP`.
- EGPs are generally tuned for:
- stability
- security
- policy control
- They intentionally limit how often the wider internet hears about smaller internal failures.

## Autonomous Systems

- An `autonomous system` (`AS`) is a set of routers or networks under one administrative control.
- One company network can be one autonomous system.
- A different company network is usually a different autonomous system.
- IGPs operate inside an AS.
- BGP operates between autonomous systems.

## How IGPs Are Used

- A company might use one IGP for internal routing, such as:
- `EIGRP` in one network
- `OSPF` in another
- The goal is for routers inside that organization to learn internal routes quickly.
- If an internal router or link fails, the rest of the internal routers should react quickly and adjust their routes.

## How EGPs and BGP Are Used

- Companies usually do not exchange routes directly with other companies.
- More commonly, they exchange routes with an `ISP` using `BGP`.
- ISPs also exchange routes with other ISPs using BGP.
- This large web of interconnected providers is essentially what the internet is.

## Why BGP Is Different

- BGP is designed to avoid flooding the whole internet with every small failure inside a company.
- It focuses more on:
- route filtering
- route control
- policy-based decisions
- path influence
- For example, an ISP can reject route advertisements a customer should not be announcing.
- BGP can also influence which paths other networks prefer when reaching a company.

## Distance Vector vs Link State

### Link State Protocols

- `OSPF` and `IS-IS` are link-state protocols.
- A link-state router builds knowledge of the entire network topology.
- It knows:
- which routers connect to which other routers
- what paths exist through the topology
- what destination networks hang off remote routers
- This broader knowledge requires more:
- RAM
- CPU
- But it usually gives faster convergence.

### Link State Convergence Benefit

- If one path fails, a link-state router may already know an alternate path.
- It does not need to relearn the whole destination from scratch.
- That lets it adjust more quickly during failures.

### Distance Vector Protocols

- `RIP` and `EIGRP` are presented here as distance-vector protocols.
- A distance-vector router knows only up to the `next hop`.
- It knows:
- which neighboring router leads toward a destination
- what networks exist behind that neighbor
- It does not know the full remote topology in detail.
- This usually requires fewer resources than link state.

### Distance Vector Tradeoff

- Because the router does not know the full topology, failure recovery can be slower.
- If a route disappears, the router may temporarily lose all known paths until updates propagate hop by hop.
- That means distance-vector protocols often converge more slowly than link-state protocols.

## Choosing Between Them

- Neither category is automatically better in every situation.
- `Distance vector` may fit:
- simpler topologies
- older devices
- lower complexity needs
- `Link state` may fit:
- modern routers
- larger topologies
- networks where redundancy and fast convergence matter

## Modern Hardware Note

- The video notes that the historical RAM and CPU cost of link-state protocols mattered much more in older routers.
- On modern routers, the extra resource requirement is often much less significant.
- Many newer routers can handle very large route databases without difficulty.

## EIGRP Nuance

- `EIGRP` is often grouped with distance-vector protocols.
- It is also sometimes called:
- an `advanced distance vector` protocol
- a `hybrid` protocol
- That is because it includes some features that resemble link-state behavior.

## Key Takeaways

- Dynamic routing protocols automatically exchange route information between routers.
- The five major protocols named are `RIP`, `EIGRP`, `OSPF`, `IS-IS`, and `BGP`.
- `IGPs` operate within one autonomous system; `BGP` as an `EGP` operates between autonomous systems.
- `IGPs` prioritize speed and responsiveness; `EGPs` prioritize stability, security, and control.
- `Link state` protocols know the full topology and usually converge faster.
- `Distance vector` protocols know only the next hop and usually use fewer resources but can converge more slowly.
- `EIGRP` sits in a gray area and is often described as an advanced distance-vector or hybrid protocol.
