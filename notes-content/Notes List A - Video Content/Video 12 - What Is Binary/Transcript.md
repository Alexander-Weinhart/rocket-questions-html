# Week 7 - Video 12: What Is Binary

It is a common theme in the modern world that everything in a computer comes down to ones and zeros.
This code is called binary.

## What Binary Is

Binary is a counting system.

It can be compared to:

- tally marks (simple but inefficient)
- base-10 positional counting (our normal decimal system)
- base-2 positional counting (binary)

In decimal, each place value is a power of 10:

- ones
- tens
- hundreds
- thousands

In binary, each place value is a power of 2:

- ones
- twos
- fours
- eights
- sixteens
- and so on

Binary counting sequence:

`0, 1, 10, 11, 100, 101, 110, 111, 1000`

## Why Computers Use Binary

Computers are built from transistors, tiny switches that are either:

- on
- off

These two physical states match binary perfectly:

- on = `1`
- off = `0`

A transistor state is a **bit** (binary digit).
Eight bits make a **byte**.

A byte can represent values from `0` to `255`.

## ASCII and Text

Computers store data as numbers.
To display letters for humans, encoding systems like ASCII map numbers to characters.

Example:

- uppercase `A` is decimal `65`
- decimal `65` in binary is `01000001`

So typing `A` becomes a binary pattern that maps back to `A` through ASCII.

## 8-bit vs 16-bit

As computing needs grew, 8-bit limits were too small for many tasks.

- 8-bit max: `255`
- 16-bit max: `65,535`

Moving to larger bit-widths greatly increased representable values and system capabilities.

## Main Point

Binary is not mysterious.
It is a practical counting system that matches how digital hardware physically works.
