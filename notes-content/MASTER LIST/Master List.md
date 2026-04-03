# NETC-121 Master Guide 📚🌐

This is your full teaching version of the master list.
It explains concepts, shows how they connect, and keeps exam-ready details in one place.

---

## 1. Networking Models: The Big Picture 🧠

Think of networking as teamwork across layers.
Each layer does one job well and passes data to the next layer.

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

### SPAN/RSPAN for Wireshark 👀

- SPAN mirrors local switch traffic to a capture port.
- RSPAN extends that visibility from remote switches.

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
