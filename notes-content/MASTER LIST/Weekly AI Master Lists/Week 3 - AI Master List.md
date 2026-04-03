# Week 3 - AI Master List

## Week Scope (from syllabus)
- Topics: Windows CLI, Packet Tracer, TCP/IP
- Lab: subnet, ARP
- Reading: Book 2, Chapter 1
- Videos: 1-3
- Notes folder: Lecture Week 3

## Canonical Concepts (deduplicated)
1. TCP/IP to OSI mapping: TCP/IP Application maps to OSI Application/Presentation/Session.
2. Transport mapping: TCP/IP Transport maps to OSI Transport.
3. Internet mapping: TCP/IP Internet maps to OSI Network.
4. Network access mapping: TCP/IP Network Access maps to OSI Data Link + Physical.
5. ARP process: sends IP query and receives MAC response on local segment.
6. RARP concept: reverse request model from MAC to IP (legacy context).
7. MAC boundary at router: MAC addresses are hop-local and do not traverse subnets end-to-end.
8. Unicast: one sender to one receiver.
9. Multicast: one sender to selected group.
10. Broadcast: one sender to all local hosts using destination MAC `FF:FF:FF:FF:FF:FF`.
11. Ethernet frame structure: destination MAC, source MAC, type/length, payload, FCS.
12. Encapsulation: higher-layer data wrapped by lower-layer headers/trailer for transmission.
13. CRC/FCS role: frame-level corruption detection.
14. CSMA/CD: collision handling model for shared half-duplex Ethernet media.
15. CSMA/CA: collision-avoidance access model used in wireless contexts.
16. ICMP tooling: `ping`, `tracert`, `traceroute` for reachability/path diagnostics.

## Sources Used (Week 3 only)
- `Notes List C - Personal Notes/Lecture Week 3/Week 3 Notes.md`
- `Notes List B - Textbook Content/Textbook 2 - Chapter 1 Protocols and Standards/TCP-IP Protocol Suite.md`
- `Notes List B - Textbook Content/Textbook 2 - Chapter 1 Protocols and Standards/Ethernet Development.md`
- `Notes List A - Video Content/Video 1 - Unicast, Broadcast, Multicast/Unicast.md`
- `Notes List A - Video Content/Video 1 - Unicast, Broadcast, Multicast/Multicast.md`
- `Notes List A - Video Content/Video 1 - Unicast, Broadcast, Multicast/Broadcast.md`
- `Notes List A - Video Content/Video 2 - Ethernet Frame Structure/Frame Fields.md`
- `Notes List A - Video Content/Video 2 - Ethernet Frame Structure/Encapsulation.md`
- `Notes List A - Video Content/Video 2 - Ethernet Frame Structure/CRC Error Detection.md`
- `Notes List A - Video Content/Video 3 - CSMA-CD and CSMA-CA/CSMA-CD.md`
- `Notes List A - Video Content/Video 3 - CSMA-CD and CSMA-CA/CSMA-CA.md`
