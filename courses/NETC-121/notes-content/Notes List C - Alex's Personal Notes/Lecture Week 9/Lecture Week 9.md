# Lecture Week 9

## Main Topics

- Spanning Tree Protocol (STP)
- BPDU / Bridge Protocol Data Unit
- Root bridge and root port selection
- STP port states and timers
- PortFast
- BPDU Guard
- Power over Ethernet (PoE)
- Port Security

## STP Overview

- Spanning Tree Protocol removes Layer 2 loops in switched networks.
- It is a Layer 2 protocol that helps redundant switch links exist without causing looping traffic.
- When a new device is connected, the switch has to determine whether that connection could create a new root path or a loop.

## BPDU

- `BPDU` stands for `Bridge Protocol Data Unit`.
- BPDUs are how switches share Layer 2 information with each other.
- They are sent as multicast frames every 2 seconds.
- A BPDU contains the switch ID.
- The switch ID is made from the switch priority value and the MAC address.
- Default switch priority is `32768`.
- Switch priority can be changed.

### Example

- If a switch MAC address is `1111.2222.3333`, its switch ID would be `32768-1111-2222-3333`.

## Root Switch

- The root bridge is the switch with the lowest switch ID.
- The root switch makes the Layer 2 loop-prevention decisions.
- During election, all switches calculate the same winning root switch.
- If the topology changes, the election process starts again.
- There is one root switch per LAN.

### Example from the slides

- Switch 1 becomes root because it has the lowest switch ID.
- Example root switch ID: `32768-1111.1111.1111`
- If Switch 3 should become root instead, its priority can be lowered.
- Example modified switch ID: `20000-3333.3333.3333`

## Root Port

- Each non-root switch selects one root port.
- The root port is the port used to reach the root switch.
- Root port selection is based on these tie-breakers:
- Lowest path cost to the root switch
- Lowest neighboring switch ID
- Lowest port priority value
- Lowest physical port number

### Cost reminder

- Cost is inverse to bandwidth.
- Lower cost means higher bandwidth.
- Higher cost means lower bandwidth.

### Example from the slides

- Switch 1: no root port because it is the root.
- Switch 2: port 1 is the root port with cost 4.
- Switch 3: port 2 is the root port with cost 4.
- Switch 4: port 1 becomes the root port because both paths cost 8, so the tie is broken by the lower neighboring switch ID.

## STP Port States

- `Blocking`
- `Listening`
- `Learning`
- `Forwarding`
- `Disabled`

### Blocking

- Lasts 20 seconds.
- Port only listens for and processes BPDUs.
- Other traffic is dropped.
- A port may stay blocked if that is what prevents a loop.

### Listening

- Lasts 15 seconds.
- The switch double-checks topology information.
- The port processes BPDUs only.

### Learning

- Lasts 15 seconds.
- The switch processes BPDUs and updates the CAM table.
- The port still does not forward frames.

### Forwarding

- Normal switch port operation.
- The port forwards user traffic.

### Disabled

- The port is not participating in STP.
- This can happen if it is manually shut down or if nothing is plugged in.

## STP Timers

### Forward Delay Timer

- Controls how long STP waits between listening and learning states.
- Default is 15 seconds.
- It can be changed to reduce STP convergence time.

### Hold-Down Timer

- Used here to describe how long a device remembers the root switch.
- The root switch sends BPDUs every 2 seconds.
- After 3 missed BPDU intervals, the timer reaches 6 seconds and the root is assumed down.
- If that happens, a new root switch election occurs.
- Each received BPDU from the root resets the timer to zero.

## STP Convergence

- Ports can take 50 seconds to move through the full STP process.
- That is why switch ports may stay orange for about 50 seconds when a new device is plugged in.
- During that time, the port will not forward normal traffic.
- `Convergence` means all ports and devices have reached their normal operating state.

## PortFast

### Command

```ios
interface fa 0/1
spanning-tree portfast
```

- PortFast lets a port immediately move to forwarding mode.
- It skips the listening and learning delays.
- It is typically used for edge devices, not for switches or routers.
- If used on the wrong kind of port, it can allow loops to happen.

## BPDU Guard

- BPDU Guard is commonly paired with PortFast.
- It protects access ports that are expected to connect only to end devices.
- If a switch unexpectedly sends a BPDU into that port, the switch treats it as a problem.
- The port is shut down and placed into an error-disabled state.

### Slide scenario

- PortFast and BPDU Guard are enabled on a port on Switch C.
- A computer is removed and Switch D is connected to that same port.
- Switch D sends a BPDU to Switch C.
- Switch C recognizes that it should not receive a BPDU on that PortFast edge port.
- The port is shut down as `error-disabled`.

## Useful Lab Commands

```ios
show spanning-tree
spanning-tree vlan 1 priority 0
show spanning-tree interface fa 0/1
```

- `show spanning-tree` displays most STP information for the switch.
- `spanning-tree vlan 1 priority 0` changes the VLAN 1 priority to `0`.
- STP priority values must be multiples of `4096`.
- `show spanning-tree interface fa 0/1` shows STP details for one interface.

## Power over Ethernet (PoE)

- PoE sends electrical power across the same Ethernet cable that carries data.
- This allows one cable to provide both connectivity and power to a device.
- Devices that commonly use PoE include:
- IP phones
- IP cameras
- Wireless access points
- Door buzzers
- Emergency call boxes
- Power can come from a PoE-capable switch or from a PoE injector.

## Port Security

- Port security limits or controls which MAC addresses are allowed on a switch port.
- It helps prevent unauthorized devices from using the network.
- The slide example showed:
- Access mode on the interface
- Port security enabled
- A maximum allowed MAC count
- A defined violation action
- Optional static MAC assignment
- Sticky MAC learning

### Example commands shown

```ios
interface gigabitethernet 0/5
switchport mode access
switchport port-security
switchport port-security maximum 5
switchport port-security violation protect
switchport port-security mac-address 1234.1234.1234
switchport port-security mac-address sticky
end
```

### Verification command shown

```ios
show port-security interface fa0/20
```
