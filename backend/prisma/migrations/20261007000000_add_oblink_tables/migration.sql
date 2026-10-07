-- CreateTable
CREATE TABLE "oblink_targets" (
    "id" SERIAL NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "url" TEXT NOT NULL,
    "platform" VARCHAR(100) NOT NULL,
    "country" VARCHAR(10),
    "language" VARCHAR(10),
    "topic" VARCHAR(255),
    "opportunity_type" VARCHAR(50) NOT NULL,
    "publishing_method" VARCHAR(50) NOT NULL,
    "api_supported" BOOLEAN NOT NULL DEFAULT false,
    "browser_supported" BOOLEAN NOT NULL DEFAULT false,
    "authorization_status" BOOLEAN NOT NULL DEFAULT false,
    "login_required" BOOLEAN NOT NULL DEFAULT false,
    "account_id" INTEGER,
    "target_page" TEXT,
    "relevance_score" DOUBLE PRECISION,
    "authority_score" DOUBLE PRECISION,
    "editorial_score" DOUBLE PRECISION,
    "spam_score" DOUBLE PRECISION,
    "overall_score" DOUBLE PRECISION,
    "target_status" VARCHAR(50) NOT NULL DEFAULT 'DISCOVERED',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "oblink_targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_publisher_capabilities" (
    "id" SERIAL NOT NULL,
    "platform" VARCHAR(100) NOT NULL,
    "api_supported" BOOLEAN NOT NULL DEFAULT false,
    "api_publish_supported" BOOLEAN NOT NULL DEFAULT false,
    "browser_publish_supported" BOOLEAN NOT NULL DEFAULT false,
    "authorization_required" BOOLEAN NOT NULL DEFAULT true,
    "authorization_verified" BOOLEAN NOT NULL DEFAULT false,
    "automation_allowed" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "documentation_url" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'NOT_SUPPORTED',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "oblink_publisher_capabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_publishing_accounts" (
    "id" SERIAL NOT NULL,
    "platform" VARCHAR(100) NOT NULL,
    "domain" VARCHAR(255) NOT NULL,
    "account_name" VARCHAR(255),
    "account_email" VARCHAR(255),
    "account_type" VARCHAR(50) NOT NULL,
    "authorization_status" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "encrypted_credentials" TEXT,
    "last_used" TIMESTAMP(6),
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "oblink_publishing_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_links" (
    "id" SERIAL NOT NULL,
    "target_id" INTEGER NOT NULL,
    "publisher_url" TEXT NOT NULL,
    "obrive_url" TEXT NOT NULL,
    "anchor" VARCHAR(255),
    "context" TEXT,
    "rel_attributes" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'PUBLISHED',
    "external_post_id" VARCHAR(255),
    "idempotency_key" VARCHAR(255),
    "first_seen" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_verified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "oblink_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_link_checks" (
    "id" SERIAL NOT NULL,
    "link_id" INTEGER NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "http_status" INTEGER,
    "raw_html_snapshot" TEXT,
    "checked_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oblink_link_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_agent_decisions" (
    "id" SERIAL NOT NULL,
    "target_id" INTEGER NOT NULL,
    "agent_name" VARCHAR(50) NOT NULL,
    "decision" VARCHAR(50) NOT NULL,
    "confidence" DOUBLE PRECISION,
    "reason" TEXT,
    "input_snapshot" JSONB,
    "output_snapshot" JSONB,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oblink_agent_decisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oblink_publishing_events" (
    "id" SERIAL NOT NULL,
    "target_id" INTEGER NOT NULL,
    "event_type" VARCHAR(50) NOT NULL,
    "details" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "oblink_publishing_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oblink_targets_url_key" ON "oblink_targets"("url");

-- CreateIndex
CREATE INDEX "oblink_targets_target_status_idx" ON "oblink_targets"("target_status");

-- CreateIndex
CREATE INDEX "oblink_targets_domain_idx" ON "oblink_targets"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "oblink_publisher_capabilities_platform_key" ON "oblink_publisher_capabilities"("platform");

-- AddForeignKey
ALTER TABLE "oblink_targets" ADD CONSTRAINT "oblink_targets_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "oblink_publishing_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oblink_links" ADD CONSTRAINT "oblink_links_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "oblink_targets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oblink_link_checks" ADD CONSTRAINT "oblink_link_checks_link_id_fkey" FOREIGN KEY ("link_id") REFERENCES "oblink_links"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oblink_agent_decisions" ADD CONSTRAINT "oblink_agent_decisions_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "oblink_targets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oblink_publishing_events" ADD CONSTRAINT "oblink_publishing_events_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "oblink_targets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

