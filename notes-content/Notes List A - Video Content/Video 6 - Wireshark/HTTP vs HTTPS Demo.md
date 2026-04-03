# 🔐 HTTP vs HTTPS in Wireshark

This demo compares capturing **HTTP (unencrypted)** vs **HTTPS (encrypted)** traffic using ox.ac.uk (University of Oxford) as the target site. The difference in what Wireshark can see is dramatic.

---

## Finding the Target IP

Before filtering for the site's traffic, find its IP address using `nslookup`:

```
C:\> nslookup ox.ac.uk
Server:  8.8.8.8
Address: 8.8.8.8

Non-authoritative answer:
Name:    ox.ac.uk
Address: 129.67.242.154
```

Then set Wireshark display filter:
```
ip.dst == 129.67.242.154
```

This shows all traffic being sent to that IP.

---

## HTTP — Cleartext (Bad)

When the site is accessed over plain HTTP (`http://ox.ac.uk`):

```
Wireshark sees:

  GET /staff-login HTTP/1.1
  Host: ox.ac.uk
  ...

  POST /staff-login HTTP/1.1
  Content-Type: application/x-www-form-urlencoded

  username=jsmith&password=mysecretpassword
                            ^^^^^^^^^^^^^^^^
                            fully readable — no encryption
```

Anyone capturing this traffic — on the same network, or via a SPAN port — can read every field of every form submitted.

---

## HTTPS — Encrypted (Safe)

When the same site is accessed over HTTPS (`https://ox.ac.uk`):

```
Wireshark sees:

  TLSv1.3 Record Layer: Application Data
  Encrypted Application Data: 8f3a2c910d...
                               ↑
                         gibberish — TLS encrypted
```

Wireshark can see that a connection exists and roughly how much data is flowing, but **cannot read any of the content**. Credentials, page content, form data — all invisible.

---

## Side-by-Side Comparison

| | HTTP (port 80) | HTTPS (port 443) |
|---|---|---|
| Wireshark can read content | ✅ Yes — fully visible | ❌ No — TLS encrypted |
| Passwords visible | ✅ Yes — plaintext | ❌ No |
| Certificate required | No | Yes (TLS/SSL cert) |
| Safe for login pages | ❌ Never | ✅ Yes |

---

## Key Lessons

> 🔑 Any site that handles logins, forms, or personal data **must** use HTTPS. HTTP is never acceptable for authenticated sessions.

- 📌 HTTP = cleartext — Wireshark reads everything including passwords
- 📌 HTTPS = TLS encrypted — Wireshark sees only gibberish
- 📌 Use `nslookup` to find a site's IP, then filter `ip.dst==x.x.x.x` in Wireshark
- 📌 Even legitimate tools like Wireshark make HTTP a liability on any shared network
