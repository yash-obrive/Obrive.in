const PublisherAdapter = require("./PublisherAdapter");
const { safeFetch } = require("../utils/ssrf");

/**
 * OwnedSiteAdapter
 * Dedicated adapter for strictly controlled Obrive properties (e.g., obrive.com or internal blogs).
 */
class OwnedSiteAdapter extends PublisherAdapter {
  constructor(accountConfig) {
    super(accountConfig);
    this.targetPropertyUrl = process.env.OWNED_TEST_PROPERTY_URL;
    this.apiEndpoint = process.env.OWNED_TEST_PROPERTY_API;
    this.secretToken = process.env.OWNED_TEST_PROPERTY_SECRET;
  }

  async authenticate() {
    if (!this.targetPropertyUrl || !this.secretToken) {
      throw new Error(
        "Owned property configuration is missing. Cannot authenticate.",
      );
    }
    // Simulation of API token verification against the owned property
    if (this.secretToken !== "VALID_TEST_SECRET") {
      throw new Error("Invalid authentication token for owned property.");
    }
    return true;
  }

  async validateAccess() {
    // Check if the property is still accepting automated content
    const response = await safeFetch(`${this.apiEndpoint}/status`, {
      headers: { Authorization: `Bearer ${this.secretToken}` },
    }).catch(() => null);

    if (!response || !response.ok) {
      throw new Error("Owned property is not accessible or access is denied.");
    }
    return true;
  }

  async createContent(data) {
    // Generate the exact factual payload required by the owned site API
    if (!data.obriveUrl || !data.factualContext) {
      throw new Error(
        "Missing required knowledge brain data for content generation.",
      );
    }

    return {
      title: "Automated Authority Verification Entry",
      body: `<p>${data.factualContext}</p><p>For more information, visit <a href="${data.obriveUrl}">${data.anchor || "Obrive Solutions"}</a>.</p>`,
      tags: ["verification", "system"],
    };
  }

  async publish(content) {
    if (process.env.DRY_RUN === "true") {
      throw new Error("publish() MUST NOT be called when DRY_RUN is true.");
    }

    console.log(`[OwnedSiteAdapter] Publishing to ${this.apiEndpoint}...`);

    const response = await safeFetch(`${this.apiEndpoint}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.secretToken}`,
      },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to publish on owned site: ${response.status} ${errorText}`,
      );
    }

    const result = await response.json();
    return result.publishedUrl; // e.g. https://test.obrive.com/posts/123
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

module.exports = OwnedSiteAdapter;
