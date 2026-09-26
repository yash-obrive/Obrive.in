"use client";

import {
  Calendar,
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  RefreshCw,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { apiFetch } from "@/lib/api";

interface LocationPing {
  id: number;
  latitude: number;
  longitude: number;
  accuracy: number | null;
  source: string | null;
  recordedAt: string;
}

interface LocationHistoryModalProps {
  employeeId: number;
  employeeName: string;
  isOpen: boolean;
  onClose: () => void;
}

type FilterPreset = "today" | "yesterday" | "7d" | "30d" | "all" | "custom";

export default function LocationHistoryModal({
  employeeId,
  employeeName,
  isOpen,
  onClose,
}: LocationHistoryModalProps) {
  const [history, setHistory] = useState<LocationPing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<FilterPreset>("today");
  const [customDate, setCustomDate] = useState<string>("");

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  const fetchHistory = useCallback(async () => {
    if (!isOpen || !employeeId) return;

    try {
      setLoading(true);
      const tzOffset = new Date().getTimezoneOffset();
      let query = `timezoneOffset=${tzOffset}`;

      if (filterType === "custom" && customDate) {
        query += `&date=${encodeURIComponent(customDate)}`;
      } else {
        query += `&filter=${filterType}`;
      }

      const res = await apiFetch(
        `/hr/employees/${employeeId}/location-history?${query}`,
      );
      if (res.ok) {
        const data = await res.json();
        if (data?.success && Array.isArray(data.data)) {
          setHistory(data.data);
        } else {
          setHistory([]);
        }
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }, [isOpen, employeeId, filterType, customDate]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Group history records by local calendar date
  const groupedHistory = useMemo(() => {
    const groups: {
      dateKey: string;
      title: string;
      pings: (LocationPing & { intervalMinutes?: number | null })[];
    }[] = [];

    const map = new Map<string, LocationPing[]>();

    history.forEach((ping) => {
      const d = new Date(ping.recordedAt);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey)?.push(ping);
    });

    const todayDate = new Date();
    const todayKey = `${todayDate.getFullYear()}-${String(todayDate.getMonth() + 1).padStart(2, "0")}-${String(todayDate.getDate()).padStart(2, "0")}`;

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayKey = `${yesterdayDate.getFullYear()}-${String(yesterdayDate.getMonth() + 1).padStart(2, "0")}-${String(yesterdayDate.getDate()).padStart(2, "0")}`;

    // Sort date keys descending (newest dates first)
    const sortedKeys = Array.from(map.keys()).sort((a, b) =>
      b.localeCompare(a),
    );

    sortedKeys.forEach((key) => {
      const pings = map.get(key)!;
      // Sort pings descending (newest time first)
      pings.sort(
        (a, b) =>
          new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
      );

      // Compute interval between consecutive pings on the same day
      const pingsWithInterval = pings.map((p, idx) => {
        let intervalMinutes: number | null = null;
        if (idx < pings.length - 1) {
          const currentTime = new Date(p.recordedAt).getTime();
          const prevTime = new Date(pings[idx + 1].recordedAt).getTime();
          const diffMins = Math.round((currentTime - prevTime) / (1000 * 60));
          if (diffMins > 0) {
            intervalMinutes = diffMins;
          }
        }
        return { ...p, intervalMinutes };
      });

      const [year, month, day] = key.split("-").map(Number);
      const parsedDate = new Date(year, month - 1, day);
      const dateFormatted = parsedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      let title = dateFormatted;
      if (key === todayKey) {
        title = `Today • ${dateFormatted}`;
      } else if (key === yesterdayKey) {
        title = `Yesterday • ${dateFormatted}`;
      }

      groups.push({
        dateKey: key,
        title,
        pings: pingsWithInterval,
      });
    });

    return groups;
  }, [history]);

  const activeFilterLabel = useMemo(() => {
    if (filterType === "today") return "Today";
    if (filterType === "yesterday") return "Yesterday";
    if (filterType === "7d") return "Last 7 Days";
    if (filterType === "30d") return "Last 30 Days";
    if (filterType === "all") return "All Logs";
    if (filterType === "custom")
      return customDate ? `Date: ${customDate}` : "Custom Date";
    return "";
  }, [filterType, customDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col rounded-3xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Location History: {employeeName}
              </h3>
              <p className="text-xs text-slate-500">
                Audit trail of 30-minute location pings (Retained up to 30 days)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchHistory}
              disabled={loading}
              title="Refresh logs"
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin text-emerald-600" : ""}`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="border-b border-slate-100 px-6 py-3 bg-white space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: "today", label: "Today" },
                { key: "yesterday", label: "Yesterday" },
                { key: "7d", label: "Last 7 Days" },
                { key: "30d", label: "Last 30 Days" },
                { key: "all", label: "All" },
              ].map(({ key, label }) => {
                const isActive = filterType === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setFilterType(key as FilterPreset);
                      setCustomDate("");
                    }}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#073933] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Custom Date Picker */}
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs transition focus-within:border-[#073933] focus-within:bg-white">
              <CalendarDays className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <input
                type="date"
                max={todayStr}
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  if (e.target.value) {
                    setFilterType("custom");
                  }
                }}
                className="bg-transparent text-xs text-slate-700 font-medium focus:outline-none cursor-pointer"
                title="Filter by specific date"
              />
              {customDate && (
                <button
                  type="button"
                  title="Clear date filter"
                  onClick={() => {
                    setCustomDate("");
                    setFilterType("today");
                  }}
                  className="rounded-full p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Result Count and Active Filter Indicator */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Filter:</span>
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                {activeFilterLabel}
              </span>
            </div>
            <div>
              {loading ? (
                <span className="italic text-slate-400">Updating...</span>
              ) : (
                <span>
                  Showing{" "}
                  <strong className="text-slate-800">{history.length}</strong>{" "}
                  {history.length === 1 ? "ping" : "pings"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[58vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
              <p className="text-xs font-medium">Loading location history...</p>
            </div>
          ) : groupedHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <MapPin className="h-7 w-7" />
              </div>
              <p className="text-sm font-semibold text-slate-800">
                No pings recorded for {activeFilterLabel}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">
                Pings are recorded every 30 minutes while the employee has an
                active Work Time session with location permissions enabled.
              </p>
              {filterType !== "7d" && (
                <button
                  type="button"
                  onClick={() => {
                    setFilterType("7d");
                    setCustomDate("");
                  }}
                  className="mt-4 rounded-xl bg-slate-100 hover:bg-slate-200 px-3.5 py-1.5 text-xs font-bold text-slate-700 transition"
                >
                  View Last 7 Days Instead
                </button>
              )}
            </div>
          ) : (
            groupedHistory.map((group) => (
              <div key={group.dateKey} className="space-y-3">
                {/* Date Group Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-800">
                      {group.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {group.pings.length}{" "}
                    {group.pings.length === 1 ? "ping" : "pings"}
                  </span>
                </div>

                {/* Timeline for this date */}
                <div className="relative border-l-2 border-emerald-200 ml-3.5 space-y-4">
                  {group.pings.map((ping) => {
                    const dateObj = new Date(ping.recordedAt);
                    return (
                      <div key={ping.id} className="relative pl-6 group">
                        {/* Timeline Node */}
                        <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-white bg-emerald-600 shadow-sm"></div>

                        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 transition group-hover:bg-white group-hover:shadow-md group-hover:border-emerald-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                              <Clock className="h-3.5 w-3.5 text-emerald-600" />
                              <span>
                                {dateObj.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {ping.intervalMinutes && (
                                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded-md">
                                  ~{ping.intervalMinutes}m interval
                                </span>
                              )}
                            </div>

                            <a
                              href={`https://www.google.com/maps?q=${ping.latitude},${ping.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                            >
                              Google Maps <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                            <span className="font-mono bg-white px-2 py-0.5 rounded-lg border border-slate-200 text-[11px]">
                              {ping.latitude.toFixed(5)},{" "}
                              {ping.longitude.toFixed(5)}
                            </span>
                            {ping.accuracy && (
                              <span className="text-slate-500 text-[11px]">
                                Accuracy: &plusmn;{Math.round(ping.accuracy)}m
                              </span>
                            )}
                            <span className="ml-auto text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                              {ping.source || "30m Interval"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 px-6 py-3.5 bg-slate-50/70 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Total recorded:{" "}
            <strong className="text-slate-700">{history.length}</strong> events
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
