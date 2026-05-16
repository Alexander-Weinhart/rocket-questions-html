# Video 41 - EGP / IGP :: Distance Vector / Link State :: Dynamic Routing Protocols :: OSPF EIGRP BGP RIP IS-IS

## Transcript

### 0:00 - 0:22

hello in this video we're gonna be talking about dynamic routing protocols now initially this video was going to be the start of a new series covering ospf but i figured if i separated out the concepts this video could also become a jumping off point for the other writing protocols as well so there's interest in that let me know otherwise in this video we're going to be picking apart the concepts of igps and egps as well as distance vector protocols versus link

### 0:22 - 0:43

state protocols the ultimate purpose of a dynamic routing protocol is for routers to automatically share routes with one another we introduced the concept of dynamic writing protocols in this video where we discuss how routers work and how they populate the routing table in that video we showed you this slide which unpacked the three different methods that exist for a router to populate its routing

### 0:43 - 1:07

table directly connected routes static graphs and of course dynamic routes with dynamic routes what happens is router 2 and router 1 would automatically talk with each other and share the networks that they know about if any of that is unfamiliar to you i would highly recommend checking out this video and in fact the entire networking fundamentals series you can get each of those videos for free by going to practice nf

### 1:07 - 1:28

either way the last thing i told you on this particular slide is that there are five major dynamic writing protocols that exist and each of them differ in so far as how they detect other routers participating in the same dynamic writing protocol and what they share when they're actually sharing routes with one another now the inner workings of each of these are pretty fascinating but we're not going to go into too much detail on any

### 1:28 - 1:55

single dynamic roading protocol in this video instead we're going to talk about all of them and the categories that they fall into the first categories that we're going to discuss is the concepts of igps and egps igp stands for interior gateway protocol and they include rip eigrp ospf and isis an egp stands for exterior gateway protocol and the only egp in use on the internet today is bgp the border gateway

### 1:55 - 2:17

protocol and to discuss these concepts we're going to use these two company networks since these are two separate company networks they can each be referred to as an autonomous system now the concept of an autonomous system is very important so i do want to give you a formal definition an autonomous system is any set of routers or networks underneath a single administrative control

### 2:17 - 2:42

since this is a different company network than this each of these are referred to as their own autonomous system with that in mind we can now explore what an igp is an igp is best suited for sharing routes within a particular autonomous system meaning these routers over here belonging to company a might be using eigrp to talk amongst themselves and share the networks that exist inside

### 2:42 - 3:04

company a and these routers over here belonging to company b might be using ospf amongst themselves to talk and share routes with one another igps are typically tuned for speed and responsiveness if something were to happen to that router right there we would want the other routers in the topology to instantly know that some sort of failure event has happened and then adjust the routes accordingly

### 3:04 - 3:29

to do this these igps tend to be pretty chatty but that's what you pay to get this additional speed and responsiveness by comparison exterior gateway protocols are built for sharing routes between autonomous systems meaning company a could share with company b the ip address space that company a owns and company b could then do the same now typically companies aren't so big that they share ip address space with

### 3:29 - 3:56

another directly some companies are that big but most companies will share their routes with an isp or an internet service provider each company is connected to one or more internet service provider and then those companies will share their routes with those particular internet service providers and they'll do that using an exterior gateway protocol or mainly bgp these interconnected isps are essentially what the internet is it's

### 3:56 - 4:23

just a bunch of internet service providers that are all connected to one another either way each of these isps are their own autonomous system and each of these isps will share routes with each other and different companies using something like bgp unlike igps egps are tuned for stability meaning again if something were to happen to that router company a might want all the other routers in this topology to instantly know about

### 4:23 - 4:47

but we might want to shield the rest of the internet from knowing something small occurred in company a's network if you think about it how many different failures occur in all the thousands of companies that exist out on the internet we wouldn't want the entire internet to be flooded with every single small failure event instead exterior koa protocols will limit intentionally how often updates are sent or received

### 4:47 - 5:11

moreover exterior gateway protocols are also tuned for security and control for instance with bgp this isp might know the ip address space that company a owns and might tell this router that it's only going to accept routing advertisements from company a that belong to that particular ip address space if company a decided to start doing something malicious and advertise out into the internet that it actually own

### 5:11 - 5:36

company b's ip address space this internet service provider would know about it and would reject these routes now some igps do have methods of filtering routes but not nearly to the degree that an exterior gateway protocol like bgp does moreover bgp gives company b the ability to share routes with ispy and ispz but also include information and preferences which can influence the rest of the

### 5:36 - 6:04

internet and how they choose paths to get to company b's networks maybe company b wants to prioritize traffic going through this path because this link is faster or is less expensive service with an exterior gateway protocol like bgp you can influence the route selection of isps multiple autonomous systems away in fact bgp has a whole 12-step route preference sequence it goes through when determining what routes to select

### 6:04 - 6:29

bgp is actually pretty fascinating protocol and i thought about doing a bgp series if there's interest in that mention something in the comments below either way bgp allows for all sorts of mechanisms for controlling the inbound and outbound paths between all these autonomous systems whereas igps only offer a few ways to influence the path selection which is another important difference between igps and egps

### 6:29 - 6:53

in any case that's a high level comparison of igps versus egps the important thing as a network engineer is for you to understand the pros and cons of both and to make the best decision for your particular topology either way that's all we're going to speak about in so far as igps and egps next we're going to dive a little bit further into these igps and break up these four protocols into two other categories

### 6:53 - 7:17

distance vector protocol which include rip and eigrp and link state protocols which include ospf and isis to talk about them we're going to use this topology and we're going to start with link state protocols a link state dynamic routing protocol is going to have knowledge of the entire network topology so if all of these routers were doing a link state dynamic writing protocol with each other

### 7:17 - 7:42

router 5 would know that it's connected to router 4 and router 6. the router 5 would also know that router 6 is connected to router 7 router 8 and router 9 and that router 7 and 8 are connected and router 8 and 9 are connected and router 5 would also know the three networks that are hanging off of router 7 router 8 and router 9. the same thing on the other side router 5 would know everything that's going on on that particular network

### 7:42 - 8:05

now the price of all that additional knowledge is that it's going to cost more ram and cpu resources to maintain the knowledge of the entire topology but the benefit is that router 5 will be better equipped to converge in case there's some sort of failure event link state protocols typically have faster conversions what i mean by that is if router 5 is taking this path to get to the 10070 network and something happens to this

### 8:05 - 8:30

link well router 5 already knows of a second path to get to that particular network so there's nothing new that router 5 has to learn it already knows how to get here if something were to happen to that link so that's a rundown of link state protocols which now brings us to distance vector protocols distance vector protocols unlike link state protocols only have knowledge up to the next hop

### 8:30 - 8:54

so if all of these routers were doing a distance vector dynamic routing protocol with each other router 5 would know it's connected to router 4 and to router 6 but wouldn't know anything happening on the other side of router 4 or router 6. router 5 would simply know that these three networks exist on the other side of router 4 and these 3 networks exist on the other side of router 6 but router 5 would have no knowledge about router 7

### 8:54 - 9:19

8 and 9 or 1 2 and 3. the benefit to that is that router 5 wouldn't have to spend as much resources to maintain knowledge of the networks that exist in this topology but the cost of that is that distance vector protocols typically converge a little bit slower they're also slower to react to some failure events meaning if router 5 is taking this path to get to the 1001 network if something

### 9:19 - 9:46

were to happen to that link router 4 might tell router 5 that it no longer has access to the 1001 network and router 5 will now have zero paths to get to the 1001 network it won't regain access to that network until router 1 tells router 2 that it can still reach the 1001 network and router 2 passes that on to router 4 and then router 4 again passes that onto router 5 that it can now reach the 1001 network but throughout that time router 5 will have

### 9:46 - 10:11

no connectivity to the 1001 network so that's the rundown on distance vector protocols and link state protocols and again it isn't that one is better than the other it's that both of them have different pros and cons and it's up to you to make the best decision about which you want to use in your particular network if you're using older devices and a somewhat simplistic topology then maybe you can get away with using a distance vector protocol

### 10:11 - 10:35

but if you're using more modern gear and you have a topology that highly prioritized redundancy then maybe you ought to do something like a link state protocol now since we're in 2022 as i'm recording this i do want to quickly mention that the cost of more ram and more cpu on today's modern routers are largely inconsequential consider that most of these protocols were written back in the mid 90s in

### 10:35 - 11:03

those days routers had something like 64 kb ram or 128 or 256 kb ram and so whatever additional ram link state protocols required was actually relatively more costly nowadays any router built in the last 10 years is probably going to have enough memory to have 10 000 or even 100 000 routes in a link state database and it's going to be able to handle that just fine and finally the last thing i'll mention on this particular slide is

### 11:03 - 11:28

while eigrp is typically considered a distance vector protocol it's sometimes considered a hybrid protocol or even an advanced distance vector protocol because it includes certain features that only exist in link state protocols so it does a little bit of both cisco in particular is very eager to tell you that eigrp is an advanced distance effector protocol to put the protocol that they invented in a better light

### 11:28 - 11:52

either way that's all i wanted to communicate to you about distance vector protocols and link state protocols and that actually wraps up this lesson the main takeaways from this lesson is understanding that a dynamic routing protocol allows routers to automatically share routes with another in understanding the two categories that we discussed interior gateway protocols versus exterior gateway protocols and distance vector protocols versus link

### 11:52 - 12:07

state protocols if you enjoy this lesson and think it should be shown to a wider audience you can help me out by hitting the like button subscribing and leaving a comment down below those three things tell youtube to show this video to a water audience otherwise i hope you enjoyed this lesson thank you for watching and i'll see you in the next one

