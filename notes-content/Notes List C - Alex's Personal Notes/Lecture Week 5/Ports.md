# 🔌 Ports

A port is a **16-bit number** (0–65535) in the TCP or UDP header that identifies which **application** on a device should receive incoming data. IP addresses route to the right machine; port numbers route to the right application on that machine.

---

## Why Ports Exist — Port Multiplexing

A single IP address can host many services simultaneously. Without ports, the device wouldn't know whether an incoming packet is for the web server, the email server, or an SSH session.

```
Incoming packet → 192.168.1.50 : 443
                  ─────────────   ───
                  IP address       port
                  (right machine)  (HTTPS — right app)

Same machine, different apps running simultaneously:
  192.168.1.50 : 80   → HTTP server
  192.168.1.50 : 443  → HTTPS server
  192.168.1.50 : 22   → SSH server
  192.168.1.50 : 3389 → RDP server
```

This is **port multiplexing** — one IP address, many simultaneous services, each on its own port.

---

## IP:Port Notation

The standard way to write an IP address and port together:

```
192.168.1.50:80        ← IPv4 : port
10.0.0.1:443
[2001:db8::1]:80       ← IPv6 uses brackets to avoid ambiguity
```

You see this notation in Wireshark, server logs, firewall rules, and browser developer tools.

---

## Port Ranges

| Range | Name | Description |
|---|---|---|
| **0 – 1023** | Well-known ports | Reserved for standard system services; require admin privileges to bind |
| **1024 – 49151** | Registered ports | Assigned by IANA to specific applications (not standard services) |
| **49152 – 65535** | Dynamic / Ephemeral | Randomly assigned by the OS to client connections; temporary |

When your browser connects to a web server, the server listens on port 443 (well-known) and your browser is assigned a random ephemeral port (e.g. 54321) as the source.

```
Your browser:   192.168.1.100 : 54321  → source
Web server:     142.250.80.46 : 443    → destination
```

---

## Common Ports — CompTIA A+ Certification

These are the ports expected for the CompTIA A+ exam:

| Port | Protocol | Service | TCP/UDP |
|---|---|---|---|
| 20 | FTP | File transfer — data channel | TCP |
| 21 | FTP | File transfer — control channel | TCP |
| 22 | SSH | Secure Shell — encrypted remote access | TCP |
| 23 | Telnet | Unencrypted remote access (legacy) | TCP |
| 25 | SMTP | Sending email | TCP |
| 53 | DNS | Domain name resolution | UDP / TCP |
| 67 | DHCP | Server — IP address assignment | UDP |
| 68 | DHCP | Client — IP address assignment | UDP |
| 80 | HTTP | Web (unencrypted) | TCP |
| 110 | POP3 | Receiving email (download and delete) | TCP |
| 143 | IMAP | Receiving email (sync, keep on server) | TCP |
| 161 | SNMP | Network monitoring queries | UDP |
| 162 | SNMP Trap | Network device alerts | UDP |
| 389 | LDAP | Directory services (Active Directory) | TCP |
| 443 | HTTPS | Web (encrypted) | TCP |
| 445 | SMB | Windows file sharing | TCP |
| 3389 | RDP | Remote Desktop Protocol | TCP |

---

## Ports Allow Multiple Connections

Ports don't just separate services — they also allow **multiple simultaneous connections to the same service**.

```
Your browser has 6 tabs open to google.com:

Tab 1:  Your_IP:51000 → Google:443
Tab 2:  Your_IP:51001 → Google:443
Tab 3:  Your_IP:51002 → Google:443
...

Each connection has a unique source port — TCP/IP treats them as separate streams
```

---

## Key Points

- 📌 Port = identifies the **application**, not the machine (IP does that)
- 📌 Written as `IP:port` — e.g. `192.168.1.1:80`
- 📌 **Port multiplexing** = one IP serves many apps simultaneously via different ports
- 📌 Well-known (0–1023) → Registered (1024–49151) → Ephemeral (49152–65535)
- 📌 Know the CompTIA A+ port list: 20/21 FTP, 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP
