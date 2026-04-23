# 🖥️ DHCP Service Locations

DHCP is a service — something that has to be **running somewhere** on the network. Where it runs depends on the size and type of the network.

---

## Option 1 — Dedicated Server (Enterprise)

Large networks run DHCP as a service on a **dedicated server** — either Windows Server or Linux.

```
Corporate network:

[Windows Server / Linux]
  └── DHCP Service running
       └── Manages multiple scopes
            ├── VLAN 10: 10.10.10.0/24
            ├── VLAN 20: 10.10.20.0/24
            └── VLAN 30: 10.10.30.0/24
```

**Advantages:**
- Centralised management of all scopes across the entire organisation
- Full logging and audit trail of every lease
- Supports advanced features (failover, split scopes, policies)
- Can serve multiple subnets/VLANs from one server using **DHCP relay agents**

**Common platforms:**
- Windows Server (DHCP Server role)
- Linux (ISC DHCP / Kea)

---

## Option 2 — Built Into the Router (SOHO / Small Business)

For home networks and small offices, DHCP runs directly on the **router or gateway device**. No separate server needed.

```
Home network:

[ISP Modem/Router]
  └── DHCP service built in
       └── Scope: 192.168.1.100 – 192.168.1.254
            ├── Phone    → 192.168.1.101
            ├── Laptop   → 192.168.1.102
            └── TV       → 192.168.1.103
```

**Advantages:**
- Zero additional hardware required
- Works out of the box — no configuration needed for basic use
- Sufficient for 1–50 devices

**Limitations:**
- Limited scope options
- No advanced enterprise features
- Single point of failure

---

## DHCP Relay — Crossing Network Boundaries

DHCP discovery uses broadcast, and broadcasts don't cross routers. On segmented networks, a **DHCP relay agent** (also called an IP helper) forwards the broadcast as a unicast to the DHCP server on another subnet.

```
Client (VLAN 10) ──broadcast──► Relay Agent (router) ──unicast──► DHCP Server
                                 (ip helper-address configured)
```

---

## Key Points

- 📌 **Enterprise:** runs as a role on Windows Server or Linux — handles multiple subnets
- 📌 **SOHO/Home:** built into the router — simple, automatic, limited
- 📌 DHCP Relay allows one server to serve clients across multiple subnets
- 📌 The service location is transparent to the client — DORA process is the same either way
