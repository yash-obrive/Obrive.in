const http = require('http');

const loginData = JSON.stringify({
  email: 'ai@obrive.com',
  password: process.env.AI_DASHBOARD_PASSWORD,
  role: 'admin'
});

// Using backend port 5000 based on standard setup
const reqOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

const loginReq = http.request(reqOptions, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Login Status:', res.statusCode);
    console.log('Login Response:', data);
    
    // Obrive typically returns token in response body or sets a cookie
    const parsedData = JSON.parse(data);
    let token = parsedData.token || null;
    let authHeader = {};
    
    if (token) {
      authHeader['Authorization'] = `Bearer ${token}`;
    }

    const setCookie = res.headers['set-cookie'];
    if (setCookie) {
      authHeader['Cookie'] = setCookie[0];
    }
    
    if (Object.keys(authHeader).length > 0) {
      console.log('Got auth, now testing /api/oblink/dashboard/stats...');
      
      const statsReq = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/oblink/dashboard/stats',
        method: 'GET',
        headers: authHeader
      }, (statsRes) => {
        let statsData = '';
        statsRes.on('data', chunk => statsData += chunk);
        statsRes.on('end', () => {
          console.log('Stats Status:', statsRes.statusCode);
          console.log('Stats Response:', statsData);
        });
      });
      statsReq.end();
    } else {
      console.log('No auth context returned, login failed or backend uses different auth method.');
    }
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
