# Cursor History File Location

## Primary History Storage

**Main History Database:**
```
~/Library/Application Support/Cursor/User/globalStorage/state.vscdb
```

**Size:** 5.5 GB (contains all conversation history)

**Backup:**
```
~/Library/Application Support/Cursor/User/globalStorage/state.vscdb.backup
```

**Size:** 4.2 GB

## File Details

- **Type:** SQLite database (.vscdb)
- **Location:** `~/Library/Application Support/Cursor/User/globalStorage/`
- **Format:** SQLite database (can be opened with SQLite tools)
- **Contains:** All Cursor conversation history, chat sessions, and AI interactions

## Workspace-Specific History

Each workspace also has its own state database:
```
~/Library/Application Support/Cursor/User/workspaceStorage/[workspace-id]/state.vscdb
```

These contain workspace-specific conversation history.

## How to Access

### View with SQLite

```bash
# Open the database
sqlite3 ~/Library/Application\ Support/Cursor/User/globalStorage/state.vscdb

# List tables
.tables

# View schema
.schema

# Query data (example)
SELECT * FROM ItemTable LIMIT 10;
```

### Backup History

```bash
# Create a backup
cp ~/Library/Application\ Support/Cursor/User/globalStorage/state.vscdb \
   ~/Desktop/cursor-history-backup-$(date +%Y%m%d).vscdb
```

### Export to Repository (Optional)

If you want to include conversation history in your repository:

```bash
# Note: This is a large file (5.5GB), so consider:
# 1. Compressing it first
# 2. Adding to .gitignore (recommended)
# 3. Or storing in a separate backup location
```

## Important Notes

1. **Size:** The history file is very large (5.5GB), so:
   - Don't commit it to Git (add to `.gitignore`)
   - Consider periodic cleanup of old conversations
   - Use the backup file if the main one gets corrupted

2. **Privacy:** This file contains all your conversations with Cursor AI:
   - Keep it secure
   - Don't share it publicly
   - Consider encryption if storing backups

3. **Location:** The file is stored locally on your Mac:
   - Not automatically synced to cloud (unless you enable Cursor sync)
   - Not included in the repository
   - Backed up if you backup your `~/Library` directory

## Finding Your Project's History

To find history specific to this project:

```bash
# Find workspace ID for this project
find ~/Library/Application\ Support/Cursor/User/workspaceStorage \
  -name "workspace.json" -exec grep -l "learnmappers-v7_3-pwa" {} \;

# Then check that workspace's state.vscdb
```

## Summary

- **Main file:** `~/Library/Application Support/Cursor/User/globalStorage/state.vscdb` (5.5GB)
- **Backup:** `~/Library/Application Support/Cursor/User/globalStorage/state.vscdb.backup` (4.2GB)
- **Format:** SQLite database
- **Contains:** All Cursor conversation history
- **Status:** Not in repository (too large, privacy concerns)

The `SESSION-NOTES.md` file in this repository contains a summary of our work, but the complete conversation history is in the SQLite database files above.

