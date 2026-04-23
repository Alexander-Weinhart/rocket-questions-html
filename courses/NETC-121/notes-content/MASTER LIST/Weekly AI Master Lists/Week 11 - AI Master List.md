# Week 11 - AI Master List

## Week Scope (from syllabus)
- Topics: Static routing
- Lab: BPDU guard, Static routing
- Reading: Essential, Chapter 9
- Videos: 22-23
- Notes folder: Lecture Week 11

Sources included for this master list:

- `Notes List A - Video Content/Video 22 - Routing Fundamentals/Transcript.md`
- `Notes List A - Video Content/Video 23 - Dynamic Routing Protocols/Transcript.md`
- `Notes List B - Textbook Content/Essential - Chapter 9 Routing Protocols/Essential Chapter 9 - Routing Protocols.md`
- `Notes List C - Alex's Personal Notes/Lecture Week 11/Lecture Week 11.md`

Note: `Lecture Week 11.md` currently exists but is empty, there was no week 11 lecture that there could be notes taken on. It was an introduction to lab 11.

Note: the Week 11 syllabus lab mentions `BPDU guard`, but the current Week 11 sources in this repo do not contain BPDU-guard notes. This master list therefore focuses on the sourced Week 11 topics: static routing plus intro-level dynamic-routing categorization from Videos 22-23.

---

## Canonical Concepts (Week 11 sourced scope)

### Static Routing Foundations

1. **Static routing definition:** Static routing means routes are manually entered by an administrator instead of being learned automatically.
2. **Router forwarding basis:** Routers forward packets by checking the destination IP address and comparing it to entries in the routing table.
3. **Route lookup rule:** The router chooses the best matching route for the destination network before forwarding the packet.
4. **Longest-prefix match rule:** When several routes could match, the most specific matching route wins.
5. **Connected-route contrast:** Directly connected routes appear automatically when an interface is configured, but static routes must be typed in manually.
6. **Remote-network purpose:** Static routes are mainly used to reach networks that are not directly connected to the router.
7. **Default-gateway relationship:** Hosts send traffic for remote networks to their default gateway, and the router then relies on its routing table to continue forwarding.
8. **Two-way routing rule:** End-to-end communication requires routing to work in both directions, not just outbound from the source.
9. **One-way failure risk:** A route configured on only one router may allow packets to leave but not allow the replies to return.
10. **Small-network fit:** Static routing is a good fit for small, simple, or predictable topologies.
11. **Stub-network fit:** Static routing works especially well in stub networks that have only one practical exit path.
12. **Administrative burden:** Static routing does not scale well because every topology change may require manual updates.
13. **Human-error risk:** Static routing is easy to misconfigure because each route must be entered exactly and intentionally.
14. **Low-overhead benefit:** Static routes do not generate routing-update traffic the way dynamic routing protocols do.
15. **Predictability benefit:** Static routes behave exactly as configured until an administrator changes them.

### Cisco Static Route Syntax and Types

16. **Basic Cisco syntax:** Cisco static routes use `ip route <destination-network> <subnet-mask> <next-hop-ip>`.
17. **Syntax meaning:** The destination network and mask identify what subnet you want to reach, and the next hop identifies where to send the packet next.
18. **Example meaning:** A route like `ip route 192.168.50.0 255.255.255.0 10.1.1.2` means packets for `192.168.50.0/24` should be sent to `10.1.1.2`.
19. **Exit-interface option:** Cisco can also point a static route to an exit interface instead of only a next-hop IP.
20. **Next-hop clarity note:** Using a next-hop IP is often clearer on multi-access networks than using only the interface name.
21. **Network static route:** A network static route points to an entire subnet.
22. **Host static route:** A host static route points to one exact host and uses a `/32` mask or `255.255.255.255`.
23. **Default route definition:** A default route is the catch-all route used when no more specific destination match exists.
24. **IPv4 default route notation:** The IPv4 default route is `0.0.0.0/0`.
25. **Cisco default route syntax:** A default static route is configured with `ip route 0.0.0.0 0.0.0.0 <next-hop>`.
26. **Gateway-of-last-resort meaning:** On routers, the default route is commonly described as the `gateway of last resort`.
27. **Missing-default consequence:** Without a default route, a router drops packets to unknown destination networks.

### Administrative Distance and Floating Static Routes

28. **Administrative-distance definition:** Administrative distance is the trust ranking a router uses between different route sources.
29. **Lower-is-better rule:** Lower administrative-distance values are preferred over higher ones.
30. **Connected-route distance:** Connected routes use an administrative distance of `0`.
31. **Static-route distance:** Normal static routes use an administrative distance of `1`.
32. **OSPF distance example:** The video names `110` as the administrative distance for `OSPF`.
33. **Static-over-OSPF outcome:** A normal static route beats an OSPF route because `1` is lower than `110`.
34. **Floating static route definition:** A floating static route is a backup static route configured with a higher administrative distance than the preferred route source.
35. **Floating-route behavior:** A floating static route stays inactive while the preferred route exists and becomes active only if the preferred route disappears.
36. **Backup-route example:** If OSPF is active, a static route with distance `150` can serve as a standby backup path.

### Packet Forwarding and Layered Delivery

37. **Router main job:** A router forwards packets from one interface to another.
38. **Frame acceptance checks:** Before forwarding, the router checks the frame check sequence and whether the destination MAC matches the receiving interface.
39. **Layer-3 decision point:** After the Layer 2 checks pass, the router makes its forwarding decision using the Layer 3 destination IP address.
40. **Hop-local Layer-2 rule:** Layer 2 delivery is local to the current link and is rebuilt at each routed hop.
41. **End-to-end Layer-3 rule:** The source and destination IP addresses identify the endpoints across the full routed path.
42. **ARP requirement:** A device must know the correct local MAC address before it can send a frame onto the local network.
43. **ARP request behavior:** ARP sends a broadcast asking which device owns a specific IP address.
44. **ARP reply behavior:** ARP replies are typically unicast and provide the needed MAC address.
45. **Default-gateway delivery rule:** When a host sends to a remote subnet, it addresses the frame to the default gateway's MAC rather than the final remote host's MAC.
46. **Encapsulation sequence:** Application data becomes a segment, then a packet, then a frame, and finally bits on the wire.
47. **Decapsulation sequence:** The receiving side reverses that process from bits to frame to packet to segment to application data.

### Dynamic Routing Intro

48. **Dynamic-routing definition:** Dynamic routing protocols let routers automatically exchange route information with one another.
49. **Three route sources:** Routing tables can be populated by connected routes, static routes, and dynamic routes.
50. **Why dynamic routing exists:** Dynamic routing reduces the need to manually configure every remote route on every router.
51. **Five major protocols named:** The videos name `RIP`, `EIGRP`, `OSPF`, `IS-IS`, and `BGP` as major dynamic routing protocols.
52. **IGP definition:** An `Interior Gateway Protocol` (`IGP`) is used inside one autonomous system.
53. **EGP definition:** An `Exterior Gateway Protocol` (`EGP`) is used between autonomous systems.
54. **BGP role:** `BGP` is the major EGP used on the modern internet.
55. **Autonomous-system definition:** An autonomous system is a group of routers or networks under one administrative control.
56. **IGP examples:** `RIP`, `EIGRP`, `OSPF`, and `IS-IS` are presented as IGPs.
57. **IGP design goal:** IGPs are tuned for speed, responsiveness, and fast reaction to internal failures.
58. **EGP design goal:** EGPs are tuned more for stability, control, filtering, and policy.
59. **Internet view:** The internet is described as many interconnected autonomous systems, often tied together by providers using BGP.

### Distance Vector vs Link State

60. **Distance-vector examples:** `RIP` and `EIGRP` are presented in this lesson as distance-vector protocols.
61. **Link-state examples:** `OSPF` and `IS-IS` are presented as link-state protocols.
62. **Link-state knowledge model:** Link-state routers maintain knowledge of the overall topology, not just the next hop.
63. **Distance-vector knowledge model:** Distance-vector routers know which next hop leads toward a destination but do not maintain the full topology in detail.
64. **Link-state resource tradeoff:** Link-state protocols usually require more memory and CPU because they maintain richer topology information.
65. **Link-state convergence benefit:** Link-state protocols usually converge faster because they may already know an alternate path when a failure happens.
66. **Distance-vector resource benefit:** Distance-vector protocols usually require fewer resources because they keep less topology information.
67. **Distance-vector convergence cost:** Distance-vector protocols can converge more slowly because route changes must propagate hop by hop.
68. **Older-hardware context:** The historical resource cost of link-state protocols mattered more on older routers with very limited RAM and CPU.
69. **Modern-hardware note:** On modern routers, the extra RAM and CPU needed by link-state protocols are often far less significant.
70. **EIGRP nuance:** EIGRP is often described as an advanced distance-vector or hybrid protocol because it includes some features associated with link-state designs.

### Week 11 Big-Picture Takeaways

71. **Week 11 core static-routing idea:** Static routing is about manually and deliberately telling a router where remote networks live.
72. **Week 11 operational rule:** Static routing works best when the topology is known, stable, and simple enough to manage by hand.
73. **Week 11 backup-path idea:** Administrative distance makes it possible to keep a static route as a backup instead of the primary path.
74. **Week 11 transition idea:** Dynamic routing becomes important when a network grows large enough that manual route maintenance becomes inefficient.
75. **Week 11 comparison theme:** Static routing emphasizes control and simplicity, while dynamic routing emphasizes automatic learning and adaptability.
