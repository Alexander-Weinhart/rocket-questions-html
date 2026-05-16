# Video 25 - Telnet vs SSH Explained

## Transcript

### 0:00 - 0:08

What is telnet? So that is a topic of this video.  Now telnet is a terminal emulation program that

### 0:08 - 0:48

is used to access remote servers. It's a simple  command-line tool that runs on your computer and it'll allow you to send commands remotely to a  server and administer that server just as if you were sitting in front of it. So when you connect  remotely to a server using telnet, you would just use commands with a keyboard to tell that server  what to do. So you can use those commands to run programs, create folders, delete files, create  files, transfer files, browse directories, start or stop services, and so on. So pretty much  you can do everything even if you're a thousand

### 0:48 - 1:29

miles away from that server. And in addition to  communicating with servers, telnet is also used to manage and configure other network devices such  as routers and switches. And you can also use it to check if ports are open or closed on a server.  Now telnet can be used with operating systems such as Windows and MacOS, but it's largely used on  Linux and UNIX systems. So as I stated before, telnet is a command-line tool. There is no  graphical user interface. it's just a very simple, text oriented utility that will run on a computer.  In fact you don't even have to have a computer

### 1:29 - 1:44

to run telnet. You can just use a simple dumb  terminal and all the commands are sent by using a keyboard. And because it only sends commands  and not graphics, telnet is very fast. Now telnet

### 1:44 - 2:23

stands for teletype network and it was developed  back in 1969. And because it was developed prior to the internet, security was not really an issue.  So with telnet, all the commands are sent in clear text, so there is no encryption. So if you  were to use telnet today to communicate with a server over the internet, someone could easily  eavesdrop and grab any sensitive data that you're sending to that server, such as usernames and  passwords. So because of the lack of encryption, telnet is outdated and it should not be used over  the public internet. But some people still use

### 2:23 - 2:44

it today but largely in a local area network  and not over the internet. But also they may have to use it if they are working with older  equipment that can't support modern protocols such as SSH. Now SSH or secure shell, is a better  alternative to telnet. Secure shell protects the

### 2:44 - 3:23

data from being attacked or stolen as it's being  transferred over a network. So as I stated before, if you are sending sensitive data like a login  or password, a hacker could be listening and steal the data. And that is the reason for secure  shell. Secure shell encrypts the data during the transfer and protects it from potential threats.  And in addition to encryption it also provides password and public key authentication. So secure  shell does everything that telnet does but it's a secure protocol and that's what people use today  instead of telnet. Now if you want to see some

### 3:23 - 3:59

interesting examples of telnet, you can do this  on your computer. And in my example we're going to do this on a Windows machine. Now first  you have to enable the telnet client in the Windows operating systems. So you first go into  'programs and features' and then you would click on 'turn Windows Features on or off' and from here  you have to enable the telnet client feature. And then you would just open up a command prompt  as an administrator, and then you can start some telnet commands.  So for example if you want to  see a Star Wars movie in a full ASCII version,

### 3:59 - 4:15

at a command prompt you just type telnet  towel.blinkinglights.NL and then you press ENTER.  And it'll show you an ASCII version  of a Star Wars movie which is really interesting.

### 4:15 - 4:49

Or you can also play a game of chess using town  telnet.  So you would just type telnet freechess.org and then the port number which is 5,000 and  then you can play a telnet version of chess.  Or if you want to know the weather forecast for a  specific city, you can do that also.  So you can just type telnet rainmaker.wunderground.com  and then press ENTER and then just enter a city code and it'll give you the weather for  that city.  So thank you everyone for watching this video on telnet and SSH, please subscribe,  follow me on twitter, and thank you for watching.

