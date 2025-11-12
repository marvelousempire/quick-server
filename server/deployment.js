/**
 * Remote Deployment Module
 * Handles SSH/SFTP deployment to remote servers
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Expand tilde in path (e.g., ~/.ssh/id_rsa -> /Users/username/.ssh/id_rsa)
 */
function expandPath(path) {
  if (path.startsWith('~')) {
    return path.replace('~', homedir());
  }
  return path;
}

/**
 * Test SSH connection to remote server
 */
export async function testConnection(deploymentConfig) {
  try {
    const { remote } = deploymentConfig;
    if (!remote || !remote.host || !remote.username) {
      return { success: false, error: 'Missing required connection parameters' };
    }

    const port = remote.port || 22;
    let sshCommand;

    if (remote.useSSHKey && remote.sshKeyPath) {
      const keyPath = expandPath(remote.sshKeyPath);
      if (!existsSync(keyPath)) {
        return { success: false, error: `SSH key not found at: ${keyPath}` };
      }
      sshCommand = `ssh -i "${keyPath}" -p ${port} -o StrictHostKeyChecking=no -o ConnectTimeout=10 ${remote.username}@${remote.host} "echo 'Connection successful'"`;
    } else if (remote.password) {
      // Using sshpass for password authentication (requires sshpass to be installed)
      sshCommand = `sshpass -p "${remote.password}" ssh -p ${port} -o StrictHostKeyChecking=no -o ConnectTimeout=10 ${remote.username}@${remote.host} "echo 'Connection successful'"`;
    } else {
      return { success: false, error: 'Either SSH key or password must be provided' };
    }

    const { stdout, stderr } = await execAsync(sshCommand, { timeout: 15000 });
    
    if (stderr && !stderr.includes('Connection successful')) {
      return { success: false, error: stderr || 'Connection failed' };
    }

    return { 
      success: true, 
      message: `Successfully connected to ${remote.host}:${port} as ${remote.username}` 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Connection test failed' 
    };
  }
}

/**
 * Deploy site to remote server using rsync over SSH
 */
export async function deploySite(deploymentConfig, sitePath) {
  try {
    const { remote, sync } = deploymentConfig;
    if (!remote || !remote.host || !remote.username) {
      return { success: false, error: 'Missing required deployment parameters' };
    }

    const port = remote.port || 22;
    const remotePath = remote.remotePath || '/var/www/html';
    const include = sync?.include || [];
    const exclude = sync?.exclude || ['node_modules', '.git', '.DS_Store', '*.log'];

    // Build rsync command
    let rsyncCommand = 'rsync -avz --delete';
    
    // Add exclude patterns
    exclude.forEach(pattern => {
      rsyncCommand += ` --exclude="${pattern}"`;
    });

    // Add SSH options
    if (remote.useSSHKey && remote.sshKeyPath) {
      const keyPath = expandPath(remote.sshKeyPath);
      if (!existsSync(keyPath)) {
        return { success: false, error: `SSH key not found at: ${keyPath}` };
      }
      rsyncCommand += ` -e "ssh -i ${keyPath} -p ${port} -o StrictHostKeyChecking=no"`;
    } else {
      rsyncCommand += ` -e "ssh -p ${port} -o StrictHostKeyChecking=no"`;
    }

    // Build source paths (only include specified files/patterns)
    const sourcePaths = include.length > 0 
      ? include.map(pattern => `${sitePath}/${pattern}`).join(' ')
      : `${sitePath}/`;

    // Destination
    const destination = `${remote.username}@${remote.host}:${remotePath}`;

    rsyncCommand += ` ${sourcePaths} ${destination}`;

    console.log('Deploying with command:', rsyncCommand.replace(/sshpass -p "[^"]*"/, 'sshpass -p "***"'));

    const { stdout, stderr } = await execAsync(rsyncCommand, { 
      timeout: 300000, // 5 minutes
      cwd: dirname(sitePath)
    });

    if (stderr && !stderr.includes('sending incremental file list')) {
      return { success: false, error: stderr || 'Deployment failed' };
    }

    return { 
      success: true, 
      message: `Site deployed successfully to ${remote.host}:${remotePath}`,
      output: stdout 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Deployment failed' 
    };
  }
}

/**
 * Get remote site stats (if remote server has API)
 */
export async function getRemoteStats(deploymentConfig) {
  try {
    const { environment } = deploymentConfig;
    const apiUrl = environment?.production?.apiUrl || environment?.staging?.apiUrl;
    
    if (!apiUrl) {
      return { success: false, error: 'No API URL configured' };
    }

    const response = await fetch(`${apiUrl}/api/stats`);
    if (!response.ok) {
      return { success: false, error: 'Failed to fetch remote stats' };
    }

    const stats = await response.json();
    return { success: true, stats };
  } catch (error) {
    return { 
      success: false, 
      error: error.message || 'Failed to fetch remote stats' 
    };
  }
}

