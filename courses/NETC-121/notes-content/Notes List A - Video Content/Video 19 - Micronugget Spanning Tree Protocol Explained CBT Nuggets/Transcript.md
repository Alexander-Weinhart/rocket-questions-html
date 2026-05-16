# Week 9 - Video 19: Micronugget - Spanning Tree Protocol Explained

## Main Idea

- STP is a concept-heavy topic, but actual day-to-day configuration is simple.
- The speaker emphasizes that one command is the main command you really use in real networks:
- Electing the root bridge
- Many other STP commands exist, but they are usually for unusual or edge-case situations.

## Why STP Feels Large

The speaker says STP can lead into many concepts, including:

- What the root bridge is
- How the root bridge is elected
- How switches find the best path to the root bridge
- How redundant paths are blocked
- What happens if the root bridge fails
- How failover happens
- How long convergence takes

## The Most Important Practical Command

- The command the speaker recommends focusing on is the command that elects the root bridge.
- In real-world administration, this is the one command most likely to matter.

## Checking the Current STP Topology

### Show Spanning Tree

- Use:

```text
show spanning-tree
```

- This shows the current spanning tree status.
- On Cisco switches, STP runs per VLAN.
- That means each VLAN can have its own root bridge and spanning tree topology.

### What the Output Shows

The command output can show:

- Whether spanning tree is enabled
- Which STP version is in use
- The current root bridge priority
- The current root bridge MAC address
- Which local port reaches the root bridge
- The root path cost
- The local switch priority and MAC address
- Hello timer information

### Example Points Mentioned in the Video

- The switch was using standard `802.1D` STP.
- The root bridge had a displayed priority and MAC address.
- The local switch reached the root bridge through port `Fa0/11`.
- The root path cost shown was `19`.
- The local switch had a priority of `32769`.

## Cisco Uses Per-VLAN STP

- Cisco switches use per-VLAN spanning tree.
- This means you can choose different spanning tree behavior for different VLANs.
- If only one VLAN exists, you only need to configure that VLAN.
- If many VLANs exist, you can configure ranges such as VLANs 1 through 100.

## Root Bridge Configuration

### Recommended Method

- The speaker recommends using the root bridge election command instead of manually calculating everything.

### Primary Root Command

Use:

```text
spanning-tree vlan <vlan-id> root primary
```

Example:

```text
spanning-tree vlan 1 root primary
```

### What Root Primary Does

- The switch checks the priority of the current root bridge.
- It then lowers its own priority to become a better candidate.
- The speaker explains this as putting the switch two increments below the current root bridge.

### Secondary Root Command

Use:

```text
spanning-tree vlan <vlan-id> root secondary
```

Example:

```text
spanning-tree vlan 1 root secondary
```

### What Root Secondary Does

- This is used to create a backup root bridge.
- The speaker explains it as setting the switch one increment below the primary.
- If the main root bridge fails, the secondary can take over.

## STP Priority Increments

- STP bridge priority uses increments of `4096`.
- The speaker points out that this is related to per-VLAN spanning tree and the way bits are allocated.
- The exact detail is less important than remembering the increment size.

## Manual Priority Configuration

If you do not want to use `root primary` or `root secondary`, you can set the priority directly.

### Command

```text
spanning-tree vlan <vlan-id> priority <value>
```

Example:

```text
spanning-tree vlan 1 priority 0
```

### What This Does

- A lower priority makes the switch a better root bridge candidate.
- `0` is the lowest possible priority and therefore the strongest possible root bridge setting.

### Why the Speaker Does Not Prefer Priority 0

- Setting priority to `0` leaves no room below it for another switch to take a better value.
- That makes it harder to plan a backup root bridge with a lower-priority design.
- Because of that, the speaker prefers `root primary` instead of hard-setting `0`.

## Verifying the Change

- After setting the root bridge command, return to privileged EXEC mode and run:

```text
show spanning-tree
```

- The speaker notes that BPDUs are sent every two seconds by default, so the change should happen quickly.

### What Changed in the Example

- The switch became the root bridge.
- The priority changed to a lower value.
- The displayed root bridge and local bridge were now the same switch.

## Other STP Commands

- The speaker says other commands exist, but most are rarely used in normal production work.
- They are more often used in unusual scenarios or on exams.

## Hello Timer Configuration

### Command

```text
spanning-tree vlan <vlan-id> hello-time <seconds>
```

### Default

- The default hello time is `2 seconds`.

### Lowest Value Mentioned

- The speaker says the lowest supported hello time is `1 second`.

### Why Someone Might Change It

- A faster hello timer can help STP detect failures faster.
- In theory, this can reduce convergence time.

### Real-World Advice

- The speaker says people usually do not change the default hello time.
- He has not seen people adjust it in real-world environments.
- Standard practice is usually to leave the default of `2 seconds`.

## Understanding Cost

### What Cost Means

- Cost is how STP chooses the best path to the root bridge.
- Lower cost is better.

### Example from the Video

- A FastEthernet link had a path cost of `19`.
- The switch compared possible paths to the root bridge and chose the one with the lower total cost.

### Path Comparison Example

- One path to the root might cost `19`.
- Another path might cost `38`.
- STP chooses the lower-cost path.

### Why You Might Change Cost

- In unusual situations, you may want to influence path selection manually.
- You can make a path seem more attractive by lowering its cost.
- The speaker describes this as a kind of manual tuning or even "lying" to the switch about how attractive the path is.

### Interface Cost Command

Go into interface configuration mode and use:

```text
spanning-tree cost <value>
```

Example:

```text
interface fastethernet 0/11
 spanning-tree cost 1
```

### Effect

- This overrides the default cost derived from link speed.
- A lower configured cost makes that path more likely to be selected.

## Understanding Port Priority

### What Port Priority Does

- Port priority is used when STP needs a tie-breaker between links of equal cost.
- Lower port priority is better.

### When It Matters

- If two links have the same path cost, STP needs another way to decide which one to prefer.
- Port priority can influence that decision.

### Why You Might Change It

- Instead of changing path cost, you might keep the costs equal and simply say one link should be preferred.
- This is useful when you want more specific control over which equal-cost link wins.

### Interface Port Priority Command

In interface configuration mode:

```text
spanning-tree port-priority <value>
```

Example:

```text
interface fastethernet 0/11
 spanning-tree port-priority 16
```

### Effect

- Lowering the port priority makes that port a better candidate in STP comparisons.

## Lower Is Better

The speaker emphasizes a simple STP rule:

- Lower is better

This applies to:

- Bridge priority
- Path cost
- Port priority

## Practical Advice vs Exam Advice

### Real-World Advice

- In real-world switching environments, the main command you need is the root bridge election command.
- Most other STP tuning commands are rarely needed.
- Use reference material if a strange edge case requires deeper tuning.

### Certification Exam Advice

- For exams, you need to know all of the commands and what they do.
- Even commands that are rarely used in production can still appear in test questions.

## Key Commands from the Video

```text
show spanning-tree
spanning-tree vlan 1 root primary
spanning-tree vlan 1 root secondary
spanning-tree vlan 1 priority 0
spanning-tree vlan 1 hello-time 1
interface fastethernet 0/11
 spanning-tree cost 1
 spanning-tree port-priority 16
```

## Key Takeaways

- STP is concept-heavy, but most practical configuration revolves around controlling the root bridge.
- Cisco uses per-VLAN spanning tree, so STP settings are applied per VLAN.
- `show spanning-tree` is the main verification command.
- `spanning-tree vlan <id> root primary` is the most important configuration command in this video.
- `root secondary` is used to make a backup root bridge.
- Manual priority, hello time, path cost, and port priority can all be changed, but they are used much less often.
- In STP tuning, lower values are generally better.
