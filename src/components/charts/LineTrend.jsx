import React from 'react';

export default function LineTrend({ data = [], color = '#22c55e' }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const min = Math.min(...data.map((d) => d.value), 0);
  const range = max - min || 1;
  const width = 400;
  const height = 180;
  const padLeft = 28;
  const padRight = 8;
  const padTop = 10;
  const padBottom = 28;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const pts = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * chartW;
    const y = padTop + chartH - ((d.value - min) / range) * chartH;
    return [x, y];
  });

  const polyline = pts.map((p) => p.join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#e2e8f0" strokeWidth="1" />
      {[0.25, 0.5, 0.75, 1].map((frac) => {
        const y = padTop + chartH - frac * chartH;
        return <line key={frac} x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke="#f1f5f9" strokeWidth="1" />;
      })}
      <polyline points={polyline} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={color} />
      ))}
      {data.map((d, i) => {
        const x = padLeft + (i / (data.length - 1)) * chartW;
        return (
          <text key={i} x={x} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill="#94a3b8">
            {d.label}
          </text>
        );
      })}
      <text x={padLeft - 4} y={padTop + chartH} textAnchor="end" fontSize="9" fill="#94a3b8">{min}</text>
      <text x={padLeft - 4} y={padTop + 4} textAnchor="end" fontSize="9" fill="#94a3b8">{max}</text>
    </svg>
  );
}
