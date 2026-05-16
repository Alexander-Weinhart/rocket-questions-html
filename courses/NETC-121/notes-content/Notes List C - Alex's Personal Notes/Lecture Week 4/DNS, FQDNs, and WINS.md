# DNS, FQDNs, and WINS

## WINS (Old School)

- WINS means Windows Internet Naming Service.
- It is Microsoft-specific and was used mainly for NetBIOS name resolution in older Windows environments.
- Today, DNS is the standard naming system on modern IP networks.

## DNS (Domain Name System)

- DNS maps human-readable names to IP addresses.
- Purpose: users type names instead of numeric IP addresses, applications can find services by name reliably, and naming stays distributed/scalable compared with simple host files.

## Host Name, Domain Name, and FQDN

- Host name: the device/service label, such as `www`.
- Domain name: the domain, such as `google.com`.
- FQDN (Fully Qualified Domain Name): full name, such as `www.google.com`.
- Different host names on the same domain create different FQDNs.
- Examples: `www.google.com`, `mail.google.com`, `docs.google.com`.

## DNS Hierarchy

- DNS is hierarchical, like a tree: root (`.`), top-level domain (`.com`, `.org`, `.edu`), second-level domain (`google.com`), then subdomains/hosts (`www.google.com`).
- This hierarchy allows global delegation and efficient name management.

## DNS Servers

- Recursive resolver receives client queries and finds answers for the client.
- Authoritative server holds the official DNS records for a zone.
- Caching improves performance and reduces repeated lookups.

## Forwarders

- A DNS forwarder is an upstream DNS server that receives queries your DNS server cannot answer locally.
- Benefits include centralized external resolution, better cache hit rates, and easier policy/filtering control.
