"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";
import FONTS from "@/assets/fonts";
import FullWidthSection from "@/components/shared/layout/FullWidthSection";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/config/countries";
import { PRICING_SERVICES_MAP } from "@/constants/pages/pricingData";
import { useCountry } from "@/context/CountryContext";

// Simple Zod schema for form validation
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  projectRequirement: z.string().optional(),
  message: z.string().min(10, "Message should be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

function ContactFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");
  const intentParam = searchParams.get("intent");

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    projectRequirement: "",
    message: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "error" | "success" | "unconfigured"
  >("idle");

  useEffect(() => {
    // Map service query param to human readable name if exists
    if (serviceParam && PRICING_SERVICES_MAP[serviceParam]) {
      setFormData((prev) => ({
        ...prev,
        service: PRICING_SERVICES_MAP[serviceParam],
      }));
    }

    // Handle intents (e.g. prefilling project requirement or message)
    if (intentParam === "quote") {
      setFormData((prev) => ({
        ...prev,
        projectRequirement: "Custom Quote Request",
      }));
    } else if (intentParam === "payment") {
      setFormData((prev) => ({
        ...prev,
        projectRequirement: "Payment / Checkout Request",
      }));
    }
  }, [serviceParam, intentParam]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState("idle");
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          newErrors[issue.path[0] as keyof ContactFormData] = issue.message;
        }
      });
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    // Send data to our API route
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json();
        setIsSubmitting(false);
        if (res.ok) {
          setSubmitState("success");
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            service: "",
            projectRequirement: "",
            message: "",
          });
        } else {
          setSubmitState("error");
          console.error("Submission failed:", data);
        }
      })
      .catch((err) => {
        console.error("Submission error:", err);
        setIsSubmitting(false);
        setSubmitState("error");
      });
  };

  // Removed early return for success state, using modal instead
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Alert for Payment Intent */}
        {intentParam === "payment" && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-lg p-4 mb-6 text-sm">
            <strong>Note:</strong> Razorpay payment checkout is currently
            unconfigured. Please submit your request and our team will securely
            process your transaction manually.
          </div>
        )}

        {/* Submission State Alert */}
        {submitState === "unconfigured" && (
          <div className="bg-primary/5 border border-primary/20 text-primary p-6 rounded-xl mb-8 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 mt-0.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <h4 className={`${FONTS.microgrammaBold.className} text-lg mb-1`}>
                Backend Not Configured
              </h4>
              <p className="text-primary/70 text-sm leading-relaxed">
                Your enquiry form is ready, but submissions are not currently
                connected to an email or CRM backend.
                <br />
                No lead was saved and no email was sent. Please configure your
                notification service.
              </p>
            </div>
          </div>
        )}

        {submitState === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-600 rounded-lg p-4 mb-6 text-sm">
            <strong>Error:</strong> Failed to submit your request. Please try
            again later.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-primary/80 text-sm font-bold mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.name ? "border-red-500" : "border-primary/20"} text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-primary/80 text-sm font-bold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white border ${errors.email ? "border-red-500" : "border-primary/20"} text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-primary/80 text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white border border-primary/20 text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-primary/80 text-sm font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full bg-white border border-primary/20 text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors"
              placeholder="Acme Corp"
            />
          </div>
        </div>

        <div>
          <label className="block text-primary/80 text-sm font-bold mb-2">
            Service of Interest *
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full bg-white border ${errors.service ? "border-red-500" : "border-primary/20"} text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors appearance-none`}
          >
            <option value="">Select a service...</option>
            {Object.values(PRICING_SERVICES_MAP).map((serviceName) => (
              <option key={serviceName} value={serviceName}>
                {serviceName}
              </option>
            ))}
            <option value="Other">Other / General Enquiry</option>
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1">{errors.service}</p>
          )}
        </div>

        <div>
          <label className="block text-primary/80 text-sm font-bold mb-2">
            Project / Requirement Scope
          </label>
          <input
            type="text"
            name="projectRequirement"
            value={formData.projectRequirement}
            onChange={handleChange}
            className="w-full bg-white border border-primary/20 text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors"
            placeholder="e.g., E-commerce AR Viewer, Corporate Website Redesign"
          />
        </div>

        <div>
          <label className="block text-primary/80 text-sm font-bold mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full bg-white border ${errors.message ? "border-red-500" : "border-primary/20"} text-primary px-4 py-3.5 rounded-xl outline-none focus:border-primary/40 transition-colors resize-y`}
            placeholder="Tell us about your goals, timeline, and any specific requirements..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-4 px-6 rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            "Submit Enquiry"
          )}
        </button>

        <p className="text-center text-primary/50 text-xs mt-4">
          By submitting this form, you agree to our Privacy Policy and Terms of
          Service.
        </p>
      </form>

      <AnimatePresence>
        {submitState === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex items-center justify-center rounded-[32px]"
          >
            <div className="bg-primary/5 border border-primary/20 text-primary p-8 rounded-xl text-center flex flex-col items-center max-w-md shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white mb-6">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3
                className={`${FONTS.microgrammaBold.className} text-2xl mb-4`}
              >
                Message Sent Successfully!
              </h3>
              <p className="text-primary/70 text-lg leading-relaxed max-w-md mx-auto">
                Thank you for reaching out. Our team has received your enquiry
                and will get back to you shortly.
              </p>
              <button
                onClick={() => setSubmitState("idle")}
                className="mt-8 bg-primary text-white py-3 px-8 rounded-xl font-bold hover:bg-primary/90 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactForm() {
  const { countryConfig: _ } = useCountry();
  const defaultCountryConfig = COUNTRIES[DEFAULT_COUNTRY];

  return (
    <FullWidthSection
      backgroundColor="white"
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Contact Info Column */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div>
            <div className="uppercase text-xs font-medium text-primary mb-4">
              GET IN TOUCH
            </div>
            <h1
              className={`${FONTS.microgrammaBold.className} text-secondary sm:leading-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-[90vw] sm:max-w-3xl md:max-w-4xl break-words text-balance mb-6 uppercase`}
            >
              Let's discuss your next project.
            </h1>
            <p className="text-base sm:text-md max-w-[600px] font-medium text-secondary mb-10">
              Whether you need immersive experiences, custom software, or a
              full-funnel growth strategy, our team is ready to help you build
              what's next.
            </p>

            <div className="space-y-8">
              <div>
                <h4
                  className={`${FONTS.microgrammaBold.className} text-primary text-lg mb-2`}
                >
                  {defaultCountryConfig.code === "in"
                    ? "Headquarters"
                    : `${defaultCountryConfig.name} Hub`}
                </h4>
                {defaultCountryConfig.code === "in" ? (
                  <p className="text-primary/70 leading-relaxed">
                    Obrive Industries Private Limited
                    <br />
                    Bangalore, Karnataka, India
                  </p>
                ) : (
                  <p className="text-primary/70 leading-relaxed">
                    {defaultCountryConfig.offices.join(" · ")}
                  </p>
                )}
                {defaultCountryConfig.code !== "in" && (
                  <p className="text-primary/50 text-xs mt-2">
                    Global HQ: Bangalore, Karnataka, India
                  </p>
                )}
              </div>

              <div>
                <h4
                  className={`${FONTS.microgrammaBold.className} text-primary text-lg mb-2`}
                >
                  Direct Contact
                </h4>
                <p className="text-primary/70 flex flex-col gap-1.5">
                  <a
                    href={`mailto:${defaultCountryConfig.contactEmail}`}
                    className="hover:text-secondary transition-colors font-medium"
                  >
                    {defaultCountryConfig.contactEmail}
                  </a>
                  <a
                    href={`tel:${defaultCountryConfig.phone}`}
                    className="hover:text-secondary transition-colors"
                  >
                    {defaultCountryConfig.phone}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-gradient p-8 sm:p-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-primary/10 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-white/40 blur-[80px] pointer-events-none" />
            <Suspense
              fallback={
                <div className="h-[600px] flex items-center justify-center relative z-10">
                  <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
              }
            >
              <div className="relative z-10">
                <ContactFormContent />
              </div>
            </Suspense>
          </div>
        </div>
      </div>
    </FullWidthSection>
  );
}
