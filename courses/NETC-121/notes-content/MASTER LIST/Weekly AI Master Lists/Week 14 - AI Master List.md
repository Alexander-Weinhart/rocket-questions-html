# Week 14 - AI Master List

## Week Scope (from syllabus)
- Topics: Router troubleshooting, Layer 3 switches
- Lab: EIGRP, Router troubleshooting, Layer 3 switches
- Reading: none listed
- Videos: 46
- Notes folder: Lecture Week 14

Sources included for this master list:

- `Notes List A - Video Content/Video 46 - Free CCNA Wireless Fundamentals Day 55 CCNA 200-301 Complete Course/Free CCNA Wireless Fundamentals Day 55 CCNA 200-301 Complete Course.md`
- `Notes List C - Alex's Personal Notes/Lecture Week 14/Lecture Week 14.md`

Note: The Week 14 syllabus does not list a textbook reading assignment, so this master list is limited to the Week 14 video and lecture note.

Note: The lecture note explicitly says this week's lecture is not on the exam. It still belongs in the Week 14 master list because it is part of the course week's note scope, but it should be treated as course-week context rather than core exam-target material.

Note: Even though the syllabus topic line mentions router troubleshooting and Layer 3 switches, the available Week 14 note sources are mainly a wireless-fundamentals overview. This master list stays faithful to the actual Week 14 sources instead of inventing missing troubleshooting coverage.

---

## Canonical Concepts (Week 14 sourced scope)

### Week 14 Big Picture

1. **Week 14 wireless theme:** Week 14 is a broad overview of wireless networking fundamentals.
2. **Core contrast:** Wireless networking uses radio signals instead of copper or fiber cabling.
3. **Mobility benefit:** Wireless networking allows devices to move without staying physically attached to a cable.
4. **Wireless tradeoff:** Mobility comes with signal, interference, and security problems that wired LANs do not face in the same way.
5. **Source-scope reminder:** The Week 14 video and lecture notes focus much more on wireless LAN foundations than on router-troubleshooting procedures.
6. **Exam-scope reminder:** The lecture note says this week's lecture is not on the exam, even though it still appears in the course material.
7. **Main WLAN standard:** Modern Wi-Fi networks are based on IEEE 802.11 standards.
8. **Common-name distinction:** `Wi-Fi` is the common industry term, while `802.11` is the technical standards family.

### Why Wireless Differs from Wired LANs

9. **Medium difference:** Wired LANs carry signals inside a cable, but wireless LANs send signals through the air.
10. **Coverage reality:** Any device within radio range may be able to receive a wireless transmission.
11. **Privacy consequence:** Wireless networking has a larger privacy risk because the signal is not confined to a physical cable.
12. **Interference risk:** Wireless devices are more vulnerable to interference from nearby devices and competing networks.
13. **Collision-avoidance need:** Wireless networking needs collision-avoidance behavior because many nearby devices may share the same medium.
14. **Signal-loss problem:** Walls, distance, and physical objects can weaken or distort wireless signals.
15. **Security takeaway:** Wireless traffic inside the LAN should be encrypted because nearby devices may be able to observe transmissions.
16. **Wired contrast:** In a switched wired LAN, collisions are usually avoided and traffic is more physically contained.
17. **Duplex contrast:** Full-duplex communication is normal in modern wired Ethernet, but wireless communication has more shared-medium limitations.

### Wireless Networking Terms

18. **SSID meaning:** `SSID` stands for `Service Set Identifier`.
19. **SSID practical meaning:** The SSID is the Wi-Fi network name that users see when selecting a wireless network.
20. **AP meaning:** `AP` stands for `Access Point`.
21. **AP role:** The AP provides wireless access into a wired or routed network.
22. **WNIC meaning:** `WNIC` stands for `Wireless Network Interface Card`.
23. **WNIC role:** A WNIC is the wireless adapter in a laptop, phone, or other client device.
24. **Associate definition:** To associate means a client joins an access point at Layer 2.
25. **Probe definition:** A probe is a wireless request used during scanning and network discovery.
26. **WLAN meaning:** `WLAN` stands for `Wireless Local Area Network`.
27. **BSSID meaning:** `BSSID` is the unique identifier of an AP radio, commonly its radio MAC address.
28. **BSA meaning:** `BSA` stands for `Basic Service Area`, which is the physical coverage area of one AP's signal.
29. **DS meaning:** `DS` stands for `Distribution System`, the wired side that connects the wireless LAN into the rest of the network.

### SSIDs and Network Identification

30. **SSID purpose:** The SSID helps clients identify which wireless network they want to join.
31. **Broadcast SSID:** A broadcast SSID appears in the client's visible list of nearby Wi-Fi networks.
32. **Hidden SSID idea:** An SSID can be hidden from normal browsing lists.
33. **Hidden-SSID warning:** Hiding an SSID is not real security.
34. **Obscurity warning:** SSID hiding is security through obscurity rather than real protection.
35. **Encryption priority:** WPA2 or WPA3 encryption matters far more than whether the SSID is hidden.
36. **Uniqueness best practice:** An SSID does not have to be globally unique, but unique naming helps users pick the right network.
37. **ESS naming rule:** In an extended service set, multiple APs often use the same SSID so clients can roam.

### Access Points and Their Role

38. **AP bridging role:** An AP bridges wireless clients into the wired network.
39. **AP service role:** An AP sends and receives wireless frames for associated clients.
40. **AP management role:** An AP can broadcast one or more SSIDs.
41. **AP security role:** An AP enforces wireless security settings such as authentication and encryption choices.
42. **Home-network reality:** In many home networks, the AP is built into the same device as the router, switch, firewall, and DHCP server.
43. **Enterprise-network reality:** In business or campus networks, APs are often separate devices mounted on ceilings or walls.
44. **Backhaul connection:** Enterprise APs usually connect back to switches through Ethernet.
45. **Power method:** Many APs receive power through `PoE`, or `Power over Ethernet`.
46. **Central-device role:** In an infrastructure WLAN, the AP is the central device of the wireless cell.

### Association and Client Join Flow

47. **Association overview:** Association is the process of a wireless client joining an AP.
48. **Step 1:** The client scans for nearby wireless networks.
49. **Step 2:** The client chooses an SSID.
50. **Step 3:** The client authenticates if the network requires authentication.
51. **Step 4:** The client associates with the AP.
52. **Step 5:** The client often receives IP settings through DHCP after association.
53. **Step 6:** After association and IP configuration, the client can communicate on the network.
54. **Layer distinction:** Association is mainly a Layer 2 wireless process.
55. **IP follow-up:** Getting an IP address is a later Layer 3 configuration step.
56. **Gateway dependency:** Even after association succeeds, a client still needs proper Layer 3 settings such as an IP address, mask, and gateway for routed communication.

### Probes, Scanning, and Discovery

57. **Passive scanning:** In passive scanning, the client listens for beacon frames from APs.
58. **Active scanning:** In active scanning, the client sends probe requests looking for networks.
59. **General probe use:** Probe requests can ask what networks are nearby.
60. **Specific probe use:** Probe requests can ask whether a specific known network is nearby.
61. **Privacy concern:** Probe behavior can reveal names of previously joined networks.
62. **Modern-device note:** Modern operating systems try to reduce this information leakage, but the concept still matters.
63. **Beacon connection:** Beacons help passive clients discover WLANs without transmitting first.

### CSMA/CA and Shared-Medium Access

64. **Wireless access method:** Wireless LANs use `CSMA/CA`.
65. **Full name:** `CSMA/CA` stands for `Carrier Sense Multiple Access with Collision Avoidance`.
66. **Wired contrast:** `CSMA/CA` differs from `CSMA/CD`, which was used in older wired Ethernet environments.
67. **Carrier-sense step:** A device listens to check whether the wireless channel is busy.
68. **Busy-channel response:** If the channel is busy, the device waits a random amount of time.
69. **Retry step:** After waiting, the device listens again.
70. **Transmit step:** When the channel is free, the device transmits.
71. **Main goal:** The goal of CSMA/CA is to reduce collisions before they happen.
72. **Shared-medium reason:** This behavior matters because many wireless devices may compete for the same airspace.

### Radio Frequency Basics

73. **Signal type:** Wireless communication uses electromagnetic waves.
74. **Antenna idea:** When alternating current is applied to an antenna, electromagnetic energy propagates outward as waves.
75. **Amplitude meaning:** `Amplitude` is the strength of the wave.
76. **Frequency meaning:** `Frequency` is the number of cycles per second.
77. **Unit of frequency:** Frequency is measured in `hertz` (`Hz`).
78. **`kHz` meaning:** `kHz` means thousands of cycles per second.
79. **`MHz` meaning:** `MHz` means millions of cycles per second.
80. **`GHz` meaning:** `GHz` means billions of cycles per second.
81. **`THz` meaning:** `THz` means trillions of cycles per second.
82. **Period meaning:** `Period` is the amount of time required for one complete cycle.
83. **Example relationship:** If a wave is `4 Hz`, it completes four cycles each second.
84. **Example period:** A `4 Hz` wave has a period of `0.25` seconds.

### Wireless Regulation and the FCC

85. **FCC meaning:** `FCC` stands for `Federal Communications Commission`.
86. **US regulation role:** In the United States, the FCC regulates radio-frequency use.
87. **Regulation reason:** If devices transmitted on any frequency at any power level, wireless communication would interfere heavily.
88. **Frequency-control role:** The FCC helps define which frequency ranges can be used.
89. **Power-control role:** The FCC helps define permitted transmission power levels.
90. **Band-rule role:** The FCC helps define which bands are licensed or unlicensed.
91. **Interference-control role:** The FCC enforces rules meant to avoid harmful interference.
92. **Unlicensed-band reminder:** Wi-Fi commonly uses unlicensed bands.
93. **Unlicensed warning:** Unlicensed does not mean unrestricted; compliant equipment still has to follow the rules.

### Wireless Signal Problems

94. **Absorption definition:** `Absorption` happens when a material absorbs signal energy and weakens it.
95. **Reflection definition:** `Reflection` happens when a signal bounces off a surface such as metal.
96. **Refraction definition:** `Refraction` happens when a signal bends as it enters a medium where it travels at a different speed.
97. **Diffraction definition:** `Diffraction` happens when a signal bends around an obstacle.
98. **Scattering definition:** `Scattering` happens when a signal spreads in many directions because of rough surfaces, dust, or similar materials.
99. **Placement consequence:** These physical effects matter when deciding where to place APs in real buildings.
100. **Distance effect:** Signal quality usually drops as the client moves farther from the AP.
101. **Obstacle effect:** Walls and other objects can reduce signal strength and throughput.

### Interference and Channel Planning

102. **Interference definition:** Interference is unwanted signal overlap or competition that reduces wireless performance.
103. **Nearby-WLAN source:** Nearby wireless LANs can interfere with each other.
104. **Non-Wi-Fi source:** Other devices using the same frequency range can also create interference.
105. **Overlapping-channel problem:** Adjacent APs using overlapping channels increase interference.
106. **Band-division idea:** Each wireless band is divided into channels.
107. **2.4 GHz overlap problem:** In the `2.4 GHz` band, many channels overlap each other.
108. **2.4 GHz planning rule:** In the United States, the common non-overlapping `2.4 GHz` channels are `1`, `6`, and `11`.
109. **Why `1, 6, 11` matters:** Those channels are spaced far enough apart to reduce overlap.
110. **Bad-channel example:** Using nearby AP channels such as `1`, `2`, and `3` usually causes more interference than using `1`, `6`, and `11`.
111. **5 GHz advantage:** The `5 GHz` band is easier to plan because it offers more non-overlapping channels.
112. **6 GHz advantage:** The `6 GHz` band provides even more room for newer high-performance Wi-Fi deployments.
113. **Honeycomb planning idea:** A classic `1-6-11` AP layout can be arranged like a honeycomb for overlapping coverage with reduced interference.
114. **Overlap design rule:** Coverage should overlap enough to avoid dead zones without reusing the same overlapping channels too closely.

### Wi-Fi Frequency Bands

115. **Main bands to know:** The key Wi-Fi bands are `2.4 GHz`, `5 GHz`, and increasingly `6 GHz`.
116. **2.4 GHz strength:** `2.4 GHz` usually reaches farther in open space.
117. **2.4 GHz wall benefit:** `2.4 GHz` usually penetrates walls better than higher bands.
118. **2.4 GHz weakness:** `2.4 GHz` is crowded and has fewer non-overlapping channels.
119. **5 GHz strength:** `5 GHz` is usually faster and less crowded than `2.4 GHz`.
120. **5 GHz weakness:** `5 GHz` usually has shorter range and weaker wall penetration than `2.4 GHz`.
121. **6 GHz strength:** `6 GHz` offers very wide channel availability and high performance for newer devices.
122. **6 GHz weakness:** `6 GHz` requires newer compatible hardware and generally has shorter range than `2.4 GHz`.
123. **Memory trick:** `2.4 GHz` goes farther but is crowded; `5 GHz` is faster but fades sooner; `6 GHz` offers more clean space for newer Wi-Fi.
124. **Wi-Fi 6 note:** The video notes that `Wi-Fi 6` (`802.11ax`) expands into the `6 GHz` range.

### 802.11 Standards and Wi-Fi Generations

125. **Standard family:** Wireless LAN standards are defined by IEEE `802.11`.
126. **Wired comparison:** Wired Ethernet standards are defined by IEEE `802.3`.
127. **Certification organization:** The `Wi-Fi Alliance` tests and certifies wireless devices for standards compliance and interoperability.
128. **Generation mapping:** `802.11n` corresponds to `Wi-Fi 4`.
129. **Generation mapping:** `802.11ac` corresponds to `Wi-Fi 5`.
130. **Generation mapping:** `802.11ax` corresponds to `Wi-Fi 6`.
131. **Theoretical-speed warning:** Theoretical maximum speeds are not the same as real-world throughput.
132. **Real-world limiters:** Actual throughput is reduced by interference, overhead, distance, and shared-medium behavior.

### Service Sets and WLAN Organization

133. **Service-set idea:** `802.11` defines several kinds of service sets, which are groupings of wireless devices.
134. **Shared-name rule:** Devices in the same service set share an SSID.
135. **IBSS meaning:** `IBSS` stands for `Independent Basic Service Set`.
136. **IBSS behavior:** In an IBSS, devices connect directly to each other without using an AP.
137. **IBSS scaling note:** IBSS is useful for temporary direct connections but is not very scalable.
138. **BSS meaning:** `BSS` stands for `Basic Service Set`.
139. **BSS behavior:** A BSS is an infrastructure wireless cell built around one AP.
140. **BSS client rule:** In a BSS, clients communicate through the AP rather than directly with one another.
141. **ESS meaning:** `ESS` stands for `Extended Service Set`.
142. **ESS behavior:** An ESS is formed when multiple APs, each with their own BSS, are connected through the wired network and share the same SSID.
143. **ESS roaming role:** An ESS allows clients to roam between APs more smoothly.
144. **BSSID uniqueness rule:** Each BSS in an ESS has its own unique BSSID even when the SSID is shared.
145. **Roaming overlap rule:** For roaming to work well, BSAs should overlap slightly, around `10 to 15 percent`.
146. **MBSS meaning:** `MBSS` stands for `Mesh Basic Service Set`.
147. **MBSS use case:** MBSS is useful when it is difficult to run Ethernet to every AP.
148. **Mesh-backhaul idea:** In a mesh WLAN, APs serve clients and also form a wireless backhaul to each other.
149. **RAP meaning:** `RAP` stands for `Root Access Point`, which connects to the wired network.
150. **MAP meaning:** `MAP` stands for `Mesh Access Point`, which connects through the mesh.

### Infrastructure, Ad-Hoc, and Other Wireless Access Models

151. **Infrastructure mode:** In infrastructure mode, clients connect through an access point.
152. **Ad-hoc mode:** In ad-hoc mode, clients connect directly to each other without a central AP.
153. **Enterprise norm:** Infrastructure mode is the standard design for homes, schools, and businesses.
154. **Ad-hoc limitation:** Ad-hoc mode is less common in enterprise environments because it is less scalable and less centrally managed.
155. **Open network definition:** An open wireless network does not use wireless encryption.
156. **Open-network risk:** Open networks are easier for others to observe because traffic is not protected at the Wi-Fi layer.
157. **Common open-network use:** Open wireless may be used for guest networks, public hotspots, or temporary event networks.
158. **Captive portal definition:** A captive portal is the browser-based sign-in or acceptance page that may appear after joining some guest networks.
159. **Captive-portal distinction:** A captive portal is not the same thing as wireless encryption.
160. **Layer distinction reminder:** A network can have a captive portal and still be open at the wireless-encryption layer.

### Wireless Security Types

161. **WEP meaning:** `WEP` stands for `Wired Equivalent Privacy`.
162. **WEP status:** WEP is obsolete and insecure.
163. **WEP weakness:** WEP has serious design weaknesses and can be cracked quickly with common tools.
164. **Exam takeaway:** `WEP` means old, broken, and not appropriate for real networks.
165. **WPA meaning:** `WPA` stands for `Wi-Fi Protected Access`.
166. **WPA role:** WPA was introduced as a replacement for WEP.
167. **WPA status:** WPA is better than WEP but is still an older transitional solution.
168. **Modern standard:** Modern networks should use WPA2 or WPA3 when possible.
169. **WPA2-PSK meaning:** `WPA2-PSK` is a common password-based wireless security method for homes and small networks.
170. **WPA2-EAP meaning:** `WPA2-EAP` is an enterprise authentication model using `802.1X` and `EAP`.
171. **WPA3 status:** `WPA3` is the newer wireless security standard.
172. **Real-security reminder:** Strong encryption matters more than hidden SSIDs or other obscurity tricks.
173. **Open-network caution:** On open networks, users should rely on secure applications such as HTTPS and, when appropriate, VPNs and endpoint protections.

### Other Wireless Technologies

174. **Scope reminder:** Wireless networking includes more than Wi-Fi.
175. **Bluetooth use:** `Bluetooth` is commonly used for short-range device connections such as headphones, keyboards, mice, and phones.
176. **WiMAX use:** `WiMAX` was designed for metropolitan wireless broadband and is less common now than it once was.
177. **Zigbee use:** `Zigbee` is used for low-power IoT and automation devices.
178. **Z-Wave use:** `Z-Wave` is used in smart-home and automation environments.
179. **NFC use:** `NFC` supports very short-range communication such as tap-style interactions.
180. **Point-to-point microwave use:** Point-to-point microwave links can connect buildings wirelessly.
181. **Cellular use:** Cellular technologies such as `3G`, `4G`, and `5G` provide wide-area mobile data service.
182. **Main differentiators:** Wireless technologies differ in range, bandwidth, power usage, and intended purpose.
183. **Local-vs-wide-area distinction:** Wi-Fi is usually for local network access, while cellular is wide-area provider networking.

### Week 14 Big-Picture Takeaways

184. **Wireless-core idea:** Wireless networking trades cable-free mobility for more interference, planning, and security complexity.
185. **Channel-planning takeaway:** Good WLAN design requires careful channel selection, especially in `2.4 GHz`.
186. **Band-selection takeaway:** Choosing between `2.4 GHz`, `5 GHz`, and `6 GHz` depends on range, speed, interference, and hardware support.
187. **Architecture takeaway:** Wireless clients usually connect through AP-centered infrastructure WLANs rather than ad-hoc peer-to-peer networks.
188. **Security takeaway:** Open and weakly protected wireless networks are risky; WPA2 and WPA3 matter much more than hidden SSIDs.
189. **Roaming takeaway:** Multi-AP WLANs use shared SSIDs, unique BSSIDs, channel planning, and slight coverage overlap to support roaming.
190. **Troubleshooting-ready takeaway:** If a wireless client cannot connect, think through SSID choice, signal strength, channel congestion, authentication, association, DHCP, and gateway settings in that order.
