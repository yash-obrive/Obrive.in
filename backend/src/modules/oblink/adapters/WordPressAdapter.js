const PublisherAdapter = require("./PublisherAdapter");
const { safeFetch } = require("../utils/ssrf");

/**
 * WordPressAdapter
 * Supports autonomous publishing to a WordPress site using the official REST API v2.
 * Requires WordPress Application Passwords for secure API authentication.
 */
class WordPressAdapter extends PublisherAdapter {
  constructor(accountConfig) {
    super(accountConfig);
    // Credentials and base URL from configuration (either process.env or DB)
    // process.env takes precedence for testing
    this.baseUrl = process.env.WORDPRESS_BASE_URL;
    this.username = process.env.WORDPRESS_API_USERNAME;

    // In production, this comes from the decrypted account config.
    // In test, it comes from environment.
    this.appPassword =
      process.env.WORDPRESS_APPLICATION_PASSWORD ||
      accountConfig?.encrypted_credentials;
  }

  get authHeader() {
    return (
      "Basic " +
      Buffer.from(`${this.username}:${this.appPassword}`).toString("base64")
    );
  }

  async authenticate() {
    if (!this.baseUrl || !this.username || !this.appPassword) {
      throw new Error(
        "WordPress configuration is incomplete. Missing URL, username, or application password.",
      );
    }

    // Attempt to hit the users/me endpoint to verify auth and get capabilities
    const response = await safeFetch(
      `${this.baseUrl}/wp-json/wp/v2/users/me?context=edit`,
      {
        headers: { Authorization: this.authHeader },
      },
    ).catch((err) => {
      throw new Error(`Network error connecting to WordPress: ${err.message}`);
    });

    if (!response.ok) {
      throw new Error(
        `WordPress authentication failed. HTTP ${response.status}`,
      );
    }

    const userData = await response.json();
    return userData;
  }

  async validateAccess() {
    const userData = await this.authenticate();

    // Check if the user has publishing capabilities.
    // In WordPress REST API, user capabilities are returned in `capabilities` object.
    if (
      !userData.capabilities ||
      (!userData.capabilities.publish_posts &&
        !userData.capabilities.edit_posts)
    ) {
      throw new Error("WordPress account lacks publishing permissions.");
    }

    return true;
  }

  async createContent(data) {
    if (!data.obriveUrl || !data.factualContext) {
      throw new Error(
        "Missing required knowledge brain data for content generation.",
      );
    }

    const title = data.title || "Technical Verification Entry";
    const bodyHTML = `
      <p>${data.factualContext}</p>
      <p>Source reference: <a href="${data.obriveUrl}">${data.anchor || "Obrive"}</a>.</p>
    `;

    return {
      title: title,
      content: bodyHTML,
      status: "publish", // Or 'draft' depending on config
    };
  }

  async publish(content) {
    if (process.env.DRY_RUN === "true") {
      throw new Error("publish() MUST NOT be called when DRY_RUN is true.");
    }

    if (process.env.GLOBAL_PAUSE === "true") {
      throw new Error("publish() BLOCKED by GLOBAL_PAUSE kill switch.");
    }

    console.log(`[WordPressAdapter] Publishing content to ${this.baseUrl}...`);

    const response = await safeFetch(`${this.baseUrl}/wp-json/wp/v2/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.authHeader,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `WordPress publish failed: HTTP ${response.status} - ${errorText}`,
      );
    }

    const postData = await response.json();
    return postData.link; // The public URL of the post
  }

  async verify(url, obriveUrl) {
    const response = await safeFetch(url, {
      headers: { "User-Agent": "Obrive-Verification-Bot/1.0" },
    });
    if (!response.ok)
      throw new Error(`Verification fetch failed: HTTP ${response.status}`);

    const html = await response.text();
    if (!html.includes(obriveUrl)) {
      throw new Error("Obrive URL not found in the published page HTML.");
    }

    return true;
  }
}

module.exports = WordPressAdapter;
