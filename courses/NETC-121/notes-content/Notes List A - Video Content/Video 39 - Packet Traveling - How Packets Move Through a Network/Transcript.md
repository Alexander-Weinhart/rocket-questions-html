# Video 39 - Packet Traveling - How Packets Move Through a Network

## Transcript

### 0:02 - 0:23

Hey YouTube, this is Ed from practical networking.net. This video is a series finale to an article series that covers everything you need to know to understand how a packet moves through a network. You can access the series at practical networking.net or by clicking here. There will also be a link in the description. In this series, we talked about everything that happens for two directly connected hosts to speak to each other. Next, we talked about

### 0:23 - 0:45

everything that happens when you add a switch to the middle. Then, we talked about everything that happens when you add routers to the mix. In this video, we'll combine all these lessons as we discuss everything that happens to get a packet from a host through a switch, then a router, then another switch, then finally to another host. I highly recommend reading through the article series in order to get the most out of this video. Let's get

### 0:45 - 1:09

started. This is the sample topology we'll be using. Our topology will have four hosts, two switches, and one router. If you read the article series, then you understand that routers facil facilitate communication between networks. Since our router has two connections, it means we have two IP networks in our topology. Each host will also have an IP address in their respective network. For example, host A's IP address will be

### 1:09 - 1:36

11.11.11.10. Each host will also have a MAC address. I'm only providing the first four digits of the MAC address. If you repeat this three times, you'll get the complete MAC address. Router interface will also have an IP address and a MAC address. I will refer to the router's left interface as Ethernet 1 or ETH1. and I will refer to the router's right interface as Ethernet 2 or ETH 2. The switches will be referred to as switch X and switch Y. Each port on the

### 1:36 - 1:58

switch will also be uniquely labeled. Switch X will have ports 1, 2, and three, and switch Y will have ports four, five, and six. To demonstrate how hosts, switches, and routers process traffic, we'll be looking at three different tables that these devices maintain. An ART table, a MAC address table, and a routing table. An ART table is a mapping of an IP address to a MAC address. All layer 3 devices will have an ARP table. A MAC

### 1:58 - 2:20

address table is a mapping of a switch port to a MAC address. As traffic flows through a switch, they will identify what devices are connected to each port by their MAC address and record it in their MAC address table. For example, at some point in our illustration, switch X is going to identify that the device on port 2 owns MAC address a AAA. Lastly, a routing table is a mapping of IP networks to egress interfaces. Routing table is a map of

### 2:20 - 2:43

every network the router knows how to get to and how to get there. Understanding how each of these tables are populated as well as how they are used to process traffic is critical to knowing how packets travel through a network. To illustrate this, we will look at the tables for each device in this gray area to the right. We will look at host A's and host D's ARP table. We will also look at the switch's MAC address tables. And for the router, we

### 2:43 - 3:09

will look at its ARP table and routing table. Each of these tables are populated dynamically as traffic is moving through each respective device except for the routing table. The routing table is populated prior to any traffic showing up. Since the router's ETH1 interface is configured with the IP address 11.11.11.1, our router knows that the E1 interface is directly connected to the 11.11.11.0/24 network. Similarly, since

### 3:09 - 3:33

our router's ETH2 interface is configured with the IP address 22.22.22.1, 22.1. Our router knows that the Ethernet 2 interface is directly connected to the 22.22.22.0/24 network. For more information about any of these tables, take a look at the key players article in the packet traveling series at practical networking.net. With all that said, let's take a look at what it'll take to

### 3:33 - 4:03

get data from host A to host D. Host A has some data it needs to get to host D. Host A already knows the IP address of host D. So is therefore able to put together a layer 3 header. The layer 3 header will have a few different pieces of information, namely a source IP of 11.11.11.10 and a destination IP of 22.22.22.40. Host A can then compare the destination IP address in the header with its own network to determine that

### 4:03 - 4:27

this that host D is on a foreign network, which means the packet needs to go to the default gateway, which in this case is the router. Host A will need to create a layer 2 header to get the packet to the router. But at this point, host A does not have an entry for the router's MAC address. Host A will have to use the address resolution protocol or ARP to discover its default gateway's MAC address. Host A is going to send an ARP

### 4:27 - 4:54

request to discover the MAC address that correlates to the IP address 11.11.11. The ARP request is a small frame that essentially asks, "Hey, if the IP 11.11.11.1 is out there, send me your MAC address." The ARP request will arrive at switch X on port 2. First thing the switch will do is learn the MAC address mapping from the received frame. Mapping will state that the device on port two wins the MAC address a

### 4:54 - 5:17

AAA. The ARP request is a broadcast frame, which means it is meant to be delivered to everyone on the local network. Therefore, the switch will duplicate the frame and send it out each switch port except the one it came in on. This action is known as flooding. The switch will flood the frame and both the router and host B will get a copy of the ARP request. When host B gets the frame, it'll take a look and realize that the request is for someone else's

### 5:17 - 5:43

IP address. So, it'll simply discard it without taking any action. When the router gets the ARP request, it'll take a look and realize that the request is for its own IP address. The router will therefore accept and process the ARP request. First, the router will learn the ARP mapping of the device who sent it, which was host A. The router will populate its ARP table with a mapping of the IP address 11.11.11.10 to the MAC address A

### 5:43 - 6:06

a. Next, the router will generate an ARP response. Since the router knows host A's MAC address, it can send the response directly back to host A. The ARP response will arrive at the switch on port three. The switch will learn that the device on port 3 owns the MAC address [Music] e01. Now this frame is a uniccast frame destined directly for host A, which means it is it has a destination MAC

### 6:06 - 6:32

address of A aaa AA. Since the switch has this entry in a MAC address table, it'll know that the the frame needs to be forwarded out port 2. Host A will receive the ARP response and host A will learn the ART mapping for the address 11.11.11.1. Remember, this whole time the data has been held up at host A while waiting for the address resolution process to complete. Now that host A has the router's MAC address, it can finally

### 6:32 - 7:06

send the packet to the router. Host A will create a layer 2 header. The layer 2 header will have a source MAC address of host A and a destination MAC address of the router. Recall that the layer 3 header included a source IP address, a host A, and a destination IP address of host D. The layer three header's purpose is to get the data from end to end. The layer 2's header's purpose is to get the data from hop to

### 7:06 - 7:33

hop. With that said, the packet will be sent on its way. The frame will arrive on switch X on port two. Switch X already has an entry in its MAC address table for port two. So, this entry will simply be refreshed. The destination MAC address of the layer 2 header was EEO1. Switch X already has an entry for this MAC address in its MAC address table, and it'll use this to realize that this part needs to be sent out port 3. The switch will forward the frame out

### 7:33 - 7:57

port three, and this will get the packet to the router. When receiving the packet, the router will strip the layer 2 header. Remember, the whole purpose of this header is to get the packet from host A to the router. Now that that job is done, that header is no longer needed. Now the router needs to figure out where to send this packet next. It takes a look at the layer 3 header and sees that this packet is destined to the IP

### 7:57 - 8:21

22.22.22.40. The router consults its routing table and determines that this packet needs to go out its Ethernet 2 interface. Since the router is directly connected to this network, it knows that the packet must be delivered to its final destination, which is host D. But the router doesn't have an ARP entry for host D. So it must use the address resolution protocol to discover it. The router will send an ARP request for

### 8:21 - 8:45

host's IP address. Again, the ARP request is a small frame that essentially asks, "Hey, if the IP22.22.22.40 is out there, send me your MAC address." The frame will arrive on the switch Y via port 4. The switch will learn that the device on port 4s the MAC address [Music] EE02. Just like before, the ARP request is a broadcast frame, which again means

### 8:45 - 9:08

it should be delivered to everyone in the network. Switch Y flood the frame at all ports except the port it came in on, which means that both host C and host D will get a duplicate copy of the ARP request. When host C gets the frame, it'll take a look and realize that the request is for someone else's IP address. So, it'll simply discard it without taking any action. When host D receives the ARP request, it'll it'll

### 9:08 - 9:32

take a look and realize that the request is for its own IP address. Therefore, it'll accept and process the ARP request. Movey will start by adding the router's ART mapping to its ARP table. The ART mapping will state that the IP address 22.22.22.1 will correlate to the MAC address [Music] EE02. Host D will then generate an ARP response. Since host D knows the

### 9:32 - 9:54

router's MAC address, it can send the response uniccast directly to the router. Switch Y will receive the ARP response on port 5. The switch will learn that the device on port 5 owns the MAC address ddd. Since the ARP response was sent uniccast to the router, it'll have a destination MAC address of E02. The switch will look up this MAC address in the MAC address table and determine that the frame must be

### 9:54 - 10:20

forwarded out port 4. The router will receive the ARP response and the router will learn host's ARP mapping. Specifically, that the IP address 22.22.22.40 40 is going to correlate to the MAC address ddd. Now the router has the information it needs to create the layer 2 header to get the packet to its final destination. The router creates the

### 10:20 - 10:46

layer 2 header. Layer 2 header will have a source MAC address of E02 and a destination MAC address of DDD. Now the router can send the packet on its way. Switch Y will receive the frame on port 4. Switch Y already has an entry in its MAC address table for port 4. So there's nothing new to learn, but the port 4 entry in the MAC address table gets refreshed. The destination MAC address of this header is ddd. And since switch Y has an entry in its MAC

### 10:46 - 11:16

address table for this MAC address, it'll know to forward the frame out port 5. This will get the frame to host D. Host D will strip the layer 2 header. This header was used to get the packet from the router to host D and is no longer needed. Host D will then strip the layer three header. This header was used to get the packet from host A to host D and is no longer needed. Host will then finally receive

### 11:16 - 11:42

and process the data. But this is only the halfway point. We've talked through 22 steps to get a packet from host A to host D. Now host D has to respond. You'll notice that the way back will be much quicker since all the tables have already been populated. The entire way back will only take eight more steps. Host D creates the response data to send back to host A. Host D already knows host A's IP address and is

### 11:42 - 12:09

therefore able to build a layer 3 header. The layer 3 header will include the source of host D's IP address and a destination of host A's IP address. HostD can compare the destination IP with its own network to determine that the final destination is on a foreign network, which means that this packet needs to be sent to the default gateway. Next, host also already has an entry in its ARP table for it default gateway's MAC address and can use this information

### 12:09 - 12:35

to build a layer 2 header to get the packet to the router. The layer 2 header will have a source MAC address of DDD and a destination MAC address of E02. The frame will arrive on switch Y on port five. Switch Y already has an entry in its MAC address table for port five. So there's nothing new for the switch to learn. Switch Y will use the destination MAC address field in the header to determine that this frame needs to be

### 12:35 - 12:59

sent out port 4. The router will receive the packet and the router will strip the layer 2 header. This header's only purpose was to get the packet from hostd to the router. Like before, the router needs to figure out where to send this packet next. Takes a look at the layer 3 header and sees that the packet is destined to [Music] 11.11.11.10. This network exists at the

### 12:59 - 13:27

router's Ethernet 1 interface. Since the router is directly connected to this network, it knows that the packet is to be delivered to its final destination, which is host A. The router already has an entry in its ARP table for host A's IP address. So, it has everything it needs to create the layer 2 header and get the packet to host A. The layer 2 header will have a source MAC address of E01 and a destination MAC address of a AAA. The router then sends the packet on

### 13:27 - 13:54

its way and it'll arrive on switch X on port 3. The switch already has an entry in its MAC address table for port 3. So there's nothing new for the switch to learn. This entry will be refreshed in the MAC address table. Switch X will then use the destination MAC address field to determine that this frame must be forwarded out port two. Host A will receive the packet. Host A will strip the layer 2 header. This

### 13:54 - 14:21

header was used to get the packet from the router to host A. Host A will then strip the layer three header. This header was used to get the packet from host D to host A. Host A then finally receives and processes the response data. And there you have it. All 30 steps needed to get data from host A through a switch, a router, another switch, and finally to host and all the way back again. For more details on

### 14:21 - 14:36

anything we talked about in this video, check out the packet traveling series at practical networking.net. You'll also find a bunch of other articles covering a range of topics in the computer networking and network security world. I hope this video is useful for you. If it was, consider sharing it with a friend. Either way, thanks for watching.

