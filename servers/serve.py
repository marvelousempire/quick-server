#!/usr/bin/env python3
"""
Simple HTTP server for LearnMappers PWA
Serves on all network interfaces so you can access from other devices
"""
import http.server
import socketserver
import os
import socket
import sys

DEFAULT_PORT = 8000

def is_port_available(port):
    """Check if a port is available"""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        try:
            s.bind(('', port))
            return True
        except OSError:
            return False

def find_available_port(start_port):
    """Find an available port starting from start_port"""
    port = start_port
    while port < start_port + 100:  # Try up to 100 ports
        if is_port_available(port):
            return port
        port += 1
    return None

def get_port_info(port):
    """Get information about what's using a port"""
    try:
        import subprocess
        result = subprocess.run(['lsof', '-ti', f':{port}'], 
                              capture_output=True, text=True)
        if result.returncode == 0:
            pids = result.stdout.strip().split('\n')
            return pids
    except:
        pass
    return None

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS and PWA-friendly headers
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def get_local_ip():
    """Get local IP address"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "localhost"

if __name__ == "__main__":
    # Determine site directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # Get site directory from env var, argv[1], or default to 'sites/default'
    if len(sys.argv) > 1 and not sys.argv[1].isdigit():
        # First arg is site directory (not a port number)
        site_dir = sys.argv[1]
        port_arg_idx = 2
    else:
        # Use environment variable or default
        site_dir = os.environ.get('SITE_DIR', 'sites/default')
        port_arg_idx = 1
    
    site_path = os.path.join(project_root, site_dir)
    
    # Verify site directory exists
    if not os.path.exists(site_path):
        print(f"❌ Site directory not found: {site_path}")
        print(f"   Available options:")
        print(f"   - Create directory: mkdir -p {site_dir}")
        print(f"   - Use different site: SITE_DIR=sites/other-site python servers/serve.py")
        print(f"   - Or: python servers/serve.py sites/other-site")
        sys.exit(1)
    
    os.chdir(site_path)
    
    # Get port from command line or use default
    port = int(sys.argv[port_arg_idx]) if len(sys.argv) > port_arg_idx and sys.argv[port_arg_idx].isdigit() else DEFAULT_PORT
    
    # Check if port is available
    if not is_port_available(port):
        pids = get_port_info(port)
        print(f"⚠️  Port {port} is already in use", end="")
        if pids:
            print(f" (PIDs: {', '.join(pids)})")
            print(f"   Kill with: kill {' '.join(pids)}")
        else:
            print()
        
        # Try to find an available port
        available_port = find_available_port(port)
        if available_port:
            print(f"🔄 Using port {available_port} instead")
            port = available_port
        else:
            print(f"❌ Could not find an available port near {port}")
            sys.exit(1)
    
    Handler = MyHTTPRequestHandler
    local_ip = get_local_ip()
    
    with socketserver.TCPServer(("", port), Handler) as httpd:
        print(f"\n{'='*60}")
        print(f"LearnMappers PWA Server")
        print(f"{'='*60}")
        print(f"Site:     {site_dir}")
        print(f"Local:    http://localhost:{port}")
        print(f"Network:  http://{local_ip}:{port}")
        print(f"{'='*60}")
        print(f"\nAccess from other devices on your network using:")
        print(f"  http://{local_ip}:{port}")
        print(f"\nPress Ctrl+C to stop the server\n")
        httpd.serve_forever()

