# 📡 Ethernet Development

Ethernet is the dominant wired networking technology. It didn't arrive fully formed — it evolved over decades from a shared-cable experiment into the multi-gigabit standard running in virtually every wired network today.

---

## Origin

- Invented at **Xerox PARC** (Palo Alto Research Center) in the **1970s**
- Created by **Robert Metcalfe** and colleagues
- Designed to connect workstations to printers and each other on a local network
- The name "Ethernet" comes from the concept of a transmission medium ("ether") shared by all devices

---

## Standardisation

- Formalised as **IEEE 802.3** in 1983
- IEEE (Institute of Electrical and Electronics Engineers) maintains and updates the standard
- Standardisation meant any manufacturer could build compatible Ethernet hardware — creating the massive interoperability ecosystem that exists today

---

## Speed Evolution

| Generation | Standard | Speed | Cable |
|---|---|---|---|
| Original Ethernet | 10BASE-T | 10 Mbps | Cat3 UTP |
| Fast Ethernet | 100BASE-TX | 100 Mbps | Cat5 UTP |
| Gigabit Ethernet | 1000BASE-T | 1,000 Mbps (1 Gbps) | Cat5e/Cat6 |
| 10 Gigabit | 10GBASE-T | 10,000 Mbps (10 Gbps) | Cat6a |
| 40/100 Gigabit | 40GBASE / 100GBASE | 40–100 Gbps | Fibre / DAC |

```
1970s         1990s       1999        2006       Today
  │             │           │           │           │
10 Mbps ──► 100 Mbps ──► 1 Gbps ──► 10 Gbps ──► 100 Gbps+
```

---

## Understanding the Naming Convention

`1000BASE-T` breaks down as:

| Part | Meaning |
|---|---|
| `1000` | Speed in Mbps |
| `BASE` | Baseband transmission (signal uses full bandwidth) |
| `T` | Medium: T = twisted pair copper, F = fibre, X = special encoding |

---

## Key Points

- 📌 Invented at **Xerox PARC in the 1970s**
- 📌 Standardised as **IEEE 802.3**
- 📌 Original speed: **10 Mbps** (10BASE-T)
- 📌 Fast Ethernet: **100 Mbps** (100BASE-TX)
- 📌 Gigabit Ethernet: **1000 Mbps / 1 Gbps** (1000BASE-T)
- 📌 Each generation is backwards-compatible with the previous
