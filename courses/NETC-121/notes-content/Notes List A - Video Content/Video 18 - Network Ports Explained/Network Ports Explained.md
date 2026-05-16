# Video 18 - [Network Ports Explained](https://www.youtube.com/watch?v=g2fT-g9PX9o)

## What Is a Port?

A port is not a physical connection. It is a logical connection used by programs and services to exchange information.

Ports identify which program or service on a computer or server should handle incoming or outgoing network traffic. Examples include:

| Service | Common Port |
|---|---:|
| HTTP | 80 |
| HTTPS | 443 |
| FTP | 21 |
| Email (SMTP) | 25 |

Port numbers range from `0` to `65535`.

## IP Addresses vs. Ports

An IP address identifies a computer or device on a network. A port number identifies the specific service or program being used on that device.

Together, they work as a pair:

- The IP address identifies the destination device.
- The port number identifies the destination service on that device.

In simple terms:

- The IP address gets the traffic to the correct server.
- The port tells that server what service should handle the request.

## Common Port Example

When you open a website like `google.com`, your computer does a few things behind the scenes:

1. It converts the domain name into an IP address.
2. It adds the correct port number for the service being used.
3. The server receives the request and passes it to the correct service.

For standard web traffic:

- `Port 80` is used for `HTTP`
- `Port 443` is used for `HTTPS`

For example:

- A web browser request to a website typically uses port `80` or `443`.
- An FTP request uses port `21`.

## Netstat

`netstat` stands for `network statistics`. It is a command-line utility used to display current network connections and port activity on a computer.

Example command on Windows:

```bash
netstat -n
```

What this shows:

- your local IP address
- the temporary client-side port your computer chose
- the remote IP address
- the remote port being used

The local address shows your computer and its temporary session port. The foreign address shows the remote server and the destination port, such as port `80` for HTTP or port `21` for FTP.

## Port Number Ranges

Port numbers are assigned by the Internet Assigned Numbers Authority, or `IANA`.

They are divided into three groups:

| Range | Category | Typical Use |
|---|---|---|
| `0-1023` | Well-known or system ports | Common server services |
| `1024-49151` | Registered ports | Vendor and application services |
| `49152-65535` | Dynamic or private ports | Temporary client-side session ports |

## Client Ports vs. Server Ports

The first two ranges are usually associated with servers because they identify services that clients connect to.

The dynamic/private range is normally used by clients. Your computer temporarily assigns itself one of these ports when it starts a session.

That means:

- The server usually listens on a known port like `80`, `443`, or `21`.
- The client usually uses a temporary high-numbered port for that individual connection.

## When a PC Can Act Like a Server

Sometimes your computer may show well-known ports such as `21` or `80` in a listening state.

That can happen if your computer is running a service such as:

- an FTP server
- a website

In that case, your computer is acting as a server and accepting incoming connections.

## Final Example

If a computer connects to multiple websites and an FTP server at the same time, `netstat -n` may show:

- different temporary local ports for each session
- remote web servers using port `80` or `443`
- a remote FTP server using port `21`

This is normal because each connection is tracked separately by its IP-and-port combination.

## HTTP vs. HTTPS

Both `80` and `443` are used for websites, but they are not the same:

| Port | Protocol | Meaning |
|---|---|---|
| `80` | HTTP | Standard, unsecured web traffic |
| `443` | HTTPS | Secure web traffic |

The `S` in `HTTPS` means `secure`.

## Key Takeaways

- A port is a logical identifier, not a physical connector.
- IP addresses identify devices.
- Port numbers identify services on those devices.
- Clients usually use temporary dynamic ports.
- Servers usually listen on well-known or registered ports.
- `netstat` helps reveal active connections and the ports they use.
