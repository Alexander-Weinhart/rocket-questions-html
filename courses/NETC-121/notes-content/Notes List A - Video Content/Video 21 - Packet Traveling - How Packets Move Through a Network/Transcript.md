# Week 10 - Video 21: Packet Traveling - How Packets Move Through a Network

## Main Idea

- This video combines the earlier packet-traveling lessons into one full path.
- The example packet travels:
- host A
- switch X
- router
- switch Y
- host D
- Then the response travels all the way back to host A.

## Topology Overview

- The topology has:
- 4 hosts
- 2 switches
- 1 router
- Because the router has two interfaces, there are two separate IP networks.

### Left Network

- Host A: `11.11.11.10`
- Router ETH1: `11.11.11.1`

### Right Network

- Host D: `22.22.22.40`
- Router ETH2: `22.22.22.1`

### Device Names

- Left switch: `Switch X`
- Right switch: `Switch Y`
- Router interfaces:
- `ETH1` on the left
- `ETH2` on the right

## The Three Tables That Matter

The video focuses on three device tables that explain how traffic moves:

- `ARP table`
- `MAC address table`
- `Routing table`

### ARP Table

- Maps an IP address to a MAC address.
- Hosts and routers use ARP tables because they operate at Layer 3 and still need Layer 2 delivery on the local link.

### MAC Address Table

- Maps a switch port to a MAC address.
- Switches build this table dynamically by reading the source MAC address of incoming frames.

### Routing Table

- Maps destination IP networks to the exit interface or next path.
- Routers use this to decide where a packet should go next.
- In this example, the router already knows:
- `11.11.11.0/24` is directly connected to `ETH1`
- `22.22.22.0/24` is directly connected to `ETH2`

## Important Setup Rule

- ARP tables and switch MAC tables are built dynamically as traffic moves.
- The routing table is already populated beforehand because the router interfaces were configured with IP addresses.

## Packet from Host A to Host D

## Step 1: Host A Creates the Layer 3 Packet

- Host A wants to send data to host D.
- Host A already knows host D's IP address.
- It creates a Layer 3 header with:
- source IP: `11.11.11.10`
- destination IP: `22.22.22.40`

## Step 2: Host A Determines the Destination Is Remote

- Host A compares the destination IP to its own local network.
- It sees that host D is on a foreign network.
- That means the packet must be sent to the default gateway, not directly to host D.

## Step 3: Host A Needs the Router's MAC Address

- To send the packet to the router, host A needs a Layer 2 header.
- But it does not yet know the MAC address of the default gateway (`11.11.11.1`).
- So host A must use `ARP`.

## Step 4: Host A Sends an ARP Request

- Host A broadcasts an ARP request asking:
- who has IP `11.11.11.1`?
- tell me your MAC address

## Step 5: Switch X Learns and Floods

- The ARP request arrives at Switch X on port 2.
- Switch X learns that host A's MAC address is on port 2.
- Because the ARP request is a broadcast, Switch X floods it out every other port.
- Both host B and the router receive a copy.

## Step 6: Devices Process the ARP Request

- Host B ignores the request because the target IP is not its own.
- The router sees that the ARP request is for its own IP address (`11.11.11.1`).
- The router accepts the request.

## Step 7: The Router Learns Host A and Sends an ARP Reply

- From the ARP request, the router learns host A's IP-to-MAC mapping.
- It adds host A to its ARP table.
- The router then sends an ARP reply directly back to host A because it now knows host A's MAC address.

## Step 8: Switch X Learns the Router's MAC

- The ARP reply enters Switch X on port 3.
- Switch X learns that the router's MAC address is on port 3.
- Because the reply is a unicast frame to host A, the switch forwards it only out port 2.

## Step 9: Host A Learns the Gateway MAC

- Host A receives the ARP reply.
- Host A adds the router's IP-to-MAC mapping to its ARP table.
- The address resolution process is now complete.

## Step 10: Host A Sends the Real Packet

- Host A can finally encapsulate the packet in a Layer 2 frame.
- Layer 2 header:
- source MAC = host A
- destination MAC = router ETH1
- Layer 3 header stays:
- source IP = host A
- destination IP = host D

## Key Header Principle

- The `Layer 3 header` is for end-to-end delivery.
- The `Layer 2 header` is for hop-to-hop delivery.

## Step 11: Switch X Forwards the Frame to the Router

- Switch X receives the frame on port 2.
- It refreshes its existing MAC table entry for host A.
- The destination MAC is the router's MAC.
- Switch X already knows that MAC is on port 3, so it forwards the frame out port 3.

## Step 12: The Router Removes the Old Layer 2 Header

- The router receives the frame.
- It strips off the Layer 2 header because that header's job was only to get the packet from host A to the router.

## Step 13: The Router Consults the Routing Table

- The router examines the Layer 3 destination IP: `22.22.22.40`.
- The routing table says that network `22.22.22.0/24` is reachable through `ETH2`.
- Since that network is directly connected, the router knows the packet must now be delivered to host D.

## Step 14: The Router Needs Host D's MAC Address

- The router knows the correct outgoing interface.
- But it does not yet know host D's MAC address.
- So the router must ARP on the right-side network.

## Step 15: The Router Sends an ARP Request on the Right Network

- The router broadcasts an ARP request asking for the MAC address of `22.22.22.40`.

## Step 16: Switch Y Learns and Floods

- The ARP request reaches Switch Y on port 4.
- Switch Y learns that the router ETH2 MAC address is on port 4.
- Because the ARP request is a broadcast, Switch Y floods it to the other ports.
- Both host C and host D receive it.

## Step 17: Hosts Process the ARP Request

- Host C ignores the request because the target IP is not its own.
- Host D recognizes that the request is asking for its IP address.
- Host D accepts it.

## Step 18: Host D Learns the Router and Replies

- Host D learns the router's IP-to-MAC mapping from the ARP request.
- It adds the router to its ARP table.
- Host D then sends a unicast ARP reply back to the router.

## Step 19: Switch Y Learns Host D's MAC

- Switch Y receives the ARP reply on port 5.
- It learns that host D's MAC address is on port 5.
- Since the destination MAC is the router's MAC on port 4, the switch forwards the frame out port 4.

## Step 20: The Router Learns Host D's MAC

- The router receives the ARP reply.
- It adds host D's IP-to-MAC mapping to its ARP table.
- Now it has everything needed for final delivery.

## Step 21: The Router Builds a New Layer 2 Header

- The router keeps the same Layer 3 packet.
- It creates a new Layer 2 header for the next hop:
- source MAC = router ETH2
- destination MAC = host D

## Step 22: Switch Y Forwards the Packet to Host D

- Switch Y receives the frame on port 4.
- It refreshes the router's MAC table entry.
- The destination MAC belongs to host D on port 5.
- Switch Y forwards the frame out port 5.

## Step 23: Host D Removes the Headers and Processes the Data

- Host D strips off the Layer 2 header because it only mattered for the router-to-host D hop.
- Host D then strips off the Layer 3 header because it has reached the final destination.
- Host D can now process the actual data payload.

## What Changed and What Stayed the Same

- The Layer 2 header changed at the router.
- The Layer 3 header stayed the same from host A all the way to host D.
- This is one of the most important ideas in packet forwarding.

## Response from Host D to Host A

- The return trip is much faster because the ARP tables and MAC address tables are already populated.
- No new address resolution is needed if the entries are still valid.

## Step 24: Host D Creates the Response Packet

- Host D creates return data for host A.
- Layer 3 header:
- source IP = host D
- destination IP = host A

## Step 25: Host D Uses Its Existing ARP Entry

- Host D sees that host A is on a foreign network.
- It must send the packet to the default gateway.
- Host D already knows the router's MAC address from the earlier ARP exchange.
- So it immediately creates the Layer 2 header:
- source MAC = host D
- destination MAC = router ETH2

## Step 26: Switch Y Forwards the Frame to the Router

- The frame arrives at Switch Y on port 5.
- Switch Y already knows the needed MAC mappings.
- It forwards the frame out port 4 toward the router.

## Step 27: The Router Routes the Return Packet

- The router removes the Layer 2 header.
- It checks the Layer 3 destination IP: `11.11.11.10`.
- The routing table shows that `11.11.11.0/24` is directly connected to `ETH1`.

## Step 28: The Router Uses Its Existing ARP Entry for Host A

- The router already knows host A's MAC address.
- So it builds a new Layer 2 header:
- source MAC = router ETH1
- destination MAC = host A

## Step 29: Switch X Forwards the Frame to Host A

- The frame reaches Switch X on port 3.
- Switch X already knows host A's MAC is on port 2.
- It forwards the frame out port 2.

## Step 30: Host A Receives and Processes the Response

- Host A removes the Layer 2 header.
- Host A removes the Layer 3 header.
- Host A processes the returned data.

## Big Lessons from the Video

- A packet crossing networks needs both Layer 2 and Layer 3 logic.
- ARP tables map IP addresses to MAC addresses.
- Switches use MAC address tables to forward frames.
- Routers use routing tables to choose the correct outgoing interface.
- ARP and MAC learning happen dynamically as traffic flows.
- The router rebuilds the Layer 2 header at every routed hop.
- The Layer 3 source and destination IP addresses remain the end-to-end identifiers.
- The first trip is slower because the devices must learn each other.
- The return trip is faster because the required tables are already populated.
