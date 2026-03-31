import React, { useState, useRef, useEffect } from 'react';
import { useAlerts } from '../../context/AlertContext';

const severityConfig = {
  critical: {
    dot: 'bg-red-500',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-700 border-red-300',
    label: 'Critical',
    pulse: true,
  },
  warning: {
    dot: 'bg-amber-400',
    text: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-700 border-amber-300',
    label: 'Warning',
    pulse: false,
  },
};

export default function NotificationBell({ onOpenAlerts }) {
  const [open, setOpen] = useState(false);
  const { activeAlerts } = useAlerts();
  const dropdownRef = useRef(null);

  const criticalCount = activeAlerts.filter((a) => a.severity === 'critical').length;
  const totalCount = activeAlerts.length;

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={`Notifications — ${totalCount} active`}
      >
        {/* Bell icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {totalCount > 0 && (
          <span
            className={`absolute -top-0.5 -right-0.5 flex items-center justify-center h-4 min-w-[1rem] px-0.5 rounded-full text-[10px] font-bold text-white ${
              criticalCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-amber-400'
            }`}
          >
            {totalCount > 9 ? '9+' : totalCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <span className="font-semibold text-slate-800 text-sm">Active Alerts</span>
            <span className="text-xs text-slate-400">{totalCount} active</span>
          </div>

          {/* Alert list */}
          <div className="max-h-72 overflow-auto">
            {totalCount === 0 ? (
              <div className="px-4 py-8 text-center text-slate-400 text-sm">
                ✅ No active threshold breaches
              </div>
            ) : (
              activeAlerts.map((alert) => {
                const cfg = severityConfig[alert.severity];
                return (
                  <div
                    key={alert.id}
                    className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-0"
                  >
                    <span
                      className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot} ${
                        cfg.pulse ? 'animate-pulse' : ''
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        {alert.customer}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {alert.panelTitle} · {alert.metricTitle}
                      </div>
                      <div className={`text-xs font-medium ${cfg.text}`}>
                        {alert.metricValue} — {cfg.label}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-slate-100">
            <button
              onClick={() => {
                setOpen(false);
                onOpenAlerts?.();
              }}
              className="w-full text-xs text-blue-600 hover:text-blue-700 font-medium py-1 text-center"
            >
              View all alerts & history →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
