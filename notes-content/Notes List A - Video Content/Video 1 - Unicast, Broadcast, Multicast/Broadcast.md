# 📢 Broadcast — One-to-All Communication

Broadcast sends a single packet to **every device** on the local network simultaneously. No one is left out — if you're on the network segment, you receive it.

---

## How It Works

The sender uses a special destination MAC address that every network device is programmed to listen for and accept.

```
Sender ──► [Broadcast: FF-FF-FF-FF-FF-FF]
               │
               ├──► Device A  ✅
               ├──► Device B  ✅
               ├──► Device C  ✅
               └──► Device D  ✅
```

---

## The Broadcast MAC Address

| Field | Value |
|---|---|
| Destination MAC | `FF-FF-FF-FF-FF-FF` |
| Meaning | Every device on this network segment must receive this frame |

Every NIC (Network Interface Card) is hardwired to accept frames addressed to `FF-FF-FF-FF-FF-FF` regardless of its own MAC address.

---

## What Broadcast Is Used For

### ARP (Address Resolution Protocol)
When a device knows an IP address but needs the matching MAC address, it broadcasts to the whole network:
> "Who has 192.168.1.10? Tell me your MAC address."

Only the device with that IP responds — everyone else ignores it after reading.

### DHCP Discovery
When a new device joins a network and has no IP yet, it can't address anyone directly. It broadcasts:
> "Is there a DHCP server out there? I need an IP address."

---

## Broadcast Boundaries — Routers Stop Broadcasts

Broadcasts are **contained within a single network segment**. Routers do not forward them.

```
Network A                │  Network B
──────────────────────   │  ──────────────────────
Device 1 ◄── broadcast   │  Device 4  ← never sees it
Device 2 ◄── broadcast   │  Device 5  ← never sees it
Device 3 ◄── broadcast   │
                      Router (blocks broadcast)
```

This is intentional — if broadcasts crossed routers, a single message could flood the entire internet.

---

## IPv6 and Broadcast

> ⚠️ IPv6 **removed broadcast entirely**. Instead, IPv6 uses targeted **multicast** groups to accomplish the same tasks (like neighbor discovery). This reduces unnecessary traffic on large networks.

---

## Key Properties

- 📌 Destination MAC: `FF-FF-FF-FF-FF-FF`
- 📌 Scope: local network segment only — stopped by routers
- 📌 Common uses: ARP requests, DHCP discovery
- 📌 Every device on the segment must process the frame, even if unrelated
- 📌 Too many broadcasts = **broadcast storm** — can degrade network performance
