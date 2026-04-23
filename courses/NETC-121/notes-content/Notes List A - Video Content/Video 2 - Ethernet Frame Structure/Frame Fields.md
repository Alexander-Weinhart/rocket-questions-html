# 🗂️ Ethernet Frame Fields

An Ethernet frame is the container that carries data across a local network. Every frame follows a strict field-by-field structure so that receiving devices know exactly how to read it.

---

## Frame Structure (In Order)

```
┌───────────┬──────────────┬────────────┬───────┬──────────────┬─────┐
│ Preamble  │  Dest MAC    │  Src MAC   │ Type  │     Data     │ FCS │
│  8 bytes  │   6 bytes    │  6 bytes   │2 bytes│ 46–1500 bytes│4 b  │
└───────────┴──────────────┴────────────┴───────┴──────────────┴─────┘
```

---

## Field-by-Field Breakdown

### 🔔 Preamble (8 bytes)
- A fixed pattern of alternating 1s and 0s sent before every frame.
- Purpose: wakes up the receiver's hardware and **synchronizes clocks** between sender and receiver.
- The last byte is the **Start Frame Delimiter (SFD)** — signals "the actual frame starts now."
- The receiver does not pass the preamble up to higher layers.

### 📬 Destination MAC Address (6 bytes)
- The MAC address of the **intended recipient** of this frame.
- The receiving NIC checks this field — if it matches its own MAC (or is a broadcast), it processes the frame. Otherwise, it discards it.
- Can be a unicast, multicast, or broadcast (`FF-FF-FF-FF-FF-FF`) address.

### 📤 Source MAC Address (6 bytes)
- The MAC address of the **device that sent** this frame.
- Switches use this to learn which MAC address lives on which port and build their MAC address tables.

### 🏷️ Type / EtherType Field (2 bytes)
- Identifies which **Layer 3 protocol** is carried inside the data field.

| Value | Protocol |
|---|---|
| `0x0800` | IPv4 |
| `0x86DD` | IPv6 |
| `0x0806` | ARP |

The receiving device reads this to know how to hand the payload off to the correct upper-layer protocol.

### 📦 Data Field (46–1500 bytes)
- The actual payload — the **IP packet** being carried across the local network.
- Minimum 46 bytes: if the IP packet is smaller, padding is added to meet the minimum frame size.
- Maximum 1500 bytes: this is the **MTU (Maximum Transmission Unit)** for standard Ethernet.
- Data larger than 1500 bytes must be fragmented into multiple frames.

### 🔒 FCS — Frame Check Sequence (4 bytes)
- Contains a **CRC (Cyclic Redundancy Check)** value calculated over the entire frame.
- Used for error detection — see the CRC Error Detection file for full detail.

---

## Key Numbers to Remember

| Field | Size |
|---|---|
| Destination MAC | 6 bytes |
| Source MAC | 6 bytes |
| Type | 2 bytes |
| Data (MTU) | 46–1500 bytes |
| FCS | 4 bytes |
