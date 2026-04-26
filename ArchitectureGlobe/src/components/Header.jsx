import React, { useState, useRef } from 'react'

export default function Header({
  searchQuery,
  setSearchQuery,
  filteredBuildings,
  onSelectBuilding,
  onRandomBuilding,
  onReset,
}) {
  const [showResults, setShowResults] = useState(false)

  const results = searchQuery.length > 1 ? filteredBuildings.slice(0, 8) : []

  return (
    <header className="flex items-center gap-3 px-5 py-3 bg-gray-900 border-b border-gray-800 z-20 flex-shrink-0">
      <h1 className="text-lg font-bold text-amber-400 whitespace-nowrap tracking-wide">
        Architecture Globe
      </h1>

      <div className="relative flex-1 max-w-sm">
        <input
          type="text"
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value)
            setShowResults(true)
          }}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
          placeholder="Search buildings or architects…"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-1.5 text-sm focus:outline-none focus:border-amber-500 placeholder-gray-500"
        />
        {searchQuery && (
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            onClick={() => setSearchQuery('')}
          >
            ×
          </button>
        )}

        {showResults && results.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-2xl z-50 max-h-60 overflow-y-auto">
            {results.map(b => (
              <button
                key={b.id}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 text-sm border-b border-gray-700 last:border-0 transition-colors"
                onMouseDown={() => onSelectBuilding(b)}
              >
                <div className="font-medium truncate">{b.name}</div>
                <div className="text-gray-400 text-xs truncate">
                  {b.architect} · {b.city}, {b.country}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onRandomBuilding}
        className="px-3 py-1.5 bg-teal-700 hover:bg-teal-600 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        title="Random building"
      >
        ✦ Random
      </button>

      <button
        onClick={onReset}
        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors whitespace-nowrap"
        title="Reset view and filters"
      >
        Reset
      </button>
    </header>
  )
}
