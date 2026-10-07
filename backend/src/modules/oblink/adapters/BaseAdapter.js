/**
 * BaseAdapter
 *
 * Strict abstract base class for all OBLINK Publishing Adapters.
 * Enforces validation, authentication, and idempotency logic.
 */
class BaseAdapter {
  constructor(credentials = {}) {
    this.credentials = credentials;
  }

  /**
   * Ensure target platform supports publishing, uses HTTPS, and endpoints are reachable.
   * @param {Object} target The oblink_target DB object
   * @throws Error if validation fails
   */
  async validateTarget(target) {
    throw new Error("validateTarget() must be implemented by adapter");
  }

  /**
   * Verify authenticated identity and ensure post-creation permissions exist.
   * @throws Error if authentication or permissions fail
   */
  async authenticate() {
    throw new Error("authenticate() must be implemented by adapter");
  }

  /**
   * Safely publish the content. Must check idempotency before publishing.
   * @param {Object} content { title, body, excerpt, tags, categories, isDraft }
   * @param {Object} metadata Optional OBLINK meta tracking parameters
   * @returns {Object} { externalPostId, externalUrl }
   */
  async publish(content, metadata) {
    throw new Error("publish() must be implemented by adapter");
  }

  /**
   * Safely verify the live external URL via HTTPS GET.
   * @param {Object} result The publish() result { externalPostId, externalUrl }
   * @param {Object} content Expected content to verify
   * @returns {Boolean} true if successfully verified, throws Error otherwise
   */
  async verifyPublication(result, content) {
    throw new Error("verifyPublication() must be implemented by adapter");
  }

  /**
   * Safely clean up any resources (browser, connection, sessions).
   */
  async cleanup() {
    // Override if resources need cleaning
  }
}

module.exports = BaseAdapter;
