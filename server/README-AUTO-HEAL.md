# AppleScript Auto-Heal Monitor

## Overview

The AppleScript Auto-Heal Monitor provides robust, automatic server restart capabilities on macOS. It monitors the server process and automatically restarts it when:

- A restart flag is detected (`.restart-flag` file)
- The server process crashes or dies unexpectedly
- The server needs to be restarted for any reason

## Features

✅ **Fully Automatic** - No manual intervention needed  
✅ **Crash Detection** - Automatically detects and restarts crashed processes  
✅ **Restart Flag Support** - Responds to restart requests from the web UI  
✅ **Background Operation** - Runs independently in the background  
✅ **macOS Native** - Uses AppleScript for reliable process monitoring  

## Usage

### Automatic (via `go.sh`)

The auto-heal monitor is automatically started when you run `./go.sh`. It detects macOS and uses AppleScript if available.

```bash
./go.sh
```

### Manual Start

To start the auto-heal monitor manually:

```bash
./server/start-auto-heal.sh
```

### Manual Stop

To stop the auto-heal monitor:

```bash
./server/stop-auto-heal.sh
```

## How It Works

1. **Process Monitoring**: The AppleScript monitor checks every 3 seconds:
   - If the server process is still running (via PID check)
   - If a restart flag file exists (`.restart-flag`)

2. **Restart Detection**: When a restart flag is detected:
   - Kills the current server process
   - Removes the restart flag
   - Starts a new server process
   - Updates the PID file

3. **Crash Detection**: When the server process dies:
   - Detects the process is no longer running
   - Automatically starts a new server process
   - Logs the auto-heal event

4. **Logging**: All events are logged to `server.log`:
   - Restart events
   - Auto-heal events
   - Errors and status updates

## Files

- `server/auto-heal.applescript` - Main AppleScript monitor
- `server/start-auto-heal.sh` - Start script
- `server/stop-auto-heal.sh` - Stop script
- `.server-pid` - Current server process ID
- `.restart-flag` - Restart trigger file (created by web UI)
- `server.log` - Server and monitor logs

## Integration with Web UI

The restart button on the Server Page (`/api/server/restart`) creates a `.restart-flag` file. The AppleScript monitor detects this file and automatically restarts the server.

## Benefits Over Bash Monitor

- **More Reliable**: AppleScript has better process detection on macOS
- **Independent**: Can run separately from `go.sh`
- **Persistent**: Continues monitoring even if terminal closes
- **Native**: Uses macOS-native process management

## Troubleshooting

### Monitor Not Starting

Check if AppleScript is available:
```bash
which osascript
```

### Monitor Not Detecting Restarts

Verify the restart flag is being created:
```bash
ls -la .restart-flag
```

### Check Monitor Status

View the monitor process:
```bash
ps aux | grep auto-heal
```

### View Logs

Check server and monitor logs:
```bash
tail -f server.log
```

## Notes

- The monitor runs continuously until stopped
- It checks every 3 seconds (configurable in the AppleScript)
- PID file (`.server-pid`) is used to track the server process
- Works independently of `go.sh` - can be used standalone

