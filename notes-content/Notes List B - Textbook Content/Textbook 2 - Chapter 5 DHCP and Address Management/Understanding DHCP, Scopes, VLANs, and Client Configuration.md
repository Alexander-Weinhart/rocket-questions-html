# Textbook 2, Chapter 5: DHCP and Address Management 📡

## Core Terms and Concepts

### 1. Understanding DHCP
- **DHCP (Dynamic Host Configuration Protocol)** automatically assigns IP configuration to clients.
- Instead of manually setting every device, DHCP centralizes and automates addressing.
- DHCP reduces configuration errors and speeds up onboarding.

### 2. Configuration Info DHCP Provides 🧾
- IPv4 address
- Subnet mask
- Default gateway
- DNS server addresses
- Lease duration
- Optional values (domain name, NTP server, PXE/boot options, etc.)

### 3. DHCP Servers and Where They Live 🖥️
- Dedicated Windows/Linux server
- Integrated service on routers/firewalls
- Virtual machine in a data center
- Cloud-managed network appliance
- Layer 3 switch (in some enterprise designs)

## How DHCP Works

### 4. DORA Process 🤝
- **D**iscover: client broadcasts to find DHCP servers.
- **O**ffer: server offers an available IP and options.
- **R**equest: client requests one specific offer.
- **A**cknowledge: server confirms lease and settings.

### 5. DHCP Timing and Lease Lifecycle ⏱️
- A lease is temporary ownership of an IP.
- Client typically attempts renewal around 50% of lease time (T1), then rebind later if needed (T2).
- If lease expires and renewal fails, client must stop using that address.

## Scopes, Subnets, and VLANs

### 6. Understanding Scopes 🎯
- A **scope** is a pool/range of addresses a DHCP server can hand out for one subnet.
- Scope includes:
  - Start and end IP range
  - Subnet mask/prefix
  - Exclusions (addresses not handed out)
  - Lease duration
  - DHCP options (gateway, DNS, etc.)
  - Reservations (fixed IP by MAC)

### 7. Subnets and DHCP 🧩
- One subnet generally maps to one DHCP scope.
- Clients must receive an address valid for their local subnet.
- Router interfaces (default gateways) separate subnets.

### 8. VLANs and DHCP 🏢
- A VLAN is a logical Layer 2 segmentation.
- Each VLAN usually corresponds to a distinct IP subnet.
- Each VLAN/subnet needs DHCP availability via:
  - Local DHCP server in that VLAN, or
  - DHCP relay (IP helper) forwarding requests to central server.

## Lease Duration Strategy

### 9. How Long Should Leases Be? 📅
- **Short leases** (hours to a day): good for high-churn networks (guest Wi-Fi, labs).
- **Long leases** (days to weeks): good for stable office endpoints.
- Tradeoff:
  - Too short -> more DHCP traffic.
  - Too long -> slower recovery of unused addresses.

## Working with a DHCP Server (Admin Tasks) 🛠️

### 10. Common DHCP Admin Tasks
- Create/activate scopes
- Configure exclusions and reservations
- Set DHCP options (gateway, DNS)
- Monitor lease usage and conflicts
- Authorize DHCP server (in AD environments)
- Back up and restore DHCP configuration

## Windows Server 2025 Scope Configuration

### 11. Typical Scope Setup Flow (Conceptual)
1. Install DHCP Server role.
2. Authorize server in Active Directory (if domain-joined).
3. Open DHCP management console.
4. Create **New Scope** with name/description.
5. Set IP range and subnet mask (or prefix length).
6. Add exclusions and/or delay settings.
7. Set lease duration.
8. Configure scope options:
   - Router (default gateway)
   - DNS servers
   - DNS domain name
9. Activate scope.
10. Validate by obtaining leases from a test client.

## Configure a Windows DHCP Client

### 12. GUI Method (Windows Client) 🪟
1. Open adapter properties.
2. Open `Internet Protocol Version 4 (TCP/IPv4)`.
3. Set:
   - `Obtain an IP address automatically`
   - `Obtain DNS server address automatically`
4. Disable/re-enable adapter or renew lease.

### 13. Command-Line Checks and Actions (`ipconfig`) 💻
- View current configuration:
  - `ipconfig /all`
- Release current DHCP lease:
  - `ipconfig /release`
- Request a new lease:
  - `ipconfig /renew`
- Refresh DNS client cache (common support step):
  - `ipconfig /flushdns`

## Automatic Private IP Addressing (APIPA)

### 14. What APIPA Means 🚨
- If no DHCP server responds, Windows can self-assign an APIPA address in `169.254.0.0/16`.
- APIPA allows limited local-link communication only.
- APIPA does **not** provide normal routed network/Internet access.

## NAT, Public Uniqueness, and DHCP Context 🌐

### 15. How This Connects to Public Internet Access
- DHCP often hands out **private IPs** internally.
- Internet-bound traffic is typically translated by NAT to one/few public IPs.
- Public IPs must be globally unique on the Internet.

## Misconceptions and Common Confusions ⚠️

- **"DHCP only gives an IP address."**
  - False. It can provide gateway, DNS, lease time, and many other options.

- **"One scope can serve any subnet without routing help."**
  - False. Broadcast discover traffic does not cross routers unless relay is configured.

- **"VLANs don’t affect DHCP design."**
  - False. Each VLAN/subnet usually needs its own scope and gateway/relay path.

- **"APIPA means DHCP worked."**
  - False. APIPA usually indicates DHCP failure/unreachability.

- **"`ipconfig /release` permanently deletes network settings."**
  - False. It releases current lease only; `/renew` requests a new one.

- **"NAT and DHCP are the same service."**
  - False. DHCP assigns internal config; NAT translates addresses at network boundaries.

## Quick Memory Hooks 🧠
- DHCP = automatic address + options.
- DORA = Discover, Offer, Request, Acknowledge.
- Scope = address pool for one subnet.
- VLAN = segmentation that usually maps to separate subnets/scopes.
- Lease duration = balance churn vs efficiency.
- APIPA = fallback when DHCP is unreachable.
