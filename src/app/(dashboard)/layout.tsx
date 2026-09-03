'use client'

import { ReactNode } from 'react'

import { TimerProvider } from '@/context/TimerContext'
import { SocketProvider } from '@/context/SocketContext'
import LocationPermissionGate from '@/components/dashboard/LocationPermissionGate'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children
}: DashboardLayoutProps) {
  return (
    <TimerProvider>
      <SocketProvider>
        <LocationPermissionGate>
          <div className="flex min-h-screen w-full bg-[#F4F9FD] gap-2 p-2 md:h-screen">
            {children}
          </div>
        </LocationPermissionGate>
      </SocketProvider>
    </TimerProvider>
  )
}