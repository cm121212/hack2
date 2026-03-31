import React from 'react';
import DateRangePicker from './DateRangePicker';
import NotificationBell from '../alerts/NotificationBell';

export default function Header({
  selectedCustomer,
  customers,
  setSelectedCustomer,
  onOpenAlerts,
  onOpenThresholds,
}) {
  return (
    <header className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-200">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Customer Dashboard</h1>
      <div className="flex items-center gap-3">
        <DateRangePicker />
        <div className="flex items-center gap-2">
          <label htmlFor="customer-select" className="text-sm font-medium text-slate-600">
            Customer:
          </label>
          <select
            id="customer-select"
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
          >
            {customers.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Threshold settings */}
        <button
          onClick={onOpenThresholds}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Configure alert thresholds"
          title="Configure alert thresholds"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        {/* Notification bell */}
        <NotificationBell onOpenAlerts={onOpenAlerts} />
      </div>
    </header>
  );
}
