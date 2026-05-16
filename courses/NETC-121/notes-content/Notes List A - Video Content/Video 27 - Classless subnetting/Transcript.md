# Video 27 - Classless subnetting

## Transcript

### 0:00 - 0:42

Let's look at subnetting. We've been focused on classful subnets, a slash 8, slash 16, slash 24, right? A slash 8 means there's 8 bits that are 1s, such as a 255 would be 8 bits that are 1s, followed by .0, .0, .0. Class B was slash 16, 255.255.0.0, and so forth. There are a lot of reasons why we want to carve up smaller or larger blocks than an A, a B, or a C subnet.

### 0:43 - 1:08

One of the primary reasons that we do it for public IP addresses is the sheer limitation. If you think about it, that if you only gave out, we said that IP version 4 has 2 to the 32nd IP addresses, or about 4 billion IP addresses among friends. We just round the number.

### 1:08 - 1:30

If you start giving them out in blocks of 256, 65,000, or 16 million for class A, then they start going real quickly, and we've exhausted all the IPv4 public IP address space. That's what made private IPs so important. Those must be behind a firewall.

### 1:31 - 3:08

Private IPs cannot reach the Internet directly. So if you think about it, if you were a company, if you thought about a company, that you're an Internet service provider, and you have one class C block of public addresses, and in that, that means that you could serve one customer gets the whole block, and that would be kind of business limiting for us. Now, when do you need static public IP addresses? When do you need them? Well, we need them for web servers.

We need them for VPNs to connect remotely in. We have a limited number of other uses, but most organizations don't need very many because behind the firewall, they can have a whole class A, 10 block of 16 million addresses. So they'll have enough for all their endpoints. It's on the public facing side. So for our web servers and maybe a database server of some sort, some things like that, limited number of other uses, they don't need many. So many companies might be able to get, let's just say they needed five addresses.

### 3:09 - 3:45

So if a company needs only five static public IP addresses, giving them a full C block, being that we have only one in our model here, would be very, very wasteful. So what we need to do is we need to be more discerning in this. So what we're going to do is we're going to divide the C block, maybe, into smaller equal sections.

### 3:50 - 5:24

So we can start. So for example, a slash 24 means that we have 256 raw addresses. Another part of the story we've talked about or haven't talked about yet is that in each subnet, the first IP is the network address.

The last IP is the broadcast. So that leaves all the IPs between the network and broadcast are host addresses, i.e. we can assign to a NIC. So that means that in a class C subnet of 256 addresses, we have 256 minus two network and broadcast, or 254 usable host addresses.

So we always lose two in every subnet. Two out of 256 isn't too bad. Two out of a class A block of 16 million isn't worth mentioning.

### 5:25 - 6:02

So when we start dividing, we create more. So if you think about it, we can take a class C block of 256 addresses and divide it into two equal pieces. We would call that a slash 25.

There's 25 ones. That means that we're going to have two subnets. One, let's use an example.

### 6:02 - 6:55

How about 192.168.1.0.24? And then we're going to divide into two. That means the first is going to be 192.168.1.0 through .127. And the second is 192.168.1.128 through 255. We just cut it cleanly in half.

And we can do that in quarters, in eighths, in sixteenths, in thirty seconds. It's always in a power of two. In this way, if we did this, if these were public IPs, these are clearly private, but if they were public IPs in the example before, then we could serve two customers.

### 6:57 - 7:17

And if we divide it into four, we could serve four customers. If we said that a customer only needed five static addresses, we can cut it down a lot more. The table below shows all of this, everything conceivable.

### 7:17 - 7:38

A slash zero would mean that, right, if you think about it, we're always dividing. The subnet mask is dividing how many networks from how many host addresses, networks and hosts. So a slash zero says there are only one network, or there is only one network, and that network has all of IPv4 land.

### 7:39 - 8:58

So a slash zero would say, as a subnet, would be everybody, the entirety of the IPv4 address space. We could cut IPv4, the entire block of all IP addresses, in half, and that would be a slash one. That means that we would have addresses that go from 0.0.0.0 to 127.255.255.255. And then the second block would be 128.0.0.0. It would go up to 255.255.255.255. And we can start carving this down.

And notice when we get to an eight, we recognize that subnet mask. That says we're going to cut this into 256 blocks, right, 256 different networks, and each network has 16 million addresses. We can go down to a slash 16, which we're familiar with for class B, and it's going to have 65,000 networks and 65,000 addresses.

### 9:01 - 9:22

And then we can go all the way down to a 24, where we've got 256 addresses, right, and 16 million possible networks. It's just how we want to divide it. So if we go to a slash 25, that means it's just going to cut the size down in half again.

### 9:22 - 9:49

So instead of 256 raw addresses, we drop to 128, but we get two blocks of those. If we carve the 24 up into a slash 26, that's going to give us four 64s. Or we can get eight 32s, or 16 blocks of 16, or 32 blocks of eight addresses.

### 9:51 - 10:00

That means that we could serve 32 customers. So it's clear why we would do this. We need to efficiently use that space.

### 10:00 - 10:24

If we go down further, a slash 30 says there's only four addresses. That means there's 64 possible chunks or networks, each one with four addresses. Now, remember, to make this useful for us, this means that in any network, we would want to have at least two nodes.

### 10:24 - 10:38

If we only have one node, we don't need a network. So the smallest network conceivable would be two nodes. For those two nodes, that means that a slash 30 is the smallest network we can have.

### 10:38 - 11:08

Because what we're talking about there is we're saying you get four addresses in a subnet, but we always lose two. The first is the network address, and the second is the broadcast address, leaving two addresses. In this context, a slash 31 doesn't make a lot of sense, because if you only had a subnet with two addresses, and you lose two addresses, one for network, one for broadcast, you've got kind of a pretty useless situation.

### 11:08 - 11:22

And a slash 32 means the same. So that's what we're going to do, and that's why we're going to do it. Here it shows for every CIDR subnet mask, it shows the decimal subnet.

### 11:23 - 11:42

How do we get the 128 here? Well, if you think about it, let's go examine that. A 128 decimal, let's go get our, let's do powers of two. When I've got to type it, I've got to kind of do it in the reverse order here.

### 11:45 - 12:09

These are just the powers of two. If you started from the right and wrote one, and then just doubled each value, stopping at 128. So this would be the 25th one, right? And then we would have zeros for all the other bits.

### 12:10 - 12:29

So we've got three 255s, and then the last one is a 28. Look at how this would move for a slash 26. That means we've got a one here and a one here.

### 12:30 - 13:01

That would be 26 ones, right? The first 24 ones are the three 255s. Each 255 is a block of eight ones. And now we're going to add two more to get to 26.

And then that means these are all zero. So if I do the decimal conversion, one group of 128, here I'm going to have 128 plus 64, 192. Here I'm going to have one, oh, don't want that to autofill.

### 13:03 - 13:53

One and one, nope, do not like that autofill. So then we get zero, zero, zero again, all the way through. And we just add, what, 32 more? And that gives us, what, 224? And the next one's going to be a one, one, one, one.

### 13:54 - 14:23

So how much is a group of one, another group of one, and another group of one? And then all zeros. Well, the fourth one is going to be a group of 16. So what's 224 plus 16 or 240? That's how all of these numbers are obtained.

### 14:23 - 14:44

And what's interesting also is if you look at this, right, look at these values. Here, in the first octet of the subnet mask, we see zero, 128, 192, 224, 240, 248, 252, 254, 255. And then the next octet goes through the same thing.

### 14:45 - 15:09

Zero, 128, 192, 224, and then after that, the third octet, and then the fourth octet. They just repeat again and again. Another way to think about this, right, is that since we're going, we're going to focus primarily on taking a C block or 256 addresses and cutting it up into smaller pieces.

### 15:10 - 15:18

Why? There's a couple reasons. One is a security reason. The other one is for public IPs, we do that to conserve resources.

### 15:21 - 15:44

So why would we do it for security? A slash 30 means there's only four addresses, minus the network and broadcast gives us two usable addresses. So if those two addresses were used to connect two routers, there couldn't be any other router in the middle. Even if they were connected to a hub, nobody else could participate.

### 15:44 - 16:06

There's only two valid addresses in that subnet. So that's what we talk about doing security, and we'll do a lot of slash 30s coming up. So the whole idea is this is what's called classless subnetting, so that we're getting away from A, B, and C to carve it up into smaller pieces for various reasons.

### 16:07 - 16:22

One might be if they're public addresses. Another might be even for private addresses to limit how many devices can be in the network. If we only want to have two routers connected, we would use a slash 30 that would preclude anybody else from participating.

### 16:24 - 16:33

Somebody else might be able to sniff in the middle if there was some kind of hub hooked up, but they're not going to be able to send traffic or have traffic sent to them.
