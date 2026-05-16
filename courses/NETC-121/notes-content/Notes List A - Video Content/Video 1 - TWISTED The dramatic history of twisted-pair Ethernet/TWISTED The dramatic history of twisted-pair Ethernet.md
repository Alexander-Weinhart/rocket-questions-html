# Video 1 - [TWISTED: The dramatic history of twisted-pair Ethernet](https://www.youtube.com/watch?v=f8PP5IHsL8Y)

## Overview

This video explains how Ethernet moved from bulky coaxial cable to unshielded twisted pair (`UTP`) and why that shift made modern networking practical. The big idea is that twisted-pair Ethernet won because it was cheaper, easier to install, easier to expand, and better suited for office cabling.

## Why Early Ethernet Needed Improvement

| Standard | Cabling | Main Strength | Main Problem |
| --- | --- | --- | --- |
| `10BASE5` | Thick coax | Worked over longer distances | Expensive, stiff, hard to install |
| `10BASE2` | Thin coax | Cheaper and easier than thick coax | Still used bus topology and was easy to break |

Coax Ethernet worked, but it was awkward in office environments. A single cabling issue could disrupt the whole segment, and installation labor was costly.

## Why Twisted Pair Was Attractive

- Office buildings already had large amounts of telephone wiring.
- Much of that wiring was unused.
- Engineers realized those spare wire pairs could carry network traffic.
- Reusing existing cabling could reduce installation cost dramatically.

## Star Topology vs Bus Topology

| Topology | Idea | Effect |
| --- | --- | --- |
| Bus | One shared cable for many devices | Simple concept, but one cable issue can affect everyone |
| Star | Each device connects back to a central point | Easier troubleshooting and better fit for building wiring |

Twisted-pair Ethernet pushed networking away from the shared-bus model and toward the star topology used in modern LANs.

## StarLAN and the Transition

`StarLAN` was an early twisted-pair Ethernet approach. It showed that Ethernet could work over twisted pair, even though it was only `1 Mbps` and not the final long-term answer.

| StarLAN Feature | What It Meant |
| --- | --- |
| Two wire pairs | One pair transmitted and one pair received |
| Central device | Similar to a modern hub |
| `1 Mbps` speed | Slower than later Ethernet, but proved the concept |

## Why Twisted Pair Works

Twisted pair is a balanced medium. The two wires in a pair pick up similar outside noise, and receivers look at the difference between the two signals rather than comparing one wire to ground.

| Term | Meaning |
| --- | --- |
| `EMI` | Electromagnetic interference that adds noise to signals |
| Balanced medium | Two wires carry signals in a way that helps reject common noise |
| Crosstalk | Interference from nearby wire pairs in the same cable bundle |

The key technical concern was whether twisted pair could support faster Ethernet despite crosstalk. Testing showed that it could.

## The Breakthrough to 10BASE-T

Once engineers proved twisted pair could handle `10 Mbps`, Ethernet changed direction permanently.

| Standard | Importance |
| --- | --- |
| `1BASE5` | Early IEEE twisted-pair proof of concept based on StarLAN |
| `10BASE-T` | The major breakthrough that made modern Ethernet practical |

`10BASE-T` brought Ethernet into a form that looks familiar today: structured cabling, central hubs or switches, and office-friendly deployment.

## Standards Conflict

Not everyone agreed on the new direction. Some major Ethernet companies preferred ideas that preserved older coax investments. Others pushed for a pure twisted-pair future with central connectivity devices.

The twisted-pair group eventually won, and `10BASE-T` was standardized in `1990`.

## Why This Matters

| Result | Why It Mattered |
| --- | --- |
| Lower installation cost | Existing building wiring could often be reused |
| Easier expansion | Adding or moving devices became simpler |
| Better troubleshooting | Star topology isolated failures more effectively |
| Mass adoption | Helped Ethernet spread through offices, dorms, and homes |

## Key Takeaways

- Early Ethernet started on coax, not twisted pair.
- Twisted pair became attractive because office telephone wiring already existed.
- Star topology made Ethernet more practical than shared-bus cabling.
- `Crosstalk` was the major technical hurdle engineers had to solve.
- `10BASE-T` was the turning point that made modern Ethernet widespread.
