# Week 10 - Video 22: Routing Fundamentals

## Main Idea

- Routers forward packets between different networks by reading the destination IP address and consulting a routing table.
- Successful routing depends on both Layer 3 decisions and Layer 2 delivery on each local link.
- The video introduces packet forwarding, TCP/IP encapsulation, ARP, routing-table lookups, static routes, dynamic routes, and administrative distance.

## Router Forwarding Basics

- The router's main job is to forward packets from one interface to another.
- When a router receives a frame, it checks:
- the frame check sequence (`FCS`)
- whether the destination MAC matches the receiving interface
- If those checks pass, the router examines the destination IP address in the packet.
- The router then consults the routing table to decide the outgoing interface or next hop.
- Once the best route is found, the packet is forwarded out the chosen interface.

## TCP/IP Model Review

### Encapsulation on the Sender

- The application creates the original data.
- The transport layer adds a TCP header, creating a `segment`.
- The network layer adds an IP header, creating a `packet`.
- The data-link layer adds a link header and trailer, creating a `frame`.
- The physical layer sends the frame as `bits` across the medium.

### Decapsulation on the Receiver

- The receiving host reconstructs the frame from the incoming bits.
- The data-link layer removes the Layer 2 information and exposes the IP packet.
- The network layer removes the IP header and passes the segment upward.
- The transport layer removes its header and delivers the data to the application.

## TCP/IP and OSI Mapping

- In the TCP/IP model, the `Application` layer covers the OSI:
- application layer
- presentation layer
- session layer
- The remaining TCP/IP layers map one-to-one with OSI:
- transport
- network
- data link
- physical

## ARP and the Link Header

- A sender must know the destination MAC address before it can build the Layer 2 header.
- If the MAC address is unknown, the sender uses `ARP` to discover it.
- ARP request:
- sent as a broadcast
- asks who owns a given IP address
- ARP reply:
- sent as a unicast
- returns the sender's MAC address
- Once ARP completes, the sender can place the correct MAC address in the frame header.

## Simple Local Delivery Example

- `PC2` wants to send traffic to `PC3`.
- `PC2` knows `PC3`'s IP address but not its MAC address.
- `PC2` sends an ARP broadcast asking for the MAC address tied to `172.16.3.3`.
- `PC3` replies with its MAC address.
- `PC2` then uses that MAC address in the Layer 2 header and sends the frame.

## Routing Principles

### Default Gateway Logic

- A host compares the destination IP to its own subnet.
- If the destination is on a different subnet, the host sends the packet to its `default gateway`.
- The default gateway is usually the router interface on the local LAN.

### Example: PC1 to PC2

- `PC1` is on subnet `172.16.1.0/24`.
- `PC2` is on subnet `172.16.3.0/24`.
- `R1` connects both networks.
- Because `PC2` is remote, `PC1` sends the packet to `R1`'s local interface instead of directly to `PC2`.

### Router Checks and Lookup

- `R1` receives the frame on `e0`.
- It verifies:
- `FCS`
- destination MAC matches `e0`
- The router then reads the destination IP, for example `172.16.3.2`.
- It searches the routing table and chooses the `longest prefix match`.
- In this case, `172.16.3.0/24` matches the destination.
- Because that network is directly connected, `R1` forwards the packet out the interface that leads to that subnet.

### Two-Way Connectivity Rule

- One-way reachability is not enough.
- If `PC1` can send traffic to `PC2`, return traffic still requires a valid route back to `PC1`.
- Full communication requires routing in both directions.

### Example: PC1 to PC4 Through Two Routers

- `PC4` sits behind `R2`.
- `PC1` sends remote traffic to `R1`.
- `R1` checks the destination network, such as `172.16.4.0/24`.
- `R1` does not have that network as directly connected, so it uses the route that points to the next hop on the `R1-R2` link.
- `R2` receives the packet, checks its own table, sees `172.16.4.0/24` is directly connected, and forwards the packet to `PC4`.

## Static and Dynamic Routing

### Dynamic Routing

- With dynamic routing, routers learn routes automatically from neighboring routers.
- Routers advertise the networks they know.
- Neighboring routers add those learned networks to their own routing tables and pass them along.
- This allows routing tables to update automatically as the network grows.

### Static Routing

- A `static route` is configured manually by an administrator.
- Cisco syntax follows this pattern:

```ios
ip route <destination-network> <subnet-mask> <next-hop>
```

- Example logic:
- to reach a remote subnet
- send packets to a specific neighboring router

## Types of Static Routes

### Network Static Route

- A route for an entire subnet, such as a `/24` network.

### Host Static Route

- A route for one exact host.
- This uses a `/32` mask, or `255.255.255.255`.

### Default Route

- A catch-all route used when no more specific route matches.
- It is used for unknown destinations.

### Floating Static Route

- A backup static route that is configured with a higher `administrative distance`.
- It stays in reserve while a preferred route source is available.

## Administrative Distance

- `Administrative distance` ranks how trustworthy a route source is.
- Lower values are preferred.
- Common examples from the video:
- connected route = `0`
- static route = `1`
- OSPF = `110`
- A normal static route beats OSPF because `1` is lower than `110`.
- To make a backup static route, give it a higher administrative distance such as `150`.
- Then OSPF stays active until it disappears, at which point the floating static route takes over.

## Dynamic Routing Protocol Categories

- `Distance vector`: `RIP v2`
- `Advanced distance vector`: `EIGRP`
- `Link state`: `OSPF`, `IS-IS`

## Key Takeaways

- Routers forward packets by using destination IP addresses and routing-table lookups.
- Layer 2 forwarding changes hop by hop, but Layer 3 addressing stays focused on the end destination.
- ARP is required to learn the correct local MAC address before a frame can be sent.
- Hosts use a default gateway for remote destinations.
- Routers choose routes based on the most specific matching entry.
- End-to-end communication requires routes in both directions.
- Static routes are manual; dynamic routes are learned automatically.
- Floating static routes provide backup paths by using a higher administrative distance.
