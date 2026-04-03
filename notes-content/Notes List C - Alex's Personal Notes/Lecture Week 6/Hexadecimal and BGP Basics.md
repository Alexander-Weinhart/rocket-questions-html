# Hexadecimal and BGP Basics

## Hexadecimal Numbers in Networking

- Hexadecimal (base-16) uses digits `0-9` and letters `A-F`.
- It is compact and maps cleanly to binary (4 bits per hex digit).
- Common networking uses include IPv6 notation, MAC addresses, and protocol analysis/packet inspection tools.

## BGP and Redundancy

- BGP (Border Gateway Protocol) is the primary routing protocol between autonomous systems on the internet.
- It exchanges route reachability information between networks.
- Redundancy use case: organizations can connect to multiple upstream providers, and BGP can select alternate paths if one path fails.
- This improves resiliency and availability for internet connectivity.
