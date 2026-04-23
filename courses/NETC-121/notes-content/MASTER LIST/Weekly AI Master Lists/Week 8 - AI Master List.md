# Week 8 - AI Master List

## Week Scope (from syllabus)
- Topics: Virtual Local Area Network (VLAN)
- Lab: SSH; VLANs
- Reading: Book 1, Chapter 3
- Videos: 16-17
- Notes folder: Lecture Week 8

Note: the current `Lecture Week 8` folder contains an `STP - Spanning Tree Protocol` note, but STP is listed in the syllabus under Week 9. To keep this master list faithful to the Week 8 syllabus, STP concepts are excluded here.

---

## Canonical Concepts (all concepts from Week 8 sources)

### SSH Lab Concepts (supplemental for the Week 8 lab)

1. **SSH definition:** SSH (Secure Shell) is a secure remote administration protocol used to access remote systems and network devices from another machine.
2. **SSH purpose in networking:** SSH is commonly used to manage routers, switches, and servers over the network from a command-line session.
3. **SSH as Telnet replacement:** SSH provides the same basic remote terminal capability as Telnet but adds encryption and stronger authentication.
4. **Telnet definition:** Telnet is a legacy terminal emulation protocol used for remote command-line access.
5. **Telnet weakness:** Telnet sends usernames, passwords, commands, and output in plaintext.
6. **Why plaintext is dangerous:** Anyone capturing traffic on the path can read Telnet credentials and commands directly.
7. **Why SSH matters in Week 8:** The syllabus lists `SSH` in the lab, so secure remote management is part of the operational skill set for this week.
8. **SSH authentication methods:** SSH supports password authentication and public key authentication.
9. **Telnet historical context:** Telnet dates back to 1969 and was designed before modern internet security was a priority.
10. **Telnet operational uses:** Telnet was historically used for remote server management, network device management, and simple port testing.
11. **Modern security guidance:** SSH should be used instead of Telnet for remote administration whenever possible.

### Switch and Ethernet Fundamentals (Book 1, Chapter 3)

12. **Hub definition:** A hub is a Layer 1 device that simply repeats incoming electrical signals out all other ports.
13. **Hub forwarding behavior:** A hub does not inspect frame contents and does not know or care about the intended destination.
14. **Switch definition:** A switch is a Layer 2 device that can inspect Ethernet headers and make forwarding decisions based on MAC addresses.
15. **Core reason switches matter:** Switches solve major performance and isolation problems that existed in hub-based shared Ethernet.
16. **Shared media Ethernet:** Early Ethernet used a shared medium, meaning all devices attached to the segment could see all transmitted traffic.
17. **Ethernet packet screening behavior:** Each device on a shared Ethernet segment checks the destination MAC address and keeps only frames intended for itself.
18. **Broadcast frame behavior:** If the destination MAC is `FF-FF-FF-FF-FF-FF`, all devices on the local segment accept the frame as a broadcast.
19. **Collision behavior:** If two devices transmit at the same time on shared media, a collision occurs and both transmissions become corrupted.
20. **Collision recovery:** After a collision, devices wait a random amount of time and then retransmit.
21. **Ethernet historical note:** Ethernet was invented in the late 1970s and became commercially available in 1980.
22. **Legacy competitors:** Ethernet eventually replaced older networking systems such as `ARCNET` and `Token Ring`.
23. **MAC address length:** A MAC address is 48 bits long.
24. **MAC address notation:** A MAC address is commonly written as six octets separated by hyphens.
25. **Example MAC address:** `21-76-3D-7A-F6-1E` is an example of valid MAC formatting.
26. **Why shared Ethernet scaled badly:** As more devices were added, collisions rose sharply and overall performance fell.
27. **Broadcast growth problem:** Larger Ethernet segments also produced more broadcast traffic, adding overhead and congestion.
28. **Security problem of shared media:** Because every device sees all traffic on the segment, privacy and security enforcement are weak on shared media.
29. **Why switches beat hubs:** A switch forwards traffic only where needed instead of sending it everywhere.

### Core Switch Operations

30. **Three basic switch functions:** The three core switch behaviors in the chapter are learning, forwarding, and flooding.
31. **Learning definition:** A switch learns by reading the source MAC address on an incoming frame.
32. **Learning result:** The switch associates that source MAC address with the specific port where the frame arrived.
33. **MAC address table:** Learned MAC-to-port mappings are stored in a MAC address table.
34. **Forwarding database synonym:** The MAC address table is also called a forwarding database.
35. **Why the MAC table matters:** The MAC table lets the switch know which port should receive future traffic for a given destination MAC.
36. **Known-destination forwarding:** If the destination MAC is already in the MAC table, the switch sends the frame only out the associated port.
37. **Example forwarding logic:** If a switch receives a frame on one port and knows the destination MAC is reachable through port 7, it forwards the frame only to port 7.
38. **Multiple MACs on one port:** One switch port can have multiple learned MAC addresses behind it if that port leads to another switch or a multi-device segment.
39. **Switch buffering:** Switches use memory buffers to hold complete frames temporarily before sending them out the destination port.
40. **Why buffers are needed:** A destination port may already be busy transmitting or receiving when a new frame arrives to be forwarded.
41. **Frame transparency:** A switch forwards an unchanged copy of the frame rather than rewriting it for normal Layer 2 forwarding.
42. **No tracing metadata added:** The switch does not add path-tracing data to the frame, so the endpoint cannot tell from the frame itself that a switch handled it.
43. **Layer 2 scope:** Normal switching decisions are based on MAC addresses, not IP addresses.
44. **Layer 3 visibility limitation:** Standard Layer 2 switching does not care about the IP packet carried inside the Ethernet payload.
45. **Advanced switch note:** Some advanced switches have Layer 3 features, but when using IP-aware logic they are functioning more like routers.
46. **Flooding definition:** If the destination MAC is unknown, the switch floods the frame out all ports except the ingress port.
47. **Why flooding is necessary:** Without a learned MAC entry, the switch has no way to identify the correct egress port.
48. **Flooding vs broadcasting:** Flooding is for an unknown unicast destination; broadcasting is traffic intentionally addressed to everyone.
49. **Why flooding often goes away:** Once the unknown host replies, the switch learns its MAC address and can forward future traffic directly.

### Collision Domains and Broadcast Domains

50. **Collision domain definition:** A collision domain is a segment of the network where collisions can occur.
51. **Hub collision domain behavior:** A hub-based segment keeps many devices inside one large collision domain.
52. **Switch collision domain behavior:** A switch divides the network into separate collision domains, typically one per active port link.
53. **Switch concurrency benefit:** Two different pairs of devices can often communicate at the same time through a switch without colliding because they use separate port paths.
54. **Why switch collision reduction is fundamental:** One of the defining functions of a switch is dividing collision domains.
55. **Switches do not make collisions impossible in every edge case:** In theory, collisions can still happen in certain timing scenarios, though switches greatly reduce the problem.
56. **Broadcast domain definition:** A broadcast domain is the set of devices that receive a Layer 2 broadcast frame.
57. **Default switch broadcast behavior:** A switch forwards broadcasts to all ports except the receiving port.
58. **Network-wide broadcast scope:** Multiple switches connected together can still form one large broadcast domain unless routers or VLANs segment it.
59. **Broadcast overhead problem:** Too much broadcast traffic consumes bandwidth and slows down useful traffic.
60. **ARP as a common broadcast source:** ARP requests are commonly broadcast because a host must ask who owns a given IP address and what MAC address goes with it.
61. **Reason broadcast reduction matters:** Reducing broadcast scope is an important way to improve performance on larger networks.

### Bridges, Media Conversion, Uplinks, and Switch Management

62. **Bridge definition:** A bridge is a MAC-forwarding device similar to a switch but usually with fewer ports, often just two.
63. **Bridge historical role:** Bridges were commonly used before inexpensive multiport switches became widespread.
64. **Switch as multiport bridge:** A modern switch is essentially a multiport bridge.
65. **Bridge media conversion role:** Bridges can connect different network media types, such as copper on one side and fiber on the other.
66. **Bridge speed adaptation role:** Bridges and switches can also connect links running at different speeds, such as `1 Gbps` hosts to `100 Mbps` printers.
67. **SFP definition:** `SFP` stands for small form-factor pluggable and refers to modular high-speed interface ports on some switches.
68. **SFP media flexibility:** SFP ports allow a switch to use different high-speed copper or fiber interfaces depending on the module inserted.
69. **Chapter SFP examples:** The chapter mentions `10 Gigabit Ethernet` over copper and `8 Gbps Fibre Channel` over fiber as examples of high-speed connectivity.
70. **Uplink definition:** An uplink is an inter-switch connection.
71. **Why uplinks need speed:** Uplink ports often carry aggregated traffic for many downstream hosts, so they are typically busier than ordinary access ports.
72. **Server-link speed logic:** High-speed ports are also useful for server connections because servers often handle more traffic than workstations.
73. **Managed switch definition:** A managed switch can be configured and monitored remotely.
74. **Managed switch interface:** Many managed switches offer a built-in web server or similar management interface.
75. **Managed switch addressing requirement:** A managed switch usually needs its own IP address for remote administration.
76. **Unmanaged switch definition:** An unmanaged switch is a simpler plug-and-play device with little or no remote configurability.
77. **Why managed switches matter for Week 8:** VLAN configuration is typically a managed-switch feature, so unmanaged switches are not sufficient for most VLAN labs.

### Router Fundamentals (Book 1, Chapter 3)

78. **Router definition:** A router is a Layer 3 device that forwards traffic based on IP addresses.
79. **Router Layer 3 role:** Routers operate at the network layer of the OSI model.
80. **Router necessity:** At least one router is usually required in a modern network environment.
81. **MAC-vs-IP distinction:** Switches primarily use MAC addresses, while routers make decisions using IP addresses.
82. **Subnet connectivity role:** Routers connect different IP networks or subnets together.
83. **Example subnet pairing:** The chapter uses a `10.0.100.x` subnet and a `192.168.0.x` subnet as an example of networks that need a router to communicate.
84. **Internet edge role:** A router is required to connect a private LAN to the public internet.
85. **Broadcast-boundary role:** Routers split broadcast domains, so Layer 2 broadcasts do not normally cross the router.
86. **Port-count difference:** Switches usually have many ports; routers often have fewer, though enterprise routers can scale much larger.
87. **Basic routed path logic:** A host sends traffic toward the router, the router examines the destination IP address, and then sends the packet toward the target subnet.
88. **MAC still matters in routed networks:** Even when routing by IP, local delivery on each segment still depends on MAC addresses for next-hop communication.

### NAT and VPN Concepts

89. **NAT definition:** Network Address Translation lets multiple private devices share one public IP address at the router.
90. **NAT sender substitution:** When an internal host sends traffic to the internet, the router substitutes its own public IP as the source seen by the outside world.
91. **NAT session tracking:** The router tracks which internal host originated the traffic so replies can be mapped back correctly.
92. **NAT return translation:** When response traffic returns, the router restores the correct internal destination address and forwards it to the original private host.
93. **VPN definition:** A virtual private network is an encrypted connection built across a public network such as the internet.
94. **VPN tunnel concept:** VPNs are often called tunnels because they create an isolated protected path through the internet.
95. **Remote-access VPN use case:** One common VPN use is giving remote workers secure access to the company network.
96. **Site-to-site VPN use case:** Another common VPN use is securely connecting offices in different cities over the internet.

### VLAN Fundamentals (Video 16 + Book 1, Chapter 3)

97. **VLAN definition:** A VLAN (Virtual Local Area Network) is a logical Layer 2 network built on shared physical switch infrastructure.
98. **Virtual not physical:** VLAN membership is logical, so devices can belong to the same VLAN even when physically located in different places.
99. **VLAN operating layer:** VLANs are a Layer 2 concept tied to switching behavior and MAC-based forwarding.
100. **VLAN-to-subnet relationship:** In practical design, each VLAN usually corresponds to a separate IP subnet.
101. **Why VLANs exist:** VLANs improve security, traffic management, organization, and scalability.
102. **Broadcast-domain reduction:** VLANs split one large broadcast domain into smaller broadcast domains.
103. **Department segmentation example:** Different departments such as accounting, shipping, and support can be isolated even if they share the same switch.
104. **Same-cabling advantage:** VLANs let multiple departments share the same switch and cabling while keeping their traffic separated.
105. **Why VLANs are easier than physical redesign:** VLANs avoid the need to physically move devices or deploy extra hardware just to separate traffic.
106. **VLAN-capable switch requirement:** VLANs require a switch that supports VLAN configuration.
107. **VLAN creation method:** VLAN separation is created by assigning specific switch ports to specific VLANs.
108. **Port-membership result:** Devices plugged into those ports become members of that VLAN.
109. **Within-VLAN forwarding:** Traffic within the same VLAN is forwarded normally, as if that VLAN were its own separate switch.
110. **Within-VLAN flooding scope:** Unknown unicast flooding stays within the same VLAN.
111. **Within-VLAN broadcast scope:** Broadcast traffic also stays within the same VLAN.
112. **Inter-VLAN routing requirement:** Traffic moving from one VLAN to another requires routing by a router or Layer 3 switch.
113. **VLAN1 default:** By default, most switch ports start out in `VLAN1`.
114. **Access port definition:** An access port carries traffic for only one VLAN.
115. **Manual VLAN administration:** You generally create VLANs manually and assign switch ports to them intentionally.
116. **Cross-switch VLAN design:** The same VLAN can exist across multiple switches if the inter-switch links preserve VLAN membership.

### Trunking and 802.1Q (Video 17 + Book 1, Chapter 3)

117. **Trunking definition:** Trunking allows traffic for multiple VLANs to move across one physical link.
118. **Tagging terminology:** Cisco often says trunking, while many other vendors describe the same behavior as tagging.
119. **Why trunking matters:** Without trunking, VLANs would be limited to one device and would not scale across a multi-switch network.
120. **Trunk purpose in expansion:** Trunks allow logically separate VLANs to extend from one switch to another switch or to other VLAN-aware devices.
121. **802.1Q standard:** IEEE `802.1Q` is the industry standard method for identifying VLAN traffic on trunk links.
122. **802.1Q conceptual behavior:** As traffic leaves one VLAN-aware device over a trunk, the frame is marked so the next device knows which VLAN it belongs to.
123. **Need for VLAN-aware devices:** Devices that participate in tagged trunk traffic must understand `802.1Q`; otherwise they will not process the tagged frames properly.
124. **ISL definition:** `ISL` (Inter-Switch Link) was Cisco's older proprietary trunking method.
125. **ISL status:** `ISL` has effectively been replaced by `802.1Q` in modern cross-vendor networks.
126. **Trunk device types:** Trunks are commonly used between switches, between switches and routers, and between switches and virtualization servers.
127. **Router-on-a-stick definition:** Router-on-a-stick is a design where one physical router interface uses multiple subinterfaces over an `802.1Q` trunk to route between VLANs.
128. **Server trunk use case:** A virtualization server can carry multiple VLANs on one NIC when the switch link is configured for `802.1Q`.
129. **Voice VLAN/phone behavior:** IP phones can understand tagged voice traffic while also passing ordinary untagged data traffic for an attached PC.
130. **Trunk port definition:** A trunk port carries traffic for more than one VLAN.

### Cisco VLAN Control Protocols and Security

131. **VTP full meaning:** `VTP` stands for VLAN Trunking Protocol.
132. **VTP actual role:** VTP is not the actual trunking mechanism; it replicates VLAN information between Cisco switches over trunk links.
133. **VTP benefit:** VTP can reduce the need to manually create the same VLANs on every switch.
134. **VTP limitation:** VTP does not assign access ports to VLANs for you.
135. **DTP full meaning:** `DTP` stands for Dynamic Trunking Protocol.
136. **DTP role:** DTP negotiates whether a Cisco switch link should become a trunk.
137. **DTP auto mode:** `Auto` waits passively and does not actively try to form a trunk.
138. **DTP desirable mode:** `Desirable` actively tries to negotiate trunk formation.
139. **DTP negotiation outcome 1:** `Auto + Auto` does not form a trunk.
140. **DTP negotiation outcome 2:** `Desirable + Auto` forms a trunk.
141. **DTP negotiation outcome 3:** `Desirable + Desirable` forms a trunk.
142. **Hardcoded trunk nuance:** A manually configured trunk on one side may still send DTP messages to compatible Cisco equipment.
143. **Security risk of auto-negotiation:** Dynamic trunk negotiation can be abused by unauthorized devices to form trunks they should not have.
144. **VLAN hopping attack:** VLAN hopping is an attack where an unauthorized device gains access to multiple VLANs by abusing trunk behavior.
145. **Best practice for switchport mode:** Explicitly set access ports as access and trunk ports as trunk instead of relying on automatic negotiation.
146. **Operational security principle:** Intentional manual port configuration reduces ambiguity and lowers the risk of unintended trunk formation.

---

## Sources Used (Week 8)
- `Notes List A - Video Content/Video 16 - VLANs Made Easy/Transcript.md`
- `Notes List A - Video Content/Video 17 - Trunking and 802.1Q/Transcript.md`
- `Notes List B - Textbook Content/Textbook 1 - Chapter 3 Switches, Routers, and VLANs/Book 1 Chapter 3 - Switches, Routers, and VLANs.md`
- `Notes List A - Video Content/Video 10 - Telnet and SSH/Transcript.md` (used only to cover the Week 8 `SSH` lab item from the syllabus)

## Excluded Due to Syllabus Mismatch
- `Notes List C - Personal Notes/Lecture Week 8/STP - Spanning Tree Protocol.md`
  This note appears to align with Week 9 (`Spanning Tree Protocol`) rather than the Week 8 syllabus row.
