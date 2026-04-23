# Week 13 - AI Master List

## Week Scope (from syllabus)
- Topics: Routing protocols - EIGRP, OSPF
- Lab: EIGRP, OSPF
- Reading: none listed
- Videos: 26-27
- Notes folder: Lecture Week 13

Sources included for this master list:

- `Notes List A - Video Content/Video 26 - Layer 2 vs Layer 3 Switches/Transcript.md`
- `Notes List A - Video Content/Video 27 - Micronugget What is Route Redistribution/Transcript.md`
- `Notes List C - Alex's Personal Notes/Lecture Week 13/Lecture Week 13.md`

Note: The Week 13 syllabus does not list a textbook reading assignment, so this master list is limited to the Week 13 videos and lecture notes.

Note: Week 13 focuses on Layer 3 switching, route redistribution, EIGRP, and OSPF. RIP, static routing, and BGP appear only as comparison context.

---

## Canonical Concepts (Week 13 sourced scope)

### Week 13 Big Picture

1. **Week 13 routing theme:** Week 13 moves from basic routing into more advanced routing behavior.
2. **Main topics:** The Week 13 scope includes Layer 3 switches, inter-VLAN routing, redistributed routes, EIGRP, and OSPF.
3. **Routing location reminder:** Routing is not only done by standalone routers.
4. **Layer 3 switch role:** A Layer 3 switch can switch traffic at Layer 2 and route traffic at Layer 3.
5. **Campus-network fit:** Layer 3 switches are useful in campus and lab networks because they can route between VLANs quickly inside the LAN.
6. **Lab device note:** The Week 13 lecture notes identify the Cisco Catalyst 3650 in the lab as a Layer 3 switch.
7. **Week 13 protocol focus:** EIGRP and OSPF are the main routing protocols for the week.
8. **Redistribution connection:** Redistribution matters when routes must move between different routing sources or protocols.

### Layer 2 Switching

9. **Layer 2 switch definition:** A Layer 2 switch forwards Ethernet frames using MAC addresses.
10. **OSI layer:** Layer 2 is the Data Link layer.
11. **Layer 2 address type:** Layer 2 switching mainly uses MAC addresses.
12. **Switch learning behavior:** A switch learns source MAC addresses from incoming frames.
13. **MAC address table:** The switch stores learned MAC addresses in a MAC address table.
14. **Forwarding decision:** When a frame arrives, the switch checks the destination MAC address.
15. **Known-destination forwarding:** If the destination MAC is known, the switch forwards the frame out the associated port.
16. **Layer 2 scope:** Layer 2 switches forward traffic within the same LAN or VLAN.
17. **Broadcast-domain limit:** A Layer 2 switch does not route traffic between different VLANs or IP subnets by itself.
18. **Common use:** Layer 2 switches are common in homes, small businesses, medium-sized businesses, and access-layer networks.
19. **Layer 2 benefit:** Layer 2 switches are fast, relatively inexpensive, and simple for basic switching.

### Layer 3 Switching

20. **Layer 3 switch definition:** A Layer 3 switch can route packets using IP addresses while also switching frames using MAC addresses.
21. **Alternate name:** A Layer 3 switch is also called a multilayer switch.
22. **OSI layer:** Layer 3 is the Network layer.
23. **Layer 3 address type:** Layer 3 routing mainly uses IP addresses.
24. **Combined role:** A Layer 3 switch combines Layer 2 switching and Layer 3 routing in one device.
25. **Layer 3 switch advantage:** Layer 3 switches are often used for fast routing inside a LAN or campus network.
26. **Router comparison:** Routers and Layer 3 switches both route packets, but routers usually have broader WAN, internet edge, firewall, VPN, NAT, and advanced routing roles.
27. **Best-fit distinction:** Layer 3 switches are usually best for internal LAN routing, while routers are usually best for WAN and internet-edge routing.
28. **Configuration complexity:** Layer 3 switches require more configuration than basic Layer 2 switches.
29. **Routing table requirement:** A Layer 3 device needs a routing table to decide where to send packets.

### VLANs and Inter-VLAN Routing

30. **VLAN definition:** A VLAN is a Virtual Local Area Network.
31. **VLAN purpose:** VLANs divide a switched network into separate broadcast domains.
32. **Subnet relationship:** Each VLAN often has its own IP subnet.
33. **Example VLAN 10:** VLAN 10 might use subnet `192.168.10.0/24`.
34. **Example VLAN 20:** VLAN 20 might use subnet `192.168.20.0/24`.
35. **Same-VLAN traffic:** Devices in the same VLAN can usually communicate through Layer 2 switching.
36. **Different-VLAN traffic:** Devices in different VLANs usually need a Layer 3 device to communicate.
37. **Inter-VLAN routing definition:** Inter-VLAN routing means routing traffic between different VLANs.
38. **Layer 3 switch fit:** A Layer 3 switch can route between VLANs directly inside the switching infrastructure.
39. **Router-on-a-stick comparison:** A Layer 3 switch can avoid sending every inter-VLAN packet to a separate physical router.
40. **Default gateway role:** Hosts send traffic for remote subnets to their default gateway.
41. **Layer 3 switch gateway role:** On a Layer 3 switch, the default gateway for a VLAN is often an SVI.

### Enabling Layer 3 Switching

42. **Routing command:** On many Cisco switches, routing is enabled with `ip routing`.
43. **`ip routing` meaning:** The `ip routing` command tells the switch to behave as a Layer 3 device and maintain a routing table.
44. **Without `ip routing`:** A switch may still have IP addresses for management but not route packets between networks.
45. **Troubleshooting check:** If inter-VLAN routing fails on a Layer 3 switch, verify that `ip routing` is present.
46. **Interface status check:** Use `show ip interface brief` to check whether interfaces and SVIs are up/up.
47. **VLAN check:** Use `show vlan brief` to confirm that expected VLANs exist.
48. **Routing table check:** Use `show ip route` to confirm that the switch has routes.

### SVIs and Routed Ports

49. **SVI definition:** An SVI is a Switched Virtual Interface.
50. **SVI purpose:** An SVI gives the switch a Layer 3 IP address for a VLAN.
51. **SVI gateway role:** An SVI usually acts as the default gateway for devices in that VLAN.
52. **SVI example:** `interface vlan 10` with IP address `192.168.10.1 255.255.255.0` creates a gateway for VLAN 10.
53. **Host gateway example:** Hosts in VLAN 10 can use `192.168.10.1` as their default gateway.
54. **SVI up condition:** An SVI usually comes up only if the VLAN exists and at least one active port in that VLAN is up, or a trunk carrying that VLAN is up.
55. **Routed-port definition:** A routed port behaves more like a router interface than a switch access port.
56. **Routed-port command:** `no switchport` changes a switch port into a routed interface on capable switches.
57. **Routed-port use case:** Use a routed port for point-to-point Layer 3 links to another router or Layer 3 switch.
58. **SVI use case:** Use an SVI when routing for an entire VLAN.
59. **Routed-port example:** `interface gigabitEthernet 1/0/1`, `no switchport`, and an IP address create a routed switch port.

### Inter-VLAN Packet Flow

60. **Remote-subnet decision:** A host compares the destination IP address to its own subnet.
61. **Gateway forwarding:** If the destination is remote, the host sends the frame to its default gateway.
62. **VLAN 10 example source:** A PC in VLAN 10 might be `192.168.10.50/24` with gateway `192.168.10.1`.
63. **VLAN 20 example destination:** A PC in VLAN 20 might be `192.168.20.50/24` with gateway `192.168.20.1`.
64. **Layer 3 switch receive step:** The Layer 3 switch receives the frame on the source VLAN.
65. **Routing step:** The switch routes the packet toward the destination VLAN using its routing table.
66. **Forwarding step:** The switch forwards the packet out the destination VLAN.
67. **Key takeaway:** Inter-VLAN routing on a Layer 3 switch works like router forwarding, but happens inside the switch.

### Route Redistribution Foundations

68. **Redistribution definition:** Route redistribution means taking routes learned from one routing source or protocol and advertising them into another.
69. **Redistribution purpose:** Redistribution lets different routing systems share reachability information.
70. **Common redistribution examples:** EIGRP into OSPF, OSPF into EIGRP, static into a dynamic protocol, and connected into a dynamic protocol.
71. **Routing-source variety:** Routes may come from connected networks, static routes, or dynamic routing protocols.
72. **Mixed-protocol problem:** One part of a network may use EIGRP while another uses OSPF.
73. **Physical connection limit:** Physical connectivity alone is not enough if routers lack routing-table information.
74. **Translation idea:** A redistributing router acts like a translator between routing domains.
75. **Dual-protocol router:** A redistributing router often runs both protocols so it can learn routes from each side.
76. **EIGRP-to-OSPF example:** A router can learn EIGRP routes and advertise them into OSPF.
77. **OSPF-to-EIGRP example:** A router can learn OSPF routes and advertise them into EIGRP.
78. **Static redistribution example:** A static route can be redistributed into OSPF so OSPF routers learn it.
79. **Connected redistribution example:** Connected routes can be redistributed into a dynamic protocol.

### Mutual Redistribution and Risks

80. **Mutual redistribution definition:** Mutual redistribution means redistributing routes in both directions.
81. **One-way redistribution:** One-way redistribution shares routes from one protocol into another but not back the other way.
82. **Two-way reachability:** Mutual redistribution is useful when both routing domains need to reach each other.
83. **Metric problem:** Different routing protocols use different metrics, so redistributed routes may need a metric the receiving protocol understands.
84. **RIP metric:** RIP uses hop count.
85. **EIGRP metric:** EIGRP commonly uses bandwidth and delay by default.
86. **OSPF metric:** OSPF uses cost based mainly on bandwidth.
87. **Redistribution risk:** Redistribution can create routing loops.
88. **Duplicate-route risk:** Redistribution can create duplicate or competing routes.
89. **Bad-metric risk:** Missing or bad metrics can make redistributed routes unusable or undesirable.
90. **Over-advertising risk:** Redistribution can advertise too many routes or advertise routes too broadly.
91. **Instability risk:** An unstable route in one protocol can affect another protocol after redistribution.
92. **Control tools:** Real networks often control redistribution with route maps, prefix lists, distribute lists, metrics, tags, and filtering.
93. **Intro-class takeaway:** For Week 13, the key point is that redistribution shares routes between routing systems but must be handled carefully.

### Dynamic Routing Review

94. **Dynamic-routing definition:** Dynamic routing protocols let routers share route information automatically.
95. **Learning process:** Routers learn remote networks, next hops, and route information before traffic arrives.
96. **Forwarding process:** Routers forward packets by checking the destination IP address against the routing table.
97. **Static-route contrast:** Static routes are manually configured route instructions.
98. **Static-route advantage:** Static routes are simple and predictable.
99. **Static-route scaling problem:** Static routing becomes difficult with many routers, many routes, or frequent topology changes.
100. **Dynamic-routing advantage:** Dynamic routing reduces the need to manually configure every remote route on every router.
101. **Topology-change advantage:** Dynamic routing protocols can react when routes fail or change.
102. **Neighbor sharing:** Dynamic routing protocols advertise route information to neighboring routers.

### EIGRP Foundations

103. **EIGRP full name:** EIGRP stands for Enhanced Interior Gateway Routing Protocol.
104. **EIGRP association:** EIGRP is commonly associated with Cisco environments.
105. **EIGRP protocol type:** EIGRP is often described as an advanced distance-vector or hybrid protocol.
106. **EIGRP classless support:** EIGRP supports VLSM and CIDR.
107. **EIGRP neighbors:** EIGRP routers form neighbor relationships before exchanging routing information.
108. **Triggered updates:** EIGRP sends updates when changes happen rather than constantly sending full-table updates like older distance-vector protocols.
109. **RIP comparison:** EIGRP converges much faster than RIP.
110. **Metric basis:** EIGRP commonly uses bandwidth and delay as its main default metric components.
111. **Bandwidth metric idea:** The slowest link along the path matters.
112. **Delay metric idea:** Delay is accumulated along the path.
113. **Better-than-hop-count idea:** EIGRP can prefer a path with more hops if it has better bandwidth and delay than a shorter but worse path.
114. **EIGRP AS number:** Basic EIGRP configuration uses an autonomous system number.
115. **AS matching rule:** EIGRP routers generally need matching AS numbers to become neighbors.
116. **Connectivity requirement:** EIGRP neighbor formation requires working Layer 1, Layer 2, and Layer 3 connectivity.
117. **Subnet requirement:** EIGRP neighbors generally need interfaces in the same subnet.

### EIGRP Configuration and Verification

118. **Basic EIGRP start command:** `router eigrp 1` starts EIGRP process/AS `1`.
119. **EIGRP network command:** `network <network-address>` enables EIGRP on matching interfaces.
120. **EIGRP example network:** `network 192.168.1.0` enables EIGRP on matching `192.168.1.x` interfaces depending on classful or wildcard behavior in the lab context.
121. **Wildcard EIGRP example:** `network 10.10.0.0 0.0.255.255` matches interfaces in the `10.10.x.x` range.
122. **EIGRP internal route code:** In `show ip route`, internal EIGRP routes commonly appear with `D`.
123. **EIGRP external route code:** External EIGRP routes can appear as `D EX`.
124. **External EIGRP meaning:** An external EIGRP route came from outside EIGRP and was redistributed into EIGRP.
125. **Neighbor command:** `show ip eigrp neighbors` checks EIGRP neighbor relationships.
126. **EIGRP route command:** `show ip route eigrp` checks EIGRP routes in the routing table.
127. **Protocol command:** `show ip protocols` shows routing protocol configuration and advertised networks.
128. **Config command:** `show running-config` verifies EIGRP configuration.
129. **Interface command:** `show ip interface brief` checks whether interfaces are up/up.

### OSPF Foundations

130. **OSPF full name:** OSPF stands for Open Shortest Path First.
131. **OSPF protocol type:** OSPF is a link-state routing protocol.
132. **OSPF standards status:** OSPF is an open standard supported by many vendors.
133. **OSPF scale:** OSPF is common in larger networks.
134. **OSPF metric:** OSPF uses cost as its metric.
135. **Cost basis:** OSPF cost is based mainly on bandwidth.
136. **Cost preference:** Lower OSPF cost is preferred over higher OSPF cost.
137. **Topology map idea:** OSPF keeps network topology information in memory.
138. **Link-state database:** OSPF routers build a link-state database from received topology information.
139. **Best-path calculation:** Each router calculates best paths from its link-state database.
140. **RIP comparison:** RIP asks how many routers away a destination is; OSPF evaluates topology cost.

### OSPF Neighbors, LSAs, and Areas

141. **OSPF hello packets:** OSPF routers use hello packets to discover and maintain neighbors.
142. **LSA meaning:** LSA stands for Link-State Advertisement.
143. **LSA purpose:** LSAs describe topology information such as links, networks, costs, and reachable routers.
144. **LSA exchange:** OSPF neighbors exchange LSAs.
145. **Area purpose:** OSPF uses areas to scale the network.
146. **Area benefit:** Areas reduce how much topology detail every router must track.
147. **Backbone area:** Area `0` is the OSPF backbone area.
148. **Area connection rule:** Other OSPF areas should connect to Area `0`.
149. **ABR definition:** An Area Border Router, or ABR, has interfaces in multiple OSPF areas.
150. **ABR example:** A router with one interface in Area 0 and another in Area 1 connects Area 1 to the backbone.
151. **OSPF summarization note:** OSPF does not use old classful auto-summarization behavior.
152. **Classless design:** OSPF is classless and understands subnet masks.
153. **Manual summarization:** OSPF summarization can be configured at proper boundary points such as ABRs.
154. **Auto-summary warning:** Blind classful auto-summary is not desirable in modern VLSM networks.

### OSPF Configuration and Wildcard Masks

155. **Basic OSPF start command:** `router ospf 1` starts OSPF process ID `1`.
156. **OSPF process ID scope:** The OSPF process ID is locally significant and does not have to match on every router.
157. **OSPF network command:** OSPF network statements identify matching interfaces and assign them to an area.
158. **OSPF example command:** `network 192.168.1.0 0.0.0.255 area 1` enables OSPF on matching `192.168.1.x` interfaces in Area 1.
159. **Large network example:** `network 10.0.0.0 0.255.255.255 area 1` matches `10.x.x.x` interfaces in Area 1.
160. **Wildcard mask definition:** A wildcard mask is an inverse subnet mask.
161. **Wildcard zero meaning:** In a wildcard mask, `0` means the bit or octet must match.
162. **Wildcard 255 meaning:** In a wildcard mask, `255` means do not care in that octet.
163. **`/24` wildcard:** Subnet mask `255.255.255.0` corresponds to wildcard mask `0.0.0.255`.
164. **`/16` wildcard:** Subnet mask `255.255.0.0` corresponds to wildcard mask `0.0.255.255`.
165. **`/8` wildcard:** Subnet mask `255.0.0.0` corresponds to wildcard mask `0.255.255.255`.
166. **`/30` wildcard:** Subnet mask `255.255.255.252` corresponds to wildcard mask `0.0.0.3`.
167. **OSPF route code:** In `show ip route`, OSPF routes appear with `O`.
168. **OSPF AD example:** In an OSPF route like `[110/2]`, `110` is the administrative distance and `2` is the cost.

### OSPF Verification

169. **OSPF neighbor command:** `show ip ospf neighbor` checks OSPF neighbor relationships.
170. **OSPF route command:** `show ip route ospf` checks OSPF-learned routes.
171. **Routing table command:** `show ip route` shows all installed routes.
172. **Protocol verification:** `show ip protocols` checks OSPF process information and advertised networks.
173. **Configuration verification:** `show running-config` checks the actual OSPF configuration.
174. **Interface verification:** `show ip interface brief` confirms interfaces are operational.
175. **OSPF troubleshooting focus:** Check interface status, neighbor formation, correct areas, correct wildcard masks, and OSPF routes.

### EIGRP vs OSPF

176. **Protocol type comparison:** EIGRP is advanced distance vector; OSPF is link state.
177. **Metric comparison:** EIGRP commonly uses bandwidth and delay; OSPF uses cost based mainly on bandwidth.
178. **Standards comparison:** EIGRP is Cisco-focused; OSPF is an open standard.
179. **Neighbor comparison:** Both EIGRP and OSPF use neighbor relationships.
180. **Scaling comparison:** OSPF scales with areas and Area 0; EIGRP does not use OSPF-style areas.
181. **Routing table code comparison:** EIGRP appears as `D`; OSPF appears as `O`.
182. **Administrative distance comparison:** Internal EIGRP commonly has AD `90`; OSPF commonly has AD `110`.
183. **Configuration comparison:** EIGRP is usually easier to configure in basic labs.
184. **Enterprise comparison:** OSPF is common as a standards-based enterprise protocol.
185. **EIGRP matching requirement:** EIGRP AS numbers must match for routers to become neighbors.
186. **OSPF matching idea:** OSPF process IDs do not need to match, but area settings and neighbor parameters must be compatible.

### Administrative Distance

187. **Administrative distance definition:** Administrative distance decides which routing source is trusted when the same destination is learned from multiple sources.
188. **AD preference rule:** Lower administrative distance is preferred.
189. **Connected AD:** Connected routes have administrative distance `0`.
190. **Static AD:** Static routes have administrative distance `1`.
191. **Internal EIGRP AD:** Internal EIGRP commonly has administrative distance `90`.
192. **OSPF AD:** OSPF commonly has administrative distance `110`.
193. **RIP AD:** RIP commonly has administrative distance `120`.
194. **External EIGRP AD:** External EIGRP commonly has administrative distance `170`.
195. **AD example:** If a router learns the same network from EIGRP with AD `90` and OSPF with AD `110`, it installs the EIGRP route.
196. **Redistribution relationship:** Redistributed EIGRP routes may appear as external EIGRP routes with a different administrative distance.

### Week 13 Lab Troubleshooting Checklist

197. **First check:** Use `show ip interface brief` to verify physical and logical interface status.
198. **Layer 3 switch check:** Use `show running-config` to confirm `ip routing` is enabled.
199. **VLAN check:** Use `show vlan brief` to verify VLANs.
200. **EIGRP neighbor check:** Use `show ip eigrp neighbors`.
201. **OSPF neighbor check:** Use `show ip ospf neighbor`.
202. **Routing table check:** Use `show ip route`.
203. **Protocol check:** Use `show ip protocols`.
204. **Configuration check:** Use `show running-config`.
205. **Connectivity tests:** Use `ping <destination>` and `traceroute <destination>`.
206. **EIGRP troubleshooting question:** Are all routers using the same EIGRP AS number?
207. **OSPF troubleshooting question:** Are interfaces in the correct OSPF area?
208. **Wildcard troubleshooting question:** Are wildcard masks correct in OSPF network statements?
209. **SVI troubleshooting question:** Are the VLANs present and are the SVIs up/up?
210. **Gateway troubleshooting question:** Do hosts use the correct SVI IP address as their default gateway?

### Week 13 Big-Picture Takeaways

211. **Layer 3 switch takeaway:** A Layer 3 switch can switch frames and route packets.
212. **`ip routing` takeaway:** `ip routing` enables Layer 3 routing behavior on a capable switch.
213. **SVI takeaway:** An SVI gives a VLAN a Layer 3 gateway.
214. **Inter-VLAN takeaway:** Devices in different VLANs need Layer 3 routing to communicate.
215. **Redistribution takeaway:** Redistributed routes are routes moved from one routing source or protocol into another.
216. **Redistribution caution:** Redistribution is useful but can cause loops, bad metrics, and route-control problems if configured carelessly.
217. **EIGRP takeaway:** EIGRP is Cisco-focused, uses neighbor relationships, and commonly uses bandwidth and delay.
218. **EIGRP lab takeaway:** EIGRP neighbors usually need matching AS numbers and working connectivity.
219. **OSPF takeaway:** OSPF is a standards-based link-state protocol that uses LSAs and a link-state database.
220. **OSPF area takeaway:** OSPF Area 0 is the backbone area.
221. **OSPF lab takeaway:** OSPF uses wildcard masks in network statements, and area configuration matters.
222. **Route-code takeaway:** EIGRP usually appears as `D`; OSPF appears as `O`.
223. **AD takeaway:** When the same destination is learned from multiple routing sources, the route with the lower administrative distance wins.
224. **Week 13 study priority:** Be ready to explain Layer 3 switching, configure and verify SVIs, compare EIGRP and OSPF, interpret routing table codes, and explain why route redistribution is needed.
