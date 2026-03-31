import React from 'react';

export default function MetricCard({ title, value }) {
  return (
    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
      <div className="text-xs text-slate-500 font-medium truncate">{title}</div>
      <div className="text-lg font-bold text-slate-800 mt-0.5">{value}</div>
    </div>
  );
}
