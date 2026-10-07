const url = require("url");

/**
 * Validates a URL to prevent SSRF vulnerabilities.
 * Blocks access to localhost, 127.x.x.x, 10.x.x.x, 192.168.x.x, and 169.254.x.x.
 * Note: A robust implementation in production should use DNS resolution to catch rebinding.
 */
function isSafeUrl(targetUrl) {
  try {
    const parsed = new url.URL(targetUrl);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
      return false;

    const hostname = parsed.hostname.toLowerCase();

    if (
      hostname === "localhost" ||
      hostname.startsWith("127.") ||
      hostname.startsWith("169.254.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      hostname === "0.0.0.0"
    ) {
      return false;
    }

    // Check 172.16.0.0/12
    if (hostname.startsWith("172.")) {
      const secondOctet = parseInt(hostname.split(".")[1]);
      if (secondOctet >= 16 && secondOctet <= 31) return false;
    }

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Fetch wrapper that enforces SSRF protection.
 */
async function safeFetch(targetUrl, options = {}) {
  if (!isSafeUrl(targetUrl)) {
    throw new Error(
      `SSRF Prevention: Access to internal/private network target blocked (${targetUrl})`,
    );
  }
  return fetch(targetUrl, options);
}

module.exports = { isSafeUrl, safeFetch };
