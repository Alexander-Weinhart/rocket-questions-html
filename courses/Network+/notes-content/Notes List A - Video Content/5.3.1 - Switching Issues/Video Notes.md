# [5.3.1 - Switching Issues](https://www.youtube.com/watch?v=rUONzfO11m8)

## 5.3.1 - Switching Issues

- Day: Day 10
- Duration: 9:58

## Overview

as you're probably aware at the MAC address level there's no mechanism for counting how many times a frame might be seen on a network for that reason we have to be very careful that we don't create a loop on our switch Network because those frames will continue to Circle and circle and circle around that Network until you unplug one of those connections that's one of the reasons that it's so important to have spanning tree enabled on your network so that any potential Loop could be stopped before that traffic starts looping obviously switches forward traffic based on the destination Mac address that's inside of a frame so every unicast packet has a single destination on where that packet

## Core Ideas

- as you're probably aware at the MAC address level there's no mechanism for counting how many times a frame might be seen on a network for that reason we have to be very careful that we don't create a loop on our switch Network because those frames will continue to
- Circle and circle and circle around that Network until you unplug one of those connections that's one of the reasons that it's so important to have spanning tree enabled on your network so that any potential Loop could be stopped before that traffic starts looping obviously
- switches forward traffic based on the destination Mac address that's inside of a frame so every unicast packet has a single destination on where that packet should be heading there are some packets that are sent to multiple devices on the network simultaneously broadcasts and
- multicasts are a very good example of a single frame that can go into a switch and that single frame can be transmitted out every other interface on that switch with I P we have a time to live field this time to live field prevents any particular packet from circling

## What to Remember

- Switching behavior, MAC-based forwarding, and local network segmentation

## Exam Connections

- Be ready for questions about recognizing the purpose of the technology, where it fits in the network, and how to troubleshoot it in exam scenarios.

## Key Takeaways

- protocol is the bridge protocol data
- seen on a network for that reason we
- of a root bridge this root bridge is
- create a loop on our switch Network
- switches forward traffic based on the
