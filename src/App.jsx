import React, { useState, useMemo } from 'react';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import ViewTabs from './components/navigation/ViewTabs';
import PanelCard from './components/panels/PanelCard';
import { customers, views, customerData } from './data/dashboardData';

export default function App() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [activeViewId, setActiveViewId] = useState(1);

  const activePanels = useMemo(() => {
    return customerData[selectedCustomer]?.[activeViewId]?.panels ?? [];
  }, [selectedCustomer, activeViewId]);

  return (
    <AppShell>
      <Header
        selectedCustomer={selectedCustomer}
        customers={customers}
        setSelectedCustomer={setSelectedCustomer}
      />
      <ViewTabs
        views={views}
        activeViewId={activeViewId}
        setActiveViewId={setActiveViewId}
      />
      <main className="flex-1 overflow-hidden px-4 pb-4">
        <div className={`h-full grid gap-4 ${activePanels.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {activePanels.map((panel, idx) => (
            <PanelCard key={idx} panel={panel} />
          ))}
        </div>
      </main>
    </AppShell>
  );
}
