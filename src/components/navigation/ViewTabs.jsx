import React from 'react';

export default function ViewTabs({ views, activeViewId, setActiveViewId }) {
  return (
    <nav className="flex gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setActiveViewId(view.id)}
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            activeViewId === view.id
              ? 'bg-slate-800 text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {view.title}
        </button>
      ))}
    </nav>
  );
}
