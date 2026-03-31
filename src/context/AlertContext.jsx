import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { customerData } from '../data/dashboardData';

const AlertContext = createContext(null);

// Default thresholds for 3+ metric types (values are in the same unit returned by parseMetricValue)
// direction: 'below' → alert when value < threshold; 'above' → alert when value > threshold
export const DEFAULT_THRESHOLDS = {
  'Seat Growth (Month)': {
    label: 'Seat Growth (Month)',
    warning: 100,
    critical: 60,
    direction: 'below',
    unit: 'seats',
  },
  'Revenue Growth (Month)': {
    label: 'Revenue Growth (Month)',
    warning: 20,
    critical: 10,
    direction: 'below',
    unit: '$K',
  },
  'New Product Mix': {
    label: 'New Product Mix',
    warning: 40,
    critical: 30,
    direction: 'below',
    unit: '%',
  },
};

/**
 * Parse a display metric value string into a numeric value.
 * Handles formats like: "+142", "+$28K", "94K units", "62%", "-5%", "$2.1M", "+18%"
 * Revenue values in $K are returned as their K numeric value (e.g. "$28K" → 28).
 */
export function parseMetricValue(valueStr) {
  if (!valueStr || typeof valueStr !== 'string') return NaN;
  let str = valueStr.replace(/[+$,\s]/g, '').replace(/units/gi, '').trim();
  const isPercent = str.endsWith('%');
  const isM = !isPercent && str.toUpperCase().endsWith('M');
  const isK = !isPercent && !isM && str.toUpperCase().endsWith('K');
  str = str.replace(/[%MKmk]/g, '').trim();
  const num = parseFloat(str);
  if (isNaN(num)) return NaN;
  if (isM) return num * 1000; // store as K-equivalent for consistency
  if (isK) return num;
  return num;
}

/**
 * Returns the alert severity ('warning' | 'critical') for a metric, or null if within threshold.
 */
export function checkThreshold(metricTitle, metricValue, thresholds) {
  const threshold = thresholds[metricTitle];
  if (!threshold) return null;
  const value = parseMetricValue(metricValue);
  if (isNaN(value)) return null;
  const { warning, critical, direction } = threshold;
  if (direction === 'below') {
    if (value < critical) return 'critical';
    if (value < warning) return 'warning';
  } else if (direction === 'above') {
    if (value > critical) return 'critical';
    if (value > warning) return 'warning';
  }
  return null;
}

/**
 * Scan all customerData and return every metric that breaches a threshold.
 */
function computeActiveAlerts(thresholds) {
  const alerts = [];
  Object.entries(customerData).forEach(([customer, views]) => {
    Object.entries(views).forEach(([viewId, viewData]) => {
      viewData.panels?.forEach((panel) => {
        panel.metrics?.forEach((metric) => {
          const severity = checkThreshold(metric.title, metric.value, thresholds);
          if (severity) {
            alerts.push({
              id: `${customer}-${viewId}-${panel.title}-${metric.title}`,
              customer,
              viewId: parseInt(viewId, 10),
              panelTitle: panel.title,
              metricTitle: metric.title,
              metricValue: metric.value,
              severity,
            });
          }
        });
      });
    });
  });
  // Critical first, then warning
  return alerts.sort((a, b) => {
    if (a.severity === 'critical' && b.severity !== 'critical') return -1;
    if (a.severity !== 'critical' && b.severity === 'critical') return 1;
    return 0;
  });
}

export function AlertProvider({ children }) {
  const [thresholds, setThresholds] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboardThresholds');
      return saved ? { ...DEFAULT_THRESHOLDS, ...JSON.parse(saved) } : DEFAULT_THRESHOLDS;
    } catch {
      return DEFAULT_THRESHOLDS;
    }
  });

  const [alertHistory, setAlertHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('dashboardAlertHistory');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeAlerts = useMemo(() => computeActiveAlerts(thresholds), [thresholds]);

  // Persist thresholds
  useEffect(() => {
    localStorage.setItem('dashboardThresholds', JSON.stringify(thresholds));
  }, [thresholds]);

  // Append newly discovered alerts to history (deduplicated by id within the same session)
  useEffect(() => {
    if (activeAlerts.length === 0) return;
    const now = new Date().toISOString();
    setAlertHistory((prev) => {
      const existingIds = new Set(prev.map((h) => h.id));
      const newEntries = activeAlerts
        .filter((a) => !existingIds.has(a.id))
        .map((a) => ({ ...a, timestamp: now }));
      if (newEntries.length === 0) return prev;
      const updated = [...newEntries, ...prev].slice(0, 100);
      localStorage.setItem('dashboardAlertHistory', JSON.stringify(updated));
      return updated;
    });
  }, [activeAlerts]);

  const updateThreshold = useCallback((metricTitle, newConfig) => {
    setThresholds((prev) => ({
      ...prev,
      [metricTitle]: { ...prev[metricTitle], ...newConfig },
    }));
  }, []);

  const resetThresholds = useCallback(() => {
    setThresholds(DEFAULT_THRESHOLDS);
  }, []);

  const clearHistory = useCallback(() => {
    setAlertHistory([]);
    localStorage.removeItem('dashboardAlertHistory');
  }, []);

  return (
    <AlertContext.Provider
      value={{
        thresholds,
        activeAlerts,
        alertHistory,
        updateThreshold,
        resetThresholds,
        clearHistory,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlerts must be used within AlertProvider');
  return ctx;
}
