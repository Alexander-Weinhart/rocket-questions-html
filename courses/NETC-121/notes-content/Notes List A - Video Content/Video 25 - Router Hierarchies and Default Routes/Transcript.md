# Week 12 - Video 25: Router Hierarchies and Default Routes

## Main Idea

- Routers are typically deployed in a `hierarchy` rather than in a simple line.
- Hierarchical router design makes networks easier to scale and gives users a more consistent connectivity experience.
- A hierarchy also enables effective `route summarization`, including use of the `default route`.

## Why Router Hierarchies Matter

- In a hierarchical design, new networks can be added by connecting their local router into an aggregation layer.
- This makes growth easier because each new branch can plug into the larger topology without redesigning the whole path.
- Hierarchies also improve resilience because a failure in one branch router does not necessarily cut off unrelated branches.

## Scaling Benefit

- The example adds two new networks in Tokyo:
- `Accounting`
- `Help Desk`
- Each network gets its own router connected into an aggregation router.
- As soon as those routers connect to the hierarchy, the new networks gain connectivity to the rest of the enterprise.
- This shows why hierarchical topologies scale more easily than linear ones.

## Consistency Benefit

- In a linear design, some users must cross more routers than others to reach the same destination.
- That creates uneven performance and inconsistent user experience.
- Example points from the video:
- Sales to Marketing crosses fewer routers than Sales to Help Desk.
- Engineering reaches the internet through fewer routers than Accounting.
- A failure in one router can cut off every network behind it in the line.
- In a hierarchy, path lengths are more uniform and failures are more isolated.

## Hierarchies Still Create Linear Paths

- Even when the overall topology is hierarchical, traffic between two specific hosts still follows a `linear path` hop by hop.
- That means the previous packet-forwarding examples still apply.
- The hierarchy describes the larger design, while the actual packet path is still a sequence of routers.

## Route Summarization in a Hierarchy

- A hierarchy allows routers to use `route summarization`.
- Route summarization reduces the number of entries needed in a routing table.
- Instead of storing many separate routes for one site, a router can often store one broader route that covers them all.

## Router 5 Example

- The topology has six networks total:
- three in Tokyo
- three in New York
- `Router 5` needs routes to all of them.
- Three of those routes point toward New York through `Router 4`.
- Because the New York networks all begin with `10.20`, they can be summarized.

## What `/24` Means

- An IPv4 address contains `32 bits`.
- Those bits are grouped into four octets of `8 bits` each.
- A route written as `/24` matches the first `24 bits`, which means the first `three octets`.
- In the example, a `/24` route causes the router to compare the first three octets of the destination IP address.

## Example of `/24` Matching

- A packet destined for `10.40.77.x` matches the route for the `10.40.77.0/24` network.
- A packet destined for `10.20.x.x` would match one of the New York `/24` routes instead.
- After the match, the router forwards the packet to the correct next hop.

## Summarizing the New York Routes

- Instead of keeping three separate `/24` routes for New York, `Router 5` can use one `/16` route.
- A `/16` matches the first `16 bits`, which means the first `two octets`.
- That lets `Router 5` match any destination beginning with `10.20` and send it to `Router 4`.

```text
10.20.0.0/16 -> Router 4
```

- This reduces the number of routes in the table.
- If the New York office adds many more networks within the same `10.20` address space, `Router 5` still does not need additional specific routes for each one.

## Router 8 Example

- `Router 8` also needs routes for the whole topology.
- It has one directly connected Tokyo network and additional routes for the other Tokyo and New York networks.
- Just like `Router 5`, it could summarize the New York routes into one `/16` pointing to `Router 5`.

## Summarizing Even Further with `/8`

- Because `Router 8` sends traffic toward `Router 5` whether the destination is elsewhere in Tokyo or in New York, it can summarize more broadly.
- A `/8` route matches only the first octet.
- In this case, any destination beginning with `10` can be sent toward `Router 5`.

```text
10.0.0.0/8 -> Router 5
```

- This broader summary can account for both offices because they share the same larger enterprise IP space.

## When Multiple Routes Match

- A destination can match more than one route at the same time.
- Example:
- a packet for `10.40.77.x` matches `10.0.0.0/8`
- the same packet also matches `10.40.77.0/24`
- In that case, the router chooses the `most specific` route.
- A `/24` is more specific than a `/8`, so the router uses the `/24`.

## Longest Prefix Match

- The router preference for the most specific route is called `longest prefix match`.
- A route with more matching bits wins over one with fewer matching bits.
- That is how routers can use broad summaries without losing the ability to forward local traffic precisely.

## Default Route as the Ultimate Summary

- `Router 8` must also account for destinations on the internet.
- Instead of storing thousands of internet routes, it can use a `default route`.
- A default route is written as `/0`.
- A `/0` matches `zero bits`, which means it matches every possible destination.

```text
0.0.0.0/0 -> Router 5
```

- This tells `Router 8`:
- to reach anything unknown
- send the packet to `Router 5`
- In the topology shown, `Router 5` is the correct next hop whether the traffic is going to Tokyo, New York, or the internet.

## Why the Default Route Works Here

- The default route works because `Router 8` sits at the edge of the hierarchy.
- For every non-local destination, the next hop is the same upstream router.
- That lets one default route replace a large number of specific entries.

## Key Takeaways

- Routers are usually deployed in a hierarchy because hierarchies scale more easily and create more consistent connectivity.
- Hierarchical designs isolate failures better than linear router chains.
- Route summarization reduces routing-table size by replacing many specific routes with one broader route.
- `/24` matches the first three octets, `/16` matches the first two octets, `/8` matches the first octet, and `/0` matches everything.
- When multiple routes match a packet, the router uses the most specific route through longest prefix match.
- A `default route` is the broadest possible summary and is useful when one upstream router is the path to everything else.
