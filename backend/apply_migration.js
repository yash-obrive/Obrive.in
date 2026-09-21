const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Applying migration safely...");
  await prisma.$executeRawUnsafe(`
    CREATE TABLE "payment_orders" (
        "id" SERIAL NOT NULL,
        "packageId" VARCHAR(100) NOT NULL,
        "packageName" VARCHAR(255) NOT NULL,
        "amount" INTEGER NOT NULL,
        "currency" VARCHAR(10) NOT NULL DEFAULT 'INR',
        "razorpayOrderId" VARCHAR(255) NOT NULL,
        "razorpayPaymentId" VARCHAR(255),
        "status" VARCHAR(50) NOT NULL DEFAULT 'CREATED',
        "customerName" VARCHAR(255),
        "customerEmail" VARCHAR(255),
        "customerPhone" VARCHAR(50),
        "company" VARCHAR(255),
        "gst" VARCHAR(50),
        "address" TEXT,
        "customerEmailSentAt" TIMESTAMP(3),
        "adminEmailSentAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(6) NOT NULL,

        CONSTRAINT "payment_orders_pkey" PRIMARY KEY ("id")
    );
  `);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "payment_orders_razorpayOrderId_key" ON "payment_orders"("razorpayOrderId");`);
  await prisma.$executeRawUnsafe(`CREATE UNIQUE INDEX "payment_orders_razorpayPaymentId_key" ON "payment_orders"("razorpayPaymentId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX "payment_orders_razorpayOrderId_idx" ON "payment_orders"("razorpayOrderId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX "payment_orders_razorpayPaymentId_idx" ON "payment_orders"("razorpayPaymentId");`);
  await prisma.$executeRawUnsafe(`CREATE INDEX "payment_orders_status_idx" ON "payment_orders"("status");`);
  console.log("Migration completed successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
