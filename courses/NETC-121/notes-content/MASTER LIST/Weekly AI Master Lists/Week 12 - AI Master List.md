# Week 12 - AI Master List

## Week Scope (from syllabus)
- Topics: Static routing, Intro to Dynamic routing
- Lab: Static routing, RIP routing
- Reading: none listed
- Videos: 24-25
- Notes folder: Lecture Week 12

Sources included for this master list:

- `Notes List A - Video Content/Video 24 - Route Summarization/Transcript.md`
- `Notes List A - Video Content/Video 25 - Router Hierarchies and Default Routes/Transcript.md`
- `Notes List C - Alex's Personal Notes/Lecture Week 12/Lecture Week 12.md`

Note: The Week 12 syllabus does not list a textbook reading assignment, so this master list is limited to the Week 12 videos and lecture notes.

Note: The Week 12 lecture notes mention EIGRP, OSPF, and BGP for comparison, but they specifically mark EIGRP and OSPF as not required for Week 12 and state that BGP will not be covered. This master list therefore focuses on static routing review, route summarization, default routes, router hierarchy, RIP, and core dynamic-routing concepts.

---

## Canonical Concepts (Week 12 sourced scope)

### Static Routing Review

1. **Week 12 static-routing carryover:** Week 12 continues static-routing work from the previous routing lessons.
2. **Static routing definition:** Static routing means routes are manually configured rather than learned through a routing protocol.
3. **Static-route purpose:** Static routes tell a router how to reach remote networks that are not directly connected.
4. **Static-routing lab focus:** The Week 12 lab scope includes practicing static routing before moving into RIP routing.
5. **Manual-control benefit:** Static routes are predictable because they do exactly what the administrator configures.
6. **Manual-maintenance drawback:** Static routes become harder to maintain as the number of routers and networks grows.
7. **Bidirectional-routing reminder:** Communication requires a working path to the destination and a working return path back to the source.
8. **Static-route scaling problem:** If many routers each need many specific routes, the routing tables and configurations become messy quickly.
9. **Summarization connection:** Route summarization helps reduce the amount of route information that routers must store or advertise.
10. **Default-route connection:** A default route is useful when one next hop should handle many unknown or non-local destinations.

### Route Summarization Foundations

11. **Route summarization definition:** Route summarization combines multiple specific routes into one broader route.
12. **Alternate name:** Route summarization is also called route aggregation.
13. **Main purpose:** The purpose of summarization is to reduce the number of entries in a routing table.
14. **Advertisement benefit:** A router can advertise one summary route instead of many individual routes.
15. **Management benefit:** Fewer routes make routing tables cleaner and easier to understand.
16. **Scalability benefit:** Summarization makes larger networks easier to scale because routers do not need every small detail everywhere.
17. **Address-continuity requirement:** Summarization works best when the networks being summarized are contiguous or share a clean common prefix.
18. **Shared-prefix idea:** The summary route keeps the bits that all included networks have in common.
19. **Variable-bit rule:** Bits that differ between the included networks are changed to `0` in the summary network address.
20. **Mask rule:** The summary subnet mask uses `1`s for matching bits and `0`s for differing bits.
21. **Binary-comparison method:** To summarize routes, compare the differing octets in binary from left to right.
22. **Stopping point:** Stop counting matching bits at the first bit position where the addresses differ.
23. **Prefix-length result:** The number of matching bits becomes the prefix length for the summary route.
24. **Octet shortcut:** If only one octet differs, only that octet needs to be converted to binary for comparison.
25. **Summary precision rule:** A summary route may cover all intended networks, but it can also cover extra addresses if the common prefix is too broad.

### Video 24 Summarization Example

26. **Example addresses:** Video 24 summarizes `10.0.0.4`, `10.0.0.5`, and `10.0.0.6`.
27. **Shared first octets:** The first three octets in the example are identical: `10.0.0`.
28. **Binary for 4:** The last octet `4` is `00000100` in binary.
29. **Binary for 5:** The last octet `5` is `00000101` in binary.
30. **Binary for 6:** The last octet `6` is `00000110` in binary.
31. **Common last-octet bits:** The shared last-octet prefix in the example is `000001`.
32. **Changed bits:** The final two bits differ across the addresses.
33. **Summary last octet:** Keeping `000001` and changing the last two bits to `00` gives `00000100`.
34. **Summary network address:** `00000100` is decimal `4`, so the summary network address is `10.0.0.4`.
35. **Summary mask last octet:** Six matching bits followed by two differing bits gives `11111100`.
36. **Decimal mask value:** `11111100` is decimal `252`.
37. **Final mask:** The summary subnet mask is `255.255.255.252`.
38. **Final summary route:** The summary route from the example is `10.0.0.4 255.255.255.252`.
39. **CIDR form:** The same summary can be written as `10.0.0.4/30`.
40. **Example takeaway:** The summary keeps the common prefix and uses the mask to identify how many bits are shared.

### Router Hierarchy

41. **Router hierarchy definition:** Router hierarchy means routers are organized in layers instead of one long flat chain.
42. **Hierarchy purpose:** Hierarchical design makes networks easier to grow, organize, and troubleshoot.
43. **Scaling advantage:** New networks can be added by connecting local routers into an aggregation layer.
44. **Branch growth example:** In the video, new Tokyo networks such as Accounting and Help Desk can be connected into the larger topology through their local routers.
45. **Consistency advantage:** A hierarchy can give users more consistent path lengths and connectivity experience than a simple linear design.
46. **Failure-isolation advantage:** A failure in one branch router does not necessarily cut off unrelated branches.
47. **Linear-design weakness:** In a simple line of routers, users in different locations may cross very different numbers of routers to reach the same resource.
48. **Single-chain failure risk:** In a linear design, one failed router may disconnect every network behind it.
49. **Hierarchy vs packet path:** The overall design can be hierarchical, but each individual packet still follows a linear hop-by-hop path.
50. **Aggregation role:** Aggregation routers can collect routes from several smaller networks and advertise summarized routes upstream.

### Prefix Lengths and Longest Prefix Match

51. **IPv4 bit length:** An IPv4 address contains `32` bits.
52. **Octet size:** IPv4 addresses are grouped into four octets of `8` bits each.
53. **Slash notation meaning:** CIDR slash notation tells how many leftmost bits are part of the network prefix.
54. **`/24` meaning:** A `/24` route matches the first `24` bits, or the first three octets.
55. **`/16` meaning:** A `/16` route matches the first `16` bits, or the first two octets.
56. **`/8` meaning:** A `/8` route matches only the first `8` bits, or the first octet.
57. **`/0` meaning:** A `/0` route matches zero fixed bits, so it can match every IPv4 destination.
58. **Multiple-match reality:** A destination IP can match more than one route in the routing table.
59. **Longest-prefix-match rule:** When multiple routes match, the router chooses the most specific route.
60. **More-specific route rule:** A route with a longer prefix length is more specific than one with a shorter prefix length.
61. **`/24` over `/8`:** If a destination matches both a `/24` route and a `/8` route, the router uses the `/24`.
62. **Summarization safety mechanism:** Longest prefix match lets routers use broad summaries while still honoring more specific local routes.

### Hierarchical Summarization Examples

63. **New York summary idea:** If multiple New York networks begin with `10.20`, a router can summarize them with one broader route.
64. **`10.20.0.0/16` meaning:** A `10.20.0.0/16` route matches any destination whose first two octets are `10.20`.
65. **Router 5 example:** Router 5 can use `10.20.0.0/16 -> Router 4` instead of several separate New York `/24` routes.
66. **Future-growth benefit:** If more New York networks are added inside the `10.20` space, Router 5 may not need new specific routes for each network.
67. **Router 8 summary idea:** Router 8 can also summarize remote routes when the same next hop handles a large group of destinations.
68. **`10.0.0.0/8` meaning:** A `10.0.0.0/8` route matches any destination beginning with `10`.
69. **Broad enterprise summary:** A `10.0.0.0/8` route can represent a broad private enterprise address space when all those destinations are reachable through the same next hop.
70. **Summary-width tradeoff:** A broader summary reduces route count more, but it is less specific.

### Default Routes

71. **Default route definition:** A default route is the catch-all route used when no more specific route matches.
72. **Default route notation:** The IPv4 default route is `0.0.0.0/0`.
73. **Default route as summary:** A default route is the broadest possible route summary.
74. **Zero-bit match:** Because `/0` matches zero fixed bits, it can match every possible IPv4 destination.
75. **Unknown-destination behavior:** If a router does not know a specific destination, it can send the packet to the default route if one exists.
76. **Edge-router fit:** Default routes work well on edge routers that have one upstream path for all non-local destinations.
77. **Router 8 default example:** Router 8 can use `0.0.0.0/0 -> Router 5` when Router 5 is the upstream path to everything else.
78. **Internet-routing reason:** A default route prevents a small router from needing thousands or millions of internet routes.
79. **Missing-default consequence:** Without a matching route or default route, the router drops the packet.
80. **Static default route relationship:** A default route can be configured statically when the next hop is known.

### Dynamic Routing Protocols

81. **Dynamic-routing definition:** Dynamic routing protocols allow routers to exchange route information automatically.
82. **Week 12 dynamic focus:** Week 12 introduces dynamic routing through RIP routing.
83. **Route-learning benefit:** Dynamic routing reduces the need to manually configure every route on every router.
84. **Topology-change benefit:** Dynamic routing protocols can react when routes fail or change.
85. **Metric definition:** A metric is the value a routing protocol uses to choose between possible paths.
86. **Distance-vector model:** In distance-vector routing, routers learn available routes and the metric to each network from neighbors.
87. **Link-state model:** In link-state routing, routers maintain a broader map of the network topology.
88. **Lecture analogy:** The lecture notes compare link-state routing to having a map like driving directions.
89. **RIP protocol family:** RIP and RIPv2 are distance-vector routing protocols.
90. **OSPF comparison:** OSPF is a link-state protocol and is mentioned for comparison, but it is not required for Week 12.
91. **EIGRP comparison:** EIGRP is mentioned for comparison, but the lecture notes mark it as not required for Week 12.
92. **BGP scope note:** The lecture notes state that BGP is not going to be covered in Week 12.

### RIP Routing

93. **RIP lab focus:** The Week 12 lab includes RIP routing.
94. **RIPv1 type:** RIPv1 is a distance-vector protocol.
95. **RIPv1 classful behavior:** RIPv1 is classful, meaning it does not carry subnet-mask information in the same modern classless way.
96. **RIPv1 security note:** The lecture notes describe RIPv1 as insecure.
97. **RIPv1 hop limit:** RIPv1 is limited to `15` hops.
98. **RIPv1 metric:** RIPv1 uses hop count as its metric.
99. **RIPv1 modern-use note:** The lecture notes state that no one uses RIPv1.
100. **Basic RIPv1 command:** RIP configuration begins with `router rip`.
101. **RIP network command:** RIP uses `network <network-address>` statements to identify participating networks.
102. **RIPv1 command example:** Example RIPv1 commands include `network 192.168.1.0` and `network 10.0.0.0`.
103. **RIPv2 classless behavior:** RIPv2 is classless.
104. **RIPv2 security note:** The lecture notes state that RIPv2 supports security.
105. **RIPv2 hop limit:** RIPv2 is also limited to `15` hops.
106. **RIPv2 modern-use note:** The lecture notes state that no one uses RIPv2.
107. **RIPv2 command sequence:** RIPv2 configuration uses `router rip`, then `version 2`, then network statements.
108. **Hop-count weakness:** RIP's hop-count metric ignores link speed and delay, so it may not always choose the best real-world path.
109. **Sixteen as unreachable:** In RIP-style logic, a metric beyond the `15`-hop limit is treated as unreachable.
110. **Small-lab relevance:** RIP is useful for learning dynamic-routing concepts even though it is not common in modern production networks.

### Loop Prevention and Stability

111. **Routing-loop problem:** Distance-vector protocols need loop-prevention tools because route information is learned from neighbors.
112. **Split horizon definition:** Split horizon means a router will not advertise a route back out the same direction from which it learned it.
113. **Split horizon purpose:** Split horizon helps stop routers from repeating stale or misleading route information back to the source.
114. **Route poisoning definition:** Route poisoning marks a failed route with a high metric so other routers know not to use it.
115. **Route poisoning purpose:** Route poisoning helps communicate that a route has failed.
116. **Hold-down timer definition:** A hold-down timer temporarily locks down a poisoned or unstable route for update intervals.
117. **Hold-down timer purpose:** Hold-down timers help prevent route flapping from causing repeated unstable updates.
118. **Flapping meaning:** A flapping route repeatedly changes between available and unavailable states.
119. **Convergence goal:** Dynamic routing protocols try to converge, meaning all routers eventually agree on the usable paths.
120. **Stability tradeoff:** Loop-prevention and timer mechanisms improve stability, but they can delay how quickly routers accept new information.

### VLSM and Masks

121. **VLSM definition:** VLSM stands for variable length subnet mask.
122. **VLSM purpose:** VLSM allows different subnets to use different mask lengths within the same larger address space.
123. **Grouping-networks idea:** The Week 12 notes connect VLSM and grouping networks with route summarization.
124. **Network address role:** A network address identifies the subnet itself and is not assigned to a host.
125. **Broadcast address role:** A broadcast address reaches all hosts in the subnet and is not assigned to a host.
126. **Host-address range:** Usable host addresses fall between the network address and broadcast address.
127. **`192.168.0.0/22` network example:** In the notes, `192.168.0.0/22` is the network address.
128. **`/22` host range example:** The notes identify `192.168.0.1/22` through `192.168.3.254/22` as host addresses.
129. **`/22` broadcast example:** The notes identify `192.168.3.255/22` as the broadcast address.
130. **Wildcard mask mention:** The lecture notes mention wildcard masks and one's complement as routing-related mask concepts.

### Week 12 Big-Picture Takeaways

131. **Week 12 core routing idea:** Week 12 connects static routing, route summarization, default routes, and intro dynamic routing.
132. **Summarization takeaway:** Route summarization makes routing tables smaller by representing multiple specific routes with one broader route.
133. **Hierarchy takeaway:** Router hierarchies make summarization and network growth easier.
134. **Default-route takeaway:** A default route is the broadest summary and is ideal when one upstream next hop handles unknown destinations.
135. **Longest-prefix takeaway:** Routers can safely use summaries because the most specific matching route wins.
136. **RIP takeaway:** RIP introduces dynamic routing through a simple distance-vector protocol that uses hop count.
137. **Protocol-scope takeaway:** For Week 12, know RIP well and treat EIGRP, OSPF, and BGP mainly as comparison/context unless the instructor expands the scope.
138. **Lab-practice takeaway:** Be ready to configure static routes, configure RIP/RIPv2 basics, identify summary routes, and explain how default routes reduce routing-table size.
