import React from 'react';

export default function SplitBars({ data = [], colorA = '#94a3b8', colorB = '#38bdf8' }) {
  const width = 400;
  const height = 180;
  const padLeft = 28;
  const padRight = 8;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const barW = (chartW / data.length) * 0.55;
  const gap = chartW / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
      })}
      {data.map((d, i) => {
        const total = d.valueA + d.valueB;
        const fracA = d.valueA / total;
        const fracB = d.valueB / total;
        const x = padLeft + i * gap + (gap - barW) / 2;
        const hB = fracB * chartH;
        const hA = fracA * chartH;
        return (
          <g key={i}>
            <rect x={x} y={padTop} width={barW} height={hA} fill={colorA} rx="2" opacity="0.85" />
            <rect x={x} y={padTop + hA} width={barW} height={hB} fill={colorB} rx="2" opacity="0.85" />
            <text x={x + barW / 2} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={padLeft + 4} y={padTop + 2} width="8" height="8" fill={colorA} rx="1" />
      <text x={padLeft + 14} y={padTop + 10} fontSize="8" fill="#64748b">Old</text>
      <rect x={padLeft + 38} y={padTop + 2} width="8" height="8" fill={colorB} rx="1" />
      <text x={padLeft + 48} y={padTop + 10} fontSize="8" fill="#64748b">New</text>
    </svg>
  );
}
