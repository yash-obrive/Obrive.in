'use client';

import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Users,
  MapPin,
  ShieldCheck,
  Search,
  RefreshCw,
  ExternalLink,
  Clock,
  History,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { isEmployeeLive, type TrackedEmployee } from './EmployeeLocationMap';
import LocationHistoryModal from './LocationHistoryModal';

function formatPingTimestamp(dateStr?: string | null): string {
  if (!dateStr) return 'No pings yet';
  const pingDate = new Date(dateStr);
  const now = new Date();
  const isToday =
    pingDate.getDate() === now.getDate() &&
    pingDate.getMonth() === now.getMonth() &&
    pingDate.getFullYear() === now.getFullYear();

  const timeStr = pingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (isToday) {
    return `Today at ${timeStr}`;
  }
  const dateStrFormatted = pingDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  return `${dateStrFormatted} at ${timeStr}`;
}

// Dynamically import Leaflet Map with SSR disabled
const EmployeeLocationMap = dynamic(
  () => import('./EmployeeLocationMap'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full min-h-[350px] flex items-center justify-center bg-slate-100/70 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-400 gap-2">
        <RefreshCw className="h-4 w-4 animate-spin text-emerald-600" />
        Loading Interactive Map...
      </div>
    ),
  }
);

export default function HRLocationsSection() {
  const [employees, setEmployees] = useState<TrackedEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTracking, setFilterTracking] = useState<'all' | 'enabled' | 'disabled'>('all');
  const [togglingId, setTogglingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // History modal state
  const [selectedHistoryEmp, setSelectedHistoryEmp] = useState<{ id: number; name: string } | null>(null);

  // Fetch employees and location overview
  const fetchLocations = useCallback(async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      else setRefreshing(true);

      const res = await apiFetch('/hr/locations');
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.data)) {
          setEmployees(data.data);
          setError(null);
        }
      } else if (res.status === 403) {
        setError('Access Denied: You are currently logged in with a non-HR account. Please log in with HR credentials (e.g. hr@obrive.com) to manage staff locations.');
      } else {
        setError('Unable to load employee locations. Please ensure you are logged in.');
      }
    } catch (err) {
      console.error('Failed to fetch employee locations:', err);
      setError('Connection error loading locations.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  // Handle Toggle Switch
  const handleToggleTracking = async (employeeId: number, currentStatus: boolean) => {
    try {
      setTogglingId(employeeId);
      const nextStatus = !currentStatus;

      // Optimistic update
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId ? { ...emp, is_location_tracking_enabled: nextStatus } : emp
        )
      );

      const res = await apiFetch(`/hr/employees/${employeeId}/location-tracking`, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: nextStatus }),
      });

      if (!res.ok) {
        // Rollback on failure
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === employeeId ? { ...emp, is_location_tracking_enabled: currentStatus } : emp
          )
        );
      }
    } catch (err) {
      console.error('Toggle failed:', err);
      // Rollback
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeId ? { ...emp, is_location_tracking_enabled: currentStatus } : emp
        )
      );
    } finally {
      setTogglingId(null);
    }
  };

  // Filtered employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.job_title && emp.job_title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filterTracking === 'enabled') return matchesSearch && emp.is_location_tracking_enabled;
    if (filterTracking === 'disabled') return matchesSearch && !emp.is_location_tracking_enabled;
    return matchesSearch;
  });

  const totalEmployees = employees.length;
  const trackedCount = employees.filter((e) => e.is_location_tracking_enabled).length;
  const liveCount = employees.filter((e) => e.latitude != null && isEmployeeLive(e)).length;

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 space-y-4">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-md bg-[#073933]/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#073933]">
              HR Administration
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">Locations</span>
          </div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">
            Employee Location Tracking
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure per-employee location monitoring, view live GPS coordinates on the interactive map, and inspect historical audit trails.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchLocations(true)}
          disabled={refreshing}
          className="self-start sm:self-auto flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 transition disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh Data
        </button>
      </div>

      {/* Access Denied / Error Banner */}
      {error && (
        <div className="rounded-2xl bg-amber-50 border border-amber-200/80 p-4 shadow-sm flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 font-bold text-sm">
            !
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-amber-900">Authentication Notice</h3>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
            <p className="text-xl font-black text-slate-900">{totalEmployees}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#073933]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tracking Enabled</p>
            <p className="text-xl font-black text-slate-900">{trackedCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-slate-200/80 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Live GPS Staff</p>
            <p className="text-xl font-black text-slate-900">{liveCount}</p>
          </div>
        </div>
      </div>

      {/* Hybrid View Part 1: Interactive Map Widget */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#073933]" />
            <h2 className="text-sm font-bold text-slate-900">Live Employee Map</h2>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE NOW
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Displaying live markers for staff currently active with GPS
          </span>
        </div>

        <div className="h-[340px] w-full">
          <EmployeeLocationMap employees={employees} />
        </div>
      </div>

      {/* Hybrid View Part 2: Employee Location Management Table */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role, department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#073933]"
            />
          </div>

          <div className="flex gap-2 self-start sm:self-auto">
            {(['all', 'enabled', 'disabled'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setFilterTracking(filter)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold capitalize transition ${
                  filterTracking === filter
                    ? 'bg-[#073933] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {filter === 'all' ? 'All Staff' : `Tracking ${filter}`}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold">
                <th className="pb-3 pl-2">Employee</th>
                <th className="pb-3">Department & Role</th>
                <th className="pb-3 text-center">Tracking Status</th>
                <th className="pb-3">Last GPS Ping</th>
                <th className="pb-3 text-right pr-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                    <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-[#073933]" />
                    Loading employee directory...
                  </td>
                </tr>
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                    No employees match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => {
                  const initials = emp.name ? emp.name.charAt(0).toUpperCase() : 'E';
                  const isToggling = togglingId === emp.id;

                  return (
                    <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                      
                      {/* Name & Avatar */}
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs overflow-hidden border border-slate-200">
                            {emp.avatar_url ? (
                              <img src={emp.avatar_url} alt={emp.name} className="h-full w-full object-cover" />
                            ) : (
                              initials
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{emp.name}</p>
                            <p className="text-slate-400 text-[10px]">{emp.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Department & Role */}
                      <td className="py-3">
                        <p className="font-semibold text-slate-800 text-xs">{emp.job_title || 'Employee'}</p>
                        <p className="text-slate-400 text-[10px]">{emp.department || 'General'}</p>
                      </td>

                      {/* Interactive Toggle Switch */}
                      <td className="py-3 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleToggleTracking(emp.id, emp.is_location_tracking_enabled)}
                            disabled={isToggling}
                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              emp.is_location_tracking_enabled ? 'bg-emerald-600' : 'bg-slate-300'
                            } ${isToggling ? 'opacity-50 cursor-wait' : ''}`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                emp.is_location_tracking_enabled ? 'translate-x-4' : 'translate-x-0'
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider ${
                              emp.is_location_tracking_enabled ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          >
                            {emp.is_location_tracking_enabled ? 'ON' : 'OFF'}
                          </span>
                        </div>
                      </td>

                      {/* Last Location & Live Status */}
                      <td className="py-3">
                        {emp.latitude != null && emp.longitude != null ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-800">
                              <MapPin
                                className={`h-3 w-3 ${
                                  isEmployeeLive(emp) ? 'text-emerald-600' : 'text-slate-400'
                                }`}
                              />
                              <span>
                                {emp.latitude.toFixed(4)}, {emp.longitude.toFixed(4)}
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
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                              <Clock className="h-2.5 w-2.5" />
                              <span>{formatPingTimestamp(emp.last_ping_at)}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 italic">
                            No pings recorded
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 pr-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {emp.latitude != null && emp.longitude != null && (
                            <a
                              href={`https://www.google.com/maps?q=${emp.latitude},${emp.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition"
                            >
                              Maps <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => setSelectedHistoryEmp({ id: emp.id, name: emp.name })}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-700 hover:bg-slate-100 transition"
                          >
                            <History className="h-2.5 w-2.5 text-slate-500" />
                            History
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
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

    </div>
  );
}
