const BaseAdapter = require("./BaseAdapter");
const axios = require("axios");
const { isSafeUrl } = require("../utils/ssrf");

class WordpressRestAdapter extends BaseAdapter {
  constructor(credentials = {}) {
    super(credentials);
    // credentials should contain: baseUrl, username, appPassword
    this.baseUrl = credentials.baseUrl || process.env.OBLINK_WP_DEV_URL;
    this.username = credentials.username || process.env.OBLINK_WP_DEV_USERNAME;
    this.appPassword =
      credentials.appPassword || process.env.OBLINK_WP_DEV_APP_PASSWORD;

    if (this.baseUrl && this.baseUrl.endsWith("/")) {
      this.baseUrl = this.baseUrl.slice(0, -1);
    }
  }

  _getAuthHeader() {
    const token = Buffer.from(`${this.username}:${this.appPassword}`).toString(
      "base64",
    );
    return { Authorization: `Basic ${token}` };
  }

  async validateTarget(target) {
    if (!this.baseUrl.startsWith("https://")) {
      throw new Error("VALIDATION_FAILED: Target does not use HTTPS.");
    }

    if (!isSafeUrl(this.baseUrl)) {
      throw new Error(
        "VALIDATION_FAILED: Target URL is not safe (SSRF protection).",
      );
    }

    // 1. WP-JSON Discovery
    try {
      const res = await axios.get(`${this.baseUrl}/wp-json/`);
      if (res.status !== 200 || !res.data.routes) {
        throw new Error(
          "REST_API_UNAVAILABLE: /wp-json/ did not return a valid REST index.",
        );
      }
    } catch (err) {
      throw new Error(
        `REST_API_UNAVAILABLE: Failed to reach REST API. ${err.message}`,
      );
    }

    // 2. Authenticated Identity
    try {
      const meRes = await axios.get(`${this.baseUrl}/wp-json/wp/v2/users/me`, {
        headers: this._getAuthHeader(),
      });
      if (meRes.status !== 200 || !meRes.data.id) {
        throw new Error("AUTH_FAILED: Invalid authentication response.");
      }
    } catch (err) {
      throw new Error(`AUTH_FAILED: ${err.message}`);
    }

    // 3. Post Endpoint Availability (OPTIONS check as pre-flight)
    try {
      const optsRes = await axios.options(
        `${this.baseUrl}/wp-json/wp/v2/posts`,
        {
          headers: this._getAuthHeader(),
        },
      );
      const allowHeader = optsRes.headers.allow || "";
      if (!allowHeader.includes("POST")) {
        throw new Error(
          "PERMISSION_DENIED: User does not have capability to POST to /wp/v2/posts.",
        );
      }
    } catch (err) {
      throw new Error(
        `PERMISSION_DENIED: Failed to verify post endpoint capabilities. ${err.message}`,
      );
    }

    return true;
  }

  async authenticate() {
    // Actually we verified auth in validateTarget, but let's do a quick me check
    try {
      const meRes = await axios.get(`${this.baseUrl}/wp-json/wp/v2/users/me`, {
        headers: this._getAuthHeader(),
      });
      return meRes.data;
    } catch (err) {
      throw new Error(`AUTH_FAILED: ${err.message}`);
    }
  }

  async publish(content, metadata = {}) {
    // metadata might contain target_id or job_id for idempotency
    const title = content.title || "Untitled Post";
    const body = content.body || "";

    // Idempotency: Safe duplicate detection (Check by exact title to prevent double posting on timeout)
    try {
      const searchRes = await axios.get(
        `${this.baseUrl}/wp-json/wp/v2/posts?search=${encodeURIComponent(title)}`,
        {
          headers: this._getAuthHeader(),
        },
      );

      const duplicates = searchRes.data.filter(
        (p) => p.title.rendered === title,
      );
      if (duplicates.length > 0) {
        const error = new Error(
          `DUPLICATE_DETECTED: A post with title "${title}" already exists (ID: ${duplicates[0].id}).`,
        );
        error.duplicateId = duplicates[0].id.toString();
        error.duplicateUrl = duplicates[0].link;
        throw error;
      }
    } catch (err) {
      if (err.message.includes("DUPLICATE_DETECTED")) throw err;
      // otherwise, search might fail, proceed carefully
    }

    // Publish the post
    try {
      const payload = {
        title: title,
        content: body,
        status: content.isDraft ? "draft" : "publish",
      };

      const postRes = await axios.post(
        `${this.baseUrl}/wp-json/wp/v2/posts`,
        payload,
        {
          headers: {
            ...this._getAuthHeader(),
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 seconds timeout
        },
      );

      if (postRes.status === 201) {
        return {
          externalPostId: postRes.data.id.toString(),
          externalUrl: postRes.data.link,
        };
      } else {
        throw new Error(
          `PUBLISH_FAILED: Unexpected status code ${postRes.status}`,
        );
      }
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        throw new Error(
          "PUBLISH_TIMEOUT: Request timed out during publishing.",
        );
      }
      throw new Error(`PUBLISH_FAILED: ${err.message}`);
    }
  }

  async verifyPublication(result, content) {
    if (!result || !result.externalUrl) {
      throw new Error("VERIFICATION_FAILED: No external URL provided.");
    }

    if (!result.externalUrl.startsWith("https://")) {
      throw new Error("VERIFICATION_FAILED: Published URL does not use HTTPS.");
    }

    if (!isSafeUrl(result.externalUrl)) {
      throw new Error(
        "VERIFICATION_FAILED: Published URL is not safe (SSRF protection).",
      );
    }

    try {
      const res = await axios.get(result.externalUrl, {
        timeout: 10000,
        headers: {
          "User-Agent": "node-fetch/1.0 OBLINK-Verifier (+https://obrive.com)",
        },
      });
      if (res.status !== 200) {
        throw new Error(`VERIFICATION_FAILED: HTTP status ${res.status}`);
      }

      const html = res.data;

      // Verify Title exists in the HTML
      // (Rendered titles might have encoded entities, so we do a basic check)
      const cleanTitle = content.title.replace(/[^\w\s]/gi, ""); // alphanumeric only
      const words = cleanTitle.split(" ").filter((w) => w.length > 3);

      let titleFound = false;
      for (let word of words) {
        if (html.includes(word)) {
          titleFound = true;
          break;
        }
      }

      if (!titleFound) {
        throw new Error(
          "VERIFICATION_FAILED: Expected title words not found in the live page.",
        );
      }

      // If there's an expected anchor/backlink, check if obrive.com is present
      if (!html.includes("obrive.com")) {
        throw new Error(
          "VERIFICATION_FAILED: Expected backlink marker (obrive.com) not found on live page.",
        );
      }

      return true;
    } catch (err) {
      throw new Error(`VERIFICATION_FAILED: ${err.message}`);
    }
  }

  async reconcile(externalPostId) {
    if (!externalPostId) {
      throw new Error("RECONCILE_FAILED: No external post ID provided.");
    }

    try {
      const res = await axios.get(
        `${this.baseUrl}/wp-json/wp/v2/posts/${externalPostId}`,
        {
          headers: this._getAuthHeader(),
          timeout: 10000,
        },
      );

      if (res.status === 200 && res.data && res.data.link) {
        return {
          externalPostId: res.data.id.toString(),
          externalUrl: res.data.link,
          title: res.data.title.rendered,
        };
      } else {
        return null;
      }
    } catch (err) {
      // Definitive authenticated 404 (Missing)
      if (err.response && err.response.status === 404) {
        return null;
      }

      // Any other error (401, 403, 429, 5xx, timeout, network error) must be inconclusive
      let statusStr = "NETWORK_ERROR";
      if (err.response && err.response.status) {
        statusStr = `HTTP_${err.response.status}`;
      } else if (err.code === "ECONNABORTED") {
        statusStr = "TIMEOUT";
      }

      const error = new Error(
        `RECONCILIATION_INCONCLUSIVE: Failed to verify status of post ${externalPostId} via API. Reason: ${statusStr}. ${err.message}`,
      );
      error.code = "RECONCILIATION_INCONCLUSIVE";
      throw error;
    }
  }
}

module.exports = WordpressRestAdapter;
