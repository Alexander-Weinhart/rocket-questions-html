# Week 7 - Video 14: Converting 8-Bit Binary to Decimal

There is no transcript for this video (music only), so this note teaches the core skill directly.

## Goal

Convert an 8-digit binary number (bits) into a decimal number.

## Step 1: Determine Place Values with the Formula

Use the place-value formula:

`place value = 2^n`

Where:

- `n = 0` for the far-right bit
- increase `n` by 1 as you move left

For 8 bits, left to right place values are:

- `2^7 = 128`
- `2^6 = 64`
- `2^5 = 32`
- `2^4 = 16`
- `2^3 = 8`
- `2^2 = 4`
- `2^1 = 2`
- `2^0 = 1`

So the 8-bit place-value row is:

`128  64  32  16  8  4  2  1`

## Step 2: Example 8-Bit Number

Example binary number:

`10110110`

Line it up with place values:

- `1 x 128 = 128`
- `0 x 64 = 0`
- `1 x 32 = 32`
- `1 x 16 = 16`
- `0 x 8 = 0`
- `1 x 4 = 4`
- `1 x 2 = 2`
- `0 x 1 = 0`

## Step 3: Add the Results

`128 + 0 + 32 + 16 + 0 + 4 + 2 + 0 = 182`

Final answer:

`10110110 (binary) = 182 (decimal)`

## Quick Check Rule

Only add place values where the bit is `1`.
Ignore place values where the bit is `0`.
