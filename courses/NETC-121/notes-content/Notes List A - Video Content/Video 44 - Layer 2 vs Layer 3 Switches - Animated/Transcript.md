# Video 44 - Layer 2 vs Layer 3 Switches - Animated

## Transcript

### 0:00 - 0:41

Hello everyone, in this video we're going to be talking about the difference between layer 2 and layer 
3 switches. So the first thing we have to determine is well, what is a switch?  Now a switch is a device 
that has multiple ports that accepts ethernet connections from network devices and its function 
is to create a network by allowing devices to talk to each other and exchange data.
Now the term layer refers to the different layers in the OSI model. OSI stands for open 
systems interconnection.  And this model was created as a standard that describes how information 
from software in one device moves through a

### 0:41 - 1:24

network to reach software in another device.  And
It does this by breaking down huge the task of data communication into 
7 different layers, giving control of the data being sent 
from one layer to another. So a layer 2 switch, just like its 
name says, operates at layer 2 of the OSI model, which is the data link layer. 
This layer deals with MAC addresses.  And a layer 2 switch uses the MAC address of a 
device to determine where to send data. So when devices connect to a layer 2 switch, 
the switch will learn the MAC addresses of those devices and store them in its table. So when 
a data packet is sent from a device connected

### 1:24 - 2:02

to layer 2 switch, the switch will forward the 
data to the intended destination port. So as an example, if computer A wanted to talk 
to computer B, computer A will put computer B's MAC addresses in the data packet.  And 
then send it to the switch.  And then the switch will read the destination's MAC 
address and then look at its table to determine which port matches the specified MAC 
address and then it will forward the data to that port where computer B is connected.
Layer 2 switches are by far the most common type of switches. These are traditional 
switches that you'll find in homes and

### 2:02 - 2:42

small to medium size businesses. 
Now a layer 3 switch, which is also called a multilayer switch operates at layer 3 
of the OSI Model.  Layer 3 is the network layer, and this has to do with routing which 
deals with IP addresses. So a layer 3 switch can route data using IP addresses. 
But in addition to operating at layer 3, it can also operate a layer 2. So it can 
forward data by using MAC addresses which are layer 2 and it can also route data using 
IP addresses which are layer 3. So as an example, let's say that in a business 
they want to separate the network traffic from

### 2:42 - 3:21

a couple of different departments. So that the 
support department doesn't see any traffic from sales and vice versa.  And the best and easiest way 
to do this is by creating a couple of VLANs. VLANs divide a network into 
separate broadcast domains. So for the support department we'll configure a VLAN 
and we ll give it this IP address group and we'll call it VLAN 10.   And then we'll configure 
a VLAN for the sales department with a different IP address group and then we we'll call it 
VLAN 20. So now because of the VLANs each department is on their own subnet.  
And the the devices in each VLAN can't see

### 3:21 - 4:00

or communicate with devices in the other VLAN. But what if for some reason the network 
administrator wanted to allow communication to happen between the two VLANs?  But because 
the VLANs have different IP address groups, in order for communication to happen this 
requires a layer 3 device.  Now it could use a router to do this because routers route 
by IP addresses but a better and easier way to do this is by using a layer 3 switch.  
By using and configuring a layer 3 switch it would allow communication between the VLANs 
which is known as inter-VLAN routing.

### 4:00 - 4:43

And the way it does this is by creating 
SVIs or switch virtual interfaces on the layer 3 switch. These virtual interfaces allow 
data to be routed between VLANs by creating default gateways.  So for example, when computer A on VLAN 10 wants to communicate with computer D on VLAN 20, computer A will send the data packet to the default gateway which is the SVI assigned to VLAN 10.  And then the layer 
3 switch will check its routing table, just like a router would and then will forward the packet 
to VLAN 20's SVI, and then to computer D. So in a nutshell, that's how a layer 3 switch works.

### 4:43 - 5:26

Now there are other devices that operate 
at layer 3.  And these are routers and routers only operate at layer 3.  But layer 3 
switches operate at both layer 3 and layer 2. So they basically combine the functionality of a 
router and a switch.  However a layer 3 switch cannot do everything that a router does. It doesn't have 
the complete routing capabilities of a router. So as a review.  Layer 2 switches forward data 
based on MAC addresses. While layer 3 switches route data based on IP addresses, but it can 
also forward data based on MAC addresses. Layer 2 switches cannot route data between 
VLANs.  While layer 3 switches can.

### 5:26 - 5:54

Layer 2 switches require little to no 
configuration. While layer 3 switches require a more complex configuration. 
And ss far as price, layer 2 switches are relatively inexpensive. And layer 3 switches 
are significantly more expensive. And as far as speed, layer 2 switches are very 
fast while layer 3 switches are slower. So guys I want to thank you for watching this video on the difference between layer 2 and layer 3 switches. Please subscribe, and I will see you in the next video :)

