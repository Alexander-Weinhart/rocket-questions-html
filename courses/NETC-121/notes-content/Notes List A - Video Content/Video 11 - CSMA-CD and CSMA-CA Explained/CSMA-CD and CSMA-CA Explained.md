# Video 11 - [CSMA/CD and CSMA/CA Explained](https://www.youtube.com/watch?v=iKn0GzF5-IU)

## Overview

Both `CSMA/CD` and `CSMA/CA` are methods for managing shared access to a communication medium. They solve a similar problem in different environments.

| Method | Full Name | Main Environment |
| --- | --- | --- |
| CSMA/CD | Carrier Sense Multiple Access with Collision Detection | Older shared wired Ethernet |
| CSMA/CA | Carrier Sense Multiple Access with Collision Avoidance | Wi-Fi |

## Why Shared Media Needs Rules

If multiple devices try to send at the same time on a shared medium, their transmissions can interfere with each other. Access methods reduce or manage that conflict.

## CSMA/CD

CSMA/CD is tied to legacy Ethernet environments where multiple devices shared one collision domain.

### Basic Process

1. Listen for an idle medium.
2. Transmit if it is free.
3. Detect whether a collision happens.
4. Stop, send a jam signal, wait a random time, and retry.

| CSMA/CD Trait | Meaning |
| --- | --- |
| Carrier Sense | Listen before sending |
| Multiple Access | Many devices use the same medium |
| Collision Detection | Detect a clash after it starts |
| Random backoff | Wait a random time before retrying |

### Modern Relevance

Modern switched full-duplex Ethernet largely removed collisions, so CSMA/CD is mostly historical now.

## CSMA/CA

Wi-Fi cannot reliably detect collisions while transmitting, so it tries to avoid them before they happen.

### Basic Process

1. Listen to see whether the wireless medium is busy.
2. If idle, wait a random backoff time and send.
3. Expect an acknowledgment (`ACK`).
4. If no ACK returns, assume loss or collision and retry with a larger contention window.

| CSMA/CA Trait | Meaning |
| --- | --- |
| Carrier Sense | Listen before sending |
| Collision Avoidance | Reduce chance of overlap before transmission |
| ACK-based confirmation | Success is confirmed by acknowledgment |
| Contention window | Random wait range before transmission |

## Side-by-Side Comparison

| Feature | CSMA/CD | CSMA/CA |
| --- | --- | --- |
| Medium | Shared wired Ethernet | Wireless LANs |
| Strategy | Detect after collision | Avoid before collision |
| ACK required | No | Yes |
| Collision handling | Jam signal and backoff | Missing ACK triggers retry |

## Key Takeaways

- CSMA/CD belongs to legacy shared Ethernet.
- CSMA/CA is used by Wi-Fi.
- CD reacts after collisions; CA tries to prevent them first.
- Modern switched Ethernet reduced the importance of CSMA/CD, but CSMA/CA remains important in wireless networking.
