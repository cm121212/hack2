import React from 'react';

export default function SimpleTable({ headers, rows }) {
  return (
    <div className="h-full overflow-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-100 sticky top-0">
            {headers.map((h, i) => (
              <th key={i} className="px-2 py-1.5 text-left font-semibold text-slate-600 whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-slate-100 hover:bg-slate-50">
              {row.map((cell, ci) => (
                <td key={ci} className="px-2 py-1.5 text-slate-700 whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
