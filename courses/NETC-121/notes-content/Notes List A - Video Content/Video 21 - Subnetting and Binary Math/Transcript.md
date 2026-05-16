# Video 21 - Subnetting and Binary Math

## Transcript

### 0:00 - 2:00

Let's look at subnetting. We said that subnetting, by definition, is a way that we can group computers together to be in a common local subnet or network, or differentiate them to show different networks. So we started with three classes of networks, class A, B, and C, with a subnet mask of 255, 000, and so forth.

And we know, simply put, what that meant was that if a NIC needs to figure out, is a device, is another IP in its local network, it looked at its IP, such as if we use, look at an example here. So if we're 192.168.1.5, and we've got a 255.255.0 subnet mask, and then we look at our destination, and if the destination IP was something like this, the requirement is, with three 255s, it means that we need all three octets to match, meaning that 192 and 192 match, 168 and 168 match, but in the, our IP is one, the third octet, and the destination is two, so they do not match. So in this example, this, or the destination, I should say, is not in our subnet, which means we need to send the IP packet to the gateway address.

So it's either in our local network where we can send it directly, or we need to go to the gateway. And in the subnets, the number of 255s determined the number of octets that must match. A class C is the most restrictive, requiring the first three.

### 2:00 - 3:49

A class B only requires the first two. Here we rework this example with a class B subnet mask. Then we would find the destination is in our network, because both 192 and 168 match, the first two octets match.

Class A is the least restrictive. So when we break these things up, what's, where's this 255 come from, and what does it mean? We know that we start with the, an IP address and a subnet mask are 32 bits formatted in a 8 bits, 8 bits, 8 bits, 8 bits format. And with 2 to the 8th power, that number of combinations gives us 256 combinations, which we often represent as 0 to 255.

In computers, we typically start counting at 0. So another way to look at this is that a class A uses 8 bits for the network. So it has 256 networks, and then it uses 24 bits, 8, 8, and 8 host bits, 24 bits for the host addresses, or among friends, I say it's about 16 million hosts. We can instead also carve this up to say we could use 16 bits for a class B for the network, which is approximately 65,000 networks.

### 3:50 - 4:56

And then we would have approximately 65,000 possible host addresses. And a class C, we would divide it into 16 million hosts or networks, but each network is only going to have 256 host addresses. So we're carving it up in three different ways, if you will.

We can have a small number of networks, but they're very large, a good number of networks that are pretty good size, or lots of networks that are very small. How do you want to cut the pie? We talked about that in IPv4, that the address space of public IPs are gone. There's no more to be gone, no more to be had.

They've all been given out. So we solved this problem. One way is we used private IP addresses.

### 4:57 - 6:42

And in a class A block, there's 10.anything. In class B, we've got 172.16 through 172.31. And a class C block of 192.168.anything. What we're saying by this is that a private IP address must be behind a firewall. Or another way to say it is it can't reach the internet directly. In that way, those private addresses, as the word means, are things that any organization or person can use. Odds are your home router uses a 192.168 network.

We say that the 10 is a class A address, because if the first octet value is between 0 and 127, it's a class A. That's natively what it will be by default. We can later override that, and that's kind of where we're going.

Class B is something that begins with 128 through 191. So we see the 172 addresses are class B addresses, and then 192 through 223, that those are class C. So just given an IP address, the first octet will tell you what base class of network it's from. Moving forward.

### 6:44 - 7:45

So if it's not a private address, it's a public address. Public addresses are limited. So public IPs are scarce, and it's limiting when you have to go buy them from your local internet service provider or ISP.

So if ISPs could only hand out of their IP space, the smallest block was a C block. Even if a customer only needed one public IP, the smallest chunk they can give them is 256 addresses, which is terribly inefficient, especially if you thought about what if you were an ISP and had a thousand public IP addresses? That basically means if you gave them out with class Cs, you could give out four of them, not very many customers. So we need a way to carve up a class C block into something smaller.

### 7:46 - 9:57

So we introduced this CIDR notation, which is slash XX, where XX represents the number of ones in the subnet mask. So let's look at binary math. First we start out, and let's review decimal math we're used to.

When we write 731 or something like that, $731, really what we have is we have 10 to the second place, 10 to the first power, and 10 to the zero power, or the one hundredths, 10 squared is 100, the tens, and anything to the zero power is 1. So really we're saying that's seven one hundredths, three groups of 10, and one group of 1. We're going to do the same thing when we use binary. In binary, instead of only three digits, we're going to use eight digits here. We're going to say 2 to the eighth power, 2 to the seventh power, 2 to the sixth power, 2 to the fifth power, 2 to the fourth power, 2 to the third power, 2 to the second power, 2 to the first power, and 2 to the zero power, or 128, 64, 32s, 16s, 8, 4, 2, and 1. Those are the placeholder values.

### 10:00 - 13:52

Typing, you kind of have to start the left and go right, but you could start in a piece of paper and start and write 1, and you just know it doubles each time. So when we look at something like this, I'm going to recopy this down. When we look at something that has all eight bits that are 1s, we're simply going to add up the values of those.

128 plus one group of 64, plus 132, a 16, an 8, a 4, 2, and a 1. When we add that up, we get 255. That's where the number comes from. It means there's eight 1s.

So in our CIDR notation, we could talk about something that's got 255.0.0.0, a class A subnet, as a slash 8, because there are eight 1s. Or to be real explicit about it, let me put it all in binary. 1, 2, 3, 4, 5, 6, 7, 8. Take an 8. Start over.

1, 2, 3, 4, 5, 6, 7, 8. And then 1, 2, 3, 4, 5, 6, 7, 8. 1, 2, 3, 4, 5, 6, 7, 8. 1, 2, 3, 4, 5, 6, 7, 8. That in that subnet mask, there are eight 1s. And then once in subnets, we go from 1s to 0s. It never goes back.

So it's once we make that transition. So that would mean then that a 255.255 would be a slash 16, because there's two blocks of 255. Each one represents eight 1s.

And then lastly, a 255.255.0 would be a slash 24. So now as an example, we can give somebody's IP address as 1.5 slash 24. And it's a more succinct way of writing that.

So we've talked about binary math and where this comes from. We can do some binary conversions. They're straightforward enough that if we, I'm going to recopy my list, that if we want to go from binary to decimal, you know, I'll make up a number.

1, 1, 0, 0, 1, 0, 1. So if you can generate this sequence of just doubles every time. And then we have to put the binary number that's below it. Then we're going to add up every placeholder that has a 1. So it's 64 plus 32.

We have no 16s. Put a plus sign back here. We have no 16s.

We have no 8s, but we do have a group of 4. We have no 2s, and then we have a 1. We add those together, and that's the decimal equivalent. Conversely is, let's say we were given a decimal number of 103, and we need to convert that to binary. Well, again, I start with this and say, can I get, I need to start with one higher than 103.

So if I had a value of 103, 128, I know I've got zero of those. You can't take a group of 128 out of 103. So then we say, can I get a group of 64 out of that? Yeah, there's definitely get a group of 64 out of that.

### 13:53 - 15:04

So then we have to subtract what's 103 minus 64, and we're left with 39. With 39, can we get a 32? Yeah, we can get one of those. And then we subtract 32, and we're left with 7. That means if I only have 7 left, I can't get any 16s.

I can't get an 8, but I can get a 4. 7 minus 4 is 3. I can get a 2, and I'm left over with 1. And this would be the binary number. Leading zeros, you can add it, doesn't matter, right? You'd have 10 leading zeros, but this would be the converting from decimal to binary. Okay, so now our final goal.

Our goal has been, or is, to divide, or I say carve up, a class C block into smaller subnets. It's more efficient that way. So we're going to start off, and I'm going to show it like this.

### 15:04 - 17:09

Let me go down the next page here, and I'm going to say a slash 24 means that we have one group of 256 addresses. A slash 25 means we're going to divide that block of 24 into two blocks. So we've got two groups of 128.

A slash 26, we just keep dividing down to 64. Slash 27, 32. Slash 28, we've got 16 blocks that are each 16 addresses in length.

A slash 29, we've got eight, I'm sorry, we've got 32 blocks, and each block only has eight addresses. A slash 30 has 64 blocks of four. A slash 31 would have 128 blocks of two, and a slash 32 would have 256 blocks of one.

Okay, we know that the first address in a network is called the network address. The last address in a network is the broadcast, and neither one of those addresses is usable, meaning we can't assign it to a host. All the IPs between the network and the broadcast are host addresses, which means we can assign those to host, or nodes, or NICs, if you will.

### 17:11 - 18:54

So for a slash 24, that the first, I'll put the CIDR there, I'll put the network broadcast. Broadcast. So here, this means the network address is zero, and the broadcast address is going to be the last one.

For a slash 25, we've got a network at zero, they're all going to start at zero, but then remember it's only a size of 128. So it's got a second network address, so it's got zero through 127, or I should say it's got a network address of zero, and 128 is the next network address. The broadcast addresses would be 127 and 255.

Or shown another way, this would be zero to 127, and then the second network is 128 through 255. So what we're saying here is that these are two different networks that we can carve this Zblock up into. If my address was ended in 192.168.1.5, and you were 1.200, I would be in the lower block, and you would be in the upper block, and we wouldn't be able to see each other with a slash 25 subnet.

### 18:55 - 23:37

If we were in a slash 24, we've got all the addresses there, we'd be able to see each other. As we go down through a slash 26, means that we're going to have then the network addresses are going to go up in blocks of 64. So the network's going to be zero, always starting at zero, 64, 64 more than that is 128, 192.

We have four networks, each of 64. That means the broadcasts are going to be what I call n-1. The next network address of 64 minus one gives us the broadcast.

So we'd have broadcast of 63, 127, 191, and then 255 is always the last. Here the blocks of addresses are going to go up that we've got zero to 63, then we've got 64 to 127, 128 to 191, and then lastly we've got 192 to 255. Those are the four blocks that we have.

Continuing on, a slash 27 means that we've got blocks of 32. So our network addresses are zero, then we just go up in 32s, 64, 96, 128, and so forth. Slash 28, we're going to go up always starting at zero.

Now we're going up in blocks of 16. How did I get 16? From up here. 16 blocks of size 16.

32, 64, well I missed 48, didn't I? 48, 64, 80, and so forth. A slash 29, zero, half now, half of that last one, and it goes up. A slash 30, and here we're going up in fours now, and this is where we usually stop, and this is why we stop, right? We said that a slash 31, if we look at these last two, I'm going to copy these down here, these last two.

So what this means is that we've got 128 networks, but each network only has two addresses, but we always lose two IPs, the network and broadcast, leaving us with zero host addresses. So it's not, there's nothing to put in the network. It'd be like having a piece of land that is too small to build a house on.

It's not useful. And then the same thing here, 256 addresses that can only have one in. So for subnets, this 31 and 32 cases don't make any sense because there's nothing usable, meaning host addresses, in them.

So let's go and recreate the chart, and I suggest you can do this very quickly. If we say a slash 24 has one group of 256, and then slash, these just keep going up by ones. This doubles, and this one drops in half.

Slash 26 means that doubles, and we cut the last one in half. Slash 27 doubles, cut it in half. Got to type better.

Slash 28, we double again, cut that in half. Slash 29, we double the number of networks, and we cut in half the size of those networks. A slash 30 gives us 64 fours.

### 23:39 - 33:36

If you can generate that chart, then you know you can generate the rest. So when we are given an example such as 192.168.2.215.26, and we're asked, is this a network, broadcast, host address, what is it? So we say a slash 26, we go up to our table and says, that's blocks of 64. So that means I need to find my network numbers.

I always start at zero, and I'm going up by 64s. 64, 128, a calculator maybe, 192. Those are my four networks.

So then I have to say, which network is 215 in? Well, 215 is clearly in the 192 network. So that address, so we know that our IP is in the 192.168.2.192 network, right? That would be the network address. So we know it's there.

If, since 192 is a network address, and we know 255 is the last broadcast, the last address, the broadcast, then 215 must be a host address. And we've solved the problem. Let's work another one.

Given an IP that's equal to 170.60.5.36, and it's a slash 29 IP. Well, from the 29, we go from our table and go, oh, okay, we're going up in blocks of eight. That means our network addresses are going to be 0, 8, 16, 24, 32, 40.

So 36 is less than 40, but more than 32. So I know that my IP is in the 170.60.5.32 block or network. I know that 32 is a network address.

40 is the next network, right? 40 is the next network, which means 39 must be the broadcast. So that means 33 through 38 are the host addresses. We're following the same exact theme every time.

That is, find what the CIDR mask is, look up the group size, group size of eight, go compute all of the starting network addresses, and go up until you find one that's above the subnet of interest or the IP of interest. Then you can determine which one it's in. It's in the 32 network, right? I'm sorry, 36 is in the 32 network.

We know that since 32 is a network and the next network address is 40, that N minus one, as I say, that network minus one gives us the broadcast. And then everything between network and broadcast must be the host. If you follow this process, you can get this every time without exception. Let's look at the mask.

Often we need then to, we need to determine the decimal subnet mask, such as like 255.0000 or something like that, right? So for us, we're starting with 255.255.255.0, right? Which is a class C block of addresses. And then we're going to carve this into smaller pieces or smaller subnets.

Let's look at what this looks like in binary. A slash 24 is going to be 1, 2, 3, 4, 5, 6, 7, 8.1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8.1, 2, 3, 4, 5, 6, 7, 8.1, 2, 3, 4, 5, 6, 7, 8. A slash 25 means that I'm going to cheat here. We're going to have 24 ones, and then the next octet has got a single one.

That's 25 ones, and we fill out the balance with zeros. A slash 26 is going to have two ones. A slash 27 is going to have three ones.

1, 2, 3. 1, 2, 3, 4, 5. A slash 28 is going to have four ones, five ones, and lastly a slash 30. One more to go, and then six of these, right? 24 plus 6, 1, 2, 3, 4, 5, 6, 0, 0. So you see that the first part is always the same. So our result is going to be something like this, 2, 5, 5, 2, 5, 5, 2, 5, 5, dot x. You know, whatever that x is, that's the value we've got to find.

Well, we know that this is no eight, no one 28s. You know, we go back to our, our listing, our map, go back down. That we know that when we have eight zeros, that means we have no groups of 128, no 64s, 32s, blah, blah, blah. It really is a decimal zero here. We've got one group, right here. We would have one group of one 28, and then everything else is zeros.

So this value would be one 28. The next value is going to be one 28 and a one there for 64, or we get one 92. Next one, we're going to have a one for the 32, right? Because we have, in this example, three ones.

That's where these three ones come from, and all the rest are zeros. So that means we've got one 28 plus 64 plus 32, or we have 224. Now we're going to add 16 more to 224, right? The next bit's So we get 240.

Then we get 248, eight more than that. Four more is 252. So we know that our subnets, that valid subnet addresses, are all going to be 255, 255, 255 dot, and then it's either going to be, it's either going to be a zero, or it's going to be a one 28 there, or it's going to be a 192, 224, 240, 248, 252.

So if somebody told you something like and said, you know, the IP is 192, 168, 1.5, and the subnet mask is 255, 255, 255 dot 239, you'd go, that's not possible to get 239. Because the way we get those is by adding up from left to right additional powers of two. And these are the only possible values there.

So 239 is invalid. It means either somebody's looking at the wrong thing, or they don't know what they're talking about. So we now can put next to these, our slash 24 is a final subnet octet of zero, a slash 25 means it's a one 28, a slash 26 means it's a 192, a slash 27 means it's a 224, a slash 28 means it's a 240, slash 29 means it's 248.

And you've already figured out this one 252. So we think about why we do what we do. We have a finite number of IP addresses, especially public ones.

### 33:36 - 34:32

So ISPs are going to carve up and sell smaller blocks for companies, typically companies are buying them. You know, why do we need, why do we need a static public IP, we need them for things like our websites, our virtual private network, you know, our firewall, that for our websites, for example, that we need to have a DNS entry for our webpage. So that xyz.com resolves to, I'll make it up a number 66161.83.9, or whatever it is, but companies, people want to type in xyz.com and we need it to resolve to an IP address that isn't changing, else one day it works and the next day it doesn't.

### 34:32 - 35:07

So they need to buy static IPs. When we go to buy a static IP, if we look at a typical setup, what we see is that, you know, on the bottom part of this, you've got like at home, what would you would have is your router or firewall is all of those things. It is a router and firewall.

It is a DHCP server and a switch. Typically they've got a couple, oftentimes four or more ports on the back that you can connect PCs to, and it may do wireless as well. We leave kind of wireless out of our conversation for now.

### 35:08 - 37:44

So what we have is our DHCP server is going to hand us out private addresses, something like this, 1.10, 1.11, and then we've got the IP between you and the ISP. In a business, if they're going to buy a static, that means in this network, even though these are two routers, these two routers have NICs. The router NICs are no different than the NICs in a PC or a Mac or anything else, any other kind of node.

And we know that for two nodes or two NICs to be able to talk directly, they must be in the same subnet. It doesn't matter if they're routers, PCs, or anything else, that the NICs must be in the same subnet. So if we wanted to get one static IP address, what we would find is that the ISP would use a slash 30.

We know that a slash 30 has four IP addresses, but we always lose two because we lose for the network and the broadcast, meaning that we only have then two usable IP addresses. Well, for you, your network to talk to the ISP and get out to the internet and such, you would use one of those addresses and their NIC would have to use the other address. So therefore, of the two usable IPs, you have one usable IP.

The other IP address is used by the ISP, else there'd be no way to connect. So a slash 30 gives us one static IP address that we can buy. If we go to a slash 29, we know that's a block of eight, but we lose two, which means there's six usable, but the ISP takes one for their router, giving us five usable addresses that we get to use.

A slash 28 is going to be 16 minus two, which gives us 14. We lose, ISP takes one, and that leaves us 13 usable addresses. So there's really 14 in the block, but if our network's going to talk to somebody else, the ISP, they need one IP for their router IP, router interface.
