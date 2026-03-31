import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRESETS, DEFAULT_PRESET_ID, getPreset } from '../utils/dateRangeUtils';

const DateRangeContext = createContext(null);

export function DateRangeProvider({ children }) {
  const [selectedPresetId, setSelectedPresetId] = useState(() => {
    return localStorage.getItem('dashboardDateRange') ?? DEFAULT_PRESET_ID;
  });

  useEffect(() => {
    localStorage.setItem('dashboardDateRange', selectedPresetId);
  }, [selectedPresetId]);

  const presetConfig = getPreset(selectedPresetId);

  return (
    <DateRangeContext.Provider
      value={{ selectedPresetId, setSelectedPresetId, presetConfig, presets: PRESETS }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx) throw new Error('useDateRange must be used within DateRangeProvider');
  return ctx;
}
