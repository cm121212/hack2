import React, { useState, useRef, useEffect } from 'react';
import { useDateRange } from '../../context/DateRangeContext';

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function DateRangePicker() {
  const { selectedPresetId, setSelectedPresetId, presetConfig, presets } = useDateRange();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  function handleSelect(id) {
    setSelectedPresetId(id);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm border border-slate-300 rounded-lg px-3 py-1.5 bg-white text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer select-none"
      >
        <CalendarIcon />
        <span className="font-medium">{presetConfig?.label ?? 'Select range'}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 min-w-[180px]"
        >
          {presets.map((p) => (
            <button
              key={p.id}
              role="option"
              aria-selected={selectedPresetId === p.id}
              onClick={() => handleSelect(p.id)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-lg mx-0 ${
                selectedPresetId === p.id
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
