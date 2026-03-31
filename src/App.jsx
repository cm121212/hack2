import React, { useState, useMemo } from 'react';
import AppShell from './components/layout/AppShell';
import Header from './components/layout/Header';
import ViewTabs from './components/navigation/ViewTabs';
import PanelCard from './components/panels/PanelCard';
import AlertsView from './components/alerts/AlertsView';
import ThresholdConfig from './components/alerts/ThresholdConfig';
import { DateRangeProvider } from './context/DateRangeContext';
import { AlertProvider, useAlerts } from './context/AlertContext';
import { customers, views, customerData } from './data/dashboardData';

const ALERTS_VIEW_ID = 'alerts';

function Dashboard() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0]);
  const [activeViewId, setActiveViewId] = useState(1);
  const [showThresholds, setShowThresholds] = useState(false);
  const { activeAlerts } = useAlerts();

  const allViews = useMemo(
    () => [
      ...views,
      {
        id: ALERTS_VIEW_ID,
        title: '🔔 Alerts',
        badge: activeAlerts.length,
      },
    ],
    [activeAlerts.length]
  );

  const activePanels = useMemo(() => {
    if (activeViewId === ALERTS_VIEW_ID) return [];
    return customerData[selectedCustomer]?.[activeViewId]?.panels ?? [];
  }, [selectedCustomer, activeViewId]);

  return (
    <AppShell>
      <Header
        selectedCustomer={selectedCustomer}
        customers={customers}
        setSelectedCustomer={setSelectedCustomer}
        onOpenAlerts={() => setActiveViewId(ALERTS_VIEW_ID)}
        onOpenThresholds={() => setShowThresholds(true)}
      />
      <ViewTabs
        views={allViews}
        activeViewId={activeViewId}
        setActiveViewId={setActiveViewId}
      />
      <main className="flex-1 overflow-hidden px-4 pb-4">
        {activeViewId === ALERTS_VIEW_ID ? (
          <AlertsView />
        ) : (
          <div
            className={`h-full grid gap-4 ${
              activePanels.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {activePanels.map((panel, idx) => (
              <PanelCard key={idx} panel={panel} />
            ))}
          </div>
        )}
      </main>

      {showThresholds && <ThresholdConfig onClose={() => setShowThresholds(false)} />}
    </AppShell>
  );
}

export default function App() {
  return (
    <DateRangeProvider>
      <AlertProvider>
        <Dashboard />
      </AlertProvider>
    </DateRangeProvider>
  );
}
