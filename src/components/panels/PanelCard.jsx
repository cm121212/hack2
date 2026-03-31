import React, { useMemo } from 'react';
import StatusPill from './StatusPill';
import MetricCard from './MetricCard';
import ChartRenderer from '../charts/ChartRenderer';
import SimpleTable from '../table/SimpleTable';
import { useDateRange } from '../../context/DateRangeContext';
import { useAlerts, checkThreshold } from '../../context/AlertContext';
import {
  filterMonthlyData,
  filterQuarterlyData,
  filterTableRows,
} from '../../utils/dateRangeUtils';

const MONTHLY_CHART_TYPES = ['barTrend', 'lineTrend', 'areaTrend', 'stackedMonthly'];
const QUARTERLY_CHART_TYPES = ['splitBars', 'groupedBars'];

const severityBorder = {
  critical: 'border-red-400',
  warning: 'border-amber-400',
};

const severityBadge = {
  critical: 'bg-red-100 text-red-700 border-red-300',
  warning: 'bg-amber-100 text-amber-700 border-amber-300',
};

export default function PanelCard({ panel }) {
  const { selectedPresetId } = useDateRange();
  const { thresholds } = useAlerts();
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

  // Compute panel-level alert severity from its metrics
  const panelAlertSeverity = useMemo(() => {
    let highest = null;
    for (const m of metrics) {
      const sev = checkThreshold(m.title, m.value, thresholds);
      if (sev === 'critical') return 'critical';
      if (sev === 'warning') highest = 'warning';
    }
    return highest;
  }, [metrics, thresholds]);

  return (
    <div
      className={`flex flex-col bg-white rounded-xl shadow-sm border-2 p-4 overflow-hidden transition-colors ${
        panelAlertSeverity ? severityBorder[panelAlertSeverity] : 'border-slate-200'
      }`}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-base font-semibold text-slate-800 truncate">{title}</h2>
          {panelAlertSeverity && (
            <span
              className={`flex-shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                severityBadge[panelAlertSeverity]
              } ${panelAlertSeverity === 'critical' ? 'animate-pulse' : ''}`}
              title={`${panelAlertSeverity === 'critical' ? 'Critical' : 'Warning'} threshold breached`}
            >
              {panelAlertSeverity === 'critical' ? '🔴' : '⚠️'}{' '}
              {panelAlertSeverity === 'critical' ? 'Critical' : 'Warning'}
            </span>
          )}
        </div>
        <StatusPill status={status} />
      </div>

      {/* Metrics row */}
      <div className="flex gap-2 mb-3">
        {metrics.map((m, i) => {
          const metricSev = checkThreshold(m.title, m.value, thresholds);
          return <MetricCard key={i} title={m.title} value={m.value} alertSeverity={metricSev} />;
        })}
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
