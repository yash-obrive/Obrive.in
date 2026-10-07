/**
 * PublisherAdapter Interface
 *
 * Base class for all OBLINK AI publishing adapters.
 * Implementations must ONLY override methods they legitimately support.
 * Do NOT fake unsupported methods.
 */
class PublisherAdapter {
  constructor(accountConfig) {
    this.accountConfig = accountConfig; // e.g., domain, credentials
  }

  /**
   * Discovers URLs or opportunities specific to this platform.
   */
  async discover() {
    throw new Error("discover() not supported on this adapter.");
  }

  /**
   * Authenticates with the platform.
   * Resolves if successful, throws if blocked or credentials invalid.
   */
  async authenticate() {
    throw new Error("authenticate() not supported on this adapter.");
  }

  /**
   * Validates if the current session or API token has the necessary access.
   */
  async validateAccess() {
    throw new Error("validateAccess() not supported on this adapter.");
  }

  /**
   * Creates a profile or entity on the platform.
   */
  async createProfile(data) {
    throw new Error("createProfile() not supported on this adapter.");
  }

  /**
   * Updates an existing profile or entity.
   */
  async updateProfile(data) {
    throw new Error("updateProfile() not supported on this adapter.");
  }

  /**
   * Prepares or formats content specific to the platform requirements.
   */
  async createContent(data) {
    throw new Error("createContent() not supported on this adapter.");
  }

  /**
   * Publishes the content and backlink.
   * Should return the published URL upon success.
   */
  async publish(content) {
    throw new Error("publish() not supported on this adapter.");
  }

  /**
   * Verifies if a specific link exists at the target URL.
   */
  async verify(url, obriveUrl) {
    throw new Error("verify() not supported on this adapter.");
  }
}

module.exports = PublisherAdapter;
