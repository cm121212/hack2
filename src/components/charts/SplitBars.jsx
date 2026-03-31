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

  const [hovered, setHovered] = useState(null); // { i, seg: 'A'|'B' }

  const tooltip = (() => {
    if (!hovered) return null;
    const d = data[hovered.i];
    if (!d) return null;
    const x = padLeft + hovered.i * gap + (gap - barW) / 2 + barW / 2;
    const total = d.valueA + d.valueB;
    const fracA = d.valueA / total;
    const fracB = d.valueB / total;
    if (hovered.seg === 'A') {
      return { x, y: padTop + fracA * chartH / 2, text: `${d.label} Old: ${d.valueA}` };
    }
    return { x, y: padTop + fracA * chartH + fracB * chartH / 2, text: `${d.label} New: ${d.valueB}` };
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
        const total = d.valueA + d.valueB;
        const fracA = d.valueA / total;
        const fracB = d.valueB / total;
        const x = padLeft + i * gap + (gap - barW) / 2;
        const hB = fracB * chartH;
        const hA = fracA * chartH;
        const hovA = hovered && hovered.i === i && hovered.seg === 'A';
        const hovB = hovered && hovered.i === i && hovered.seg === 'B';
        return (
          <g key={i}>
            <rect
              x={x} y={padTop} width={barW} height={hA}
              fill={colorA} rx="2" opacity={hovA ? 1 : 0.85}
              style={{ cursor: 'default', transition: 'opacity 0.15s ease' }}
              onMouseEnter={() => setHovered({ i, seg: 'A' })}
              onMouseLeave={() => setHovered(null)}
            />
            <rect
              x={x} y={padTop + hA} width={barW} height={hB}
              fill={colorB} rx="2" opacity={hovB ? 1 : 0.85}
              style={{ cursor: 'default', transition: 'opacity 0.15s ease' }}
              onMouseEnter={() => setHovered({ i, seg: 'B' })}
              onMouseLeave={() => setHovered(null)}
            />
            <text x={x + barW / 2} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.label}</text>
          </g>
        );
      })}
      {/* Legend */}
      <rect x={padLeft + 4} y={padTop + 2} width="8" height="8" fill={colorA} rx="1" />
      <text x={padLeft + 14} y={padTop + 10} fontSize="8" fill="#64748b">Old</text>
      <rect x={padLeft + 38} y={padTop + 2} width="8" height="8" fill={colorB} rx="1" />
      <text x={padLeft + 48} y={padTop + 10} fontSize="8" fill="#64748b">New</text>
      {tooltip && <TooltipBox x={tooltip.x} y={tooltip.y} text={tooltip.text} svgWidth={width} />}
    </svg>
  );
}
