import React, { useEffect } from 'react';
import SimpleTable from '../table/SimpleTable';

export default function DrillDownModal({ title, headers, rows, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[80vh] flex flex-col mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-800">{title}</h3>
          <button
            className="text-slate-400 hover:text-slate-700 text-xl leading-none"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="overflow-auto flex-1">
          <SimpleTable headers={headers} rows={rows} />
        </div>
      </div>
    </div>
  );
}
