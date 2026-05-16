# Video 13 - Ethernet Frame Format Explanation

## Transcript

### 0:01 - 0:40

Every technology used on a network breaks the data transmitted between computers into smaller pieces of data called frames. The network interface card (NICs) on a network computer system function at Layer 2 of the OSI Model (the Data Link Layer). And they function on this layer to encapsulate that data from the higher levels of the OSI Model into frames to allow transmission or communication on the Physical Layer (the network cables, the radio waves if you're dealing with wireless, etc. - all the network media being used). When frames are used, the process of retransmitting lost data is much more efficient.

### 0:40 - 1:21

Data can get lost, corrupted, interrupted, etc., etc. Numerous things can happen to the data on a network to prevent it from ever reaching its destination intact, or without error. When an error does occur, during the transmission of that data the system that's doing the sending has to retransmit the frames that failed to get to the receiving system correctly. If a Word document or photo or webpage is transmitted as a single large frame, and something happens to cause an error, that sending system will have to retransmit the entire frame again (or the entire document or the entire photo, the entire webpage, etc.).

### 1:21 - 2:03

So by breaking up that larger piece into smaller pieces, or frames, you allow the computer system sending the frames to retransmit only the damaged frames, if something happens to them. Every networking technology uses frames and ethernet is the most predominantly used type of frame sending system. An ethernet frame contains basically 5 pieces of information: The MAC Address of the frame's recipient, the MAC Address of the sending system, the type of data encapsulated inside that frame, then you have the actual data itself, then you have the frame check sequence. So let's just go over those shortly.

### 2:03 - 2:44

An ethernet frame always begins with a preamble. Now this is a 64-bit series of 1s and 0s that always end with 11. When this is sent at the beginning of a frame over a network, the NIC of the receiving device reads the preamble and realizes that a frame is coming immediately after. This preamble ending in 11 also tells that receiving NIC exactly where the frame starts. The frame including the data that's in that frame has to be a minimum of 46 bytes with 18 bytes of the frame header and trailer. The preamble isn't considered part of the actual frame. It's just to kinda give a heads up.

### 2:44 - 3:21

The 2nd and 3rd fields of the frame actually map out the destination and the sending NICs with their respective MAC addresses. You have the Destination MAC Address first, then you have the Source MAC Address respectively in that order. When you get into Switching and Layer 2 devices, this is where those switches and Layer 2 devices learn the MAC address of the sending device from that frame, from the Source MAC Address. And thereby they learn what's connected on that interface, and so more on that in other videos. But I just wanted to kind of give you a heads up on that. The next field is the Type Field of the ethernet frame.

### 3:21 - 3:54

Now this field gives the receiving computer a very basic idea of what the frame contains (whether it's IP Version 4 or IP Version 6, etc.). Now this confuses some when they're studying for or learning about networking, as this field (this Type Field) does not tell you if the frame carries what is referred to a higher layer level data like a Word document or an email or webpage, etc. It doesn't really tell it that. Once you get into the data section of the frame, that determination can be made as to what type of document or what type of data you're dealing with (higher level data).

### 3:54 - 4:37

Rather this Type Field is only a basic kind of a heads up on what the frame contains for the receiving computer NIC. Then you actually get into the Data Field of the frame. This is the field that actually contains the payload. The information being sent across the network. It can be an IP Packet, an ARP (or Address Resolution Protocol, etc.). Now regardless of what type of data this field contains, the payload must have at least 46 bytes. If it somehow is smaller than 46 bytes, the NIC from the sending device will automatically add extra 0s (called padding) to the end to make sure this payload is at least 46 bytes.

### 4:37 - 5:17

Lastly, in the entire frame you have the Frame Check Sequence Field (or the FCS). This field helps the nodes on a network to know when originally good data has had something happen to it along the way. It got corrupted, it got interrupted, it got broken up, whatever the case may be. Ethernet uses an algorithm called Cyclic Redundancy Check (CRC) to determine if the data in the frame is good or no. This is important because devices on a network have to be able to know when data is damaged or corrupted during transit. To detect errors, computers using an ethernet network attach this FCS Field code to a frame

### 5:17 - 5:54

by doing the following: The sending machine (when it's first creating the ethernet frame) runs the data through a mathematical formula called the CRC algorithm. And it attaches that result to the end of the frame in this last FCS Field. Now this is referred to as the Trailer when we're dealing with frames. When the receiving machine gets the frame, it performs the same exact calculation using the same algorithm and it compares its answer to the answer that's on the Trailer or that's added to the Trailer Field (the FCS Field). If they match the receiving (or Destination Machine) knows that that frame is good.

### 5:54 - 6:25

It hasn't been corrupted or damaged along the way and it goes ahead and opens that frame to fully receive it. If however, the answers don't match, the machine receiving just kind of "drops" that frame. That's what we call it in networking - It just "drops" that frame and allows the higher level layers or protocols (like TCP) to handle the retransmission of that frame if it's needed. And that's essentially how an ethernet frame is built, used, and understood on a computer network. If you'd like to get in on the free subnetting mini-course that will teach you how to learn

### 6:25 - 6:37

and use subnetting with ease for a Network+ Exam level, sign up for the free course while enrollment is open NOW using the link below in the description or by going to acenetworker.com/subnetting and I'll see you there!

