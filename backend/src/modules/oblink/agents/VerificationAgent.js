const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Link Verification Crawler
 * Periodically verifies if published links exist and their rel attributes.
 */
class VerificationAgent {
  constructor() {}

  async verifyLink(targetId) {
    const target = await prisma.oblink_targets.findUnique({
      where: { id: targetId },
      include: { links: { orderBy: { created_at: "desc" }, take: 1 } },
    });

    if (!target || !target.links || target.links.length === 0) return;

    const linkRecord = target.links[0];
    let httpStatus = null;
    let found = false;
    let newStatus = "BROKEN";

    try {
      const { safeFetch } = require("../utils/ssrf");
      const response = await safeFetch(linkRecord.publisher_url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      httpStatus = response.status;

      if (response.ok) {
        const html = await response.text();
        // Naive check: Does the target page contain the Obrive URL?
        // In a real implementation, use cheerio to parse HTML and verify href and rel attrs.
        if (html.includes(linkRecord.obrive_url)) {
          found = true;
          newStatus = "VERIFIED";
        } else {
          newStatus = "REMOVED";
        }
      } else if (response.status === 403 || response.status === 401) {
        newStatus = "MANUAL_ACTION_REQUIRED";
        console.log(
          "[VerificationAgent] Blocked by bot protection. Manual verification required.",
        );
      }

      await prisma.oblink_link_checks.create({
        data: {
          link_id: linkRecord.id,
          status: newStatus,
          http_status: httpStatus,
        },
      });

      await prisma.oblink_links.update({
        where: { id: linkRecord.id },
        data: {
          status: newStatus,
          last_verified: new Date(),
        },
      });

      console.log(
        `[VerificationAgent] Target ${targetId} verified. Status: ${newStatus}`,
      );
    } catch (error) {
      console.error(
        `[VerificationAgent] Failed to fetch ${linkRecord.publisher_url}:`,
        error.message,
      );
      await prisma.oblink_link_checks.create({
        data: {
          link_id: linkRecord.id,
          status: "ERROR",
          http_status: null,
        },
      });
    }
  }
}

module.exports = VerificationAgent;
