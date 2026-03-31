import React, { useMemo } from 'react';
import StatusPill from './StatusPill';
import MetricCard from './MetricCard';
import ChartRenderer from '../charts/ChartRenderer';
import SimpleTable from '../table/SimpleTable';
import { useDateRange } from '../../context/DateRangeContext';
import {
  filterMonthlyData,
  filterQuarterlyData,
  filterTableRows,
} from '../../utils/dateRangeUtils';

const MONTHLY_CHART_TYPES = ['barTrend', 'lineTrend', 'areaTrend', 'stackedMonthly'];
const QUARTERLY_CHART_TYPES = ['splitBars', 'groupedBars'];

export default function PanelCard({ panel }) {
  const { selectedPresetId } = useDateRange();
  const { title, status, metrics, chartType, chartProps, tableHeaders, tableRows } = panel;

  const filteredChartData = useMemo(() => {
    if (MONTHLY_CHART_TYPES.includes(chartType)) {
      return filterMonthlyData(chartProps.data, selectedPresetId);
    }
    if (QUARTERLY_CHART_TYPES.includes(chartType)) {
      return filterQuarterlyData(chartProps.data, selectedPresetId);
    }
    return chartProps.data;
  }, [chartType, chartProps.data, selectedPresetId]);

  const filteredTableRows = useMemo(() => {
    return filterTableRows(tableRows, filteredChartData);
  }, [tableRows, filteredChartData]);

  const filteredChartProps = useMemo(
    () => ({ ...chartProps, data: filteredChartData }),
    [chartProps, filteredChartData]
  );

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
          {filteredChartData && filteredChartData.length > 0 ? (
            <ChartRenderer chartType={chartType} chartProps={filteredChartProps} />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm">
              No data for selected period
            </div>
          )}
        </div>
        {/* Table area - smaller */}
        <div className="flex-[2] min-h-0 overflow-auto">
          <SimpleTable headers={tableHeaders} rows={filteredTableRows} />
        </div>
      </div>
    </div>
  );
}
