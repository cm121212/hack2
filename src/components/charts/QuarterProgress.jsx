import React, { useState } from 'react';

function TooltipBox({ x, y, text, svgWidth = 400 }) {
  const w = Math.max(text.length * 6 + 16, 60);
  const cx = Math.max(w / 2 + 4, Math.min(svgWidth - w / 2 - 4, x));
  return (
    <g style={{ pointerEvents: 'none' }}>
      <rect x={cx - w / 2} y={y - 30} width={w} height={22} rx="4" fill="#1e293b" opacity="0.92" />
      <text x={cx} y={y - 15} textAnchor="middle" fontSize="10" fill="white" fontWeight="600">{text}</text>
    </g>
  );
}

export default function QuarterProgress({ data = [] }) {
  const width = 400;
  const height = 180;
  const padLeft = 70;
  const padRight = 40;
  const padTop = 20;
  const barH = 28;
  const barGap = 32;

  const [hoveredIdx, setHoveredIdx] = useState(null);

  const trackW = width - padLeft - padRight;

  const tooltip = (() => {
    if (hoveredIdx === null) return null;
    const d = data[hoveredIdx];
    if (!d) return null;
    const y = padTop + hoveredIdx * (barH + barGap);
    const fillW = (Math.min(d.value, 100) / 100) * trackW;
    const pct = Math.round((d.value / d.target) * 100);
    return {
      x: padLeft + fillW / 2,
      y: y,
      text: `${d.label}: ${d.value}/${d.target} (${pct}%)`,
    };
  })();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      {data.map((d, i) => {
        const y = padTop + i * (barH + barGap);
        const fillW = (Math.min(d.value, 100) / 100) * trackW;
        const pct = Math.round((d.value / d.target) * 100);
        const isHov = hoveredIdx === i;
        return (
          <g
            key={i}
            style={{ cursor: 'default' }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <text x={padLeft - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="10" fill="#475569" fontWeight="600">
              {d.label}
            </text>
            {/* Track */}
            <rect x={padLeft} y={y} width={trackW} height={barH} rx="6" fill="#f1f5f9" />
            {/* Fill */}
            <rect
              x={padLeft} y={y} width={fillW} height={barH} rx="6"
              fill={d.color} opacity={isHov ? 1 : 0.85}
              style={{ transition: 'opacity 0.15s ease' }}
            />
            {/* Pct label */}
            <text x={padLeft + fillW + 6} y={y + barH / 2 + 4} fontSize="10" fill="#475569" fontWeight="700">
              {pct}%
            </text>
          </g>
        );
      })}
      {tooltip && <TooltipBox x={tooltip.x} y={tooltip.y} text={tooltip.text} svgWidth={width} />}
    </svg>
  );
}
