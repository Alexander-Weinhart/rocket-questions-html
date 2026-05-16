# Video 9 - IP Address - IPv4 vs IPv6 Tutorial

## Transcript

### 0:00 - 0:39

An IP address is a numeric address. It's an identifier for a computer or device on a network.  Every device has to have an IP address for communication purposes.  The IP address consists of two parts.  The first part is the network address and the second part is the host address.  There are also two types of IP addresses.  The first one is the most common one, it's called IP version 4 and a second type is IP version 6.  IP version 4 is the current version of IP addresses.

### 0:39 - 1:29

It's a 32-bit numeric address written as four numbers separated by periods.  Each group of numbers that are separated by periods is called an octet.  The number range in each octet is 0 to 255.  This address version can produce over 4 billion unique addresses. In the world of computers and networks this IP address in this format here is meaningless.  Computers and networks don't read IP addresses in this standard numeric format and that's because they only understand numbers in a binary format.  A binary format is a number that only uses 1s and 0s  The binary

### 1:29 - 2:21

number for this IP address is this number shown here.  This binary number is what computers and networking devices actually read.  So the question is, how do we get this binary number from this IP address? IP address 4 is made up of four sets of eight binary bits.  And these sets are called octets.  The bits in each octet are represented by a number.  So starting from the left, the first bit has a value of 128 then 64 then 32 and so on.  All the way down to 1.  Each bit on the octet can be either a 1 or a 0.  If the number is a 1 then the number that it represents counts.  If the number is a

### 2:21 - 2:40

0 then the number that it represents does not count. So by manipulating the 1s and the 0s in the octet, you can come up with a range from 0 to 255.  So for example the first octet in this IP address is 66.  So how

### 2:40 - 3:30

do we get a binary number out of 66? First you look at the octet chart and you would put 1s under the numbers that would add up to the total of 66.  So you would put a 1 in the 64 slot.  So now you already have 64, so we need 2 more.  So let's put in number 1 in the two slot.  So now if we count all the numbers that we have 1s underneath them, you will get a total of 66.  All of the other bits would be 0s because we don't need to count them since we already have our number. So this number here is the binary bit version of 66.  So we'll put that number down here

### 3:30 - 3:41

So let's do the next number which is 94. So let's put a 1 under 64, 16, 8, 4, & 2.  So

### 3:41 - 4:00

if we were to add all the numbers that we have 1s underneath them, we would get a total of 94.  And since we don't want to count any of the other numbers we just put 0s under the rest.

### 4:00 - 4:09

So the next number is 29.  So let's put a 1 under 16, 8, 4, & 1.  And when you add all

### 4:09 - 4:32

the numbers up you get 29. And our last number is 13.  So let's select 8, 4, and 1.  And when you add those up you get 13

### 4:32 - 5:28

When the internet was first developed, programmers didn't realize how big it would become.  They thought that IP version 4, which produced over 4 billion addresses, would be enough.  But they were wrong.  IP version 6 is the next generation of IP addresses.  The main difference between IP version 4 and IP version 6 is the length of the address. The IP version 4 address is a 32-bit numeric address. Whereas IP version 6 is a 128 bit hexadecimal address. Hexadecimal uses both numbers and alphabets in the address.  So with this type of address, IP version 6 can produce an unbelievable 340 undecillion IP addresses.  That's the number 340 with 36

### 5:28 - 5:49

digits after it.  So as you might have guessed, IP version 6 is more than enough for the foreseeable future So as stated before, IP version 6 is a 128 bit hexadecimal address.  It's made up

### 5:49 - 6:40

of 8 sets of 16 bits with the 8 sets separated by colons as you can see here. So in a similar way that we converted an IP version 4 address to a binary number, this is how we convert a binary number to a hexadecimal address.  In an IP version 6 IP address each hexadecimal character represents 4 bits.  So we have to convert 4 bits at a time to get one hexadecimal character.  So starting from the beginning, we convert the first 4 bits and put those bits up there against our 4-bit chart which includes an 8, 4, 2, and a 1.  So if we count the numbers that

### 6:40 - 6:55

we have 1s underneath them, you wind up with a 2. So a '2' is the first hexadecimal character in this IP version 6 address.

### 6:55 - 7:52

So let's do the next four bits and put those under our four bit chart So if we count all the numbers that we have 1s underneath them, we have a '4' and a '2' and if we add those up we get 6.  So a '6' is the second hexadecimal character in this IP address So let's do our next set of 4 bits. And if we add all the numbers that we have 1s underneath them, we get a total of 13. But the problem is since 13 is a double-digit number, we cannot use a double-digit number to represent 4 bits.  And that's because in a hexadecimal format, double-digit numbers have to be represented with a single alphabet which is 'A' through 'F'.  So

### 7:52 - 8:05

in this case we have to use another chart for any 4 bits that the sum is 10 or higher.  So in this chart up here, if the sum was 10, then we would use the

### 8:05 - 8:14

letter 'A'.  Or if the sum was 11, then we would use a 'B'.  But in this case our sum

### 8:14 - 8:25

is 13.  So now for the third character in our binary number we would put a 'D'

### 8:25 - 8:50

So in our last example let's do the fourth set of bits.  And if we add those up we get 11.  So we have a double-digit character again which means that we have to convert it to a single character alphabet.  So if we look at our chart up here, 11 converts to a 'B'. So the first 16 bits of this binary IP version 6 address, converts to the hexadecimal address as 26DB.

