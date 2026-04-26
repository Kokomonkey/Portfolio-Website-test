import React, { useState } from 'react'

export default function BuildingDetails({ building, onClose }) {
  const [imgError, setImgError] = useState(false)

  return (
    <aside className="w-72 bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden flex-shrink-0 animate-slide-in z-10">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 flex-shrink-0">
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Building Details
        </span>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white text-xl leading-none transition-colors"
          title="Close"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {building.imageUrl && !imgError ? (
          <div className="h-44 bg-gray-800 flex-shrink-0 overflow-hidden">
            <img
              src={building.imageUrl}
              alt={building.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="h-24 bg-gray-800 flex items-center justify-center text-gray-600 text-4xl flex-shrink-0">
            🏛
          </div>
        )}

        <div className="p-4 space-y-4">
          <div>
            <h2 className="text-base font-bold leading-tight">{building.name}</h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {building.city}, {building.country}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <InfoItem label="Architect" value={building.architect} />
            <InfoItem label="Year" value={building.year} />
            <InfoItem label="Style" value={building.style} className="col-span-2" />
          </div>

          {building.description && (
            <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-800 pt-3">
              {building.description}
            </p>
          )}

          {building.wikiUrl && (
            <a
              href={building.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center py-2 bg-teal-700 hover:bg-teal-600 rounded-lg text-xs font-semibold transition-colors mt-2"
            >
              Learn More →
            </a>
          )}
        </div>
      </div>
    </aside>
  )
}

function InfoItem({ label, value, className = '' }) {
  return (
    <div className={className}>
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm font-medium leading-tight">{value || '—'}</div>
    </div>
  )
}
