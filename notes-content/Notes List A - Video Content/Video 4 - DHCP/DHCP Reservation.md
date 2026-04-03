# 📌 DHCP Reservation

A DHCP reservation ties a **specific MAC address** to a **specific IP address** on the DHCP server. Every time that device connects, it always receives the same IP — automatically, with no manual configuration on the device itself.

---

## The Problem It Solves

Some devices need a consistent, predictable IP address — but you still want DHCP managing it centrally rather than configuring each device by hand.

A reservation gives you the best of both worlds:
- ✅ Device always gets the same IP (like static)
- ✅ Configuration is centralised on the server (like dynamic)
- ✅ No manual IP configuration on the device itself

---

## How It Works

The DHCP server keeps a reservation table. When a device sends a DHCP Discover, the server checks whether the device's MAC address has a reservation.

```
Device MAC: AA:BB:CC:DD:EE:FF connects and sends DISCOVER

DHCP Server reservation table:
  AA:BB:CC:DD:EE:FF → always give 192.168.1.50

Server responds with OFFER: 192.168.1.50
→ Device always gets 192.168.1.50, every single time ✅
```

---

## Reserved vs Regular Lease

| | Regular Lease | Reservation |
|---|---|---|
| IP assigned | Next available from pool | Specific pre-assigned IP |
| Consistent IP | No — may change | Yes — always the same |
| Configured on | Server (pool) | Server (per MAC address) |
| Device setup | "Obtain automatically" | "Obtain automatically" |

Both are DHCP — the device doesn't know the difference. The server handles it.

---

## What Devices Typically Get Reservations

| Device | Why |
|---|---|
| Network printer | Users need a fixed address to print to |
| File server | Clients need a known IP to connect to shares |
| Security cameras | VMS software connects to cameras at fixed IPs |
| Network switches / access points | Managed at consistent IPs by admin |
| Routers (internal interfaces) | Routing rules reference specific IPs |

> Regular workstations and laptops generally do **not** need reservations — a dynamic lease is fine because users don't connect to them by IP.

---

## Key Points

- 📌 Ties a specific **MAC address** to a specific **IP address**
- 📌 Device is still set to "Obtain IP automatically" — DHCP handles it
- 📌 Configured on the **server**, not the device
- 📌 Used for printers, servers, cameras, network infrastructure
- 📌 Combines predictability of static with central management of DHCP
