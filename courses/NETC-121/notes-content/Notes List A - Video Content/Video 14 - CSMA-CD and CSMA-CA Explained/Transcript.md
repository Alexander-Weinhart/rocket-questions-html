# Video 14 - CSMA/CD and CSMA/CA Explained

## Transcript

### 0:00 - 0:38

Have you ever wondered how computers send  data on the network without interfering with the data from other computers?  Especially  if the network has a lot of computers that are sending and receiving data at the same time. I  mean you would think that there would be a lot of collisions happening. I mean there should be  data packets that are constantly smacking into each other in all that network traffic. But even  though collisions do happen from time to time, especially on older networks, a technology was  developed to not only help avoid collisions but also to respond correctly if a collision  does happen. And this technology is called

### 0:38 - 1:06

CSMA/CD which stands for carrier sense  multiple access collision detection. And this is the access method used on early  Ethernet networks and when I mean early, I'm referring to half duplex networks that utilize  coaxial cable and earlier versions of twisted pair cable. Now CSMA/CD basically works by each  computer first sensing if the wire is idle,

### 1:06 - 1:45

and if it is it sends its data, therefore  avoiding any collisions. But if you have two computers trying to send data at the same time, a  collision will happen. And if a collision happens, the computers will wait a random amount of time  and retries to send their data. So as an example, here we have a network with four computers  and these computers are all sharing a common transmission medium which is a cable. And this  cable must be regulated so that no computers send data at the same time which would result in a  collision. And when a collision happens, it causes

### 1:45 - 2:25

data loss or data corruption. So let's say that  this computer here wants to send data. So first it will sense or listen if there is any traffic on  the cable. And if it senses traffic, the computer will wait until the cable is idle to send its  data. But once it senses that there is no traffic, it'll go ahead and send its data and as it's  sending its data it will listen for a collision. And if it doesn't sense a collision, it knows that  the data was successfully sent. Now in another scenario, if two computers are ready to send their  data and they both notice that the cable is idle,

### 2:25 - 3:01

then both computers will go ahead and transmit  their data at the same time. But when this happens, a collision occurs and when the computers  that are sending that data detect a collision, they immediately stop sending the data and instead  will transmit a jamming signal out on the network. And this jamming signal is what notifies all the  other computers on the network that a collision has happened. And after the computers receive  this jamming signal, the two computers that caused the collision will wait a random amount  of time before they send their data again. And

### 3:01 - 3:11

the wait time must be random to each computer  so that the collision doesn't happen again.

### 3:11 - 3:40

So as I stated before CSMA/CD was used on early  Ethernet networks and it isn't as relevant today due to the advancement in network technology.  It was only relevant in the older half duplex networks where data communicates in both  directions but not at the same time.  Today we use full duplex networks where data can  communicate in both directions at the same time.

### 3:40 - 4:19

And there was also CSMA/CA which stands  for carrier sense multiple access with collision avoidance. Now this is the access method  that's used for carrier transmission in wireless networks. Because just like wired networks,  wireless networks need to avoid collisions as well. So this is how it works, so when a computer  wants to send data on a wireless network, it really can't sense or hear if there are any collisions  on the network because there's no cable involved. So instead it does its best to avoid collisions  altogether. So in this method when a computer

### 4:19 - 4:58

wants to send data it'll first sense if there  are any other transmissions happening and if it detects any other transmissions, it'll wait  a short amount of time before checking the channel again. And when it checks the channel  again and if it doesn't sense any transmission, it'll wait a short random amount of time  and then it'll go ahead and send its data Then once the destination device receives  the data, it will respond to the sending computer with an acknowledgement informing  the sender that it has received the data. But if the sending computer does not receive  an acknowledgement from the destination,

### 4:58 - 5:14

it will assume that it did not get the data and it  will start the process all over again. Now another method that CSMA/CA uses to avoid collisions  is the optional RTS/CTS protocol which stands

### 5:14 - 5:54

for 'ready to send clear to send'. Now this is  an optional protocol that's used with CSMA/CA on wireless networks. This protocol enables a  computer to send out an RTS or 'ready to send' signal to the wireless access point requesting  for an opportunity to send out its data. And if the wireless access point grants this  request, the access point will temporarily stop all other communication on the network and then  it will respond back to the computer with a CTS or 'clear to send' signal which tells the computer  to go ahead and send its data. So in this

### 5:54 - 5:54

protocol the wireless access point is basically  the traffic controller on the wireless network

