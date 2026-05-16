# Video 3 - Mac CLI

## Transcript

### 0:00 - 0:30

This tutorial is designed for Mac users who have, for example, their own Mac and want to be able to do the same things we're going to do in Windows in our lab, or if you've got a Windows PC. So first thing we need to do is we need to get to the command prompt, or the command line interface. It's under the, if you open up Finder, which is like File Explorer, go to Applications, scroll all the way down to Utilities, and expand that, and in there you'll find Terminal.

### 0:30 - 5:22

I've actually got it as a shortcut on my deck, my dock. So we're going to start up Terminal, and the first thing we're going to do here is let's customize it. I'm going to go to Terminal menu, Settings, and I want to change the font under Text.

You can make all kinds of changes, but what I wanted to do was I just wanted to make the text bigger, make it easier in the eyes, especially when I'm recording these kinds of things. So I have a big size, right? Enter just moves us down the line. One of the things, let's go look at some of the common commands.

So Network, Setup, List All Hardware Ports, and what this is going to do is this is going to show us all of our interfaces that could have an IP address and used in that manner. So we see some things. We see, you know, EN5 and 7 and so forth, and our hardware, our Wi-Fi, is using EN0.

That's the key to the address or the port we want to look at. And then you see there's Thunderbolt and other ports. In Windows you'll see, and sometimes in Macs, you'll see other VPN, Virtual Private Network, other adapters, or if you have virtualization set up like I do with Parallels Desktop, those kinds of things.

So EN0 is the port we want to look at. So then we can say ipconfig get the interface address of EN0. And we see that my IP address here is 192.168.1.146. Okay.

We can also say ifconfig and then say EN0. Look at what we get here. It looks a little nastier and such.

A couple of things we see. Up here we see Internet version 6. Internet version 6 we spend time on in Netcom 2, but not Netcom 1. But that's the IP address for that. And then here we see the IP version 4, which is what we'll use the entire semester, our IP address again.

We just had to dig for it a little bit more and such. Next, we can always do a clear to clear the screen. So let's look at something called DNS, Domain Name System.

So when we want to type in espn.com or google.com or whatever it is, we want to type in names, but everything on the Internet only uses IP addresses. So we need something that's equivalent to the old white pages phone book that or directory assistance 411, where we say here is a name, give me the IP address for it. So if we need to see our scutil hyphen hyphen or often pronounced tac, tac, tac, and then say DNS.

And what we see is we talk about resolving names. That's why it's called resolver. So if someone says, you know, what's the number for the Kroger in Westchester or whatever, that you can look up in the white pages under Kroger, who does this, right? But that's how it works.

And you can look up for that address and look up for the phone number. This DNS is the exact same thing. We're going to give it a name, espn.com, google.com, whatever it is, common names that we can much more easily remember, and then have it automatically in the background, go do this lookup, find the IP address for the web browser to use, and then go do that.

So you have to have a phone book or a 411 like service to do that name resolution. So here, these actually happen to be Cincinnati Bell's DNS servers. Unlike a single, if you think about the old, old, old, old days when you had a white pages that was physically printed, instead of just one, and the yellow pages is another example, right? And then in your neighborhood, if you, back in the day, they were pink pages that were just more, more regional focused to neighborhoods.

There are multiple servers that have this information. That's another topic, but this is how we get to it. That's the command.

### 5:23 - 6:43

Next, if we want to find out what the IP address is for something, we can say dig. And if I say google.com, it's going to show us one or more IP addresses. Google actually has a lot of servers.

So, but this is the IP address. So in a web browser, when you type in google.com and the address bar, it goes and reaches out to the DNS server and says, Hey, I need the IP address for that. And this is what it comes back with. So dig did stand for domain information groper, but most people just say dig. Okay. Next.

One of the things that's really powerful to do is we test connectivity. Can I reach something? And the command for that is ping packet, internet groper, but ping. So if we say ping google.com, it's going to have to first go and get that IP address. I'll do control C to stop it. It'll go forever unless you do a control C. So we did dig and we found out this was Google's IP address. And then when I said ping Google, it went and fetched that address and said, Hey, that's who I'm really going to ping.

### 6:43 - 7:27

Because I can't pay a name. I can only ping IP addresses. There are some sequence numbers and time to live and so forth.

The most important part for us is the time that it shows. It's either going to show a time like this in milliseconds. And that's the standard unit of measure we use.

We don't use seconds. We don't use hours, minutes, whatever. It's milliseconds.

And this is probably a very reasonable time. So if I ping something that I know is not going to work, then we see this request timeouts come. This is what this is simply indicating that it was not successful versus the first example was it was successful.

### 7:28 - 8:04

So we use ping extensively. Nobody else uses ping except it people to test connectivity. It's a big thing for us.

Do we have our routing set up in our other configuration as such? Okay. We also, sometimes we want to see how did the traffic get to some distant network so we can say trace route spelled out. And if we say google.com, what it's going to do is we see that it's going through and it's got, you know, my local address.

### 8:04 - 8:22

That was the gateway address, IP address. And then we'll see some things that timeout, which is very, very typical kind of stuff. It simply means that it didn't get a reply back in time because this is going through and checking each hop or each router that we go through.

### 8:23 - 8:57

Routers are, we talk about those are the hops. So give us a minute to finish here. So now I'm somewhere in, so here this, I know, I know what this means, right? So you'll see, this is typical too.

We know AltaFiber is, is the brand name or the company name that was formerly Cincinnati Bell. Cincinnati Bell, one of their early offerings was fuse.net. Now that it was called Zoomtown and so forth. Now it's AltaFiber.

### 8:57 - 9:27

So you'll see that in the online, that there are still things that are referenced as Cincinnati Bell or fuse.net or Zoomtown that will be in the inner workings of the, of the network and internet as well. So it's going through and each time it's going through and coming up with these IP addresses that it had to go through so forth. And we're 17 hops in, which means I have to go through thus far, 17 routers to get there.

### 9:28 - 10:57

This information can be used to find delays along the path. If you were driving from Cincinnati to Los Angeles, you know, the route, if you think about it, this, this would be showing you how long it takes to get from Cincinnati to let's say Indianapolis and from Indianapolis to, you know, Cairo, Illinois, and from Cairo, Illinois to St. Louis and so forth, each step that you might follow all the way out to the destination Los Angeles. So this typically resolves in under 20 hops or so or close to it, but this time, no, it's going, going along.

But the idea is that it's just showing us all of the routers that it went through and then how long it took to get to that next, you know, the for that response, I'm going to say control C to stop it. So trace route shows us the path to get to the destination in our lab. It would be often very short because if we don't have a router, which we do not in early labs, there are no hops.

Everything's local. The other thing, the last command we need to look at is for address resolution protocol to say ARP dash a, and what this shows us is it shows us on our net, on my network right now, the IP addresses with their Mac addresses. So this is kind of like the seating chart when, when someone's handing back grades.

### 10:57 - 11:16

So these are all the IPs that we know about. So if there's one we don't know, if we pinged it, it would get populated in this. So this is the table of all of the other computers that we know about their IP and Mac addresses clear to get this out.

### 11:18 - 11:53

Next, the clear is a nice, nice command to clear the screen. When we're done with terminal and we can copy and paste into this, this is really nice. We can type an exit and that, that ends it.

And then we can actually, I'm going to do a command Q to quit. I'm going to fire it back up. The other thing that we can do that's very powerful is, is we can go up and say, I would like a new window and I can resize these.

### 11:54 - 12:33

So what's common is that I'm just going to say ping google.com and I can have multiple windows and I can tile them. And this is very typical that we would have multiple pings going on. In windows world, it only pings four times and stop in Linux and Mac.

It pings indefinitely until you do a control C to stop it. When you stop it, what it's going to show you is a bunch of information. It's going to say, Hey, I sent 23 packets and 23 were received.

### 12:33 - 13:53

So there was no packet loss. Packet loss is a, is a key indicator of issues and such. Next, the round trip time.

How long did it take to go from the computer to the destination and back round trip time? It shows us the min, minimum time, the average and the max. So we see that 24.8 milliseconds was the minimum. 36 was the average.

And then it has the kind of an outlier. The high was the 98 milliseconds. And then the standard deviation is if you, when you take a statistics, this is a measure of, of the distribution of how, how broad it is.

Anyway, we really don't usually care about that, but packet loss is a big one we look for. And then typically the average time. So that is a quick introduction to using a Mac command line interface.

Another way you can get there, that's also really nice to know and a shortcut in Macs, is to do a command space bar, which brings up spotlight. And if you just type term or T-E-R even, it finds it, hit enter, bang, you're there. So you don't have to dig through finder per se as well.
