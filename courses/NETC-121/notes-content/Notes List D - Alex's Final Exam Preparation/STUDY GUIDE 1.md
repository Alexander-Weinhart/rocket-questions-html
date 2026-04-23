# Study Guide 1

This guide turns the rough topic list into an exam-ready reference. Focus on definitions, comparisons, and how to reason through network situations.

## 1. OSI Model

*Mnemonic: `Please Do Not Throw Sausage Pizza Away`

| Layer Number | Layer Name | Main Job | Common PDU | Common Addressing |
|---|---|---|---|---|
*****| 7 | Application | Network services for user apps | Data | None |
*****| 6 | Presentation | Translation, encryption, compression | Data | None |
*****| 5 | Session | Starts and manages sessions | Data | None |
*****| 4 | Transport | End-to-end delivery and reliability | Segment / Datagram | Port numbers |
*****| 3 | Network | Logical addressing and routing | Packet | IP address |
*****| 2 | Data Link | Local delivery on the LAN | Frame | MAC address |
*****| 1 | Physical | Sends raw bits over media | Bits | None |

### What to know

**- You must know the layer names and numbers.
* - Switches mainly work at Layer 2.
* - Routers work at Layer 3.
***- A Layer 3 switch can do Layer 2 switching and Layer 3 routing.

## 2. Classful vs. Classless Addressing

| Topic | Classful | Classless |
|---|---|---|
**| Idea | Fixed network sizes based on class | Flexible network sizes using CIDR |
******| Common defaults | Class A `/8`, Class B `/16`, Class C `/24` | Any prefix length like `/27`, `/30`, `/22` |
**| Efficiency | Wastes addresses more easily | Uses addresses more efficiently |
**| Routing support | Older method | Modern method |

### Classful defaults

| Class | First Octet Range | Default Mask | Prefix |
|---|---|---|---|
***| A | 1-126 | 255.0.0.0 | /8 |
***| B | 128-191 | 255.255.0.0 | /16 |
***| C | 192-223 | 255.255.255.0 | /24 |

**Classless addressing uses CIDR, which lets you subnet based on the number of hosts you actually need.

## 3. Hub vs. Switch vs. Router

| Device | OSI Layer | Main Function | Forwarding Decision | Notes |
|---|---|---|---|---|
****| Hub | Layer 1 | Repeats bits out all ports | None | One collision domain |
*****| Switch | Layer 2 | Forwards frames inside a LAN | Destination MAC | Learns MACs in CAM table |
*****| Router | Layer 3 | Moves packets between networks | Destination IP | Separates broadcast domains |

### Quick definitions

**- A **hub** is a simple repeater. It sends traffic out every port.
***- A **switch** connects devices in a LAN and forwards frames more intelligently than a hub.
***- A **router** connects different networks and chooses the best path for packets.

## 4. Layer 2 Switch vs. Layer 3 Switch

| Feature | Layer 2 Switch | Layer 3 Switch |
|---|---|---|
**| Main job | Switching | Switching and routing |
**| Uses MAC table | Yes | Yes |
**| Uses routing table | No | Yes |
**| Inter-VLAN routing | No | Yes |
**| Common use | Access layer | Distribution/core or advanced access |

***A Layer 3 switch is useful when VLANs need to communicate with each other without sending all routed traffic to an external router.

## 5. IP Addressing Basics

***An IPv4 address is 32 bits long and is usually written in dotted decimal, such as `192.168.1.10`.

### Core parts of an IPv4 address

*- **Network portion**: identifies the network
*- **Host portion**: identifies the device on that network

### Common special IPv4 addresses

| Address / Range | Meaning |
|---|---|
*| `127.0.0.1` | Loopback |
**| `169.254.x.x` | APIPA, often used when DHCP fails |
*| `255.255.255.255` | Local broadcast |
*| `10.0.0.0/8` | Private |
*| `172.16.0.0/12` | Private |
*| `192.168.0.0/16` | Private |

## 6. Subnetting and CIDR Notation

**CIDR means Classless Inter-Domain Routing. It uses slash notation like `/24`.

### What a prefix means

| Prefix | Subnet Mask | Meaning |
|---|---|---|
**| /8 | 255.0.0.0 | First 8 bits are network bits |
**| /16 | 255.255.0.0 | First 16 bits are network bits |
**| /24 | 255.255.255.0 | First 24 bits are network bits |
**| /30 | 255.255.255.252 | Often used on point-to-point links |
**| /0 | 0.0.0.0 | Default route, matches anything |

### What to calculate on subnetting questions

When given an IP and mask, you should be able to find:

* - **Network ID**
* - **Broadcast address**
* - **Subnet mask**
* - **Usable host range**

### Binary subnetting idea

* - Network bits stay the same for every host in that subnet.
* - Host bits vary from all 0s up to all 1s.
* - All 0 host bits gives the **network address**.
* - All 1 host bits gives the **broadcast address**.

## 7. Multicast

| Traffic Type | Meaning |
|---|---|
**| Unicast | One sender to one receiver |
**| Broadcast | One sender to all devices in the local broadcast domain |
**| Multicast | One sender to a selected group |

**Multicast is more efficient than broadcast when only certain devices need the traffic, such as streaming to subscribed receivers.

## 8. DNS

*DNS stands for Domain Name System.

### What DNS does

*- Converts names like `example.com` into IP addresses
*- Helps users avoid memorizing numeric IP addresses

### Key idea

* - Humans like names
* - Networks actually deliver traffic using IP addresses

## 9. DHCP

*DHCP stands for Dynamic Host Configuration Protocol.

### What DHCP provides

* - IP address
* - Subnet mask
* - Default gateway
* - DNS server information

### DORA process

| Step | Meaning |
|---|---|
**| Discover | Client looks for a DHCP server |
**| Offer | Server offers an IP configuration |
**| Request | Client requests that offered address |
**| Acknowledge | Server confirms the lease |

### Important DHCP terms

| Term | Meaning |
|---|---|
*| Lease | How long a device keeps the IP |
*| Scope | Pool of addresses available to hand out |
*| Reservation | A specific device always gets the same IP |

## 10. Messages a Switch Floods

**A switch floods traffic when it does not yet know the exact destination port, or when the traffic is meant for many devices.

### Common flooded traffic

| Message Type | Why It Gets Flooded |
|---|---|
**| ARP request | Broadcast asking who has an IP |
**| DHCP discover | Broadcast from a client looking for a server |
**| Broadcast frames | Intended for every device in the VLAN |
**| Unknown unicast | Destination MAC not yet in CAM table |
**| BPDU | Sent by switches for STP purposes |

*Flooding usually stays inside the same VLAN.

## 11. ARP Table, CAM Table, and Routing Table

| Table | Found On | Stores | Used For |
|---|---|---|---|
***| ARP Table | Hosts and routers | IP-to-MAC mappings | Local delivery on IPv4 networks |
***| CAM Table | Switches | MAC-to-port mappings | Layer 2 forwarding |
****| Routing Table | Routers and Layer 3 switches | Network paths and next hops | Layer 3 forwarding |

### Easy way to remember

* - **ARP table** answers: "What MAC goes with this IP?"
* - **CAM table** answers: "What switch port has this MAC?"
* - **Routing table** answers: "Where do I send this packet next?"

## 12. Serial Cable Settings for Managing a Router or Switch

*When managing a Cisco device through the console port, the classic settings are:

| Setting | Common Value |
|---|---|
*| Speed | 9600 bps |
*| Data bits | 8 |
*| Parity | None |
*| Stop bits | 1 |
*| Flow control | None |

*This is usually remembered as `9600 8N1`.

## 13. STP: Spanning Tree Protocol

**STP prevents Layer 2 loops in networks with redundant links.

### Why STP matters

Without STP, you can get:

* - Broadcast storms
* - Duplicate frames
* - MAC table instability

### Important STP terms

| Term | Meaning |
|---|---|
*| Root bridge | The switch with the best bridge ID |
*| BPDU | Bridge Protocol Data Unit used by STP |
*| Root port | Best path from a non-root switch to the root |
*| Designated port | Forwarding port for a network segment |
*| Blocked port | Port prevented from forwarding to avoid loops |

### STP port states

| State | What It Does |
|---|---|
*| Blocking | Receives BPDUs, does not forward user traffic |
*| Listening | Prepares for forwarding, no MAC learning yet |
*| Learning | Learns MAC addresses, still not forwarding user traffic |
*| Forwarding | Sends and receives normal traffic |
*| Disabled | Administratively down or inactive |

### Common timer facts

| Timer | Default |
|---|---|
*| Hello | 2 seconds |
*| Max age | 20 seconds |
*| Forward delay | 15 seconds |

**Classic STP can take about 50 seconds to fully converge into forwarding.

## 14. VLANs

*VLAN stands for Virtual Local Area Network.

### What a VLAN does

* - Creates a separate broadcast domain at Layer 2
* - Logically separates groups of devices on the same switch hardware

### VLAN facts

| Topic | Notes |
|---|---|
*| Standard | `802.1Q` |
***| Purpose | Segmentation, security, traffic control |
*| Default VLAN | Often VLAN 1 on Cisco switches |
*| Inter-VLAN communication | Requires a Layer 3 device |

## 15. Trunking

*A trunk carries multiple VLANs across one physical link.

### Trunking terms

| Term | Meaning |
|---|---|
*| Access port | Carries one VLAN, usually for end devices |
*| Trunk port | Carries multiple VLANs |
*| `802.1Q` | Standard VLAN tagging protocol |
*| Native VLAN | VLAN sent untagged on a trunk by default |

### Define trunking

***Trunking is the method of sending traffic for multiple VLANs across a single link by tagging frames so the receiving device knows which VLAN each frame belongs to.

## 16. Gateway, Default Route, and Next Hop

These three ideas are closely related and show up often in scenario questions.

| Term | Definition |
|---|---|
*| Default gateway | The router or Layer 3 interface a host uses to reach remote networks |
*| Default route | The route used when no more specific route exists |
*| Next hop | The next router or interface where a packet should be sent |

### More detail

* - A host uses its **default gateway** when the destination is not on the local subnet.
* - A router uses a **default route** when it has no better matching route.
* - A **next hop** is the next stop on the path to the destination.

### IPv4 default route

*`0.0.0.0/0`

*It is sometimes called the **gateway of last resort** on a router.

## 17. Routing and Route Summarization

*Routing is the process of moving packets between different networks.

### Route sources

| Route Type | Meaning |
|---|---|
*| Connected | Added automatically when an interface is configured |
*| Static | Manually entered by an administrator |
*| Dynamic | Learned from routing protocols |

### Route summarization

*Route summarization combines several smaller routes into one larger route.

### Why summarize routes

* - Smaller routing tables
* - Less routing overhead
* - Better scalability

## 18. RIP Version 1 vs. RIP Version 2

| Feature | RIP v1 | RIP v2 |
|---|---|---|
**| Classful or classless | Classful | Classless |
**| Sends subnet mask | No | Yes |
**| Supports VLSM/CIDR | No | Yes |
**| Supports authentication | No | Yes |
**| Broadcast or multicast | Broadcast | Multicast |

**Both are distance-vector routing protocols and both use hop count as the metric.

## 19. OSPF vs. IGRP

| Feature | OSPF | IGRP |
|---|---|---|
**| Type | Link-state | Distance-vector |
**| Standard | Open standard | Cisco proprietary |
**| Modern use | Common and important | Older, largely obsolete |
**| General behavior | Builds a map of the network | Shares route information more traditionally |

**For exam purposes, the biggest idea is that OSPF is a **link-state** protocol and IGRP is a **distance-vector** protocol.

## 20. Distance Vector vs. Link State

| Feature | Distance Vector | Link State |
|---|---|---|
**| What routers share | Route information with neighbors | Link-state information to build a topology map |
**| Network view | Less complete | More complete |
***| Example | RIP, IGRP | OSPF |
**| Convergence | Usually slower | Usually faster |

### Simple memory hook

* - **Distance vector**: "Which direction and how far?"
* - **Link state**: "What does the whole network look like?"

## 21. Situation Questions: How to Think Through Them

**These questions are like network word problems. Slow down and identify the layer and decision point.

### Ask yourself:

*1. Is the destination on the same subnet or a different subnet?
*2. Does the host need the destination MAC or the gateway MAC?
**3. Is the switch making a Layer 2 decision or is a router making a Layer 3 decision?
*4. Is the traffic a unicast, broadcast, or multicast?
**5. Is the problem about VLAN boundaries or routed boundaries?

### Common patterns

| Situation | Likely Answer Pattern |
|---|---|
**| Same subnet | Host ARPs for destination MAC and sends directly |
**| Different subnet | Host ARPs for gateway MAC and sends to default gateway |
**| Unknown MAC on switch | Switch floods the frame in that VLAN |
**| Redundant switch links | STP blocks a path to prevent loops |
**| Different VLANs need to communicate | Use router or Layer 3 switch |

## 22. Fast Final Review

### Must-know definitions

* - **Router**: connects different networks and forwards packets based on IP addresses
* - **Gateway**: device a host uses to reach remote networks
* - **Default route**: catch-all route used when nothing more specific matches
* - **Next hop**: next router or interface in the packet's path
* - **VLAN**: logical Layer 2 broadcast domain
* - **Trunking**: carrying multiple VLANs across one link with tagging

### Must-know comparisons

* - Hub vs. switch vs. router
* - Layer 2 switch vs. Layer 3 switch
* - Classful vs. classless
* - RIP v1 vs. RIP v2
* - OSPF vs. IGRP
* - Distance vector vs. link state

### Must-know processes

* - DHCP DORA
* - STP port states
****- Subnetting: find network ID, broadcast address, mask, and host range
* - VLAN trunking with `802.1Q`

### Last reminder

*If the test gives you a network scenario, identify:

* - the subnet
* - the VLAN
* - the address type being used
* - the table being referenced
* - the device making the forwarding decision
