"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import FONTS from "@/assets/fonts";
import { PRICING_STREAMS, PricingPackage } from "@/constants/pages/pricingData";
import AnimatedButton from "@/components/shared/buttons/AnimatedButton";

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

export default function CheckoutForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [packageDetails, setPackageDetails] = useState<PricingPackage | null>(null);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    gst: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "error" | "unconfigured">("idle");

  useEffect(() => {
    if (serviceParam) {
      let foundPkg: PricingPackage | null = null;
      for (const stream of PRICING_STREAMS) {
        const pkg = stream.packages.find(p => p.id === serviceParam);
        if (pkg) {
          foundPkg = pkg;
          break;
        }
      }
      setPackageDetails(foundPkg);
    }
  }, [serviceParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("idle");
    setIsSubmitting(true);

    const result = checkoutSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof CheckoutFormData] = issue.message;
        }
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});
      
    // Simulate Razorpay/Payment Network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitState("unconfigured"); 
    }, 1200);
  };

  const formatINR = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const gstAmount = packageDetails ? packageDetails.priceINR * 0.18 : 0;
  const totalAmount = packageDetails ? packageDetails.priceINR + gstAmount : 0;

  return (
    <section className="bg-white py-16 md:py-24 relative z-10 -mt-10 rounded-t-[32px]">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column - Form */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h2 className={`${FONTS.microgrammaBold.className} text-2xl text-primary mb-2`}>Billing Details</h2>
            <p className="text-primary/60 text-sm">Please enter your company and contact information for the invoice.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.firstName ? 'border-red-500' : 'border-primary/10 focus:border-primary/30'} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="John"
                />
                {errors.firstName && <span className="text-red-500 text-xs mt-1 block">{errors.firstName}</span>}
              </div>
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.lastName ? 'border-red-500' : 'border-primary/10 focus:border-primary/30'} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="Doe"
                />
                {errors.lastName && <span className="text-red-500 text-xs mt-1 block">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.email ? 'border-red-500' : 'border-primary/10 focus:border-primary/30'} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="john@company.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email}</span>}
              </div>
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-primary/5 border ${errors.phone ? 'border-red-500' : 'border-primary/10 focus:border-primary/30'} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Company Name</label>
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
                <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">GST Number</label>
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
              <label className="block text-xs font-bold text-primary/70 uppercase tracking-wider mb-2">Billing Address *</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full bg-primary/5 border ${errors.address ? 'border-red-500' : 'border-primary/10 focus:border-primary/30'} rounded-xl px-4 py-3 text-sm text-primary outline-none transition-colors resize-none`}
                placeholder="Full billing address for the invoice"
              />
              {errors.address && <span className="text-red-500 text-xs mt-1 block">{errors.address}</span>}
            </div>
            
            <div className="hidden lg:block pt-4 border-t border-primary/10">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden rounded-full px-8 py-4 bg-primary text-white font-bold transition-all disabled:opacity-70"
              >
                <div className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </span>
              </button>
              
              {submitState === "unconfigured" && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                  <b>Razorpay integration pending:</b> The payment gateway keys are not yet configured on the backend. This is a frontend demo of the checkout flow.
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-primary/5 border border-primary/10 rounded-[32px] p-8 md:p-10 sticky top-32">
            <h2 className={`${FONTS.microgrammaBold.className} text-xl text-primary mb-8`}>Order Summary</h2>
            
            {!packageDetails ? (
              <div className="text-primary/60 text-sm">No service package selected. Please return to the pricing page to select a package.</div>
            ) : (
              <div className="space-y-6">
                <div>
                  <div className="text-xs font-bold text-primary/50 uppercase tracking-wider mb-1">{packageDetails.category}</div>
                  <div className="text-xl font-bold text-primary">{packageDetails.name}</div>
                  <div className="text-primary/70 text-sm mt-2">{packageDetails.description}</div>
                </div>

                <div className="h-px w-full bg-primary/10" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-primary/80">
                    <span>Base Scope ({packageDetails.isMonthly ? 'Monthly' : 'One-time'})</span>
                    <span className="font-bold">{formatINR(packageDetails.priceINR)}</span>
                  </div>
                  <div className="flex justify-between items-center text-primary/80">
                    <span>Estimated GST (18%)</span>
                    <span className="font-bold">{formatINR(gstAmount)}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-primary/10" />

                <div className="flex justify-between items-center">
                  <span className="font-bold text-primary uppercase text-sm">Total Due</span>
                  <span className={`${FONTS.microgrammaBold.className} text-2xl text-primary`}>{formatINR(totalAmount)}</span>
                </div>
                
                <div className="pt-4 pb-2">
                  <ul className="space-y-3">
                    {packageDetails.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg className="w-4 h-4 mt-0.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-primary/70 text-xs sm:text-sm">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:hidden pt-6">
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden rounded-full px-8 py-4 bg-primary text-white font-bold transition-all disabled:opacity-70"
                  >
                    <div className="absolute inset-0 w-full h-full bg-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? "Processing..." : "Proceed to Payment"}
                    </span>
                  </button>
                  
                  {submitState === "unconfigured" && (
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm">
                      <b>Razorpay integration pending:</b> Backend not configured.
                    </div>
                  )}
                </div>
                
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-primary/10">
              <div className="flex items-center gap-2 text-primary/50 text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure 256-bit SSL encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
