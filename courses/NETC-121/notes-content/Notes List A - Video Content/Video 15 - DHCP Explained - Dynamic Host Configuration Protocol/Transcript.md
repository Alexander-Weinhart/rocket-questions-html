# Video 15 - DHCP Explained - Dynamic Host Configuration Protocol

## Transcript

### 0:00 - 0:09

Hello everyone, in this video we're going to talk  about DHCP or dynamic host configuration protocol.

### 0:09 - 0:35

Now every computer or device on a network has  to have an IP address for communication purposes. An IP address is an identifier for a computer  or device on a network.  And there are two ways that a computer can be assigned an IP address.  They could be done by using a static IP or a dynamic IP.

### 0:35 - 0:44

Now a static IP is where a user assigns a computer  or device with an IP address manually.  Now this

### 0:44 - 1:26

was the original method that was done in the  beginning of networking.  So for each computer on a network you had to open up the computer's  network configuration page and manually type in an IP address.  But in addition to an IP address,  you also have to type in a subnet mask, default gateway, and a DNS server.   And anytime that you  wanted to add another computer or device to the network, you had to do the same thing.  So as you  might have guessed this could be a lot of work especially if you are dealing with a large network  that has a lot of computers.  And you also have to

### 1:26 - 1:42

make sure that all the IP addresses are unique  because if you assign the same IP address twice it would cause an IP conflict and would cause  those computers to not have access to the network

### 1:42 - 1:57

But there is a better and easier way to  assign a computer an IP address and this is called a dynamic IP.  A dynamic IP is where a  computer gets an IP address automatically from

### 1:57 - 2:15

a DHCP server.  A DHCP server automatically  assigns a computer with an IP address.  And in addition to an IP address it can also assign  a subnet mask, default gateway, and a DNS server

### 2:15 - 3:01

So as an example here we have a network  connection properties window open for the network interface card on a Microsoft  Windows computer .  And as you can see here this computer is set to obtain an IP address  automatically.  So when you choose this option the computer would broadcast a request for  an IP address on the network then the DHCP server will assign an IP address from  its pool and deliver it to the computer. And then once that's done you can verify all the  different settings that the DHCP server has given your computer.  And you can do this by opening up  a command prompt on a Windows computer and then

### 3:01 - 3:11

type in ipconfig /all and then  press "enter".  So as you can see here the DHCP is

### 3:11 - 3:26

enabled on this computer which means that it's  getting its IP address from a DHCP server and then you can see the IP address here, along with  the subnet mask, default gateway, and DNS server.

### 3:26 - 3:35

So all of these settings were given by the DHCP  server.  So as you can tell dynamic IP addressing

### 3:35 - 3:44

is the best choice because it's automatic  and it makes managing a network a lot easier

### 3:44 - 4:00

Now a DHCP server assigns IP addresses to  computers on a network from its scope.  And a scope is a range of IP addresses that a DHCP  server can hand out.  So as an example here we

### 4:00 - 4:15

see a scope of IP addresses on this server.  So as  you can see the range starts with this IP address and ends with this IP address.  So computers on  this network will get an IP address from this

### 4:15 - 4:24

range of IP addresses.  So this scope can give  out 100 IP addresses.  Now these values can be

### 4:24 - 4:38

customized to either increasing or decreasing  the range.  It all depends on what the network administrator wants to do.  So it is customizable.  Now when computers obtain an IP address from a

### 4:38 - 4:54

DHCP server, the server assigns the IP address  as a lease. So the computer doesn't actually own the IP address, it's actually a lease.  And  a lease is the amount of time an IP address is

### 4:54 - 5:10

assigned to a computer.  For example the lease  could be for one day.  Now the reason for the lease is to help make sure that the DHCP server  does not run out of IP addresses in its scope.

### 5:10 - 5:54

So as a demonstration let's just say that  this DHCP scope only has a range of three IP addresses.  So it can only give out three  IP addresses.  Now obviously this is not very realistic because no network administrator is  going to create a scope this small.  But for this demonstration let's just use this as an example.  So let's go ahead and add three computers to this network.  And as they are added, the DHCP server  is going to assign them an IP address.  So in this example let's just say that the IP addresses are  actually given to the computers and are not leased.

### 5:54 - 6:32

So the DHCP has reached its limit on giving  out IP addresses.  All of its IP addresses are currently being used.  But what happens if one of  these computers is removed from the network?  So if a computer is removed, it takes the IP address  that it has been given with it.  So let's say another computer gets added to the network but the  problem is the computer won't be able to access the network because the DHCP server has run out of  IP addresses.  So even though this computer here has

### 6:32 - 6:41

been removed it's still occupying an IP address  that could be used for another computer.  So this

### 6:41 - 6:49

is why IP addresses are leased and are not given  because if the IP addresses are leased then this

### 6:49 - 6:59

will tell the DHCP server which IP addresses are  still being used and which ones are not being used.

### 6:59 - 7:08

So in this example the IP addresses are leased.  So after a certain period of time during the lease,

### 7:08 - 7:24

the computers will send a signal to the DHCP  server asking the server to renew its lease of the IP address.  So in other words it's informing  the DHCP server that it's still present on the

### 7:24 - 7:32

network and its IP address is still being used.  So if a computer is removed from the network that

### 7:32 - 7:56

computer is not going to be able to ask the DHCP  server for a renewal and if it doesn't ask for a renewal.  Then the lease will expire and then  the IP address will go back to the IP address pool.  So now the IP address can be used for another  computer.  And this is why IP addresses are leased.

### 7:56 - 8:26

Now if you wanted a computer or device on your  network to have a specific IP address all the time, in other words you never want that  IP address to change, well you can create a reservation on the DHCP server.  A reservation  ensures that a specific computer or device, identified by its MAC address, will always be  given the same IP address when that computer

### 8:26 - 8:35

or device requests an IP address from the DHCP  server.  So for example on this DHCP server if I

### 8:35 - 9:08

create a reservation for my computer the DHCP  server will recognize my MAC address and will always give me this specific IP address.  Now  reservations are not typically given to regular computers.  They are typically given to special  devices or computers such as network printers, servers, routers, etc.  Because devices like these  should be given the same IP address constantly

### 9:08 - 9:17

Now one final thing to note about DHCP is that  DHCP is a service that runs on a server.  So for

### 9:17 - 9:28

example this could be a Microsoft server or  a Linux server, but it's also a service that runs on many routers also.  Whether the  router is a business router or a small office/home office router.  These routers  will have a DHCP service built into them.

