# 🎯 DHCP Scope

A DHCP scope is the **defined pool of IP addresses** that a DHCP server is authorised to hand out to clients. The admin configures the scope — the server only assigns addresses from within it.

---

## What Is a Scope?

Think of the scope as the DHCP server's inventory. It can only give out what's in stock.

```
DHCP Server configured with scope:
  Start: 192.168.1.100
  End:   192.168.1.200
  ──────────────────────────────────
  Available pool: 101 addresses
  (192.168.1.100 through 192.168.1.200)
```

When a client requests an IP, the server picks the next available address from within this range and assigns it.

---

## What the Admin Configures in a Scope

| Setting | Description | Example |
|---|---|---|
| Start IP | First address in the pool | 192.168.1.100 |
| End IP | Last address in the pool | 192.168.1.200 |
| Subnet Mask | Handed to every client | 255.255.255.0 |
| Default Gateway | Handed to every client | 192.168.1.1 |
| DNS Server | Handed to every client | 8.8.8.8 |
| Lease Duration | How long each IP is valid | 8 hours / 1 day |
| Exclusions | IPs to skip (reserved for static devices) | 192.168.1.150 |

---

## Scope vs the Whole Subnet

The scope does **not** have to cover the entire subnet. An admin can restrict the pool to a specific portion, leaving addresses available for static assignment.

```
Subnet: 192.168.1.0/24  (254 usable addresses)

Static zone:    192.168.1.1  – 192.168.1.99   (servers, printers, routers)
DHCP scope:     192.168.1.100 – 192.168.1.200  (client devices — DHCP handles these)
Unused/reserve: 192.168.1.201 – 192.168.1.254
```

---

## Pool Exhaustion

If all addresses in the scope are currently leased out, new clients receive nothing — they cannot connect.

```
Scope: 192.168.1.100–192.168.1.110  (11 addresses)
Active leases: 11/11

New device connects → ❌ No IP available — scope exhausted
```

This is why lease timers matter — expired leases return addresses to the pool for reuse.

---

## Key Points

- 📌 Scope = the range of IPs the server is allowed to assign
- 📌 Admin sets start/end of the range and all client settings
- 📌 Scope does not need to span the whole subnet
- 📌 Exclusions keep specific IPs out of the pool (for static devices)
- 📌 Pool exhaustion = new clients cannot get an IP
