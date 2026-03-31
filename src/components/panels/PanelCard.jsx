import React, { useState } from 'react';
import StatusPill from './StatusPill';
import MetricCard from './MetricCard';
import ChartRenderer from '../charts/ChartRenderer';
import SimpleTable from '../table/SimpleTable';
import DrillDownModal from '../charts/DrillDownModal';

export default function PanelCard({ panel }) {
  const { title, status, metrics, chartType, chartProps, tableHeaders, tableRows } = panel;
  const [drillDown, setDrillDown] = useState(null);

  const handleBarClick = (dataPoint) => {
    setDrillDown({ label: dataPoint.label, value: dataPoint.value });
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 p-4 overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        <StatusPill status={status} />
      </div>

      {/* Metrics row */}
      <div className="flex gap-2 mb-3">
        {metrics.map((m, i) => (
          <MetricCard key={i} title={m.title} value={m.value} />
        ))}
      </div>

      {/* Chart + table section */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Chart area - larger */}
        <div className="flex-[3] min-h-0 bg-slate-50 rounded-lg border border-slate-100 p-2 flex flex-col">
          <ChartRenderer
            chartType={chartType}
            chartProps={chartProps}
            onBarClick={handleBarClick}
            onPointClick={handleBarClick}
          />
        </div>
        {/* Table area - smaller */}
        <div className="flex-[2] min-h-0 overflow-auto">
          <SimpleTable headers={tableHeaders} rows={tableRows} />
        </div>
      </div>

      {drillDown && (
        <DrillDownModal
          title={`${title} — ${drillDown.label}`}
          headers={tableHeaders}
          rows={tableRows}
          onClose={() => setDrillDown(null)}
        />
      )}
    </div>
  );
}
