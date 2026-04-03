# DHCP and DORA

## DHCP (Dynamic Host Configuration Protocol)

- DHCP automatically assigns IP settings to devices so manual configuration is not needed.
- It can assign IP address, subnet mask, default gateway, and DNS servers.
- DHCP can be used during boot procedures so a new device can join the network quickly.
- DHCP can also provide vendor-specific options for certain device types (for example phones, APs, or vendor management settings).

## Dynamic vs Static Addressing

- Dynamic: address is assigned automatically by DHCP from an available pool.
- Static: address is manually set and does not change unless edited.
- Practical use: dynamic is best for most client devices, while static is common for servers, routers, printers, and infrastructure devices.

## Scope

- A DHCP scope is the address pool and settings a DHCP server can hand out for a subnet.
- A scope typically includes start/end IP range, subnet mask, lease duration, exclusions, and reservations.
- A DHCP scope is tied to one subnet/broadcast domain.

## IP Reservations

- Reservation means one specific device always gets the same IP from DHCP.
- The server maps the device MAC address to a fixed IP.
- This gives stable addressing while still being centrally managed by DHCP.

## IP Lease Timers

- A lease is the amount of time a device can keep an IP address.
- Shorter leases are better for high-turnover networks (guest Wi-Fi, labs) but create slightly more DHCP traffic.
- Longer leases reduce DHCP chatter but can keep stale addresses longer if devices disappear.

## DORA Process

1. Discover: client broadcasts to find DHCP servers.
2. Offer: server offers an available IP and options.
3. Request: client requests one specific offered lease.
4. Acknowledge: server confirms and finalizes the lease.

## Why DORA Matters

- DORA standardizes safe, controlled IP assignment.
- It prevents duplicate addressing and simplifies client onboarding.
