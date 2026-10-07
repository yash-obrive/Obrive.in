import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface OblinkStats {
  activeTargets: number;
  authorizedTargets: number;
  contentGenerated: number;
  readyToPublish: number;
  publishing: number;
  published: number;
  verificationFailed: number;
  publishFailed: number;
  simulated: number;
}

export interface OblinkHealth {
  status: string;
}

export interface OblinkTarget {
  id: number;
  domain: string;
  url: string;
  platform: string;
  target_status: string;
  authorization_status: string;
  publishing_method: string;
  opportunity_type: string;
  relevance_score: number;
  spam_score: number;
  content?: string;
  last_validation?: string;
  last_publication?: string;
  created_at: string;
}

export interface OblinkLink {
  id: number;
  target_id: number;
  job_id?: string;
  publisher_url: string;
  anchor: string;
  status: string;
  external_post_id?: string;
  error_category?: string;
  error_message?: string;
  created_at: string;
  checks?: any[];
}

export interface OblinkEvent {
  id: number;
  event_type: string;
  message: string;
  created_at: string;
}

export function useOblinkData() {
  const [stats, setStats] = useState<OblinkStats | null>(null);
  const [health, setHealth] = useState<OblinkHealth | null>(null);
  const [targets, setTargets] = useState<OblinkTarget[]>([]);
  const [targetsMeta, setTargetsMeta] = useState<any>(null);
  const [links, setLinks] = useState<OblinkLink[]>([]);
  const [linksMeta, setLinksMeta] = useState<any>(null);
  const [events, setEvents] = useState<OblinkEvent[]>([]);
  const [settings, setSettings] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page = 1, isBackground = false) => {
    try {
      if (!isBackground) setLoading(true);
      setError(null);

      // Fetch sequentially to prevent maxing out the dev database connection pool limit
      const statsRes = await apiFetch("/oblink/dashboard/stats", { method: "GET" });
      if (!statsRes.ok) {
        if (statsRes.status === 401 || statsRes.status === 403) {
          throw new Error("Unauthorized: Access denied to OBLINK AI.");
        }
        throw new Error(`Failed to fetch OBLINK data: ${statsRes.status}`);
      }
      const healthRes = await apiFetch("/oblink/health", { method: "GET" });
      const targetsRes = await apiFetch(`/oblink/targets?page=${page}&limit=50`, { method: "GET" });
      const linksRes = await apiFetch(`/oblink/links?page=${page}&limit=50`, { method: "GET" });
      const eventsRes = await apiFetch("/oblink/events?limit=50", { method: "GET" });
      const settingsRes = await apiFetch("/oblink/settings", { method: "GET" });

      setStats(await statsRes.json());
      setHealth(await healthRes.json());
      
      const targetsData = await targetsRes.json();
      setTargets(targetsData.data || []);
      setTargetsMeta(targetsData.meta);

      const linksData = await linksRes.json();
      setLinks(linksData.data || []);
      setLinksMeta(linksData.meta);
      
      const eventsData = await eventsRes.ok ? await eventsRes.json() : { data: [] };
      setEvents(eventsData.data || []);

      setSettings(await settingsRes.json());

    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Failed to fetch OBLINK dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData(1, true); // background poll
    }, 6000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    stats,
    health,
    targets,
    targetsMeta,
    links,
    linksMeta,
    events,
    settings,
    loading,
    error,
    refetch: fetchData,
  };
}
