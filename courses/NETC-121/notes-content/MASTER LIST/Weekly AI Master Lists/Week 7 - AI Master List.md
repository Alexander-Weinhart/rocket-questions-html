# Week 7 - AI Master List

## Week Scope (from syllabus)
- Topics: switch recovery; basic security settings; binary number system
- Lab: switch recovery; MOTD; PortFast
- Reading: Essential Chapter 8
- Videos: 12–15
- Notes folder: Lecture Week 7; VLAN - Virtual Local Area Network

---

## Canonical Concepts (all concepts from Week 7 sources)

### Binary Number System (Videos 12–14)

1. **Binary number system:** base-2 positional counting system using only digits 0 and 1; each place value is a power of 2 (1; 2; 4; 8; 16; 32; 64; 128…).
2. **Binary vs decimal comparison:** decimal is base-10 (place values 1; 10; 100…); binary is base-2 (place values 1; 2; 4; 8…); both use positional notation — the value of each digit depends on its position.
3. **Binary hardware basis:** computers are built from transistors — tiny switches that are either on or off; on = 1; off = 0; binary maps directly to physical hardware states making it the natural language of digital circuits.
4. **Bit definition:** a bit (binary digit) is the smallest unit of data in computing; it holds exactly one value: 0 or 1.
5. **Byte definition:** a byte is exactly 8 bits; it can represent values from 0 to 255; there are 256 total distinct values (2^8 = 256).
6. **8-bit place value table:** left-to-right place values for an 8-bit number are 128; 64; 32; 16; 8; 4; 2; 1 (corresponding to 2^7 through 2^0).
7. **Binary-to-decimal conversion:** align each bit with its place value; add only the place values where the bit is 1; ignore positions where bit is 0.
8. **Binary addition carry rule:** 1 + 1 in binary equals decimal 2 = binary 10; write 0 in the current column and carry 1 to the next column left; same carry mechanics as decimal addition.
9. **Bit-width and max value:** each additional bit doubles the maximum representable value; 8-bit max = 255; 16-bit max = 65535; 32-bit unsigned max ≈ 4.3 billion; 64-bit unsigned max ≈ 9.2 quintillion.
10. **Signed vs unsigned integers:** unsigned integers use all bits for magnitude; signed integers reserve 1 bit for sign (0 = positive; 1 = negative); 32-bit signed range ≈ ±2.1 billion.
11. **32-bit and 64-bit systems:** the bit-width of a system determines the chunk size for arithmetic and memory addressing; 64-bit systems can address terabytes of RAM; 32-bit systems are limited to ~4 GB addressable memory.
12. **Floating-point numbers:** non-integer values stored using IEEE 754 format; 32-bit float: 1 sign bit; 8 exponent bits; 23 significand bits; conceptually like scientific notation (e.g. 625.9 = 0.6259 × 10^3).
13. **Data size prefixes:** 1 byte = 8 bits; kilobyte (KB) ≈ 1000 bytes (decimal/SI) or 1024 bytes (binary/IEC); megabyte (MB); gigabyte (GB); terabyte (TB); both 1000 and 1024 definitions appear in real-world use depending on context.

### Character Encoding (Videos 12–13)

14. **ASCII encoding:** American Standard Code for Information Interchange; introduced 1963; uses 7 bits providing 128 values; includes uppercase and lowercase letters; digits 0–9; punctuation; and control codes (newline; tab; etc.).
15. **ASCII examples:** uppercase A = decimal 65 = binary 01000001; lowercase a = decimal 97; colon = decimal 58; close parenthesis = decimal 41.
16. **ASCII interoperability:** a common encoding standard allowed different computers and systems to exchange text reliably regardless of manufacturer.
17. **Extended ASCII incompatibility and mojibake:** values 128–255 in 8-bit systems were used differently by different countries and vendors; when files crossed incompatible systems; text rendered as garbled characters (mojibake).
18. **Unicode:** universal encoding framework introduced 1992; resolves extended ASCII incompatibility; supports all world languages; scripts; symbols; and emoji in a single standard.

### VLAN Concepts (Lecture Week 7 + Chapter 8)

19. **VLAN definition:** a Virtual LAN is a logical grouping of switch ports creating a separate Layer 2 broadcast domain on shared managed switch hardware; devices in different VLANs are isolated at Layer 2.
20. **VLAN benefits:** logical traffic segmentation; smaller broadcast domains improve performance; security isolation between departments; flexible topology without physical rewiring.
21. **802.1Q standard:** IEEE 802.1Q (dot1q) governs VLAN frame tagging; VLAN ID field is 12 bits; supports 4096 values (0–4095); VLAN 0 and 4095 are reserved; VLAN 1 is the default.
22. **Three VLAN types:** (1) port-based — VLAN assignment tied to physical port numbers; (2) tag-based/802.1Q — VLAN ID embedded in Ethernet frame header enabling trunks; (3) protocol-based — membership determined by protocol type of the frame.
23. **Static VLAN:** VLAN port membership manually assigned by administrator; most common and predictable; does not change when a device is replaced on that port.
24. **Dynamic VLAN:** VLAN assignment done automatically based on MAC address or user credentials; logical VLAN membership follows the user/device when it physically moves ports.
25. **Access ports:** connects endpoint devices (PCs; printers; cameras; phones); carries exactly one untagged VLAN; endpoint receives frames without any 802.1Q tag; endpoint is unaware of VLAN ID.
26. **Trunk ports:** connects to another switch; router subinterface; or tagged server NIC; carries multiple VLANs simultaneously over one physical link; 802.1Q tags on frames identify VLAN membership.
27. **802.1Q frame tagging:** switch inserts a 4-byte tag into the Ethernet frame on trunk links; tag contains VLAN ID; receiving switch reads tag to determine VLAN; switch strips the tag before delivering the frame to an access port endpoint.
28. **Native VLAN:** frames belonging to the native VLAN are transmitted untagged on 802.1Q trunk links; Cisco default native VLAN is VLAN 1; native VLAN must match on both ends of a trunk or traffic issues occur.
29. **VLAN overhead and MTU:** 802.1Q tag adds 4 bytes to Ethernet frame size; standard Ethernet MTU is 1500 bytes; devices that enforce strict MTU limits may fragment or drop oversized tagged frames; MTU consistency must be planned across the path.
30. **MSS and TCP fragmentation avoidance:** TCP Maximum Segment Size of 1460 bytes fits within 1500-byte MTU after subtracting 20-byte IP header and 20-byte TCP header; prevents fragmentation on standard Ethernet links.
31. **ISL vs 802.1Q:** ISL (Inter-Switch Link) is an older Cisco-proprietary trunking protocol that encapsulates the entire frame; 802.1Q is the current industry standard that inserts a tag inside the frame; ISL is obsolete.
32. **VTP (VLAN Trunking Protocol):** Cisco-proprietary protocol that propagates VLAN definitions from a VTP server to VTP client switches within a VTP domain; reduces manual per-switch VLAN config; requires careful management to avoid accidental VLAN deletion.
33. **Inter-VLAN routing requirement:** Layer 2 switches forward frames only within the same VLAN; traffic between VLANs requires a Layer 3 device (router or Layer 3 switch).
34. **Router-on-a-stick:** one physical router port configured as a trunk to the switch; per-VLAN subinterfaces created (e.g. fa0/0.10) each with `encapsulation dot1Q <vlan-id>` and a unique gateway IP; router routes inter-VLAN traffic between subinterfaces.
35. **SVI (Switched Virtual Interface):** virtual Layer 3 interface on a Layer 2 switch used only for management IP access; configured as `interface vlan 1` + `ip address` + `no shutdown`; not used for routing on a pure Layer 2 switch.
36. **VLAN security — explicit port modes:** configure every port explicitly as access or trunk; prevents ports from auto-negotiating trunk mode with rogue or unauthorized devices.
37. **VLAN hopping attack:** if a switch port is left in dynamic auto/desirable mode; an attacker connects a rogue switch; negotiates a trunk; and gains access to all VLAN traffic on that trunk; mitigated by hard-coding access mode and disabling unused ports.

### Cisco Switch Configuration — Security and Basic Setup (Chapter 8)

38. **IOS mode progression:** user EXEC (Switch>) → privileged EXEC (Switch#) via `enable` → global config (Switch(config)#) via `configure terminal` → interface config (Switch(config-if)#) → line config (Switch(config-line)#).
39. **Hostname configuration:** `hostname <name>` in global config; changes the CLI prompt; identifies the device in logs and neighbor tables.
40. **Enable secret:** `enable secret <password>` stores a hashed password protecting privileged EXEC mode; always preferred over `enable password` which uses weak reversible encoding.
41. **Console line security:** `line console 0` → `password <pw>` → `login`; requires a password before local console access is granted.
42. **VTY line security:** `line vty 0 15` → `password <pw>` → `login`; secures Telnet/SSH remote access; `transport input ssh` restricts to SSH only.
43. **MOTD banner:** `banner motd # <message> #` in global config; displayed to anyone connecting to the device before the login prompt; used for legal warning notices (unauthorized access prohibited).
44. **Save configuration:** `copy running-config startup-config` (or `write memory`) saves the active configuration to NVRAM so changes survive a reboot.
45. **VLAN creation and naming:** `vlan <id>` enters VLAN config mode; `name <name>` assigns a human-readable label.
46. **Access port assignment:** `interface <id>` → `switchport mode access` → `switchport access vlan <id>`; mode command must come before VLAN assignment.
47. **Voice VLAN:** `switchport voice vlan <id>` allows an IP phone to tag its own voice traffic while data traffic from an attached PC remains in the untagged data VLAN.
48. **VLAN verification commands:** `show vlan brief` (IDs; names; port assignments); `show vlan name <name>`; `show vlan id <id>`; `show interfaces trunk`.
49. **General show and config commands:** `show running-config` (view active config); `show startup-config` (view saved NVRAM config); used to confirm configuration state after changes are made.

### Spanning Tree Protocol (Chapter 8)

50. **STP purpose:** IEEE 802.1D prevents Layer 2 loops on redundant switched networks by blocking redundant paths; without STP; redundant links cause broadcast storms that consume all bandwidth.
51. **BPDU role:** Bridge Protocol Data Units are messages switches exchange to elect the root bridge; compute best paths; select forwarding and blocking ports; and signal topology changes.
52. **BPDU types:** configuration BPDU (root election and topology info); TCN (Topology Change Notification); TCA (TCN Acknowledgment).
53. **Root bridge election:** the switch with the lowest bridge ID wins; bridge ID = bridge priority (default 32768) + MAC address; administrators can lower priority to control which switch becomes root.
54. **STP timers:** hello timer = 2 seconds (how often BPDUs are sent); forward delay = 15 seconds (time in listening and learning states).
55. **STP port states (5):** blocking (no data forwarding; receives BPDUs); listening (root election; no MAC learning); learning (learns MACs; no data forwarding); forwarding (full operation); disabled (administratively shut).
56. **RSTP (Rapid STP):** IEEE 802.1w; redesigned state machine converges typically under 10 seconds vs. 30–50 seconds for classic STP.
57. **MSTP:** IEEE 802.1s; maps multiple VLANs to multiple spanning tree instances enabling VLAN-aware load sharing across redundant links.
58. **Cisco PVST/PVST+:** Cisco per-VLAN Spanning Tree runs a separate STP instance per VLAN; allows per-VLAN root bridge selection; PVST+ is the 802.1Q-compatible version.
59. **LACP/link aggregation:** IEEE 802.3ad bundles multiple physical links into one logical port-channel for bandwidth and redundancy; member ports must match speed and duplex.

### Power over Ethernet (Chapter 8)

60. **PoE purpose:** delivers both data and electrical power over a standard Ethernet cable; eliminates separate power supplies for powered devices.
61. **PD (Powered Device):** endpoint receiving power over Ethernet; examples: IP phones; wireless access points; IP cameras.
62. **PSE (Power Sourcing Equipment):** provides power on the cable; endpoint PSE = PoE switch port; midspan PSE = external injector added between a non-PoE switch and the PD.
63. **PoE resistive discovery:** PSE checks for a valid PD signature (~25 kOhm) before applying full power; prevents accidental power delivery to non-PoE devices.
64. **PoE standards and power levels:** 802.3af (standard PoE) = up to 15.4W; 802.3at (PoE+) = up to 30W; 802.3bt (PoE++) Type 3 = up to 60W; Type 4 = up to 100W.
65. **show power inline:** confirms PoE power budget and per-port power status; used to troubleshoot power-related device failures.

### Switch Troubleshooting (Chapter 8)

66. **Physical-first approach:** check cables; link LEDs; patch panel connections; and device power before using CLI tools.
67. **show ip interface brief:** summarizes all interfaces with IP address and status (up/down).
68. **show interface status:** displays port status; VLAN assignment; duplex; and speed; identifies wrong VLAN assignment.
69. **show interface <id>:** detailed counters including input errors; CRC; runts; giants; and collisions; incrementing errors indicate physical or duplex problems.
70. **show mac address-table:** maps learned MAC addresses to switch ports and VLANs; locates devices and confirms forwarding.
71. **show version:** displays IOS version; hardware model; uptime; and last reboot reason.
72. **Interface status states:** up/up = fully operational; up/down = physical link present but no protocol; down/down = no physical signal; administratively down = manually disabled.
73. **Duplex and speed mismatch:** causes late collisions; input errors; and degraded throughput; must match on both ends of a link.

### TFTP Backup Workflow (Video 15)

74. **TFTP backup purpose:** saves Cisco device running configurations to a TFTP server for backup and recovery.
75. **SolarWinds TFTP Server:** free Windows application that receives incoming file transfers from Cisco routers and switches.
76. **TFTP backup procedure:** (1) ping TFTP server IP to verify connectivity; (2) `copy running-config tftp`; (3) enter server IP and destination filename (e.g. R1.cfg); (4) confirm file received; (5) open with text editor to review.
77. **TFTP config inspection with text editor:** after the running-config is saved to the TFTP server; the .cfg file can be opened in Notepad++ or any plain-text editor to inspect interface settings; NAT rules; and ACL entries without reconnecting to the device.

### VLAN Physical vs Logical Design (Lecture Week 7)

78. **Physical separation vs VLAN logical separation:** physically isolating traffic requires a dedicated switch per group; this is less flexible; less scalable; and more costly than VLANs; VLANs provide the same logical isolation on shared managed switch hardware without additional hardware.
79. **Default all-ports-in-VLAN-1:** a factory-new or reset switch places all ports in VLAN 1 by default; all hosts on that switch can initially see and communicate with each other; VLAN segmentation must be explicitly configured to create isolation between groups.
80. **PMTUD failure and blackholing:** if Path MTU Discovery fails because an intermediate device blocks ICMP "fragmentation needed" messages; oversized packets are silently dropped (blackholed) rather than fragmented; TCP MSS adjustment at the sender avoids this by capping segment size below the MTU bottleneck.
81. **Trunk link VLAN distribution design:** with multiple physical links between two switches; VLANs can be manually split across links (different VLANs carried in access mode per link) or links can be trunked and load-balanced using LAG; in Cisco PVST environments STP behavior and root bridge can differ per VLAN.
82. **Port security feature:** Cisco IOS `switchport port-security` restricts a port to specific allowed MAC addresses; unauthorized MAC addresses trigger a violation action (protect; restrict; or shutdown); complements explicit access-mode enforcement and disabling unused ports.

### Binary Supplemental Concepts (Videos 12–13)

83. **Binary counting sequence:** binary counts up: 0; 1; 10; 11; 100; 101; 110; 111; 1000…; each time all active bits are 1; adding 1 generates a carry that produces a new leading bit and resets lower bits; mirrors decimal carry mechanics.
84. **Francis Bacon 5-bit encoding:** in the 1600s Francis Bacon encoded letters using 5-bit sequences; 5 bits support 32 values — sufficient for a simple alphabet but not for digits; punctuation; upper and lower case; shows why 7 bits (ASCII) and eventually Unicode were needed.
85. **Universal binary data principle:** all digital data — text messages; web pages; images; audio; video; and operating systems — is ultimately stored and transmitted as sequences of 1s and 0s; binary is the universal substrate of all digital information.

---

## Sources Used (Week 7 only)
- `Notes List A - Video Content/Video 12 - What Is Binary/Transcript.md`
- `Notes List A - Video Content/Video 13 - representing numbers and letters with binary/Transcript.md`
- `Notes List A - Video Content/Video 14 - How to convert binary to decimal/Transcript.md`
- `Notes List A - Video Content/Video 15 - SolarWinds TFTP Server/Transcript.md`
- `Notes List C - Personal Notes/Lecture Week 7/VLAN - Virtual Local Area Network.md`
- `Notes List B - Textbook Content/Essential - Chapter 8 Introduction to Switch Configuration/Essential Chapter 8 - Switch Configuration, VLANs, STP, PoE, and Troubleshooting.md`
