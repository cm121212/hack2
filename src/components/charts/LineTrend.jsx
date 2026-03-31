import React, { useState, useRef } from 'react';

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

export default function LineTrend({ data = [], color = '#22c55e', onPointClick }) {
  const width = 400;
  const height = 180;
  const padLeft = 28;
  const padRight = 8;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [zoomRange, setZoomRange] = useState(null);
  const [brushing, setBrushing] = useState(false);
  const [brushRect, setBrushRect] = useState(null);
  const brushStartX = useRef(null);
  const svgRef = useRef(null);

  const displayData = zoomRange ? data.slice(zoomRange[0], zoomRange[1] + 1) : data;
  const max = Math.max(...displayData.map((d) => d.value), 1);
  const min = Math.min(...displayData.map((d) => d.value), 0);
  const range = max - min || 1;

  const pts = displayData.map((d, i) => {
    const x = padLeft + (displayData.length > 1 ? (i / (displayData.length - 1)) * chartW : chartW / 2);
    const y = padTop + chartH - ((d.value - min) / range) * chartH;
    return [x, y];
  });

  const polyline = pts.map((p) => p.join(',')).join(' ');

  const getSvgX = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    return ((e.clientX - rect.left) / rect.width) * width;
  };

  const xToDataIdx = (svgX, sourceData) => {
    const n = sourceData.length;
    if (n <= 1) return 0;
    const frac = (svgX - padLeft) / chartW;
    return Math.max(0, Math.min(n - 1, Math.round(frac * (n - 1))));
  };

  const handleMouseMove = (e) => {
    const svgX = getSvgX(e);
    if (brushing) {
      const x1 = Math.min(brushStartX.current, svgX);
      const x2 = Math.max(brushStartX.current, svgX);
      setBrushRect({ x: x1, w: x2 - x1 });
    } else {
      const idx = xToDataIdx(svgX, displayData);
      setHoveredIdx(idx);
    }
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    brushStartX.current = getSvgX(e);
    setBrushing(true);
    setBrushRect(null);
  };

  const handleMouseUp = (e) => {
    if (!brushing) return;
    const endX = getSvgX(e);
    const x1 = Math.min(brushStartX.current, endX);
    const x2 = Math.max(brushStartX.current, endX);
    if (x2 - x1 > 10) {
      const startIdx = xToDataIdx(x1, displayData);
      const endIdx = xToDataIdx(x2, displayData);
      if (endIdx > startIdx) {
        const base = zoomRange ? zoomRange[0] : 0;
        setZoomRange([base + startIdx, base + endIdx]);
      }
    }
    setBrushing(false);
    setBrushRect(null);
    brushStartX.current = null;
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    if (brushing) {
      setBrushing(false);
      setBrushRect(null);
      brushStartX.current = null;
    }
  };

  return (
    <div className="relative w-full h-full">
      {zoomRange && (
        <button
          className="absolute top-1 right-1 z-10 text-xs bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-600 hover:bg-slate-100 shadow-sm"
          onClick={() => setZoomRange(null)}
        >
          Reset zoom
        </button>
      )}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        style={{ cursor: brushing ? 'crosshair' : 'default' }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
        {[0.25, 0.5, 0.75, 1].map((frac) => {
          const y = padTop + chartH - frac * chartH;
          return <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
        })}

        {/* Brush selection rect */}
        {brushRect && (
          <rect
            x={brushRect.x}
            y={padTop}
            width={brushRect.w}
            height={chartH}
            fill="#3b82f6"
            opacity="0.12"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Crosshair */}
        {!brushing && hoveredIdx !== null && pts[hoveredIdx] && (
          <line
            x1={pts[hoveredIdx][0]}
            y1={padTop}
            x2={pts[hoveredIdx][0]}
            y2={padTop + chartH}
            stroke="#94a3b8"
            strokeWidth="1"
            strokeDasharray="3,3"
            style={{ pointerEvents: 'none' }}
          />
        )}

        <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

        {pts.map(([x, y], i) => {
          const isHovered = hoveredIdx === i;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={isHovered ? 5 : 3.5}
              fill={color}
              style={{ cursor: onPointClick ? 'pointer' : 'default', transition: 'r 0.15s ease' }}
              onClick={(e) => { e.stopPropagation(); onPointClick && onPointClick(displayData[i], i); }}
            />
          );
        })}

        {displayData.map((d, i) => {
          const x = padLeft + (displayData.length > 1 ? (i / (displayData.length - 1)) * chartW : chartW / 2);
          return (
            <text key={i} x={x} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">
              {d.label}
            </text>
          );
        })}
        <text x={padLeft - 4} y={padTop + chartH} textAnchor="end" fontSize="9" fill="#94a3b8">{min}</text>
        <text x={padLeft - 4} y={padTop + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{max}</text>

        {!brushing && hoveredIdx !== null && pts[hoveredIdx] && (
          <TooltipBox
            x={pts[hoveredIdx][0]}
            y={pts[hoveredIdx][1]}
            text={`${displayData[hoveredIdx].label}: ${displayData[hoveredIdx].value}`}
            svgWidth={width}
          />
        )}
      </svg>
    </div>
  );
}
