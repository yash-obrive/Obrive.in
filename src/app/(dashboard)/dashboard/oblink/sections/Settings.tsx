import { Settings, Play, Pause, AlertCircle } from "lucide-react";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function SettingsSection({ settings, onSettingsChange }: { settings: any, onSettingsChange?: () => void }) {
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

  const updateBatchSize = async () => {
    try {
      setIsUpdating(true);
      const res = await apiFetch('/oblink/settings/pause', {
        method: 'POST',
        body: JSON.stringify({ batchSize: parseInt(batchSize) })
      });
      if (res.ok && onSettingsChange) {
        onSettingsChange();
      }
    } catch (err) {
      console.error("Failed to update batch size", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100">
      <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
        <Settings className="w-6 h-6 text-slate-400" />
      </div>
      <h3 className="text-lg font-bold text-[#073933]">Engine Configuration</h3>
      <p className="text-sm text-slate-500 mt-2 max-w-sm mb-6">
        Control the background OBLINK AI engine manually.
      </p>

      {settings && (
        <div className="text-left bg-slate-50 border border-slate-100 rounded-xl p-5 w-full max-w-md space-y-6">
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-2">
              Engine Control
            </h4>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                {settings.GLOBAL_PAUSE ? (
                  <div className="bg-red-50 p-2 rounded-lg text-red-600"><Pause className="w-5 h-5" /></div>
                ) : (
                  <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><Play className="w-5 h-5" /></div>
                )}
                <div>
                  <p className="text-sm font-bold text-[#073933]">
                    {settings.GLOBAL_PAUSE ? "Engine Paused" : "Engine Running"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {settings.GLOBAL_PAUSE ? "Background crawling and publishing is halted." : "Actively processing targets in the background."}
                  </p>
                </div>
              </div>
              <button 
                onClick={toggleEngine}
                disabled={isUpdating}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                  settings.GLOBAL_PAUSE 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-red-600 hover:bg-red-700 text-white"
                } disabled:opacity-50`}
              >
                {isUpdating ? "Updating..." : settings.GLOBAL_PAUSE ? "Start Engine" : "Pause Engine"}
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-2">
              Batch Settings
            </h4>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600"><Settings className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm font-bold text-[#073933]">
                    Publishing Batch Size
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Number of targets to process in one go.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={batchSize} 
                  onChange={(e) => setBatchSize(e.target.value)}
                  className="w-16 px-2 py-1 border border-slate-200 rounded text-sm text-center"
                  min="1"
                  max="100"
                />
                <button 
                  onClick={updateBatchSize}
                  disabled={isUpdating || parseInt(batchSize) === settings.BATCH_SIZE}
                  className="px-3 py-1 text-xs font-bold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 border-b border-slate-200 pb-2">
              Environment Variables
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm bg-white p-2 rounded border border-slate-100">
                <span className="text-slate-500">DRY_RUN:</span>
                <span className={settings.DRY_RUN ? "text-amber-600 font-bold" : "text-slate-700 font-bold"}>
                  {settings.DRY_RUN ? "TRUE (Simulation)" : "FALSE (Live)"}
                </span>
              </div>
              <div className="flex justify-between text-sm bg-white p-2 rounded border border-slate-100">
                <span className="text-slate-500">BATCH_SIZE:</span>
                <span className="text-slate-700 font-bold">
                  {settings.BATCH_SIZE || 10}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
