const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getBoss } = require("../workers/queue");
const crypto = require("crypto");

/**
 * Target Discovery Agent
 * Scans for legitimate link opportunities using a legitimate Search/Discovery API.
 */
class DiscoveryAgent {
  constructor(config = {}) {
    this.searchProvider =
      config.searchProvider || process.env.DISCOVERY_SEARCH_PROVIDER || "MOCK";
    this.apiKey = process.env.DISCOVERY_API_KEY || "";
  }

  /**
   * Discover targets based on a query.
   */
  async discover(query, topic) {
    let urls = [];

    if (this.searchProvider === "SERPER") {
      urls = await this._discoverSerper(query);
    } else if (this.searchProvider === "MOCK") {
      console.log(`[DiscoveryAgent] MOCK mode discovering for query: ${query}`);
      urls = [
        `https://example.com/resources/${topic.replace(/\s+/g, "-")}`,
        `https://mock-partner-site.com/company-profiles/${crypto.randomBytes(4).toString("hex")}`,
      ];
    } else {
      throw new Error(`Unsupported search provider: ${this.searchProvider}`);
    }

    const newTargets = [];
    for (const url of urls) {
      const normalizedUrl = this._normalizeUrl(url);
      const domain = new URL(normalizedUrl).hostname;

      // Deduplication check
      const existing = await prisma.oblink_targets.findUnique({
        where: { url: normalizedUrl },
      });

      if (!existing) {
        const target = await prisma.oblink_targets.create({
          data: {
            domain,
            url: normalizedUrl,
            platform: "UNKNOWN",
            topic: topic,
            opportunity_type: "UNKNOWN",
            publishing_method: "UNKNOWN",
            target_status: "DISCOVERED",
          },
        });
        newTargets.push(target);

        // Queue analysis job
        const boss = getBoss();
        await boss.send("oblink.analysis", { targetId: target.id });
      }
    }

    return newTargets;
  }

  async _discoverSerper(query) {
    if (!this.apiKey) throw new Error("SERPER API KEY is missing.");
    const response = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query, num: 10 }),
    });
    const data = await response.json();
    return (data.organic || []).map((r) => r.link);
  }

  _normalizeUrl(urlStr) {
    try {
      const url = new URL(urlStr);
      url.hash = ""; // Remove hash
      // Could add standard query param removal for tracking params
      return url.toString();
    } catch (e) {
      return urlStr;
    }
  }
}

module.exports = DiscoveryAgent;
