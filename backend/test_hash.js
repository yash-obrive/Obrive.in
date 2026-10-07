const bcrypt = require('bcrypt');
async function run() {
  const hash = '$2b$10$fNBTfi4RrPkFVZvJgWrhSOYDpeH3LzH020WqjU.hgkf.O.IKUUeSm';
  const match = await bcrypt.compare('OBLINK_PROD_TEMP_PASS_123!', hash);
  console.log(match);
}
run();
