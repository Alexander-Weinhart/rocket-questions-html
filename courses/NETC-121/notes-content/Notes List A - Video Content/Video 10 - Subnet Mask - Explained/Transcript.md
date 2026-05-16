# Video 10 - Subnet Mask - Explained

## Transcript

### 0:00 - 0:28

What is a subnet mask? So that is a topic of this  video. Now before we talk about what a subnet mask is we must first talk about what an IP address  is. An IP address is an identifier for a computer or device on a network. Every device has to  have an IP address for communication purposes. And to be specific, I'm talking about an IPv4  address. An IPv4 address is a 32-bit numeric

### 0:28 - 0:41

address, written as four numbers, separated  by periods. Each group of numbers that are separated by periods is called an octet. The  number range in each octet is from 0 - 255.

### 0:41 - 1:21

An IP address consists of two parts. The first  part is the network address and the second part is the host address. The network address or network  ID is a number that's assigned to a network. So every network will have a unique address. The  host address or host id is what's assigned to hosts within that network such as computers, servers,  tablets, routers, and so on. So every host will have a unique host address. Now the way to tell  which portion of the IP address is the network or the host, is where the subnet mask comes in.  A subnet mask is a number that resembles an IP

### 1:21 - 2:00

address. And it reveals how many bits in the IP  address are used for the network by masking the network portion of the IP address. Now in the  world of computers and networks, IP addresses and subnet masks in this decimal format here  are meaningless. And this is because computers and networks don't read them in this format and  that's because they only understand numbers in a binary format, which are 1s and 0s.  And these  are called bits. So the binary number for this IP address is this number here. And the binary  number for this subnet mask is this number.

### 2:00 - 2:35

And these are the numbers that computers and  networks only understand. So the next question is, how do we get these binary numbers from this IP  address and this subnet mask? So here we have an 8 bit octet chart. The bits in each octet are  represented by a number. So starting from the right, the first bit has a value of 1 and then  the number doubles with each step. So there's 2 then 4, 8, and so on, all the way up to 128. Each  bit in the octet can be either a 1 or a 0. If the

### 2:35 - 2:58

number is a 1 then the number that it represents  counts. If the number is a 0 then the number that it represents does not count. So by manipulating  the 1s and 0s in the octet you can come up with a number range from 0 - 255. So for example,  the first octet in this IP address is 192.

### 2:58 - 3:12

So how do we get a binary number out of 192? First  you look at the octet chart and then you will put 1s under the numbers that would add up to the  total of 192. So you would put a 1 in the 128 slot

### 3:12 - 3:33

and then a 1 in the 64 slot. So now if we count  all the numbers that we have 1s underneath them, you would get a total of 192. All of the other  bits would be 0s because we don't need to count them since we already have our number. So this  number here is the binary bit version of 192.

### 3:33 - 3:55

So let's do the next octet which is  168. So let's put a 1 under 128, 32, and 8. And then all the rest would be 0s. So if  we were to add all the numbers that we have 1s underneath them we would get a total of 168.  The next octet is 1. So we'll put a 1 in the 1

### 3:55 - 4:04

slot and when you add up only 1 you get 1. And  the last octet is 0, which makes things simple

### 4:04 - 4:12

because all the binary numbers would be all 0s.  So here is the binary number for our IP address.

### 4:12 - 4:57

Now the subnet mask binary conversion is  exactly the same way. So in this subnet mask the first 3 octets are 255. So if we  were to look at this subnet mask in binary form, the first 3 octets would be all 1s  because when you count all the numbers in an octet it will equal 255. And  then the last octet would be all 0s. So here we have our IP address and subnet mask  in binary form lined up together. So the way to tell which portion of this IP address is the  network part, is when the subnet mask binary digit is a 1 it will indicate the position of the  IP address that defines the network. So we'll

### 4:57 - 5:23

cross out all the digits in the IP address  that line up with the 1s in the subnet mask. And when you do this it will reveal that the  first 3 octets of the IP address is the network portion and the remaining is the  host portion. So the 1s in the subnet mask indicate the network address and the 0s indicate  the host addresses. So in another example let's

### 5:23 - 5:49

use a different IP address and subnet mask and  let's put them in binary form. So in this example the first 2 octets are 255 and the last  2 octets are 0. So if we cross out all the digits in the IP address that line up with  the 1s in the subnet mask, we'll see that the first 2 octets is the network portion  and the last 2 octets is the host portion.

### 5:49 - 6:28

And let's do one more, and in this subnet mask  the first octet is 255 and the rest are 0. And then we'll cross out all the digits again, and  this time it reveals that the first octet is the network portion and the last 3 octets are for  hosts.  Now figuring out the network and host parts of an IP address using these default subnet masks  was simple.  Because as I stated before, when you count all the numbers in an octet it will equal  255. So we automatically know that the numbers in the octet are all 1s, so we really didn't  have to see the IP address or subnet mask in

### 6:28 - 7:04

its binary format because it's so simple.  But  what if the subnet mask was this number here where the first two octets are 255 but the  third octet is 224?  So this is a little trickier. So here is the binary number for this subnet mask.  The first two octets are all 1s and in the third octet, the first three bits are 1s which will  equal 224, because starting from the left, when you add the first 3 bits in an octet it adds  up to 224.  So let's put this subnet mask and IP

### 7:04 - 7:26

address in its binary format.  And again if we cross  out all the digits in the IP address that line up with the 1s in the subnet mask, we'll see that  in the IP address, the first 2 octets and the first 3 bits in the third octet is the network  part and the 13 remaining bits are used for hosts.

### 7:26 - 8:06

So another question is, why does an IP address have  a network and a host part?  Why can't it just have a host part to uniquely assign each device an IP  address?  So why does it have a network part also? Now the reason for this is manageability.  It's  for breaking down a large network into smaller networks or sub networks, which is known as  subnetting.  So for example let's say that there were no small networks.  Let's say that an  organization has a large amount of computers in one huge network.  Now when a computer wants to talk to another computer, it needs to know how

### 8:06 - 8:42

and where to reach that computer.  And it does this by using a broadcast.  A broadcast is when a computer sends out data to all computers on a network  so it can locate and talk to a certain computer. So for example let's say that this computer here  wanted to communicate with this computer over here So what happens next is that this computer  here will send out a broadcast out on the network asking the target computer to identify  itself so it can communicate with it.  But the problem with this is that every computer on this  network will also receive the broadcast because

### 8:42 - 9:21

they are all on the same network.  So as you can  imagine, if every computer on this large network was broadcasting to every other computer, just to  communicate, it would be chaos.  It would slow down the network and potentially bring it to a halt  because of the tremendous amount of broadcast traffic it would cause.  And it might even cause  fires, well not really but, and if a problem were to happen on the network it would be very difficult  to pinpoint because the network is so big.  So in order to prevent this networks need to be broken  down into smaller networks and networks are broken

### 9:21 - 9:36

down and physically separated by using routers.  And  by using routers this would alleviate the problem of excessive traffic because broadcasts do not go  past routers.  Broadcasts only stay within a network

### 9:36 - 10:20

So now instead of one large network, this network  is broken down into 6 subnetworks or subnets. So now if this computer here wanted to communicate  with this computer over here, the computer will send out a broadcast that only the computers in  its subnetwork can receive.  But since the target computer is on a different subnetwork here,  the data will be sent to the default gateway, which is the router, and then the router will  intelligently route the data to the destination. So this is why IP addresses have a network  portion and a host portion, so networks can be logically broken down into smaller  networks which is known as subnetting.

### 10:20 - 10:52

Hey guys I just want to break in here and tell you  that if you're a beginner and you want to learn more about networking, I highly recommend  an audio book that will help you do that. I linked it in the description below and  you can download and listen to it for free. Just get the book by signing up for the free  30-day trial of Amazon audible premium plus. But even if you cancel your audible membership at  any time during the 30 days, the audio book is still yours to keep forever without paying anything.  So just click the amazon affiliate link below

### 10:52 - 11:25

and by doing that you'll also be supporting my  channel because I still get commission even if you decide to cancel.  So once again it's completely  free and thank you.  So let's do an example here, so let's say that you have a small business and  that this is your IP address and subnet mask Now let's say that your small business has a total  of 12 computers and all 12 of these computers are on a single network.  And these computers belong to  different departments indicated by their colors But let's say that you wanted to separate  the computers into 3 different networks

### 11:25 - 12:08

So that each department won't see the other  department's network traffic.  So instead of having 1 network in your business, you want  to break it down into 3 small networks. So the way to break this network down into smaller  networks is by subnetting.  Subnetting is done by changing the default subnet mask by borrowing  some of the bits that were designated for hosts and using them to create subnets.  So in  this subnet mask we're going to change some of the 0s in the host portion into 1s  so we can create more networks.  So if we leave the subnet mask the way it is, it will give us 1  network with 256 hosts.  Now technically we have

### 12:08 - 12:47

to subtract 2 hosts because the values that are  all 1s and 0s are reserved for the broadcast and network address respectively, so we actually  have 254 usable hosts.  But we need to change this subnet mask so we can produce the 3  networks that we need.  So for example let's borrow 1 bit from the host portion.  So here  is our new subnet mask.  So now the fourth octet is 128 because when you count the first bit in  an octet it equals 128.  So by borrowing 1 bit this will divide the network in half.  So now  instead of having 1 network with 254 hosts

### 12:47 - 13:16

this will give us 2 networks or subnets with  126 hosts in each subnet.  Now let's keep going and borrow another bit from the host portion.  So  now we are borrowing a total of 2 bits from the host portion.  So here is our new subnet mask, and  the fourth octet is 192.  So by borrowing 2 bits this will divide the network even further and  now it'll give us 4 subnets with 62 hosts each.

### 13:16 - 13:30

And again let's borrow another bit from the  host portion.  So here is our new subnet mask. And by borrowing 3 bits this will divide the  network into 8 subnets with 30 hosts each.

### 13:30 - 13:43

So if we continue breaking down this network,  here is the result if we borrow 4 bits which will give us 16 subnets with 14 hosts  each.  And here is the result if we borrow 5 bits

### 13:43 - 13:51

which will give us 32 subnets with 6 hosts each.  And if we borrow 6 bits this will give us 64

### 13:51 - 14:05

subnets with 2 hosts in each subnet.  Now  this is pretty much the limit because if we borrow 7 bits it will give us 128 subnets  but with 0 usable hosts.  So as you can see

### 14:05 - 14:44

the more bits the network portion borrows from  the host portion, the amount of networks that can be created doubles with each bit.  But also the  amount of hosts per network gets cut in half with each bit.  So going back to our business  example, if we wanted to break this network down into 3 smaller networks or subnets we would  have to borrow 2 bits from the host portion. so even though we only need 3 networks, this  subnet mask will give us at least 4 networks to work with.  So our new custom subnet mask  for our 3 subnets would be 255.255.255.192

### 14:44 - 15:21

So now our network is broken down  into 3 smaller networks or subnets. Now just to be clear, this video is about subnet  masks.  This is not a full lesson on subnetting because there's a little more to subnetting than  what I showed you here.  I'm just showing you how subnet masks relate to subnetting.  Now IP addresses and subnet masks come in 5 different classes. Which are classes A - E.  However 3 of  these classes are for commercial use.  So here is a chart of the IP addresses and default subnet masks  which are class A, B, and C.  And you can tell by the

### 15:21 - 15:57

number in the first octet of the IP address and by  the default subnet mask which class they belong to Now when an organization needs networking they  will need an IP address class according to the needs of that organization, which is based on how  many hosts they have.  So if an organization has a very large amount of hosts, they will need a class  A IP address.  A class A IP address can produce up to 16 million hosts.  So as you can see, in a default  class A subnet mask, the host part is very large

### 15:57 - 16:38

3 octets are used for hosts which is  why it can produce so many.  An example of an organization that would need this many hosts  would be something like an internet service provider, because they would need to distribute  millions of IP addresses to all their customers. A class B IP address can produce up to 65,000  hosts.  This class is given to medium to large organizations.  And a class C IP address can produce 254 hosts.   Class C IP addresses are used in small organizations  and homes that don't have a lot of hosts.

### 16:38 - 17:11

Now subnet masks can also be expressed in  a different method called CIDR and CIDR stands for classless inter-domain routing, which  is also known as slash notation.  Slash notation is a shorter way to write a subnet mask.  And it  does this by writing a forward slash and then a number counting the 1s in the subnet mask.  So for  example if you see an IP address like this, with a CIDR notation of /24 this means that the  subnet mask is 24 bits in length, meaning it has 24

### 17:11 - 17:19

1s.  If the CIDR notation is /25 this  means that the subnet mask is 25 bits in length

### 17:19 - 17:34

Or if it's /26 this means that the  subnet mask is 26 bits in length.  Or if the cider notation is /8 this means  that the subnet mask is 8 bits in length

### 17:34 - 17:38

So I want to thank you all for watching  this video on subnet masks.  Don't forget to subscribe and get the audio book for free using  the link below.  And I'll see you in the next video.

