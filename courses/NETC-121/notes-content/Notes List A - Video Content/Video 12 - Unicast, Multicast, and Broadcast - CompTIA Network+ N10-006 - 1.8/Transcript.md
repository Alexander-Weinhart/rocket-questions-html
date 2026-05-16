# Video 12 - Unicast, Multicast, and Broadcast - CompTIA Network+ N10-006 - 1.8

## Transcript

### 0:02 - 0:32

There are three different ways that we use to get information from one device to another across the network. And in this video, we'll look at the differences between using a unicast, a multicast, and a broadcast. A unicast is a one-to-one communication. You have one device that is sending information to one other device. And these two systems are really the only ones involved in the conversation. You commonly see this if you hit a web server. If you're watching this video, and if you're

### 0:32 - 1:04

doing a file transfer, you're communicating between one device and another with no other devices even realizing that you two are conversing. This type of communication is widely used even if it doesn't scale very well. When you look at things like sending information from a streaming video server, like YouTube, you're watching this video. This is being sent from YouTube directly to you. If somebody else was watching this video at exactly the same time, a completely separate session is created, and a completely separate stream of information

### 1:04 - 1:40

is sent across the network. If 100 people are watching this video at the same time, YouTube is sending 100 separate streams out from their server individually to you via a unicast. A broadcast is when one device can send out one piece of information, and everybody else on the network sees this information being sent. And not only sees it, but can react to the information that's being set. This one-to-many communication is a broadcast. And we are hitting everybody on our local network when we send a frame that is a broadcast.

### 1:40 - 2:07

This fortunately has a limited scope. Your broadcasts are only going to go as far as your local subnet. These broadcasters do not hop through routers, so you can't send one broadcast and send it to everybody in the world. It will only send it to all of the devices that are on your local subnet. We commonly see this used for utility purposes. When routers need to update each other, they send broadcast to each other. Or if there's a device that needs to perform an ARP

### 2:07 - 2:41

request, it will send an ARP request to everyone on the subnet by using a broadcast. As you could imagine, if you have many devices on the subnet all sending broadcasts all the time, every device is going to be so busy listening in to all these broadcasts that it won't have time to do anything else. And that's why in IPv6, we got rid of broadcast, instead, focused on using multicast instead to have very focused communication and to avoid some of the disadvantages by sending broadcasts all over the network.

### 2:41 - 3:12

A multicast is the middle ground where you're sending out information to a group of people, but it's not to everybody on the network necessarily, and it's not to a single person either. This is a one-to-many communication. And things like multimedia, especially real-time communication and stock exchange information, is often sent via multicast. Unfortunately, multicast is a very specialized function. You have to have applications that understand how to take advantage of multicast. And you have to have infrastructure equipment

### 3:12 - 3:34

along the way in the network that knows how to react when multicast information is set. And because of that, we still see unicast used for things like streaming media that might be able to take advantage of multicast if it was set up in that fashion. So you'll usually find multicast for some very specific niche type environments. And it's usually something that is locally administered and configured by the network administrator.

