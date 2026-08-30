# IP Collector

This adds a small Express server and a client script to collect visitor IPs and metadata and store them into a local SQLite database (ips.db).

Files added:
- server.js — Express app with POST /collect-ip and a small /_ips/recent viewer.
- public/collect.js — client script that POSTs to /collect-ip with the page URL.
- public/index.html — example page that includes the collector script.
- package.json — start script and dependencies.
- .gitignore — ignores node_modules and ips.db.

Usage
1. Install dependencies: npm install
2. Start server: npm start
3. Visit the site (public/index.html). The client script will POST to /collect-ip.
4. To view recent entries (development only): GET /_ips/recent

Privacy & Security
- This collects IP addresses and User-Agent strings. Ensure you have a privacy policy and comply with applicable laws.
- /_ips/recent is unauthenticated for convenience — remove or protect it in production.
