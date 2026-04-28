# Week 14 - Video 28: Wireless Fundamentals | Day 55

## Main Idea

This video introduces the foundations of `wireless LANs` (`WLANs`) using `Wi-Fi`, which is based on the `IEEE 802.11` standards.

The main goals are to understand:

- how wireless LANs differ from wired Ethernet LANs
- what `radio frequency` (`RF`) means
- which frequency bands Wi-Fi uses
- why channel selection matters
- how wireless service sets are organized
- what role an access point plays in a mostly wired network

## Wi-Fi and IEEE 802.11

Wireless LAN standards are defined by `IEEE 802.11`, just like wired Ethernet standards are defined by `IEEE 802.3`.

`Wi-Fi` is the common name most people use, but it is technically a trademark of the `Wi-Fi Alliance`, which tests and certifies devices for standards compliance and interoperability.

Important distinction:

- `802.11` is the technical standard
- `Wi-Fi` is the common industry name used for products and wireless LANs

## How Wireless LANs Differ from Wired LANs

Wireless networks behave differently from switched Ethernet networks.

In a switched wired LAN:

- a switch forwards frames only where they need to go
- full-duplex communication is normal
- collisions are generally avoided

In a wireless LAN:

- all devices within range can receive the transmitted signal
- the signal is not confined to a cable
- privacy is a bigger concern
- collisions and interference are more likely

Because of this, wireless traffic inside the LAN should be encrypted. In wired LANs, internal traffic is often left unencrypted, but in wireless LANs nearby devices may be able to capture transmissions.

## CSMA/CA

Wireless LANs use `CSMA/CA`, which stands for `Carrier Sense Multiple Access with Collision Avoidance`.

This is different from `CSMA/CD`, which was used in older wired Ethernet environments.

Basic CSMA/CA idea:

1. A device prepares a frame.
2. It listens to check whether the channel is busy.
3. If the channel is busy, it waits a random amount of time.
4. It listens again.
5. When the channel is free, it transmits.

The goal is to reduce collisions before they happen.

## Wireless Regulations and Coverage Concerns

Wireless communication is regulated. Devices cannot just use any frequency or channel.

The allowed channels can vary by country, but wireless devices are designed around the frequencies defined for 802.11 operation.

Wireless coverage also depends on the environment. Signal quality can be weakened or distorted by several physical effects:

- `absorption`: material absorbs signal energy and weakens it
- `reflection`: the signal bounces off a surface such as metal
- `refraction`: the signal bends when entering a medium where it travels at a different speed
- `diffraction`: the signal bends around an obstacle
- `scattering`: the signal spreads in many directions because of rough or uneven surfaces, dust, or similar materials

These effects matter when placing access points in real buildings.

## Interference

Wireless networks must also deal with `interference`.

Examples of interference sources:

- nearby wireless LANs
- other devices using the same frequency range
- adjacent access points using overlapping channels

Interference reduces performance and weakens the user experience.

## Radio Frequency and Electromagnetic Waves

Wireless communication uses electromagnetic waves.

When alternating current is applied to an antenna, electromagnetic energy propagates outward as waves.

Two important measurements are:

- `amplitude`: the strength of the wave
- `frequency`: the number of cycles per second

Frequency is measured in `hertz` (`Hz`).

Common frequency units:

- `kHz`: thousands of cycles per second
- `MHz`: millions of cycles per second
- `GHz`: billions of cycles per second
- `THz`: trillions of cycles per second

Another useful term is `period`, which is the amount of time required for one complete cycle.

Example:

- if a wave is `4 Hz`, it completes 4 cycles per second
- its period is `0.25 seconds`

## Wi-Fi Frequency Bands

The two main Wi-Fi bands you should know are:

- `2.4 GHz`
- `5 GHz`

The `2.4 GHz` band usually:

- reaches farther in open space
- penetrates walls better
- suffers more interference because many devices use it

The `5 GHz` band usually:

- has less interference
- is easier to plan because of non-overlapping channels
- does not reach as far as 2.4 GHz in many situations

The video also mentions that `Wi-Fi 6` (`802.11ax`) expands into the `6 GHz` range, although the main CCNA focus is still on `2.4 GHz` and `5 GHz`.

## RF Channels

Each wireless band is divided into `channels`.

Devices transmit and receive on one or more channels. In the `2.4 GHz` band, the channels overlap with each other, which creates a planning problem when multiple APs are nearby.

That overlap is why adjacent access points should not use overlapping channels in the same area.

For the `2.4 GHz` band, the important CCNA recommendation is:

- use channels `1`, `6`, and `11`

Those three channels do not overlap in the North American layout and help reduce interference between nearby APs.

The `5 GHz` band is easier to work with because it has non-overlapping channels.

## Access Point Placement

When a building needs large-area wireless coverage, access points should be placed so that:

- coverage areas overlap enough to avoid dead zones
- adjacent APs use different non-overlapping channels

The classic pattern in the `2.4 GHz` band is a `1-6-11` layout arranged like a honeycomb. This provides continuous coverage while minimizing channel interference.

## 802.11 Standards

There are several important `802.11` standards. The video recommends memorizing the standard names, frequency use, and theoretical speeds for the exam.

The most important idea is that different wireless devices may support different generations of Wi-Fi.

Examples mentioned:

- `802.11n` = `Wi-Fi 4`
- `802.11ac` = `Wi-Fi 5`
- `802.11ax` = `Wi-Fi 6`

Theoretical maximum speeds are not the same as real-world speeds. Actual throughput is often much lower because of interference, overhead, distance, and shared medium behavior.

## Service Sets

`802.11` defines different kinds of `service sets`, which are groups of wireless devices.

All devices in a service set share an `SSID`, which stands for `Service Set Identifier`.

The `SSID` is the human-readable network name users see when selecting a wireless network.

Important note:

- an SSID does not have to be unique
- but it is usually best practice to make SSIDs unique so users can identify the right network

## IBSS

`IBSS` means `Independent Basic Service Set`.

This is an ad hoc wireless network in which devices connect directly to each other without using an access point.

Characteristics:

- no AP is required
- devices communicate directly
- useful for quick, limited connections
- not very scalable

## BSS

`BSS` means `Basic Service Set`.

This is an infrastructure service set built around one `AP`.

Characteristics:

- wireless clients connect through the AP
- clients do not communicate directly with each other
- the AP is the central device for the wireless cell

Important related terms:

- `BSSID`: the unique identifier of the AP radio, usually the radio MAC address
- `BSA`: `Basic Service Area`, the physical area where the AP's signal is usable

Difference:

- `BSS` = the group of devices associated through the AP
- `BSA` = the physical coverage area of that AP

## ESS

`ESS` means `Extended Service Set`.

An ESS is created when multiple APs, each with their own BSS, are connected through the wired network and use the same SSID.

Key ESS facts:

- each BSS uses the same `SSID`
- each BSS has a unique `BSSID`
- adjacent APs should use different channels
- clients can move between APs through `roaming`

For roaming to work smoothly, the BSAs should overlap slightly, around `10 to 15 percent`.

## MBSS

`MBSS` means `Mesh Basic Service Set`.

This is used when it is hard to run Ethernet to every AP.

In a mesh network:

- APs provide service to wireless clients
- APs also form a wireless backhaul between each other

Roles mentioned in the video:

- `RAP`: `Root Access Point`, connected to the wired network
- `MAP`: `Mesh Access Point`, connects through the mesh

## Distribution System

In most enterprise environments, the wireless LAN is not isolated. It connects wireless clients into the wired network.

In `802.11`, the wired side is called the `DS`, or `Distribution System`.

A wireless LAN is often mapped to a VLAN on the wired network.

Example idea:

- one SSID maps to `VLAN 10`
- another SSID maps to `VLAN 11`
- the AP connects to the switch using a trunk if multiple VLANs are carried

An AP can also provide multiple BSSs, each with its own SSID and unique BSSID.

## Access Point Operational Modes

The video briefly introduces several AP operating modes.

### Repeater Mode

A repeater extends the range of a wireless network by retransmitting signals.

Important drawback:

- a single-radio repeater using the same channel can reduce effective throughput by about `50%`

Two radios help because one radio can receive and the other can retransmit on a different channel.

### Workgroup Bridge

A `workgroup bridge` connects wired devices to a wireless network by acting as a wireless client of another AP.

This is useful when a wired-only device needs network access but does not have a direct wired path to the switch.

### Outdoor Bridge

An outdoor bridge connects networks across longer distances without a physical cable.

It uses specialized antennas and can be:

- `point-to-point`
- `point-to-multipoint`

## Quiz Takeaways

The quiz at the end reinforces several key facts:

- In `2.4 GHz`, the preferred multi-AP channels are `1`, `6`, and `11`.
- In a mostly wired enterprise, an AP's main purpose is to connect wireless devices to the wired network.
- The most common wireless LAN bands are `2.4 GHz` and `5 GHz`.
- In an `ESS`, each BSS has a unique `BSSID`, and roaming allows smoother movement between APs.
- If one AP provides multiple BSSs, those BSSs can share an SSID, but they must have different BSSIDs.

## Review

- Wireless LANs use `IEEE 802.11`.
- `Wi-Fi` is the common name used for 802.11 wireless networking.
- Wireless networks are shared media, so privacy, collisions, and interference are important concerns.
- `CSMA/CA` is used to avoid collisions in wireless LANs.
- Wi-Fi commonly uses the `2.4 GHz` and `5 GHz` bands.
- In `2.4 GHz`, channels `1`, `6`, and `11` are the key non-overlapping channels to remember.
- `SSID` is the network name users see.
- `BSSID` uniquely identifies an AP radio.
- `IBSS`, `BSS`, `ESS`, and `MBSS` describe different wireless service set designs.
- The AP usually connects wireless clients into the wired `distribution system`.
