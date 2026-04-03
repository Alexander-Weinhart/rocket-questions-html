# Week 5 - AI Master List

## Week Scope (from syllabus)
- Topics: DHCP, DNS
- Lab: mapped drive, Packet Tracer, intro switch CLI
- Reading: Book 2, Chapters 5 and 6
- Videos: 7-9
- Notes folder: Lecture Week 5

## Canonical Concepts (deduplicated)
1. Subnetting objective: segment networks to control broadcast scope and improve address efficiency.
2. Classful baseline: A/B/C defaults as historical foundation for subnet logic.
3. Network/host boundary: subnet mask and prefix split determine network ID vs host space.
4. Network address rule: host bits all 0 represent subnet identifier.
5. Broadcast address rule: host bits all 1 represent one-to-all delivery in subnet.
6. Usable host math: `2^n - 2` model for assignable hosts in subnet.
7. Binary place-value math: octet conversion between binary and decimal for subnet calculations.
8. CIDR model: classless prefix-length notation enables flexible subnet sizing.
9. Public vs private IPv4: routable internet space vs RFC1918 internal ranges.
10. NAT purpose: private-to-public translation for internet access.
11. ARP operations: resolve local destination MAC for IPv4 communication.
12. Packet header essentials: TTL, protocol field, addressing, and fragmentation controls.
13. Datagram behavior: independent packet forwarding and possible out-of-order arrival.
14. Port model: TCP/UDP port numbers identify application endpoints.
15. Common service ports: protocol-to-port mapping for troubleshooting and filtering.
16. TCP behavior: reliable sequencing, ACK-driven retransmission, and handshake control.
17. UDP behavior: connectionless low-overhead delivery with no reliability guarantees.
18. Encapsulation chain: application data wrapped through transport, network, and data-link layers.
19. Error detection methods: checksum (transport/header) and CRC/FCS (frame integrity).
20. DNS functional model: records, zones, resolver behavior, and lookup workflows.

## Sources Used (Week 5 only)
- `Notes List C - Personal Notes/Lecture Week 5/Packet Headers and Transmission.md`
- `Notes List C - Personal Notes/Lecture Week 5/Ports.md`
- `Notes List C - Personal Notes/Lecture Week 5/Application Layer Protocols.md`
- `Notes List C - Personal Notes/Lecture Week 5/UDP vs TCP.md`
- `Notes List C - Personal Notes/Lecture Week 5/Packets, Frames, and Collisions.md`
- `Notes List C - Personal Notes/Lecture Week 5/ALOHA.md`
- `Notes List C - Personal Notes/Lecture Week 5/TCP - Flags, Handshake, and DDOS.md`
- `Notes List C - Personal Notes/Lecture Week 5/OSI Encapsulation Table.md`
- `Notes List C - Personal Notes/Lecture Week 5/Error Detection - Checksum and CRC.md`
- `Notes List B - Textbook Content/Textbook 2 - Chapter 5 DHCP and Address Management/Understanding DHCP, Scopes, VLANs, and Client Configuration.md`
- `Notes List B - Textbook Content/Textbook 2 - Chapter 6 DNS and Name Resolution/DNS, Queries, Zones, and Resource Records.md`
- `Notes List A - Video Content/Video 7 - Subnetting/Subnetting.md`
- `Notes List A - Video Content/Video 7 - Subnetting/ARP.md`
- `Notes List A - Video Content/Video 8 - Binary Math and Subnetting/Binary Math.md`
- `Notes List A - Video Content/Video 8 - Binary Math and Subnetting/Subnetting.md`
- `Notes List A - Video Content/Video 9 - CIDR and IP Addressing/CIDR.md`
- `Notes List A - Video Content/Video 9 - CIDR and IP Addressing/Public and Private IP Addresses.md`
- `Notes List A - Video Content/Video 9 - CIDR and IP Addressing/DARPANET.md`
