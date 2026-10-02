require('dotenv').config();
const jwt = require('./src/utils/jwt');
const token = jwt.signAccessToken({ id: 6, role: 'supervisor' });
console.log(token);
