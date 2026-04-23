# Video 10 - Telnet and SSH (Transcript)

What is Telnet? Telnet is a terminal emulation program used to access remote servers. It is a simple command-line tool that runs on your computer and allows you to send commands remotely to a server and administer that server as if you were sitting in front of it.

When you connect remotely to a server using Telnet, you use keyboard commands to tell the server what to do. You can run programs, create folders, delete files, create files, transfer files, browse directories, and start or stop services. You can do this even if you are far away from the server.

In addition to servers, Telnet is used to manage and configure network devices such as routers and switches. It can also be used to test whether ports are open or closed on a server.

Telnet can be used on Windows and macOS, but it has been widely used on Linux and UNIX systems. Telnet is command-line only and has no graphical user interface. It is text-based and can even be used from a basic terminal. Because it sends text commands and not graphics, it is very fast.

Telnet stands for teletype network and was developed in 1969. Since it was created before the modern internet, security was not a design priority. Telnet sends all data in clear text, with no encryption. That means usernames, passwords, and commands can be intercepted by someone eavesdropping on the network.

Because of this, Telnet is outdated and should not be used over the public internet. Some people still use it on local area networks or with older equipment that does not support modern protocols like SSH.

SSH (Secure Shell) is the modern alternative. SSH encrypts data in transit and helps protect credentials and commands from interception. SSH also supports password authentication and public key authentication. SSH provides the same remote administration capabilities as Telnet, but securely.

Windows example setup:

1. Open Programs and Features.
2. Click Turn Windows features on or off.
3. Enable Telnet Client.
4. Open Command Prompt as Administrator.
5. Run Telnet commands.

Example Telnet commands shown in the video:

- `telnet towel.blinkenlights.nl` (ASCII Star Wars demo)
- `telnet freechess.org 5000` (Telnet chess)
- `telnet rainmaker.wunderground.com` (weather service)
