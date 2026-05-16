# Video 22 - CIDR & Subnet Mask

## Transcript

### 0:00 - 1:09

This presentation will look at CIDR and subnet masks. In IANA, which is the international organization that is tasked with managing and handing out IP addresses, IP version 4 is what we're interested in. And then there's the North American, which is ARIN, which is, for all of North America, assigns those IP addresses.

IP addresses typically get assigned to large organizations or ISPs, Internet Service Providers. And then from there, when you buy Internet connectivity services, they give you addresses. That's kind of how the food chain works there.

There are no more IPv4 addresses to be given out. However, ISPs still have a stash of those that they use. We use them every day when we sign with Roadrunner or Zoomtown or whatever our ISP is, if we've got a Verizon data plan, that we're getting an IP address, but we're getting a dynamic one.

### 1:09 - 1:30

And they have a pool of dynamic, and those get reused, so it's very efficient. However, companies need some static IP addresses. So the solution long-term is to move to IP version 6, which will have more addresses than that most people could conceive of needing.

### 1:31 - 2:02

So in the pathway, we talk about an IP address that can be reached directly on the Internet is what's called a public IP address. In the beginning, pretty much all PCs were given public Internet-facing addresses, because it started out as DARPAnet, the Defense Advanced Research Project Association, which was funded by the military and the government, and it was researcher sharing. And we want all the researchers to be able to see everybody.

### 2:03 - 3:28

As educational institutions and other organizations started getting onto what now is the Internet, it requires more and more IP addresses. Every node needs an IP address. And so we have two problems concurrently.

One is a dramatic explosion of IP addresses that are needed, similar to the problem that we faced in the 513 area code, that as the number of pagers, cell phones, distinctive ring, fax machines, and such absolutely exploded in growth, the numbering in the 513, the number of available phone numbers, was heading towards exhaustion. Before that happened, they divided 513 into the 937 to north up in Dayton area, and 513 stayed in Cincinnati. They cut it in half.

They did the same for 606 in Kentucky. 859 is now northern Kentucky, and Lexington is 606. The second part of this was it was a terrible security risk, since everybody could see everybody.

As the bad guys come onto the scene, this is not a good thing to have all your machines out on the Internet. So we talk about public and private addresses. So public addresses are IP addresses that can directly reach, directly be reached or reached from the Internet.

### 3:28 - 5:01

It's very similar to having a phone number where you can dial to somebody's desk, such as mine. 513-569-1776 gets to my desk. You've seen other organizations where to call somebody, you have to call a main number, 555-1000 or whatever it is, and then you have to select extension 216 or whatever the extension is.

There's no direct way to get in. It's an indirect way. So since companies only need a few static IPs, typically one for access to the Internet for other nodes, a virtual private network for security, web server, some things like that, they don't need big blocks of IP addresses.

So the way we solve this is we can use a router that's going to have one static IP address that's a public address, and behind that router we can have vast numbers, thousands, tens of thousands of nodes that can masquerade behind that one IP address. And we talk about this as network address translation or NAT. It's a topic we cover in the next class.

All of our home access points and routers do this by default. That way we can have one address from Roadrunner or Zoomtown, and we can have many machines back behind it. So if the IP can be directly reached via the Internet, we talk about it as a public IP address.

### 5:03 - 7:34

Therefore, a private IP address, by definition then, cannot be reached directly from the Internet or reach the Internet directly. It is behind a router. So it must be routed onto a public IP address.

And the upshot of this is here's the solution we have, that we have these three blocks of private IP addresses. Since these addresses cannot ever be directly on the Internet, I can use them in my company, you can use them in your company, and we can all use them safely in the same way that if a company has a phone system, they can say, oh, we want to use extensions, 101 through 299, and they don't have to worry about what another company is doing because those extensions are private, if you will, or internal. In the private blocks, we've got a class A block.

So 10.anything, when you hear that IP address or see that IP address, you know that's a private address. Next one's a little trickier, 17216 to 17231, anything in that range is a private address. When we looked at IP addresses in the college, if you do an IP config like I've done on the instructor console, you see that it's a 17216 address.

And lastly, we've got a class C block, 192168. This is terribly frustrating for gamers, in particularly, because they need to talk directly. And they say, what's your IP address? As soon as somebody says, it's 192168, whatever, it's kind of like somebody telling you that it's a 555 phone number, it's not going to be reachable.

Increased security also comes in that, in the same way that if you think about a phone that where a company uses extensions, you have to dial nine to get an outside line, nobody can call that phone and ring it directly, they cannot reach that phone. They have to call the main number, they can ask the operator to be connected or search by directory kind of thing, if that's exposed, but they can't get there directly. However, anybody in the inside can dial nine and connect to somebody on the outside, they can make the connection.

Therefore, they don't get unsolicited. In this case, a tax is what we're worried about, somebody trying to access it without your authorization. So if we do an IP config, we'll see what our IP address is.

### 7:35 - 10:48

If you open a web browser and go to a place like hostip.info, and there's other ones like it, it'll show you from the website's perspective, the outside world, where's your traffic coming from? Invariably, I think you'll find that you'll see that it will be a public IP address, and it will not be yours. You'll probably have a private, this will be a public. So in the scheme of efficiency, since IPv4 space is limited, and most customers only need a few static IP addresses, giving them a whole C block, and then having them waste 248 or 250 addresses is a very inefficient way to waste a valuable commodity because IPv4 space is very limited.

So we need to carve up this space. I use the word carve, divide, partition into smaller blocks so we can give everybody their own block. However, we don't have to give them these huge blocks.

So we talk about this idea of classful versus classless. We've been dealing with class A, B, and C. Something like that, we talk about it as classful. Anything else would therefore, by definition, be classless.

We introduced the CIDR or CIDR, classless inter-domain routing, which uses the notation of a forward slash and then a number, which is the number of bits in binary that's in the subnet mask. So from this point forward, we talk about a slash 24 subnet, which means exactly the same thing as a class C, 255, 255, 255.0. But it's a more efficient way that it's written. We'll find many devices as we configure them do not accept that.

Some do. Cisco typically doesn't. So when we type out and we set an IP address on VLAN 1, for example, and we say IP space address space 192.168.1.100 space 255.255.255.0, that we can't use the slash 24 in the command structure.

So the subnet mask isn't binary. All numbers in computers are binary. We can represent them as decimal or hex or anything we'd like.

And we've got 32 bits. And we can slice and dice that 32 bits into the number of networks or the number of hosts. In the next slide here, we see this example.

Each one of these lines is 32 bits long, bit 0 to bit 31. And we can divide this for a class A. We use 8 bits for the network information. And we get 2 to the 8th power.

And it gives us 256. So we have 256 possible networks. But each network can have 16 million to the 24th possible host.

### 10:49 - 12:00

We can carve it up a different way. We can make it into 65K for class B, 65,000 possible networks, each network of a size that can support 65,000 nodes. And lastly, a class C, which we've got 16 million and 256 hosts in each of the 16 million possible networks.

So that's how we're going to divide it. Instead of having these nice rigid lines, we're dividing on blocks of 8, we're going to divide it in other places. So we just talked about the number of networks and the number of hosts that we can carve this up into.

So in the carving, imagine if we took a block, a C block, which we know has 256 raw addresses. We got one network, 256 addresses. We can also cut that in and carve it up, partition it, if you will, into different pieces, two networks of 128, 464s, 832s.

### 12:00 - 14:05

They all lay it up to the same number of addresses. 8 times 32, 8 networks of 32 is 256 addresses. Every subnet or network has a network number and a broadcast address.

The first address is the network address, and the last is the broadcast address. Those cannot be assigned to nodes. So they're kind of reserved, if you will.

Everything in between are by definition host addresses. So from a host perspective, when we look at how many host addresses do we get, we're always going to lose two in any network. If we're starting with a C block of 256, we lose two, we get 254 usable IP addresses.

So graphically, this is kind of what it looks like. The first address, address zero, would be the network, and the last address, ending in 255, would be the broadcast. So for example, 192.168.1.0 would be the network, 192.168.1.255 would be the broadcast, and 192.168.1.1 through 1.254 would all be host addresses that are available.

So here I show that we can carve this down into two. If we use a slash 25, one bit more than a slash 24, with one bit we get two combinations. We're going to partition this block into, you know, the first block and the second block. We just divide it in half.

If we partition it again, divide it into quarters now, take that half and divide it again, a slash 26, look at how the values go. Zero to 63, 64 to 127, 128 to 191, 192 to 255.

### 14:08 - 14:48

So in that example, we've got the first block, right? If we look at something like a class C block, starting at this IP address, and we want to see how many 26 blocks can we get. 26, we know that a slash 24 is a class C. Slash 26 is two more, with two bits, we get two raised to the two power, gives us four combinations. We've got 256 blocks, or 256 IP.

### 14:51 - 17:34

We're going to get four blocks of 64 addresses each. The network addresses are the easy ones to get. We're going to go zero, 64, 128, 192.

We know how to find, now that we've got all the network, the broadcast is simply going to be the network minus one. So we know that the broadcasts are going to be 15, 31, 63, 95, 127, and so forth. And then everything else in between are host IP addresses. Need to work through a few examples to get a working knowledge of it.

Example three, question is, here's an IP address with a subnet mask, 205.1.1.75 slash 27. It's either a network, a host, or a broadcast address. What is it? So we need a way to get a boundary on this.

Slash 27 is smaller than a C block. Let's find the beginning of, let's roll it back to the first. So 205.1.1.0 would be the beginning of that C block, but it's smaller than a C. 27 is three bits more than a 24.

Two to the third gives us eight blocks. So we know that we've got 256 addresses for a C divided by eight. It's going to be 32 addresses per. So zero through 31 is the first block, 32 through 63 is the next block, and so forth. We look at the solution. Then we see that 1.75 falls in this range.

So it is clearly a host address. We also see from the table that a slash 27, if we have to write it out, is going to be a 255.255.255.224 subnet mask. There are many utilities and websites that perform this task. One that I tend to like is the Warriors of the Net, silly name, but it has a nice subnet mask calculator that will generate that table and show you all those.
