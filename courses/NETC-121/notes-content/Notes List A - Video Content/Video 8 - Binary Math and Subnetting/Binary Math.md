# Binary Math and IPv4

---

## Decimal (Base 10)

The number system we use every day. Each digit can be **0 through 9**.
Each position is a power of 10:

```
  1  0  4
  │  │  └── 4 × 10⁰ =   4
  │  └───── 0 × 10¹ =   0
  └──────── 1 × 10² = 100
                       ───
                       104
```

---

## Binary (Base 2)

Computers only understand **0 and 1** (off/on). Each digit is called a **bit**.
Each position is a power of 2:

```
Bit position:  7    6    5    4    3    2    1    0
Place value: 128   64   32   16    8    4    2    1
```

### Binary → Decimal (reading one octet)

```
Binary:   1  1  0  0  0  0  0  1

128  64  32  16   8   4   2   1
  1   1   0   0   0   0   0   1

= 128 + 64 + 1 = 193
```

### Decimal → Binary (subtracting method)

Convert 192 to binary:

```
192 ÷ 128 = yes → 1    remainder 64
 64 ÷  64 = yes → 1    remainder 0
  0 ÷  32 = no  → 0
  0 ÷  16 = no  → 0
  0 ÷   8 = no  → 0
  0 ÷   4 = no  → 0
  0 ÷   2 = no  → 0
  0 ÷   1 = no  → 0

Result: 11000000  =  192
```

---

## Binary and IPv4

An IPv4 address is **32 bits** long, written as **4 octets** (groups of 8 bits) separated by dots.

```
192      .    168      .      1      .      1
11000000 . 10101000 . 00000001 . 00000001
```

Each octet ranges from **0 (00000000)** to **255 (11111111)**.

### Common Binary Values to Know

| Decimal | Binary   |
|---------|----------|
| 0       | 00000000 |
| 1       | 00000001 |
| 128     | 10000000 |
| 192     | 11000000 |
| 224     | 11100000 |
| 240     | 11110000 |
| 248     | 11111000 |
| 252     | 11111100 |
| 254     | 11111110 |
| 255     | 11111111 |

> These values appear constantly in **subnet masks**.

---

## Total IPv4 Address Combinations

IPv4 uses 32 bits. Each bit is 0 or 1, so:

```
2³² = 4,294,967,296   (~4.3 billion possible addresses)
```

This is why IPv4 addresses ran out — 4.3 billion is not enough for every device on earth.
IPv6 uses **128 bits** → 2¹²⁸ addresses (effectively unlimited).

---

## Subnet Masks in Binary

The subnet mask uses **1s** for the network portion and **0s** for the host portion:

```
Class C   /24:
IP:           192  .  168  .    1  .    5
Binary:  11000000.10101000.00000001.00000101

Mask:         255  .  255  .  255  .    0
Binary:  11111111.11111111.11111111.00000000
                                    ^^^^^^^^
                                    host portion (can change)
```

The point where the 1s end and the 0s begin = the **subnet boundary**.

---

## AND Operation (How devices find the network address)

A device applies a **bitwise AND** between the IP and subnet mask to find its network address:

```
IP:    11000000.10101000.00000001.00000101   (192.168.1.5)
Mask:  11111111.11111111.11111111.00000000   (255.255.255.0)
AND:   11000000.10101000.00000001.00000000   = 192.168.1.0  ← network address

Rule: 1 AND 1 = 1 │ 1 AND 0 = 0 │ 0 AND 0 = 0
```
