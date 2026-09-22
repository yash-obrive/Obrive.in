"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ExternalLink,
  FolderOpen,
  History,
  LayoutDashboard,
  List,
  MapPin,
  MessageSquare,
  Palmtree,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import nextDynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import Messenger from "@/components/chat/Messenger";
import ActivityStream from "@/components/dashboard/ActivityStream";
import Calender from "@/components/dashboard/Calender";
import Sidebar from "@/components/dashboard/Sidebar";
import Vacations from "@/components/dashboard/Vacations";
import SkeletonLoading from "@/components/SkelitonLoading";
import { apiFetch } from "@/lib/api";
import Header from "../employee/components/Header";
import NearestEvents from "../employee/components/NearestEvents";
import Projects from "../employee/components/Projects";
import WorkloadSection from "../employee/components/WorkloadSection";
import Notes from "../employee/sections/Notes";
import { useDashboardData } from "../useDashboardData";
import {
  isEmployeeLive,
  type TrackedEmployee,
} from "./components/EmployeeLocationMap";
import LocationHistoryModal from "./components/LocationHistoryModal";

function formatPingTimestamp(dateStr?: string | null): string {
  if (!dateStr) return "No pings yet";
  const pingDate = new Date(dateStr);
  const now = new Date();
  const isToday =
    pingDate.getDate() === now.getDate() &&
    pingDate.getMonth() === now.getMonth() &&
    pingDate.getFullYear() === now.getFullYear();

  const timeStr = pingDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (isToday) {
    return `Today at ${timeStr}`;
  }
  const dateStrFormatted = pingDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
  return `${dateStrFormatted} at ${timeStr}`;
}

// Dynamically import Leaflet Map with SSR disabled
const EmployeeLocationMap = nextDynamic(
  () => import("./components/EmployeeLocationMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full min-h-[350px] flex items-center justify-center bg-[#F4F9FD] rounded-2xl border border-slate-100 text-xs font-semibold text-slate-400 gap-2">
        <RefreshCw className="h-4 w-4 animate-spin text-[#073933]" />
        Loading Interactive Map...
      </div>
    ),
  },
);

export default function HRDashboard() {
  const {
    workloadMembers,
    projects,
    events,
    activities,
    user,
    loading: dashboardLoading,
    error: dashboardError,
    refetch,
  } = useDashboardData("hr");

  const [activeSection, setActiveSection] = useState("dashboard");
  const [supportOpen, setSupportOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Location Tracking State
  const [trackedEmployees, setTrackedEmployees] = useState<TrackedEmployee[]>(
    [],
  );
  const [locLoading, setLocLoading] = useState(false);
  const [locRefreshing, setLocRefreshing] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTracking, setFilterTracking] = useState<
    "all" | "enabled" | "disabled"
  >("all");
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [selectedHistoryEmp, setSelectedHistoryEmp] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { label: "Location Tracking", icon: MapPin, key: "location" },
    { label: "Projects", icon: FolderOpen, key: "projects" },
    { label: "Calender", icon: Calendar, key: "calender" },
    { label: "Vacations", icon: Palmtree, key: "Vacations" },
    { label: "Sticky Notes", icon: List, key: "tasks" },
    { label: "Messenger", icon: MessageSquare, key: "messenger" },
  ];

  // Fetch location overview
  const fetchLocations = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLocLoading(true);
      else setLocRefreshing(true);

      const res = await apiFetch("/hr/locations");
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.data)) {
          setTrackedEmployees(data.data);
          setLocError(null);
        }
      } else if (res.status === 403) {
        setLocError(
          "Access Denied: Please log in with an HR or Admin account (hr@obrive.com).",
        );
      } else {
        setLocError("Unable to load employee locations.");
      }
    } catch (err) {
      console.error("Failed to fetch employee locations:", err);
      setLocError("Connection error loading locations.");
    } finally {
      setLocLoading(false);
      setLocRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Handle Toggle Switch
  const handleToggleTracking = async (
    employeeId: number,
    currentStatus: boolean,
  ) => {
    try {
      setTogglingId(employeeId);
      const nextStatus = !currentStatus;

      // Optimistic update
      setTrackedEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId
            ? { ...emp, is_location_tracking_enabled: nextStatus }
            : emp,
        ),
      );

      const res = await apiFetch(
        `/hr/employees/${employeeId}/location-tracking`,
        {
          method: "PATCH",
          body: JSON.stringify({ enabled: nextStatus }),
        },
      );

      if (!res.ok) {
        // Rollback
        setTrackedEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employeeId
              ? { ...emp, is_location_tracking_enabled: currentStatus }
              : emp,
          ),
        );
      }
    } catch (err) {
      console.error("Toggle failed:", err);
      setTrackedEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId
            ? { ...emp, is_location_tracking_enabled: currentStatus }
            : emp,
        ),
      );
    } finally {
      setTogglingId(null);
    }
  };

  if (dashboardLoading) {
    return <SkeletonLoading />;
  }

  if (dashboardError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center shadow-sm">
          <p className="font-bold text-base">Error loading HR Dashboard</p>
          <p className="text-xs mt-1 mb-4">{dashboardError}</p>
          <button
            onClick={() => refetch()}
            className="text-xs bg-red-100 hover:bg-red-200 px-4 py-2 rounded-xl font-bold transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filtered employees for location tracking tab
  const filteredEmployees = trackedEmployees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.department &&
        emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.job_title &&
        emp.job_title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterTracking === "enabled")
      return matchesSearch && emp.is_location_tracking_enabled;
    if (filterTracking === "disabled")
      return matchesSearch && !emp.is_location_tracking_enabled;
    return matchesSearch;
  });

  const trackedCount = trackedEmployees.filter(
    (e) => e.is_location_tracking_enabled,
  ).length;
  const activePingsCount = trackedEmployees.filter(
    (e) => e.latitude != null,
  ).length;

  return (
    <>
      {/* 1. Official Obrive Sidebar */}
      <div className="contents md:flex md:h-full md:w-auto md:flex-col md:rounded-2xl">
        <Sidebar
          navItems={navItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          setSupportOpen={setSupportOpen}
          currentRole="hr"
          mobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden min-w-0">
        {/* Header */}
        <Header
          userName={user?.name || "HR Admin"}
          activeSection={activeSection}
        />

        {/* SECTION: DASHBOARD */}
        {activeSection === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-row gap-4 overflow-hidden min-h-0"
          >
            {/* Center Area */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 pb-36 scrollbar-hide w-full space-y-5">
                {/* 1. Original Obrive Workload Cards (Devanshi, Parveen, Naman, etc.) */}
                <WorkloadSection members={workloadMembers} />

                {/* 2. Quick Location Monitoring Banner */}
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef7ff] text-[#073933]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#073933]">
                        Employee Location Tracking
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {trackedCount} active tracked &bull; {activePingsCount}{" "}
                        live GPS positions today
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveSection("location")}
                    className="self-start sm:self-auto rounded-xl bg-[#073933] hover:bg-[#0b534b] text-white px-4 py-2.5 text-xs font-bold transition shadow-sm"
                  >
                    Open Live Map & Controls &rarr;
                  </button>
                </div>

                {/* 3. Original Obrive Projects */}
                <Projects projects={projects} variant="dashboard" />
              </div>
            </div>

            {/* Right Panel: Upcoming Events & Recent Activity */}
            <div className="w-80 flex flex-col gap-4 h-full min-h-0">
              <div className="flex-1 min-h-0 bg-white rounded-xl flex flex-col shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50 flex items-center justify-between">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Upcoming Events
                  </h3>
                  <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold">
                    {events?.length || 0}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
                  <NearestEvents
                    events={events}
                    setActiveSection={setActiveSection}
                  />
                </div>
              </div>

              <div className="flex-1 min-h-0 bg-white rounded-xl flex flex-col shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-50">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                    Recent Activity
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
                  <ActivityStream activities={activities} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SECTION: LOCATION TRACKING */}
        {activeSection === "location" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto p-4 pb-44 scrollbar-hide w-full space-y-4"
          >
            {/* Header & Controls Bar */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#073933]">
                  Staff Location Tracking
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Monitor live team positions on the interactive map and
                  configure individual tracking switches.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => fetchLocations(true)}
                  disabled={locRefreshing}
                  className="flex items-center gap-1.5 rounded-xl bg-[#F4F9FD] hover:bg-[#e6f2fb] px-3.5 py-2 text-xs font-bold text-[#073933] transition"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${locRefreshing ? "animate-spin" : ""}`}
                  />
                  Refresh
                </button>
              </div>
            </div>

            {/* Error / Auth Notice */}
            {locError && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs font-semibold text-amber-900">
                {locError}
              </div>
            )}

            {/* Map Widget */}
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Live Employee Pins
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE NOW
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {
                    trackedEmployees.filter(
                      (e) => e.latitude != null && isEmployeeLive(e),
                    ).length
                  }{" "}
                  {trackedEmployees.filter(
                    (e) => e.latitude != null && isEmployeeLive(e),
                  ).length === 1
                    ? "employee"
                    : "employees"}{" "}
                  currently live with GPS
                </span>
              </div>

              <div className="h-[380px] w-full rounded-xl overflow-hidden">
                <EmployeeLocationMap employees={trackedEmployees} />
              </div>
            </div>

            {/* Employee Management Table */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-100 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#073933]"
                  />
                </div>

                <div className="flex gap-2 self-start sm:self-auto">
                  {(["all", "enabled", "disabled"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setFilterTracking(filter)}
                      className={`rounded-lg px-3 py-1 text-xs font-bold capitalize transition ${
                        filterTracking === filter
                          ? "bg-[#073933] text-white"
                          : "bg-[#F4F9FD] text-slate-600 hover:bg-[#eef7ff]"
                      }`}
                    >
                      {filter === "all" ? "All Staff" : `Tracking ${filter}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                      <th className="pb-3 pl-2">Employee</th>
                      <th className="pb-3">Department & Role</th>
                      <th className="pb-3 text-center">Tracking Switch</th>
                      <th className="pb-3">Latest GPS Ping</th>
                      <th className="pb-3 text-right pr-2">History</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {locLoading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-slate-400"
                        >
                          <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-2 text-[#073933]" />
                          Loading employee directory...
                        </td>
                      </tr>
                    ) : filteredEmployees.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-slate-400"
                        >
                          No employees match criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp) => {
                        const isToggling = togglingId === emp.id;
                        const initials = emp.name
                          ? emp.name.charAt(0).toUpperCase()
                          : "E";

                        return (
                          <tr
                            key={emp.id}
                            className="hover:bg-[#F4F9FD]/60 transition"
                          >
                            {/* Avatar & Name */}
                            <td className="py-3 pl-2">
                              <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-full bg-[#eef7ff] text-[#073933] flex items-center justify-center font-bold text-xs overflow-hidden border border-slate-200">
                                  {emp.avatar_url ? (
                                    <img
                                      src={emp.avatar_url}
                                      alt={emp.name}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    initials
                                  )}
                                </div>
                                <div>
                                  <p className="font-bold text-[#073933] text-xs">
                                    {emp.name}
                                  </p>
                                  <p className="text-slate-500 text-[11px]">
                                    {emp.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Department & Role */}
                            <td className="py-3">
                              <p className="font-semibold text-slate-800">
                                {emp.job_title || "Employee"}
                              </p>
                              <p className="text-slate-500 text-[11px]">
                                {emp.department || "General"}
                              </p>
                            </td>

                            {/* Toggle Button */}
                            <td className="py-3 text-center">
                              <div className="flex flex-col items-center justify-center gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleTracking(
                                      emp.id,
                                      emp.is_location_tracking_enabled,
                                    )
                                  }
                                  disabled={isToggling}
                                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    emp.is_location_tracking_enabled
                                      ? "bg-[#073933]"
                                      : "bg-slate-300"
                                  } ${isToggling ? "opacity-50 cursor-wait" : ""}`}
                                >
                                  <span
                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                      emp.is_location_tracking_enabled
                                        ? "translate-x-4"
                                        : "translate-x-0"
                                    }`}
                                  />
                                </button>
                                <span
                                  className={`text-[9px] font-bold uppercase tracking-wider ${
                                    emp.is_location_tracking_enabled
                                      ? "text-[#073933]"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {emp.is_location_tracking_enabled
                                    ? "ON"
                                    : "OFF"}
                                </span>
                              </div>
                            </td>

                            {/* Latest Coordinates & Live Status */}
                            <td className="py-3">
                              {emp.latitude != null && emp.longitude != null ? (
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
                                    <MapPin
                                      className={`h-3 w-3 ${
                                        isEmployeeLive(emp)
                                          ? "text-emerald-600"
                                          : "text-slate-400"
                                      }`}
                                    />
                                    <span>
                                      {emp.latitude.toFixed(4)},{" "}
                                      {emp.longitude.toFixed(4)}
                                    </span>
                                    {isEmployeeLive(emp) ? (
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-emerald-100 text-emerald-800">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        LIVE
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-500">
                                        Offline
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                    <Clock className="h-2.5 w-2.5" />
                                    <span>
                                      {formatPingTimestamp(emp.last_ping_at)}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <span className="text-[11px] text-slate-500 italic">
                                  No pings recorded
                                </span>
                              )}
                            </td>

                            {/* History Modal Trigger */}
                            <td className="py-3 pr-2 text-right">
                              <button
                                type="button"
                                onClick={() =>
                                  setSelectedHistoryEmp({
                                    id: emp.id,
                                    name: emp.name,
                                  })
                                }
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white hover:bg-[#F4F9FD] px-2.5 py-1 text-[11px] font-bold text-[#073933] transition"
                              >
                                <History className="h-3 w-3" />
                                Logs
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Spacer to ensure full clearance above floating assistant widgets */}
            <div
              className="h-16 w-full pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        )}

        {/* OTHER SECTIONS */}
        {activeSection === "projects" && (
          <Projects projects={projects} variant="projects" />
        )}
        {activeSection === "calender" && <Calender />}
        {activeSection === "Vacations" && <Vacations />}
        {activeSection === "tasks" && <Notes />}
        {activeSection === "messenger" && <Messenger />}
      </div>

      {/* History Modal */}
      {selectedHistoryEmp && (
        <LocationHistoryModal
          employeeId={selectedHistoryEmp.id}
          employeeName={selectedHistoryEmp.name}
          isOpen={Boolean(selectedHistoryEmp)}
          onClose={() => setSelectedHistoryEmp(null)}
        />
      )}
    </>
  );
}
