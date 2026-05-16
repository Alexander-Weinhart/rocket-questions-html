# Video 23 - Certificate

## Transcript

### 0:00 - 0:27

Let's talk for a moment about identity. How do you know who you're dealing with? You could ostensibly walk up to any unknown person and tell them your Bill Smith or some other name, and how would they know who they're really dealing with? Even if you gave them your real name, how would they really know who they're dealing with is the problem. If you think about it, law enforcement and TSA and so forth, they accept a valid driver's license or passport as proof.

### 0:28 - 2:19

So the reason that those are accepted, if you think about it, is that someone else is attesting to who you are. You had to go through a process. Now, with the passports much more involved, with the driver's license, especially with the TSA star or symbol on it, the requires more.

How do you prove who you are? Birth certificate, a rental agreement or ownership of a home or those things, a water bill or electric bill in your name to that address and so forth. That by doing all this, you assert enough evidence that you are who you are, and then the state or federal agencies go ahead and authenticate that. Well, the next challenge is when we're on the web, how do we deal with somebody online? We go to a How do we know that we haven't been hijacked and sent to a website that looks exactly like the one we want, but isn't? And that can happen.

So the solution for this is that companies buy what's called an SSL, which stands for Secure Socket Layer, but SSL certificate, which is their driver's license or passport equivalent from a third party registry. And there are lots. There's VeriSign and Thought, T-H-A-W-T, the GoDaddy and so forth.

There's a lot of these out there. And you have to, depending on the level of certification you're after, there are different levels, like for a bank and such, that you have to provide things like articles of incorporation and all kinds of things like that, Dun & Bradstreet rating and so forth. So that at the highest level, like what a bank might use, that it is, you know, absolutely certain.

### 2:20 - 2:53

So the challenge. Well, let's take a look at something. I've got an example here where first, here's what we're talking about.

Here's my startup page that I used on all my browsers and such. And notice that it's HTTP. And it says it's not secure because we know that port 80 HTTP is not secure.

It's sent in the clear. Everything is. Well, on this page, there is, we're not, I'm not doing any business or putting in any information or anything that needs to be protected.

### 2:53 - 3:39

That's fine. Look what happens if I change this though to, and I put the S. And it comes back and we get this warning. And it should be alarming that there are two kinds of sites we go to.

Innocent, innocuous sites like this and another example I'm going to show. Or if you're going to a business that you don't, you've never dealt with, you know, bobsgarage.com or something like that. And you go there and this comes up, this means as a business, they didn't bother to either get an SSL certificate to help enhance your belief of who they are, or perhaps they even let it expire.

### 3:40 - 4:10

So it doesn't mean that a site is bad, but it is cautionary in that, do you know what you're going to? So if I click advanced and then say, accept the risk and notice it almost looks like that's not an option, but until you hover over it and then boom, we get there. So the other thing to show is that, so I've got a virtual machine up and actually this one's up in Google's cloud. And this is the IP address for the machine.

### 4:11 - 5:16

And I'm going to use a program called remote desktop connection. So the RDP remote desktop protocol is a layer seven application layer protocol, and it allows us to connect to machines. So I'm going to connect.

And when I do this, it comes up and we get this error and it says, hey, we could not authenticate this thing because there's no cert. Actually, there is a certification, but it'd be like putting a business card in your wallet with your name on it that you wrote on it. Like, you know, that's, that doesn't really prove anything.

It's you made that yourself, not the state or somebody else. So this certificate is not from a trusted authority. Yeah.

This virtual machine did not exist five minutes ago and was just created and nothing's been installed. And we do that a lot where we're, we're creating in the cloud machines for testing purposes and such that aren't going to be there long-term, where, where this is normal. We simply say, yes, that's fine.

### 5:18 - 6:21

And then we connect in and then we'll see that, uh, probably still spinning up. Yep. Still starting up.

And here's, you know, a Windows Server 2025 instance that's spinning up. So in conclusion, this is about identity. How do you know who, you know, who's going to, what level of proof do you have? Yes, driver's license and passports can be forged.

That can happen. People do some shady things with certificates, but by and large, if they've gone to that level of, of setting a certificate up, you can trust the website. But we have all of the equipment that we have.

When I connect to the servers in our, in our networking room, the, we didn't install certificates there. Didn't install one on the firewall either. And that's common to need to connect to these types of devices that do not have external certificates or only internal self-signed certificates, which mean nothing that generate these warnings.

We just click through those.
