# STP - Spanning Tree Protocol

## Why STP Exists

- STP is used to avoid Layer 2 loops in switched networks.
- Redundant links are still useful because they provide failover if one link goes down.
- STP keeps redundancy but prevents loops by placing some ports into a blocking role.

## What Happens Without STP

- Broadcast storms can flood the network.
- Duplicate frames can circulate repeatedly.
- MAC address tables can become unstable (MAC flapping), causing traffic delivery issues.

## BPDU (Bridge Protocol Data Unit)

- BPDUs are control frames switches use to build and maintain the STP topology.
- Hello BPDUs are sent every 2 seconds by default.
- BPDUs are still exchanged on blocked ports so switches can detect topology changes.

## STP Bridge ID (BID)

- Bridge ID is 8 bytes total.
- 2 bytes are the bridge priority (0-65535), default 32768.
- 6 bytes are the switch MAC address.
- The lowest Bridge ID wins root bridge election.
- If priorities tie, the lower MAC address wins.

## MAC Address Reminder

- The first 3 bytes of a MAC address identify the vendor (OUI).
- Example Cisco prefix: `00-11-BB`.

## Hello BPDU Fields

- Root Bridge ID.
- Sender's Bridge ID.
- Root path cost (cost from sender to root).
- Timer values.

## STP Timers

- Hello timer: time between BPDUs, default 2 sec, range 1-10 sec.
- Forward delay: time spent in listening and learning states, default 15 sec, range 4-30 sec.
- Max age: how long BPDU info is kept before aging out, default 20 sec, range 6-40 sec.
- Forward delay timer: controls how long a port remains in listening and learning before forwarding (15 sec per state by default in classic STP).
- Hold-down timer: temporary delay used to keep a port from changing state too quickly after a topology change, helping reduce instability.

## Default Bridge ID with VLANs

- With VLAN-based STP, VLAN ID is added as the extended system ID.
- VLAN 1 adds `+1` to the default priority value.
- For this class, default value used for VLAN 1 is `32768 + 1 = 32769`.

## STP Path (Route) Cost Values

- 10 Mb/s = 100
- 100 Mb/s = 19
- 1 Gb/s = 4

Lower total cost to the root is preferred.

## Root Switch (Root Bridge)

- The root switch is the switch with the lowest Bridge ID.
- If Bridge IDs tie on priority, lowest MAC address becomes root.

## Root Port

- Every non-root switch selects one root port.
- The root port is the port with the lowest-cost path to the root switch.

## Designated Port

- Each Layer 2 segment elects one designated port.
- The designated port is the one with the best (lowest-cost) path to the root on that segment.
- Designated ports forward normal traffic.

## Blocked Ports

- Blocked ports do not forward regular data traffic.
- Blocked ports still receive and process BPDUs.
- If topology changes, a blocked port can transition to forwarding.

## STP Port States

- Blocking
- Listening
- Learning
- Forwarding
- Disabled

Default classic STP transition timing to reach forwarding is 50 seconds:

- Blocking: 20 seconds (max age)
- Listening: 15 seconds (forward delay)
- Learning: 15 seconds (forward delay)
- Total: `20 + 15 + 15 = 50 seconds`

### Blocking

- Receives BPDUs and helps prevent loops.
- Does not forward user traffic.
- Does not learn MAC addresses from user traffic.

### Listening

- Transitional state while STP determines topology.
- Sends and receives BPDUs.
- Does not forward user traffic.
- Does not learn MAC addresses yet.

### Learning

- Transitional state after listening.
- Switch begins learning MAC addresses and populating the MAC table.
- Still does not forward user traffic.

### Forwarding

- Normal active state for traffic flow.
- Forwards user traffic.
- Learns MAC addresses.
- Sends and receives BPDUs.

### Disabled

- Port is administratively shut down or otherwise inactive.
- Does not forward traffic, learn MAC addresses, or participate in STP on that port.

## Spanning-Tree PortFast (Cisco IOS)

- PortFast is used on edge/access ports connected to end devices (PCs, printers, phones), not other switches.
- It lets a port move to forwarding immediately instead of waiting through normal STP listening/learning delays.
- This helps end devices get network access faster (for example, DHCP clients at boot).

### Important Safety Rule

- Do not enable PortFast on switch-to-switch links.
- Best practice is to pair PortFast with BPDU Guard so the port is shut down if a BPDU is received.

### IOS Commands

Enable PortFast on one interface:

```ios
conf t
interface f0/10
spanning-tree portfast
end
```

Enable PortFast by default on access ports:

```ios
conf t
spanning-tree portfast default
end
```

Recommended BPDU Guard with PortFast:

```ios
conf t
spanning-tree portfast bpduguard default
end
```

Verify:

```ios
show spanning-tree interface f0/10 detail
show running-config interface f0/10
```

## BPDU Guard (Cisco IOS)

- BPDU Guard protects the STP topology on edge ports.
- If a PortFast-enabled access port receives a BPDU, the switch assumes an unexpected switch is connected.
- The port is placed into `err-disabled` state to stop a possible loop.

### Why It Matters

- Prevents accidental or unauthorized switch connections on user-facing ports.
- Reduces risk of topology changes and broadcast storms caused by edge-port misuse.
- Best practice: use BPDU Guard together with PortFast on access ports.

### IOS Commands

Enable globally for all PortFast ports:

```ios
conf t
spanning-tree portfast bpduguard default
end
```

Enable on a specific interface:

```ios
conf t
interface f0/10
spanning-tree bpduguard enable
end
```

Verify:

```ios
show spanning-tree summary
show running-config interface f0/10
show interfaces status err-disabled
```

### Recovery from Err-Disabled

- Manual recovery:

```ios
conf t
interface f0/10
shutdown
no shutdown
end
```

- Optional automatic recovery timer:

```ios
conf t
errdisable recovery cause bpduguard
errdisable recovery interval 300
end
```

## STP Decision Process (Simplified)

1. Elect the root bridge (lowest Bridge ID).
2. Each non-root switch chooses one root port (lowest path cost to root).
3. Each segment chooses one designated port.
4. Remaining redundant ports are blocked.

## Tie-Breaking Summary

- Lowest bridge priority wins first.
- If tied, lowest MAC address wins.
- For port role decisions, lowest path cost wins first, then bridge/port IDs are used as tie-breakers.

## Example 1: Root Election

- SW1 BID: `32769:00-11-BB-00-00-10`
- SW2 BID: `32769:00-11-BB-00-00-20`
- Result: SW1 becomes root because priorities are equal and SW1 has the lower MAC.

## Example 2: Root Port Selection on a Non-Root Switch

- A non-root switch has two uplinks toward the root.
- Link A total path cost to root is 4.
- Link B total path cost to root is 19.
- Result: Link A is selected as the root port; Link B is placed in blocking (unless needed after a failure).

## Quick Exam Checks

- STP prevents Layer 2 loops while keeping redundancy.
- Lowest Bridge ID is the key root election rule.
- Blocked ports are not dead; they still participate in STP control traffic.
