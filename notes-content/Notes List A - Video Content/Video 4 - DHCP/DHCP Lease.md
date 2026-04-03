# ⏳ DHCP Lease

A DHCP lease is a **temporary assignment** of an IP address. The client doesn't own the IP — it borrows it for a set period of time. When the lease expires, the address returns to the pool for someone else to use.

---

## Why Leases Exist

Without leases, every IP handed out would be permanently consumed. Devices that leave the network (laptops unplugged, phones that walked out the door) would hold their addresses forever, slowly exhausting the pool.

```
Without leases:
  100-address scope, 100 devices assigned IPs
  50 devices leave the network permanently
  → 50 addresses locked forever, pool half-dead ❌

With leases:
  Those 50 devices' IPs expire after the lease duration
  → Addresses return to pool, available for new devices ✅
```

---

## Lease Lifecycle

```
Client                              DHCP Server
  │                                      │
  │──── DISCOVER ───────────────────────►│
  │◄─── OFFER (IP + lease duration) ─────│
  │──── REQUEST ────────────────────────►│
  │◄─── ACK (lease starts) ──────────────│
  │                                      │
  │     [using 192.168.1.50 for 24h]     │
  │                                      │
  │  at 50% of lease: renew attempt      │
  │──── REQUEST (renew same IP) ────────►│
  │◄─── ACK (lease reset to full) ───────│
  │                                      │
  │  if renewal fails at 87.5%:          │
  │  client broadcasts for any server    │
  │  if still no response → IP released  │
```

---

## Lease Duration — Tradeoffs

| Short Lease | Long Lease |
|---|---|
| IPs return to pool faster | IPs stay assigned longer |
| Better for high-turnover environments (cafés, airports) | Better for stable environments (offices) |
| More DHCP traffic (frequent renewals) | Less DHCP traffic |
| Client gets a new IP more often | Client keeps same IP longer |

**Typical lease durations:**
- Home networks: 24 hours – 7 days
- Enterprise: 8 hours (devices change desks, VLANs)
- Public hotspots: 1–4 hours (rapid turnover)

---

## Demo Scenario (from video)

A scope with only 3 addresses is demonstrated:

```
Scope: 192.168.1.1, 192.168.1.2, 192.168.1.3

3 devices connect → all 3 IPs leased out
Admin removes 2 devices from network

Without waiting: pool appears full (leases still active)
After lease expires: 2 IPs return to pool → new device can connect ✅
```

---

## Key Points

- 📌 An IP lease is **temporary** — not a permanent assignment
- 📌 Client attempts renewal at ~50% of the lease duration
- 📌 Expired leases **return the IP to the pool** for reuse
- 📌 Prevents pool exhaustion from disconnected/departed devices
- 📌 Lease duration is set by the admin in the scope configuration
