# Public vs Private IP Addresses

## Public IP Addresses

- Public IPs are globally routable on the internet.
- They must be unique across the public internet.
- Internet-facing services require public addressing (directly or through translation/proxy layers).

## Why Private IPs Exist

- IPv4 has limited address capacity.
- Private addressing allows internal reuse of the same ranges across many organizations.
- NAT translates private internal addresses to public addresses for internet access.

## Private IPv4 Ranges (RFC 1918)

- `10.0.0.0/8`
- `172.16.0.0/12`
- `192.168.0.0/16`

## Practical Summary

- Devices inside a LAN often use private addresses.
- Edge devices (routers/firewalls) handle translation and internet routing behavior.
