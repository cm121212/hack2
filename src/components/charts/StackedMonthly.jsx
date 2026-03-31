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

export default function StackedMonthly({ data = [], colors = ['#1d4ed8', '#3b82f6', '#93c5fd'], labels = [] }) {
  const maxTotal = Math.max(...data.map((d) => d.values.reduce((s, v) => s + v, 0)), 1);
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

  const [hovered, setHovered] = useState(null); // { i, j }

  const tooltip = (() => {
    if (!hovered) return null;
    const d = data[hovered.i];
    if (!d) return null;
    const x = padLeft + hovered.i * gap + (gap - barW) / 2 + barW / 2;
    let yOff = 0;
    for (let k = 0; k < hovered.j; k++) {
      yOff += (d.values[k] / maxTotal) * chartH;
    }
    const h = (d.values[hovered.j] / maxTotal) * chartH;
    const y = padTop + chartH - yOff - h / 2;
    const lbl = labels[hovered.j] || `Segment ${hovered.j + 1}`;
    return { x, y, text: `${d.label} ${lbl}: ${d.values[hovered.j]}` };
  })();

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
      })}
      {data.map((d, i) => {
        const x = padLeft + i * gap + (gap - barW) / 2;
        let yOff = 0;
        return (
          <g key={i}>
            {d.values.map((v, j) => {
              const h = (v / maxTotal) * chartH;
              const y = padTop + chartH - yOff - h;
              yOff += h;
              const isHov = hovered && hovered.i === i && hovered.j === j;
              return (
                <rect
                  key={j}
                  x={x} y={y} width={barW} height={h}
                  fill={colors[j % colors.length]} rx="1"
                  opacity={isHov ? 1 : 0.9}
                  style={{ cursor: 'default', transition: 'opacity 0.15s ease' }}
                  onMouseEnter={() => setHovered({ i, j })}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
            <text x={x + barW / 2} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      {labels.map((l, i) => (
        <g key={i}>
          <rect x={padLeft + 4 + i * 40} y={padTop + 2} width="8" height="8" fill={colors[i % colors.length]} rx="1" />
          <text x={padLeft + 14 + i * 40} y={padTop + 10} fontSize="8" fill="#64748b">{l}</text>
        </g>
      ))}
      {tooltip && <TooltipBox x={tooltip.x} y={tooltip.y} text={tooltip.text} svgWidth={width} />}
    </svg>
  );
}
