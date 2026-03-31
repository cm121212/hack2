import React from 'react';

export default function GroupedBars({ data = [], colorA = '#f97316', colorB = '#ec4899', labelA = 'A', labelB = 'B' }) {
  const max = Math.max(...data.flatMap((d) => [d.valueA, d.valueB]), 1);
  const width = 400;
  const height = 180;
  const padLeft = 28;
  const padRight = 8;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;
  const groupW = chartW / data.length;
  const barW = groupW * 0.35;
  const gap = groupW * 0.05;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
      })}
      {data.map((d, i) => {
        const gx = padLeft + i * groupW + groupW / 2;
        const xA = gx - barW - gap / 2;
        const xB = gx + gap / 2;
        const hA = (d.valueA / max) * chartH;
        const hB = (d.valueB / max) * chartH;
        return (
          <g key={i}>
            <rect x={xA} y={padTop + chartH - hA} width={barW} height={hA} fill={colorA} rx="2" opacity="0.85" />
            <rect x={xB} y={padTop + chartH - hB} width={barW} height={hB} fill={colorB} rx="2" opacity="0.85" />
            <text x={gx} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={padLeft + 4} y={padTop + 2} width="8" height="8" fill={colorA} rx="1" />
      <text x={padLeft + 14} y={padTop + 10} fontSize="8" fill="#64748b">{labelA}</text>
      <rect x={padLeft + 50} y={padTop + 2} width="8" height="8" fill={colorB} rx="1" />
      <text x={padLeft + 62} y={padTop + 10} fontSize="8" fill="#64748b">{labelB}</text>
    </svg>
  );
}
