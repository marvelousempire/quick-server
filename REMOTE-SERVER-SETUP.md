# Remote Server Setup & Connection Guide

## How to Work with Your Remote Server

Since I (the AI assistant) can't directly connect to your remote server, here's how we can work together:

---

## Option 1: Share Information with Me

### What I Can Help With:

1. **Configuration Issues**
   - Share your server logs, error messages, or configuration files
   - I can analyze and provide fixes
   - You apply the fixes on the remote server

2. **Troubleshooting**
   - Copy/paste error messages or logs
   - I'll diagnose and provide solutions
   - You run the fixes via SSH

3. **Setup Scripts**
   - I can create scripts for you to run on the remote server
   - You copy the scripts and execute them
   - I can guide you through the process

---

## Option 2: SSH Access (For You)

### Quick SSH Setup

```bash
# On your local machine, test SSH connection
ssh username@your-remote-server.com

# Or with specific port
ssh -p 2222 username@your-remote-server.com

# Or with SSH key
ssh -i ~/.ssh/id_rsa username@your-remote-server.com
```

### Common Remote Server Locations

```bash
# Typical deployment paths:
/var/www/learnmappers
/opt/learnmappers
/home/username/learnmappers
/usr/local/learnmappers
```

---

## Option 3: Remote Status Check Script

I can create a script that checks your remote server status. You run it locally, and it connects to your remote server to gather information.

### Setup Remote Connection Config

Create a file `remote-config.json` (don't commit this!):

```json
{
  "host": "your-server.com",
  "username": "your-username",
  "port": 22,
  "remotePath": "/opt/learnmappers",
  "useSSHKey": true,
  "sshKeyPath": "~/.ssh/id_rsa"
}
```

---

## Quick Start on Remote Server

### 1. Extract and Navigate

```bash
# SSH into your remote server
ssh username@your-server.com

# Navigate to where you extracted the files
cd /opt/learnmappers  # or wherever you extracted

# Make scripts executable
chmod +x go go.sh server.js
```

### 2. Start the Server

```bash
# Fast mode (Python only, lightest)
./go --fast

# Full mode (Node.js with all features)
./go
```

### 3. Check if It's Running

```bash
# Check if server is listening
netstat -tlnp | grep 8000
# or
ss -tlnp | grep 8000

# Check logs
tail -f server.log
```

---

## Remote Server Checklist

### ✅ Pre-Deployment

- [ ] Server has Python 3.6+ (for fast mode)
- [ ] Server has Node.js 16+ (for full mode) OR use `./go` (auto-installs)
- [ ] Firewall allows ports 8000 (HTTP) and 8443 (HTTPS)
- [ ] You have SSH access
- [ ] Files are extracted to a directory

### ✅ Post-Deployment

- [ ] Server starts without errors (`./go` or `./go --fast`)
- [ ] Can access via `http://your-server-ip:8000`
- [ ] API endpoints work: `http://your-server-ip:8000/api/health`
- [ ] Sites are accessible
- [ ] Database is created (if using full mode)

---

## Common Remote Server Issues

### Issue: "Permission denied"

```bash
# Fix permissions
chmod +x go go.sh server.js
chmod -R 755 .

# If needed, run as specific user
sudo -u www-data ./go
```

### Issue: "Port already in use"

```bash
# Find what's using the port
sudo lsof -i :8000
# or
sudo netstat -tlnp | grep 8000

# Kill the process or change port in .env
```

### Issue: "Cannot connect"

```bash
# Check firewall
sudo ufw status
sudo ufw allow 8000/tcp
sudo ufw allow 8443/tcp

# Check if server is listening on all interfaces
# In server.js, it should listen on 0.0.0.0 (not just localhost)
```

---

## How to Share Information with Me

### Share Server Logs

```bash
# Get recent logs
tail -n 100 server.log

# Get error logs
grep -i error server.log

# Get startup logs
./go 2>&1 | tee startup.log
```

### Share Configuration

```bash
# Show environment
env | grep -E "(PORT|HTTPS|DB_)"

# Show directory structure
ls -la
tree -L 2  # if tree is installed
```

### Share Status

```bash
# Check if running
ps aux | grep node
ps aux | grep python

# Check ports
netstat -tlnp | grep -E "(8000|8443)"
```

---

## Next Steps

1. **Tell me what you need help with:**
   - "The server won't start"
   - "I can't access it from my browser"
   - "The API endpoints don't work"
   - "I need help configuring HTTPS"

2. **Share the relevant information:**
   - Error messages
   - Log files
   - Configuration files
   - What you've tried

3. **I'll provide:**
   - Specific fixes
   - Commands to run
   - Configuration changes
   - Troubleshooting steps

---

## Example: Getting Help

**You:** "I extracted the files to `/opt/learnmappers` and ran `./go` but got this error: `Error: Cannot find module 'express'`"

**Me:** "The dependencies aren't installed. Run: `npm install` or `pnpm install` in that directory, then try `./go` again."

---

## Remote Monitoring Script

I can create a script that:
- Connects to your remote server via SSH
- Checks server status
- Tests API endpoints
- Reports back to you

Would you like me to create this?

