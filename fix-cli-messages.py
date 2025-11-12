#!/usr/bin/env python3
"""
Fix incomplete CLI messages in go.sh to make them full complete thoughts.
This script updates version messages and other incomplete statements.
"""

import re
import sys
import shutil
from pathlib import Path

def fix_cli_messages(file_path):
    """Fix incomplete CLI messages in the script."""
    
    # Read the file
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading file: {e}")
        return False
    
    # Create backup
    backup_path = f"{file_path}.backup"
    shutil.copy2(file_path, backup_path)
    print(f"Created backup: {backup_path}")
    
    # Fix version messages to be complete thoughts
    fixes = [
        # UV version message
        (r'echo "✓ UV uv', r'echo "✓ UV version detected: uv'),
        
        # Node.js version message
        (r'echo "✓ Node\.js v', r'echo "✓ Node.js version detected: v'),
        
        # Python version message
        (r'echo "✓ Python\s+(\d+\.\d+\.\d+)"', r'echo "✓ Python version detected: \1"'),
        (r'echo "✓ Python\s+(\S+)"', r'echo "✓ Python version detected: \1"'),
        
        # Docker version message
        (r'echo "✓ Docker\s+(\d+\.\d+\.\d+)"', r'echo "✓ Docker version detected: \1"'),
        (r'echo "✓ Docker\s+(\S+)"', r'echo "✓ Docker version detected: \1"'),
        
        # pnpm version message
        (r'echo "✓ pnpm\s+(\d+\.\d+\.\d+)"', r'echo "✓ pnpm version detected: \1"'),
        (r'echo "✓ pnpm\s+(\S+)"', r'echo "✓ pnpm version detected: \1"'),
        
        # Subsequent runs message - make it a complete thought
        (r'Subsequent runs are fast \(skips', r'Subsequent runs are fast because they skip'),
        
        # Any other incomplete version messages
        (r'echo "✓ (\w+)\s+([vV]?\d+\.\d+\.\d+)"', r'echo "✓ \1 version detected: \2"'),
    ]
    
    original_content = content
    for pattern, replacement in fixes:
        content = re.sub(pattern, replacement, content)
    
    # Check if any changes were made
    if content == original_content:
        print("No changes needed - messages are already complete.")
        return True
    
    # Write the fixed content
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed CLI messages in {file_path}")
        print(f"Review changes with: diff {backup_path} {file_path}")
        return True
    except Exception as e:
        print(f"Error writing file: {e}")
        # Restore backup
        shutil.copy2(backup_path, file_path)
        return False

if __name__ == '__main__':
    script_path = Path(__file__).parent / 'go.sh'
    
    if len(sys.argv) > 1:
        script_path = Path(sys.argv[1])
    
    if not script_path.exists():
        print(f"Error: File not found: {script_path}")
        sys.exit(1)
    
    if script_path.stat().st_size == 0:
        print(f"Error: File is empty: {script_path}")
        print("Please restore the file from backup or version control first.")
        sys.exit(1)
    
    success = fix_cli_messages(script_path)
    sys.exit(0 if success else 1)

