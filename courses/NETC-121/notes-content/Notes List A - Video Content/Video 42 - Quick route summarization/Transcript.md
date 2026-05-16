# Video 42 - Quick route summarization

## Transcript

### 0:02 - 0:30

hi let's do a quick review of Route summarization also known as route aggregation now the reason why we summarize routes is so that there's less routes in the routing table so let's say I've got these three IP addresses here that I want to summarize in order to do the summarization we have to rewrite the IP addresses out in binary however the only aspects we really need to look at is this last octed in this example because those are the only numbers that

### 0:30 - 1:03

are different so I'm going to take the first three octets and leave them as is and then I'm just going to convert the last one so to convert four into binary we get one two three four five six seven eight oop sorry six seven eight that's four so then five in binary there's five

### 1:03 - 1:36

and there's six so we're going to analyze this last octet now the only thing we care about is where these IP addresses become different so all the way up to here they're identical to one another so let's draw a line where they become different notice the first three octets are identical now in the last octet they're all prefixed with a bunch of zeros and a one and then at this point point is where they change so we just need to rewrite our IP address

### 1:36 - 2:09

taking everything from the line to the left and keeping it exactly the same and everything from this line to the right they're going to become zeros so we end up with 10.0.0 and I'm going to keep this in binary for now so that's this right it stays the same and then everything to the right of the line just becomes Z Z so we when we convert that into decimal this becomes four so our IP

### 2:09 - 2:42

address of our summary route is 10.0.0 do4 now we also need to determine the subnet mask so everywhere in the IP address where the bits are the same we want to be ones in the subnet mask where they become different we're going to make those zeros so our subnet mask would become if the first octed is all ones we get 255 the next octed is all ones the next octed is all ones and then the last octet is what changes so we get

### 2:42 - 3:04

all ones here and then a zero and a zero so we end up with 1 2 3 4 five six 78 which translates to 252 so our subnet mask is 255 255 25 55252 with our IP address of 10 0004 to summarize these three Rs

