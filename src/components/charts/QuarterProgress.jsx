import React from 'react';

export default function QuarterProgress({ data = [] }) {
  const width = 400;
  const height = 180;
  const padLeft = 70;
  const padRight = 40;
  const padTop = 20;
  const barH = 28;
  const barGap = 32;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const y = padTop + i * (barH + barGap);
        const trackW = width - padLeft - padRight;
        const fillW = (Math.min(d.value, 100) / 100) * trackW;
        const pct = Math.round((d.value / d.target) * 100);
        return (
          <g key={i}>
            <text x={padLeft - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="10" fill="#475569" fontWeight="600">
              {d.label}
            </text>
            {/* Track */}
            <rect x={padLeft} y={y} width={trackW} height={barH} rx="6" fill="#f1f5f9" />
            {/* Fill */}
            <rect x={padLeft} y={y} width={fillW} height={barH} rx="6" fill={d.color} opacity="0.85" />
            {/* Pct label */}
            <text x={padLeft + fillW + 6} y={y + barH / 2 + 4} fontSize="10" fill="#475569" fontWeight="700">
              {pct}%
            </text>
          </g>
        );
      })}
    </svg>
  );
}
