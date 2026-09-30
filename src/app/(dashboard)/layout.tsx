"use client";

import type { ReactNode } from "react";
import LocationPermissionGate from "@/components/dashboard/LocationPermissionGate";
import ImpersonationBanner from "@/components/dashboard/ImpersonationBanner";
import { SocketProvider } from "@/context/SocketContext";
import { TimerProvider } from "@/context/TimerContext";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <TimerProvider>
      <SocketProvider>
        <LocationPermissionGate>
          <div className="flex flex-col min-h-screen w-full bg-[#F4F9FD]">
            <ImpersonationBanner />
            <div className="flex flex-1 gap-2 p-2 h-[calc(100vh-40px)] md:h-screen">
              {children}
            </div>
          </div>
        </LocationPermissionGate>
      </SocketProvider>
    </TimerProvider>
  );
}
