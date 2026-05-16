# Switch Serial Connections - RS-232

## RS-232

- RS-232 is a serial communication standard commonly used for console access to network devices.
- Typical use in networking: direct management connection to a switch/router console port.

## Key Serial Parameters

### Start Bits

- Marks the beginning of a transmitted character.
- Tells the receiver when to begin sampling incoming bits.

### Stop Bits

- Marks the end of a transmitted character.
- Provides framing separation between characters.

### Parity Bits

- Optional error-check bit for simple error detection.
- Common settings: none, even, odd.

### Number of Data Bits

- Number of payload bits per character (commonly 7 or 8).
- Must match on both ends of the serial session.

### Baud Rate

- Symbol rate of the serial line (for example 9600, 19200, 115200).
- Both ends must match baud settings to read data correctly.

### Signal Levels

- RS-232 uses defined voltage ranges for logical signaling.
- If levels or adapters are incompatible, communication errors occur.

## Why This Matters

- Correct serial settings are required for reliable console access.
- Mismatched settings cause unreadable output or no connection.
