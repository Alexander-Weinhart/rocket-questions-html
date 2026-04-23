# 🦈 Wireshark — Download and Install (Windows 10)

Wireshark is a free, open-source **packet analyser** (also called a network sniffer). It captures all network traffic passing through your NIC and lets you inspect every packet in detail — protocol, source, destination, payload, and more.

---

## Download

1. Go to **wireshark.org**
2. Click **Windows 64-bit Installer**
3. Save the `.exe` and run it

---

## Installation Options

| Component | What It Is | Install? |
|---|---|---|
| Wireshark (GUI) | The graphical interface — main tool | ✅ Yes |
| TShark (CLI) | Command-line version of Wireshark | ✅ Yes (included by default) |
| Npcap | Packet capture driver — **required** for live capture | ✅ Yes — install this |
| USBpcap | Captures USB traffic instead of network traffic | Optional — only if needed |

> ⚠️ **Npcap is mandatory.** Without it, Wireshark cannot capture live traffic. WinPcap is the older version — Npcap is the current standard.

---

## What Gets Installed

After installation, check **Control Panel → Network Connections** and you will see a new adapter:

- **Npcap Loopback Adapter** — automatically installed alongside Npcap
- Allows capturing traffic on the local machine (loopback interface `127.0.0.1`)

---

## First Launch

When Wireshark opens, you'll see a list of available **network interfaces**:

```
Available interfaces:
  ● Ethernet0          ← your main wired NIC (shows traffic graph if active)
  ● Npcap Loopback Adapter
  ● Wi-Fi
  ● ...
```

**Double-click** an interface to begin live capture on it.
The interface with activity on the graph is the one currently passing traffic.

---

## Key Points

- 📌 Download from **wireshark.org** — Windows 64-bit installer
- 📌 **Npcap is required** for live capture — install it during setup
- 📌 GUI (Wireshark) + CLI (TShark) are both installed by default
- 📌 Npcap Loopback Adapter appears in Network Connections after install
- 📌 Double-click an interface on the home screen to start capturing
