"use client";

import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { apiFetch } from "@/lib/api";
import FONTS from "@/assets/fonts";
import {
  PRICING_STREAMS,
  type PricingPackage,
} from "@/constants/pages/pricingData";

// Razorpay types
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: { color?: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpaySuccessResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First Name is required"),
  lastName: z.string().min(2, "Last Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  company: z.string().optional(),
  gst: z.string().optional(),
  address: z.string().min(10, "Billing address is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type SubmitState =
  | "idle"
  | "creating-order"
  | "payment-open"
  | "verifying"
  | "success"
  | "error"
  | "dismissed";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [packageDetails, setPackageDetails] = useState<PricingPackage | null>(
    null,
  );
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    gst: "",
    address: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutFormData, string>>
  >({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");

  // Server-returned financial breakdown — populated after create-order succeeds.
  // ALL display values come from here; client never recalculates amounts.
  const [breakdown, setBreakdown] = useState<{
    baseAmount: number;
    serviceGst: number;
    gatewayFee: number;
    gatewayFeeGst: number;
    gatewayCharges: number;
    totalAmount: number;
  } | null>(null);

  useEffect(() => {
    if (serviceParam) {
      let foundPkg: PricingPackage | null = null;
      for (const stream of PRICING_STREAMS) {
        const pkg = stream.packages.find((p) => p.id === serviceParam);
        if (pkg) {
          foundPkg = pkg;
          break;
        }
      }
      setPackageDetails(foundPkg);
    }
  }, [serviceParam]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const formatINR = (rupees: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(rupees);

  // Preview breakdown shown before server responds (from frontend pricing data, in rupees).
  // These are for display only — Razorpay uses the server-authoritative totalAmount.
  const previewGst = packageDetails ? Math.round(packageDetails.priceINR * 1800 / 10000) : 0;
  const previewGatewayFee = packageDetails ? Math.round(packageDetails.priceINR * 200 / 10000) : 0;
  const previewGatewayFeeGst = Math.round(previewGatewayFee * 1800 / 10000);
  const previewTotal = packageDetails
    ? packageDetails.priceINR + previewGst + previewGatewayFee + previewGatewayFeeGst
    : 0;

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setErrorMessage("");

    // Validate form
    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof CheckoutFormData] = issue.message;
        }
      });
      setErrors(newErrors);
      return;
    }
    setErrors({});

    if (!packageDetails) {
      setErrorMessage("No package selected.");
      return;
    }

    // Step 1: Load Razorpay script
    setSubmitState("creating-order");
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setSubmitState("error");
      setErrorMessage(
        "Failed to load payment gateway. Please check your connection.",
      );
      return;
    }

    // Step 2: Create order on server
    let orderId: string;
    let orderAmount: number;
    try {
      const res = await apiFetch("/payments/create-order", {
        method: "POST",
        body: JSON.stringify({
          packageId: packageDetails.id,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          company: formData.company || "",
          gst: formData.gst || "",
          address: formData.address || "",
        }),
      });

      const order = await res.json();

      if (!res.ok || order.error) {
        throw new Error(order.error || "Could not create payment order");
      }

      orderId = order.orderId;
      orderAmount = order.totalAmount; // Use server-calculated total — not client value

      // Store server breakdown for display — client does NOT recalculate
      setBreakdown({
        baseAmount:     order.baseAmount,
        serviceGst:     order.serviceGst,
        gatewayFee:     order.gatewayFee,
        gatewayFeeGst:  order.gatewayFeeGst,
        gatewayCharges: order.gatewayCharges,
        totalAmount:    order.totalAmount,
      });
    } catch (err) {
      setSubmitState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Failed to initiate payment. Please try again.",
      );
      return;
    }

    // Step 3: Open Razorpay modal
    setSubmitState("payment-open");

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";

    const options: RazorpayOptions = {
      key: razorpayKey,
      amount: orderAmount,
      currency: "INR",
      name: "Obrive Industries",
      description: packageDetails.name,
      order_id: orderId,
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone,
      },
      notes: {
        service: packageDetails.name,
        company: formData.company || "",
        gst: formData.gst || "",
        address: formData.address,
      },
      theme: { color: "#073933" },
      handler: async (response: RazorpaySuccessResponse) => {
        setSubmitState("verifying");
        // Step 4: Verify payment signature
        try {
          const verifyRes = await apiFetch("/payments/verify", {
            method: "POST",
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setPaymentId(response.razorpay_payment_id);
            setSubmitState("success");
          } else {
            throw new Error(verifyData.error || "Verification failed");
          }
        } catch (err) {
          setSubmitState("error");
          setErrorMessage(
            err instanceof Error
              ? err.message
              : "Payment verification failed. Please contact support.",
          );
        }
      },
      modal: {
        ondismiss: () => {
          setSubmitState("dismissed");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const isProcessing =
    submitState === "creating-order" ||
    submitState === "payment-open" ||
    submitState === "verifying";

  const buttonLabel = () => {
    switch (submitState) {
      case "creating-order":
        return "Creating Order...";
      case "payment-open":
      case "verifying":
        return "Processing Payment...";
      default:
        return "Proceed to Payment →";
    }
  };

  // Success screen
  if (submitState === "success") {
    return (
      <section className="bg-white py-16 md:py-24 relative z-10 -mt-10 rounded-t-[32px]">
        <div className="max-w-[640px] mx-auto px-6 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#073933]/10 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#073933]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2
            className={`${FONTS.microgrammaBold.className} text-3xl text-primary mb-4`}
          >
            Payment Successful
          </h2>
          <p className="text-primary/70 mb-2">
            Thank you! Your payment has been confirmed and your service scope
            has been initiated.
          </p>
          {paymentId && (
            <p className="text-primary/50 text-xs mt-4 font-mono">
              Payment ID: {paymentId}
            </p>
          )}
          <p className="text-primary/60 text-sm mt-6">
            You will receive a confirmation email at{" "}
            <span className="font-semibold text-primary">{formData.email}</span>{" "}
            shortly. Our team will be in touch within 1 business day.
          </p>
          <a
            href="/servicecharges"
            className="mt-8 inline-block text-sm text-primary/60 underline hover:text-primary transition-colors"
          >
            ← Back to Pricing
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24 relative z-10 -mt-10 rounded-t-[32px]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h2
              className={`${FONTS.microgrammaBold.className} text-2xl text-primary mb-2`}
            >
              Billing Details
            </h2>
            <p className="text-primary/60 text-sm">
              Please enter your company and contact information for the invoice.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.firstName ? "border-red-500" : "border-primary/10 focus:border-primary/30"} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="John"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.lastName ? "border-red-500" : "border-primary/10 focus:border-primary/30"} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="Doe"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.email ? "border-red-500" : "border-primary/10 focus:border-primary/30"} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.phone ? "border-red-500" : "border-primary/10 focus:border-primary/30"} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors"
                  placeholder="Optional"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                  GST Number
                </label>
                <input
                  type="text"
                  name="gst"
                  value={formData.gst}
                  onChange={handleChange}
                  className="w-full bg-primary/5 border border-primary/10 focus:border-primary/30 rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">
                Billing Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full bg-primary/5 border ${errors.address ? "border-red-500" : "border-primary/10 focus:border-primary/30"} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors resize-none`}
                placeholder="Full billing address for the invoice"
              />
              {errors.address && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.address}
                </span>
              )}
            </div>

            {/* Desktop Pay Button */}
            <div className="hidden lg:block pt-4 border-t border-primary/10">
              <button
                type="submit"
                disabled={isProcessing || !packageDetails}
                className="w-full relative group overflow-hidden rounded-full px-8 py-4 bg-primary text-white font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                <span className="relative flex items-center justify-center gap-2">
                  {isProcessing && (
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      />
                    </svg>
                  )}
                  {buttonLabel()}
                </span>
              </button>

              {/* Razorpay badge */}
              <div className="flex items-center justify-center gap-2 mt-3 text-primary/40 text-xs">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secured by Razorpay · 256-bit SSL
              </div>

              {/* Status messages */}
              {submitState === "dismissed" && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                  Payment window was closed. You can try again when ready.
                </div>
              )}
              {submitState === "error" && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {errorMessage || "An error occurred. Please try again."}
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-8 md:p-10 sticky top-32">
            <h2
              className={`${FONTS.microgrammaBold.className} text-xl text-primary mb-8`}
            >
              Order Summary
            </h2>

            {!packageDetails ? (
              <div className="text-primary/60 text-sm">
                No service package selected.{" "}
                <a href="/servicecharges" className="underline text-primary">
                  Return to pricing
                </a>{" "}
                to select a package.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-1">
                    {packageDetails.category}
                  </div>
                  <div className="text-xl font-bold text-primary">
                    {packageDetails.name}
                  </div>
                  <div className="text-primary/70 text-sm mt-2">
                    {packageDetails.description}
                  </div>
                </div>

                <div className="h-px w-full bg-primary/10" />

                {/* Financial breakdown — always uses server-returned values when available */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-primary/80">
                    <span>Service Price ({packageDetails.isMonthly ? "Monthly" : "One-time"})</span>
                    <span className="font-bold">
                      {breakdown
                        ? formatINR(breakdown.baseAmount / 100)
                        : formatINR(packageDetails.priceINR)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-primary/80">
                    <span>GST on Service @ 18%</span>
                    <span className="font-bold">
                      {breakdown
                        ? formatINR(breakdown.serviceGst / 100)
                        : formatINR(previewGst)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-primary/70 text-xs mt-2 pt-2 border-t border-primary/5">
                    <span>Payment Gateway Fee @ 2%</span>
                    <span className="font-medium">
                      {breakdown
                        ? formatINR(breakdown.gatewayFee / 100)
                        : formatINR(previewGatewayFee)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-primary/70 text-xs">
                    <span>GST on Gateway Fee @ 18%</span>
                    <span className="font-medium">
                      {breakdown
                        ? formatINR(breakdown.gatewayFeeGst / 100)
                        : formatINR(previewGatewayFeeGst)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-primary/60 text-xs pb-2 border-b border-primary/5">
                    <span>Payment Gateway Charges</span>
                    <span className="font-medium">
                      {breakdown
                        ? formatINR(breakdown.gatewayCharges / 100)
                        : formatINR(previewGatewayFee + previewGatewayFeeGst)}
                    </span>
                  </div>
                </div>

                <div className="h-px w-full bg-primary/10" />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary uppercase text-sm">
                    Total Payable
                  </span>
                  <span
                    className={`${FONTS.microgrammaBold.className} text-2xl text-primary`}
                  >
                    {breakdown
                      ? formatINR(breakdown.totalAmount / 100)
                      : formatINR(previewTotal)}
                  </span>
                </div>

                <div className="pt-2 pb-2">
                  <ul className="space-y-3">
                    {packageDetails.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-4 h-4 mt-0.5 text-accent shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-primary/70 text-xs sm:text-sm">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Pay Button */}
                <div className="lg:hidden pt-4 border-t border-primary/10">
                  <button
                    onClick={() => handleSubmit()}
                    disabled={isProcessing}
                    className="w-full relative group overflow-hidden rounded-full px-8 py-4 bg-primary text-white font-bold transition-all disabled:opacity-60"
                  >
                    <div className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                    <span className="relative flex items-center justify-center gap-2">
                      {isProcessing && (
                        <svg
                          className="animate-spin w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                      )}
                      {buttonLabel()}
                    </span>
                  </button>

                  {submitState === "dismissed" && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                      Payment window was closed. You can try again when ready.
                    </div>
                  )}
                  {submitState === "error" && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {errorMessage || "An error occurred. Please try again."}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2 text-primary/50 text-xs">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secured by Razorpay · 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
