import type { OblinkLink } from "../useOblinkData";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { apiFetch } from "@/lib/api";

export default function PublishedLinksSection({ 
  links, 
  meta, 
  settings,
  onPageChange 
}: { 
  links: OblinkLink[], 
  meta: any, 
  settings: any,
  onPageChange: (page: number) => void 
}) {
  const [selectedLink, setSelectedLink] = useState<OblinkLink | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Exclude fully SIMULATED records from main render count (rule 10)
  const validLinks = links?.filter(l => l.status !== 'SIMULATED') || [];
  
  const handleRetryVerification = async (linkId: number) => {
    setIsRetrying(true);
    setActionError(null);
    try {
      const res = await apiFetch(`/oblink/actions/verify/${linkId}`, {
        method: 'POST'
      });
      if (!res.ok) {
        throw new Error(`Verification retry failed with status ${res.status}`);
      }
      onPageChange(meta?.page || 1);
      setSelectedLink(null);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsRetrying(false);
    }
  };

  if (validLinks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100">
        <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-[#073933]">No Links Published Yet</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          No genuine, verified publications are available.
        </p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
      case 'VERIFIED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">VERIFIED</span>;
      case 'VERIFICATION_FAILED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-100">VERIFICATION FAILED</span>;
      case 'BROKEN':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-100">BROKEN</span>;
      case 'MANUAL_ACTION_REQUIRED':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100">ACTION REQ</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">{status}</span>;
    }
  };

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4 relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#073933]">Published Links</h2>
        <span className="text-xs font-bold bg-[#f0fdf4] text-green-700 px-2 py-1 rounded-full border border-green-100">
          Total Valid: {meta?.total || validLinks.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3 pt-2 text-start px-2">External Post ID</th>
              <th className="pb-3 pt-2 text-start">Publisher URL</th>
              <th className="pb-3 pt-2 text-start">Anchor Text</th>
              <th className="pb-3 pt-2 text-start">Verification Status</th>
              <th className="pb-3 pt-2 text-end px-2">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {validLinks.map((link) => (
              <tr 
                key={link.id} 
                className="hover:bg-[#F4F9FD]/60 transition cursor-pointer"
                onClick={() => setSelectedLink(link)}
              >
                <td className="py-3 px-2 text-slate-500 font-mono text-xs">
                  {link.external_post_id || '—'}
                </td>
                <td className="py-3">
                  {link.publisher_url ? (
                    <a 
                      href={link.publisher_url.startsWith('http') ? link.publisher_url : `https://${link.publisher_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline truncate max-w-[200px] block"
                      title={link.publisher_url}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.publisher_url.replace(/^https?:\/\//, '')}
                    </a>
                  ) : (
                    <span className="text-slate-400 text-xs italic">Unknown URL</span>
                  )}
                </td>
                <td className="py-3 text-slate-600 text-xs font-medium truncate max-w-[150px]" title={link.anchor}>
                  "{link.anchor}"
                </td>
                <td className="py-3">
                  {getStatusBadge(link.status)}
                </td>
                <td className="py-3 text-end px-2 text-slate-400 text-xs whitespace-nowrap">
                  {formatDistanceToNow(new Date(link.created_at), { addSuffix: true })}
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

      {/* Publication Detail Modal */}
      {selectedLink && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#F4F9FD]">
              <h3 className="font-bold text-[#073933] flex items-center gap-2">
                Publication Details
              </h3>
              <button 
                onClick={() => { setSelectedLink(null); setActionError(null); }}
                className="p-1 hover:bg-slate-200 rounded-lg transition text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Target ID</p>
                  <p className="font-medium text-[#073933]">{selectedLink.target_id}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">External Post ID</p>
                  <p className="font-mono text-[#073933]">{selectedLink.external_post_id || 'None'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Job ID</p>
                  <p className="font-mono text-[#073933] text-xs">{selectedLink.job_id || '—'}</p>
                </div>
                <div>
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Timestamp</p>
                  <p className="text-[#073933] text-xs">{formatDistanceToNow(new Date(selectedLink.created_at), { addSuffix: true })}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-400 font-bold text-xs uppercase mb-1">Published URL</p>
                  {selectedLink.publisher_url ? (
                    <a href={selectedLink.publisher_url.startsWith('http') ? selectedLink.publisher_url : `https://${selectedLink.publisher_url}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                      {selectedLink.publisher_url}
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">Not available</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Status</span>
                  {getStatusBadge(selectedLink.status)}
                </div>
                
                {selectedLink.status === 'VERIFICATION_FAILED' && (
                  <div className="mt-2 text-xs text-orange-700 bg-orange-50 p-3 rounded border border-orange-100 flex flex-col gap-1">
                    <span className="font-bold">Verification Failed</span>
                    <span>{selectedLink.error_message || selectedLink.error_category || "The post may exist externally, but the live URL could not be verified by the OBLINK engine."}</span>
                  </div>
                )}
                
                {actionError && (
                  <div className="mt-2 text-xs text-red-700 bg-red-50 p-2 rounded border border-red-100">
                    <strong>Error:</strong> {actionError}
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => { setSelectedLink(null); setActionError(null); }}
                className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Close
              </button>
              
              {selectedLink.status === 'VERIFICATION_FAILED' && selectedLink.external_post_id && (
                <button
                  disabled={isRetrying}
                  onClick={() => handleRetryVerification(selectedLink.id)}
                  className="px-4 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50 flex items-center gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                  {isRetrying ? 'Retrying...' : 'Retry Verification'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
