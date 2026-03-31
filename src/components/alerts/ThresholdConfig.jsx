import React, { useState } from 'react';
import { useAlerts, DEFAULT_THRESHOLDS } from '../../context/AlertContext';

export default function ThresholdConfig({ onClose }) {
  const { thresholds, updateThreshold, resetThresholds } = useAlerts();
  const [local, setLocal] = useState(() => JSON.parse(JSON.stringify(thresholds)));

  const handleChange = (metricTitle, field, rawValue) => {
    const num = parseFloat(rawValue);
    setLocal((prev) => ({
      ...prev,
      [metricTitle]: { ...prev[metricTitle], [field]: isNaN(num) ? '' : num },
    }));
  };

  const handleSave = () => {
    Object.entries(local).forEach(([title, config]) => {
      updateThreshold(title, config);
    });
    onClose();
  };

  const handleReset = () => {
    resetThresholds();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-800">Configure Alert Thresholds</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Threshold rows */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-auto">
          {Object.entries(local).map(([title, config]) => (
            <div key={title}>
              <div className="text-sm font-semibold text-slate-700 mb-0.5">
                {config.label || title}
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Alert when value goes{' '}
                <span className="font-medium">{config.direction}</span> threshold · unit:{' '}
                <span className="font-medium">{config.unit}</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-amber-600 mb-1">
                    ⚠ Warning threshold
                  </label>
                  <input
                    type="number"
                    value={config.warning}
                    onChange={(e) => handleChange(title, 'warning', e.target.value)}
                    className="w-full text-sm border border-amber-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-red-600 mb-1">
                    🔴 Critical threshold
                  </label>
                  <input
                    type="number"
                    value={config.critical}
                    onChange={(e) => handleChange(title, 'critical', e.target.value)}
                    className="w-full text-sm border border-red-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-50"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={handleReset}
            className="text-sm text-slate-400 hover:text-slate-600 underline"
          >
            Reset to defaults
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="text-sm px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
