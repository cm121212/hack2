import React from 'react';

const alertStyle = {
  critical: 'bg-red-50 border-red-200 text-red-700',
  warning: 'bg-amber-50 border-amber-200 text-amber-700',
};

export default function MetricCard({ title, value, alertSeverity }) {
  const isAlert = Boolean(alertSeverity);
  return (
    <div
      className={`flex-1 border rounded-lg px-3 py-2 ${
        isAlert ? alertStyle[alertSeverity] : 'bg-slate-50 border-slate-200'
      }`}
    >
      <div className={`text-xs font-medium truncate ${isAlert ? '' : 'text-slate-500'}`}>
        {title}
      </div>
      <div
        className={`text-lg font-bold mt-0.5 ${isAlert ? '' : 'text-slate-800'}`}
      >
        {value}
      </div>
    </div>
  );
}
