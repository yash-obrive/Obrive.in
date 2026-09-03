'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface TrackedEmployee {
  id: number;
  userid?: string;
  name: string;
  email: string;
  department?: string | null;
  job_title?: string | null;
  status?: string;
  avatar_url?: string | null;
  is_location_tracking_enabled: boolean;
  latitude?: number | null;
  longitude?: number | null;
  accuracy?: number | null;
  source?: string | null;
  last_ping_at?: string | null;
}

interface MapProps {
  employees: TrackedEmployee[];
  selectedEmployeeId?: number | null;
  onSelectEmployee?: (employee: TrackedEmployee) => void;
}

// Distinct, vibrant color themes per employee
const EMPLOYEE_THEMES = [
  {
    bg: 'background: linear-gradient(135deg, #2563eb, #1d4ed8);', // Vibrant Blue
    border: '#3b82f6',
    ping: 'rgba(37, 99, 235, 0.4)',
    badgeBg: 'background: #1e3a8a;',
  },
  {
    bg: 'background: linear-gradient(135deg, #7c3aed, #5b21b6);', // Vibrant Purple
    border: '#8b5cf6',
    ping: 'rgba(124, 58, 237, 0.4)',
    badgeBg: 'background: #4c1d95;',
  },
  {
    bg: 'background: linear-gradient(135deg, #059669, #047857);', // Emerald
    border: '#10b981',
    ping: 'rgba(5, 150, 105, 0.4)',
    badgeBg: 'background: #064e3b;',
  },
  {
    bg: 'background: linear-gradient(135deg, #d97706, #b45309);', // Amber
    border: '#f59e0b',
    ping: 'rgba(217, 119, 6, 0.4)',
    badgeBg: 'background: #78350f;',
  },
  {
    bg: 'background: linear-gradient(135deg, #e11d48, #be123c);', // Crimson Rose
    border: '#f43f5e',
    ping: 'rgba(225, 29, 72, 0.4)',
    badgeBg: 'background: #881337;',
  },
  {
    bg: 'background: linear-gradient(135deg, #0891b2, #0e7490);', // Cyan Teal
    border: '#06b6d4',
    ping: 'rgba(8, 145, 178, 0.4)',
    badgeBg: 'background: #164e63;',
  },
];

function getEmployeeTheme(id: number) {
  return EMPLOYEE_THEMES[Math.abs(id) % EMPLOYEE_THEMES.length];
}

export default function EmployeeLocationMap({
  employees,
  selectedEmployeeId,
  onSelectEmployee,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([20.5937, 78.9629], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers with de-overlapping spiderfy & distinct styling
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    const validEmployees = employees.filter(
      (e) => e.latitude != null && e.longitude != null && !isNaN(e.latitude) && !isNaN(e.longitude)
    );

    if (validEmployees.length === 0) return;

    const latLngs: L.LatLngTuple[] = [];

    // Group close coordinates to avoid occlusion / overlap
    validEmployees.forEach((emp, index) => {
      let lat = emp.latitude as number;
      let lng = emp.longitude as number;

      // Check how many prior employees are very close (< 0.003 deg ~ 300m)
      const nearbyNeighbors = validEmployees.filter(
        (other, otherIdx) =>
          otherIdx < index &&
          other.latitude != null &&
          other.longitude != null &&
          Math.hypot(
            (other.latitude as number) - (emp.latitude as number),
            (other.longitude as number) - (emp.longitude as number)
          ) < 0.003
      );

      // If overlapping, offset in a small circle so both pins are distinctly visible
      if (nearbyNeighbors.length > 0) {
        const offsetIndex = nearbyNeighbors.length;
        const totalAngle = (offsetIndex * (2 * Math.PI / 4)) + Math.PI / 4;
        const radius = 0.0012; // ~120m visual separation
        lat = lat + radius * Math.sin(totalAngle);
        lng = lng + radius * Math.cos(totalAngle);
      }

      latLngs.push([lat, lng]);

      const isSelected = emp.id === selectedEmployeeId;
      const theme = getEmployeeTheme(emp.id);
      const initials = emp.name ? emp.name.charAt(0).toUpperCase() : 'E';
      const firstName = emp.name ? emp.name.split(' ')[0] : 'Employee';

      // Custom marker HTML icon with Avatar + Name Badge
      const markerHtml = `
        <div style="display: flex; flex-direction: column; align-items: center; cursor: pointer; transform: translate3d(0,0,0);">
          <div style="position: relative; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; inset: -4px; border-radius: 9999px; background: ${theme.ping}; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; display: flex; height: 38px; width: 38px; align-items: center; justify-content: center; border-radius: 9999px; border: 2.5px solid #ffffff; ${theme.bg} color: #ffffff; font-weight: 800; font-size: 15px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2); overflow: hidden; ${isSelected ? 'outline: 3px solid #3b82f6; outline-offset: 2px;' : ''}">
              ${
                emp.avatar_url
                  ? `<img src="${emp.avatar_url}" alt="${emp.name}" style="height: 100%; width: 100%; object-fit: cover;" onerror="this.style.display='none';this.parentElement.innerText='${initials}'" />`
                  : initials
              }
            </div>
            <div style="position: absolute; bottom: -2px; right: -2px; height: 12px; width: 12px; border-radius: 9999px; border: 2px solid #ffffff; background-color: #10b981;"></div>
          </div>
          
          <!-- Persistent First Name Chip -->
          <div style="margin-top: 4px; padding: 2px 8px; border-radius: 9999px; ${theme.badgeBg} color: #ffffff; font-size: 11px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); white-space: nowrap; border: 1px solid rgba(255, 255, 255, 0.4); text-transform: capitalize;">
            ${firstName}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-emp-marker',
        html: markerHtml,
        iconSize: [60, 65],
        iconAnchor: [30, 30],
        popupAnchor: [0, -32],
      });

      const marker = L.marker([lat, lng], { icon: customIcon });

      const lastPingTime = emp.last_ping_at
        ? new Date(emp.last_ping_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
          ' (' +
          new Date(emp.last_ping_at).toLocaleDateString() +
          ')'
        : 'Recently';

      const popupContent = `
        <div style="padding: 6px; min-width: 210px; font-family: sans-serif; color: #0f172a;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid #f1f5f9;">
            <div style="height: 34px; width: 34px; border-radius: 9999px; ${theme.bg} color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 13px; overflow: hidden;">
              ${
                emp.avatar_url
                  ? `<img src="${emp.avatar_url}" style="height: 100%; width: 100%; object-fit: cover;" onerror="this.style.display='none';this.parentElement.innerText='${initials}'" />`
                  : initials
              }
            </div>
            <div>
              <p style="font-weight: 800; font-size: 14px; margin: 0; line-height: 1.2;">${emp.name}</p>
              <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">${emp.job_title || 'Employee'} • ${emp.department || 'General'}</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px; color: #475569; margin-bottom: 12px;">
            <p style="margin: 0;"><strong>GPS:</strong> ${(emp.latitude as number).toFixed(5)}, ${(emp.longitude as number).toFixed(5)}</p>
            <p style="margin: 0;"><strong>Last Ping:</strong> ${lastPingTime}</p>
            ${emp.accuracy ? `<p style="margin: 0;"><strong>Accuracy:</strong> &plusmn;${Math.round(emp.accuracy)}m</p>` : ''}
          </div>
          <div>
            <a 
              href="https://www.google.com/maps?q=${emp.latitude},${emp.longitude}" 
              target="_blank" 
              rel="noopener noreferrer"
              style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 6px 12px; border-radius: 8px; background-color: #059669; color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"
            >
              📍 Open in Google Maps
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        if (onSelectEmployee) onSelectEmployee(emp);
      });

      // Bring to front on hover
      marker.on('mouseover', () => {
        marker.setZIndexOffset(1000);
      });
      marker.on('mouseout', () => {
        marker.setZIndexOffset(0);
      });

      markersGroup.addLayer(marker);
    });

    if (latLngs.length > 0) {
      if (latLngs.length === 1) {
        map.setView(latLngs[0], 14);
      } else {
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
      }
    }
  }, [employees, selectedEmployeeId, onSelectEmployee]);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm bg-slate-100">
      <div ref={mapContainerRef} className="h-full w-full z-10" />
      {employees.filter((e) => e.latitude != null).length === 0 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/10 backdrop-blur-[2px] pointer-events-none">
          <div className="rounded-xl bg-white/95 px-4 py-2.5 shadow-lg border border-slate-200 text-xs font-semibold text-slate-700">
            No active GPS pings recorded yet today
          </div>
        </div>
      )}
    </div>
  );
}
