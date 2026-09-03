'use client';

import React, { useEffect, useState } from 'react';
import { X, MapPin, Calendar, Clock, ExternalLink, RefreshCw } from 'lucide-react';
import { apiFetch } from '@/lib/api';

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

export default function LocationHistoryModal({
  employeeId,
  employeeName,
  isOpen,
  onClose,
}: LocationHistoryModalProps) {
  const [history, setHistory] = useState<LocationPing[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(7);

  useEffect(() => {
    if (!isOpen || !employeeId) return;

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/hr/employees/${employeeId}/location-history?days=${days}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.success && Array.isArray(data.data)) {
            setHistory(data.data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [isOpen, employeeId, days]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative flex max-h-[85vh] w-full max-w-2xl flex-col rounded-3xl bg-white shadow-2xl border border-slate-200/80 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Location History: {employeeName}
              </h3>
              <p className="text-xs text-slate-500">
                Audit trail of 30-minute location pings (Retained for up to 30 days)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Days Filter */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3 bg-white text-xs">
          <span className="text-slate-500 font-medium">Filter window:</span>
          <div className="flex gap-2">
            {[3, 7, 14, 30].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`rounded-lg px-3 py-1 font-semibold transition ${
                  days === d
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Last {d} Days
              </button>
            ))}
          </div>
        </div>

        {/* History Timeline */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3">
              <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
              <p className="text-xs font-medium">Loading location history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No pings recorded in this window</p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Pings are recorded every 30 minutes while the employee has an active Work Time session.
              </p>
            </div>
          ) : (
            <div className="relative border-l-2 border-emerald-200 ml-4 space-y-6">
              {history.map((ping) => {
                const dateObj = new Date(ping.recordedAt);
                return (
                  <div key={ping.id} className="relative pl-6 group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-600 shadow-sm"></div>

                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition group-hover:bg-white group-hover:shadow-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                          <Calendar className="h-3.5 w-3.5 text-slate-400" />
                          {dateObj.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                          <span className="text-slate-300">•</span>
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>

                        <a
                          href={`https://www.google.com/maps?q=${ping.latitude},${ping.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                        >
                          Google Maps <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                          {ping.latitude.toFixed(5)}, {ping.longitude.toFixed(5)}
                        </span>
                        {ping.accuracy && (
                          <span className="text-slate-400 text-[11px]">
                            Accuracy: &plusmn;{Math.round(ping.accuracy)}m
                          </span>
                        )}
                        <span className="ml-auto text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {ping.source || '30m Interval'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 px-6 py-4 bg-slate-50/50 flex justify-end">
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
