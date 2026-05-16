# Video 18 - Network Ports Explained

## Transcript

### 0:00 - 0:42

What is a port?  So that is the topic of this  video.  Now a port is not a physical connection, it's a logical connection that is used by  programs and services to exchange information. It specifically determines which program or service  on a computer or server that is going to be used. Whether that is pulling up a web page, using  an FTP service, accessing email and so on. And ports have a unique number that identifies  them.  The number ranges from 0 - 65535. For example some common ports are port 80 and  443 which are used for web pages.  Port number 21

### 0:42 - 0:50

is used for FTP.  And port number 25 is used for  email.  A port number is always associated with an

### 0:50 - 1:37

IP address.  An IP address is a numeric address.  It's an identifier for a computer or device on a network.  Every device has to have an  IP address for communication purposes. And an IP address and a port number work  together to exchange data on a network. So for example if you want to connect to a  server over the internet, the IP address is used to determine the geographical location  of that server.  Such as what continent, country, city, and so on.  And a port number determines which  service or program on that server it wants to use. Whether that service or program is a  web page, FTP service, email, and so on.

### 1:37 - 1:51

Now in simple terms, what does this all mean?  So  as an example, let's take a very common port that just about everyone uses every day and that is  port number 80. Port 80 is associated with HTTP

### 1:51 - 2:29

which is web pages. Whenever you visit a web  page from your computer, you're using port 80 whether you know it or not.  So let's say you're  sitting at your computer and you want to visit Google's web page.  So you would open up a web  browser and then you would type google.com in the address bar.  But before your computer can  bring up Google's web page, it has to do a couple of things first.  It has to convert the domain  name of google.com into Google's IP address, and in addition since you're using a web browser  which is using HTTP,  your computer is going to add

### 2:29 - 3:07

port 80 to the IP address.  So now the IP address  is going to be used to locate Google's web server. Then once the server is found, the IP address has  done its job.  So now it's the port number's turn. And Google's web server will see the incoming  request with port number 80 and will forward that request to its built-in web service.  So  you can finally retrieve Google's web page. Now all of this is happening behind the scenes.  You don't see the IP address or the port number that's being used.  However there is a way that  you can see it and that is by using the netstat

### 3:07 - 3:46

utility.  Netstat is short for network statistics  and it's a command line tool that is used to display the current network connections and port  activity on your computer.  Nestat is available on various operating systems, but in my example I'm  going to be working on a Windows computer.  So at a command prompt you type in netstat and then  we're going to also use a -n sub command so we can see the actual port number and then we'll  press 'enter'.  So here in the output we can see our connection to google.com.  The local address is our  computer here along with our IP address.  And here

### 3:46 - 4:24

is the port number that our computer has assigned  itself for this session.  The foreign address is google.com.  So here we can see the IP address of  Google's web server, along with port number 80 that's being used for this connection because  as I said before, port 80 is used for web pages. Now let's say on the same exact server Google is  running an FTP service where clients can transfer files.  FTP is a standard protocol that is used  to transfer files between computers and servers over a network and it uses port number 21.  So  on our computer we can open up a web browser

### 4:24 - 4:53

and as an example, we'll type in ftp.google.com.  And then we'll see the same thing happen again. The domain name of google.com will be converted  into Google's IP address.  And since we're using FTP, our computer will add port 21 to the IP address.  And once Google's server sees the incoming request with port number 21, it'll forward that request  to its built-in FTP service. And if we do the same

### 4:53 - 5:02

netstat command again, it'll show a connection  to Google's FTP service using port number 21.

### 5:02 - 5:23

So as I stated in the beginning of this video,  port numbers range from 0 - 65535.  And they are assigned by an organization called the  Internet Assigned Numbers Authority.  And these 65,000 port numbers are broken down into three  categories.  Port numbers from 0 - 1023 are called

### 5:23 - 5:42

system or well-known ports.  These are common ports that most people use every day.  And I've mentioned a few of these ports already, such as port 80, 443,  25, and 21. Port numbers from 1024 - 49151 are

### 5:42 - 6:16

called user or registered ports.  These are ports  that can be registered by companies and developers for a particular service and you can see some  of those examples here.  And port numbers from 49152 - 65535 these are called dynamic or private ports. These are client-side ports that are free  to use.  These are the port numbers that your computer assigns temporarily to itself during  a session, for example when viewing a web page.

### 6:16 - 6:53

So of these three categories, the  top two, which are the well-known and registered port numbers, these two  categories are used on a server.  In other words, these are used on a server that our  computer connects to.  But the third category which is the dynamic or private port numbers,  these are used on a client, meaning our computer. It's what our computer assigns itself during  a session.  So whenever our computer wants to use a service or program on another computer or  server, it assigns itself one of these port numbers.

### 6:53 - 7:08

Now sometimes on your computer you might see  well-known port numbers being used, such as port 21 and port 80. So for example if we do a netstat  with a -an sub command, we'll see port 21

### 7:08 - 7:48

and port 80 that are either listening or have  an established connection.  And as I stated before these port numbers are used on a server and not  on clients.  However servers aren't just large and powerful computers.  Your computer can also act  as a server for other computers to connect to. For example if you happen to be running an FTP  service or running a website on your computer you're going to see port 21 and port 80 that are  either listening or have an established connection because you can configure your computer to act  as a server that accepts incoming connections.

### 7:48 - 8:28

So let's put this all together and do another  example.  So let's go ahead and have our computer connect to a couple of websites such as  yahoo.com and example.com.  And then we'll also connect to a separate FTP server.  So now if  we do the same netstat -n command again we'll examine the output.  And here we see the  local IP address of our computer along with the dynamic or private client-side port numbers  that's being used for that particular session And then we see the two IP addresses of the  websites that our computer is connected to along with the port number because  port 80 is used for websites.

### 8:28 - 8:57

And we also see the one FTP site that we  are connected to using port number 21. Now just to clear things up, if you use this  netstat command a lot of times you may see port 443 instead of port 80 during a connection to  a website.  And this is because both of these port numbers are used for web pages.  But the difference  is, is that port 80 uses HTTP which are for regular

### 8:57 - 9:06

unsecured websites.  But port 443 uses HTTPS and  the 'S' stands for secure.  It's for viewing web pages

### 9:06 - 9:16

that have a security feature.  And a lot of websites  are now using port 443 instead of port 80.

### 9:16 - 9:52

Hey guys I just want to mention that if you want  to increase your knowledge in the networking field or in life in general, I have some audio  books that I recommend in the description below. And you can get them by signing up for a free  30-day trial of Amazon Audible Premium Plus. But even if you cancel your audible membership at  any time during the 30 days, an audio book of your choice is yours to keep forever without  paying anything.  I typically listen to an audio book if I just want to learn something as I'm  relaxing.  It's a great way to soak up knowledge.

### 9:52 - 10:03

And also if you want to know more about the  netstat utility I did a whole video about it and you can find it on my channel.  And I want to  thank everyone for watching this video on ports. Please subscribe, leave a comment,  and I will see you in the next video.

