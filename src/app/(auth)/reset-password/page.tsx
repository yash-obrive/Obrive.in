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
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      if (emailParam) setEmail(emailParam);
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await apiFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ email, otp: token, newPassword: password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Failed to reset password. Token may be invalid or expired.");
      }

      setShowToast(true);
      setTimeout(() => {
        router.push("/employee-login");
      }, 2000);
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
            Reset Password
          </h1>
          <p className="text-base lg:text-xl max-w-3xl">
            Enter the 6-digit OTP sent to your email and your new password.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-accent flex flex-col items-center justify-center gap-12 px-6 py-10">
        <div className="text-center">
          <h1 className={`${FONTS.microgrammaBold.className} text-2xl lg:text-4xl uppercase`}>
            New Password
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

            <div>
              <Label htmlFor="token">Reset Token (OTP)</Label>
              <Input
                value={token}
                onChange={(e) => setToken(e.target.value)}
                type="text"
                id="token"
                placeholder="Enter 6-digit token"
                className="border mt-2 py-6 border-primary outline-none"
              />
            </div>

            <div>
              <Label htmlFor="password">New Password</Label>
              <div className="relative mt-2">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter new password"
                  className="border py-6 pe-12 border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-4 top-1/2 -translate-y-1/2 text-primary/70 hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative mt-2">
                <Input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  className="border py-6 pe-12 border-primary outline-none"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              size="lg"
              type="submit"
              className="cursor-pointer uppercase mt-4 w-full text-accent text-xs py-6"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
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
      {showToast && <CustomToast show={showToast} message="Password reset successfully!" />}
    </div>
  );
}
