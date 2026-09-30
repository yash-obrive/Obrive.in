"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FONTS from "@/assets/fonts";
import CustomToast from "@/components/pages/resources/components/Toast";
import WhiteLogo from "@/components/shared/logo/WhiteLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiFetch } from "@/lib/api";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const res = await apiFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to request password reset.");
      }

      router.push("/reset-password?email=" + encodeURIComponent(email));
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2.5fr_2fr] w-full min-h-screen">
      {/* LEFT SIDE */}
      <div className="bg-primary hidden lg:flex items-center justify-center">
        <div className="text-white text-center flex items-center gap-6 flex-col justify-center px-10">
          <div className="mb-10">
            <WhiteLogo />
          </div>
          <h1 className={`${FONTS.microgrammaBold.className} text-2xl lg:text-4xl`}>
            Password Recovery
          </h1>
          <p className="text-base lg:text-xl max-w-3xl">
            Enter your email to receive a 6-digit OTP (One-Time Password) to reset your account.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-accent flex flex-col items-center justify-center gap-12 px-6 py-10">
        <div className="text-center">
          <h1 className={`${FONTS.microgrammaBold.className} text-2xl lg:text-4xl uppercase`}>
            Recover Account
          </h1>
        </div>

        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Type your Email Address"
                className="border mt-2 py-6 border-primary outline-none"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              size="lg"
              type="submit"
              className="cursor-pointer uppercase mt-4 w-full text-accent text-xs py-6"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => router.push("/employee-login")}
                className="text-xs text-primary hover:underline font-medium"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
