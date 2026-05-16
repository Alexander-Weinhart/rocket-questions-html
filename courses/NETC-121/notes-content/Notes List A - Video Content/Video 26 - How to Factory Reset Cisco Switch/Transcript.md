# Video 26 - How to Factory Reset Cisco Switch

## Transcript

### 0:02 - 0:25

hello in this video i'm going to show you how to factory reset a cisco switch um so i've got so i've got a switch it's got you know a basic configuration on it's got some vlans my p address is configured and i want to completely wipe it um i want to redeploy this switch to another you know just give an example i've got a switch here that's in production

### 0:25 - 0:44

i want to wipe it and redeploy it for some other use so i want to start completely fresh so let me show you a picture so what you'll need to do you'll need to have console access to the switch so this the switch will have a console port sometimes they're on the front sometimes on the back

### 0:44 - 1:13

it just depends on the switch and these steps will work for a route or two so you need physical access and you have console access into the end of the switch i'm using putty to to gain console access so once you have console access you need to power off the switch and then what you're going to do is

### 1:13 - 1:36

find the mode button and this is typically on the front of the switch on the left very left side and you know the buttons will look a little different sometimes they're kind of they're really small on like 48 port switches and different models but it should be located on the front left so you're going to power off the switch you're going to hold this mode

### 1:36 - 2:08

button down and turn the switch on and you're going to wait for the switch to say the password recovery mechanism is enabled once you see that release it and that will interrupt the boot process which will allow us allow you to access some commands to factory reset it so let me walk through that with my switch here and i'm using a 2960 cx switch and again i've done these steps on various models of switches and

### 2:08 - 2:36

the steps are the same okay you can see that my switch is booting up i've got the mode button down and this this time will vary um some switches it could be just a few seconds like mine it takes about a minute because it goes through and checks memory and does all kinds of stuff here um it just it just varies on each model

### 2:36 - 3:03

but just hold that button down until you see the password recovery mechanism is enabled release it okay there it's popped up password recover mechanism our release mode button and you'll see that interrupted the boot process so now we can type in the command flash underscore

### 3:03 - 3:35

init and this could take 30 seconds or longer to initialize the flash okay flash is done initializing so now type in dir flash colon and you don't have to do this step but i just wanted to show you the files on the flash so the files that you're going to be

### 3:35 - 4:02

deleting is config.txt and vdot vlan.dat so deleting these two files and rebooting is going to factory reset the switch those are the only two files you need to delete um don't delete these files i mean those these are your operating system of the switch so definitely don't delete those so delete these files

### 4:02 - 4:26

just do del space flash colon and then the file name so we'll do config.txt hit enter yes to confirm now we will do the vlan.dat file

### 4:26 - 4:53

that is to confirm those files are deleted we do flash dr again you'll see those files were gone so now all you need to do is type boot and this will reboot the switch and it's going to have no configuration so you're going to get the um that the system configuration dialog

### 4:53 - 5:23

this process will take a little bit so i'll pause this and you'll see when it comes up that it's completely wiped and it starts it starts up with the initial configuration dialogue okay the switch is is done booting up and you can see it's going to enter the initial configuration dialog i'm not a big fan of using that i like to do

### 5:23 - 6:00

everything manually but just to show you that the switch is completely wiped and you can see no configuration on the switch now what do i show vlan brief it's just going to have the default vlans all those vlans i had on there before are now gone and default being maybe then one is just on there so those are the steps pretty pretty simple to do um the timing just

### 6:00 - 6:28

is a little different on various models of switches but um this is something you'll probably do often as you reconfigure switches or by use switches um even may have to do this if you forget the password you'll have to console in the switch and completely wipe it and start over but that's it for this video for more tutorials and tips on cisco check out my

### 6:28 - 6:28

website netlinco.com thanks for watching

