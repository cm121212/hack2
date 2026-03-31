import React from 'react';
import DateRangePicker from './DateRangePicker';

export default function Header({ selectedCustomer, customers, setSelectedCustomer }) {
  return (
    <header className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm border border-slate-200">
      <h1 className="text-xl font-bold text-slate-800 tracking-tight">Customer Dashboard</h1>
      <div className="flex items-center gap-4">
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
      </div>
    </header>
  );
}
