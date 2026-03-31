import React from 'react';

export default function ViewTabs({ views, activeViewId, setActiveViewId }) {
  return (
    <nav className="flex gap-2 bg-white rounded-xl px-3 py-2 shadow-sm border border-slate-200">
      {views.map((view) => {
        const isActive = activeViewId === view.id;
        return (
          <button
            key={view.id}
            onClick={() => setActiveViewId(view.id)}
            className={`flex-1 relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isActive
                ? 'bg-slate-800 text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {view.title}
            {view.badge > 0 && (
              <span
                className={`ml-1.5 inline-flex items-center justify-center h-4 min-w-[1rem] px-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-white text-red-600' : 'bg-red-500 text-white'
                }`}
              >
                {view.badge > 9 ? '9+' : view.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
