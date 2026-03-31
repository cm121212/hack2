export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Maps quarter label → month indices (0-based)
export const QUARTER_MONTHS = {
  Q1: [0, 1, 2],
  Q2: [3, 4, 5],
  Q3: [6, 7, 8],
  Q4: [9, 10, 11],
};

// All preset options.  startMonth / endMonth are 0-based (Jan=0, Dec=11).
// Data is anchored to the full year 2024.
export const PRESETS = [
  { id: "thisMonth",   label: "This Month",       startMonth: 11, endMonth: 11 },
  { id: "thisQ",       label: "This Quarter",     startMonth:  9, endMonth: 11 },
  { id: "lastQ",       label: "Last Quarter",     startMonth:  6, endMonth:  8 },
  { id: "h1",          label: "H1 2024",          startMonth:  0, endMonth:  5 },
  { id: "ytd",         label: "Year to Date",     startMonth:  0, endMonth: 11 },
];

export const DEFAULT_PRESET_ID = "ytd";

/** Returns the preset config for an id (falls back to default). */
export function getPreset(id) {
  return PRESETS.find((p) => p.id === id) ?? PRESETS.find((p) => p.id === DEFAULT_PRESET_ID);
}

/**
 * Filters an array of { label: string, ... } data points where label is a
 * month abbreviation ("Jan"…"Dec") to only those within [startMonth, endMonth].
 */
export function filterMonthlyData(data, presetId) {
  if (!data) return data;
  const preset = getPreset(presetId);
  if (!preset) return data;
  const { startMonth, endMonth } = preset;
  return data.filter((item) => {
    const idx = MONTH_LABELS.indexOf(item.label);
    if (idx === -1) return true; // non-month labels pass through
    return idx >= startMonth && idx <= endMonth;
  });
}

/**
 * Filters quarterly data (label is "Q1"…"Q4") to only quarters whose months
 * overlap the selected month range.
 */
export function filterQuarterlyData(data, presetId) {
  if (!data) return data;
  const preset = getPreset(presetId);
  if (!preset) return data;
  const { startMonth, endMonth } = preset;
  return data.filter((item) => {
    const qMonths = QUARTER_MONTHS[item.label];
    if (!qMonths) return true;
    return qMonths.some((m) => m >= startMonth && m <= endMonth);
  });
}

/**
 * Filters tableRows so they match the labels that survived data filtering.
 * Assumes tableRows[i][0] is the label (month or quarter).
 */
export function filterTableRows(tableRows, filteredData) {
  if (!tableRows || !filteredData) return tableRows;
  const labelSet = new Set(filteredData.map((d) => d.label));
  return tableRows.filter((row) => labelSet.has(row[0]));
}
