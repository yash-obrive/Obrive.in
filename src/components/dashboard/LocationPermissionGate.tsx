"use client";

import { AlertTriangle, RefreshCw, ShieldAlert } from "lucide-react";
import type React from "react";
import { useLocationTracker } from "@/hooks/useLocationTracker";

export default function LocationPermissionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    trackingEnabled,
    permissionDenied,
    requestingPermission,
    requestLocationAccess,
  } = useLocationTracker();

  // If tracking is active and permission was denied, enforce hard block
  if (trackingEnabled && permissionDenied) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
        <div className="relative max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl border border-rose-100 text-center animate-in fade-in zoom-in duration-300">
          {/* Header Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-rose-50 border border-rose-100 shadow-inner">
            <ShieldAlert className="h-10 w-10 text-rose-600 animate-pulse" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Location Access Required
          </h2>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Your organization requires location verification during active work
            hours. Location tracking is currently{" "}
            <strong className="text-slate-900 font-semibold">
              enabled for your account
            </strong>{" "}
            by HR, but your browser is blocking access.
          </p>

          {/* Browser Instructions Box */}
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left border border-slate-200/70">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              How to unblock in your browser:
            </div>
            <ol className="space-y-2 text-xs text-slate-700 font-medium list-decimal list-inside">
              <li>
                Click the{" "}
                <strong className="text-slate-900">Tune / Lock icon</strong> on
                the left side of your browser address bar.
              </li>
              <li>
                Toggle <strong className="text-slate-900">Location</strong> to{" "}
                <strong className="text-emerald-600 font-bold">Allow</strong>.
              </li>
              <li>
                Click the button below to verify and unlock your workspace.
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => requestLocationAccess()}
              disabled={requestingPermission}
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${requestingPermission ? "animate-spin" : ""}`}
              />
              {requestingPermission
                ? "Verifying Access..."
                : "Verify & Unlock Workspace"}
            </button>
          </div>

          <p className="mt-4 text-[11px] text-slate-400">
            Once location permission is granted, your dashboard will immediately
            unlock.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
