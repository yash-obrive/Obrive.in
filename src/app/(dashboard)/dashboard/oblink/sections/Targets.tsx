import type { OblinkTarget } from "../useOblinkData";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { X, Play, ShieldAlert, ShieldCheck } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function TargetsSection({ 
  targets, 
  meta, 
  settings,
  onPageChange 
}: { 
  targets: OblinkTarget[], 
  meta: any, 
  settings: any,
  onPageChange: (page: number) => void 
}) {
  const [selectedTarget, setSelectedTarget] = useState<OblinkTarget | null>(null);
  const [publishConfirmTarget, setPublishConfirmTarget] = useState<OblinkTarget | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);

  const handlePublish = async (targetId: number) => {
    setIsPublishing(true);
    setPublishError(null);
    try {
      const res = await apiFetch('/oblink/actions/publish', {
        method: 'POST',
        body: JSON.stringify({ targetId })
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || `Publish request failed with status ${res.status}`);
      }
      setPublishConfirmTarget(null);
      setSelectedTarget(null);
      onPageChange(meta?.page || 1);
    } catch (err) {
      setPublishError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsPublishing(false);
    }
  };
  
  if (!targets || targets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100">
        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#073933]">No Targets Discovered</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          The system has not found any targets yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#073933]">Discovered Targets</h2>
        <span className="text-xs font-bold bg-[#eef7ff] text-[#073933] px-2 py-1 rounded-full">
          Total: {meta?.total || targets.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3 pt-2 text-start px-2">Domain</th>
              <th className="pb-3 pt-2 text-start">Platform</th>
              <th className="pb-3 pt-2 text-start">Auth</th>
              <th className="pb-3 pt-2 text-start">Opp. Type</th>
              <th className="pb-3 pt-2 text-start">Status</th>
              <th className="pb-3 pt-2 text-start">Last Validated</th>
              <th className="pb-3 pt-2 text-start">Last Published</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {targets.map((target) => (
              <tr 
                key={target.id} 
                className="hover:bg-[#F4F9FD]/60 transition cursor-pointer"
                onClick={() => setSelectedTarget(target)}
              >
                <td className="py-3 px-2 font-medium text-[#073933] truncate max-w-[120px]" title={target.domain}>
                  {target.domain}
                </td>
                <td className="py-3 text-slate-600 text-xs truncate max-w-[100px]" title={target.platform}>
                  {target.platform || 'Unknown'}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded border text-[9px] font-bold ${
                    target.authorization_status === 'AUTHORIZED' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    {target.authorization_status || 'UNAUTHORIZED'}
                  </span>
                </td>
                <td className="py-3 text-slate-600 text-xs">
                  {target.opportunity_type || '—'}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-[9px] font-bold ${
                    target.target_status === 'PUBLISHED' ? 'bg-green-100 text-green-700' :
                    target.target_status === 'VERIFICATION_FAILED' ? 'bg-orange-100 text-orange-700' :
                    target.target_status === 'PUBLISHING' ? 'bg-indigo-100 text-indigo-700' :
                    target.target_status === 'PUBLISH_FAILED' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {target.target_status.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-3 text-slate-400 text-xs whitespace-nowrap">
                  {target.last_validation ? formatDistanceToNow(new Date(target.last_validation), { addSuffix: true }) : '—'}
                </td>
                <td className="py-3 text-slate-400 text-xs whitespace-nowrap">
                  {target.last_publication ? formatDistanceToNow(new Date(target.last_publication), { addSuffix: true }) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4 px-2">
          <button
            disabled={meta.page <= 1}
            onClick={() => onPageChange(meta.page - 1)}
            className="px-3 py-1 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500 font-medium">
            Page {meta.page} of {meta.totalPages}
          </span>
          <button
            disabled={meta.page >= meta.totalPages}
            onClick={() => onPageChange(meta.page + 1)}
            className="px-3 py-1 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Target Detail Modal */}
      {selectedTarget && !publishConfirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#F4F9FD]">
              <h3 className="font-bold text-[#073933] flex items-center gap-2">
                Target Details
              </h3>
              <button 
                onClick={() => setSelectedTarget(null)}
                className="p-1 hover:bg-slate-200 rounded-lg transition text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Domain</p>
                  <p className="font-medium text-[#073933]">{selectedTarget.domain}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Platform</p>
                  <p className="font-medium text-[#073933]">{selectedTarget.platform}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Target URL</p>
                  <a href={selectedTarget.url.startsWith('http') ? selectedTarget.url : `https://${selectedTarget.url}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                    {selectedTarget.url}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Authorization Status</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${selectedTarget.authorization_status === 'AUTHORIZED' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'}`}>
                    {selectedTarget.authorization_status || 'UNAUTHORIZED'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Publishing Method</span>
                  <span className="text-slate-700 font-bold text-xs">{selectedTarget.publishing_method || 'REST API'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Current State</span>
                  <span className="text-[#073933] font-bold text-xs px-2 py-1 bg-slate-200 rounded">{selectedTarget.target_status}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedTarget(null)}
                className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Close
              </button>
              
              {selectedTarget.authorization_status === 'AUTHORIZED' && 
               (selectedTarget.target_status === 'PUBLISH_READY' || selectedTarget.target_status === 'READY_TO_PUBLISH') && (
                <button
                  onClick={() => setPublishConfirmTarget(selectedTarget)}
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Initiate Publication
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Publish Confirmation Modal */}
      {publishConfirmTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600 ml-1" />
              </div>
              <h3 className="text-xl font-bold text-[#073933]">Confirm Publication</h3>
              <p className="text-sm text-slate-500">
                You are about to instruct the OBLINK AI engine to publish content to <strong className="text-[#073933]">{publishConfirmTarget.domain}</strong> on platform <strong className="text-[#073933]">{publishConfirmTarget.platform || 'Unknown'}</strong>.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Content Preview</p>
                <p className="text-xs text-slate-700 line-clamp-3 italic">
                  "{publishConfirmTarget.content || 'Generated SEO Content will be pulled from backend at runtime.'}"
                </p>
              </div>
              
              {settings?.DRY_RUN && (
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-xl flex items-start gap-3 text-left">
                  <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-orange-800 text-sm">SIMULATION / DRY RUN ACTIVE</p>
                    <p className="text-xs text-orange-700 mt-1">
                      No real data will be transmitted. The engine will simulate success.
                    </p>
                  </div>
                </div>
              )}

              {publishError && (
                <div className="bg-red-50 text-red-700 text-sm p-3 rounded-xl border border-red-100 text-left">
                  <strong>Action Failed:</strong> {publishError}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                disabled={isPublishing}
                onClick={() => { setPublishConfirmTarget(null); setPublishError(null); }}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isPublishing}
                onClick={() => handlePublish(publishConfirmTarget.id)}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isPublishing ? "Processing..." : (settings?.DRY_RUN ? "Simulate Publish" : "Publish Now")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
