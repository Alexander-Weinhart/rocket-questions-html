# 🎓 Wireshark — Key Lessons

After the Telnet and HTTP/HTTPS demos, the core takeaways on network security and Wireshark's capabilities.

---

## Lesson 1 — Telnet and HTTP Are Password Disasters

Both protocols were designed in an era when networks were small, trusted, and private. That era is gone.

```
Wireshark on any shared network:
  Telnet session   → username and password in plain text ❌
  HTTP login form  → credentials in plain text ❌
  HTTP page data   → full page content readable ❌

  SSH session      → encrypted blob — unreadable ✅
  HTTPS session    → encrypted blob — unreadable ✅
```

Any device on the same network segment — or an attacker who gained access — can capture and read this traffic instantly with zero special tools beyond Wireshark.

---

## Lesson 2 — SPAN and RSPAN for Remote Capture

Wireshark only captures traffic that reaches your NIC directly. On a modern switched network, switches forward traffic only to the relevant port — so your machine won't see other devices' traffic by default.

To capture traffic from **remote devices**, a managed switch can be configured with:

| Feature | What It Does |
|---|---|
| **SPAN** (Switched Port Analyser) | Copies traffic from one or more ports to a monitor port on the same switch |
| **RSPAN** (Remote SPAN) | Copies traffic from ports on a remote switch to your local monitor port across the network |

```
SPAN setup:
  Switch port 1 (target device) ──► mirrored ──► Switch port 24 (your Wireshark PC)
```

Without SPAN/RSPAN, you only see your own traffic — Wireshark can't help you monitor other devices.

---

## Lesson 3 — Modern Practice: HTTPS and SSH

The fix for everything demonstrated in this video is encryption:

| Legacy (insecure) | Modern (secure) | Why |
|---|---|---|
| Telnet | SSH | Entire session encrypted |
| HTTP | HTTPS | TLS encrypts all content |
| FTP | SFTP / FTPS | Encrypted file transfer |

> When SSH or HTTPS is used, Wireshark captures the packets but sees only encrypted data — it is effectively **blind** to the content.

---

## Key Points

- 📌 **Telnet/HTTP = cleartext** — never use for anything sensitive
- 📌 **SPAN/RSPAN** needed to capture traffic from other switch ports
- 📌 **SSH/HTTPS** = Wireshark captures but cannot read content
- 📌 Wireshark is a legitimate admin tool — but demonstrates exactly why encryption is non-negotiable
