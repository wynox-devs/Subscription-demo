const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Initialize SQLite DB
const dbFile = path.join(__dirname, 'ips.db');
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Failed to open database', err);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS ips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      timestamp TEXT,
      ua TEXT,
      url TEXT
    )`
  );
});

function getClientIp(req) {
  // Try X-Forwarded-For first, then socket address
  const xff = req.headers['x-forwarded-for'];
  const remote = req.socket && req.socket.remoteAddress;
  const ip = (xff || remote || '').split(',')[0].trim();
  return ip;
}

app.post('/collect-ip', (req, res) => {
  const ip = getClientIp(req);
  const ua = req.get('User-Agent') || '';
  const url = (req.body && req.body.url) || '';
  const timestamp = new Date().toISOString();

  const stmt = db.prepare('INSERT INTO ips (ip, timestamp, ua, url) VALUES (?, ?, ?, ?)');
  stmt.run(ip, timestamp, ua, url, function (err) {
    if (err) {
      console.error('DB insert error', err);
      return res.status(500).json({ ok: false });
    }
    res.json({ ok: true });
  });
  stmt.finalize();
});

// optional: endpoint to retrieve recent entries (no auth) - remove or protect in production
app.get('/_ips/recent', (req, res) => {
  db.all('SELECT id, ip, timestamp, ua, url FROM ips ORDER BY id DESC LIMIT 100', [], (err, rows) => {
    if (err) return res.status(500).json({ ok: false });
    res.json(rows);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`IP collector listening on ${port}`));
