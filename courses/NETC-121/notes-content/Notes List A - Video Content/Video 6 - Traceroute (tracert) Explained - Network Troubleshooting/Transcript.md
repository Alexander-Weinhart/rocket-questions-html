# Video 6 - Traceroute (tracert) Explained - Network Troubleshooting

## Transcript

### 0:00 - 0:37

What is traceroute? So that is the topic of this  video. Now traceroute is a command line utility that is used to show the route that is taken by  data packets as they travel across the internet to their destination. Now the internet is a  global network of routers that allows computers and servers the ability to communicate with  each other from all over the world. And these routers communicate with each other so they  can direct or route the data packets to their intended destination. And the traceroute utility  is just a tool that is used to find out the exact

### 0:37 - 1:15

path a data packet is taken from the sender to  the destination. And by using traceroute you can use this tool to help you find problems like  bottlenecks, such as why and where a connection to a server might be lagging. Or you can also use  it if you're just curious about the path that data packets take to their destination. Now traceroute  is a little bit different from doing a ping. Because when you ping a server, such as  google.com, your computer will send out four data packets to the destination and once it reaches a  destination it'll return the data packets back to

### 1:15 - 1:54

your computer. So if you received all or some of  the data packets back to your computer, then that tells us that there is general connectivity  between your computer and the destination. And in addition, it'll also tell us how long the  trip took for the data packets to go to and from the destination, which is measured in  milliseconds. However a traceroute will tell us more information. So generally speaking a  traceroute not only pings the final destination, but it also pings each router on its way to the  destination . And it measures the round trip time

### 1:54 - 2:31

that the data packets took from each router  and the destination. So for example let's go ahead and trace the route from our computer  to a server over the internet. And in this example I'm using a Microsoft Windows computer.  So at a command prompt, you would type tracert space and then the IP address or the host name of  the destination. So in this case I'm going to use google.com again and then i'm going to press  enter on the keyboard. Then our computer will send three data packets to each router on its way  to the destination and each time the data packets

### 2:31 - 3:10

reaches a router on its path, the router will send  back the three data packets back to our computer and tell us information about that router,  such as the router's IP address and it'll also tell us the round trip time, measured in  milliseconds, that the three data packets took to and from each router. And now the trace is  complete. So now let's examine the final results. Now the first column tells us the number of hops  or steps that the route took to the destination, which was a total of eight hops. The next  three columns shows us the round trip time

### 3:10 - 3:47

each data packet took to each point and back to  your computer. So the first row, the data packets only took one millisecond. So the route was very  short because it's within my local area network. The first hop was my modem router in my home.  But as you can see, once the data goes out on the internet, the round trip times significantly  increase. And the further that the data packets have to travel to each router, then naturally  the round trip times will gradually increase, with the final destination being the longest  round trip time. So the final destination time in

### 3:47 - 4:26

a traceroute would be roughly the same time if you  were to just do a ping, which was 21 milliseconds, because remember a ping only displays the time of  the final destination. And the last column tells us the IP addresses of each router and the final  destination and it'll also tell us the domain name if it's available. Now going back to the  round trip times, one of the main things that you want to look at when you're doing a traceroute  are consistent round trip times.  So as you can see these round trip times are normal.  They  are consistent and have a slight gradual

### 4:26 - 5:09

increase with no major time increases between the  hops.  So in another scenario let's suppose that the google website is very slow.  Now let's go ahead and  ping google.com again .  And as we get the replies you'll notice that this time the round trip times  are very high, averaging around 200 milliseconds.  So this could indicate a problem because it's rare  for timings to be this high.  So by doing a ping it can tell us that there is a problem, however  it cannot tell us where the problem lies.  So this is where a traceroute can help.  A traceroute can pinpoint where the problem lies.

### 5:09 - 5:48

So if we traceroute google.com again and if we  look at the final result it tells us that the problem is out on the internet on the fifth hop  starting with this router right here, which would also affect the remaining path to the server.  So we pinpointed that the slow connection or lag is not within our local area network or with the  server.  The problem is with a router or routers on the internet.  So the traceroute utility is a  great tool to pinpoint bottlenecks and connection interruptions on a network.  Now sometimes if you  see high round trip times while doing a traceroute,

### 5:48 - 6:23

then this doesn't always indicate a problem. So for example if you do another traceroute and if you happen to see a big round trip time in  between a hop, then this doesn't necessarily mean that there's a problem with the router.  It could just mean that the distance between certain routers are thousands of miles apart.  For example, where the data has to jump over to another continent.  Or sometimes you may see asterisks  coming from a router.  Now this could indicate that there is a problem with the router or it could  also mean that the router is working fine but it

### 6:23 - 7:03

wasn't configured to return traceroute replies but  the router still passed on the data packets to the next router.  Now as i mentioned earlier traceroute  sends out three data packets to each point on its path.  And sometimes you might see a high round trip  time compared to the other two on the same hop. Now this is not really a big deal.  It just means that  something strange has happened to that one data packet.  Because if all three timings were high  then that indicates an issue that we discussed earlier.  So this is why three data packets  are sent, so it can isolate false issues.

### 7:03 - 7:40

Now there is another value in traceroute called  TTL or time to live.  TTL is a given value to the data packets on how long they can live before they  are discarded.  So for example when we do another traceroute, and you'll notice that it says 'over  a maximum of 30 hops'.  So his means that the TTL is set to 30 which is the default value.  So if the  data packets don't reach their destination after 30 hops, the data packets are dropped.  So in another  example let's set the TTL to a custom value

### 7:40 - 7:50

of 4.   So again in a windows computer we type  tracert -h 4 and then google.com.  So this

### 7:50 - 8:32

means that when the data reaches the fourth hop,  the data packet is dropped and won't continue on. So what is the purpose of having a TTL in the  first place?  Well having a TTL will prevent a data packet from traveling endlessly around the  internet trying to find its destination.  Now this can happen if certain routers on the internet  were misconfigured.  So for example if there was no TTL limit and when we tried to do another traceroute, and if certain routers on the internet were misconfigured, the data packets could be caught  in an endless loop between these routers.  So they

### 8:32 - 8:53

would just keep on passing these data packets back  to each other forever.  And when this happens, it could slow down the internet because these routers  are constantly busy dealing with these data packets.  So this is why a time limit was placed.  To keep this from happening and wasting bandwidth.

### 8:53 - 9:06

And in conclusion, traceroute can be  run on different operating systems. In Windows, you type 'tracert' and then the domain  name or IP address.  And in a Mac or Linux systems,

### 9:06 - 9:13

you type 'traceroute' and then the domain name or IP  address.  So thank you everyone for watching this video on traceroute, please subscribe, follow  me on twitter, and thank you for watching.

