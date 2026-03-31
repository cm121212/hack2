import React from 'react';

export default function BarTrend({ data = [], color = '#3b82f6' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const width = 400;
  const height = 180;
  const padLeft = 28;
  const padRight = 8;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barW = (chartW / data.length) * 0.6;
  const gap = chartW / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return (
          <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />
        );
      })}
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = padLeft + i * gap + (gap - barW) / 2;
        const y = padTop + chartH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} fill={color} rx="2" opacity="0.85" />
            <text x={x + barW / 2} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {d.label}
            </text>
          </g>
        );
      })}
      <text x={padLeft - 4} y={padTop + chartH} textAnchor="end" fontSize="9" fill="#94a3b8">0</text>
      <text x={padLeft - 4} y={padTop + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{max}</text>
    </svg>
  );
}
