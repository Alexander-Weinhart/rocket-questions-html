1. 
Example: "### STP port states

| State | What It Does |
|---|---|
**| Blocking | Receives BPDUs, does not forward user traffic |
**| Listening | Prepares for forwarding, no MAC learning yet |
**| Learning | Learns MAC addresses, still not forwarding user traffic |
*| Forwarding | Sends and receives normal traffic |
*| Disabled | Administratively down or inactive |

## 20. Distance Vector vs. Link State

| Feature | Distance Vector | Link State |
|---|---|---|
**| What routers share | Route information with neighbors | Link-state information to build a topology map |
**| Network view | Less complete | More complete |
***| Example | RIP, IGRP | OSPF |
**| Convergence | Usually slower | Usually faster |"

This week is week 14. For every line you see fit in the content markdowns for this week, as shown in the syllabus, place an asterisk at the beginning of each line for each concept that is taught. Do this for the content of the week in the syllabus. Only have an asterisk for each thing that can possibly feature a practice question, where number of asterisks indicates number of practice quiz questions possible. Don't minimize questions marked because of how long the user will take to complete the practice quiz.

2.
create questions going over what you marked with asterisks, one question per asterisk. Exam weeks have dedicated "STUDY GUIDE #" markdowns, only focus on that if it is exam week. Use easy, being easy concepts from this week, medium, for hard concepts in this week, and hard for similar content found on the CCNA and Network+ certifications that are not in the scope of the class. Assume the student didn't go over any of the class content, so be exhaustive in coverage, but do not reference content, do not repeat specific concepts that already exist in this week, and do not refer to examples. do an equal amount of easy, medium, and hard. Do 10 at a time, don't stop working until all 150 are done, don't do it in one pass. by that I mean 15 edits of 10, but don't ask me if you should continue, just continue.


3.
find redundant questions in the question bank. Only use the scope of that, there can be redundancies between weeks. Turn this into a delete/keep recommendation list with the exact questions you’d remove from each week. Show all questions in the list. show only the reword questions in this prompt answer, not a file. Allow me to reccommend an action, execute that action and move on to the next step.

4. 
isolate Questions that rely on content memorization. By content memorization, a question will ask "What page in Chapter 1 says this..." or "In example 2, what subnet is PC0 on?" reword all of these so they don't refer back to content. Do this by restating the content. Comb the questions list and sort each question based on recommended action to reword or leave the question alone. Show all questions in the list. show only the reword questions in this prompt answer, not a file. what would the improved questions look like and what would be the reason for changing each one? Allow me to tell you what actions to do, and complete that before moving onto the next step.

5. 
Optimize any vague question for human clarity. use more nouns instead of pronouns, assume that before the question is read, the human has no idea what the question will refer to. Comb the questions list and sort each question based on recommended action to reword or leave the question alone. Show all questions in the list. show only the reword questions in this prompt answer, not a file. what would the improved questions look like and what would be the reason for changing each one? Allow me to tell you what actions to do, and complete that before moving onto the next step.

6. 
When editing the question bank now, correct these specific misconceptions and do not repeat them. Comb the questions list and sort each question based on recommended action to reword or leave the question alone. Show all questions in the list. show only the reword questions in this prompt answer, not a file. what would the improved questions look like and what would be the reason for changing each one? Use 4a-4f as a reference. Allow me to tell you what actions to do, and complete that.

    General rule:
    - Preserve technical accuracy over simple wording.
    - If a distractor could become correct under a realistic alternate scenario, rewrite the scenario or the distractor so only one answer is clearly correct.
    - Do not leave questions dependent on unstated assumptions.

    Specific correction rules:

    NAT tracking question (`question_id` 998)
    Problem:
    - The old wording allowed a distractor about ARP or same-subnet behavior to seem correct in a homelab or local-server scenario.
    Required fix:
    - Rewrite the question so it explicitly asks about NAT’s role in returning internet reply traffic to the correct internal host.
    - Make the correct answer about NAT tracking session/state mappings between internal and translated addresses and ports.
    - Remove or rewrite any distractor that could be true in a same-subnet or non-NAT local-server scenario.
    - Do not imply NAT depends on ARP for identifying the correct internal host across internet return traffic.

    Classic STP forward delay question (`question_id` 1267)
    Problem:
    - The old framing confused the STP forward-delay timer value with the total time spent across multiple states.
    Required fix:
    - Reframe the question so it asks specifically for the classic STP forward-delay timer value.
    - Treat the correct forward-delay timer as 15 seconds.
    - Do not present 30 seconds as the forward-delay timer.
    - If mentioning 30 seconds at all, make clear that 30 seconds refers to the combined time spent in listening plus learning, not the value of the forward-delay timer itself.

    Router-on-a-stick subinterface question (`question_id` 1399)
    Problem:
   - The old wording risked implying the whole physical interface represents one VLAN gateway.
    Required fix:
    - Reword carefully so the question refers to each router subinterface, not the entire physical trunk interface.
    - Make clear that the physical router interface can carry multiple VLANs over a trunk.
    - Make clear that each subinterface is typically associated with one VLAN and often serves as that VLAN’s Layer 3 gateway.
    - Avoid wording that teaches that the entire router-on-a-stick interface equals one VLAN gateway.

    Remote-subnet first-step question (`question_id` 1402)
    Problem:
    - A distractor about “a new subnet mask” created ambiguity because changing the subnet mask could alter whether the destination is remote.
    Required fix:
    - Keep the scenario fixed so the destination is clearly on a remote subnet under the stated addressing.
    - Make the correct answer about needing the default gateway MAC on the local link.
    - Remove or replace any distractor that changes the premises of the problem, especially any distractor involving a different subnet mask.
    - Distractors should be wrong within the stated scenario, not wrong only because the reader is expected to ignore alternate assumptions.

    Output rule:
    - For each edited question, return the full revised question, answer choices, correct answer, and explanation.
    - Ensure exactly one answer is unambiguously correct.

7. remove any asterisk you placed at the beginning of each line for each concept that is taught for this week's content.