# Video 7 - ARP Explained - Address Resolution Protocol

## Transcript

### 0:00 - 0:38

ARP stands for address resolution protocol. Now  this is a protocol that is used to resolve IP addresses to MAC addresses. The MAC address  is a physical address of a device. It's a globally unique number that is assigned to every  network interface card. Whenever a device needs to communicate with another device on a local area  network, it needs the MAC address for that device and devices use ARP to acquire the MAC address  for that device. So as an example let's say that

### 0:38 - 0:54

computer A wants to communicate with computer  B. Now computer A already knows the IP address for computer B. But in order to communicate with  computer B, it still needs its MAC address. Now an

### 0:54 - 1:02

IP address is used to locate a device on a network  and the MAC address is what identifies the actual

### 1:02 - 1:18

device. So in order to find the MAC address,  computer A will first look at its internal list, called an ARP cache, to see if computer B's  IP address already has a matching MAC address.

### 1:18 - 1:26

In fact we can check this ourselves at a Windows  command prompt by using the ARP utility. And by

### 1:26 - 1:36

typing 'arp -a' and as you can see in the  output it has no entries at all, the ARP cache is

### 1:36 - 2:06

empty. So now computer A will send out a broadcast  message out on the network asking every device, which computer has the specific IP address and  will ask for their MAC address. Then the computer that has the matching IP address will then  respond back and tell computer A its MAC address. Then once it receives the MAC address, the  communication can now take place between the two.

### 2:06 - 2:29

Now once computer A has the MAC address, it'll  store this information in the ARP cache. So now let's do the same commands as before and now  you can see that the IP address and matching MAC address have been added to the ARP cache. The ARP  cache is used to make a network more efficient. It

### 2:29 - 3:11

stores IP address to MAC address associations,  so that the next time it needs to communicate with a device on the network, it doesn't have to  broadcast a message out on the entire network. It can just look in the ARP cache. And there  are also two different types of ARP entries, dynamic and static. A dynamic entry is created  automatically when a device sends out a broadcast message out on the network requesting a MAC  address just like in the example we just did. Dynamic entries are not permanent, they are  flushed out periodically so that the cache doesn't

### 3:11 - 3:35

get filled up with too many entries that are not  being used. And a static entry is where someone manually enters an IP address to MAC address  association using the ARP command-line utility. So for example let's create a static ARP entry. So  at a command prompt you would type 'arp -s'

### 3:35 - 3:44

and then the IP address followed by the MAC  address. So now if we look at the ARP cache again,

### 3:44 - 3:53

we would see our static ARP entry. Network  administrators would use static entries to

### 3:53 - 4:00

reduce any unnecessary ARP broadcast traffic on  a network. For example, static entries are ideal if you know that two devices are constantly  going to be communicating with each other

