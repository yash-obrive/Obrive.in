"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Link as LinkIcon,
  Menu,
  Settings,
  Target,
  Activity,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import SkeletonLoading from "@/components/SkelitonLoading";
import Header from "../employee/components/Header";
import { useOblinkData } from "./useOblinkData";
import { useDashboardData } from "../useDashboardData";

import OverviewSection from "./sections/Overview";
import TargetsSection from "./sections/Targets";
import PublishedLinksSection from "./sections/PublishedLinks";
import SettingsSection from "./sections/Settings";
import ActivitySection from "./sections/Activity";

export const dynamic = "force-dynamic";

export default function OblinkDashboard() {
  const router = useRouter();
  
  // Fetch user role info using the standard dashboard data hook to verify admin
  const { user, me, loading: userLoading } = useDashboardData("admin");
  const isAdmin = user?.role === "admin" || me?.role === "admin" || user?.role === "supervisor" || me?.role === "supervisor";

  // Fetch real OBLINK data
  const {
    stats,
    health,
    targets,
    targetsMeta,
    links,
    linksMeta,
    events,
    settings,
    loading: oblinkLoading,
    error: oblinkError,
    refetch,
  } = useOblinkData();

  const [activeSection, setActiveSection] = useState("overview");
  const [_supportOpen, setSupportOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Unauthorized access check
  useEffect(() => {
    if (!userLoading && !isAdmin) {
      router.replace("/dashboard");
    }
  }, [userLoading, isAdmin, router]);

  const navItems = [
    { label: "Overview", icon: LayoutDashboard, key: "overview" },
    { label: "Targets", icon: Target, key: "targets" },
    { label: "Published Links", icon: LinkIcon, key: "published-links" },
    { label: "Activity", icon: Activity, key: "activity" },
    { label: "Settings", icon: Settings, key: "settings" },
  ];

  if (userLoading || oblinkLoading) {
    return <SkeletonLoading />;
  }

  if (!isAdmin) {
    return null; // Let the useEffect redirect
  }

  if (oblinkError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center shadow-sm">
          <p className="font-bold text-base">Error loading OBLINK AI Dashboard</p>
          <p className="text-xs mt-1 mb-4">{oblinkError}</p>
          <button
            onClick={() => refetch()}
            className="text-xs bg-red-100 hover:bg-red-200 px-4 py-2 rounded-xl font-bold transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Sidebar - Reusing standard Obrive architecture */}
      <div className="contents md:flex md:h-full md:w-auto md:flex-col md:rounded-2xl">
        <Sidebar
          navItems={navItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setSupportOpen={setSupportOpen}
          currentRole="admin"
          mobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden min-w-0">
        {/* Mobile header */}
        <div className="sticky top-2 z-30 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm md:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
          <span className="text-sm font-semibold text-[#073933] capitalize">
            {activeSection.replace("-", " ")}
          </span>
        </div>

        {/* Standard Obrive Header */}
        <Header userName={user?.name || "Admin"} activeSection={activeSection.replace("-", " ")} />

        {/* Sections */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-row gap-4 overflow-hidden min-h-0"
        >
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 pb-36 scrollbar-hide w-full space-y-5">
              {activeSection === "overview" && <OverviewSection stats={stats} health={health} targets={targets} settings={settings} onSettingsChange={refetch} />}
              {activeSection === "targets" && <TargetsSection targets={targets} meta={targetsMeta} settings={settings} onPageChange={refetch} />}
              {activeSection === "published-links" && <PublishedLinksSection links={links} meta={linksMeta} settings={settings} onPageChange={refetch} />}
              {activeSection === "activity" && <ActivitySection events={events} />}
              {activeSection === "settings" && <SettingsSection settings={settings} onSettingsChange={refetch} />}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
