const PublisherAdapter = require("./PublisherAdapter");
const { safeFetch } = require("../utils/ssrf");

/**
 * MediumAdapter
 * STATUS: NOT_SUPPORTED_FOR_AUTONOMOUS_AI_PUBLISHING
 * Reason: Medium is no longer issuing new integration tokens. API Terms strictly restrict automated, generated content.
 * Kept strictly for future research/reference.
 */
class MediumAdapter extends PublisherAdapter {
  constructor(accountConfig) {
    super(accountConfig);
    this.apiEndpoint = "https://api.medium.com/v1";
    this.integrationToken = accountConfig.encrypted_credentials; // Handled dynamically in worker after decryption
    this.authorId = null;
  }

  async authenticate() {
    if (!this.integrationToken) {
      throw new Error(
        "Medium integration token is missing. Cannot authenticate.",
      );
    }

    // Fetch the author ID using the token
    const response = await safeFetch(`${this.apiEndpoint}/me`, {
      headers: { Authorization: `Bearer ${this.integrationToken}` },
    }).catch(() => null);

    if (!response || !response.ok) {
      throw new Error("Invalid Medium integration token.");
    }

    const data = await response.json();
    this.authorId = data.data.id;
    return true;
  }

  async validateAccess() {
    return this.authorId !== null;
  }

  async createContent(data) {
    if (!data.obriveUrl || !data.factualContext) {
      throw new Error(
        "Missing required knowledge brain data for content generation.",
      );
    }

    return {
      title: data.title || "Industry Insights and Trends",
      contentFormat: "html",
      content: `<h1>${data.title}</h1><p>${data.factualContext}</p><p>For more information, visit <a href="${data.obriveUrl}">${data.anchor || "Obrive Solutions"}</a>.</p>`,
      tags: data.tags || ["technology", "business"],
      publishStatus: "public", // Options: public, draft, unlisted
    };
  }

  async publish(content) {
    // 🛑 HARD BLOCK: Medium is explicitly unsupported for autonomous AI publishing due to API Terms.
    throw new Error(
      "NOT_SUPPORTED_FOR_AUTONOMOUS_AI_PUBLISHING: Medium restricts automated content generation and new integration tokens.",
    );

    if (!this.authorId) await this.authenticate();

    console.log(
      `[MediumAdapter] Publishing to Medium as Author ${this.authorId}...`,
    );

    const response = await safeFetch(
      `${this.apiEndpoint}/users/${this.authorId}/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.integrationToken}`,
        },
        body: JSON.stringify(content),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to publish on Medium: ${response.status} ${errorText}`,
      );
    }

    const result = await response.json();
    return result.data.url;
  }

  async verify(url, obriveUrl) {
    const response = await safeFetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const html = await response.text();
    if (!html.includes(obriveUrl)) {
      throw new Error("Obrive URL not found in the published page HTML.");
    }
    return true;
  }
}

module.exports = MediumAdapter;
