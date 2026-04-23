# Textbook 2, Chapter 6: DNS and Name Resolution 🌐

## Core Concepts

### 1. DNS Basics
- **DNS (Domain Name System)** translates human-friendly names into IP addresses.
- Example: `www.wiley.com` -> an IPv4/IPv6 address.
- DNS is distributed and hierarchical, not one giant single database.

### 2. Domains and Domain Names
- A **domain** is a namespace branch (for example `wiley.com`).
- A **domain name** is a label in that hierarchy.
- Subdomains extend it (for example `www.wiley.com`, `mail.wiley.com`).

### 3. DNS Domain Tree 🌳
- DNS is structured like an inverted tree:
  - Root (`.`)
  - Top-level domains (TLDs) like `.com`, `.org`, `.edu`
  - Second-level domains like `wiley.com`
  - Host/service labels like `www`

### 4. FQDN (Fully Qualified Domain Name)
- An **FQDN** is the complete path from host to root.
- Example: `www.wiley.com.` (trailing dot represents root, often omitted in normal use).

## URL Structure

### 5. Parts of a URL 🔗
Example URL:
`https://www.example.com:443/docs/index.html?q=dns#ttl`

- **Scheme**: `https`
- **Authority**: `www.example.com:443` (host + optional port, optionally user info)
- **Path**: `/docs/index.html`
- **Query**: `q=dns`
- **Fragment**: `ttl`

## Top-Level Domains and ccTLDs

### 6. TLDs and Country Code Domains
- **Generic TLDs (gTLDs):** `.com`, `.org`, `.net`, etc.
- **Country-code TLDs (ccTLDs):** `.us`, `.uk`, `.jp`, `.de`, etc.
- TLD governance/registration policy varies by registry.

## Historic Name Resolution

### 7. The `hosts` File (Historic Internet) 📜
- Before DNS scale-out, host-name mappings were distributed as a shared `hosts` file.
- This became unmanageable as the Internet grew.
- Modern OSes still have a local hosts file override:
  - Windows: `C:\Windows\System32\drivers\etc\hosts`
  - Linux/macOS: `/etc/hosts`

## DNS Infrastructure

### 8. DNS Servers and Zones
- A **DNS server** answers queries.
- A **zone** is the administrative portion of namespace managed together.
- One server can host many zones.

### 9. Primary and Secondary Name Servers
- **Primary (master)**: writable source for zone data.
- **Secondary (slave)**: read-only replica via zone transfer.
- Secondary servers improve availability and load distribution.

### 10. Root Servers and `named.root`
- Root servers know where TLD authoritative servers are.
- Resolvers bootstrap with a **root hints** file (often `named.root` or `root.hints`).
- That file contains root server names and addresses used to start iterative resolution.

### 11. DNS Caching 🧠
- Resolvers and clients cache answers to reduce latency and traffic.
- Cache lifetime is controlled by TTL values in records.
- Caching improves performance but can delay visibility of recent DNS changes.

## DNS Query Types

### 12. Recursive vs Iterative Queries
- **Recursive query:** requester asks a DNS server for a final answer.
  - The asked server does the work of chasing references.
- **Iterative query:** requester asks each DNS server step-by-step.
  - Each server returns best next referral/answer it has.

### 13. Real-World Confusion: Who Uses Which?
- Client stub resolvers usually send **recursive** queries to their configured resolver.
- Recursive resolvers typically perform **iterative** queries to root/TLD/authoritative servers.
- This mixed behavior causes confusion when people describe DNS as only recursive or only iterative.

## Worked Example: `www.wiley.com` Resolution

### 14. Step-by-Step Flow (Client + Resolver + DNS Hierarchy)
1. Browser asks the client OS resolver to find `www.wiley.com`.
2. Client resolver sends a **recursive** query to its DNS server, `ns1.lowewriter.com`.
3. `ns1.lowewriter.com` checks cache/local data for `www.wiley.com`.
4. No answer found, so it starts **iterative** lookups.
5. It queries a root server for `www.wiley.com`.
6. Root server returns referral to `.com` TLD name servers.
7. `ns1.lowewriter.com` queries a `.com` TLD server for `www.wiley.com`.
8. `.com` server returns referral to authoritative name servers for `wiley.com`.
9. `ns1.lowewriter.com` queries an authoritative `wiley.com` name server.
10. Authoritative server returns the final record (for example an `A`/`AAAA` answer for `www.wiley.com`).
11. `ns1.lowewriter.com` returns the result to the client and caches it (per TTL).
12. Client also caches the result.
13. Next lookup may be answered from cache without repeating full upstream traversal.

## Zone Files and Resource Records

### 15. Zone Files
- A **zone file** is text data containing DNS resource records for a zone.
- It defines SOA, NS, host mappings, mail routing, aliases, and more.

### 16. Resource Record (RR) Core Fields 📘

| Field | Meaning | Example |
|---|---|---|
| **TTL** | Cache lifetime in seconds | `3600` |
| **Owner** | Name this record applies to | `www.wiley.com.` |
| **Class** | Record class (almost always `IN`) | `IN` |
| **Type** | Record type identifier | `A`, `MX`, `CNAME` |
| **RDATA** | Type-specific payload data | `192.0.2.10`, `mail.wiley.com.` |

Record format pattern:
`Owner TTL Class Type RDATA`

### 17. Common Resource Record Types (with Examples) 📋

| Type | What It Does | Example |
|---|---|---|
| **SOA** | Start of Authority; defines zone authority metadata (primary NS, admin mailbox, serial, timers) | `wiley.com. 3600 IN SOA ns1.wiley.com. hostmaster.wiley.com. 2026022501 7200 3600 1209600 3600` |
| **NS** | Lists authoritative name servers for the zone | `wiley.com. 3600 IN NS ns1.wiley.com.` |
| **A** | Maps name to IPv4 address | `www.wiley.com. 300 IN A 203.0.113.25` |
| **CNAME** | Alias from one name to canonical name | `shop.wiley.com. 300 IN CNAME www.wiley.com.` |
| **MX** | Mail exchanger for domain (with preference) | `wiley.com. 3600 IN MX 10 mail.wiley.com.` |
| **PTR** | Reverse mapping: IP -> name | `25.113.0.203.in-addr.arpa. 3600 IN PTR www.wiley.com.` |

## Reverse Lookup Zones

### 18. Reverse DNS (`PTR`)
- Reverse zones translate IP addresses back to hostnames.
- IPv4 reverse namespace uses `in-addr.arpa`.
- Example:
  - Forward: `www.wiley.com` -> `203.0.113.25`
  - Reverse: `25.113.0.203.in-addr.arpa` -> `www.wiley.com`

## Misconceptions and Common Confusions ⚠️
- **"DNS is just one server on the Internet."**
  - False. DNS is distributed and hierarchical.

- **"FQDN always excludes the trailing dot."**
  - Not exactly. Strict FQDN notation includes root dot; user interfaces often omit it.

- **"The browser directly asks root servers every time."**
  - Usually false. The recursive resolver handles that when needed.

- **"Recursive and iterative queries are interchangeable terms."**
  - False. They describe different query behaviors/roles.

- **"TTL is a security setting."**
  - False. TTL controls cache lifetime, not access control.

- **"CNAME and A records can safely coexist at same owner name in all cases."**
  - False. A CNAME owner should not have other data types at that same name.

## Quick Memory Hooks 🧠
- DNS tree: root -> TLD -> domain -> host.
- Client asks resolver recursively; resolver walks hierarchy iteratively.
- Zone file = record database for one managed namespace chunk.
- TTL = cache timer.
- PTR = reverse lookup.
