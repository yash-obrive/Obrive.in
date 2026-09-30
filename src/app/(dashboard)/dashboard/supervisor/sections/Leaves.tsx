"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Menu,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ConfirmationAlert from "@/components/ConfirmationAlert";
import SkeletonLoading from "@/components/SkelitonLoading";
import { apiFetch } from "@/lib/api";
import VacationCalendarView from "@/components/dashboard/VacationCalendarView";

export const dynamic = "force-dynamic";

interface LeaveRequest {
  id: number;
  start_date?: string;
  end_date?: string;
  leave_type?: string;
  reason?: string;
  status?: string;
  created_at?: string;
  users?: {
    id: number;
    name?: string;
    email?: string;
    job_title?: string;
    department?: string;
  };
}

const formatDate = (value?: string) => {
  if (!value) return "N/A";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
};

const Leaves = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [isLeaveListOpen, setIsLeaveListOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [updating, setUpdating] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    type: "success" | "error" | "info" | "warning";
    onConfirm?: () => void;
  }>({
    isOpen: false,
    title: "",
    description: "",
    type: "info",
  });

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);
      const [leavesRes, empRes] = await Promise.all([
        apiFetch("/supervisor/leaves", { method: "GET" }),
        apiFetch("/supervisor/employees", { method: "GET" })
      ]);
      const leavesResult = await leavesRes.json();
      const empResult = await empRes.json();
      
      if (empResult.success) {
        setEmployees(empResult.data || []);
      }
      
      if (leavesResult.success) {
        const sortedLeaves = (leavesResult.data || []).sort(
          (a: LeaveRequest, b: LeaveRequest) => {
            const dateDiff =
              new Date(a.start_date || 0).getTime() -
              new Date(b.start_date || 0).getTime();

            if (dateDiff !== 0) {
              return dateDiff;
            }

            return (
              new Date(a.created_at || 0).getTime() -
              new Date(b.created_at || 0).getTime()
            );
          },
        );
        setLeaves(sortedLeaves);
        setSelectedLeave((current) =>
          current
            ? sortedLeaves.find(
                (leave: LeaveRequest) => leave.id === current.id,
              ) || null
            : current,
        );
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all leave requests
  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  const handleDeleteLeave = async (id: number) => {
    setAlertConfig({
      isOpen: true,
      title: "Delete Leave Request",
      description: "Are you sure you want to delete this leave request?",
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await apiFetch(`/supervisor/leaves/${id}`, {
            method: "DELETE",
          });
          const result = await response.json();
          if (result.success) {
            setAlertConfig({
              isOpen: true,
              title: "Success",
              description: "Leave request deleted successfully",
              type: "success",
            });
            setLeaves((prev) => prev.filter((leave) => leave.id !== id));
            if (selectedLeave?.id === id) {
              setSelectedLeave(null);
            }
          } else {
            throw new Error(result.message || "Failed to delete leave request");
          }
        } catch (err: unknown) {
          setAlertConfig({
            isOpen: true,
            title: "Error",
            description:
              err instanceof Error
                ? err.message
                : "An unexpected error occurred",
            type: "error",
          });
        }
      },
    });
  };

  const handleUpdateStatus = async (leaveId: number, status: string) => {
    try {
      setUpdating(true);
      const response = await apiFetch(`/supervisor/leaves/${leaveId}/status`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });

      const result = await response.json();
      if (result.success) {
        setLeaves((prev) =>
          prev.map((leave) =>
            leave.id === leaveId ? { ...leave, status } : leave,
          ),
        );
        if (selectedLeave?.id === leaveId) {
          setSelectedLeave({ ...selectedLeave, status });
        }
      }
    } catch (error) {
      console.error("Error updating leave status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatLeaveRange = (leave: LeaveRequest) => {
    if (!leave.start_date) return "N/A";

    const start = formatDate(leave.start_date);
    const end = formatDate(leave.end_date);

    if (!leave.end_date || start === end) {
      return start;
    }

    return `${start} - ${end}`;
  };

  if (loading) {
    return <SkeletonLoading />;
  }

  // ── Compute per-employee leave summary ──────────────────────
  const ANNUAL_QUOTA = 18; // configurable annual leave days

  const employeeSummaryMap: Record<number, { id: number; name: string; email: string; taken: number }> = {};
  
  // 1. Initialize all employees in the map
  employees.forEach(emp => {
    employeeSummaryMap[emp.id] = {
      id: emp.id,
      name: emp.name || "Unknown",
      email: emp.email || "",
      taken: 0
    };
  });

  // 2. Add taken leaves
  leaves.forEach(leave => {
    const uid = leave.users?.id;
    if (!uid) return;
    
    // Ensure they exist in the map just in case a leave has a user not in the employees list
    if (!employeeSummaryMap[uid]) {
      employeeSummaryMap[uid] = {
        id: uid,
        name: leave.users?.name || "Unknown",
        email: leave.users?.email || "",
        taken: 0
      };
    }
    
    // Only count approved leaves toward "taken"
    if (leave.status === "approved" && leave.start_date && leave.end_date) {
      const start = new Date(leave.start_date);
      const end = new Date(leave.end_date);
      const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      employeeSummaryMap[uid].taken += days;
    }
  });

  const employeeSummary = Object.values(employeeSummaryMap);

  return (
    <motion.div
      className="h-full min-h-0 p-3 sm:p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Desktop Header / View Switcher */}
      <div className="mb-4 hidden lg:flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#1a472a]">Leave Management</h1>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "list" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            List View
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "calendar" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Calendar View
          </button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="mb-3 flex flex-col gap-3 lg:hidden">
        <div className="flex items-center justify-between">
          <button
          type="button"
          onClick={() => setIsLeaveListOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm"
        >
          <Menu className="h-4 w-4" />
          Leave Requests
        </button>
          <span className="text-sm font-semibold text-[#1a472a]">
            {selectedLeave ? "Leave Details" : "Leaves"}
          </span>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-lg w-full">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "list" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
              viewMode === "calendar" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {isLeaveListOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsLeaveListOpen(false)}
        />
      ) : null}

      <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden lg:flex-row">

        {/* ── Employee Leave Summary (top on mobile, sidebar on desktop) ── */}
        {employeeSummary.length > 0 && (
          <div className="shrink-0 lg:w-56 xl:w-64">
            <div className="rounded-2xl bg-white p-4 shadow-sm space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
                Leave Summary ({ANNUAL_QUOTA} days/yr)
              </h3>
              {employeeSummary.map((emp) => {
                const remaining = Math.max(0, ANNUAL_QUOTA - emp.taken);
                const pct = Math.min(100, (emp.taken / ANNUAL_QUOTA) * 100);
                return (
                  <div key={emp.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#073933] truncate max-w-[65%]">
                        {emp.name}
                      </p>
                      <span className="text-[10px] text-slate-500 font-medium shrink-0">
                        {emp.taken}d taken · <span className="text-emerald-600">{remaining}d left</span>
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#F4F9FD] overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          pct >= 90
                            ? "bg-red-500"
                            : pct >= 70
                              ? "bg-amber-400"
                              : "bg-[#073933]"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Leave Requests List */}
        <div
          className={`${
            isLeaveListOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-3 start-3 z-50 w-[min(20rem,calc(100vw-1.5rem))] transition-transform lg:static lg:w-64 lg:translate-x-0 lg:flex-shrink-0`}
        >
          <div className="h-full overflow-y-auto rounded-2xl bg-white p-3 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 lg:hidden">
              <h2 className="text-sm font-semibold text-[#1a472a]">Leaves</h2>
              <button
                type="button"
                onClick={() => setIsLeaveListOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            {/* Leave Requests List */}
            <div className="mb-4 hidden lg:block border-b border-gray-100 pb-3">
              <h2 className="text-sm font-semibold text-[#1a472a] uppercase tracking-wider">Leave Requests</h2>
            </div>
            
            <div className="space-y-2">
              {leaves.length === 0 ? (
                <p className="text-center text-sm text-gray-500">
                  No leave requests
                </p>
              ) : (
                leaves.map((leave) => (
                  <button
                    type="button"
                    key={leave.id}
                    onClick={() => {
                      setSelectedLeave(leave);
                      setIsLeaveListOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-start text-sm transition ${
                      selectedLeave?.id === leave.id
                        ? "bg-[#1a472a] text-white"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <p className="truncate font-medium">
                      {leave.users?.name || "Unknown"}
                    </p>
                    <p className="text-xs opacity-75">
                      {formatLeaveRange(leave)}
                    </p>
                    <div
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        selectedLeave?.id === leave.id
                          ? "bg-white/20 text-white"
                          : getStatusColor(leave.status || "")
                      }`}
                    >
                      {getStatusIcon(leave.status || "")}
                      {leave.status || "pending"}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden">
          {viewMode === "calendar" ? (
            <div className="flex-1 overflow-hidden bg-white rounded-2xl shadow-sm p-4">
              <VacationCalendarView
                employees={employees.map((emp) => ({
                  id: emp.id,
                  name: emp.name || "Unknown",
                  email: emp.email || "",
                  userid: emp.userid || "",
                  leaves: leaves
                    .filter((l) => l.users?.id === emp.id)
                    .map((l) => ({
                      id: l.id,
                      user_id: emp.id,
                      leave_type: l.leave_type || "vacation",
                      start_date: l.start_date || "",
                      end_date: l.end_date || "",
                      status: l.status || "pending",
                      reason: l.reason,
                    })),
                }))}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                monthName={currentMonth.toLocaleString("default", { month: "long" })}
                daysArray={Array.from(
                  { length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() },
                  (_, i) => i + 1
                )}
                getLeaveForDay={(empId, day) => {
                  const emp = employees.find((e) => e.id === empId);
                  if (!emp) return null;
                  const target = Date.UTC(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                  const l = leaves.find((l) => {
                    if (l.users?.id !== empId || !l.start_date || !l.end_date) return false;
                    const s = new Date(l.start_date).getTime();
                    const e = new Date(l.end_date).getTime();
                    return target >= s && target <= e;
                  });
                  return l ? {
                    id: l.id,
                    user_id: emp.id,
                    leave_type: l.leave_type || "vacation",
                    start_date: l.start_date || "",
                    end_date: l.end_date || "",
                    status: l.status || "pending",
                    reason: l.reason
                  } : null;
                }}
              />
            </div>
          ) : selectedLeave ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-[#eef7ff] p-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => setSelectedLeave(null)}
                  className="rounded-lg p-2 hover:bg-white/50 lg:hidden"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[#1a472a] truncate">
                    {selectedLeave.users?.name || "Unknown"}'s Leave Request
                  </h2>
                  <p className="text-xs text-gray-600 truncate">
                    {selectedLeave.users?.email || "N/A"}
                  </p>
                </div>
                <div
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(selectedLeave.status || "")}`}
                >
                  {getStatusIcon(selectedLeave.status || "")}
                  {selectedLeave.status || "pending"}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto rounded-2xl bg-white p-4 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Employee Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Name</p>
                        <p className="font-medium">
                          {selectedLeave.users?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email</p>
                        <p className="font-medium">
                          {selectedLeave.users?.email || "N/A"}
                        </p>
                      </div>
                      {selectedLeave.users?.job_title && (
                        <div>
                          <p className="text-gray-500">Job Title</p>
                          <p className="font-medium">
                            {selectedLeave.users?.job_title}
                          </p>
                        </div>
                      )}
                      {selectedLeave.users?.department && (
                        <div>
                          <p className="text-gray-500">Department</p>
                          <p className="font-medium">
                            {selectedLeave.users?.department}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Leave Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Start Date</p>
                        <p className="font-medium">
                          {formatDate(selectedLeave.start_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">End Date</p>
                        <p className="font-medium">
                          {formatDate(selectedLeave.end_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Leave Type</p>
                        <p className="font-medium capitalize">
                          {selectedLeave.leave_type || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Requested On</p>
                        <p className="font-medium">
                          {formatDate(selectedLeave.created_at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <div
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(selectedLeave.status)}`}
                        >
                          {getStatusIcon(selectedLeave.status)}
                          {selectedLeave.status || "pending"}
                        </div>
                      </div>
                    </div>
                    {selectedLeave.reason && (
                      <div className="mt-4">
                        <p className="text-gray-500 text-sm">Reason</p>
                        <p className="font-medium">{selectedLeave.reason}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      Update Status
                    </h3>
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedLeave.status || "pending"}
                        onChange={(e) =>
                          handleUpdateStatus(selectedLeave.id, e.target.value)
                        }
                        disabled={updating}
                        className={`rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-[#1a472a] disabled:opacity-50 ${getStatusColor(selectedLeave.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      {updating && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1a472a] border-t-transparent"></div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleDeleteLeave(selectedLeave.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Request
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">
                  Select a leave request to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmationAlert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        description={alertConfig.description}
        type={alertConfig.type}
        onConfirm={alertConfig.onConfirm}
        onCancel={() => setAlertConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </motion.div>
  );
};

export default Leaves;
