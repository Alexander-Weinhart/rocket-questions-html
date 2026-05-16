# Video 38 - Routing Tables | CCNA - Explained

## Transcript

### 0:00 - 0:38

Hello everyone in this video we're going to be  talking about routing tables.  The internet is a giant highway of pathways for data to travel to  their destination.  And in between these pathways are devices called routers.  And routers, just like  its name says, routes data on the internet so that the data can reach its destination.  And  routers route data by using routing tables. A routing table is a file that contains a set of  rules that shows information on what path a data packet takes to its destination.  So as a data  packet arrives at the router, the router will

### 0:38 - 1:20

look at its routing table to find out where to  forward the data packet along the best path to its destination.  So a routing table is similar to a  road map or a navigation for your car.  If you were traveling to a certain destination anywhere in  the world, so for example on vacation, you will most likely need directions or a map on how to get from  point A to point B.  Well in the world of networking it works the same way.  In order for data to travel  across the network and reach its destination it needs directions to determine how to get there.  Routing tables are populated in three ways, which

### 1:20 - 1:29

are directly connected, static, and dynamic.  So let's  first talk about directly connected routing tables

### 1:29 - 1:51

So here we have two networks and the networks are  separated by a router and each network is using a different IP address group with the computers  having their own IP address.  This network is using the 192.168.0.0  IP address group and the other  network is using the 10.0.0.0 IP address group

### 1:51 - 2:31

So right now the computers in each network can  only communicate with the computers inside their own network.  However in order for the computers on  these networks to have the ability to communicate with a computer on the other network, we have to  configure the router and a routing table because a router has the ability to allow communication  between networks.  So this router is using two interfaces. One interface labeled Ethernet 0  is connected to the 192 network and the other interface labeled Ethernet 1 is connected to the  10 network.  So we will go ahead and configure this

### 2:31 - 3:12

interface and give it an IP address and subnet  mask in the 192 IP address group.  And then we'll configure the other interface for the 10 IP  address group.  And when we do this the router is going to automatically create a routing table  with directly connected routes.  Directly connected routes show the routes for the networks which  are directly connected to an interface.  So now if we look at this routing table, it's informing  the router that any packet intended for the 192 network will be forwarded out this interface.  And likewise any packet intended for the 10

### 3:12 - 3:21

network will be forwarded out this interface.  So  now when a computer on the 192 network wants to

### 3:21 - 4:05

communicate with a computer on the 10 network,  the computer will send a data packet to the router and when the router receives the packet  it'll look at the destination IP address of the packet which is 10.0.0.2 to and refer to its  routing table to determine where to send the packet.  So the router will look at its routing  table and see that this packet is intended for a device on the 10 network and will forward the  data out this interface and then to the intended computer.  So this is basically how a routing table  works. So in another example let's add another interface to this router and let's go ahead and connect another

### 4:05 - 4:13

router and another network with computers to this setup. And this network up here will be using a different IP address

### 4:13 - 4:39

group of 174.16.0.0 And also the interfaces between these two routers also need their own IP address group so that the routers themselves can communicate with each other. So we'll give them a separate IP address group in the 125.0.0.0 network. Now  just to clear things up any link between routers

### 4:39 - 4:55

is considered a separate network regardless  if there are computers in the network or not So in reality we actually have four networks here. So now since we have configured the routers with

### 4:55 - 5:30

an IP address and subnet mask, if we look at the  routing table for this router we'll see that it has an additional directly connected route.  And  we see that the Ethernet 2 interface is directly connected to the 125.0.0.0 network.  And if we  pull up the routing table for this router up here we'll see the directly connected routes  that are connected to this router's interface The 174 network is connected to Ethernet 0 and  the 125 network is connected to Ethernet 1.

### 5:30 - 5:57

So now let's say that this computer here on  the 192 network wanted to communicate with this computer up here on the 174 network. So  this computer will send a data packet to the router and when the router receives the packet  it'll look at the destination IP address of the packet which is 174.16.0.2 and refer to its  routing table to determine where to send the

### 5:57 - 6:27

packet. But the problem is, is that the directly  connected routing table doesn't refer anything to the 174 network because remember directly  connected routing tables only show networks that are directly connected to the router.  So  since this router can't find the 174 network the router thinks that the 174 network doesn't even  exist.  So the router would just drop the packet

### 6:27 - 7:11

So what do we do here?  Well this is where we  need to add an additional route to the routing table such as a static route. Static routes are  manually configured by a network administrator So we need to log into this router and manually  create a static route so that the router knows where to find the 174 network.  So to create a  static route we need to log into this router And since we want the 192 network the ability to  communicate to the 174 network we need to add the 174.16.0.0 network along with the number of bits  in the subnet mask and then we need to add the

### 7:11 - 7:19

IP address of the interface of the next hop or  step that this router needs to take to get to the

### 7:19 - 7:54

174 network.  So the next hop that this router  has to take is this IP address here which is 125.0.0.2.  So now when this computer on  the 192 network wants to communicate with a computer on the 174 network the computer  will send a data packet to the router and when the router receives the packet it will  look at the destination IP address which is 174.16.0.2  so the router will see that there  is a static route in the routing table for

### 7:54 - 8:08

the 174 network and it will forward  the packet to the next hop which is 125.0.0.2  So now this router has the packet and  this router will now look at its own routing table

### 8:08 - 8:49

and look at its directly connected routes and  see that the 174 network is directly connected to this interface which is Ethernet 0.  So  the router would now forward the packet out this interface which will reach the destination  computer.  So now any computer on the 192 network can communicate with any computer on the 174  network.  However it can only communicate in one direction because in order for the 174 network  to communicate back to the 192 network we have to configure a static route in the other direction  also.   So now we have to log into this router and

### 8:49 - 8:57

create a static route so that the 174 network  can talk back to the 192 network.  So for the

### 8:57 - 9:05

network we type in the destination network which  is 192.168.0.0.  And for the next hop that this

### 9:05 - 9:15

router needs to take to get to the 192 network  will be this IP address here which is 125.0.0.1

### 9:15 - 9:56

So now both networks can communicate with  each other in both directions. But what about communication between the 174 and the 10 network?  Well the 10 network is able to communicate with the 174 network in this direction because  earlier we created a static route that informed this router on how to get to the 174 network.  But the 174 network can't communicate back to the 10 network because we haven't informed this  router where to find the 10 network.  So let's go ahead and log back into this router and create  a static route so that this router knows where

### 9:56 - 10:04

to find the 10 network.  So for the network we'll  type in the 10.0.0.0 network and for the next hop

### 10:04 - 10:52

or interface it's this IP address here.  And now  all the networks can communicate with each other in all directions. Now let's talk about a third way that a routing table is populated and this dynamic routes. Dynamic routes are similar to static routes but the difference is how the routes are entered into the routing table.  So where  static routes are entered manually, dynamic routes are entered automatically by neighboring routers.  And they do this by using one or more dynamic routing protocols.  These dynamic routing protocols  are RIP, OSPF, BGP, IS-IS, and EIGRP which I will make

### 10:52 - 11:00

a separate video talking about these protocols.  So  as an example if we got rid of the static routes

### 11:00 - 11:28

that we created for these routers and instead  configured them with a dynamic routing protocol the routers will now talk to each other and share  their routing tables with each other which will give them the same results as static routes.  So since router 1 has routing information on the 192 and 10 network it will share its routing  table with router 2.  And router 2 will have those

### 11:28 - 11:36

dynamic routes entered into its table.  And likewise  router 2 has information on the 174 network and

### 11:36 - 11:51

it'll share its routing table with router 1 and  then router 1 will have that dynamic route added to its table.  So as a review a routing table is a  file with instructions that shows what path a data

### 11:51 - 12:30

packet takes to its destination. The router refers  to this table to find out where to forward the data packet.  Routing tables are populated in three  ways.  Directly connected routes show the routes for the networks which are directly connected to an  interface. These routes are automatically created by a router as soon as the router's interfaces  are configured with an IP address and subnet mask. Static routes are entered manually by  a network administrator. These routes are necessary to access networks that are not directly  connected to a router's interface.  Dynamic routes

### 12:30 - 12:51

are similar to static routes but the difference  is dynamic routes are entered automatically by neighboring routers.  The routers would talk to  each other by using routing protocols and will exchange their routing tables with each other. So guys I want to thank you for watching this video on routing tables. Please subscribe, leave a comment, and I will see you in the next video.

