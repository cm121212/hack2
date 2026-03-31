import React from 'react';
import BarTrend from './BarTrend';
import LineTrend from './LineTrend';
import AreaTrend from './AreaTrend';
import GroupedBars from './GroupedBars';
import SplitBars from './SplitBars';
import StackedMonthly from './StackedMonthly';
import QuarterProgress from './QuarterProgress';

const chartMap = {
  barTrend: BarTrend,
  lineTrend: LineTrend,
  areaTrend: AreaTrend,
  groupedBars: GroupedBars,
  splitBars: SplitBars,
  stackedMonthly: StackedMonthly,
  quarterProgress: QuarterProgress,
};

export default function ChartRenderer({ chartType, chartProps, onBarClick, onPointClick }) {
  const Component = chartMap[chartType];
  if (!Component) return <div className="flex items-center justify-center h-full text-slate-400 text-sm">No chart</div>;
  return <Component {...chartProps} onBarClick={onBarClick} onPointClick={onPointClick} />;
}
