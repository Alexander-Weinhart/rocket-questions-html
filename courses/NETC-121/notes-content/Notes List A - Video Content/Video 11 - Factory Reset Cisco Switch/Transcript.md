# Video 11 - Factory Reset Cisco Switch (Transcript)

Hello. In this video, I'm going to show you how to factory reset a Cisco switch.

I've got a switch with a basic configuration on it. It has VLANs and IP addressing configured, and I want to completely wipe it so I can redeploy it for another use. I want to start fresh.

To do this, you need console access to the switch. The console port may be on the front or back depending on the model. These steps can also work for routers. You need physical access and console access. In this demo, PuTTY is used for console access.

Once you have console access:

1. Power off the switch.
2. Locate the **Mode** button (typically front-left of the switch).
3. Hold the Mode button down and power the switch on.
4. Keep holding until you see: **"The password recovery mechanism is enabled"**.
5. Release the Mode button.

This interrupts the normal boot process and allows password recovery/factory reset commands.

The demo uses a Cisco 2960-CX, but the process is similar on many switch models.

After the boot interruption:

1. Run `flash_init`
2. Wait for flash to initialize (can take 30+ seconds).
3. Optionally run `dir flash:` to view files.

The key files to delete are:

- `config.text`
- `vlan.dat`

Deleting these and rebooting resets the switch configuration.

Do **not** delete IOS/operating system files from flash.

Delete commands used:

- `del flash:config.text`
- `del flash:vlan.dat`

Confirm deletion when prompted, then verify with:

- `dir flash:`

When those files are gone, type:

- `boot`

The switch reboots with no saved configuration and enters the initial configuration dialog. VLANs return to default (for example, VLAN 1 remains, custom VLANs are removed).

This process is useful when redeploying used switches or when recovering from forgotten credentials and starting over.

Source mention from transcript: netlinco.com
