import React from 'react';

const statusConfig = {
  green: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-300', label: 'G' },
  yellow: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-300', label: 'Y' },
  red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300', label: 'R' },
};

export default function StatusPill({ status }) {
  const config = statusConfig[status] ?? statusConfig.green;
  return (
    <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full border text-xs font-bold ${config.bg} ${config.text} ${config.border}`}>
      {config.label}
    </span>
  );
}
