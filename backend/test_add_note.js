require('dotenv').config();
const http = require('http');
const jwt = require('./src/utils/jwt');
const token = jwt.signAccessToken({ id: 29, role: 'employee' });

const data = JSON.stringify({
  content: 'Test Note Today',
  note_date: '2026-10-01',
  color: 'yellow',
  position: 0
});

const req = http.request('http://127.0.0.1:5000/api/sticky-notes', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  let responseData = '';
  res.on('data', chunk => responseData += chunk);
  res.on('end', () => console.log('Response:', responseData));
});
req.on('error', console.error);
req.write(data);
req.end();
