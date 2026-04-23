# NETC-121 Master Guide 📚🌐

This is your full teaching version of the master list.
It explains concepts, shows how they connect, and keeps exam-ready details in one place.

---

## 1. Networking Models: The Big Picture 🧠

Think of networking as teamwork across layers.
Each layer does one job well and passes data to the next layer.

### Core Network Types and Roles

- LAN: local network inside a room, building, or campus area.
- MAN: metro-area network across a city or region.
- WAN: large-area network connecting distant sites and providers.
- Node: any participating device on the network.
- Client: consumes a service or resource.
- Server: provides a service or resource.
- Peer-to-peer: endpoints can act as both clients and servers.
- Dedicated server: device primarily assigned to provide network services.
- Shared resources include internet access, files, printers, storage, and applications.
- Common network components include NICs, switches, wireless APs, routers, firewalls, and cabling.
- Small office wireless routers often combine router, switch, firewall, and wireless AP functions.

### OSI Model (Merged with TCP/IP Mapping) 🧱

| OSI Layer | OSI Name | TCP/IP Layer | Main Job | PDU | Addressing | Common Devices | Example Protocols/Standards |
|---|---|---|---|---|---|---|---|
| 7 | Application | Application | Provides network services to user applications (web, email, name lookup) | Data | N/A | End hosts, proxies, application gateways | HTTP, HTTPS, DNS, SMTP, FTP, DHCP |
| 6 | Presentation | Application | Translates data format, handles encryption/compression | Data | N/A | End hosts | TLS/SSL, JPEG, ASCII/Unicode formats |
| 5 | Session | Application | Starts, maintains, and ends sessions between systems | Data | N/A | End hosts | RPC, NetBIOS session concepts |
| 4 | Transport | Transport | End-to-end delivery, reliability, segmentation, flow control | Segment (TCP) / Datagram (UDP) | Port numbers | Firewalls, load balancers, end hosts | TCP, UDP |
| 3 | Network | Internet | Logical addressing and routing between networks | Packet | IP address | Routers, Layer-3 switches | IPv4, IPv6, ICMP, IPsec |
| 2 | Data Link | Network Access | Local delivery in a LAN, framing, MAC forwarding, error detection | Frame | MAC address | Switches, NICs, bridges | Ethernet (802.3), Wi-Fi MAC (802.11), ARP |
| 1 | Physical | Network Access | Sends raw bits as electrical/optical/radio signals | Bits | N/A | Cables, hubs, repeaters, transceivers | UTP/Fiber specs, signaling standards |

### PDUs and Encapsulation 📦

- App creates data.
- Transport adds TCP/UDP header -> segment/datagram.
- Network adds IP header -> packet.
- Data Link adds Ethernet header/trailer -> frame.
- Physical sends bits over wire/fiber/radio.

On receive, this happens in reverse (decapsulation).

---

## 2. Physical Layer: How Bits Move 🔌

### Media and Connectors

- Copper twisted pair (`Cat5e`, `Cat6`, `Cat6a`) for common Ethernet LAN links.
- Coax in legacy or provider environments.
- Fiber optic for high speed, long distance, and low EMI/RFI impact.
- Connectors: `RJ-45` (copper), `LC/SC` (fiber).

### Common Signal Problems

- Attenuation: signal weakens over distance.
- Dispersion (fiber): parts of light pulse arrive at different times.
- EMI/RFI: external electrical/radio noise.
- Bend/dirty connectors (fiber): significant loss.

### RS-232 Console Basics

- Used to manage routers/switches directly without needing IP first.
- Standard serial settings often shown as `9600 8N1`.
- Key settings: baud, data bits, parity, stop bits, signal levels.

### Multiplexing (Many Signals, One Medium)

- FDM: separate by frequency (radio, cable channels).
- TDM: separate by time slots (T1/E1 style systems).

---

## 3. Data Link Layer: Local Delivery 🚚

### MAC Addressing

- 48-bit address written in hex (`AA:BB:CC:DD:EE:FF` style).
- First 24 bits: OUI (manufacturer).
- Last 24 bits: device-specific.
- Broadcast MAC is `FF:FF:FF:FF:FF:FF`.
- MAC scope is local segment only; routers replace Layer-2 headers hop-by-hop.

### Ethernet Frame Fields (Order Matters)

- Preamble/SFD
- Destination MAC
- Source MAC
- EtherType/Length
- Payload (46-1500 bytes typically)
- FCS (CRC value)

### Error Detection

- Checksum: lightweight, less robust.
- CRC: stronger detection; Ethernet uses CRC in FCS.
- Detection does not fix data; higher layers may retransmit.

### Media Access and Collisions

- `CSMA/CD` (legacy shared Ethernet): detect collision, jam, back off, retry.
- `CSMA/CA` (Wi-Fi): avoid collisions using backoff and acknowledgments.
- Random and exponential backoff reduces repeated collisions.

### ALOHA Background

- Pure ALOHA: send anytime, low efficiency.
- Slotted ALOHA: send only at slot boundaries, better efficiency.
- Historical foundation for collision-control thinking.

### Switching Behavior

- Switch learns source MAC per port (MAC table).
- Unknown unicast gets flooded until destination is learned.
- Each switch port is a separate collision domain.
- Broadcast domain is shared unless segmented (for example with VLANs).
- Hubs repeat bits out all ports and keep devices in one shared collision domain.
- Switches inspect Ethernet headers and forward based on destination MAC addresses.
- Switches perform three core jobs: learning, forwarding, and flooding.
- Known unicast frames go only to the learned destination port.
- Unknown unicast frames flood until the destination MAC is learned.
- Broadcast frames flood to every port in the VLAN except the ingress port.
- A switch MAC table is also called a forwarding database.
- Multiple MAC addresses can appear behind one switch port when that port leads to another switch or multi-device segment.
- Bridges are older/fewer-port MAC-forwarding devices; a modern switch is essentially a multiport bridge.
- Managed switches can be configured and monitored; unmanaged switches are mostly plug-and-play.
- Uplinks are inter-switch links and often need higher bandwidth because they aggregate downstream traffic.
- SFP ports allow modular copper or fiber uplink options.

### SPAN/RSPAN for Wireshark 👀

- SPAN mirrors local switch traffic to a capture port.
- RSPAN extends that visibility from remote switches.

### VLANs

- VLAN stands for Virtual Local Area Network.
- A VLAN is a logical Layer 2 broadcast domain built on shared switch hardware.
- VLANs improve segmentation, security, traffic management, and scalability.
- Each VLAN usually maps to a separate IP subnet in practical designs.
- Traffic within a VLAN switches normally.
- Broadcasts and unknown unicasts stay inside the VLAN.
- Inter-VLAN traffic requires a router or Layer 3 switch.
- Access ports carry exactly one VLAN, normally untagged, for endpoint devices.
- Trunk ports carry multiple VLANs across one physical link.
- IEEE `802.1Q` is the standard VLAN tagging method.
- An `802.1Q` tag adds VLAN identity to frames on trunk links.
- Native VLAN traffic is sent untagged on an `802.1Q` trunk and should match on both ends.
- VLAN 1 is the common Cisco default VLAN, but production designs should avoid depending on it for security.
- ISL was Cisco's older proprietary trunking method and has been replaced by `802.1Q` in modern designs.
- VTP replicates VLAN definitions between Cisco switches, but it does not assign access ports for you.
- DTP negotiates Cisco trunk formation and should not be left to create accidental trunks on user-facing ports.
- VLAN hopping can happen when an unauthorized device negotiates or abuses trunk behavior.
- Best practice: explicitly configure access ports as access and trunk ports as trunk; do not rely on automatic negotiation.
- Disable unused ports and place them in an unused VLAN where appropriate.

### Router-on-a-Stick and Inter-VLAN Routing

- Router-on-a-stick routes between VLANs using one physical router interface connected to a switch trunk.
- The router creates one logical subinterface per VLAN.
- Each subinterface uses `encapsulation dot1Q <vlan-id>`.
- Each subinterface acts as the default gateway for its VLAN.
- Example: `g0/0.10` can serve VLAN 10 and `g0/0.20` can serve VLAN 20.
- Benefit: one physical router interface can support several VLANs.
- Weakness: the trunk can become a bottleneck and a single point of failure.
- Larger networks often use Layer 3 switches for inter-VLAN routing instead.

### Cisco Switch Setup and Verification

- IOS prompt flow: user EXEC `>` -> privileged EXEC `#` -> global config `(config)#` -> interface config `(config-if)#`.
- `enable` enters privileged EXEC mode.
- `configure terminal` enters global configuration mode.
- `hostname <name>` identifies the device in prompts and logs.
- `enable secret <password>` protects privileged EXEC mode with a hashed secret.
- Console security: `line console 0`, `password <pw>`, `login`.
- VTY security: `line vty 0 15`, password or SSH configuration, and `transport input ssh` where appropriate.
- MOTD banner: `banner motd # message #`.
- Save changes with `copy running-config startup-config` or `write memory`.
- Create VLANs with `vlan <id>` and optionally `name <name>`.
- Assign access VLANs with `switchport mode access` and `switchport access vlan <id>`.
- Verify VLANs with `show vlan brief`, `show interfaces trunk`, and `show running-config`.
- `show mac address-table` maps learned MAC addresses to ports and VLANs.
- `show interface status` quickly shows port status, VLAN, duplex, and speed.
- `show interface <id>` shows detailed counters such as CRC errors, runts, giants, and collisions.
- `show version` shows IOS version, hardware model, uptime, and reboot context.

### Spanning Tree Protocol

- STP prevents Layer 2 loops when redundant switch links exist.
- Without STP, loops can cause broadcast storms, duplicate frames, and unstable MAC tables.
- Classic STP is IEEE `802.1D`.
- RSTP is IEEE `802.1w` and converges much faster than classic STP.
- MSTP is IEEE `802.1s` and maps VLANs to multiple spanning-tree instances.
- PVST/PVST+ are Cisco per-VLAN spanning-tree implementations.
- BPDUs are Bridge Protocol Data Units used to elect the root bridge and maintain topology.
- The root bridge is the central reference switch in the STP topology.
- Lowest bridge ID wins root election.
- Bridge ID includes priority and MAC address; lower is better.
- Default classic bridge priority is `32768`.
- STP priority values commonly move in increments of `4096`.
- Every non-root switch selects one root port, its best path toward the root bridge.
- Each segment selects one designated port to forward for that segment.
- Redundant non-designated ports block normal user traffic.
- Classic STP states: blocking, listening, learning, forwarding, disabled.
- Default hello timer is `2` seconds.
- Default max age is `20` seconds.
- Default forward delay is `15` seconds.
- Classic convergence can take about `50` seconds: max age plus listening plus learning.
- `show spanning-tree` verifies STP version, root bridge, local bridge, port roles, costs, and timers.
- `spanning-tree vlan <vlan-id> root primary` makes a switch the preferred root for a VLAN.
- `spanning-tree vlan <vlan-id> root secondary` makes a switch a backup root candidate.
- `spanning-tree vlan <vlan-id> priority <value>` manually sets bridge priority.

### PortFast and BPDU Guard

- PortFast is for access ports connected to end devices.
- PortFast lets an access port move to forwarding immediately instead of waiting through normal STP delays.
- PortFast helps DHCP clients and endpoints get network access faster after link-up.
- PortFast should not be enabled on switch-to-switch links.
- BPDU Guard protects edge ports by disabling a port if it receives a BPDU.
- A BPDU on an edge port often means an unexpected switch was connected.
- BPDU Guard can place the port into `err-disabled` state.
- Best practice: pair PortFast and BPDU Guard on access ports.
- Useful commands include `spanning-tree portfast`, `spanning-tree portfast default`, `spanning-tree portfast bpduguard default`, and `spanning-tree bpduguard enable`.
- Recover a BPDU Guard-disabled port manually with `shutdown` followed by `no shutdown`.

### Power over Ethernet and TFTP

- PoE sends data and electrical power over the same Ethernet cable.
- PD means powered device, such as an IP phone, AP, or camera.
- PSE means power sourcing equipment, such as a PoE switch or midspan injector.
- `802.3af` provides standard PoE, `802.3at` provides PoE+, and `802.3bt` provides higher-power PoE++.
- `show power inline` verifies PoE budget and per-port power status.
- TFTP is a simple file transfer protocol commonly used for Cisco config backup labs.
- TFTP uses UDP port `69`.
- Basic Cisco backup flow: verify reachability to the TFTP server, run `copy running-config tftp`, enter server IP, enter destination filename, then verify the file.

---

## 4. Network Layer: IP, Routing, and Reachability 🌍

### IPv4 and IPv6

- IPv4: 32-bit dotted decimal.
- IPv6: 128-bit hexadecimal.
- IP is logical addressing used for routing between networks.

### Key IPv4 Special Addresses

- `127.0.0.1`: loopback.
- `169.254.x.x`: APIPA fallback when DHCP fails.
- `0.0.0.0`: unspecified/default route context.
- `255.255.255.255`: limited local broadcast.

### Classful vs CIDR

- Classful (`A/B/C`) had fixed masks and wasted space.
- CIDR uses prefix length (`/24`, `/26`, etc.) for flexible subnet sizing.

### Class A, B, C Quick Table (Historic)

| Class | Leading Bits | First Octet Range | Default Mask | Default CIDR | Networks Available | Hosts per Network | Typical Historical Use |
|---|---|---|---|---|---:|---:|---|
| A | `0` | `1-126` | `255.0.0.0` | `/8` | 126 | 16,777,214 | Very large organizations |
| B | `10` | `128-191` | `255.255.0.0` | `/16` | 16,384 | 65,534 | Medium and large organizations |
| C | `110` | `192-223` | `255.255.255.0` | `/24` | 2,097,152 | 254 | Smaller LANs and small organizations |

### /8, /16, /24 Host Capacity

- `/8` -> `2^24 - 2 = 16,777,214` usable hosts.
- `/16` -> `2^16 - 2 = 65,534` usable hosts.
- `/24` -> `2^8 - 2 = 254` usable hosts.

### Subnetting Fundamentals

- Network address: host bits all `0`.
- Broadcast address: host bits all `1`.
- Usable host formula: `2^n - 2` (for traditional subnets).
- More subnet bits -> more subnets, fewer hosts per subnet.
- `/30` useful for point-to-point links.
- `/32` used for single-host route entries.
- Mental model: subnets are neighborhood "block parties"; router interfaces connect one block to another.

### Binary Skills That Matter

- One octet is 8 bits.
- Place values: `128 64 32 16 8 4 2 1`.
- Subnet masks are continuous `1`s then `0`s in binary.
- Binary to decimal: add place values where bits are `1`.
- Binary to hex: convert in 4-bit nibbles (`1101 1110` -> `DE`).
- Binary to IPv4: split 32 bits into four 8-bit octets.
- Bit: one binary digit, either `0` or `1`.
- Byte: 8 bits, representing 256 possible values from 0 through 255.
- Each additional bit doubles the number of possible values.

### Character Encoding

- ASCII stands for American Standard Code for Information Interchange.
- Standard ASCII uses 7 bits for 128 possible values.
- ASCII includes uppercase letters, lowercase letters, digits, punctuation, and control characters.
- Example: uppercase `A` is decimal `65`.
- Extended 8-bit character sets used values 128-255 inconsistently, which could cause garbled text.
- Unicode is a universal character-encoding framework designed to represent world languages, symbols, and emoji consistently.

### IPv4 Exhaustion and Address Reality

- IANA allocated the last unassigned IPv4 `/8` blocks on February 3, 2011.
- IPv4 still runs widely through reuse, NAT, and transfer markets.

### Private vs Public IPv4

- Private ranges (`RFC 1918`): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
- Public addresses are globally routable and must be globally unique on the Internet.

### NAT Basics

- NAT translates private internal addresses to public addresses at network boundaries.
- PAT allows many internal hosts to share one public IPv4 by using different source ports.
- NAT helps conserve IPv4, but NAT by itself is not a firewall policy engine.
- NAT tracks sessions so return traffic can be mapped back to the correct internal host.

### VPN Basics

- VPN stands for Virtual Private Network.
- A VPN creates an encrypted tunnel across an untrusted network such as the internet.
- Remote-access VPNs let individual users connect securely to an internal network.
- Site-to-site VPNs securely connect two offices or networks across the internet.
- VPNs protect confidentiality in transit but still require proper authentication and access control.

### IP Header Concepts

- Version, IHL, Total Length
- Source/Destination IP
- TTL
- Protocol (`6 TCP`, `17 UDP`, `1 ICMP`)
- Header checksum
- Flags/fragment offset

### TTL, Traceroute, Fragmentation

- TTL drops by 1 at each router to prevent endless loops.
- Traceroute sends increasing TTL values to discover hops.
- Fragmentation happens if packet exceeds outgoing MTU.

### Datagram vs Virtual Circuit

- Datagram: packets route independently (internet default model).
- Virtual circuit: pre-established path behavior (some WAN technologies).

### Routing Table and Default Gateway Basics

- Routers forward packets by comparing the destination IP address to their routing table.
- A route usually identifies a destination network, mask/prefix length, and next hop or exit interface.
- Directly connected routes appear when router interfaces are configured and active.
- Static routes are entered manually by an administrator.
- Dynamic routes are learned through routing protocols.
- Hosts send remote-subnet traffic to their default gateway.
- Routers use a default route when no more specific route matches.

### Static Routing

- Static routing is predictable because routes do only what the administrator configured.
- Static routes work well in small, stable, or stub networks.
- Static routing does not scale well when many routers and many remote networks are involved.
- Successful communication needs routing in both directions, not just from source to destination.
- Common Cisco IPv4 static route pattern: `ip route <destination-network> <subnet-mask> <next-hop-ip>`.
- Static default route pattern: `ip route 0.0.0.0 0.0.0.0 <next-hop-ip>`.
- A host static route points to one exact host and commonly uses `/32` or `255.255.255.255`.
- A network static route points to an entire destination subnet.
- A static route can use a next-hop IP, an exit interface, or sometimes both.
- Using a next-hop IP is usually clearer on multi-access networks.

### Administrative Distance and Floating Static Routes

- Administrative distance is the trust ranking used when multiple route sources know a path.
- Lower administrative distance is preferred.
- Directly connected routes have administrative distance `0`.
- Normal static routes have administrative distance `1`.
- OSPF commonly has administrative distance `110`.
- A normal static route beats an OSPF route because `1` is lower than `110`.
- A floating static route is a backup static route configured with a higher administrative distance than the preferred route.
- Floating static routes stay inactive while the better route exists and activate when the preferred route disappears.

### Route Summarization

- Route summarization, also called route aggregation, combines several specific routes into one broader route.
- Summarization reduces routing-table size and makes routing updates easier to manage.
- Summarization works by finding the shared leftmost bits among several networks.
- Matching bits stay the same in the summary network address.
- Differing bits become `0` in the summary network address.
- The summary mask uses `1`s for matching bits and `0`s for differing bits.
- Example from Week 12: `10.0.0.4`, `10.0.0.5`, and `10.0.0.6` summarize to `10.0.0.4 255.255.255.252`, or `10.0.0.4/30`.
- A summary can accidentally include extra addresses if the shared prefix is too broad, so summaries should be checked carefully.

### Prefix Lengths and Longest Prefix Match

- IPv4 has 32 bits total.
- `/24` means the first 24 bits match, usually the first three octets.
- `/16` means the first 16 bits match, usually the first two octets.
- `/8` means the first 8 bits match, usually the first octet.
- `/0` matches zero fixed bits and can match any IPv4 destination.
- If multiple routes match, the router chooses the longest prefix match.
- Longer prefix = more specific route.
- Example: if `10.0.0.0/8` and `10.40.77.0/24` both match, traffic to `10.40.77.x` uses the `/24`.

### Router Hierarchy and Default Routes

- Router hierarchies organize routers in layers instead of one long chain.
- Hierarchical designs scale better because new branch networks can connect into aggregation routers.
- Hierarchies improve consistency because users do not have wildly different path lengths for similar destinations.
- Hierarchies isolate failures better than simple linear router chains.
- Aggregation routers can advertise summarized routes upstream.
- A default route is the broadest possible summary: `0.0.0.0/0`.
- Default routes are useful at network edges where one upstream router is the path to everything unknown.
- Without a matching specific route or default route, a router drops the packet.

### Dynamic Routing and RIP

- Dynamic routing protocols let routers exchange route information automatically.
- Dynamic routing reduces the need to manually configure every remote route everywhere.
- A metric is the value a routing protocol uses to choose between possible paths.
- IGP means Interior Gateway Protocol and runs inside one autonomous system.
- EGP means Exterior Gateway Protocol and runs between autonomous systems.
- An autonomous system is a group of networks under one administrative control.
- BGP is the major EGP used on the modern internet.
- Common IGP examples include RIP, EIGRP, OSPF, and IS-IS.
- Distance-vector protocols learn available routes and metrics from neighboring routers.
- Link-state protocols maintain a broader topology map.
- Distance-vector protocols usually require fewer resources but may converge more slowly.
- Link-state protocols usually require more memory/CPU but converge faster because routers know more of the topology.
- EIGRP is often described as an advanced distance-vector or hybrid protocol.
- OSPF and IS-IS are link-state protocols.
- RIP and RIPv2 are distance-vector protocols.
- RIP uses hop count as its metric.
- RIP treats more than 15 hops as unreachable.
- RIPv1 is classful and does not carry modern classless mask information.
- RIPv2 is classless and supports security features.
- Basic RIP setup starts with `router rip`; RIPv2 adds `version 2`.
- RIP uses `network <network-address>` statements to identify participating networks.
- RIP is useful for learning dynamic routing, but it is not common in modern production networks.

### Distance-Vector Stability Tools

- Split horizon: do not advertise a route back out the direction it was learned from.
- Route poisoning: mark a failed route with a high metric so routers stop using it.
- Hold-down timers: temporarily suppress unstable route changes to reduce flapping.
- Convergence means routers have finished updating and agree on usable paths.

### Packet Forwarding Through Routers

- Layer 2 delivery is hop-local; MAC headers are rebuilt at each routed hop.
- Layer 3 delivery is end-to-end; source and destination IP addresses stay consistent across the routed path.
- A host sending to a remote subnet first resolves the default gateway MAC address.
- The first Ethernet frame goes to the default gateway MAC, not the final remote host MAC.
- The router decapsulates the old frame, checks the destination IP, looks up the route, and re-encapsulates for the next link.
- If the final destination is on a directly connected subnet, the router ARPs for that host before forwarding.
- ARP tables, switch MAC tables, and router routing tables all work together during packet delivery.

### Router Commands and Verification

- Configure router interfaces with IP address, subnet mask, and `no shutdown`.
- `show ip interface brief` summarizes interface addresses and up/down status.
- `show ip route` displays installed routes.
- `show ip route static` filters to static routes.
- `show running-config` shows active RAM configuration.
- `show startup-config` shows saved NVRAM configuration.
- `copy running-config startup-config` and `write memory` save changes.
- `netstat -r` and `route print` display host routing tables on Windows.
- `Gateway of last resort is not set` means no default route is currently configured on that router.

### IPv6 Routing

- IPv6 uses the same broad routing ideas as IPv4 with updated address syntax and commands.
- IPv6 loopback is `::1`.
- IPv6 static route syntax begins with `ipv6 route <prefix>`.
- IPv6 static routes can point to an exit interface, a link-local next hop, or a global next-hop IPv6 address depending on design.
- IPv6 dynamic protocol names include RIPng, OSPFv3, EIGRP for IPv6, and BGP for IPv6.

### Week 12 Routing Scope Note

- Week 12 focuses on static routing review, route summarization, router hierarchy, default routes, and RIP routing.
- EIGRP, OSPF, and BGP may be mentioned for comparison, but the Week 12 notes mark them as outside the main required focus.

---

## 5. ARP, RARP, and ICMP 🔍

### ARP

- ARP resolves IPv4 -> MAC on the local subnet.
- ARP request is broadcast.
- ARP reply is typically unicast.
- Entries live in ARP cache and may expire.
- ARP does not cross routers.

### RARP

- Reverse mapping MAC -> IP (legacy concept).
- Replaced by DHCP in modern networks.

### ICMP

- Diagnostic/control protocol, not user data transport.
- Ping uses echo request/reply.
- Traceroute relies on time exceeded responses.
- Destination unreachable helps troubleshoot path/service issues.

---

## 6. Transport Layer: Reliable vs Fast 🚦

### TCP (Reliable)

- Connection-oriented.
- 3-way handshake: `SYN -> SYN/ACK -> ACK`.
- Teardown uses `FIN/ACK` exchange.
- Sequence numbers and ACKs ensure order and reliability.
- Retransmission handles loss.
- Sliding window manages flow control.

### TCP Flags

- `SYN`: start/sync.
- `ACK`: acknowledgment.
- `FIN`: graceful close.
- `RST`: immediate reset.
- `PSH`: push to app quickly.
- `URG`: urgent pointer in use.

### TCP Timers (Core Ideas)

- Retransmission timeout.
- SYN timeout during setup.
- Keepalive for idle sessions.
- TIME_WAIT after close.

### UDP (Fast/Lightweight)

- Connectionless, minimal overhead.
- No built-in delivery/order guarantees.
- Good when latency matters more than perfect delivery.

### TCP vs UDP Quick Decision

- Use TCP when correctness is critical.
- Use UDP for real-time traffic where occasional loss is acceptable.

---

## 7. Ports and Application Protocols 🧭

### Port Ranges

- `0-1023`: well-known
- `1024-49151`: registered
- `49152-65535`: ephemeral/dynamic

IP gets data to the right host. Port gets it to the right process.

### High-Value Protocol/Port Set

| Protocol | Port(s) | Transport | What It Does |
|---|---|---|---|
| HTTP | 80 | TCP | Unencrypted web |
| HTTPS | 443 | TCP | Encrypted web (TLS) |
| FTP | 20/21 | TCP | File transfer, cleartext classic |
| SFTP | 22 | TCP | Secure file transfer over SSH |
| FTPS | 990 (common) | TCP | FTP with TLS |
| SSH | 22 | TCP | Secure remote shell |
| Telnet | 23 | TCP | Insecure remote shell |
| SMTP | 25 | TCP | Send email |
| POP3 | 110 | TCP | Retrieve email (download style) |
| IMAP | 143 | TCP | Retrieve/sync email |
| DNS | 53 | UDP/TCP | Name resolution |
| DHCP | 67/68 | UDP | Auto IP config |
| SNMP | 161/162 | UDP | Monitoring/management |
| LDAP | 389 | TCP/UDP | Directory services |
| NTP | 123 | UDP | Time sync |
| SMB | 445 | TCP | Windows file sharing |
| RDP | 3389 | TCP | Remote desktop |
| TFTP | 69 | UDP | Simple transfer/boot support |

---

## 8. DHCP and DNS: Core Infrastructure Services 🏗️

### DHCP (DORA Flow)

1. Discover: client broadcasts looking for DHCP server.
2. Offer: server proposes address/config.
3. Request: client accepts one offer.
4. Acknowledge: server confirms lease.

### DHCP Configuration Data Returned to Clients

- IP address
- Subnet mask/prefix
- Default gateway
- DNS server addresses
- Lease duration
- Optional settings (domain name, NTP, PXE boot options)

### DHCP Terms You Must Distinguish

- Scope: assignable pool range.
- Lease: temporary assignment with timers.
- Reservation: fixed IP for a specific MAC via DHCP.
- Exclusion: addresses in range that must not be handed out.
- Relay/IP helper: forwards DHCP across routed boundaries.

### DHCP Lease Behavior and Design

- Renewal usually begins near `T1` (~50% of lease), then rebinding near `T2` if needed.
- Short leases fit high-turnover networks (guest Wi-Fi/labs).
- Long leases fit stable office devices and reduce DHCP churn.
- VLANs usually map to separate subnets, so each VLAN commonly needs its own scope.

### DHCP Server Placement Examples

- Dedicated Windows/Linux server
- Router or firewall integrated DHCP service
- Virtualized server
- Layer-3 switch DHCP service (design-dependent)

### Windows DHCP Operations (Core Admin View)

1. Install DHCP role and authorize server (AD environments).
2. Create and activate scope (range, mask/prefix, exclusions).
3. Configure options (gateway, DNS, domain name).
4. Validate by leasing from a test client.

### Windows DHCP Client and `ipconfig`

- GUI: set adapter IPv4 and DNS to obtain automatically.
- `ipconfig /all`: show full adapter and DHCP state.
- `ipconfig /release`: release current lease.
- `ipconfig /renew`: request new lease.
- `ipconfig /flushdns`: clear local DNS cache.
- APIPA fallback (`169.254.0.0/16`) appears when DHCP cannot be reached.

### DNS Concepts

- DNS maps names to IP addresses and is distributed/hierarchical.
- DNS servers answer queries for cached, recursive, or authoritative data.
- Domain tree: root (`.`) -> TLD -> domain -> host label.
- FQDN is the full name path to root (trailing dot often hidden in UI).
- TLD examples: `.com`, `.org`; ccTLD examples: `.us`, `.jp`, `.uk`.
- Resolver asks recursively on your behalf; recursive resolvers use iterative lookups upstream.
- Forwarders pass unknown queries upstream.
- `hosts` file is the historical local override mechanism still supported by modern OSes.
- Root hints (`named.root` / `root.hints`) bootstrap resolver contact with root servers.

### URL Parts (Name Resolution Context)

- Scheme: `https`
- Authority: `www.example.com:443`
- Path: `/docs/index.html`
- Query: `q=dns`
- Fragment: `ttl`

### Recursive vs Iterative (Real-World Example)

1. Browser asks local resolver for `www.wiley.com`.
2. Client sends recursive query to configured DNS server.
3. Resolver checks cache; if missing, it asks root servers iteratively.
4. Root refers resolver to `.com` name servers.
5. Resolver queries `.com` iteratively and receives referral for `wiley.com`.
6. Resolver queries authoritative `wiley.com` server and gets final record.
7. Resolver returns answer to client and both sides cache it per TTL.

### DNS Zones, Records, and Reverse Lookup

- Zone: managed portion of namespace.
- Primary server: writable source zone.
- Secondary server: read-only replica via zone transfer.
- Reverse lookup uses `PTR` in `in-addr.arpa` (IPv4).

| RR Field | Meaning |
|---|---|
| TTL | Cache time in seconds |
| Owner | Name this record applies to |
| Class | Usually `IN` |
| Type | Record type (`A`, `NS`, etc.) |
| RDATA | Type-specific value |

| Type | Purpose | Example |
|---|---|---|
| SOA | Zone authority metadata | `wiley.com. IN SOA ...` |
| NS | Authoritative nameserver list | `wiley.com. IN NS ns1.wiley.com.` |
| A | Name to IPv4 mapping | `www.wiley.com. IN A 203.0.113.25` |
| CNAME | Alias to canonical name | `shop.wiley.com. IN CNAME www.wiley.com.` |
| MX | Mail server preference | `wiley.com. IN MX 10 mail.wiley.com.` |
| PTR | Reverse IP-to-name mapping | `25.113.0.203.in-addr.arpa. IN PTR www.wiley.com.` |

---

## 9. Transmission Types, Topologies, and Duplex 📡

### Unicast/Broadcast/Multicast

- Unicast: one-to-one.
- Broadcast: one-to-all in local broadcast domain.
- Multicast: one-to-many subscribed receivers.

### Topology Concepts

- Bus: one shared medium, legacy and fragile.
- Star: common LAN shape, central device critical.
- Ring: circular forwarding path, break risk unless protected design.
- Hub-and-spoke: centralized WAN design.
- Mesh: multiple paths for redundancy.

### Duplex

- Simplex: one-way only.
- Half-duplex: both directions, one at a time.
- Full-duplex: both directions simultaneously.
- Duplex mismatch causes poor performance and errors.

---

## 10. Performance and Troubleshooting ⚙️

### Latency vs Jitter

- Latency: total delay.
- Jitter: variability of delay.
- Real-time apps (voice/video/gaming) are especially sensitive to jitter.

### Common Troubleshooting Checks

- Verify host addressing, DNS settings, and default gateway first.
- Test reachability, route path, and packet loss patterns.
- Check local Layer 2 mapping/caches when local connectivity fails.
- Use packet captures when command output is inconclusive.

### Windows Command Toolkit (Chapter 7)

| Command | What It Does | Typical Use |
|---|---|---|
| `hostname` | Shows local computer name | Confirm host identity |
| `arp` | Shows/manages ARP cache | Check IP-to-MAC mapping |
| `ipconfig` | Shows/manages IP and DHCP state | Verify addressing, renew lease |
| `nbtstat` | NetBIOS over TCP/IP stats/tables | Legacy name-resolution checks |
| `netstat` | Active connections/listening ports/stats | Find open sockets and PIDs |
| `nslookup` | DNS query tool | Validate forward/reverse DNS |
| `pathping` | Hop path + packet-loss analysis | Diagnose where loss starts |
| `ping` | ICMP reachability/RTT test | Quick connectivity test |
| `route` | Show/edit route table | Confirm gateway/path decisions |
| `tracert` | Hop-by-hop path trace | Locate break/latency hop |

### SPAN Note

On switched networks, you often need SPAN/RSPAN to see transit traffic not addressed to your NIC.

---

## 11. Security Essentials 🔐

- Telnet/FTP/HTTP expose cleartext data.
- SSH/HTTPS protect confidentiality in transit.
- ARP spoofing can poison local traffic paths.
- SYN floods exhaust half-open TCP resources.
- DDoS is harder to block because attack traffic is distributed.
- Firewalls enforce traffic policy by IP, port, protocol, and connection state.
- Typical baseline: deny unsolicited inbound, allow only required services.

### Security Program Basics

- Security should be designed from the beginning, not added only after deployment.
- Security applies to switches, routers, firewalls, servers, endpoints, accounts, software, services, and data.
- No organization can prevent every incident, so prevention and recovery are both required.
- Prevention reduces the chance or impact of incidents.
- Recovery restores operations after prevention fails.
- Common preventive controls include firewalls, antivirus, anti-spam, patching, MFA, strong passwords, encryption, and user training.
- Asset management means tracking hardware, software, cloud services, firmware, users, accounts, and permissions.
- You cannot protect assets well if you do not know they exist.
- Role-based permissions should restrict shared data to users with a business need.
- Data-in-flight encryption protects moving data.
- Data-at-rest encryption protects stored data.
- Physical security still matters; server rooms and unattended workstations need protection.

### Backup and Recovery

- Recovery planning must happen before an attack, outage, or disaster.
- Backups should cover every critical server and data store.
- Backups should be current, automated, monitored, and tested.
- Keep multiple backup generations because recent backups may already contain corrupted or encrypted data.
- Keep backups off-site and preferably offline or otherwise isolated from attacker access.
- Test both file-level restores and whole-server restores.
- Recovery planning should include alternate communications if email or normal systems are unavailable.

### Cybersecurity Frameworks

- Cybersecurity frameworks organize security work into repeatable categories and outcomes.
- Frameworks named in the course include NIST, ISO/IEC 27001, ISA/IEC 62443, CIS Critical Security Controls, and COBIT.
- NIST is a common U.S. cybersecurity framework for organizations of many sizes.
- NIST version 2.0 added stronger governance emphasis.
- NIST Framework Core functions: Govern, Identify, Protect, Detect, Respond, Recover.
- Govern handles oversight, accountability, policy, and cyber supply-chain risk.
- Identify covers assets, risks, and vulnerabilities.
- Protect covers safeguards that reduce incident likelihood or impact.
- Detect covers monitoring and adverse event analysis.
- Respond covers incident response actions and communication.
- Recover covers restoration and recovery communication.

---

## 12. History and Standards 🏛️

- Internet is a global network of networks; the web is one service on top of it.
- ARPANET started in 1969, transitioned to TCP/IP on January 1, 1983, and was retired in 1990.
- Ethernet developed at Xerox PARC, standardized as IEEE `802.3`.
- IEEE: hardware/media standards (`802.3`, `802.11`).
- IETF: protocol RFCs and standards-track progression.
- RFC status context: not all RFCs are standards; RFCs can be informational, experimental, BCP, or standards-track.
- Historical standards path: Proposed Standard -> Draft Standard -> Internet Standard.
- Standards-track model: Proposed Standard -> Internet Standard (Draft Standard mostly historical).
- ISO: reference model frameworks.
- IANA: address and port registries.

---

## 13. Quiz Mistake Corrections (Must-Know) ✅

- Scope is the pool range, not a reservation.
- Reservation is one MAC pinned to one IP.
- RARP is legacy; DHCP is modern startup assignment.
- Half-duplex is two-way but not simultaneous.
- Packet vs frame: Layer 3 cargo vs Layer 2 local delivery wrapper.

---

## 14. Fast Review Prompts 📝

- Explain OSI Layer 2 vs Layer 3 in 30 seconds.
- Walk DORA from memory with broadcast/unicast behavior.
- Given `/26`, identify network, host range, broadcast.
- Compare CSMA/CD and CSMA/CA quickly.
- Explain why MAC changes at router hops but IP packet remains end-to-end.
