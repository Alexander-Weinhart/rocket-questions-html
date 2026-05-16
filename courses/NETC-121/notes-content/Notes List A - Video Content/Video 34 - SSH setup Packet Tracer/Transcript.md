# Video 34 - SSH setup Packet Tracer

## Transcript

### 0:00 - 0:10

Let's walk through the SSH setup. We have a R3650 switch. We've got a PC, IP address set.

### 0:10 - 0:22

I picked IP addresses that will work, so they're both in the same subnet. We'll take the default subnet mask for the IP address. So, I'm going to go into PC, because it's got the console connection.

### 0:22 - 0:34

Bring up Terminal, which is the equivalent of PuTTY in our lab. And, no is the answer without exception, always no. Okay, so we've got the switch there.

### 0:34 - 0:52

First thing we need to do is set up the console login. So, we're going to have to go in here, and we're going to say Enable, and Config Terminal. And, one of the things I see in my diagram, right, is that I've got VLAN 1 as 1.1.1.1. So, I'm obviously also going to need to do that setup, right.

### 0:52 - 1:14

The interface VLAN 1, IP address, 1.1.1.1, no shutdown. There we go. Okay, so now, I can go ahead and say line console 0, password Cisco, login, exit.

### 1:15 - 1:32

So, now I've got this first part done, just a console password. It doesn't necessarily have anything to do with SSH and Telnet, other than Cisco requires it as a prerequisite to add that additional security. Next, assign a host name.

### 1:32 - 1:39

I'm going to use MySwitch. It could be anything you want. So, I'm going to go ahead and say host name MySwitch.

### 1:40 - 1:57

And, we watch the prompt change, and now we see that it shows MySwitch. Okay, next, you need to create a domain name for the cryptographic key generation. So, the cryptographic keys require a fully qualified domain name.

### 1:58 - 2:28

So, such as switch.cnet.local, or it could be IP domain name xyz.com. It doesn't matter what it is. It just needs some domain name there. So, IP domain name, IP domain name, and then I'm going to say cnet.local. Done.

### 2:28 - 2:46

Let's go back to our list. So, now we need to generate the cryptographic keys. So, we go back in, and we say crypto key generate RSA, and 2048 is the only one we'll ever use.

### 2:46 - 2:57

512 is the path to nowhere in the real world, because PuTTY and most other things don't support less than 2048 bits. So, it takes a second. Boom, it's done.

### 2:57 - 3:05

Now, the keys are generated. Now, we're going to set up remote access. So, and we're also going to lock it down to SSH.

### 3:06 - 3:25

If we didn't do this line of transport input SSH, it would allow Telnet, which is insecure, and we don't ever want to use that. So, we're going to say line VTY 0 to 4. You can say 0 to 15. It just doesn't matter anymore, and the SSH has been enabled.

### 3:25 - 3:40

Great. So, then we're going to say transport input SSH, and then we're going to say login local exit. So, now we're done with that step.

### 3:41 - 4:08

And then lastly, we need to create a username with the highest privilege. So, admin is typically what's always done. So, we're going to say username admin privilege 15, and then here's where the secret Cisco comes in, and it matters if you spell privilege right.

### 4:14 - 4:17

Done. Okay. Now, we're ready.

### 4:18 - 4:37

So, what I did here in my setup is I showed that I only have a console connection here on the PC. I'm going to SSH in from the switch. I'm going to go to desktop, and I'm going to go to command prompt, and now I can use the SSH command.

### 4:37 - 4:53

SSH TAC or dash L, L for login. Admin is the login I'm going to use, and I'm trying to connect to the switch at 1.1. So, I hit enter. It comes up and says, what's the password? CISCO.

### 4:54 - 4:59

It doesn't echo it back. Enter, and I'm in. If I say enable now, I'm in.

### 4:59 - 5:11

I can say show run. You know, I'm SSH'd in. If this had been a real PC and I was running Packet Tracer, I'm sorry, running Wireshark, you would see the traffic and such.

### 5:12 - 5:13

That's all it takes to set this up.
