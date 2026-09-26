# Razorpay Integration Setup

This document details the architecture and setup required for Obrive's one-time payment integration.

## Architecture

- **Frontend**: Next.js App Router (`src/app/(public)/checkout/components/CheckoutForm.tsx`) handles the UI and initiates Razorpay Checkout. It calls the backend via `apiFetch('/payments/create-order')`.
- **Backend**: Express API (`backend/src/modules/payments/`) securely calculates prices from the single source of truth, and interfaces with Razorpay.
- **Source of Truth**: `backend/src/utils/pricing.js` maintains authoritative prices. Frontend amounts are strictly ignored.
- **Database**: PostgreSQL / Prisma (`PaymentOrder`).

**DATABASE REQUIRED FOR PAYMENT:**
YES

**DATABASE REQUIRED FOR OTHER BACKEND MODULES:**
YES / AS APPLICABLE

**Payment architecture:**
Razorpay
→ PostgreSQL/Prisma
→ Brevo
→ customer + admin emails

## Environment Variables

### Frontend (`.env.local` or Next.js environment)
```env
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
```

### Backend (`backend/.env` or Express environment)
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_WEBHOOK_SECRET
BREVO_API_KEY=YOUR_BREVO_KEY
BREVO_SENDER_EMAIL=no-reply@obrive.in
BREVO_SENDER_NAME="Obrive Payments"
PAYMENT_NOTIFICATION_EMAIL=account@obrive.com
```
*Note: Never expose the Key Secret, Webhook Secret, or Brevo API Key to the frontend. Never commit real credentials to Git.*

## Webhook Setup

1. Go to the Razorpay Dashboard -> Settings -> Webhooks.
2. Click **Add New Webhook**.
3. Set the Webhook URL to: `https://api.yourdomain.com/api/payments/webhook`
4. Set the Secret to your `RAZORPAY_WEBHOOK_SECRET`.
5. Select the following events:
   - `order.paid`
   - `payment.captured`
   - `payment.failed`

## Payment Flow

1. User selects a package and fills billing details.
2. Frontend requests `/api/payments/create-order` with the `packageId`.
3. Backend resolves price, creates an order via Razorpay API, and creates a `PaymentOrder` in the DB with status `CREATED`.
4. Frontend opens Razorpay Checkout modal.
5. Upon successful checkout, frontend requests `/api/payments/verify` with the signature.
6. Backend verifies the signature using HMAC SHA256.
7. Backend updates `PaymentOrder` to `AUTHORIZED`.
8. Backend triggers Brevo confirmation emails to the customer and admin (if not already sent).
9. Webhook asynchronously receives `payment.captured`. Updates DB to `CAPTURED` and triggers emails if the verify step missed them.

## Failure Handling
- Webhook `payment.failed` updates DB to `FAILED`.
- Payment verification failure (invalid signature) rejects the payment completely.
- Email failure will not revert a verified payment, logging the failure instead.

## Security Rules
1. Never trust the frontend amount.
2. Webhook endpoints must verify the HMAC SHA256 signature using `RAZORPAY_WEBHOOK_SECRET`.
3. Payment confirmation emails strictly rely on verified backend success.
4. Idempotency is durably persisted using the `PaymentOrder` database model.
