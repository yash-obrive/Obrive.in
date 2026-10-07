import { Target, Link as LinkIcon, AlertTriangle, Activity, Play, Pause, Settings } from "lucide-react";
import type { OblinkStats, OblinkHealth, OblinkTarget } from "../useOblinkData";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function OverviewSection({ 
  stats, 
  health,
  targets,
  settings,
  onSettingsChange
}: { 
  stats: OblinkStats | null, 
  health: OblinkHealth | null,
  targets: OblinkTarget[],
  settings?: any,
  onSettingsChange?: () => void
}) {
  const engineStatus = health?.status || "UNKNOWN";
  const isHealthy = engineStatus === "HEALTHY";
  const [isUpdating, setIsUpdating] = useState(false);
  const [batchSize, setBatchSize] = useState(settings?.BATCH_SIZE || 10);
  
  const toggleEngine = async () => {
    try {
      setIsUpdating(true);
      const newPauseState = !settings.GLOBAL_PAUSE;
      const res = await apiFetch('/oblink/settings/pause', {
        method: 'POST',
        body: JSON.stringify({ pause: newPauseState, batchSize: parseInt(batchSize) })
      });
      if (res.ok && onSettingsChange) {
        onSettingsChange();
      }
    } catch (err) {
      console.error("Failed to toggle engine", err);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const statCards = [
    {
      label: "System Health",
      value: engineStatus,
      icon: Activity,
      bg: engineStatus === "HEALTHY" ? "bg-emerald-50" : (engineStatus === "DEGRADED" ? "bg-orange-50" : (engineStatus === "PAUSED" ? "bg-blue-50" : "bg-red-50")),
      color: engineStatus === "HEALTHY" ? "text-emerald-700" : (engineStatus === "DEGRADED" ? "text-orange-700" : (engineStatus === "PAUSED" ? "text-blue-700" : "text-red-700")),
    },
    {
      label: "Active Targets",
      value: stats?.activeTargets ?? "—",
      icon: Target,
      bg: "bg-[#eef7ff]",
      color: "text-[#073933]",
    },
    {
      label: "Publish Ready",
      value: stats?.readyToPublish ?? "—",
      icon: Play,
      bg: "bg-indigo-50",
      color: "text-indigo-700",
    },
    {
      label: "Publishing",
      value: stats?.publishing ?? "—",
      icon: Activity,
      bg: "bg-blue-50",
      color: "text-blue-700",
    },
    {
      label: "Published",
      value: stats?.published ?? "—",
      icon: LinkIcon,
      bg: "bg-[#f0fdf4]",
      color: "text-green-700",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 flex flex-col gap-2"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </p>
            <p className="text-xs text-slate-500 font-medium">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Engine Status Details */}
      <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4">
        <h2 className="text-xl font-bold text-[#073933]">Engine Status</h2>
        
        <div className="flex items-center gap-3 bg-[#F4F9FD] p-4 rounded-xl border border-blue-100 justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`h-4 w-4 rounded-full ${isHealthy || settings?.GLOBAL_PAUSE === false ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              {(isHealthy || settings?.GLOBAL_PAUSE === false) && <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>}
            </div>
            <div>
              <p className="text-sm font-bold text-[#073933]">
                OBLINK Background Workers
              </p>
              <p className="text-xs text-slate-500">
                {settings?.GLOBAL_PAUSE === false ? "Workers are currently running and processing queues." : "Workers are paused or degraded."}
              </p>
            </div>
          </div>
          
          {settings && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Batch Size</span>
                <input 
                  type="number" 
                  value={batchSize} 
                  onChange={(e) => setBatchSize(e.target.value)}
                  className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-sm text-center text-[#073933] font-bold"
                  min="1"
                  max="100"
                />
              </div>
              <button
                onClick={toggleEngine}
                disabled={isUpdating}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white shadow-sm transition-all duration-200 ${
                  settings.GLOBAL_PAUSE
                    ? "bg-[#073933] hover:bg-[#0a4a42]"
                    : "bg-red-600 hover:bg-red-700"
                } disabled:opacity-50`}
              >
                {settings.GLOBAL_PAUSE ? (
                  <>
                    <Play className="w-4 h-4" /> Start Engine
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4" /> Pause Engine
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      {targets.length > 0 && (
        <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-3">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Recent Target Discoveries
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="pb-2 text-start">Domain</th>
                  <th className="pb-2 text-start">Platform</th>
                  <th className="pb-2 text-start">Status</th>
                  <th className="pb-2 text-start">Found</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {targets.slice(0, 5).map((target) => (
                  <tr key={target.id} className="hover:bg-[#F4F9FD]/60 transition">
                    <td className="py-2 font-medium text-[#073933] truncate max-w-[150px]">
                      <a href={target.domain.startsWith('http') ? target.domain : `https://${target.domain}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                        {target.domain}
                      </a>
                    </td>
                    <td className="py-2 text-slate-500">
                      {target.platform || "Unknown"}
                    </td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                        {target.target_status}
                      </span>
                    </td>
                    <td className="py-2 text-slate-400">
                      {formatDistanceToNow(new Date(target.created_at), { addSuffix: true })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
