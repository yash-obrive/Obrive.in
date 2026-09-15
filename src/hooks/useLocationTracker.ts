'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { useTimer } from '@/context/TimerContext';

interface UseLocationTrackerResult {
  trackingEnabled: boolean;
  permissionDenied: boolean;
  requestingPermission: boolean;
  requestLocationAccess: () => Promise<void>;
  lastRecordedAt: string | null;
}

export function useLocationTracker(): UseLocationTrackerResult {
  const { session } = useTimer();
  const [trackingEnabled, setTrackingEnabled] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [requestingPermission, setRequestingPermission] = useState(false);
  const [lastRecordedAt, setLastRecordedAt] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  // 1. Fetch employee's tracking configuration from /auth/me
  const fetchTrackingConfig = useCallback(async () => {
    try {
      const res = await apiFetch('/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data?.success && data?.data) {
          const isEnabled = Boolean(data.data.is_location_tracking_enabled);
          setTrackingEnabled(isEnabled);
          return isEnabled;
        }
      }
    } catch (err) {
      console.error('Failed to fetch tracking config:', err);
    }
    return false;
  }, []);

  // 2. Transmit GPS coordinates to backend
  const sendLocationPing = useCallback(async (position: GeolocationPosition) => {
    try {
      const { latitude, longitude, accuracy } = position.coords;
      const res = await apiFetch('/employee/location', {
        method: 'POST',
        body: JSON.stringify({
          latitude,
          longitude,
          accuracy: accuracy || null,
          source: 'work_timer_30m',
        }),
      });
      if (res.ok) {
        setLastRecordedAt(new Date().toISOString());
      }
    } catch (err) {
      console.error('Failed to post location ping:', err);
    }
  }, []);

  // 3. Request location permission and capture current position
  const requestLocationAccess = useCallback(async () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      return;
    }

    setRequestingPermission(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissionDenied(false);
        setRequestingPermission(false);
        sendLocationPing(position);
      },
      (error) => {
        setRequestingPermission(false);
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [sendLocationPing]);

  // 4. Initial check for tracking status and browser permission
  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      const isEnabled = await fetchTrackingConfig();
      if (!mounted || !isEnabled) return;

      if (typeof window !== 'undefined' && navigator.permissions) {
        try {
          const status = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
          if (mounted) {
            setPermissionDenied(status.state === 'denied');
            status.onchange = () => {
              if (mounted) {
                setPermissionDenied(status.state === 'denied');
                if (status.state === 'granted' && session?.status === 'active') {
                  requestLocationAccess();
                }
              }
            };
          }
        } catch {
          // Permissions API query not supported in all browsers; fallback
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, [fetchTrackingConfig, session?.status, requestLocationAccess]);

  // 5. Manage 30-minute interval when Work Time timer is actively running
  useEffect(() => {
    const isTimerActive = session?.status === 'active';
    isRunningRef.current = isTimerActive;

    if (trackingEnabled && isTimerActive) {
      // Capture initial position on timer start
      requestLocationAccess();

      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Schedule recurring ping every 30 minutes (1800000 ms)
      intervalRef.current = setInterval(() => {
        if (isRunningRef.current && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => sendLocationPing(pos),
            (err) => {
              if (err.code === err.PERMISSION_DENIED) {
                setPermissionDenied(true);
              }
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        }
      }, 30 * 60 * 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [trackingEnabled, session?.status, requestLocationAccess, sendLocationPing]);

  return {
    trackingEnabled,
    permissionDenied,
    requestingPermission,
    requestLocationAccess,
    lastRecordedAt,
  };
}
