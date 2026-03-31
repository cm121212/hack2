import React from 'react';

export default function AppShell({ children }) {
  return (
    <div className="h-full flex flex-col bg-slate-100">
      <div className="flex flex-col h-full max-w-screen-2xl mx-auto w-full px-4 pt-4 gap-3">
        {children}
      </div>
    </div>
  );
}
