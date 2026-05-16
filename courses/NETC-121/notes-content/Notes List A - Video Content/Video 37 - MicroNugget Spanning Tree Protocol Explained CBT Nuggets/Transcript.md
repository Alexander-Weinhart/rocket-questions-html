# Video 37 - MicroNugget: Spanning Tree Protocol Explained | CBT Nuggets

## Transcript

### 0:00 - 0:24

how do I configure spanning tree protocol spanning tree is awesome because it's truly all about the concepts you could spend hours learning about what is the root Bridge how is it elected how do the other switches find the best way to the root bridge and block the Redundant paths what if the root Bridge fails how does it fail over how much time does that take down and down the concept Trail we can go but when it comes to the configuration there

### 0:24 - 0:49

is one command now there is more but there is one that really does it all and that's this one right here electing the root Bridge so when you're thinking about spanning tree studying for spanning tree implementing spanning tree that's the one command you want to use honestly in my career I've used the rest of these commands a handful of times and they were always for weird situations where we're like well I guess we could make it work if we did this maybe you

### 0:49 - 1:14

know it's like a Band-Aid approach sort of thing so these I would say yeah you know know they exist but really this is the one command you want to know okay so what is it electing root bridge I'm going to go into whoa the configuration mode of uh switch and first off I just said there's one command I'm going to show you some commands I want to know who the current roote bridge is so I'm going to do uh show spanning tree hit the enter key now you remember that

### 1:14 - 1:37

Cisco switches run per VLAN spanning tree so you have the ability to set a spanning tree on every single VLAN differently but in this case the switch only has one uh VLAN and I can see spanning tree is enabled it's using the normal 802.1d which is the original spanning tree prot it says the person who is the root the switch I I kind of talk to switches like they're people the switch who is the root has this priority in

### 1:37 - 2:05

this Mac address and I get to them when I say I I'm talking CBT switch one CBT switch one gets to it by going out port 11 or essentially fast ethernet 0/11 which has a cost of 19 so this is kind of the baseball trading card on who is the root Bridge here's its stats and then the switch says oh and then there's me I am a priority of 32769 my Mac address is this I'm saying hello every two done we go so we can see who the current root bridge is I'm going to go

### 2:05 - 2:29

into Global configuration mode here is the one command I'm going to type in spanning tree followed by the VLAN because we have per VLAN spanning tree I only have one VLAN in this case but if you had a whole bunch you would do one through 100 or however many vlines you had then you get to say root and then you have an option primary or secondary now this is Method one to elect the root Bridge like you can see here in the background method one says I can go in

### 2:29 - 2:56

there and I can say uh this switch is the primary and what that does is it looks at the priority of the current root bridge and it puts itself two steps below the primary the the current root Bridge so if the the current root bridge is uh 20 or 32,768 as the priority that's the default for just about everyone it says okay I'm going to put myself two below that one now with spanning tree it uses increments of 4,096 has to do with perv

### 2:56 - 3:17

land spanning Tre they had to steal bits to make that all happen but for now just remember the increments are in 496 so using a quick calculator you would say okay it's you know 28,000 or 24,000 it's going to do something essentially it's going to put itself too below because you can see the second command we have here is spanning stre L one route secondary so if you want to have a backup root Bridge like what happens if the main roote Bridge goes down this

### 3:17 - 3:44

guy's going to take over well he is going to set himself as one increment below the primary right so these are kind of uh squishy meaning I don't know what the priority is going to be I just know it's going to set it itself if it can to below whatever the current roote bridge is now if you're not so squishy you can go back and say I want to use VLAN 1 and instead of typing in root you can type in priority and then here you go Bridge priority increments of 496 so

### 3:44 - 4:06

I can just say you know what this guy zero hello that'll be the uh lowest possible priority you can have which means it is the best possible election candidate for the root Bridge uh that's one way to do it I don't like that because it doesn't allow you to squeeze anything else below it if you have a uh another switch you want to be the root bridge on an emergency basis or something like that so for now I'm just going to do root primary right this is

### 4:06 - 4:32

the one command I hit enter it's done I go back to uh privilege mode show spanning tree bpdus the hello messages are happening once every two seconds so it should go quite quickly and it did this switch has now become the rout check out the priority to below right there's at 24577 two below the uh the current one uh increments I should say below so it is now the root Bridge so the bridge ID you can see this is the same person the

### 4:32 - 4:59

root and the current bridge is the same one okay everything else what are these things these are things that tweak spanning tree I'm actually going to start from the bottom up just because I'm here right now looking at the hello time being every two seconds I can come in here and say you know what I want the uh spanning tree for VLAN 1 to have a Hello time and the lowest you can go is 1 second so you can see this is most of the time you don't use this command

### 4:59 - 5:21

however if you really think about it if you make it part of your standard switch template config because they all want need to have the same hello time uh you can actually cut the time it takes spanning tree to converge in half because it's going to be able to detect a failure faster because it's saying hello hello hello hello once a second uh rather than once every two seconds that being said I'm telling you real world you just

### 5:21 - 5:45

don't see people do that you say okay I'm just going to keep the standard 2C hello time um I I don't mean to to sound negative or anything anything like that but I have never seen anybody tweak the default hello time uh in the spanning Tre world now what about the cost and priority first off what's the difference the cost is how does the switch find the best way to the root Bridge as a matter of fact I just minimized it but take a look right here you can see that this

### 5:45 - 6:13

switch said you know what I'm going to go out uh fast EET uh 011 fact right here 011 back before it became the root bridge is why I scrolled up it says this is my root Port it cost me 19 in order to get to that root Bridge that's because uh spanning tree protocol 802.1d said that 100 megabit per second link would be a cost of 19 so it says okay cost of 19 cost of 19 and it adds those things up but if I want to go now this is actually not a good

### 6:13 - 6:36

spanning tree example topology I need that extra line there cost of 19 so when this guy's like okay if this guy's the rout that's the most cost effective way to get there because it cost me 19 but the cost is transmitted in the bpdu so it's also able to say okay I could get to the route if I go this way but it's going to cost me 38 no way this is the more efficient way but maybe this is why I'm saying I've never really seen this done too often but if you have one of

### 6:36 - 6:58

those weird situations where you want to tweak and you're like well let's let's try this you can actually go into the port and say you know what this is really a cost of one and this is a cost of one so even though this is 100 megabit per second link and this is 100 megabit per second link it's going to say you know what a cost of two is pretty darn good I'm going to go that way and block this link as the uh non-preferred way to get to the port so

### 6:58 - 7:24

that's what the cost is what about the priority priority is Handy if you have two switches that are connected like that right cost is the same Cisco's like you know what maybe you just you know you want to prefer this link let me Circle it this link right here over this link this link U so I want this one well in spanning treat lower Port values are better than higher Port values so maybe this is Port one this is Port two it's going to prefer this one by default

### 7:24 - 7:48

unless you tweak with the port priority the port priority says you know what I don't want to play these games like let's let's just lie to the switch let's be honest that's what we're doing here right let's just lie to the switch and tell it it costs less than it really does let's keep the cost the same but let's change the priority to say you know what I prefer this one so I can go in and adjust the priority to a uh uh better value than I would on this one so

### 7:48 - 8:13

how do we do that I'm back on my switch I'm going to go into interface fastet 011 and here's the command I can type in spanning tree and right there you can see the uh cost is one value I can type in and say the cost is you know you can figure it out using your default formula or I'm just going to say the cost is one and that automatically overrules it or I can go in spanning tree and you see the command right below it right uh Port priority and I can say the port priority

### 8:13 - 8:45

is actually uh 16 you know and set it at a lower Port priority now again with the uh uh wording sometimes it's confusing just remember in spanning tree lower is always better in terms of root bridg election the bpdu uh in in terms of the bridge priority the lower is better the cost lower is better the priority lower is better so it's good that everything's consistent all the way through anytime you're thinking of the value lower is better in summary if you are managing

### 8:45 - 8:57

spanning tree in the real world all you need to know is the one command use the reference books for the others if you're managing spanning Tree in a certification exam environment you got to know them all I hope this has been informative for you and I'd like to thank you for viewing

