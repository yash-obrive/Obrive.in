# OBLINK Publisher Capability Audit

This document tracks candidate publishing platforms and rigorously evaluates their technical and legal capacity to support autonomous, generated-content publishing for OBLINK AI.

> [!CAUTION]
> Do NOT mark a platform `SUPPORTED` based solely on the existence of a REST API. The platform MUST explicitly authorize automated content generation, and we must hold a verified authorized account.

---

## 1. Medium

- **Platform**: Medium.com
- **API Available**: Yes (Official REST API)
- **Publishing API Available**: Yes
- **Automated content publishing allowed**: **NO** (Strictly forbidden by current API terms for AI-generated bulk posting)
- **Browser automation allowed**: No
- **Authorization required**: Yes (Integration Token)
- **Authorization obtained**: No (Medium is no longer issuing new integration tokens)
- **Terms reviewed**: Yes
- **Status**: **NOT_SUPPORTED_FOR_AUTONOMOUS_AI_PUBLISHING**
- **Reason**: API Terms forbid automated AI-generated posts, and new tokens are deprecated.
- **Official documentation**: [Medium API Docs](https://github.com/Medium/medium-api-docs)

---

## 2. WordPress (Self-Hosted / Managed)

- **Platform**: WordPress (REST API)
- **API Available**: Yes (WP REST API v2)
- **Publishing API Available**: Yes
- **Automated content publishing allowed**: Yes (As long as we own the installation)
- **Browser automation allowed**: N/A (API is sufficient)
- **Authorization required**: Yes (Application Passwords or JWT)
- **Authorization obtained**: Pending identification of an Obrive-owned instance.
- **Terms reviewed**: Yes (Open Source / Self-Hosted means we control terms).
- **Status**: **CANDIDATE**
- **Reason**: Full ownership implies we can legitimately automate this property without violating third-party TOS.
- **Official documentation**: [WP REST API](https://developer.wordpress.org/rest-api/)

---

## 3. LinkedIn (Company Page)

- **Platform**: LinkedIn
- **API Available**: Yes (LinkedIn Marketing Developer Platform)
- **Publishing API Available**: Yes (UGC Posts API)
- **Automated content publishing allowed**: Yes (for verified marketing partners)
- **Browser automation allowed**: **NO** (Aggressively blocked and against TOS)
- **Authorization required**: Yes (OAuth 2.0 with strict scopes)
- **Authorization obtained**: No
- **Terms reviewed**: Yes
- **Status**: **BLOCKED_REQUIRES_APPROVAL**
- **Reason**: Legitimate API access requires lengthy LinkedIn Partner Program approval. Browser automation is actively banned and will cause account termination.
- **Official documentation**: [LinkedIn Share API](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/ugc-post-api)

---

## 4. Clutch.co

- **Platform**: Clutch
- **API Available**: No public automated publishing API.
- **Publishing API Available**: No
- **Automated content publishing allowed**: No
- **Browser automation allowed**: No (Likely protected by Cloudflare/CAPTCHA)
- **Authorization required**: Yes
- **Authorization obtained**: No
- **Terms reviewed**: Yes
- **Status**: **MANUAL_ACTION_REQUIRED**
- **Reason**: Lacks official API. Bypassing bot protections is strictly forbidden by OBLINK rules.

---

## Conclusion & Next Steps
- **Medium** is disabled.
- **WordPress** is the most viable candidate for the first external integration, provided Obrive controls a target WP installation.
- No other platform will be integrated until strict API permissions are granted directly to the Obrive organization.
