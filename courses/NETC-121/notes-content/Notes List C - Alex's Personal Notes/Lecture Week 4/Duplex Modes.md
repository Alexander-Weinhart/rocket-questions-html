# Duplex Modes

## Duplex Basics

- Duplex describes direction and concurrency of communication on a link.

## Simplex

- One-way communication only.
- Data flows in one direction with no return path on that channel.
- Example pattern: sender-only to receiver-only.

## Half-Duplex

- Two-way communication, but not at the same time.
- Devices must take turns transmitting.
- Hubs are half-duplex and rely on shared media behavior.
- Higher chance of collisions in shared Ethernet environments.

## Full-Duplex

- Two-way communication at the same time.
- Send and receive happen simultaneously.
- Switches support full-duplex on modern Ethernet links.
- Benefits: no collision domain on that link, better throughput, and lower retransmission overhead.
