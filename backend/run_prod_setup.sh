#!/bin/bash
export DATABASE_URL="YOUR_DATABASE_URL"
export AI_DASHBOARD_PASSWORD="YOUR_PASSWORD"

echo "Provisioning OBLINK AI user in production database..."
node setup_ai_user.js
