import React, { useState, useRef, useEffect } from 'react';

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

export default function BarTrend({ data = [], color = '#3b82f6', onBarClick }) {
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

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [animate, setAnimate] = useState(false);
  const svgRef = useRef(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
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
        const y = padTop + chartH - (animate ? barH : 0);
        const isHovered = hoveredIdx === i;
        return (
          <g
            key={i}
            style={{ cursor: onBarClick ? 'pointer' : 'default' }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => onBarClick && onBarClick(d, i)}
          >
            <rect
              x={x}
              y={y}
              width={barW}
              height={animate ? barH : 0}
              fill={color}
              rx="2"
              opacity={isHovered ? 1 : 0.85}
              style={{ transition: 'height 0.25s ease, y 0.25s ease, opacity 0.15s ease' }}
            />
            {isHovered && (
              <rect x={x} y={padTop} width={barW} height={chartH} rx="2" fill={color} opacity="0.07" style={{ pointerEvents: 'none' }} />
            )}
            <text x={x + barW / 2} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {d.label}
            </text>
          </g>
        );
      })}
      <text x={padLeft - 4} y={padTop + chartH} textAnchor="end" fontSize="9" fill="#94a3b8">0</text>
      <text x={padLeft - 4} y={padTop + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{max}</text>
      {hoveredIdx !== null && data[hoveredIdx] && (
        <TooltipBox
          x={padLeft + hoveredIdx * gap + gap / 2}
          y={padTop + chartH - (data[hoveredIdx].value / max) * chartH}
          text={`${data[hoveredIdx].label}: ${data[hoveredIdx].value}`}
          svgWidth={width}
        />
      )}
    </svg>
  );
}
