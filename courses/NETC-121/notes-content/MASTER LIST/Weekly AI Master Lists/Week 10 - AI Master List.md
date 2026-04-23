# Week 10 - AI Master List

## Week Scope (from syllabus)
- Topics: Intro to routing, Router-on-a-stick, TFTP
- Lab: TFTP, Router on a stick, STP
- Reading: Essential, Chapter 9
- Videos: 20-23
- Notes folder: Lecture Week 10

Sources included for this master list:

- `Notes List A - Video Content/Video 20 - What is a Routing Table?/Transcript.md`
- `Notes List A - Video Content/Video 21 - Packet Traveling - How Packets Move Through a Network/Transcript.md`
- `Notes List A - Video Content/Video 22 - Routing Fundamentals/Transcript.md`
- `Notes List A - Video Content/Video 23 - Dynamic Routing Protocols/Transcript.md`
- `Notes List B - Textbook Content/Essential - Chapter 9 Routing Protocols/Essential Chapter 9 - Routing Protocols.md`
- `Notes List C - Personal Notes/Lecture Week 10/Routers and Routing.md`
- `Notes List C - Personal Notes/Lecture Week 10/Week 10 Notes.md`

Note: per request, dynamic routing concepts have been removed from this Week 10 master list except for protocol names.

---

## Canonical Concepts (trimmed Week 10 scope)

### Routing Foundations

1. **Router role:** A router is a Layer 3 device that forwards packets between different IP networks.
2. **Router decision basis:** Routers make forwarding decisions using destination IP addresses rather than destination MAC addresses.
3. **Broadcast domain separation:** A router separates broadcast domains, so Layer 2 broadcasts do not pass from one subnet to another through the router.
4. **Default gateway role:** In most LANs, the router interface on a subnet is the host's default gateway.
5. **Gateway meaning:** A gateway is the exit point a host uses to reach other networks.
6. **Router vs gateway distinction:** `Router` describes the forwarding device role, while `gateway` describes the function from the host's perspective.
7. **Local vs remote host behavior:** Hosts send local-subnet traffic directly to the destination host but send remote-subnet traffic to the default gateway.
8. **Two-LAN routing model:** Two separate LANs can communicate by connecting each subnet to a different interface on the same router.
9. **Router interface subnet rule:** Each router interface belongs to a specific IP subnet and acts as the gateway for that subnet.
10. **Router-to-router connectivity:** Routers can connect not only to end-user LANs but also to other routers, ISPs, WAN links, metro Ethernet, MPLS links, and branch links.
11. **Inter-router links are networks:** A link between two routers is its own subnet even if no end hosts live on that segment.
12. **Packet journey rule:** When sending to a remote subnet, the source host must first send the frame to the MAC address of the default gateway.
13. **Hop-local delivery rule:** Layer 2 delivery is local to the current link, while Layer 3 delivery is end-to-end across the entire routed path.

### Routing Tables

14. **Routing table definition:** A routing table is the file or data structure that lists known destination networks and how to reach them.
15. **Routing table contents:** A route entry usually includes destination network, subnet mask or prefix length, and next hop or exit interface.
16. **Routing table purpose:** The routing table acts like a map or GPS for packets moving across networks.
17. **Routing lookup process:** When a router receives a packet, it checks the destination IP, compares it to routes in the table, and forwards the packet using the best match.
18. **Most specific match rule:** Routers prefer the longest prefix match, meaning the most specific matching route wins.
19. **Longest-prefix example:** If routes exist for `10.0.0.0/8`, `10.10.0.0/16`, and `10.10.10.0/24`, traffic to `10.10.10.55` uses the `/24` route.
20. **Route source categories:** Routing tables are populated by connected routes, static routes, and dynamically learned routes.
21. **Connected route definition:** A connected route is created automatically when a router interface is configured with an IP address and subnet mask.
22. **Static route definition:** A static route is entered manually by an administrator.
23. **Dynamic route mention:** A dynamically learned route comes from a routing protocol rather than manual entry.
24. **Default route meaning:** A default route is the catch-all route used when no more specific route exists.
25. **IPv4 default route notation:** The IPv4 default route is `0.0.0.0/0`.
26. **Default route purpose on routers:** A router uses its default route to forward packets to unknown destination networks.
27. **Default route purpose on hosts:** A host uses its default gateway when the destination is not on the local subnet.
28. **Missing default route consequence on routers:** Without a default route, a router drops traffic to unknown destinations.
29. **Missing default gateway consequence on hosts:** Without a default gateway, a host can talk only to its own local subnet.

### Static Routing

30. **Static routing definition:** Static routing means routes are manually entered rather than learned automatically.
31. **Static routing requirement:** To configure static routes correctly, the administrator must know the topology, destination networks, masks, and next hops.
32. **Small-network fit:** Static routing is acceptable in small or simple networks.
33. **Stub-network fit:** Static routing is well-suited to stub networks that have only one exit path.
34. **ISP/default-route fit:** Static routing is commonly used to point to an ISP or upstream router.
35. **Static route advantage - predictability:** Static routes behave exactly as configured and do not change automatically.
36. **Static route advantage - low overhead:** Static routes produce no routing protocol update traffic.
37. **Static route advantage - security:** Static routes exchange no route advertisements, which can reduce exposure.
38. **Static route weakness - poor scale:** Static routing does not scale well as a network grows.
39. **Static route weakness - maintenance:** Any topology change requires manual route updates.
40. **Static route weakness - human error:** Static routing is easy to misconfigure because each route must be typed manually.
41. **Static route weakness - failover:** Static routing provides no automatic failover unless backup routes are also designed manually.
42. **Bidirectional rule:** Routing must be configured in both directions for end-to-end communication to work reliably.
43. **One-way route problem:** A static route on only one router fixes only the outbound path; the return path still fails without a reverse route.
44. **Cisco static route syntax:** Basic Cisco syntax is `ip route <destination-network> <subnet-mask> <next-hop-ip>`.
45. **Static route meaning:** A command like `ip route 192.168.50.0 255.255.255.0 10.1.1.2` means traffic for `192.168.50.0/24` should be sent to next hop `10.1.1.2`.
46. **Static default route syntax:** A default static route is configured with `ip route 0.0.0.0 0.0.0.0 <next-hop>`.
47. **Exit-interface option:** Cisco can also configure a static route by exit interface, such as `ip route 192.168.50.0 255.255.255.0 g0/0`.
48. **Next-hop preference note:** Using a next-hop IP is often clearer than using only an exit interface on multi-access networks.
49. **Gateway of last resort definition:** The gateway of last resort is the router to which unknown traffic should be forwarded.
50. **Gateway-of-last-resort message:** If no default route exists, `show ip route` commonly reports `Gateway of last resort is not set`.

### Host Routing and Loopback

51. **Host default route:** On a PC, the most common static route is the configured default gateway.
52. **Host route-view command 1:** `netstat -r` displays a host routing table.
53. **Host route-view command 2:** `route print` displays the active routes on a host.
54. **Default route entry on hosts:** The default route in a host routing table appears as destination `0.0.0.0` with mask `0.0.0.0`.
55. **IPv4 loopback:** `127.0.0.1` is the IPv4 loopback address.
56. **IPv6 loopback:** `::1` is the IPv6 loopback address.
57. **Loopback use:** Loopback sends traffic back to the local host and is useful for testing the local TCP/IP stack and interface path.

### Packet Travel Through a Network

58. **Sample topology:** The packet-travel video uses four hosts, two switches, and one router.
59. **Two-subnet topology:** Because the router has two interfaces, the topology contains two IP networks.
60. **Left subnet example:** Host A uses `11.11.11.10`, and the router's left interface uses `11.11.11.1`.
61. **Right subnet example:** Host D uses `22.22.22.40`, and the router's right interface uses `22.22.22.1`.
62. **Switch naming example:** The left switch is Switch X and the right switch is Switch Y.
63. **Three key tables:** Understanding packet travel requires understanding ARP tables, switch MAC address tables, and router routing tables.
64. **ARP table definition:** An ARP table maps IP addresses to MAC addresses.
65. **MAC address table definition:** A switch MAC table maps switch ports to MAC addresses learned from incoming frames.
66. **Routing table definition in forwarding:** A routing table maps destination networks to the correct exit interface or path.
67. **Dynamic learning rule:** ARP tables and switch MAC tables are populated dynamically as traffic moves through the network.
68. **Pre-populated routing rule:** The routing table already knows directly connected networks once the router interfaces are configured.
69. **End-to-end Layer 3 rule:** Host A can build the Layer 3 packet to host D as soon as it knows host D's IP address.
70. **Remote-destination rule:** Host A compares host D's IP to its own subnet and determines the destination is remote.
71. **ARP-before-forwarding rule:** Before host A can send to the router, it must resolve the router's MAC address using ARP.
72. **ARP request behavior:** The ARP request asks, in effect, "Who has this IP? Tell me your MAC address."
73. **ARP is broadcast:** An ARP request is a Layer 2 broadcast and is flooded by the switch.
74. **Switch learning on ARP:** When Switch X receives the ARP request, it learns host A's source MAC on the incoming port.
75. **Host ignore rule:** Hosts ignore ARP requests that do not target their own IP address.
76. **Router ARP acceptance:** The router accepts the ARP request when the requested IP matches its own interface.
77. **Router ARP learning:** The router learns host A's IP-to-MAC mapping from the ARP request.
78. **ARP reply behavior:** The ARP reply is a unicast frame sent directly back to the original requester.
79. **Switch learning on ARP reply:** The switch learns the router's MAC address from the ARP reply.
80. **Host gateway-ARP entry:** Host A stores the router's IP-to-MAC mapping in its ARP table.
81. **Data held during ARP:** The actual data waits while ARP resolves the needed local MAC address.
82. **Layer 2 header role:** The Layer 2 header gets the frame from one hop to the next hop.
83. **Layer 3 header role:** The Layer 3 header gets the packet from the original source to the final destination.
84. **First-hop encapsulation:** Host A sends the real packet with source MAC = host A, destination MAC = router ETH1, source IP = host A, and destination IP = host D.
85. **Switch forwarding rule:** A switch forwards unicast frames based on the destination MAC address in its MAC table.
86. **Router decapsulation rule:** When the router receives the frame, it removes the old Layer 2 header because that header's job is complete.
87. **Router route lookup:** The router reads the Layer 3 destination IP and consults its routing table to choose the outgoing interface.
88. **Directly connected destination rule:** If the destination network is directly connected to the outgoing interface, the router knows the final host is on that subnet.
89. **Second ARP requirement:** The router still needs the destination host's MAC address on that outgoing subnet before it can send the frame.
90. **Router ARP on right subnet:** The router broadcasts an ARP request for host D's MAC on the right-side network.
91. **Second-switch learning rule:** Switch Y learns the router's right-side MAC on its incoming port when the ARP request arrives.
92. **Destination-host ARP reply:** Host D accepts the ARP request for its IP, learns the router's MAC, and replies unicast.
93. **Switch learns destination host:** Switch Y learns host D's MAC address from the ARP reply.
94. **Router learns destination host:** The router stores host D's IP-to-MAC mapping in its ARP table.
95. **Re-encapsulation rule:** The router keeps the same Layer 3 packet but creates a new Layer 2 header for the next link.
96. **Hop-by-hop Layer 2 change:** The source and destination MAC addresses change at routed hops.
97. **End-to-end Layer 3 continuity:** The source and destination IP addresses stay the same from host A to host D.
98. **Destination decapsulation:** Host D removes the Layer 2 header and then the Layer 3 header before processing the payload.
99. **Return-path speedup:** The response from host D to host A is faster because the ARP and MAC tables are already populated.
100. **Default-gateway reuse:** Host D can immediately send its response to the router because it already knows the router's MAC.
101. **Return routing rule:** The router uses its existing ARP entry for host A and quickly re-encapsulates the response toward the left subnet.
102. **Packet travel summary:** Successful end-to-end packet delivery requires local Layer 2 resolution plus Layer 3 routing decisions at the router.

### Dynamic Routing Protocol Names Only

103. **Dynamic routing protocol names mentioned this week:** RIP, RIPv2, OSPF, IS-IS, EIGRP, and BGP.

### Router on a Stick

104. **Router-on-a-stick definition:** Router on a stick is inter-VLAN routing using one physical router interface connected to a switch trunk.
105. **Subinterface concept:** The router creates multiple logical subinterfaces on one physical interface.
106. **802.1Q requirement:** Each subinterface uses 802.1Q tagging to identify its VLAN.
107. **One-cable idea:** One physical trunk link carries traffic for multiple VLANs between the switch and the router.
108. **Router-on-a-stick gateway role:** Each subinterface acts as the Layer 3 gateway for one VLAN.
109. **Router-on-a-stick example:** `g0/0.10` can serve VLAN 10 while `g0/0.20` serves VLAN 20.
110. **Router-on-a-stick benefit - interface savings:** Router on a stick reduces the number of physical router interfaces required.
111. **Router-on-a-stick benefit - cost:** It is cheaper than using a separate physical interface per VLAN.
112. **Router-on-a-stick fit:** It is suitable for small and medium lab or branch designs.
113. **Router-on-a-stick weakness - bottleneck:** One physical trunk link can become a bandwidth bottleneck.
114. **Router-on-a-stick weakness - single point of failure:** If the trunk fails, inter-VLAN routing fails for all VLANs using it.
115. **Router-on-a-stick weakness - scale:** It is less scalable than using a multilayer switch for inter-VLAN routing.

### Common Router Commands and Verification

116. **Interface setup sequence:** Router interfaces are configured with an IP address, subnet mask, and `no shut`.
117. **Interface verification command:** `show ip interface brief` is one of the most useful commands for checking interface addresses and status.
118. **Status vs protocol note:** An interface can show `up` administratively but protocol `down` if the far side or physical link is not active.
119. **Routing table verification command:** `show ip route` shows the routes currently installed in the routing table.
120. **Static-only view:** `show ip route static` filters the routing table to only static routes.
121. **Running configuration check:** `show running-config` displays the current active configuration in RAM.
122. **Startup configuration check:** `show startup-config` displays the saved configuration in NVRAM.
123. **Save configuration commands:** `copy run start` and `write memory` save the running configuration to NVRAM.

### IPv6 Routing

124. **IPv6 routing principle:** IPv6 uses the same basic routing ideas as IPv4 even though the commands and protocol forms are updated.
125. **IPv6 static route syntax:** IPv6 static routing uses `ipv6 route <prefix> ...`.
126. **IPv6 next-hop flexibility:** An IPv6 static route can point to an exit interface, an interface plus link-local next hop, or a global next-hop IPv6 address.
127. **IPv6 dynamic protocol names mentioned this week:** RIPng, OSPFv3, EIGRP for IPv6, and BGP for IPv6.

### Week 10 Big-Picture Takeaways

128. **Routing is layered:** Successful packet forwarding depends on both Layer 2 mechanisms and Layer 3 routing logic.
129. **Layer 2 is hop-local:** MAC addressing is rebuilt hop by hop and is relevant only on the current local link.
130. **Layer 3 is end-to-end:** IP addressing remains the end-to-end identifier across the full routed path.
131. **Week 10 focus after trimming:** The core Week 10 focus is routing tables, default routes, static route syntax, router-on-a-stick, IPv6 static routing, and the hop-by-hop packet journey through switches and routers.
