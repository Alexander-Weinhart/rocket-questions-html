# 🔄 Dynamic IP Addressing (DHCP)

Dynamic IP addressing uses a **DHCP server** to automatically assign IP settings to devices when they connect to the network. No manual configuration required on the client side.

---

## How It Works

When a device is set to "Obtain an IP address automatically," it goes through the **DORA process** to get its settings from a DHCP server:

```
Device                         DHCP Server
  │                                 │
  │── DISCOVER (broadcast) ────────►│   "Anyone out there? I need an IP."
  │◄── OFFER ───────────────────────│   "Here, take 192.168.1.50."
  │── REQUEST (broadcast) ─────────►│   "I'll take 192.168.1.50, confirmed?"
  │◄── ACK ─────────────────────────│   "Confirmed. It's yours for 24 hours."
```

The device receives its full configuration in one automated exchange:
- IP address
- Subnet mask
- Default gateway
- DNS server

---

## Client Configuration

On Windows, the setting that enables DHCP is:

> **"Obtain an IP address automatically"** in network adapter settings

To verify DHCP is active and see the assigned settings, run in Command Prompt:
```
ipconfig /all
```

Look for:
- **DHCP Enabled: Yes**
- **IPv4 Address**
- **DHCP Server** (shows the server's IP)
- **Lease Obtained / Lease Expires** (shows when the IP was assigned and when it expires)

---

## Why Dynamic Is Better for Large Networks

| | Static | Dynamic (DHCP) |
|---|---|---|
| Configuration | Manual on every device | Automatic |
| IP conflict risk | High (human error) | Eliminated (server manages pool) |
| Scalability | Poor | Excellent |
| New device setup | IT must configure | Plug in → works |
| Address tracking | Manual records | Server logs everything |

---

## Key Points

- 📌 Device must be set to **"Obtain IP automatically"**
- 📌 DHCP server assigns: IP, subnet mask, gateway, DNS
- 📌 Verify with `ipconfig /all` — check "DHCP Enabled: Yes"
- 📌 IPs are assigned as **leases** — temporary, renewable
- 📌 Eliminates IP conflicts by centralising address management
