require('dotenv').config();
const http = require('http');
const jwt = require('./src/utils/jwt');
const token = jwt.signAccessToken({ id: 29, role: 'employee' });

http.get('http://localhost:5000/api/projects/user/projects', {
  headers: { 'Authorization': `Bearer ${token}` }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log('Response:', data));
}).on('error', console.error);
