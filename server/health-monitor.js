/**
 * Server Health Monitor
 * 
 * Monitors server health, site status, and common recurring issues
 * to help with auto-healing and diagnostics.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { networkInterfaces } from 'os';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class HealthMonitor {
  constructor() {
    this.commonIssues = [
      {
        id: 'port-in-use',
        name: 'Port Already in Use',
        description: 'Another process is using the server port',
        severity: 'critical',
        detection: this.checkPortInUse.bind(this),
        fix: 'Kill the process using the port or use a different port'
      },
      {
        id: 'network-ip-changed',
        name: 'Network IP Changed',
        description: 'Network IP changed (WiFi to Ethernet or vice versa)',
        severity: 'warning',
        detection: this.checkNetworkIPChange.bind(this),
        fix: 'Restart server to pick up new IP, regenerate SSL certificates if needed'
      },
      {
        id: 'ssl-cert-mismatch',
        name: 'SSL Certificate IP Mismatch',
        description: 'SSL certificate does not include current network IP',
        severity: 'warning',
        detection: this.checkSSLCertIP.bind(this),
        fix: 'Regenerate SSL certificates with: mkcert localhost 127.0.0.1 ::1 <current-ip>'
      },
      {
        id: 'site-missing-index',
        name: 'Site Missing Index',
        description: 'Site directory exists but no index.html found',
        severity: 'error',
        detection: this.checkSiteIndex.bind(this),
        fix: 'Add index.html to site directory'
      },
      {
        id: 'database-locked',
        name: 'Database Locked',
        description: 'SQLite database is locked by another process',
        severity: 'critical',
        detection: this.checkDatabaseLocked.bind(this),
        fix: 'Close other processes accessing the database'
      },
      {
        id: 'missing-dependencies',
        name: 'Missing Dependencies',
        description: 'Required Node.js packages are missing',
        severity: 'error',
        detection: this.checkDependencies.bind(this),
        fix: 'Run: pnpm install or npm install'
      },
      {
        id: 'config-invalid',
        name: 'Invalid Config',
        description: 'Site config.json is invalid or missing',
        severity: 'error',
        detection: this.checkConfig.bind(this),
        fix: 'Fix or regenerate config.json'
      }
    ];
  }

  /**
   * Get comprehensive server status
   */
  async getServerStatus(sitesDir) {
    const status = {
      timestamp: new Date().toISOString(),
      server: {
        running: false,
        pid: null,
        port: null,
        networkIP: null,
        localIP: '127.0.0.1'
      },
      deployment: {
        docker: this._checkDockerSafe(),
        caddy: this._checkCaddySafe(),
        traefik: this._checkTraefikSafe()
      },
      systemTools: {
        nodejs: this._checkNodeJSSafe(),
        python: this._checkPythonSafe(),
        uv: this._checkUVSafe(),
        ssl: this._checkSSLSafe(),
        mysql: this._checkMySQLSafe(),
        postgresql: this._checkPostgreSQLSafe(),
        redis: this._checkRedisSafe(),
        wordpress: this._checkWordPressSafe(),
        vite: this._checkViteSafe(),
        vue: this._checkVueSafe(),
        react: this._checkReactSafe(),
        pnpm: this._checkPNPMSafe()
      },
      sites: [],
      network: {
        interfaces: [],
        currentIP: null,
        previousIP: null
      },
      ssl: {
        certificatesExist: false,
        includesCurrentIP: false,
        valid: false
      },
      database: {
        exists: false,
        accessible: false,
        locked: false
      },
      issues: [],
      health: {
        overall: 'unknown',
        score: 0,
        message: ''
      }
    };

    // Check server process
    status.server = await this.checkServerProcess();
    
    // Check network
    status.network = this.checkNetwork();
    
    // Check SSL certificates
    status.ssl = this.checkSSL(status.network.currentIP);
    
    // Check database
    status.database = await this.checkDatabase();
    
    // Check sites
    status.sites = await this.checkSites(sitesDir);
    
    // Detect issues
    status.issues = await this.detectIssues(status);
    
    // Calculate health score
    status.health = this.calculateHealth(status);

    return status;
  }

  /**
   * Check if server process is running
   */
  async checkServerProcess() {
    try {
      const pidFile = join(__dirname, '..', '.server-pid');
      let pid = null;
      if (existsSync(pidFile)) {
        pid = parseInt(readFileSync(pidFile, 'utf8').trim());
      }

      // Check if process is actually running
      const running = pid ? await this.isProcessRunning(pid) : false;
      
      return {
        running,
        pid,
        port: running ? 8443 : null,
        networkIP: this.getCurrentNetworkIP(),
        localIP: '127.0.0.1'
      };
    } catch (e) {
      return {
        running: false,
        pid: null,
        port: null,
        networkIP: null,
        localIP: '127.0.0.1'
      };
    }
  }

  /**
   * Check if process is running
   */
  async isProcessRunning(pid) {
    try {
      process.kill(pid, 0);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check network interfaces
   */
  checkNetwork() {
    const nets = networkInterfaces();
    const interfaces = [];
    let currentIP = null;
    let previousIP = null;

    // Try to get previous IP from stored value
    try {
      const ipFile = join(__dirname, '..', '.last-network-ip');
      if (existsSync(ipFile)) {
        previousIP = readFileSync(ipFile, 'utf8').trim();
      }
    } catch (e) {}

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        if (net.family === 'IPv4' && !net.internal) {
          interfaces.push({
            name,
            address: net.address,
            netmask: net.netmask,
            mac: net.mac
          });
          
          // Prefer en0 (Ethernet) or en1 (WiFi) on macOS
          if (!currentIP || name === 'en0' || name === 'en1') {
            currentIP = net.address;
          }
        }
      }
    }

    // Save current IP for next check
    try {
      const ipFile = join(__dirname, '..', '.last-network-ip');
      if (currentIP) {
        writeFileSync(ipFile, currentIP, 'utf8');
      }
    } catch (e) {}

    return {
      interfaces,
      currentIP: currentIP || '127.0.0.1',
      previousIP,
      changed: previousIP && previousIP !== currentIP
    };
  }

  /**
   * Get current network IP
   */
  getCurrentNetworkIP() {
    const network = this.checkNetwork();
    return network.currentIP;
  }

  /**
   * Check SSL certificates
   */
  checkSSL(currentIP) {
    const certPath = join(__dirname, '..', 'localhost+3.pem');
    const keyPath = join(__dirname, '..', 'localhost+3-key.pem');
    
    const certificatesExist = existsSync(certPath) && existsSync(keyPath);
    let includesCurrentIP = false;
    let valid = false;

    if (certificatesExist) {
      try {
        const certText = execSync(`openssl x509 -in ${certPath} -text -noout 2>/dev/null`, { encoding: 'utf8' });
        includesCurrentIP = certText.includes(currentIP);
        valid = certText.includes('Subject:') && certText.includes('Issuer:');
      } catch (e) {
        // OpenSSL might not be available, try reading cert directly
        try {
          const cert = readFileSync(certPath, 'utf8');
          valid = cert.includes('BEGIN CERTIFICATE') && cert.includes('END CERTIFICATE');
        } catch (e2) {}
      }
    }

    return {
      certificatesExist,
      includesCurrentIP,
      valid,
      certPath: certificatesExist ? certPath : null
    };
  }

  /**
   * Check database
   */
  async checkDatabase() {
    const dbPath = join(__dirname, '..', 'data', 'inventory.db');
    const exists = existsSync(dbPath);
    let accessible = false;
    let locked = false;

    if (exists) {
      try {
        // Try to open database
        const Database = (await import('better-sqlite3')).default;
        const db = new Database(dbPath, { readonly: true });
        db.prepare('SELECT 1').get();
        db.close();
        accessible = true;
      } catch (e) {
        if (e.message.includes('locked') || e.code === 'SQLITE_BUSY') {
          locked = true;
        }
      }
    }

    return {
      exists,
      accessible,
      locked,
      path: dbPath
    };
  }

  /**
   * Check all sites
   */
  async checkSites(sitesDir) {
    const sites = [];
    
    if (!existsSync(sitesDir)) {
      return sites;
    }

    const siteDirs = readdirSync(sitesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .filter(name => !name.startsWith('.') && name !== 'default' && name !== '_shared');

    for (const siteName of siteDirs) {
      const sitePath = join(sitesDir, siteName);
      const siteStatus = await this.checkSite(sitePath, siteName);
      sites.push(siteStatus);
    }

    return sites;
  }

  /**
   * Check individual site
   */
  async checkSite(sitePath, siteName) {
    const status = {
      name: siteName,
      path: sitePath,
      working: false,
      issues: [],
      hasIndex: false,
      hasConfig: false,
      hasResources: false,
      hasServices: false,
      resourceCount: 0,
      serviceCount: 0,
      pageCount: 0
    };

    // Check for index.html
    const indexPaths = [
      join(sitePath, 'content', 'pages', 'index.html'),
      join(sitePath, 'pages', 'index.html'),
      join(sitePath, 'index.html')
    ];
    
    for (const indexPath of indexPaths) {
      if (existsSync(indexPath)) {
        status.hasIndex = true;
        break;
      }
    }

    // Check for config.json
    const configPath = join(sitePath, 'config.json');
    status.hasConfig = existsSync(configPath);
    
    if (status.hasConfig) {
      try {
        const config = JSON.parse(readFileSync(configPath, 'utf8'));
        if (!config.site || !config.site.name) {
          status.issues.push('Config missing site name');
        }
      } catch (e) {
        status.issues.push(`Invalid config.json: ${e.message}`);
      }
    } else {
      status.issues.push('Missing config.json');
    }

    // Check resources
    const resourcesDir = join(sitePath, 'content', 'resources');
    if (existsSync(resourcesDir)) {
      status.hasResources = true;
      status.resourceCount = this.countFiles(resourcesDir, '.json');
    }

    // Check services
    const servicesDir = join(sitePath, 'content', 'services');
    if (existsSync(servicesDir)) {
      status.hasServices = true;
      status.serviceCount = this.countFiles(servicesDir, '.json');
    }

    // Check pages
    const pagesDir = join(sitePath, 'content', 'pages');
    if (existsSync(pagesDir)) {
      status.pageCount = this.countFiles(pagesDir, '.html');
    }

    // Site is working if it has index and config
    status.working = status.hasIndex && status.hasConfig && status.issues.length === 0;

    return status;
  }

  /**
   * Count files recursively
   */
  countFiles(dir, extension) {
    let count = 0;
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          count += this.countFiles(fullPath, extension);
        } else if (entry.isFile() && entry.name.endsWith(extension)) {
          count++;
        }
      }
    } catch (e) {
      // Directory doesn't exist or can't be read
    }
    return count;
  }

  /**
   * Detect common issues
   */
  async detectIssues(status) {
    const issues = [];

    for (const issueDef of this.commonIssues) {
      try {
        const detected = await issueDef.detection(status);
        if (detected) {
          issues.push({
            id: issueDef.id,
            name: issueDef.name,
            description: issueDef.description,
            severity: issueDef.severity,
            fix: issueDef.fix,
            detected: true
          });
        }
      } catch (e) {
        // Issue detection failed, skip
      }
    }

    return issues;
  }

  /**
   * Check if port is in use
   */
  async checkPortInUse(status) {
    if (!status.server.running) {
      // Check if port is in use by another process
      try {
        const result = execSync(`lsof -ti :8443 2>/dev/null || echo ""`, { encoding: 'utf8' }).trim();
        return result.length > 0;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  /**
   * Check if network IP changed
   */
  async checkNetworkIPChange(status) {
    return status.network.changed === true;
  }

  /**
   * Check if SSL cert includes current IP
   */
  async checkSSLCertIP(status) {
    return status.ssl.certificatesExist && !status.ssl.includesCurrentIP;
  }

  /**
   * Check if site is missing index
   */
  async checkSiteIndex(status) {
    return status.sites.some(site => !site.hasIndex);
  }

  /**
   * Check if database is locked
   */
  async checkDatabaseLocked(status) {
    return status.database.locked === true;
  }

  /**
   * Check dependencies
   */
  async checkDependencies(status) {
    const nodeModules = join(__dirname, '..', 'node_modules');
    return !existsSync(nodeModules);
  }

  /**
   * Check config validity
   */
  async checkConfig(status) {
    return status.sites.some(site => !site.hasConfig || site.issues.some(i => i.includes('config')));
  }

  /**
   * Calculate overall health score
   */
  calculateHealth(status) {
    let score = 100;
    let message = 'All systems operational';

    // Deduct points for issues
    for (const issue of status.issues) {
      if (issue.severity === 'critical') {
        score -= 30;
      } else if (issue.severity === 'error') {
        score -= 20;
      } else if (issue.severity === 'warning') {
        score -= 10;
      }
    }

    // Deduct for non-working sites
    const nonWorkingSites = status.sites.filter(s => !s.working);
    score -= nonWorkingSites.length * 5;

    // Server not running is critical
    if (!status.server.running) {
      score = 0;
      message = 'Server is not running';
    } else if (score < 50) {
      message = 'Multiple critical issues detected';
    } else if (score < 80) {
      message = 'Some issues detected';
    } else if (score < 100) {
      message = 'Minor issues detected';
    }

    let overall = 'healthy';
    if (score < 50) {
      overall = 'critical';
    } else if (score < 80) {
      overall = 'degraded';
    } else if (score < 100) {
      overall = 'warning';
    }

    return {
      overall,
      score: Math.max(0, Math.min(100, score)),
      message
    };
  }

  /**
   * Check Docker availability and status (safe - with error handling)
   */
  _checkDockerSafe() {
    try {
      return this._checkDocker();
    } catch (e) {
      console.warn('⚠️  Docker check failed:', e.message);
      return {
        available: false,
        version: null,
        compose: false,
        daemonRunning: false,
        containersRunning: false,
        configExists: existsSync(join(__dirname, '..', 'docker-compose.yml')),
        status: 'error'
      };
    }
  }

  /**
   * Check Docker availability and status
   */
  _checkDocker() {
    try {
      const dockerVersion = execSync('docker --version 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
      const dockerCompose = execSync('docker-compose version 2>&1 || docker compose version 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
      
      // Check if Docker daemon is running
      let daemonRunning = false;
      try {
        execSync('docker ps 2>&1', { encoding: 'utf8', stdio: 'pipe' });
        daemonRunning = true;
      } catch (e) {
        // Docker daemon not running
      }

      // Check if learnmappers containers are running
      let containersRunning = false;
      try {
        const containers = execSync('docker ps --filter "name=learnmappers" --format "{{.Names}}" 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
        containersRunning = containers.length > 0;
      } catch (e) {
        // No containers running
      }

      const dockerComposeExists = existsSync(join(__dirname, '..', 'docker-compose.yml'));

      return {
        available: true,
        version: dockerVersion,
        compose: dockerCompose.length > 0,
        daemonRunning,
        containersRunning,
        configExists: dockerComposeExists,
        status: daemonRunning ? (containersRunning ? 'running' : 'available') : 'not-running'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        compose: false,
        daemonRunning: false,
        containersRunning: false,
        configExists: existsSync(join(__dirname, '..', 'docker-compose.yml')),
        status: 'not-installed'
      };
    }
  }

  /**
   * Check Caddy availability and status (safe - with error handling)
   */
  _checkCaddySafe() {
    try {
      return this._checkCaddy();
    } catch (e) {
      console.warn('⚠️  Caddy check failed:', e.message);
      return {
        available: false,
        version: null,
        running: false,
        configExists: existsSync(join(__dirname, '..', 'Caddyfile')),
        status: 'error'
      };
    }
  }

  /**
   * Check Caddy availability and status
   */
  _checkCaddy() {
    try {
      const caddyVersion = execSync('caddy version 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
      const caddyfileExists = existsSync(join(__dirname, '..', 'Caddyfile'));
      
      // Check if Caddy is running
      let running = false;
      try {
        execSync('pgrep -f caddy 2>&1', { encoding: 'utf8', stdio: 'pipe' });
        running = true;
      } catch (e) {
        // Caddy not running
      }

      return {
        available: true,
        version: caddyVersion,
        running,
        configExists: caddyfileExists,
        status: running ? 'running' : (caddyfileExists ? 'configured' : 'available')
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        running: false,
        configExists: existsSync(join(__dirname, '..', 'Caddyfile')),
        status: 'not-installed'
      };
    }
  }

  /**
   * Check Traefik availability and status (safe - with error handling)
   */
  _checkTraefikSafe() {
    try {
      return this._checkTraefik();
    } catch (e) {
      console.warn('⚠️  Traefik check failed:', e.message);
      let dockerComposeHasTraefik = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasTraefik = dockerComposeContent.includes('traefik');
        }
      } catch (e2) {
        // Error reading file
      }
      return {
        available: false,
        version: null,
        running: false,
        configExists: dockerComposeHasTraefik,
        status: 'error'
      };
    }
  }

  /**
   * Check Traefik availability and status
   */
  _checkTraefik() {
    try {
      const traefikVersion = execSync('traefik version 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
      
      // Check if Traefik is running (could be in Docker or standalone)
      let running = false;
      try {
        // Check for Traefik process
        execSync('pgrep -f traefik 2>&1', { encoding: 'utf8', stdio: 'pipe' });
        running = true;
      } catch (e) {
        // Check if Traefik container is running
        try {
          const containers = execSync('docker ps --filter "name=traefik" --format "{{.Names}}" 2>&1', { encoding: 'utf8', stdio: 'pipe' }).trim();
          running = containers.length > 0;
        } catch (e2) {
          // Not running
        }
      }

      // Check for Traefik config files
      const traefikYml = existsSync(join(__dirname, '..', 'traefik.yml'));
      const traefikToml = existsSync(join(__dirname, '..', 'traefik.toml'));
      let dockerComposeHasTraefik = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasTraefik = dockerComposeContent.includes('traefik');
        }
      } catch (e) {
        // Error reading file
      }

      return {
        available: true,
        version: traefikVersion,
        running,
        configExists: traefikYml || traefikToml || dockerComposeHasTraefik,
        status: running ? 'running' : (traefikYml || traefikToml || dockerComposeHasTraefik ? 'configured' : 'available')
      };
    } catch (e) {
      // Check if Traefik is configured in docker-compose
      let dockerComposeHasTraefik = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasTraefik = dockerComposeContent.includes('traefik');
        }
      } catch (e2) {
        // Error reading file
      }

      return {
        available: false,
        version: null,
        running: false,
        configExists: dockerComposeHasTraefik,
        status: dockerComposeHasTraefik ? 'configured' : 'not-installed'
      };
    }
  }

  /**
   * Check Node.js availability and version (safe - with error handling)
   */
  _checkNodeJSSafe() {
    try {
      return this._checkNodeJS();
    } catch (e) {
      console.warn('⚠️  Node.js check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check Node.js availability and version
   */
  _checkNodeJS() {
    try {
      const nodeVersion = execSync('node --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      return {
        available: true,
        version: nodeVersion,
        status: 'installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }

  /**
   * Check Python availability and version (safe - with error handling)
   */
  _checkPythonSafe() {
    try {
      return this._checkPython();
    } catch (e) {
      console.warn('⚠️  Python check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check Python availability and version
   */
  _checkPython() {
    try {
      // Try python3 first, then python
      let pythonVersion = null;
      try {
        pythonVersion = execSync('python3 --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      } catch (e) {
        pythonVersion = execSync('python --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      }
      return {
        available: true,
        version: pythonVersion,
        status: 'installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }

  /**
   * Check UV availability and version (safe - with error handling)
   */
  _checkUVSafe() {
    try {
      return this._checkUV();
    } catch (e) {
      console.warn('⚠️  UV check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check UV availability and version
   */
  _checkUV() {
    try {
      const uvVersion = execSync('uv --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      return {
        available: true,
        version: uvVersion,
        status: 'installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }

  /**
   * Check SSL certificates status (safe - with error handling)
   */
  _checkSSLSafe() {
    try {
      return this._checkSSLStatus();
    } catch (e) {
      console.warn('⚠️  SSL check failed:', e.message);
      return {
        available: false,
        certExists: false,
        keyExists: false,
        valid: false,
        status: 'error'
      };
    }
  }

  /**
   * Check SSL certificates status
   */
  _checkSSLStatus() {
    const certPath = join(__dirname, '..', 'localhost+3.pem');
    const keyPath = join(__dirname, '..', 'localhost+3-key.pem');
    const certExists = existsSync(certPath);
    const keyExists = existsSync(keyPath);
    
    let valid = false;
    if (certExists && keyExists) {
      try {
        // Quick validation - check if files are readable
        readFileSync(certPath);
        readFileSync(keyPath);
        valid = true;
      } catch (e) {
        valid = false;
      }
    }
    
    return {
      available: certExists && keyExists,
      certExists,
      keyExists,
      valid,
      status: valid ? 'valid' : (certExists || keyExists ? 'invalid' : 'not-found')
    };
  }

  /**
   * Check MySQL availability and status (safe - with error handling)
   */
  _checkMySQLSafe() {
    try {
      return this._checkMySQL();
    } catch (e) {
      console.warn('⚠️  MySQL check failed:', e.message);
      return {
        available: false,
        version: null,
        running: false,
        status: 'error'
      };
    }
  }

  /**
   * Check MySQL availability and status
   */
  _checkMySQL() {
    try {
      const mysqlVersion = execSync('mysql --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      
      // Check if MySQL is running
      let running = false;
      try {
        execSync('mysqladmin ping 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 });
        running = true;
      } catch (e) {
        // Check if MySQL is running in Docker
        try {
          const containers = execSync('docker ps --filter "name=mysql" --format "{{.Names}}" 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
          running = containers.length > 0;
        } catch (e2) {
          // Not running
        }
      }
      
      return {
        available: true,
        version: mysqlVersion,
        running,
        status: running ? 'running' : 'installed'
      };
    } catch (e) {
      // Check if MySQL is configured in docker-compose
      let dockerComposeHasMySQL = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasMySQL = dockerComposeContent.includes('mysql') || dockerComposeContent.includes('mariadb');
        }
      } catch (e2) {
        // Error reading file
      }
      
      return {
        available: dockerComposeHasMySQL,
        version: null,
        running: false,
        status: dockerComposeHasMySQL ? 'configured' : 'not-installed'
      };
    }
  }

  /**
   * Check PostgreSQL availability and status (safe - with error handling)
   */
  _checkPostgreSQLSafe() {
    try {
      return this._checkPostgreSQL();
    } catch (e) {
      console.warn('⚠️  PostgreSQL check failed:', e.message);
      return {
        available: false,
        version: null,
        running: false,
        status: 'error'
      };
    }
  }

  /**
   * Check PostgreSQL availability and status
   */
  _checkPostgreSQL() {
    try {
      const pgVersion = execSync('psql --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      
      // Check if PostgreSQL is running
      let running = false;
      try {
        execSync('pg_isready 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 });
        running = true;
      } catch (e) {
        // Check if PostgreSQL is running in Docker
        try {
          const containers = execSync('docker ps --filter "name=postgres" --format "{{.Names}}" 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
          running = containers.length > 0;
        } catch (e2) {
          // Not running
        }
      }
      
      return {
        available: true,
        version: pgVersion,
        running,
        status: running ? 'running' : 'installed'
      };
    } catch (e) {
      // Check if PostgreSQL is configured in docker-compose
      let dockerComposeHasPG = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasPG = dockerComposeContent.includes('postgres');
        }
      } catch (e2) {
        // Error reading file
      }
      
      return {
        available: dockerComposeHasPG,
        version: null,
        running: false,
        status: dockerComposeHasPG ? 'configured' : 'not-installed'
      };
    }
  }

  /**
   * Check Redis availability and status (safe - with error handling)
   */
  _checkRedisSafe() {
    try {
      return this._checkRedis();
    } catch (e) {
      console.warn('⚠️  Redis check failed:', e.message);
      return {
        available: false,
        version: null,
        running: false,
        status: 'error'
      };
    }
  }

  /**
   * Check Redis availability and status
   */
  _checkRedis() {
    try {
      const redisVersion = execSync('redis-cli --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      
      // Check if Redis is running
      let running = false;
      try {
        execSync('redis-cli ping 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 });
        running = true;
      } catch (e) {
        // Check if Redis is running in Docker
        try {
          const containers = execSync('docker ps --filter "name=redis" --format "{{.Names}}" 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
          running = containers.length > 0;
        } catch (e2) {
          // Not running
        }
      }
      
      return {
        available: true,
        version: redisVersion,
        running,
        status: running ? 'running' : 'installed'
      };
    } catch (e) {
      // Check if Redis is configured in docker-compose
      let dockerComposeHasRedis = false;
      try {
        if (existsSync(join(__dirname, '..', 'docker-compose.yml'))) {
          const dockerComposeContent = readFileSync(join(__dirname, '..', 'docker-compose.yml'), 'utf8');
          dockerComposeHasRedis = dockerComposeContent.includes('redis');
        }
      } catch (e2) {
        // Error reading file
      }
      
      return {
        available: dockerComposeHasRedis,
        version: null,
        running: false,
        status: dockerComposeHasRedis ? 'configured' : 'not-installed'
      };
    }
  }

  /**
   * Check WordPress availability (safe - with error handling)
   */
  _checkWordPressSafe() {
    try {
      return this._checkWordPress();
    } catch (e) {
      console.warn('⚠️  WordPress check failed:', e.message);
      return {
        available: false,
        installed: false,
        status: 'error'
      };
    }
  }

  /**
   * Check WordPress availability
   */
  _checkWordPress() {
    // Check for WordPress installation in common locations
    const wpPaths = [
      join(__dirname, '..', 'wordpress'),
      join(__dirname, '..', 'wp'),
      join(__dirname, '..', 'wp-content'),
      join(__dirname, '..', 'sites', 'wordpress')
    ];
    
    for (const wpPath of wpPaths) {
      if (existsSync(join(wpPath, 'wp-config.php')) || existsSync(join(wpPath, 'wp-load.php'))) {
        return {
          available: true,
          installed: true,
          path: wpPath,
          status: 'installed'
        };
      }
    }
    
    return {
      available: false,
      installed: false,
      status: 'not-installed'
    };
  }

  /**
   * Check Vite availability (safe - with error handling)
   */
  _checkViteSafe() {
    try {
      return this._checkVite();
    } catch (e) {
      console.warn('⚠️  Vite check failed:', e.message);
      return {
        available: false,
        version: null,
        running: false,
        status: 'error'
      };
    }
  }

  /**
   * Check Vite availability
   */
  _checkVite() {
    try {
      // Check if Vite is installed via npm/pnpm/yarn
      const viteVersion = execSync('npx vite --version 2>&1 || pnpm exec vite --version 2>&1 || yarn vite --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      
      // Check if Vite dev server is running
      let running = false;
      try {
        const result = execSync('lsof -ti :5173 2>/dev/null || echo ""', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
        running = result.length > 0;
      } catch (e) {
        // Not running
      }
      
      return {
        available: true,
        version: viteVersion.includes('error') ? null : viteVersion,
        running,
        status: running ? 'running' : 'installed'
      };
    } catch (e) {
      // Check for vite.config.js/ts in project
      const viteConfigs = [
        join(__dirname, '..', 'vite.config.js'),
        join(__dirname, '..', 'vite.config.ts'),
        join(__dirname, '..', 'vite.config.mjs')
      ];
      
      const hasConfig = viteConfigs.some(config => existsSync(config));
      
      return {
        available: hasConfig,
        version: null,
        running: false,
        status: hasConfig ? 'configured' : 'not-installed'
      };
    }
  }

  /**
   * Check Vue availability (safe - with error handling)
   */
  _checkVueSafe() {
    try {
      return this._checkVue();
    } catch (e) {
      console.warn('⚠️  Vue check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check Vue availability
   */
  _checkVue() {
    try {
      // Check package.json for Vue
      const packageJsonPath = join(__dirname, '..', 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        const vueVersion = deps.vue || deps['@vue/cli'] || deps['vue-cli'];
        
        if (vueVersion) {
          return {
            available: true,
            version: vueVersion,
            status: 'installed'
          };
        }
      }
      
      // Check node_modules
      const vuePath = join(__dirname, '..', 'node_modules', 'vue', 'package.json');
      if (existsSync(vuePath)) {
        const vuePackage = JSON.parse(readFileSync(vuePath, 'utf8'));
        return {
          available: true,
          version: vuePackage.version,
          status: 'installed'
        };
      }
      
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }

  /**
   * Check React availability (safe - with error handling)
   */
  _checkReactSafe() {
    try {
      return this._checkReact();
    } catch (e) {
      console.warn('⚠️  React check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check React availability
   */
  _checkReact() {
    try {
      // Check package.json for React
      const packageJsonPath = join(__dirname, '..', 'package.json');
      if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        const reactVersion = deps.react || deps['react-dom'] || deps['@react-native/core'];
        
        if (reactVersion) {
          return {
            available: true,
            version: reactVersion,
            status: 'installed'
          };
        }
      }
      
      // Check node_modules
      const reactPath = join(__dirname, '..', 'node_modules', 'react', 'package.json');
      if (existsSync(reactPath)) {
        const reactPackage = JSON.parse(readFileSync(reactPath, 'utf8'));
        return {
          available: true,
          version: reactPackage.version,
          status: 'installed'
        };
      }
      
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }

  /**
   * Check PNPM availability and version (safe - with error handling)
   */
  _checkPNPMSafe() {
    try {
      return this._checkPNPM();
    } catch (e) {
      console.warn('⚠️  PNPM check failed:', e.message);
      return {
        available: false,
        version: null,
        status: 'error'
      };
    }
  }

  /**
   * Check PNPM availability and version
   */
  _checkPNPM() {
    try {
      const pnpmVersion = execSync('pnpm --version 2>&1', { encoding: 'utf8', stdio: 'pipe', timeout: 2000 }).trim();
      return {
        available: true,
        version: pnpmVersion,
        status: 'installed'
      };
    } catch (e) {
      return {
        available: false,
        version: null,
        status: 'not-installed'
      };
    }
  }
}

