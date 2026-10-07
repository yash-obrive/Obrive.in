import type { OblinkEvent } from "../useOblinkData";
import { formatDistanceToNow } from "date-fns";
import { Activity as ActivityIcon } from "lucide-react";

export default function ActivitySection({ events }: { events: OblinkEvent[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-100">
        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <ActivityIcon className="w-6 h-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-bold text-[#073933]">No Activity Yet</h3>
        <p className="text-sm text-slate-500 mt-2 max-w-sm">
          There are no recent events recorded by the OBLINK engine.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#073933]">Event History</h2>
        <span className="text-xs font-bold bg-[#eef7ff] text-[#073933] px-2 py-1 rounded-full">
          Recent Events
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
              <th className="pb-3 pt-2 text-start px-2">Type</th>
              <th className="pb-3 pt-2 text-start">Message</th>
              <th className="pb-3 pt-2 text-end px-2">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-[#F4F9FD]/60 transition">
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    event.event_type === 'ERROR' ? 'bg-red-100 text-red-700' :
                    event.event_type === 'SUCCESS' ? 'bg-green-100 text-green-700' :
                    event.event_type === 'WARNING' ? 'bg-orange-100 text-orange-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {event.event_type}
                  </span>
                </td>
                <td className="py-3 text-[#073933] text-xs font-medium break-words max-w-[400px]">
                  {/* Clean up message to ensure no secrets accidentally leak in view */}
                  {event.message.replace(/(password|secret|key|token)=[^&\s]+/gi, '$1=***')}
                </td>
                <td className="py-3 text-end px-2 text-slate-400 text-xs whitespace-nowrap">
                  {formatDistanceToNow(new Date(event.created_at), { addSuffix: true })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
