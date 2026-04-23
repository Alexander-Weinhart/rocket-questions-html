# Textbook 2, Chapter 7: Windows Network Commands 💻🌐

## Command Quick Reference

### 1. `hostname`
- Displays the computer's host name.
- Use it to quickly identify the local machine name.
- Example:
  - `hostname`

### 2. `arp`
- Views and manages the ARP cache (IP-to-MAC mappings).
- Useful for local network troubleshooting (Layer 2/Layer 3 relationship).
- Common examples:
  - `arp -a` (show ARP table)
  - `arp -d *` (clear entries)

### 3. `ipconfig`
- Shows and manages IP configuration for adapters.
- Common for DHCP troubleshooting and DNS cache actions.
- Common examples:
  - `ipconfig /all` (detailed config)
  - `ipconfig /release` (release DHCP lease)
  - `ipconfig /renew` (request new DHCP lease)
  - `ipconfig /flushdns` (clear DNS resolver cache)

### 4. `nbtstat` (often misheard as "nbstat")
- Displays NetBIOS over TCP/IP stats and name tables.
- Useful in older Windows name-resolution troubleshooting.
- Common examples:
  - `nbtstat -n` (local NetBIOS names)
  - `nbtstat -A <IP>` (remote NetBIOS table by IP)

### 5. `netstat`
- Displays active connections, listening ports, and protocol statistics.
- Useful for checking what services are listening and where traffic is going.
- Common examples:
  - `netstat -ano` (connections + PID)
  - `netstat -an | findstr LISTENING` (list listening sockets)

### 6. `nslookup`
- Queries DNS records from DNS servers.
- Useful for verifying forward and reverse name resolution.
- Common examples:
  - `nslookup www.wiley.com`
  - `nslookup 8.8.8.8`

### 7. `pathping`
- Combines behavior of `ping` + `tracert` with per-hop packet loss analysis.
- Useful for diagnosing where latency/loss appears on a path.
- Example:
  - `pathping www.wiley.com`

### 8. `ping`
- Tests IP reachability and round-trip time using ICMP echo.
- First-line connectivity test.
- Common examples:
  - `ping 8.8.8.8`
  - `ping www.wiley.com`

### 9. `route`
- Displays and edits the local routing table.
- Useful for checking default gateways and route decisions.
- Common examples:
  - `route print` (show route table)
  - `route add 10.10.0.0 mask 255.255.0.0 192.168.1.1`

### 10. `tracert`
- Traces packet path hop-by-hop to a destination.
- Useful for locating where traffic stops or gets delayed.
- Example:
  - `tracert www.wiley.com`

## When to Use Which Tool 🧭
- Name issue? Start with `nslookup`.
- Can’t reach host? Start with `ping`, then `tracert` or `pathping`.
- Wrong IP/gateway/DNS? Use `ipconfig /all`.
- Suspected local LAN mapping issue? Use `arp -a`.
- Suspected service/port issue? Use `netstat -ano`.
- Suspected routing issue? Use `route print`.

## Misconceptions and Common Confusions ⚠️
- **"`ping` failing always means the host is down."**
  - False. ICMP may be blocked by firewalls even when the host is up.

- **"`tracert` shows the exact forward and return path."**
  - False. It only shows observed forward-hop responses and may be incomplete.

- **"`ipconfig /flushdns` fixes all DNS problems."**
  - False. It only clears local DNS cache; upstream DNS issues remain.

- **"`nbtstat` is a modern DNS replacement."**
  - False. It targets NetBIOS over TCP/IP behavior, mostly legacy context.

- **"`netstat` shows application names by default."**
  - False. Use options like `-ano`, then map PID to process.

## Quick Memory Hooks 🧠
- `hostname` = who am I?
- `ipconfig` = what is my IP config?
- `arp` = who has this IP (MAC mapping)?
- `nslookup` = what DNS says?
- `ping` = can I reach it?
- `tracert/pathping` = where does path break/slow?
- `netstat` = what connections/ports exist?
- `route` = how does my PC decide where to send traffic?
