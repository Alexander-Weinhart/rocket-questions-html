# Week 9 - Video 18: Spanning Tree Protocol Explained Step by Step

## Intro

- `STP` stands for `Spanning Tree Protocol`.
- STP is a major topic for switch networking and for the `CCNA`.
- At first, STP can feel complicated, but it follows a strict set of rules.
- Once the rules are understood, STP becomes much more predictable and straightforward.

## Types of STP

The video names several major versions of spanning tree:

- Standard `STP` or `802.1D`
- `PVST`
- `RSTP` or `802.1w`
- `Rapid PVST`

### Standard STP

- `802.1D` is the original STP standard.

### PVST

- `PVST` is Cisco's improvement to STP.
- It adds a per-VLAN spanning tree feature.

### RSTP

- `RSTP` stands for `Rapid Spanning Tree Protocol`.
- `802.1w` is the improved version of STP.
- Its major advantage is much faster convergence.

### Rapid PVST

- `Rapid PVST` is Cisco's version of RSTP with the per-VLAN feature.

### Why Per-VLAN STP Matters

- In large networks with many switches and VLANs, per-VLAN STP can help make the network more efficient.
- Different VLANs can use different spanning tree topologies.
- The video also notes that `PVST` is Cisco's default behavior.

## What STP Does

- STP is used to prevent loops in networks with redundant switch links.
- Redundant links are useful for resiliency, but without STP they can create Layer 2 loops.

### Example Topology

- Three switches are connected to each other.
- Because there is more than one path between switches, a switching loop can form if STP is not used.

## Problems Caused by Switching Loops

The video highlights three major problems caused by loops.

### 1. Broadcast Storms

- Switches flood broadcasts out every port except the one that received the frame.
- Switches also flood unknown unicasts the same way.
- If there is a loop, the same frame keeps circulating.
- Each switch forwards it again and again.
- New broadcasts keep getting added into the loop.
- This creates a `broadcast storm`.
- The storm grows until:
- A switch fails
- Or someone breaks the loop by disconnecting a link or rebooting a switch

### 2. Unstable MAC Address Tables

- A switch learns MAC addresses by observing the source MAC of incoming frames.
- In a loop, the same source MAC can appear on multiple ports repeatedly.
- The switch keeps changing its MAC address table entry from one port to another.
- This causes unstable MAC address tables.

### 3. Duplicate Frames

- If a frame is flooded through multiple looped paths, the destination can receive more than one copy.
- This creates duplicate frames on the network.

## The Basic Solution

- STP solves loop problems by blocking one of the redundant ports.
- The port is not physically disconnected.
- The switch simply places the port into a blocking role/state so that traffic is not forwarded there.
- By preventing the loop, STP eliminates:
- Broadcast storms
- Unstable MAC address tables
- Duplicate frames

## High-Level STP Process

The video gives this five-step overview:

### Step 1. Elect a Root Bridge

- The `root bridge` is the central reference switch in the spanning tree.
- The video describes it as the king or queen of the switches.

### Step 2. Root Bridge Ports Forward

- All interfaces on the root bridge are placed into a forwarding state.

### Step 3. Non-Root Switches Choose a Root Port

- Each non-root switch selects one best path back to the root bridge.
- That best port is called the `root port`.

### Step 4. Other Links Decide Whether They Become Designated Ports

- Links that are not root ports must determine which side becomes the `designated port`.

### Step 5. All Remaining Ports Block

- Any port that is not a root port or designated port is placed into a blocking state.

## Low-Level Concepts: Port Roles and Port States

Before understanding the details of STP, the video says you need to know:

- Port roles
- Port states

## Port Roles

Port roles describe the job of a port in the STP topology.

### Root Port

- The root port is the best port on a non-root switch for reaching the root bridge.

### Designated Port

- A designated port is the port with the best path to the root bridge on a given network segment or link.

### Non-Designated Port

- Any other port that is not chosen as a root port or designated port becomes non-designated.
- These ports end up in a blocking state.

## Port States

Port states describe what the port is currently doing.

### Disabled

- The port is administratively shut down or otherwise disabled.

### Blocking

- The port is blocking traffic.

### Listening

- The port is not forwarding traffic.
- The port is not learning MAC addresses.

### Learning

- The port is still not forwarding traffic.
- The port does begin learning MAC addresses.

### Forwarding

- The port sends and receives traffic normally.

### Transitional States

- `Listening` and `learning` are transitional states.
- Ports enter these states while changing roles and moving toward forwarding.

## Root Bridge Election

### BPDUs

- Switches exchange `BPDUs`.
- `BPDU` stands for `Bridge Protocol Data Unit`.
- The BPDU contains information used by STP to elect the root bridge and make path decisions.

### Bridge ID

- Each switch has a `BID` or `bridge ID`.
- The bridge ID is made of:
- STP priority
- MAC address

### Default Priority

- The default STP priority is `32768` plus the VLAN number.

### Election Rule

- The switch with the lowest overall bridge ID becomes the root bridge.

### How the Election Works

- At first, switches assume they should be the root bridge.
- Each switch advertises itself as root in its BPDU.
- When switches receive superior BPDUs from another switch with a lower BID, they stop claiming root status.
- Eventually, all switches agree on the switch with the lowest BID.

## Root Bridge Behavior

- Once elected, the root bridge has all of its active STP ports in the forwarding state.

## Root Port Selection

- Every non-root switch must choose one root port.
- The root port is the port with the best path to the root bridge.

### Port Cost

- Root port selection is based mainly on `path cost`.
- The video emphasizes:
- The root cost is the total of each outgoing port cost added together on the way to the root bridge.

### Cost Example

- The root bridge advertises a root cost of `0` because it is the root.
- A neighboring switch adds its own outgoing port cost to that value.
- In the example, an outgoing FastEthernet cost of `4` is added to the root cost of `0`, giving a total path cost of `4`.
- If an alternate path adds another cost of `4`, that path becomes `8`.
- The lower total path cost wins.

### Root Port Rule

- The port with the lowest total root path cost becomes the root port.

## Root Port Tie-Breakers

If more than one port has the same root path cost, the video gives these tie-breakers:

### 1. Lowest Neighbor BID

- Prefer the path through the neighbor switch with the lower bridge ID.

### 2. Lowest Neighbor Port Priority

- If the neighbor BID ties, compare the neighbor's port priority.

### 3. Lowest Neighbor Port Number

- If that also ties, compare the actual neighbor port number.

## Designated Port Selection

- Ports on links that are not root ports still need a decision.
- STP chooses a designated port on that segment.

### Designated Port Decision Order

The video gives this order:

### 1. Lowest Root Cost to the Bridge

- The switch with the lower path cost to the root bridge wins designated status for that link.

### 2. Lowest BID

- If the root cost ties, compare bridge IDs.

### 3. Lowest Neighbor Port Priority

- If bridge IDs tie, compare port priority.

### 4. Lowest Neighbor Port Number

- If still tied, compare the actual port number.

## Blocking

- After root ports and designated ports are chosen, every remaining port is placed into a blocking state.
- This is the final step of the STP election process.

## Why STP Questions Are Usually Solvable

- The video emphasizes that STP problems rarely mean STP is broken.
- Usually, you just need to follow the decision rules and determine which choices STP made.

## Convergence

- `Convergence` is the time STP takes to react to a change and become stable again.
- Standard `802.1D` STP was designed when slower convergence was acceptable.
- In modern networks, long outages are a serious problem.
- Voice, IP phones, video calls, and other network-dependent tools make even short interruptions noticeable.

## STP Timers

The video explains three main timers.

### Hello Timer

- Default: `2 seconds`
- This is how often the root bridge sends hello messages.
- These messages let the rest of the network know the spanning tree is still healthy.

### Max Age

- Default: `20 seconds`
- The video describes this as `10 times the hello timer`.
- This is the amount of time a switch waits before deciding something is wrong.

### Forward Delay

- Default: `15 seconds`
- This is the timer used in the listening and learning transitions.

## Port State Movement

### Forwarding to Blocking

- A forwarding port can move directly to blocking.

### Blocking to Forwarding

- A blocked port cannot move straight to forwarding.
- It must pass through:
- Listening
- Learning

### Listening State Details

- In listening, the port does not forward traffic.
- It does not learn MAC addresses.
- The video explains this is done to help prevent loops during the transition.
- By default, the port stays here for `15 seconds`.

### Learning State Details

- In learning, the port still does not forward traffic.
- It does begin learning MAC addresses again.
- By default, it remains here for `15 seconds`.

### Then Forwarding

- After listening and learning, the port can finally move into forwarding.

## Convergence Example

- If the link between two switches goes down, a switch may stop receiving hello messages from the root path.
- It waits for the max age timer to expire.
- Then it must move an alternate blocked link into service.
- But that blocked port cannot forward right away.
- It must spend:
- `15 seconds` in listening
- `15 seconds` in learning

### Total Delay

- `20 seconds` max age
- `15 seconds` listening
- `15 seconds` learning
- Total: `50 seconds`

- The video emphasizes that `50 seconds` is a very long outage in a modern network.

## Why Access Ports Sometimes Take Time to Come Up

- When a computer is connected to a regular switch port, the link may not become usable immediately.
- In labs or Packet Tracer, you may notice a delay before the link turns green.
- That delay happens because STP is moving through listening and learning.

## Improving Convergence

- The video mentions a few ways to improve convergence behavior.

### PortFast

- `PortFast` helps access ports come up faster.
- It is intended for ports connected to end devices such as computers.

### BPDU Guard

- `BPDU Guard` is mentioned as another optional STP-related feature for access ports.

### RSTP as the Better Overall Solution

- The best general solution is to use `RSTP`, the faster spanning tree version.
- The video notes that the core concepts stay mostly the same.
- Only a few basic differences are introduced in Rapid STP.

## Key Takeaways

- STP prevents Layer 2 loops in switched networks with redundant links.
- Without STP, loops cause broadcast storms, unstable MAC tables, and duplicate frames.
- STP works by electing a root bridge, assigning root and designated ports, and blocking all other redundant ports.
- Root bridge election uses the lowest bridge ID.
- Root port and designated port decisions are based first on lowest path cost, then on tie-breakers.
- Standard `802.1D` STP converges slowly because blocked ports must wait through max age, listening, and learning.
- `RSTP` improves convergence significantly.
- `PortFast` and `BPDU Guard` are useful on access ports, but they do not replace STP on the wider switched topology.
