# Week 10 - Video 20: What Is a Routing Table?

## Main Idea

- Routers move packets between networks.
- They make forwarding decisions by using a `routing table`.
- A routing table is like a map or GPS for network traffic.
- It tells the router which path to use to reach a destination network.

## What a Routing Table Is

- A routing table is a file or data structure that contains rules about where packets should be forwarded.
- When a packet arrives, the router reads the destination IP address.
- The router compares that destination to the entries in its routing table.
- It then forwards the packet along the best known path toward the destination.

## Routing Table Analogy

- The video compares a routing table to road directions for a trip.
- If you want to get from point A to point B, you need a map or directions.
- Packets need the same kind of guidance to travel across networks.

## Three Ways Routing Tables Are Populated

The video says routing tables are built in three main ways:

- `Directly connected`
- `Static`
- `Dynamic`

## Directly Connected Routes

### Basic Topology

- One router sits between two different networks.
- One side uses the `192.168.0.0` network.
- The other side uses the `10.0.0.0` network.
- The router has:
- one interface connected to the `192.168.0.0` network
- one interface connected to the `10.0.0.0` network

### How Directly Connected Routes Appear

- When each router interface is configured with an IP address and subnet mask, the router automatically creates routes for those attached networks.
- These are called `directly connected routes`.
- A directly connected route means the network is attached to one of the router's own interfaces.

### What the Router Learns

- Packets for the `192.168.0.0` network should go out the interface connected to that network.
- Packets for the `10.0.0.0` network should go out the interface connected to that network.

### Packet Forwarding Example

- A computer on the `192.168.0.0` network wants to reach `10.0.0.2`.
- The packet is sent to the router.
- The router checks the destination IP.
- The routing table shows that the `10.0.0.0` network is directly connected.
- The router forwards the packet out the interface that leads to the `10` network.

### Key Point

- This is the basic way a routing table works:
- look at destination IP
- check the routing table
- send the packet out the correct interface

## Static Routes

### Expanded Topology

- The video then adds:
- another router
- another network using `174.16.0.0`
- a router-to-router link using its own separate network: `125.0.0.0`

### Important Concept: Router-to-Router Links Are Their Own Network

- Even if no end-user computers are on the link, the connection between two routers is still its own separate network.
- In the example, that means there are actually four networks:
- `192.168.0.0`
- `10.0.0.0`
- `174.16.0.0`
- `125.0.0.0`

### Why Directly Connected Routes Are Not Enough

- The first router knows about:
- `192.168.0.0`
- `10.0.0.0`
- `125.0.0.0`
- But it does not directly know about `174.16.0.0`.
- If a packet arrives for `174.16.0.2`, the first router cannot find that network in its directly connected routes.
- Without another route, the router drops the packet.

### What a Static Route Does

- A `static route` is entered manually by a network administrator.
- It tells the router how to reach a network that is not directly connected.
- In the example, the first router needs a route for the `174.16.0.0` network.

### Static Route Logic

To create the static route, the admin must know:

- the destination network
- the subnet mask or prefix
- the `next hop` IP address

### Next Hop

- The `next hop` is the next router interface the packet should be sent to.
- In the example, to reach `174.16.0.0`, the first router sends traffic to `125.0.0.2`.

### One-Way vs Two-Way Communication

- Adding a static route on only one router creates only one side of the path.
- Return traffic also needs a route.
- So the second router must also be given a static route back to `192.168.0.0`.

### Final Static Routing Result

- After both routers are configured with the correct static routes:
- `192.168.0.0` can talk to `174.16.0.0`
- `174.16.0.0` can talk back to `192.168.0.0`
- Then an additional route is added so `174.16.0.0` can also return traffic to `10.0.0.0`

### Key Lesson from the Static Example

- Static routes are needed for remote networks that are not directly attached.
- They must often be configured in both directions for full communication.
- The administrator has to know the topology and the correct next hop.

## Dynamic Routes

- Dynamic routes solve the same problem as static routes, but they are learned automatically instead of entered manually.
- Routers exchange route information with each other by using routing protocols.

### Dynamic Routing Protocols Named in the Video

- `RIP`
- `OSPF`
- `BGP`
- `IS-IS`
- `EIGRP`

### How Dynamic Routes Work

- If the static routes are removed and a dynamic routing protocol is configured:
- Router 1 can tell Router 2 about the `192.168.0.0` and `10.0.0.0` networks
- Router 2 can tell Router 1 about the `174.16.0.0` network
- Those routes are then added to the routing tables automatically

### Benefit of Dynamic Routing

- You do not have to manually enter every remote route on every router.
- This is especially useful when the network gets larger or changes often.

## Review

- A routing table tells a router where to forward packets.
- Routers use the destination IP address and compare it to entries in the routing table.
- Routing tables can be populated in three ways:
- `Directly connected`: created automatically when an interface is configured
- `Static`: added manually by an administrator
- `Dynamic`: learned automatically from neighboring routers through routing protocols

## Key Takeaways

- Routers are the devices that move traffic between separate networks.
- A routing table is the instruction list that tells the router where traffic should go.
- Directly connected routes only cover networks attached to the router itself.
- Static routes are manual and require the correct next-hop information.
- Dynamic routes are exchanged automatically between routers.
- Communication across multiple routers usually requires routes in both directions, not just one.
