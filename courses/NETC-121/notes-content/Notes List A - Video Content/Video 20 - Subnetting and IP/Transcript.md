# Video 20 - Subnetting and IP

## Transcript

### 0:00 - 0:16

In IP addresses, we would never want to lose track of the idea that the only thing that we can ever send down the wire is a frame of data. And a frame's going to be, I think of it, composed of two parts. We need the addressing information.

### 0:16 - 0:29

There's always the from and to, or we call it source and destination. And those would be MAC addresses. We always need to know that we would know our source MAC address, but we need the destination MAC address.

### 0:30 - 0:48

And then we have the payload. And that payload is information encapsulated from the network layer and above. It could be a command to put a picture up on Facebook, or part of a Skype video chat, part of the picture in that video frame, or a request to get a web page.

### 0:50 - 1:02

Let's look at decimal numbers. It's been a while since you've probably looked at it this way. When we think about decimal, we think about each placeholder represents the base 10.

### 1:02 - 1:15

Decimal, that's what that means. So the first digit is the ones. 10 to the 0 power, anything to the 0 power is 1. The second digit, 10 to the 1st, or tens, the hundreds and thousands.

### 1:16 - 2:00

So when we write 3, 4, 2, 7, really what we're saying is we've got 3 times 1,000, plus 4 times 100, plus 2 times 10, plus 7 times 1. 3, 4, 2, 7 is an entirely different number than 7, 2, 4, 3. The placeholder, where it is, indicates its weighting or its value. Other number systems use a different base. Octal is base 8. So instead of 10 to the 0, we'd have 8 to the 0, 8 to the 1st, 8 squared, 8 cubed.

### 2:01 - 2:18

As we go on, let's look at binary. Binary simply means ones and zeros, or base 2. And it is the only thing that anything digital understands. All computers, networks, MP3, everything is binary numbers.

### 2:18 - 2:50

They're not terribly useful, or I shouldn't say useful, but they're not easy for us to manipulate large binary numbers. We would rather represent them in a different form, such as decimal or hexadecimal. So in binary, being base 2, we have each placeholder is going to be 2 to 1st to 0 power, 2 to the 1st, which is 2, 2 squared, which would be 4, 2 cubed, 8, and so forth.

### 2:50 - 3:19

We see that each one doubles across. So to represent the number 32, we would have a 1. Each digit can only be a 0 or a 1. 0, 0, 0, 0, and 0. So binary numbers end up expanding and being a lot larger. But we need to be able to work with this system.

### 3:20 - 3:40

If I had the value of 0, 0, 0, 1, 1, 0, 0, 1, it basically means I don't have any 128s. I have no 64s. I don't have any 32s, but I've got a 16.

### 3:40 - 4:06

So if we converted this to decimal, I've got 16. Then I've got, I'm going to add to that, 8. I've got one group of 8. I don't have any 4s. I have no 2s, and I have a 1. So this binary value, deleting 0s would not necessarily be required, just like in any other numbers we write.

### 4:07 - 4:19

That this 1, 1, 0, 0, 1 would be 25 in decimal. So we can convert back and forth. I usually try to use a calculator, so I don't make a mistake.

### 4:21 - 4:55

So we think about this 255, these subnet mass values, 255, 255, 255, dot 0. Where do those values come from? Well, if we look, 255 is a series of 8 1s. I often, when I write things out, I'll put a space just to group these, but don't read anything more into the space. So it's basically one group of 128 plus 64 plus 32 plus 16, 8, 4, 2, and 1. Add them all together, and we get 255.

### 4:59 - 5:26

Hexadecimal, or base 16. So here, each, we don't want to say digit, but each placeholder is going to have a value of one of 16 different possibilities. We use 0 through 9, and then we use the letters A through F. One of the things that makes it very nice in hexadecimal is that each four bits of a binary value is a single hex digit.

### 5:27 - 5:46

So while decimal we saw was more compact than binary, hexadecimal is even more compact way of expressing numbers than decimal. MAC addresses are expressed in hexadecimal. Every Simpsons TV episode is numbered in hexadecimal.

### 5:47 - 6:00

Got to be a Simpsons person to know that. So when we go to IP addresses, what we see is that an IP address is a 32-bit number. We said it's divided into four chunks called octets.

### 6:00 - 6:17

Oct, octal, meaning 8. So each of the four pieces of an IP address is 8 bits. So we have four 8-bit values. 2 raised to the 8th power gives us 256 possible combinations.

### 6:18 - 6:50

We choose numerically to represent that as 0 through 255. So if someone said an IP address had a value of 1.7.319.5, that could not be a valid address because the maximum possible value would be 255 for any single octet. When we look at IP addresses, we talked about the subnet groups how big the network is.

### 6:51 - 7:04

And it ends up that we call the first address the network address. The last address is called the broadcast address. And then we call everything in between, we call those host addresses.

### 7:07 - 7:28

So we have different ways, and we'll talk about that, of working with IP addresses and what they mean. So for host addresses, this is what we're assigning to a network printer, a server, a PC, a card swipe, an IP camera. Any node would be assigned a host IP address.

### 7:29 - 7:47

The network and broadcast addresses do not ever get assigned to something. So for example, if we use the network 192.168.1.0, that's kind of, I think, about it talking like an apartment building. It is the collection.

### 7:47 - 7:58

It is a collection of IP addresses. So in the same way that an apartment building is a collection of apartments. In this metaphor, each apartment would be like an IP address.

### 7:58 - 8:11

So we want to talk about all of them. We talk about, we use the network address. So the first address, 1.0, is the network address.

### 8:12 - 8:44

The last address, 1.255, is the broadcast. And then 1.1 through 1.254 end up being the host addresses. When we break up the network into subnet classes of A, B, or C, we see that a class A means that this 255 here means that basically the first eight bits describe how many networks there are.

### 8:45 - 9:04

So 0 through 255 means there's 256 networks maximum. But each network is going to have 24 bits worth of host values. 2 to the 24th is basically 16, a number greater than 16 million addresses.

### 9:06 - 9:25

A class B, we use 16 bits to describe how many networks we can have. We can have 65,000 possible networks. And each individual network can have 16 bits worth, or 2 to the 16th is 65,536 host addresses.

### 9:26 - 9:59

And the smallest network that we are concerned with, a class C, says there can be basically 16 million, or 2 to the 24th, possible networks, each network being 256 in size. I say 254 host addresses because of the 256, we've got 256 to start with. And we need to lose one for the network address and one for the broadcast address, leaving us with 254.

### 10:05 - 10:30

When we talk about picking the size of the subnet, why would you pick an A, B, or C, or how does this work? We usually use the smallest subnet that makes sense. If we think about the acronym SOHO, a small office, home office, or just even in your home, how many devices are you likely to have? Very few people have 200 plus devices. So a class C subnet makes perfect sense for that.

### 10:34 - 10:51

Could we use a class B? Absolutely. And some people do choose that. But if you look at your D-Link, or Netgear, or whatever router you have at home, if you have a wireless router, for example, you'll typically find that they're all set up for class C addresses.

### 10:52 - 11:12

Class B, since we use 16 bits to describe that, that allows for 65,000 addresses. We have several thousand computers and nodes at the college. So if we wanted all of those nodes to be in the same network, a class C subnet, we can only have 254.

### 11:12 - 11:23

That's not going to be big enough. We could divide them up into multiple class C blocks and route between them. But it's often easier to simply use a bigger network.

### 11:24 - 11:36

So we use a class B network that can accommodate up to 65,000 nodes or host addresses. We don't have to use all of those, obviously. We can use what we want.

### 11:36 - 11:48

So we have more than enough to spare for future growth. Zoomtown, or sometimes larger companies, use a class A subnet. This gives you up to 16 million nodes.

### 11:49 - 12:10

You know that Zoomtown has more than 100,000 customers, or 65,000 customers. So therefore, if they wanted everybody to be in the same network, they would have to use a class A subnet. Unicast versus Broadcast.

### 12:13 - 12:26

In this, Unicast simply means we're sending it to one destination. I address the envelope to one person and send it. Broadcast is what I think of as the overhead page, paging all customers.

### 12:27 - 12:56

It's sent to everyone. ARP uses that address resolution protocol, uses that broadcast MAC address of all Fs to indicate to every network interface card or NIC that this is a frame that you should pay attention to. And the payload of that frame basically says, I'm looking for this IP address of whoever I'm trying to reach.

### 12:57 - 13:19

And if that address is on the network, will you please let me know what your MAC address is? So I can craft a frame and send you the payload data. IP broadcast is also broadcast at the network layer. So here, we can think about contacting all IP addresses.

### 13:20 - 13:33

One of the tools I've used in the past is a program called PC Anywhere. PC Anywhere is a remote control program. So IT people often use that, or their mobile phone or many other programs that provide the same functionality.

### 13:34 - 13:45

What it would allow you to do is to remotely control a computer. So let's say you log on and you could help some user or fix their machine. They wouldn't even have to be there, per se.

### 13:45 - 13:57

And you could log on remotely and make changes and fix problems. I would set PC Anywhere up. And instead of putting one specific IP, I would put the broadcast address in.

### 13:58 - 14:07

And when I did that, it would announce to all the PCs that I wanted to see who was online. It was kind of like a roll call in that way. And they would report back.

### 14:07 - 14:30

And then I would pick the computer I was interested in, where I could at least see if it was online. So when we review, we think of sending information from one IP to another IP, a source to a destination. Just in the same way we think about calling from our phone number to another phone number, we think about it in those logical terms.

### 14:31 - 14:40

We say logical in that phone numbers or IP addresses, it doesn't matter who they are. They get assigned. And then we use those values.

### 14:43 - 15:04

However, to actually get the message through, we're going to have to, for a phone call, connect a pair of wires together to send the information. Or for us, we're going to have to encapsulate the information into a frame and then send it. However, usually before we can send it, we usually don't know the destination MAC address.

### 15:05 - 15:30

And we solve that problem. It's solved for us, if you will, automatically and transparently that a protocol called ARP, Address Resolution Protocol, will look and see if the destination IP address we're after, if that is in the internal ARP table, where it matches up of MAC addresses and IP addresses. If it is there, it'll go ahead and send the frame.

### 15:31 - 15:48

Invariably, it will not be there at our first communication. So ARP will send out that MAC address broadcast, asking for the destination to reply back with its MAC address. Then it can craft the frame and communicate.
