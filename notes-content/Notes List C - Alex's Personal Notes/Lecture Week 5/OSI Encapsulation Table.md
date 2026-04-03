# 🧱 OSI Model — Encapsulation Table

This table shows how a web request (HTTP over TCP) is **encapsulated** as it travels down the OSI stack. Each layer wraps the layer above it in its own header (and sometimes trailer), adding the addressing and control information needed at that layer.

---

## Encapsulation — The Wrapping Process

```
Sending side — data travels DOWN ↓↓↓ (each layer wraps the one above)

 Layer 7 │ Application  │  [  HTTP Request: GET /index.html  ]
         │              │   ↓ TCP wraps it
 Layer 4 │ Transport    │  [  TCP Header  │  HTTP Request  ]
         │              │   ↓ IP wraps it
 Layer 3 │ Network      │  [  IP Header  │  TCP Header  │  HTTP Request  ]
         │              │   ↓ Ethernet wraps it
 Layer 2 │ Data Link    │  [  Eth Header  │  IP  │  TCP  │  HTTP  │  Eth Trailer (FCS)  ]
         │              │   ↓ converted to physical signals
 Layer 1 │ Physical     │  (raw data waves — electrical / light / radio)


Receiving side — data travels UP ↑↑↑ (each layer strips its own header)

 Layer 1 │ Physical     │  (raw data waves received)
         │              │   ↑ bits assembled into frame
 Layer 2 │ Data Link    │  [  Eth Header  │  IP  │  TCP  │  HTTP  │  FCS  ]  → check FCS, strip Eth
         │              │   ↑
 Layer 3 │ Network      │  [  IP Header  │  TCP Header  │  HTTP Request  ]   → route, strip IP
         │              │   ↑
 Layer 4 │ Transport    │  [  TCP Header  │  HTTP Request  ]                 → reassemble, strip TCP
         │              │   ↑
 Layer 7 │ Application  │  [  HTTP Request: GET /index.html  ]               → browser renders ✅
```

---

## Full Encapsulation Table

| OSI # | Layer Name | Protocol Example | PDU | What Gets Added | Encapsulation |
|:---:|---|---|---|---|---|
| 7 | **Application** | HTTP / HTTPS | Data | HTTP request/response headers and body | `[ HTTP ]` |
| 6 | **Presentation** | TLS / SSL | Data | Encryption wrapper (HTTPS only) | `[ TLS [ HTTP ] ]` |
| 5 | **Session** | — | Data | Session control (handled by OS/app) | `[ HTTP ]` |
| 4 | **Transport** | TCP | Segment | Src/dst port, seq#, ACK, flags, checksum | `[ TCP Header │ HTTP ]` |
| 3 | **Network** | IP | Packet | Src/dst IP, TTL, protocol, checksum | `[ IP Header │ TCP │ HTTP ]` |
| 2 | **Data Link** | Ethernet | Frame | Src/dst MAC, EtherType, **FCS trailer** | `[ Eth Hdr │ IP │ TCP │ HTTP │ FCS ]` |
| 1 | **Physical** | — | Bits | (no header — raw conversion to signal) | *(raw data waves)* |

---

## What Each Header Contains

### TCP Header (Layer 4)
```
│ Src Port │ Dst Port │ Sequence # │ ACK # │ Flags │ Window │ Checksum │ ...
```

### IP Header (Layer 3)
```
│ Version │ TTL │ Protocol │ Src IP │ Dst IP │ Checksum │ ...
```

### Ethernet Header + Trailer (Layer 2)
```
│ Dst MAC │ Src MAC │ EtherType │ ... payload ... │ FCS (CRC checksum) │
```

---

## The Shrinking View at Each Layer

Each layer only sees its own header and treats everything inside as opaque data:

```
Ethernet sees:     [Eth Hdr][    opaque payload    ][FCS]
IP sees:                    [IP Hdr][opaque payload]
TCP sees:                           [TCP Hdr][opaque data]
HTTP sees:                                  [HTTP Request]
```

No layer reads or modifies the headers of another layer.

---

## Key Points

- 📌 Encapsulation = each layer **wraps** the layer above with its own header
- 📌 Decapsulation = each layer **strips** its own header going up the stack
- 📌 Layer 1 (Physical) adds no header — it converts bits to signals
- 📌 Layer 2 adds both a **header** (MACs) and a **trailer** (FCS/CRC)
- 📌 TCP segment lives inside an IP packet which lives inside an Ethernet frame
