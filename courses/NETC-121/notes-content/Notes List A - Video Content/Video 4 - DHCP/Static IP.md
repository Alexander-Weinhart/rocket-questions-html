# 🔒 Static IP Addressing

A static IP is an IP address that is **manually configured** on a device and never changes unless someone goes in and changes it by hand. It was the original method of assigning addresses before DHCP existed.

---

## What You Configure Manually

When setting a static IP, four values must be entered manually on every device:

| Setting | Purpose | Example |
|---|---|---|
| IP Address | Unique identifier for this device on the network | 192.168.1.50 |
| Subnet Mask | Defines the network/host boundary | 255.255.255.0 |
| Default Gateway | The router's IP — used for traffic leaving the subnet | 192.168.1.1 |
| DNS Server | Resolves domain names to IPs | 8.8.8.8 |

---

## The Problem at Scale

Manually setting addresses works fine for a handful of devices. For a large network, it becomes a serious problem.

```
100-device network, static only:

IT admin must:
  → Visit or remotely configure each of 100 devices
  → Assign a unique IP to each one (no duplicates allowed)
  → Record every assignment manually
  → Update records every time a device is added, removed, or moved
```

This process is **tedious, error-prone, and doesn't scale**.

---

## The Risk: IP Conflicts

If two devices are accidentally assigned the same IP address, both lose network access.

```
Device A: 192.168.1.50  ┐
                         ├── ❌ IP conflict — both devices go offline
Device B: 192.168.1.50  ┘
```

The network has no automatic way to prevent this with static addressing — it depends entirely on the admin keeping accurate records.

---

## When Static IP Is Still Used

Static addressing is not obsolete. Some devices **should** have a fixed IP:

- Servers (web, file, email) — clients need to reach them at a known address
- Network printers — users need a consistent address to send print jobs
- Routers and switches — managed at known IPs
- Security cameras and IoT devices — often managed by IP

> These are also candidates for **DHCP Reservations** — giving a specific device the same IP automatically via DHCP, combining static predictability with centralised management.

---

## Key Points

- 📌 Manually assigned — does not change automatically
- 📌 Requires: IP, subnet mask, default gateway, DNS
- 📌 Risk: human error leads to IP conflicts → loss of network access
- 📌 Does not scale for large networks
- 📌 Still appropriate for servers, printers, and network infrastructure
