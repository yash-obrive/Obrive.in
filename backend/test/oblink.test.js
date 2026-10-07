const { test, mock } = require('node:test');
const assert = require('node:assert');
const PublisherAgent = require('../src/modules/oblink/agents/PublisherAgent');
const ObriveSecurity = require('../src/modules/oblink/utils/security');

test('ObriveSecurity encrypts and decrypts correctly', () => {
  const secret = 'my-super-secret-oauth-token';
  const encrypted = ObriveSecurity.encryptCredential(secret);
  assert.notStrictEqual(encrypted, secret);
  
  const decrypted = ObriveSecurity.decryptCredential(encrypted);
  assert.strictEqual(decrypted, secret);
});

test('PublisherAgent respects DRY_RUN setting', async () => {
  // Save original env
  const originalDryRun = process.env.DRY_RUN;
  
  process.env.DRY_RUN = 'true';
  const agent = new PublisherAgent();
  assert.strictEqual(agent.isDryRun, true);
  
  // Restore
  process.env.DRY_RUN = originalDryRun;
});
