"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  FolderOpen,
  LayoutDashboard,
  List,
  Menu,
  MessageSquare,
  RefreshCw,
  Shield,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Messenger from "@/components/chat/Messenger";
import Calender from "@/components/dashboard/Calender";
import Sidebar from "@/components/dashboard/Sidebar";
import SkeletonLoading from "@/components/SkelitonLoading";
import { apiFetch } from "@/lib/api";
import { useDashboardData } from "../useDashboardData";
import Header from "../employee/components/Header";
import NearestEvents from "../employee/components/NearestEvents";
import Projects from "../employee/components/Projects";
import WorkloadSection from "../employee/components/WorkloadSection";
import Notes from "../employee/sections/Notes";

export const dynamic = "force-dynamic";

interface AdminStats {
  totalEmployees: number;
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  recentLogs: any[];
}

export default function AdminDashboard() {
  const {
    workloadMembers,
    projects,
    events,
    user,
    loading: dashboardLoading,
    error: dashboardError,
    refetch,
  } = useDashboardData("supervisor"); // supervisor fetches all projects, same as admin needs

  const [activeSection, setActiveSection] = useState("dashboard");
  const [_supportOpen, setSupportOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [departmentUsers, setDepartmentUsers] = useState<Record<string, any[]>>({});

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, key: "dashboard" },
    { label: "Users", icon: Users, key: "users" },
    { label: "Projects", icon: FolderOpen, key: "projects" },
    { label: "Calender", icon: Calendar, key: "calender" },
    { label: "Sticky Notes", icon: List, key: "sticky-notes" },
    { label: "Messenger", icon: MessageSquare, key: "messenger" },
  ];

  const fetchAdminData = useCallback(async () => {
    try {
      setStatsLoading(true);
      const [statsRes, deptRes] = await Promise.all([
        apiFetch("/admin/stats"),
        apiFetch("/admin/users/by-department"),
      ]);
      if (statsRes.ok) {
        const d = await statsRes.json();
        if (d.success) setStats(d.data);
      }
      if (deptRes.ok) {
        const d = await deptRes.json();
        if (d.success) setDepartmentUsers(d.data);
      }
    } catch (e) {
      console.error("Failed to fetch admin stats:", e);
    } finally {
      setStatsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdminData();
  }, [fetchAdminData]);

  if (dashboardLoading) return <SkeletonLoading />;

  if (dashboardError) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl text-center shadow-sm">
          <p className="font-bold text-base">Error loading Admin Dashboard</p>
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

  const statCards = [
    {
      label: "Total Employees",
      value: stats?.totalEmployees ?? "—",
      icon: Users,
      bg: "bg-[#eef7ff]",
      color: "text-[#073933]",
    },
    {
      label: "Total Clients",
      value: stats?.totalClients ?? "—",
      icon: Shield,
      bg: "bg-[#f0fdf4]",
      color: "text-green-700",
    },
    {
      label: "Total Projects",
      value: stats?.totalProjects ?? "—",
      icon: FolderOpen,
      bg: "bg-[#fef9ee]",
      color: "text-amber-700",
    },
    {
      label: "Active Projects",
      value: stats?.activeProjects ?? "—",
      icon: RefreshCw,
      bg: "bg-[#f5f3ff]",
      color: "text-purple-700",
    },
  ];

  const deptEntries = Object.entries(departmentUsers);

  return (
    <>
      {/* Sidebar */}
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
            {activeSection === "sticky-notes" ? "Sticky Notes" : activeSection}
          </span>
        </div>

        {/* Header */}
        <Header userName={user?.name || "Admin"} activeSection={activeSection} />

        {/* DASHBOARD SECTION */}
        {activeSection === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-row gap-4 overflow-hidden min-h-0"
          >
            {/* Center */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 pb-36 scrollbar-hide w-full space-y-5">

                {/* Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {statCards.map((card) => (
                    <div
                      key={card.label}
                      className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col gap-2"
                    >
                      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bg}`}>
                        <card.icon className={`h-4 w-4 ${card.color}`} />
                      </div>
                      <p className="text-2xl font-bold text-[#073933]">
                        {statsLoading ? (
                          <span className="inline-block h-5 w-10 bg-slate-100 rounded animate-pulse" />
                        ) : (
                          card.value
                        )}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">{card.label}</p>
                    </div>
                  ))}
                </div>

                {/* Workload */}
                <WorkloadSection members={workloadMembers} />

                {/* Departments Overview */}
                {deptEntries.length > 0 && (
                  <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Team by Department
                    </h3>
                    <div className="space-y-3">
                      {deptEntries.map(([dept, members]) => (
                        <div key={dept} className="flex items-center gap-3">
                          <span className="text-xs font-semibold text-[#073933] w-32 shrink-0 truncate">
                            {dept}
                          </span>
                          <div className="flex-1 bg-[#F4F9FD] rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-[#073933] transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  100,
                                  (members.length /
                                    Math.max(
                                      1,
                                      Math.max(...deptEntries.map(([, m]) => m.length))
                                    )) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-500 w-6 text-right">
                            {members.length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Login Logs */}
                {stats?.recentLogs && stats.recentLogs.length > 0 && (
                  <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-3">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Recent Login Activity
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                            <th className="pb-2 text-start">User</th>
                            <th className="pb-2 text-start">Role</th>
                            <th className="pb-2 text-start">Login Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {stats.recentLogs.map((log: any, i: number) => (
                            <tr key={i} className="hover:bg-[#F4F9FD]/60 transition">
                              <td className="py-2 font-medium text-[#073933]">
                                {log.user?.email || "—"}
                              </td>
                              <td className="py-2 capitalize text-slate-500">
                                {log.user?.role || "—"}
                              </td>
                              <td className="py-2 text-slate-400">
                                {log.loginTime
                                  ? new Date(log.loginTime).toLocaleString()
                                  : "—"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Projects */}
                <Projects projects={projects} variant="dashboard" />
              </div>
            </div>

            {/* Right Panel */}
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
                  <NearestEvents events={events} setActiveSection={setActiveSection} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* USERS SECTION */}
        {activeSection === "users" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto p-4 pb-36 scrollbar-hide w-full space-y-5"
          >
            <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4">
              <h2 className="text-xl font-bold text-[#073933]">All Staff</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                      <th className="pb-3 text-start ps-2">Name</th>
                      <th className="pb-3 text-start">Email</th>
                      <th className="pb-3 text-start">Role</th>
                      <th className="pb-3 text-start">Department</th>
                      <th className="pb-3 text-start">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {deptEntries.flatMap(([, members]) => members).map((u: any) => (
                      <tr key={u.id} className="hover:bg-[#F4F9FD]/60 transition">
                        <td className="py-3 ps-2">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-[#eef7ff] text-[#073933] flex items-center justify-center font-bold text-xs border border-slate-200 overflow-hidden">
                              {u.avatar_url ? (
                                <img src={u.avatar_url} alt={u.name} className="h-full w-full object-cover" />
                              ) : (
                                (u.name || "?").charAt(0).toUpperCase()
                              )}
                            </div>
                            <span className="font-semibold text-[#073933]">{u.name || "—"}</span>
                          </div>
                        </td>
                        <td className="py-3 text-slate-500">{u.email}</td>
                        <td className="py-3 capitalize text-slate-600">{u.role}</td>
                        <td className="py-3 text-slate-500">{u.department || "—"}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                              u.status === "online"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {u.status || "offline"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "projects" && <Projects projects={projects} variant="projects" />}
        {activeSection === "calender" && <Calender />}
        {activeSection === "sticky-notes" && <Notes />}
        {activeSection === "messenger" && <Messenger />}
      </div>
    </>
  );
}
