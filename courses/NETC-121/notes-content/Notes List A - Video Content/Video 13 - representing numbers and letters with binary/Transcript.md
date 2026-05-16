# Week 7 - Video 13: Crash Course Computer Science (Numbers, Binary, and Text)

Hi, I’m Carrie Anne, this is Crash Course Computer Science, and today we’re going to talk about how computers store and represent numerical data.

Which means we’ve got to talk about math.
But don’t worry. Every single one of you already knows exactly what you need to know to follow along.

Last episode talked about how transistors can be used to build logic gates that evaluate Boolean statements. In Boolean algebra there are only two binary values: true and false.

If we only have two values, how do we represent information beyond those two values?
That’s where the math comes in.

## Binary Basics

A single binary value can represent a number. Instead of true and false, we can call the two states `1` and `0`.

To represent larger things, we add more binary digits.

This works like decimal numbers:

- Decimal (base 10) has ten possible single-digit values: `0` through `9`.
- Numbers larger than `9` need additional digits to the left.

Example with decimal `263`:

- 2 hundreds
- 6 tens
- 3 ones

Each place has a multiplier (`100`, `10`, `1`), and each multiplier is 10 times the place to the right.
That is why decimal is called base-ten notation.

Binary works the same way, but it is base-two:

- Only two digits: `0` and `1`
- Each place value is 2 times the place to the right

So instead of hundreds, tens, ones, we have powers of two such as fours, twos, and ones.

Example binary `101`:

- 1 four
- 0 twos
- 1 one

Total = `5` in decimal.

For larger values, binary uses more digits.

Example binary `10110111`:

- `1 x 128`
- `0 x 64`
- `1 x 32`
- `1 x 16`
- `0 x 8`
- `1 x 4`
- `1 x 2`
- `1 x 1`

Total = `183` in decimal.

## Binary Addition

Decimal example: `183 + 19`

- `3 + 9 = 12`, write 2 carry 1
- `8 + 1 + 1 = 10`, write 0 carry 1
- `1 + 1 = 2`

Result = `202`

Binary does the same carry process.

`1 + 1` in binary equals decimal 2, which is `10` in binary:

- write `0`
- carry `1`

Continue across columns the same way.

Final binary sum: `11001010`, which is `202` in decimal.

## Bits, Bytes, and Ranges

Each binary digit (`0` or `1`) is a **bit**.

With 8-bit numbers:

- minimum value = `0`
- maximum value = `255` (all eight bits set to `1`)
- total distinct values = `256` (`2^8`)

A special term for 8 bits is a **byte**.

- `1 byte = 8 bits`
- `10 bytes = 80 bits`

Data-size prefixes:

- `kilobyte (KB)` often means 1000 bytes in decimal usage
- `megabyte (MB)` = about a million bytes
- `gigabyte (GB)` = about a billion bytes
- `terabyte (TB)` = about a trillion bytes

In binary contexts, a kilobyte is also commonly treated as `2^10 = 1024` bytes.
So both 1000 and 1024 appear in real usage depending on context.

## 32-bit and 64-bit Systems

When people say 32-bit or 64-bit computers, they mean operations are commonly done in chunks of 32 or 64 bits.

A 32-bit unsigned value can represent up to just under `4.3 billion`.

For signed values, many systems reserve one bit for sign:

- `0` positive
- `1` negative

Then remaining bits store magnitude, giving a rough range of about plus/minus 2 billion for 32-bit signed integers.

64-bit numbers extend the range massively, up to around `9.2 quintillion` for unsigned values.

Larger bit-widths are also important for memory addresses, since modern systems need to address gigabytes and terabytes of memory.

## Floating-Point Numbers

Computers also represent non-whole numbers like `12.7` and `3.14` using floating-point formats.

These are called floating point because the decimal point can move.

A common standard is **IEEE 754**.

Conceptually, values are stored like scientific notation.

Example:

`625.9 = 0.6259 x 10^3`

Important parts:

- `0.6259` = significand
- `3` = exponent

In 32-bit floating point:

- 1 bit for sign
- 8 bits for exponent
- 23 bits for significand

## Text as Numbers: ASCII and Unicode

Computers represent text using numbers.

A simple idea is assigning numbers to letters. Historically, Francis Bacon used five-bit sequences to encode letters in secret messages in the 1600s.

Five bits allow `32` values, enough for basic letters but not enough for complete modern text needs.

### ASCII

**ASCII** (American Standard Code for Information Interchange), introduced in 1963, used 7 bits for `128` values.

It included:

- uppercase and lowercase letters
- digits `0` through `9`
- punctuation and symbols
- control codes like newline

Examples:

- lowercase `a` = `97`
- uppercase `A` = `65`
- colon `:` = `58`
- close parenthesis `)` = `41`

ASCII became widely used and enabled **interoperability** (different computers exchanging data reliably).

### Beyond ASCII and Unicode

ASCII was originally English-focused.

Because bytes are 8 bits, many systems used values `128` to `255` for extra national or special characters. Different countries used these extra values differently.

That caused compatibility issues across systems and languages (including the well-known problem called **mojibake**, or scrambled text).

To solve this, **Unicode** was created (1992) as a universal encoding framework.

Unicode supports huge character sets across languages, scripts, symbols, and emoji.

## Main Takeaway

Under the hood, everything is long sequences of bits:

- text messages
- web pages
- videos
- operating systems

All of it ultimately comes down to `1`s and `0`s.

Next up is how computers manipulate those binary sequences for true computation.
