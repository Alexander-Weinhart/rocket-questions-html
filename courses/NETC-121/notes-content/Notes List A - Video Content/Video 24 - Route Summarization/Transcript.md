# Week 12 - Video 24: Route Summarization

## Main Idea

- `Route summarization` is also called `route aggregation`.
- The purpose is to reduce the number of routes that appear in a routing table.
- A summary route combines several specific networks into one broader route.

## Why Route Summarization Matters

- Fewer route entries means a smaller and cleaner routing table.
- A router can advertise one summary instead of many individual routes.
- This helps simplify route management.

## Example Networks

- The video summarizes these three addresses:
- `10.0.0.4`
- `10.0.0.5`
- `10.0.0.6`
- The first three octets are identical, so only the last octet needs to be compared in binary.

## Convert the Last Octet to Binary

- `4` in binary = `00000100`
- `5` in binary = `00000101`
- `6` in binary = `00000110`

## Find the Common Bits

- Compare the binary values and look for the point where they stop matching.
- The shared prefix is:
- `000001`
- The final two bits are where the addresses become different.
- In summarization, keep the matching bits the same and change all varying bits to `0`.

## Build the Summary Route

- Keep the first three octets unchanged:
- `10.0.0`
- In the last octet, keep the common bits:
- `000001`
- Change the remaining bits to `00`
- This gives:
- `00000100`
- `00000100` in decimal is `4`
- The summary network address is:
- `10.0.0.4`

## Build the Subnet Mask

- In the subnet mask, every bit that stayed the same becomes `1`.
- Every bit that changed becomes `0`.
- The first three octets are unchanged, so they are all `1`s:
- `255.255.255`
- The last octet has six `1`s followed by two `0`s:
- `11111100`
- `11111100` in decimal is `252`
- The subnet mask is:
- `255.255.255.252`

## Final Summary Route

- The summarized route for these three addresses is:

```text
10.0.0.4 255.255.255.252
```

## Method to Remember

- Write the changing portion of the addresses in binary.
- Find the bits that all addresses have in common from left to right.
- Stop where the bits begin to differ.
- Keep the matching bits in the summary address.
- Turn all remaining bits into `0`s.
- Count the matching bits to determine the subnet mask.

## Key Takeaways

- Route summarization reduces the number of routing-table entries.
- Only the octets that differ need to be converted to binary for comparison.
- The summary address keeps the shared prefix and zeros out the rest.
- The summary mask uses `1`s for matching bits and `0`s for differing bits.
- `10.0.0.4 255.255.255.252` summarizes `10.0.0.4`, `10.0.0.5`, and `10.0.0.6` in this example.
