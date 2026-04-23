# Week 7 - Video 15: SolarWinds TFTP Server

Another free tool is the **SolarWinds TFTP Server**.

Download links can be provided with the video so users can install the applications if needed.

## Basic Backup Workflow Demo

1. Confirm connectivity from router to PC/TFTP server (for example with `ping`).
2. On the router, run a copy command to send the running configuration to the TFTP server.
3. Choose the TFTP server IP and destination filename (example: `R2.cfg`).
4. Verify in SolarWinds TFTP Server that the file upload was received.

Example concept:

- Copy running config from Router 2 to TFTP server
- Destination filename: `R2.cfg`
- Open saved file with Notepad++ to inspect router configuration

Same process can be repeated for Router 1:

- Copy running config to TFTP server
- Destination filename: `R1.cfg`
- Open and review interfaces, NAT settings, and ACL entries

## Key Point

SolarWinds TFTP Server is a free tool that makes it easy to back up Cisco router configs from lab environments (like GNS3) or real networks.

Along with tools like SolarWinds Response Time Viewer for Wireshark, it is useful for testing and troubleshooting network traffic and device configuration backups.
