# Video 17 - Wireshark Tutorial - Installation and Password sniffing

## Transcript

### 0:00 - 0:23

in this video I'm gonna show you how to download and use Wireshark Wireshark is a really important tool if you want to see what's going on on a network so as an example seeing passwords or other information on a network in this example

### 0:23 - 1:00

I'm using Windows 10 I'm going to open up Microsoft edge and go to google.com and do a search for Wireshark first hit is why shocked at org so you could just go directly to why shocked at org if you wanted to and then click a download to download Wireshark what I'm going to do is select the windows installer 64-bit because that's what I'm using in this example and I'm gonna click save Wireshark is now downloaded so I'm gonna click open folder to open my downloads

### 1:00 - 1:31

folder and as you can see here Y shark 164 but version 3.0 3 has been downloaded I'm gonna double click on that executable file click yes to install the application now you can change some of the options when you install Wireshark I'm gonna basically stay with the defaults you need to agree to the why shop license I'm gonna click agree why shark is free you don't have to pay for it but you do need to agree to the license if you want to use it

### 1:31 - 2:03

components to install I'm going to stay with the defaults but essentially Wireshark is the graphical user interface that we want to use T shark is a command line interface very useful if you want to use Y shark without a graphical user interface I'm going to click Next I'll keep the defaults but also add a desktop icon click Next I'll stay with the default installation directory click Next Wireshark either requires MP cap or 1 P cap to

### 2:03 - 2:32

capture live network data I'm going to stay with the defaults and click Next USB P cap is required to capture USB traffic I'm not going to use that I'm going to simply click install to install why shock as you can see why shock is now being installed on my Windows computer you essentially need to just wait for that installation to complete so a whole bunch of files are installed now the NP cap License Agreement is displayed you need to agree

### 2:32 - 3:07

to that as well you can specify various options but I'm gonna stay with the defaults and click install once you get used to Wireshark and you use more advanced features you can select some of the other options but again here I'm just using the defaults to allow wire shock to make changes to my computer and install as an example loopback adapter on my Windows computer so as an example in control panel if I look at my network and Internet

### 3:07 - 3:39

what you'll notice is I have a NP kappa Lube back adapt installed so under control panel network and internet network connections I have my Ethernet interface Ethernet 0 which is a network - and I have an MP cap loopback adapter installed and that was installed as part of the why shock installation click Next click finish the NP cap has now been installed why shock installation continues as you can see there my wife shot icon is now

### 3:39 - 4:16

displayed on my desktop once your files are extracted and notice the installation is complete click Next click finish that's how you install Wireshark on a Windows computer all I need to do now is start it up and notice I have two interfaces and pcap loopback adapter and Ethernet 0 this shows me that there's a lot of traffic being seen on that Ethernet adapter so I'm gonna simply double click that now note if the network is busy which this network is

### 4:16 - 4:46

you'll see a lot of traffic in the output I could filter as an example for some type of protocol II I job P is a routing protocol and I can see hollow messages for that protocol if you don't know what that is don't worry OSPF is another routing protocol so I can see that so there's a lot of traffic in this network but I'm filtering to only see certain traffic types in this case telnet so what I'll do in this example is telnet

### 4:46 - 5:21

to a device on my network so I'll tell net two one nine two one six eight two five four notice we can see telnet traffic in the output now previously we didn't see that I'll put in my username which in this example is Wireshark and I'll put in my password and notice I've connected to a 3750 Cisco switch show version will actually show me that output now if you haven't worked with Cisco devices before don't worry basically all I've done is

### 5:21 - 6:05

all needed to a switch in my network a device that I'm physically plugged into you would see something similar if you talented it to a router but notice here's the telnet data I can as an example have a look at the telnet data I can see here user access verification asking for a username my PC with this IP address 192.168.1.1 and it's sending it

### 6:05 - 6:41

back again so that it displays on the screen so scrolling up here I could actually see my username displayed and that's what's being displayed here so that's the e in Y shock Dead's echoed back and then if I continue you'll see the username wire shock and then the switch prompts for the password and what you'll notice now is my password is sent to the switch now there's a much easier way of doing this if I click on one of the packets and then click follow TCP

### 6:41 - 7:12

stream I'll see the entire stream so as an example the blue is what the switch is displaying the red is what I'm typing so hence you see why shock typed twice there but notice the password is only displayed once because the switch didn't echo that back again there's my show version command it's are topped SH space VR and then I pressed tab and that's what was displayed and then the output of the command was displayed there now as an example on

### 7:12 - 7:47

this switch if I touch show run and don't worry too much about this command all I want you to see is that I can see information in real time in wire shock notice here's a user name called Bob he has a user name called Wireshark both with a really bad password of Cisco in this password David is using encryption that's much better that's what I should be using if using a Cisco device but once again if I click on a telnet packet and then go analyze follow

### 7:47 - 8:15

TCP stream you can see all of that output in wire shock it's being captured by Wireshark and I can view the usernames and passwords now in my wife shark course I talk more about this and show you how to hack protocols in more detail using ports pan as an example so here it's fairly easy to see what's going on because my device is sending the traffic into the network and receiving the traffic but if you wanted to capture packets from other devices

### 8:15 - 8:51

you need to enable span or something else in your network so that you can see those packets and have visibility of what's going on but what I'll do here is open up a web browser and go to this website o X AC UK this is University of Oxford now this is really bad websites today shouldn't be using HTTP and they should be using encrypted HTTP traffic so what I'll do here is exit out of the switch and just to show you the IP address of

### 8:51 - 9:33

that website I'll use nslookup so nslookup Oh X AC UK notice the IP address here this is the IP address of the server so I should be able to filter for 129 there it is over there so I'll right-click on this and I'll select this as a filter so I see just the traffic to that server now I don't have an account on the server but if I was asked to log in to the server and we're sending the traffic via HTTP I'd be able to see those passwords notice when I clicked on

### 9:33 - 10:08

staff it took me to another domain name and this one is encrypted HTTPS but if I go back notice o X AC UK is in clear text it's bad practice today to use clear tech for your websites they should be encrypted so let's do another example just so that you can see a login I'm going to connect to that switch again and notice here I'm asked for a username and password so I'll use my username of Wireshark positive Cisco that will log

### 10:08 - 10:52

me into that switch so let's just search for that IP destination equals 1 into 1 6 8 1 2 5 4 so now what I'm doing is I'm looking for traffic to that server which is the switch and what I could do is filter that for HTTP so let's go and HTTP so full to that write down now this authorization here is displayed and notice there's my username Y shark and Cisco but what I want you to see is you can see the username and password in clear-text because HTTP is clear text ok

### 10:52 - 11:11

so I hope you enjoyed this video if you did please like it and please subscribe to my youtube channel that really does help me I'm David bumble I want to wish you all the very best [Music]

### 11:11 - 11:21

[Music]

### 11:21 - 11:21

you

