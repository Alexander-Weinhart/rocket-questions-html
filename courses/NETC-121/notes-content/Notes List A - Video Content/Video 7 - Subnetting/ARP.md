# ARP — Address Resolution Protocol

ARP resolves an **IP address** (Layer 3) into a **MAC address** (Layer 2).
A device needs both: the IP tells it *where* to go, the MAC tells it *how* to get there on the local network.

---

## Why ARP Is Needed

```
Device A knows:  "I need to reach 192.168.1.10"
Device A does NOT know:  "What MAC address does 192.168.1.10 have?"

→ ARP finds it.
```

IP packets are wrapped in Ethernet frames for local delivery.
Frames need a destination **MAC address** — ARP is how that MAC is discovered.

---

## How ARP Works

### Step 1 — ARP Request (Broadcast)

Device A broadcasts to **everyone** on the local network:

```
Device A                         All devices on LAN
   │                                     │
   │── ARP Request ──────────────────────► (broadcast to FF:FF:FF:FF:FF:FF)
   │   "Who has 192.168.1.10?             │
   │    Tell 192.168.1.1 (me)"            │
```

- Destination MAC: **FF:FF:FF:FF:FF:FF** (broadcast — every device receives it).
- Source MAC: Device A's own MAC.
- Every device reads the request. Only the one with IP 192.168.1.10 replies.

### Step 2 — ARP Reply (Unicast)

```
Device B (192.168.1.10)          Device A
   │                                │
   │── ARP Reply ───────────────────►│  (unicast directly back)
   │   "192.168.1.10 is at          │
   │    AA:BB:CC:DD:EE:FF"          │
```

- Reply is **unicast** — sent only back to Device A.
- Device A now knows the MAC and can send its frame.

---

## ARP Table (ARP Cache)

After the reply, Device A stores the result locally to avoid repeating ARP every time:

```
IP Address       MAC Address          Type
192.168.1.10     AA:BB:CC:DD:EE:FF   dynamic
192.168.1.1      11:22:33:44:55:66   dynamic
```

- **Dynamic** entries expire after a timeout and are re-learned as needed.
- **Static** entries are manually added and do not expire.
- View on Windows: `arp -a`

---

## Broadcast MAC Address

| Value                  | Meaning                                      |
|------------------------|----------------------------------------------|
| `FF:FF:FF:FF:FF:FF`    | Layer 2 broadcast — all devices on LAN receive it |

- ARP Requests always use this broadcast MAC.
- Broadcasts **do not cross routers** — they are contained to the local subnet.
- At a router boundary, the ARP table entry for the next hop is looked up instead.

---

## RARP — Reverse ARP

RARP does the opposite of ARP:

| Protocol | Sends     | Wants     |
|----------|-----------|-----------|
| ARP      | IP        | MAC       |
| RARP     | MAC       | IP        |

- RARP was used by diskless workstations to discover their own IP at boot.
- Largely replaced by **DHCP** in modern networks.

---

## Key Points

- ARP only works **within a subnet** — MAC addresses do not cross routers.
- At each router hop, a new ARP lookup happens for the next device.
- ARP has no authentication — vulnerable to **ARP spoofing** (attacker sends fake replies to poison the table).
