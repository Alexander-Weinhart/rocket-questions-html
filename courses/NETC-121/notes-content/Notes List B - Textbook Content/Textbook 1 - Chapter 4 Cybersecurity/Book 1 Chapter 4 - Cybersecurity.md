# Book 1 Chapter 4 - Cybersecurity

## Chapter Focus
- Assessing the risk for security
- Looking at the two pillars of cybersecurity
- Identifying the most important protection and recovery measures
- Examining standardized cybersecurity frameworks
- Looking more closely at the NIST Cybersecurity Framework

## Main Idea of the Chapter
- Cybersecurity is one of the most important responsibilities in IT.
- You can never guarantee that attacks or disasters will never happen.
- Proper security reduces the likelihood of successful attacks and helps limit the damage when something does go wrong.
- Cybersecurity and networking go hand in hand.
- Security should be considered from the very beginning of network design and remain part of implementation and ongoing operations.
- Security affects the entire environment, not just firewalls and switches.
- It also affects servers, end-user computers, user accounts, data storage, software, and services.

## Security Scenarios the Chapter Uses
- Ransomware can encrypt every file on the network and make data unusable until it is recovered or a ransom is paid.
- A security breach can expose sensitive customer data such as credit card information and create public embarrassment.
- A disgruntled employee can copy company contacts or intellectual property to a flash drive and take it to a competitor.

## Why Small Businesses Still Need Cybersecurity
- Small organizations sometimes assume security matters only to large enterprises.
- A friendly office culture does not remove risk.
- Even if people trust each other, networks still need built-in security.

### Reasons Every Network Needs Security

#### Confidentiality
- Some information must remain confidential even in a friendly office.
- Confidential data should be stored only where authorized users can access it.

#### Curiosity
- Not every breach is malicious.
- A user may open a file simply because the file name looks unfamiliar.
- Curiosity can expose personnel records, office gossip, or other private information.

#### Changing Trust
- Someone who is trustworthy now may become disgruntled later.
- Insider threats can include deleting files, stealing data, or abusing privileges.

#### Temptation
- Easy access to payroll or financial records can tempt users to commit fraud or theft.

#### Hidden Value of Data
- Organizations often underestimate the value of their data.
- Personnel files may include names, addresses, phone numbers, and Social Security numbers.
- Customer files may include credit card information.

#### Malice
- Attackers may not care about stealing data.
- They may want to plant a Trojan horse or similar malicious program on a server.
- They may then use that server to send spam or support other attacks.
- The abuse may be traced back to the victim organization instead of the attacker.

#### Human Error
- Some users do not understand enough about systems and networks to be trusted with unrestricted access.
- A careless mistake can wipe out files or expose data.
- Security controls help protect the network from accidents as well as intentional abuse.

## The Two Pillars of Cybersecurity
- The chapter says a cybersecurity plan has two basic elements:
- Prevention
- Recovery

### Prevention
- Prevention includes the tools, technology, and controls used to stop attackers from getting in or causing damage.
- Examples named in the chapter include:
- Firewalls
- Antivirus software
- Patch management tools
- Anti-spam software

### Recovery
- Recovery is necessary because prevention is not always successful.
- Cyberattacks are considered inevitable.
- Organizations need technology and plans that let them recover quickly after an incident.
- Examples named in the chapter include:
- Backup copies of data
- Recovery plans for restoring operations

## Prevention
- A comprehensive cybersecurity plan includes many preventive measures.

### Start with Asset Management
- Prevention should begin with a complete understanding of the IT environment.
- You need to understand:
- The assets in the environment
- The threats facing those assets
- The vulnerabilities attackers could exploit
- The foundation for this understanding is an asset management system.
- Asset management means tracking absolutely everything connected to the network.

### Asset Management Inventory Categories

#### Hardware Inventory
- Desktop computers
- Mobile devices
- Servers
- Switches
- Wi-Fi access points
- Routers
- Printers
- Every other piece of connected hardware

#### Software and Service Inventory
- Operating systems
- Web browsers
- Microsoft Office applications
- Other organizational software
- Cloud service providers such as Microsoft 365
- Online meeting platforms
- Cloud storage providers
- Software or firmware running on routers, switches, printers, and similar devices

#### People and Accounts Inventory
- All people connected to the network
- Active Directory accounts or similar identity records
- Job roles
- Required permissions
- Devices used by each person

### Why Asset Management Matters
- You cannot protect assets you do not know about.
- Asset visibility supports prevention, auditing, response, and recovery.
- Good inventories help organizations make better risk decisions.

## Preventive Measures Listed in the Chapter
- The chapter says the list is not complete, but it is a strong starting point.

### Firewalls
- The internet connection must be protected by a firewall.
- The firewall should be configured to keep dangerous traffic out of the network.

### Wi-Fi Security
- All wireless access should be encrypted.
- Wireless access should also be protected by password access.

### Antivirus Software
- Every computer on the network should have active antivirus software.
- This includes:
- Workstations
- Laptops
- Tablets
- Servers
- A single unprotected computer can expose the entire environment.

### Anti-Spam Software
- Most cyberattacks come through email.
- Anti-spam protection should block email containing malicious code or suspicious links.

### Strong Passwords
- All accounts with access to systems should use strong passwords.

### Multifactor Authentication
- The most critical access, especially administrative access, should use multifactor authentication.
- MFA requires additional verification beyond just a username and password.

### Data Protection
- Shared data should be protected with role-based security.
- Only users with a demonstrated need should be allowed access.
- This is enforced through:
- File permissions
- Folder permissions
- Share permissions

### Encryption
- Encryption encodes data so that only parties with the secret encryption key can read it.
- The chapter treats encryption as one of the most important parts of data security.

#### Data-in-Flight Encryption
- This protects data while it is moving from one computer or device to another.
- Wireless network encryption is a common example.

#### Data-at-Rest Encryption
- This protects data stored on disk drives or other storage media.
- It is especially important if drives or whole computers are physically stolen.

### User Life-Cycle Management
- User accounts should be controlled by a documented life-cycle management policy.
- When a user leaves the organization, that user’s access should be terminated.

### Auditing
- The entire security environment should be audited regularly.
- Auditing includes:
- Reviewing user accounts
- Reviewing file permissions
- Reviewing firewall operation
- Reviewing antivirus operation
- Reviewing anti-spam operation
- Reviewing event logs
- Auditing confirms that controls are working and still fit the environment.

### User Training
- Users are the weakest points in many networks.
- Regular security training is an essential preventive measure.

### Physical Security
- Physical security is often overlooked.
- If an attacker gains physical access to a computer, many other protections become much easier to bypass.
- The chapter specifically emphasizes:
- Keeping the server room locked
- Making sure users lock their computers when they step away

## Recovery
- Recovery is necessary no matter how good prevention is.
- The chapter gives several reasons incidents still happen:
- A user clicks a phishing link
- A security patch is neglected
- An intruder exploits a weakness
- A password is compromised

### Recovery Also Covers Non-Malicious Disasters
- Recovery planning is not limited to cyberattacks.
- It should also address events such as:
- Hardware failure
- Loss of data on a key file server
- Fire in the server room

### The Most Important Recovery Principle
- The chapter explicitly says the most important aspect of recovery is to plan for it in advance.
- Do not wait until after a cyberattack succeeds to start figuring out recovery.
- Assume that a cyberattack will eventually happen and plan ahead.

## Backup Planning
- The basis of any recovery plan is a good backup plan.
- Backup planning is an integral part of planning any network.

### Backup Requirements from the Chapter

#### Comprehensive
- Identify every critical server and data store.
- Make sure all of them are backed up regularly.

#### Up-to-Date
- If backups are old, recovery rolls the organization back too far.
- A three-week-old backup can cost three weeks of work.

#### Redundant
- Keep multiple backup copies that represent different recovery points.
- The chapter recommends at least three generations of backups.
- If the newest backup fails, an older one may still work.
- If files were corrupted by an attack before the attack was discovered, a newer backup may already contain damaged data.

#### Kept Off-Site
- If backups are stored next to the servers and a fire destroys the server room, the backups may be lost too.

#### Offline
- Off-site storage alone is not enough.
- Backups should also be offline.
- Cloud backups can still be vulnerable if an attacker gains enough access to delete them.

#### Automated
- Do not rely on memory or manual routines.
- Backup jobs should run automatically.

#### Monitored
- Do not assume backups worked this week just because they worked last week.
- Backup processes must be checked regularly.

#### Tested
- Backups must be tested before a real emergency happens.
- Testing should include:
- Restoring individual files
- Restoring entire servers

## Other Recovery Elements from the Chapter

### Spare Computers
- Keep spare systems available so a user can return to work quickly after a compromised workstation is replaced.

### Emergency Disk Capacity
- Recovery operations often require spare storage space for moving and restoring data.
- Inexpensive NAS can help, but it may be very slow for multi-terabyte recoveries.

### Communications
- Communication during recovery is critical.
- Users need updates on what happened, what is being done, and how long recovery may take.
- Normal communication systems such as email may be unavailable during an incident.
- Organizations should plan alternate communication tools in advance.
- The chapter gives examples such as Microsoft Teams and Slack.

## Cybersecurity Frameworks
- The chapter emphasizes that cybersecurity is much bigger than a basic checklist.
- Installing a firewall, running antivirus software, and backing up data are necessary, but not enough by themselves.
- Security should be baked into IT systems from the ground up.

### Where Security Must Be Built In
- Servers
- Storage platforms
- Desktop computers
- Network infrastructure
- Switches
- Routers
- Firewalls
- Cables
- Wireless networks
- Mobile devices
- Operating systems
- Software
- Any other part of the IT environment

### Why Frameworks Matter
- Standardized frameworks help organizations plan and implement cybersecurity in a structured way.
- Different frameworks are similar in many respects, but each has differences.

### Five Frameworks Named in the Chapter

#### NIST
- Probably the most commonly used framework in the United States.
- Governed by the National Institute of Standards and Technology.

#### ISO/IEC 27001
- Described as the most popular international cybersecurity framework.

#### ISA/IEC 62443
- A series of standards sponsored by the International Society of Automation.
- Designed as a flexible framework for managing security.

#### CIS Critical Security Controls
- A set of 18 cybersecurity controls from the Center for Internet Security.

#### COBIT
- COBIT stands for Control Objectives for Information and Related Technologies.
- Sponsored by ISACA.
- Described as one of the more popular cybersecurity frameworks.

## The NIST Cybersecurity Framework

### Basic Background
- NIST first issued its cybersecurity framework in 2014.
- Its official name is `Framework for Improving Critical Infrastructure Cybersecurity`.
- It is commonly called the `NIST Cybersecurity Framework`.
- The chapter says it will simply call it `the framework`.

### Original Purpose and Wider Use
- The framework was originally intended for critical infrastructure such as:
- The power grid
- Transportation systems
- Dams
- Government agencies
- It quickly became popular in the private sector too.
- The chapter presents it as one of the best overall tools for planning cybersecurity for large and small organizations, public and private.

### Who Can Use It
- It is useful for any organization large enough to have a dedicated IT staff, even if that staff is just one person.
- No organization is expected to implement every detail exactly as written.
- Instead, the framework supports informed, risk-based decisions about what security practices make sense.

### Version History Mentioned in the Chapter
- 2014: First version released.
- 2018: Version 1.1 released.
- Version 1.1 added self-assessment guidance.
- Version 1.1 greatly expanded coverage of cybersecurity risk in business supply chains.
- February 2024: Version 2.0 released.
- Version 2.0 added more information about governance and organizational oversight for cybersecurity.

### Size of the Documentation
- The chapter notes that the framework document is only about 32 pages long.

## Three Basic Components of the NIST Framework

### 1. Cybersecurity Framework Core
- This component identifies six basic functions of cybersecurity.
- Within these functions, the framework presents best practices, guidelines, and standards focused on specific cybersecurity outcomes.
- Examples of outcomes named in the chapter include:
- Remote access is managed
- Removable media is protected and its use restricted according to policy

### 2. Cybersecurity Framework Organizational Profiles
- Profiles show which outcomes in the Framework Core are implemented.
- A current profile documents the organization’s current cybersecurity practices.
- A target profile represents where the organization wants to be.
- Organizations can then build a plan to move from current state to target state.

### 3. Cybersecurity Framework Tiers
- The framework includes four tiers.
- These tiers represent increasing sophistication in cybersecurity practices.
- As organizations invest more in cybersecurity, they move upward through the tier levels.

## The Six Core Functions

### Govern (`GV`)
- Provides a formalized method to ensure the other five functions are planned, implemented, and monitored properly.

### Identify (`ID`)
- Helps determine exactly what parts of the organization are vulnerable to cyberattack.

### Protect (`PR`)
- Helps the organization take specific steps to protect the parts of the environment identified as vulnerable.

### Detect (`DE`)
- Involves monitoring systems and the environment so that cyberattacks are discovered as quickly as possible.

### Respond (`RS`)
- Helps the organization plan in advance how it will respond when a cybersecurity incident occurs.

### Recover (`RC`)
- Prompts the organization to develop plans and procedures to restore parts of the environment that were damaged by a cyberattack.
- This can include restoring lost data from backups.

## Framework Categories Listed in Table 4-1

### Govern (`GV`)
- Organizational Context (`GV.OC`)
- Risk Management Strategy (`GV.RM`)
- Roles, Responsibilities, and Authorities (`GV.RR`)
- Policy (`GV.PO`)
- Oversight (`GV.OV`)
- Cybersecurity Supply Chain Management (`GV.SC`)

### Identify (`ID`)
- Asset Management (`ID.AM`)
- Risk Assessment (`ID.RA`)
- Improvement (`ID.IM`)

### Protect (`PR`)
- Identity Management, Authentication, and Access Control (`PR.AA`)
- Awareness and Training (`PR.AT`)
- Data Security (`PR.DS`)
- Platform Security (`PR.PS`)
- Technology Infrastructure Resilience (`PR.IR`)

### Detect (`DE`)
- Continuous Monitoring (`DE.CM`)
- Adverse Event Analysis (`DE.AE`)

### Respond (`RS`)
- Incident Management (`RS.MA`)
- Incident Analysis (`RS.AN`)
- Incident Response Reporting and Communication (`RS.CO`)
- Incident Mitigation (`RS.MI`)

### Recover (`RC`)
- Incident Recovery Plan Execution (`RC.RP`)
- Incident Recovery Communication (`RC.CO`)

## Categories and Subcategories
- The framework has 22 categories across the six functions.
- Those categories break down into 2 to 10 subcategories each.
- The total number of subcategories is 106.

### Identifier Structure
- The framework uses a simple identifier system.
- Function identifiers use labels such as `ID` for Identify.
- Category identifiers combine the function and category, such as `ID.AM` for Asset Management.
- Subcategory identifiers add a number, such as `ID.AM-01`.

### Example Used by the Chapter
- `ID.AM-01` is the first subcategory under Asset Management.
- Its outcome is:
- Inventories of hardware managed by the organization are maintained

## What the Framework Does and Does Not Prescribe
- The framework does not prescribe a single specific solution for each subcategory.
- Instead, it states the outcome that should be achieved.
- Organizations are expected to design solutions that achieve the desired outcome in ways that fit their own size and environment.

### Asset Inventory Example from the Chapter
- A small organization may use a simple Microsoft Excel spreadsheet to track hardware.
- A larger organization may use automated discovery software and barcode inventory tags.
- Either approach can satisfy the requirement if it achieves the intended outcome.

## Informative References
- The framework provides links to other cybersecurity frameworks and related sources.
- These are called `Informative References`.
- They help organizations gain additional insight into each subcategory.

## High-Value Takeaways
1. Cybersecurity must be designed into the network from the beginning, not added later.
2. Every network, including a small business network, needs security because risk comes from outsiders, insiders, curiosity, temptation, and mistakes.
3. Cybersecurity has two pillars: prevention and recovery.
4. Prevention starts with understanding the environment through asset management.
5. Core preventive controls include firewalls, Wi-Fi security, antivirus, anti-spam, strong passwords, multifactor authentication, data protection, encryption, user life-cycle management, auditing, user training, and physical security.
6. Recovery planning must be done in advance and should be built around strong backups.
7. Good backups are comprehensive, up-to-date, redundant, off-site, offline, automated, monitored, and tested.
8. Cybersecurity frameworks help organizations move beyond a simple checklist to a structured security strategy.
9. The NIST Cybersecurity Framework organizes security around the Core, Organizational Profiles, and Tiers.
10. The NIST Core uses the six functions Govern, Identify, Protect, Detect, Respond, and Recover, along with 22 categories and 106 subcategories.
