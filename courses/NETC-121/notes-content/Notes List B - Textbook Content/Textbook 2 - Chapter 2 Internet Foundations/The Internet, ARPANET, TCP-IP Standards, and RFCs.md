# Textbook 2, Chapter 2: Internet Foundations 🌐

## Core Terms and Concepts

### 1. The Internet 🌍
- The Internet is a **global network of networks**, not one single network.
- No single organization owns the entire Internet.
- It works because independent networks agree on open protocol standards (mainly TCP/IP).

### 2. ARPANET 🧪
- **ARPANET** (started in **1969**) was an early packet-switched network funded by ARPA (now DARPA).
- It connected universities and research sites to test resilient network communication.
- ARPANET was a key predecessor to the modern Internet.
- ARPANET itself was decommissioned in **1990**.

### 3. TCP/IP 📦
- **TCP/IP** is a **protocol suite**, not a single protocol.
- **IP (Internet Protocol):** addressing and routing packets between networks.
- **TCP (Transmission Control Protocol):** reliable, ordered delivery and error recovery.
- Major milestone: ARPANET's transition to TCP/IP on **January 1, 1983**.

### 4. RFCs (Request for Comments) 📄
- RFCs are numbered technical documents used to publish Internet protocols and practices.
- RFCs can be standards-track, informational, experimental, historic, or BCP (Best Current Practice).
- Important: **not every RFC is an Internet Standard**.

### 5. Standards States: Proposed, Draft, Internet ✅
- Older standards path (historical model):
  - Proposed Standard
  - Draft Standard
  - Internet Standard
- Modernized process (IETF, RFC 6410):
  - Proposed Standard
  - Internet Standard
- "Draft Standard" is mostly historical now, which causes confusion in many textbooks and lecture slides.

### 6. Network Interface Layer 🔌
- Lowest layer in the TCP/IP model.
- Handles local link delivery over physical/network media (for example Ethernet and Wi-Fi).
- Includes framing, MAC addressing, and media access behavior.
- Also called **Link Layer** or **Network Access Layer** in some sources.

## Misconceptions and Common Confusions ⚠️

- **"The Internet is the same as the Web."**
  - False. The Web is one application/service (HTTP/HTTPS) that runs on top of the Internet.

- **"TCP/IP is one protocol."**
  - False. It is a suite of protocols.

- **"Every RFC is a standard."**
  - False. Many RFCs are informational, experimental, historic, or BCP.

- **"Draft Standard is always a required current step."**
  - Usually false in the modern process; this step is mostly historical.

- **"Network Interface Layer = OSI Network Layer (Layer 3)."**
  - False. TCP/IP Network Interface layer maps more closely to OSI Layers 1 and 2.

- **"ARPANET and the Internet are the same thing."**
  - False. ARPANET was an important predecessor, not the modern Internet itself.

## Quick Memory Hooks 🧠
- Internet = inter-network agreement on protocols.
- ARPANET = early proof network.
- TCP/IP = language of internetworking.
- RFC = publication format, not automatically a standard.
- Network Interface layer = local-link mechanics.
