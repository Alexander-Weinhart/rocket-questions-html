# CIDR and Subnet Masks

## Classful vs Classless

- Classful networking uses default masks based on address class (A/B/C).
- Classless networking allows flexible prefix lengths, independent of class boundaries.

## CIDR

- CIDR means Classless Inter-Domain Routing.
- CIDR notation is written as `/prefix-length` (example: `192.168.1.0/24`).
- The prefix length is the number of network bits set to 1 in the subnet mask.

## Finding Subnet Mask from CIDR

- `/8`  -> `255.0.0.0`
- `/16` -> `255.255.0.0`
- `/24` -> `255.255.255.0`
- `/25` -> `255.255.255.128`
- `/26` -> `255.255.255.192`
- `/27` -> `255.255.255.224`
- `/28` -> `255.255.255.240`

## IP and Subnet Mask Relationship

- The subnet mask separates network bits from host bits.
- Devices AND the IP with the mask to determine network membership.
- Hosts communicate directly when in the same subnet; otherwise traffic is sent to a gateway/router.
