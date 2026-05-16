# Video 43 - Router Hierarchies and Route Summarization - Networking Fundamentals - Lesson 5 - Part 3

## Transcript

### 0:00 - 0:20

hello welcome to another video from module one of our networking fundamentals series this module will teach you everything you need to understand how data flows through a network this is part three of our lesson on routers and in this video we will tie together some of the concepts we discussed back in lesson 1 with the concepts we just illustrated in the last few videos

### 0:20 - 0:42

in the last video we showed you everything that happens to get a packet from host c to host a and then back we showed you all the steps required for these two routers to hand data to one another these routers happen to be deployed in a line or linearly but back in lesson 1 i showed you this topology and told you that routers are deployed in a hierarchy and in this lesson i want to show you

### 0:42 - 1:06

why routers in a hierarchy allow topologies to scale much easier and provide more consistent connectivity for the users in the networks so let me explain both those points let's say the tokyo network decides to expand and add two more networks the accounting network and the help desk network in each case a router is stowed up to handle the traffic for each of those networks and that router is simply

### 1:06 - 1:28

connected once into some sort of aggregation router and instantly both of these networks now have connectivity into the rest of the topology of the acme network hopefully this can show you that a network design where routers are deployed in a hierarchy is much easier to scale to explain this second part however we're going to reconfigure these routers so that they are not deployed in a

### 1:28 - 1:51

hierarchy and in our stead deployed in a line linearly notice now if the sales team wants to speak to someone in the marketing team they only have to cross three routers to get there but if the sales team now needs to speak to someone on the help desk they now need to cross five routers to get there and this same effect actually happens in the reverse direction for traffic going to the internet

### 1:51 - 2:14

notice the engineering team to speak to the internet only needs to cross three routers but the accounting team one of the new networks that we just added needs to speak through five routers to get to the internet so you can see that if you deploy your routers in a line like this you don't have very consistent connectivity the sales team is going to have a faster time getting to the internet than your help desk

### 2:14 - 2:37

plus if some sort of failure event happens at the marketing router that happens to cut off access to the rest of the network for all the teams deployed after the marketing network you don't have those problems if your routers are deployed in a hierarchy if something were to occur to the marketing router here no matter what the accounting network and the help desk network is unaffected by that plus for the sales team to speak to

### 2:37 - 3:00

engineering we have to cross three routers or for the sales team to speak to the help desk you still have to cross only three routers and of course in all cases for any of these team to speak to the internet they just have to cross two routers this makes for a much more consistent connectivity experience for the users in your network so those are some reasons why you want to deploy routers in a hierarchy because

### 3:00 - 3:25

it allows for your topology to scale much easier and creates a more consistent connectivity experience for your users of course routers being deployed in a hierarchy doesn't invalidate the illustration we did in the last video of packets flowing through linear routers because even if the routers are deployed in a hierarchy the path between hosts flow through routers as if those routers were indeed linear so our illustration

### 3:25 - 3:51

from the last video which showed you how routers pass data to one another still absolutely applies ho c from our previous example could absolutely be some host in the sales team of new york and host a from our last video could absolutely be a host in the marketing team in tokyo all the routers in between form a linear path which data would flow through to travel between these two hosts

### 3:51 - 4:18

so these are two reasons why physically routers are typically deployed in hierarchical topologies but there is still another reason which i'd like to unpack next and that reason is that routers in a hierarchy allows for what's known as route summarization to explain route summarization let's focus on router 5 for a moment and let's take a look at router 5's routing table in the last few videos we discussed that every router has a routing table and

### 4:18 - 4:42

that routing table is a map of every network that exists in this topology we have 6 networks and router 5 is going to need a route for each one of them there'll be three networks to account for the three teams in tokyo pointing to router 6 router 7 and router 8 respectively and 3 more networks accounting for the teams in new york each pointing to router 4. now i want to quickly pause and talk

### 4:42 - 5:07

about this slash 24 real quick to explain it fully we'd have to dive into the world of subnetting which we're not going to do in this module but i do want to give you a quick glimpse into that world to explain what the slash 24 means when we say 24 we mean that these routes are going to match on the first three octets of a destination ip address this slash 24 refers to the bits in the ip address

### 5:07 - 5:33

remember back in lesson 1 i told you that an ip address is simply 32 bits which we break up into chunks of eight or four different octets and we represent each of those octets as a decimal number that's all an ip address is and when we say 24 what we are saying is we're going to match on the first 24 bits so there's 8 there another 8 there which brings us to 16 another 8 there which brings us to 24 and that's what we

### 5:33 - 5:59

mean when we say a slash 24 will match on the first three octets in practice the way it works is if a packet showed up to router 5 that looked like this each of these routes would have router 5 look at the first 3 octets to find a match 104077 matches this route right there and this particular packet would be sent to router 8. and if this packet were to show up on router 5 again router 5 would take a

### 5:59 - 6:23

look at the first three octets to find a match and a match would be found right there and this particular packet would be sent to router 4. so that's what that slash 24 means but notice in router 5's routing table we have three routes all pointing to router 4 accounting for each of the three networks in the new york office but everything at the new york office starts with 10.20

### 6:23 - 6:53

well what if we could simplify these three routes into a single route telling router 5 to only look at the first two octet to find a match on 10.20 well we absolutely can by telling router 5 to match on a slash 16 network if a slash 24 matched on the first 24 bits then a 16 is going to match on the first 16 bits which means the first two octets this route is telling router 5 that any packet with a destination ip address

### 6:53 - 7:21

that has a 10.20 in the first two octets should be sent to router 4 and then router 4 will hand it off to the next appropriate router in the path so now if router 5 received this packet since we have 10.20 in the first octet this packet would be sent to router 4 for delivery notice we were able to reduce the number of routes in our routing table we went from three routes initially to just a single route now it might not

### 7:21 - 7:45

seem like a jump from three routes to one route is all that useful but consider what if the new york office scales here we only have three networks but what if we added another 10 networks or 100 networks well since they all belong to new york they're all going to start with the 10.20 ip space and router 5's routing table will not have to change this one route will account for any additional network added to the new york

### 7:45 - 8:07

ipspace so that's one of the benefits of route summarization is that it reduces the routes in a routing table but can we actually take it a step further let's take a look at router 8's routing table and let's focus on that for a minute just like before router 8 has to account for every single network in this particular topology

### 8:07 - 8:34

one of the networks router 8 is directly connected to that's the 104077 network then router 8 will have two more routes for the other two teams in tokyo and three routes for the three teams in new york just like before we could summarize these three 24 routes as a single 16 route telling router 8 that to get to anything in the 10.20 network send it to router 5. but take a look at where router 8 is in

### 8:34 - 9:00

this particular topology notice that whether router 8 is speaking to new york or router 8 is speaking to something else in tokyo either way the next hop in the path is going to be router 5 which means we can actually go a step further than this 16 route we can simply tell router 8 to send anything that starts with 10 dot whatever to router 5. this slash 8 is looking for a match in

### 9:00 - 9:23

only the first octet which means if a packet shows up that has a destination ip address of 10 dot whatever router 8 is going to forward that packet to router 5. so that could be a destination host in tokyo or a destination host in new york but there's something i have to draw your attention to what happens if this packet shows up on router 8.

### 9:23 - 9:51

well this slash 8 route says we're only going to match on the first octet for a value of 10 which this packet does indeed match and this 24 route says we're going to match on the first three octets of 1040.77 which this packet also matches so you see this particular packet happens to match both of those routes in such cases the router has to make a decision upon which route to use to forward this packet

### 9:51 - 10:15

and the decision criteria that the router is going to use is which route is most specific in this particular instance a 24 since it matches more octets is more specific than a slash 8 and therefore this packet will be forwarded using this route now there is much more to how routers decide which route to choose when multiple routes match i created a separate video discussing it

### 10:15 - 10:40

and i'll add a link to that video in the description just below the like button either way this is how router 8 would account for any ip address in the acme corporation ip space whether it's in the tokyo office or the new york office but there's still something we have to account for and that is every network that's going to exist out on the internet of which there's going to be thousands and thousands but again notice where

### 10:40 - 11:04

router 8 sits in this particular topology to reach anything on the internet router 8's next hop is always going to be router 5. so we can actually go a step further than using a slash 8. since router 8 needs to use router 5 regardless whether it's trying to speak to tokyo new york or anything on the internet to do so we're going to give router 8

### 11:04 - 11:33

what's known as a default route a default route is sort of like the ultimate route summary it looks like this it uses a slash zero route just like a slash 24 match on the first three octets and a slash 16 match on the first two octets and a slash eight match on the first octet a zero would indeed match on zero octets which means every single ip address is matched by this particular route

### 11:33 - 11:58

this default route is essentially telling router 8 that to get to anything go to router 5 which if you look at the topology that router 8 is deployed within that is indeed the next path whether it's speaking to tokyo new york or anything out on the internet for all packets that router 8 receives whether they're destined to something in tokyo or destined to something in new york or destined to something out on the

### 11:58 - 12:22

internet router 8 will use router 5 as the next hop in the path and then router 5 will distribute it to the next hop as necessary this is what i mean by a default route being sort of like the ultimate route summary and that is our discussion of route summarization and again route summarization is only possible if you deploy your routers in a

### 12:22 - 12:46

hierarchy and that brings this lesson to a close the main takeaway from this lesson is that routers are typically deployed in a hierarchy this makes it easier for topologies to scale and allows for more consistent connectivity experience for the users in the network plus the hierarchy allows for clever route summarization which will reduce the number of routes you need in a routing table

### 12:46 - 13:14

and we also discussed the ultimate route summary known as the default route and we gave you a brief glimpse into some subnetting concepts as we define what a slash zero slash 8 16 and slash 24 are in the next lesson we'll discuss the idea of networking protocols and introduce you to eight common protocols used all over the internet but that's it for our lesson on routers i hope you enjoyed this video i want to thank you for watching and we'll see you

### 13:14 - 13:35

in the next one hey youtube i hope you enjoyed that free lesson i'm releasing this content for free to see how much interest there would be in a full networking fundamentals course taught in the same practical networking style if you want the full course to be created you have to help me out by spreading the word about this free module if this content gets enough attention i will definitely create the

### 13:35 - 13:58

full course based upon your suggestions for what you want in a networking fundamentals course besides i'm sure you know someone that would also benefit from learning how data flows through the internet so you'd be helping them by sharing these videos you could also further help me out with a youtube algorithm by liking subscribing and leaving a comment below i would appreciate it greatly and i read and respond to every comment

### 13:58 - 14:07

otherwise feel free to join fellow learners and fans of practical networking on discord the invite is available at pracnet.net discord thank you for watching and we'll see you in the next video

