# Wireless Networking

#NOTE THIS WEEK'S LECTURE IS NOT ON THE EXAM. This week's lecture is available in Hard mode on the practice quiz, because it's not in the scope of this class.

## Main Idea

Week 14 is a broad wireless networking overview.

The main idea is that wireless networking uses radio signals instead of copper or fiber cabling. That makes mobility possible, but it also creates problems wired networks do not have:

- signal strength changes with distance
- walls and objects weaken signals
- other devices can cause interference
- anyone nearby may be able to detect the wireless network
- security matters because the physical boundary is no longer just the cable

Wireless networking includes Wi-Fi, Bluetooth, WiMAX, Zigbee, Z-Wave, NFC, point-to-point microwave links, and cellular networks such as 3G, 4G, and 5G.

## Wireless Network Terms

| Term | Meaning |
|---|---|
| SSID | The wireless network name that clients see when scanning for Wi-Fi networks |
| AP | Access Point; the device that provides wireless access to a wired or routed network |
| WNIC | Wireless Network Interface Card; the wireless adapter in a laptop, phone, or other client |
| Associate | The process where a client connects to an access point |
| Probe | A wireless request sent by a client while looking for available or known networks |
| WLAN | Wireless Local Area Network |

## SSID

SSID stands for Service Set Identifier. In normal speech, it is the Wi-Fi network name.

Example fictional SSIDs:

```text
Classroom-WiFi
Guest-Lab
CoffeeShop-Demo
```

The SSID helps clients identify which wireless network they want to join.

An SSID can be broadcast, meaning clients can see it in the list of nearby Wi-Fi networks. An SSID can also be hidden, but hiding the SSID is not real security. A hidden SSID can still be discovered by someone watching wireless traffic.

The important security point is this:

- SSID hiding is obscurity.
- WPA2 or WPA3 encryption is actual protection.

## Access Points

A wireless access point is the device that lets wireless clients join a network.

In a small home network, the access point is often built into the same box as the router, switch, firewall, and DHCP server.

In a business or campus network, access points are often separate devices mounted on ceilings or walls. Those APs connect back to switches, often using Ethernet and Power over Ethernet.

An AP usually handles:

- broadcasting one or more SSIDs
- accepting client associations
- sending and receiving wireless frames
- bridging wireless clients into the wired network
- applying wireless security settings

## Association

Association is the process of a wireless client joining an access point.

Basic flow:

1. The client scans for wireless networks.
2. The client chooses an SSID.
3. The client authenticates, if authentication is required.
4. The client associates with the AP.
5. The client receives network settings, often through DHCP.
6. The client can communicate on the network.

Association is a Layer 2 wireless process. Getting an IP address afterward is a Layer 3 configuration step.

## Probes

A probe is a wireless request used during scanning.

There are two common ideas:

- Passive scanning: the client listens for beacon frames from APs.
- Active scanning: the client sends probe requests looking for networks.

Probe requests can ask:

- "What networks are nearby?"
- "Is this specific known network nearby?"

That second version is why wireless clients can leak information about previously joined network names. Modern operating systems try to reduce this behavior, but the concept still matters.

## Wireless Technologies

Wireless is not only Wi-Fi.

| Technology | Common Use |
|---|---|
| Wi-Fi | Local wireless networking in homes, schools, and businesses |
| Bluetooth | Short-range device connections such as headphones, keyboards, mice, and phones |
| WiMAX | Metropolitan wireless broadband; less common today than it once was |
| Zigbee | Low-power IoT and automation devices |
| Z-Wave | Smart home and automation devices |
| NFC | Very short-range communication, such as tap-to-pay style interactions |
| Point-to-point microwave | Building-to-building wireless links |
| Cellular 3G, 4G, 5G | Wide-area mobile data service |

The big difference is range, bandwidth, power usage, and purpose.

Wi-Fi is usually for local network access. Bluetooth and NFC are short-range personal or device-to-device technologies. Cellular is wide-area provider networking.

## The FCC

In the United States, the FCC regulates radio frequency use.

FCC stands for Federal Communications Commission.

Wireless devices transmit energy over radio frequencies. If everyone transmitted on any frequency at any power level, wireless communication would become chaos soup. Delicious? No. Useful? Also no.

The FCC helps define:

- which frequency ranges can be used
- what power levels are allowed
- which bands are licensed or unlicensed
- rules for avoiding harmful interference

Wi-Fi commonly operates in unlicensed frequency bands. Unlicensed does not mean "no rules." It means users do not need an individual FCC license to operate normal compliant Wi-Fi equipment.

## Wireless Channels

A wireless channel is a smaller slice of a frequency band.

Instead of every AP transmitting over the whole band at once, Wi-Fi divides the band into channels.

In the 2.4 GHz Wi-Fi band, the common non-overlapping channels in the United States are:

```text
1, 6, and 11
```

Those channels are spaced far enough apart that they usually do not overlap.

If nearby APs use overlapping channels, they interfere with each other more. For example, placing APs on channels 1, 2, and 3 is usually worse than using 1, 6, and 11.

The 5 GHz and 6 GHz bands have more available channels, which helps reduce congestion.

## Wi-Fi

Wi-Fi originally comes from a branding play on "Hi-Fi," which means high-fidelity audio.

In modern use, Wi-Fi usually means a WLAN based on IEEE 802.11 standards.

Older usage often made people think mainly of 2.4 GHz networks. Modern Wi-Fi can use:

- 2.4 GHz
- 5 GHz
- 6 GHz, with newer Wi-Fi generations and compatible hardware

## 2.4 GHz vs 5 GHz vs 6 GHz

| Band | Strengths | Weaknesses |
|---|---|---|
| 2.4 GHz | Longer range, better wall penetration, older device support | Crowded, fewer non-overlapping channels, lower speeds |
| 5 GHz | Faster, more channels, less crowded than 2.4 GHz | Shorter range, weaker wall penetration |
| 6 GHz | Very wide channel availability, high performance, less legacy congestion | Requires newer devices, shorter range than 2.4 GHz |

Simple memory trick:

- 2.4 GHz reaches farther but is crowded.
- 5 GHz is faster but fades sooner.
- 6 GHz gives more room for newer high-performance Wi-Fi.

## Types of Wireless Access

Wireless access can be configured in several ways.

| Type | Meaning |
|---|---|
| Ad-hoc | Wireless clients connect directly to each other without a central AP |
| Infrastructure | Clients connect through an access point |
| Open | No wireless encryption or password |
| Captive portal | Browser-based sign-in or acceptance page after joining |
| WEP | Old and insecure wireless encryption |
| WPA | Replacement for WEP; also old now |
| WPA2-PSK | Common password-based Wi-Fi security |
| WPA2-EAP | Enterprise authentication using 802.1X/EAP |
| WPA3 | Newer Wi-Fi security standard |

## Ad-hoc Wireless

Ad-hoc wireless means devices connect directly to each other instead of connecting through an AP.

Example:

- Laptop A talks directly to Laptop B.
- There is no central access point.
- The devices form a temporary peer-to-peer wireless network.

Ad-hoc mode is less common in normal enterprise Wi-Fi. Infrastructure mode, where clients connect to APs, is the standard design for homes, schools, and businesses.

## Open Wireless

An open wireless network does not use wireless encryption.

That means joining the network may not require a password. It also means wireless traffic can be easier to observe.

Open networks are sometimes used for:

- guest Wi-Fi
- public hotspots
- temporary event networks

Open wireless should not be treated as private. If a network is open, users should rely on secure applications such as HTTPS, VPNs where appropriate, and proper endpoint protections.

## Captive Portal

A captive portal is the web page that appears after joining some guest networks.

It might ask the user to:

- accept terms
- enter a voucher code
- sign in with an account
- provide payment or registration details

Important distinction:

A captive portal is not the same thing as wireless encryption. A network can have a captive portal and still be open at the Wi-Fi encryption layer.

## WEP

WEP stands for Wired Equivalent Privacy.

WEP is obsolete and insecure.

It was intended to protect wireless traffic, but it has serious design weaknesses. WEP keys can be cracked quickly with common tools, so WEP should not be used for real networks.

Exam-style takeaway:

```text
WEP = old, broken, do not use
```

## WPA

WPA stands for Wi-Fi Protected Access.

WPA was introduced as a replacement for WEP. It improved wireless security, but it was also transitional.

WPA is better than WEP, but modern networks should use WPA2 or WPA3 when possible.

## WPA2-PSK

WPA2-PSK is common in homes and small networks.

PSK stands for Pre-Shared Key. In plain language, this is the shared Wi-Fi password.

All users connecting to that SSID use the same shared password.

Advantages:

- easy to configure
- widely supported
- good enough for many home and small-office networks if the password is strong

Weaknesses:

- everyone shares the same password
- if one person should lose access, the whole Wi-Fi password may need to change
- password strength matters a lot

## WPA2-EAP

WPA2-EAP is more common in enterprise networks.

EAP stands for Extensible Authentication Protocol.

Instead of one shared password for everyone, users or devices authenticate individually. WPA2-EAP is commonly used with 802.1X and a RADIUS server.

Why this is useful:

- each user can have separate credentials
- access can be removed for one user without changing the whole Wi-Fi password
- certificates or stronger authentication methods can be used
- logs can show which account or device authenticated

WPA2-EAP is more complex than WPA2-PSK, but it scales better for organizations.

## More on EAP

EAP is not one single login method. It is a framework that supports multiple authentication methods.

Examples include:

- EAP-TLS, which uses certificates
- PEAP, which creates a protected tunnel for authentication
- EAP-TTLS, another tunneled authentication method

For this class, the key idea is:

```text
EAP supports enterprise-style wireless authentication.
```

## WPA3

WPA3 is the newer generation of Wi-Fi security.

Important improvements include:

- stronger password-based authentication for personal networks
- better protection against offline password guessing
- improved security for open networks through newer optional features
- stronger cryptographic requirements

WPA3-Personal uses SAE, which stands for Simultaneous Authentication of Equals.

In normal study terms:

```text
WPA3 is the modern replacement for WPA2 when devices support it.
```

## Wireless Access Points vs Wireless Controllers

Small wireless networks can run with standalone APs.

In larger networks, many APs may be managed by a wireless controller.

## Wireless Access Point

A standalone AP can be configured directly. It may handle its own SSIDs, channels, transmit power, and security settings.

This is simple for a small network but becomes annoying when there are many APs.

Imagine configuring 80 APs one by one. That is not networking. That is a keyboard endurance sport.

## Wireless Controller

A wireless controller centrally manages multiple APs.

The controller can help with:

- SSID configuration
- security settings
- channel planning
- transmit power control
- roaming behavior
- firmware management
- monitoring connected clients

In controller-based wireless, the APs are often called lightweight APs because much of the management is handled centrally.

Some modern systems use cloud-managed wireless controllers instead of a physical on-site controller.

## 802.11 Standards

Wi-Fi standards are part of the IEEE 802.11 family.

| Standard | Common Name | Band | Notes |
|---|---|---|---|
| 802.11b | Wi-Fi 1 style era | 2.4 GHz | Older, slow, long range compared with later standards |
| 802.11a | Wi-Fi 2 style era | 5 GHz | Older 5 GHz standard |
| 802.11g | Wi-Fi 3 style era | 2.4 GHz | Faster than 802.11b |
| 802.11n | Wi-Fi 4 | 2.4 and/or 5 GHz | Introduced MIMO improvements |
| 802.11ac | Wi-Fi 5 | 5 GHz | Higher throughput, wider channels, beamforming |
| 802.11ax | Wi-Fi 6 / Wi-Fi 6E | 2.4, 5, and 6 GHz for 6E | OFDMA and improved multi-user performance |

The lecture notes specifically mention 802.11b, 802.11n, 802.11ac, and 802.11ax.

## 802.11b

802.11b is an older Wi-Fi standard that uses the 2.4 GHz band.

It is slow compared with modern Wi-Fi, but it helped make Wi-Fi common.

Main study point:

```text
802.11b = old 2.4 GHz Wi-Fi
```

## 802.11n

802.11n is also known as Wi-Fi 4.

It improved wireless performance and introduced wider use of MIMO.

802.11n can operate in 2.4 GHz and 5 GHz, depending on device support and configuration.

## MIMO

MIMO stands for Multiple Input, Multiple Output.

MIMO uses multiple antennas to send and receive multiple signal streams.

Instead of one antenna doing all the work, multiple antennas can improve:

- throughput
- reliability
- performance in environments with reflections

MIMO is one reason newer wireless standards can provide much better performance than older ones.

## 802.11ac

802.11ac is also known as Wi-Fi 5.

It focuses on 5 GHz wireless and offers higher throughput than 802.11n.

Important features include:

- wider channels
- higher speeds
- beamforming
- multi-user improvements in later versions

## Beamforming

Beamforming is a technique where the AP focuses wireless energy toward a client instead of radiating equally in every direction.

It does not create a magical laser beam. It adjusts antenna signal patterns to improve communication with a specific client.

Beamforming can improve:

- signal quality
- performance
- reliability

It works best when both the AP and client support it.

## 802.11ax

802.11ax is also known as Wi-Fi 6. Wi-Fi 6E extends Wi-Fi 6 into the 6 GHz band.

802.11ax is designed not only for higher top speeds, but also for better performance when many devices are connected.

Important features include:

- OFDMA
- improved MU-MIMO
- better efficiency in crowded wireless environments

## OFDMA

OFDMA stands for Orthogonal Frequency Division Multiple Access.

The basic idea is that a channel can be divided into smaller resource units so multiple clients can be served more efficiently.

Analogy:

Older Wi-Fi is like one person using the whole checkout counter at a time.

OFDMA is like dividing the counter into smaller stations so multiple smaller transactions can happen efficiently.

OFDMA is especially useful when many devices are sending smaller amounts of data.

## MU-MIMO

MU-MIMO stands for Multi-User Multiple Input, Multiple Output.

Traditional MIMO helps one client at a time use multiple streams. MU-MIMO lets an AP communicate with multiple clients more efficiently.

MU-MIMO helps most in networks with many compatible clients.

## Signals and Channels

Wireless communication depends on radio signals.

Important signal concepts:

- frequency
- channel
- bandwidth
- signal strength
- noise
- interference
- signal-to-noise ratio

A wireless network can have a strong signal but still perform poorly if there is too much noise or interference.

## FHSS

FHSS stands for Frequency-Hopping Spread Spectrum.

With FHSS, the signal hops between different frequencies in a pattern.

The pattern is pseudo-random, meaning it appears random but is actually generated in a controlled way so the communicating devices can follow the same sequence.

FHSS can help reduce the impact of interference because the communication does not stay on one frequency the whole time.

## Pseudo-Random Sequences

A pseudo-random sequence is generated by an algorithm.

It is not truly random, because devices need to reproduce the same pattern. But to an outside observer, it may look random unless they know how it is generated.

In spread spectrum communication, pseudo-random sequences can help devices coordinate frequency changes or spreading behavior.

## DSSS

DSSS stands for Direct-Sequence Spread Spectrum.

DSSS spreads the signal across a wider frequency range using a spreading code.

The receiver uses the same code to interpret the signal.

Older 802.11b Wi-Fi used DSSS-related techniques.

## Interference

Interference is unwanted signal energy that makes communication harder.

Common sources of wireless interference include:

- other Wi-Fi networks
- Bluetooth devices
- cordless phones
- microwave ovens
- physical obstacles
- poorly planned AP channel overlap

## Microwave Ovens

Microwave ovens can interfere with 2.4 GHz Wi-Fi because they operate near the same general frequency range.

This does not mean a microwave oven is a Wi-Fi device. It means the energy leakage and noise around that frequency range can disrupt nearby wireless communication.

If Wi-Fi gets worse when a microwave is running nearby, especially on 2.4 GHz, interference is a reasonable suspect.

## Omnidirectional vs Directional Antennas

Antennas shape how wireless signal energy is sent and received.

## Omnidirectional Antennas

An omnidirectional antenna radiates signal in all horizontal directions.

This is common for general Wi-Fi coverage.

Use cases:

- classrooms
- offices
- homes
- general indoor coverage

Simple idea:

```text
Omnidirectional = spread coverage around the AP
```

## Directional Antennas

A directional antenna focuses signal in a specific direction.

Use cases:

- building-to-building links
- covering a long hallway
- aiming wireless coverage at a specific area
- reducing signal in unwanted directions

Simple idea:

```text
Directional = focus coverage where it is needed
```

## Power

Transmit power affects how strongly a wireless device sends its signal.

More power is not always better.

Too much transmit power can cause:

- more interference
- larger cells than intended
- sticky client problems, where clients stay connected to a farther AP
- unbalanced communication if the AP can shout farther than the client can reply

Good wireless design balances power, channel use, AP placement, and client density.

## Gain

Antenna gain describes how an antenna focuses energy in a direction compared with a reference antenna.

Higher gain does not create extra power from nowhere. It reshapes where the signal goes.

Think of a flashlight:

- a bare bulb spreads light everywhere
- a focused flashlight sends light farther in one direction

Directional antennas often have higher gain because they focus energy into a narrower area.

## Decibels and Gain

Wireless power and gain are often measured in decibels.

Common units:

| Unit | Meaning |
|---|---|
| dB | Relative difference between two signal levels |
| dBm | Power level compared to 1 milliwatt |
| dBi | Antenna gain compared to an ideal isotropic antenna |

Decibels are logarithmic, not linear.

Useful rules of thumb:

- +3 dB is roughly double the power
- -3 dB is roughly half the power
- +10 dB is roughly ten times the power
- -10 dB is roughly one tenth the power

## Signal and Noise

Signal is the wireless transmission you want.

Noise is unwanted energy that makes the wanted signal harder to understand.

Examples of noise:

- nearby wireless devices
- electrical interference
- overlapping channels
- radio frequency interference

A strong signal is good, but the receiver also needs the signal to be clearly distinguishable from the noise.

## SNR

SNR stands for Signal-to-Noise Ratio.

SNR compares the wanted signal level to the noise level.

Higher SNR is better.

Example:

```text
Signal: -55 dBm
Noise:  -90 dBm
SNR:     35 dB
```

That is a much better situation than:

```text
Signal: -75 dBm
Noise:  -85 dBm
SNR:     10 dB
```

The second example has less separation between the signal and the noise, so communication is more likely to be slow or unreliable.

## Wireless Troubleshooting Ideas

When wireless is not working well, check:

- Is the client associated with the correct SSID?
- Is the client getting an IP address?
- Is the issue signal strength, authentication, DHCP, DNS, or routing?
- Is the client too far from the AP?
- Are there walls, metal, or other obstacles?
- Are nearby APs using overlapping channels?
- Is there 2.4 GHz interference from other devices?
- Are the AP and client using compatible standards?
- Is the security mode supported by the client?
- Is the controller reporting AP or client errors?

Wireless problems often feel mysterious because the cable is invisible. The trick is to separate the problem into layers:

- radio signal
- association
- authentication
- IP addressing
- name resolution
- routing
- application access

## Quick Comparison: Personal vs Enterprise Wi-Fi Security

| Feature | WPA2-PSK | WPA2-EAP |
|---|---|---|
| Common location | Home/small office | Business/campus |
| Login style | Shared password | Individual user/device authentication |
| Backend server | Usually none | Often RADIUS |
| Easier to set up | Yes | No |
| Easier to manage at scale | No | Yes |
| Best for | Small environments | Organizations |

## Study Takeaways

- Wireless networking uses radio signals, so signal quality and interference matter.
- SSID is the wireless network name.
- AP means access point.
- A client associates with an AP before normal network communication.
- Wi-Fi is based on IEEE 802.11 standards.
- 2.4 GHz usually reaches farther but is more crowded.
- 5 GHz and 6 GHz can provide more channels and higher performance.
- WEP is obsolete and insecure.
- WPA2-PSK uses a shared password.
- WPA2-EAP is enterprise-style authentication.
- WPA3 is the newer wireless security standard.
- Wireless controllers centrally manage multiple APs.
- MIMO uses multiple antennas.
- Beamforming focuses signal toward a client.
- OFDMA and MU-MIMO improve performance for many-client environments.
- Interference can come from other Wi-Fi networks, devices, obstacles, and microwave ovens.
- Directional antennas focus signal; omnidirectional antennas spread signal around.
- SNR compares wanted signal to background noise, and higher SNR is better.
