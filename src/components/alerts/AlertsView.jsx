import React from 'react';
import { useAlerts } from '../../context/AlertContext';

const severityConfig = {
  critical: {
    row: 'bg-red-50 border-red-200',
    dot: 'bg-red-500 animate-pulse',
    badge: 'bg-red-100 text-red-700 border border-red-300',
    label: 'Critical',
  },
  warning: {
    row: 'bg-amber-50 border-amber-200',
    dot: 'bg-amber-400',
    badge: 'bg-amber-100 text-amber-700 border border-amber-300',
    label: 'Warning',
  },
};

function formatTimestamp(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return ts;
  }
}

export default function AlertsView() {
  const { activeAlerts, alertHistory, clearHistory } = useAlerts();

  return (
    <div className="flex flex-col gap-5 h-full overflow-auto pr-1">
      {/* ── Active Alerts ─────────────────────────────────── */}
      <section>
        <h2 className="text-sm font-semibold text-slate-700 mb-2">
          Active Alerts
          {activeAlerts.length > 0 && (
            <span className="ml-2 text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
              {activeAlerts.length}
            </span>
          )}
        </h2>

        {activeAlerts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 px-6 py-10 text-center text-slate-400 text-sm">
            ✅ All metrics are within thresholds
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {activeAlerts.map((alert) => {
              const cfg = severityConfig[alert.severity];
              return (
                <div
                  key={alert.id}
                  className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${cfg.row}`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-800">{alert.customer}</div>
                    <div className="text-xs text-slate-500">
                      {alert.panelTitle} · {alert.metricTitle}:{' '}
                      <span className="font-semibold text-slate-700">{alert.metricValue}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Alert History ─────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-slate-700">
            Alert History
            {alertHistory.length > 0 && (
              <span className="ml-2 text-xs text-slate-400 font-normal">
                ({alertHistory.length})
              </span>
            )}
          </h2>
          {alertHistory.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs text-slate-400 hover:text-red-500 underline transition-colors"
            >
              Clear history
            </button>
          )}
        </div>

        {alertHistory.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 px-6 py-8 text-center text-slate-400 text-sm">
            No alert history yet
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-4 py-2 text-slate-500 font-medium">Time</th>
                  <th className="text-left px-4 py-2 text-slate-500 font-medium">Customer</th>
                  <th className="text-left px-4 py-2 text-slate-500 font-medium">Panel · Metric</th>
                  <th className="text-left px-4 py-2 text-slate-500 font-medium">Value</th>
                  <th className="text-left px-4 py-2 text-slate-500 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {alertHistory.map((h, i) => {
                  const cfg = severityConfig[h.severity];
                  return (
                    <tr key={`${h.id}-${i}`} className="border-b border-slate-50 last:border-0">
                      <td className="px-4 py-2 text-slate-400 whitespace-nowrap">
                        {formatTimestamp(h.timestamp)}
                      </td>
                      <td className="px-4 py-2 text-slate-700 font-medium">{h.customer}</td>
                      <td className="px-4 py-2 text-slate-600">
                        {h.panelTitle} · {h.metricTitle}
                      </td>
                      <td className="px-4 py-2 text-slate-700 font-medium">{h.metricValue}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${cfg.badge}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
