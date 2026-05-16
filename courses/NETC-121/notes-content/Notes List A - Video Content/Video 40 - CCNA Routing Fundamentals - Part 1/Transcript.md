# Video 40 - CCNA Routing Fundamentals - Part 1

## Transcript

### 0:06 - 0:34

[Music] on this session you will learn about routing fundamentals for ccna level we will start by an introduction to routing we will look at how packets are forwarded tcp rp model and up we'll also look at routing principles and routing protocols and finally in the second part we will look at a demo lab where we will configure some routing on a few nodes so let's get

### 0:34 - 1:01

started the primary function of a router is to forward packets from one interface or port to another when a packet is received by a router the router performs some checks looks at the destination address on the received rp packet and then based on that information uses routing table to decide out of which interface should the packet

### 1:01 - 1:42

be forwarded once that's established the packet is forwarded out of the chosen interface in this case the packet is forwarding between pc1 to the internet let's start with a simple network where pc2 wants to send packets to pc3 so what needs to happen here so on pc2 the application creates the data the data is then pushed down to the

### 1:42 - 2:08

transport layer where a tcp header is added here we have what we call a segment this new data is pushed down to the network layer where an ip header is added so here we have the packet

### 2:08 - 2:38

the packet is pushed further down to the data link where it will be encapsulated between a link header and a link trailer forming the frame the frame is then pushed to the physical layer where is transmitted so this is where you have your bits going over the electrical wiring and so forth when pc3 receives this bits

### 2:38 - 3:07

it will recreate the frame by going from the physical layer to the data link decapsulate the data link to expose the rp packet for the network layer from there it is further decapsulated at the transport layer to expose the segment and from there on the application so to recap from the application going downwards

### 3:07 - 3:33

you start encapsulating your tcp or your transport header your rp header for the packet and your data link link header link trailer for the frame this is then put onto the physical layer as bits hitting pc3 the opposite operation will take place so here you start decapsulating from data link to network to transport to application

### 3:33 - 4:15

a key information here is what goes into this link header pc2 needs to add the mac address of pc3 at this point when pc2 is sending a packet to pc3 it does not have any knowledge on what is the mac address of pc3 so so this is where the address resolution protocol up comes into play the link header must have the mac address of pc3 so with up pc2 sends

### 4:15 - 4:50

the request which is a broadcast asking for the mac address of 172 16.3.3 pc3 responds with unicast to pc2 with its own mac address so at this point pc2 knows the mac address of pc3 and that is what's inserted in the link header as a key topic the tcp model maps to the osi model in the way that the application for the tcprp model

### 4:50 - 5:17

is actually the application layer on the osi model the presentation and the session so these three layers on the osi model which is seven layers maps to the application layer every other layer is a one-to-one mapping now let's add to our previous simple network so now we've added pc1 and the subnet between r1 and pc1 is 172.16.10

### 5:17 - 5:50

router r1 has one interface e0 on one subnet and e1 on the different subnet where pc2 and pc3 are connected so when pc1 wants to send an rp packet to either pc2 or pc3 it knows its own rp address and he knows the destination address which is for example pc of pc2 that would be the dot 2 so that would be 172 16 3.2

### 5:50 - 6:20

so it knows that pc2 is not on the same subnet so pc2 sends its packets destined for pc2 to its own default gateway which happens to be r1 e0 interface let's call it or let's assign it a dot one r1 receives the packet on its interface e0 and run two checks a frame

### 6:20 - 6:51

check sequence fcs and it checks whether whether the data link matches its own e0 mac address if these two pass the checks then r1 will examine the destination rp address send of the packet send from pc1 and reference it to its routing table so if this is the routing table on r1 r1 will look at the destination rp

### 6:51 - 7:29

address sent from pc1 in this case it would be 172 16 3.2 it doesn't have the exact so it looks at the longest match so what is the closest ip or subnet where the dot 2 would be 172 17216 3.0 is the matching subnet where pc2 would be the mask is 24 so there is matching the next hop is connected so root 1 knows that the subnet is connected

### 7:29 - 8:08

and is not via another router and the outgoing interface is e0 packet received from pc1 testing to pc2 once is passed these two checks will be forwarded to pc2 an important or key topic here is pc1 being able to send pack it to pc2 or r1 knowing a route to pc2 does not necessarily mean that pc2 would be able to send traffic back to pc1

### 8:08 - 8:37

in this particular case if pc2 would be sending traffic back to pc1 we have to ask whether pc1 has a router 1 has a route for pc1 and here you can see that of course it does because he's directly connected so here you will be able to have a two-way connectivity full connectivity or two-way communication between pc1 and pc2 so adding more subnets we now have pc4

### 8:37 - 9:12

directly connected to r2 pc1 sends a packet to pc4 as we saw earlier the packet is sent to the default gateway in this case is e0 of r1 r1 will run the checks the frame check sequence and also make sure that the mac address in the data link is matching e0's mac address and after that it will reference its routing table so the destination rp address of the packet

### 9:12 - 9:42

sent from pc1 is for example let's call it a dot four here so the full address would be 172 16 4.4 based on the routing table on r1 the next hop so it doesn't have a directly connected network as we saw earlier but it has an x hop which is 172.162. which is effectively the other end of this point-to-point link so this

### 9:42 - 10:16

would be dot one for example and this would be a dot two so and it's reachable via e2 so r1 will just forward the packet we see from pc1 to r2 once received on e2 r2 will perform the exact same checks and references on routing table and in this case you will see that dot 4 or 172 16 4 0

### 10:16 - 10:48

24 for example as a subnet is directly connected via interface e0 and forwards the packet out of this interface to reach pc4 so now that we are getting the idea of routing let's look at the routing protocols routing protocols can be dynamic or static with dynamic routing routing table is populated by the routing process enabled on the router and through this

### 10:48 - 11:15

process each router learns new routes from adjacent neighbors as well as advertise routes to them so for example you will have router 1 and router two router three and each have its own subnets so say for example you have three subnets here and you have two subnets here and one subnet here so with whichever routing protocol dynamic route

### 11:15 - 11:51

protocol is used this router r1 will advertise all these three subnets that it knows off to r2 r2 will advertise its own subnets plus the ones learned from r1 to r3 r3 will do the same advertising its own subnet r2 will advertise the new subnet learn via r3 and the two that he knows off back to r1 so in in a nutshell this is how dynamic

### 11:51 - 12:14

routing protocols would work so the routing table in each router is dynamically populated on the opposite side static routes are manually added on the router so for example again

### 12:14 - 12:50

route 1 has a host and so does router 2 a static route could be added on route 1. to inform router 1 that reaching this subnet where the pc pc2 is located has to be via this router so the way you configure or you add static routes it's the format the general or the generic format is

### 12:50 - 13:25

root to subnet mask and then next hop destination so you will have in the cisco ios for example the the syntax will be ip ip root then comes the subnet and the mask and then the next hop so you defining how to go from r1 to a specific subnet statically and this static routes come in different types so you have a network route which

### 13:25 - 13:51

is essentially subnet so if you make any creating um a route for this subnet this would be network route if you're creating a route for a host single host and that will be a slash 32 so your in the syntax you'll be two five five two five five two five five two five five so that would be a host

### 13:51 - 14:18

static route and then you will have a floating route so the floating routes are slightly different they could be either of these two so it could be either network route or host route but you will have to add an admin distance to it the default admin distance and we will get into that in the lab is one and the lowest or the lower the admin distance the more preferred is this route

### 14:18 - 14:50

so connected admin distance so for connected subnets the admin distance is zero because there's no better route for router than the one that is connected to it you can't get any better than this and then for the static routes the admin distance is one this is where you say from r1 if you want to go to r2s whatever subnet

### 14:50 - 15:19

you need to go via r1 so this is your default admin distance now in some cases you will want to change this admin distance you probably you will have um a dynamic routing protocol running here so for example we will be running ospf where the admin distance is 110 but you won't use ospf if you leave things as they are the static route

### 15:19 - 15:55

will be the one taking effect in the routing table because it has a lower admin distance but you would like to use ospf instead so what needs to happen is that you add in your syntax for the rp root i'll put an example here rp root 1.1.1.1 and then 25500 next hop x you will add an admin distance that is higher than the ospf one so maybe you will use 150.

### 15:55 - 16:27

so what happens is this route will be configured but it's not taking effect ospf would be the routing protocol in effect if anything happens with ospf say for example there's a problem with the process or you terminate ospf yourself or you remove it then the static rp route will kick in so because there's nothing for this route apart from the static route even with its admin

### 16:27 - 16:53

distance of 150. so essentially this is the floating route now default route is the route that you will use when you cannot find any specific routes matching your destination and we will create an example for every specific route here in the demo lab so you get a full understanding of static routes now dynamic routes they come in

### 16:53 - 17:28

different categories you have the distance vector and that will be your rip version 2 for example advanced distance protocols and that would be your er grp and then you will have your link state protocols and that will be your ospf and isis mostly used in service provider environments so this kind of summarizes routing protocols at a very very high level you can you cannot go through routing

### 17:28 - 17:54

protocols in one or two slides but hopefully in the next session which is the demo lab we will get to grips with static routing and understand how they work and we might also use some dynamic protocol like ospf to validate the concept or to go through the concept of a floating static route in the demo lab section we will configure route 1 and r2 to support connectivity

### 17:54 - 18:22

between the end hosts as we can see in here pc1 2 three and four

### 18:22 - 18:22

you

