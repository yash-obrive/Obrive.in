"use client";

import { Circle, ShieldX, Trash2, User, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ConfirmationAlert from "@/components/ConfirmationAlert";
import { apiFetch } from "@/lib/api";

interface Employee {
  id: number;
  name: string;
  email: string;
  job_title?: string;
  department?: string;
  status?: string;
  is_active?: boolean;
}

interface EmployeesListProps {
  setActiveSection: (section: string) => void;
}

export default function EmployeesList(_props: EmployeesListProps) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [groupBy, setGroupBy] = useState<"none" | "department" | "job_title">("none");
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response = await apiFetch("/auth/me", { method: "GET" });
      const result = await response.json();
      if (result.success && result.data) {
        setCurrentUserRole(result.data.role);
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiFetch("/supervisor/employees", {
        method: "GET",
      });
      const result = await response.json();
      if (result.success) {
        setEmployees(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchEmployees();
  }, [fetchEmployees, fetchCurrentUser]);

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "busy":
        return "bg-red-500";
      case "inactive":
        return "bg-amber-500";
      default:
        return "bg-gray-300";
    }
  };

  const handleBlockEmployee = (employee: Employee) => {
    setAlertConfig({
      isOpen: true,
      title: "Block User",
      description: `Block ${employee.name}'s access? They will no longer be able to use the dashboard.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await apiFetch(
            `/supervisor/employees/${employee.id}/block`,
            {
              method: "PATCH",
            },
          );
          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to block user");
          }

          setEmployees((prev) =>
            prev.map((item) =>
              item.id === employee.id
                ? { ...item, status: "inactive", is_active: false }
                : item,
            ),
          );

          setAlertConfig({
            isOpen: true,
            title: "User Blocked",
            description: `${employee.name} can no longer access the dashboard.`,
            type: "success",
          });
        } catch (error) {
          setAlertConfig({
            isOpen: true,
            title: "Error",
            description:
              error instanceof Error ? error.message : "Failed to block user",
            type: "error",
          });
        }
      },
    });
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setAlertConfig({
      isOpen: true,
      title: "Delete User",
      description: `Delete ${employee.name}? This removes the user record and blocks future access permanently.`,
      type: "warning",
      onConfirm: async () => {
        try {
          const response = await apiFetch(
            `/supervisor/employees/${employee.id}`,
            {
              method: "DELETE",
            },
          );
          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || "Failed to delete user");
          }

          setEmployees((prev) =>
            prev.filter((item) => item.id !== employee.id),
          );
          setAlertConfig({
            isOpen: true,
            title: "User Deleted",
            description: `${employee.name} was removed successfully.`,
            type: "success",
          });
        } catch (error) {
          setAlertConfig({
            isOpen: true,
            title: "Error",
            description:
              error instanceof Error ? error.message : "Failed to delete user",
            type: "error",
          });
        }
      },
    });
  };

  const handleImpersonate = async (employee: Employee) => {
    try {
      const response = await apiFetch(`/supervisor/employees/${employee.id}/impersonate`, {
        method: "POST",
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to impersonate");
      }

      // Reload the page to apply the new impersonated session token
      window.location.href = "/dashboard";
    } catch (error) {
      setAlertConfig({
        isOpen: true,
        title: "Impersonation Failed",
        description: error instanceof Error ? error.message : "Failed to impersonate",
        type: "error",
      });
    }
  };

  const renderEmployeeCard = (employee: Employee) => (
    <div
      key={employee.id}
      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-[#1a472a]/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {employee.name}
            </h3>
            <Circle
              className={`h-2 w-2 flex-shrink-0 ${getStatusColor(employee.status)}`}
              fill="currentColor"
            />
          </div>
          <p className="text-xs text-gray-500 truncate">{employee.email}</p>
          {employee.job_title && (
            <p className="text-xs text-gray-600 mt-1">{employee.job_title}</p>
          )}
          {employee.department && (
            <p className="text-xs text-gray-500">{employee.department}</p>
          )}
          {employee.status?.toLowerCase() === "inactive" ||
          employee.is_active === false ? (
            <p className="mt-2 text-[11px] font-medium text-amber-600">
              Access blocked
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
          {currentUserRole === 'super_admin' && (
            <button
              type="button"
              onClick={() => handleImpersonate(employee)}
              className="rounded-lg p-2 text-[#1a472a] transition hover:bg-[#1a472a]/10"
              title="Login as User"
            >
              <User className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => handleBlockEmployee(employee)}
            disabled={
              employee.status?.toLowerCase() === "inactive" ||
              employee.is_active === false
            }
            className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-40"
            title="Block access"
          >
            <ShieldX className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteEmployee(employee)}
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            title="Delete user"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const getGroupedEmployees = () => {
    if (groupBy === "none") return { "All Employees": employees };
    
    return employees.reduce((groups, emp) => {
      let groupKey = "Uncategorized";
      if (groupBy === "department" && emp.department) groupKey = emp.department;
      if (groupBy === "job_title" && emp.job_title) groupKey = emp.job_title;
      
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(emp);
      return groups;
    }, {} as Record<string, Employee[]>);
  };

  const groupedData = getGroupedEmployees();

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-br from-[#eef7ff] to-[#e2f5f1] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-[#1a472a]" />
            <h2 className="text-lg font-bold text-[#1a472a]">Team Members</h2>
          </div>
          <p className="text-sm text-gray-600">
            {employees.length} employee{employees.length !== 1 ? "s" : ""} in your
            team
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-[#1a472a]">Group By:</label>
          <select 
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value as any)}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 outline-none focus:ring-2 focus:ring-[#1a472a]/20 bg-white text-gray-700"
          >
            <option value="none">None</option>
            <option value="department">Department</option>
            <option value="job_title">Job Title</option>
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((item) => (
            <div
              key={`employee-skeleton-${item}`}
              className="h-20 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : employees.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
          <User className="h-8 w-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">No employees found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedData).map(([groupName, groupEmployees]) => (
            <div key={groupName} className="space-y-3">
              {groupBy !== "none" && (
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-100 pb-2">
                  {groupName} <span className="ms-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{groupEmployees.length}</span>
                </h3>
              )}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {groupEmployees.map(renderEmployeeCard)}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationAlert
        isOpen={alertConfig.isOpen}
        title={alertConfig.title}
        description={alertConfig.description}
        type={alertConfig.type}
        onConfirm={alertConfig.onConfirm}
        onCancel={() =>
          setAlertConfig((prev) => ({
            ...prev,
            isOpen: false,
            onConfirm: undefined,
          }))
        }
      />
    </div>
  );
}
