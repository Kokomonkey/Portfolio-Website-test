import React from 'react'

const PERIODS = [
  'Ancient (pre-1000)',
  'Medieval (1000–1400)',
  'Renaissance (1400–1700)',
  'Baroque / Neoclassical',
  'Modern (1850–1950)',
  'Contemporary (1950+)',
]

export default function FilterPanel({
  open,
  onToggle,
  styles,
  countries,
  filters,
  setFilters,
  count,
  total,
}) {
  const setFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }))
  const clearAll = () => setFilters({ style: '', country: '', period: '' })
  const hasFilters = filters.style || filters.country || filters.period

  return (
    <aside
      className={`transition-all duration-300 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0 ${
        open ? 'w-56' : 'w-9'
      } overflow-hidden`}
    >
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-9 w-full border-b border-gray-800 hover:bg-gray-800 text-gray-400 hover:text-white transition-colors text-xs flex-shrink-0"
        title={open ? 'Collapse filters' : 'Expand filters'}
      >
        {open ? '◀ Filters' : '▶'}
      </button>

      {open && (
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div className="text-xs text-gray-400">
            Showing{' '}
            <span className="text-amber-400 font-bold">{count}</span> / {total} buildings
          </div>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
            >
              × Clear all filters
            </button>
          )}

          <FilterSelect
            label="Architectural Style"
            value={filters.style}
            options={styles}
            onChange={v => setFilter('style', v)}
          />
          <FilterSelect
            label="Country"
            value={filters.country}
            options={countries}
            onChange={v => setFilter('country', v)}
          />
          <FilterSelect
            label="Period"
            value={filters.period}
            options={PERIODS}
            onChange={v => setFilter('period', v)}
          />
        </div>
      )}
    </aside>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
      >
        <option value="">All</option>
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}
