"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { LogOut } from "lucide-react";

export default function ImpersonationBanner() {
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkImpersonation = async () => {
      try {
        const response = await apiFetch("/auth/me", { method: "GET" });
        const result = await response.json();
        
        if (result.success && result.data?.isImpersonating) {
          setIsImpersonating(true);
          setUserName(result.data.name);
        }
      } catch (error) {
        console.error("Error checking impersonation status", error);
      }
    };
    
    checkImpersonation();
  }, []);

  const handleExit = async () => {
    try {
      const response = await apiFetch("/supervisor/exit-impersonation", {
        method: "POST"
      });
      const result = await response.json();
      if (result.success) {
        window.location.href = "/dashboard/supervisor"; // Redirect to admin panel
      }
    } catch (error) {
      console.error("Failed to exit impersonation", error);
    }
  };

  if (!isImpersonating) return null;

  return (
    <div className="w-full flex items-center justify-center bg-amber-500 py-1.5 px-4 text-white shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-sm">
          ⚠️ Viewing as: {userName}
        </span>
        <button
          onClick={handleExit}
          className="flex items-center gap-1 rounded bg-black/20 px-3 py-1 text-xs font-bold transition hover:bg-black/30"
        >
          <LogOut className="h-3 w-3" /> Exit Employee View
        </button>
      </div>
    </div>
  );
}
