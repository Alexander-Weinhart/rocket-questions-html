# Network Latency and Jitter

## Network Latency

- Latency is delay: the time it takes data to travel from source to destination.
- Measured in milliseconds (`ms`).
- Common measurements include one-way delay and round-trip time (RTT), often shown by `ping`.

## Good vs Bad Latency (General Guidance)

- Good latency depends on the application.
- Typical rough expectations: real-time voice/video usually prefers lower values (often under about 50 ms), while general web use can tolerate moderate latency.
- High latency causes lag, slow response, and poor real-time performance.

## Causes of Latency

- Physical distance and routing path length.
- Network congestion and queueing.
- Slow or overloaded devices (routers/switches/servers).
- Media issues and retransmissions due to errors.
- Bad weather can affect some links and increase error rates, which can increase effective latency on copper and fiber paths (especially long outdoor runs and provider infrastructure).

## Jitter

- Jitter is variation in delay over time, not just delay itself.
- Example: packets arrive at 20 ms, then 45 ms, then 18 ms.
- High jitter hurts real-time traffic (voice/video) because timing becomes inconsistent.

## How Jitter Is Measured

- Usually measured in milliseconds as delay variation between packets.
- Tools often report average jitter, maximum jitter, and packet loss alongside jitter for quality analysis.
