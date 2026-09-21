// Compatibility wrapper to ensure legacy modules (like payments) continue working
// after the db.js architecture migration in PR #46.
const db = require("./db");
module.exports = db;
