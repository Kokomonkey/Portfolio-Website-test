import React, { useState, useMemo, useCallback } from 'react'
import GlobeComponent from './components/Globe.jsx'
import Header from './components/Header.jsx'
import FilterPanel from './components/FilterPanel.jsx'
import BuildingDetails from './components/BuildingDetails.jsx'
import buildingsData from './data/buildings.json'

function getPeriod(year) {
  if (!year) return 'Unknown'
  if (year < 1000) return 'Ancient (pre-1000)'
  if (year < 1400) return 'Medieval (1000–1400)'
  if (year < 1700) return 'Renaissance (1400–1700)'
  if (year < 1850) return 'Baroque / Neoclassical'
  if (year < 1950) return 'Modern (1850–1950)'
  return 'Contemporary (1950+)'
}

export default function App() {
  const [selectedBuilding, setSelectedBuilding] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ style: '', country: '', period: '' })
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [focusBuilding, setFocusBuilding] = useState(null)

  const filteredBuildings = useMemo(() => {
    return buildingsData.filter(b => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        b.name.toLowerCase().includes(q) ||
        (b.architect && b.architect.toLowerCase().includes(q))
      const matchesStyle = !filters.style || b.style === filters.style
      const matchesCountry = !filters.country || b.country === filters.country
      const matchesPeriod = !filters.period || getPeriod(b.year) === filters.period
      return matchesSearch && matchesStyle && matchesCountry && matchesPeriod
    })
  }, [searchQuery, filters])

  const uniqueStyles = useMemo(
    () => [...new Set(buildingsData.map(b => b.style).filter(Boolean))].sort(),
    []
  )
  const uniqueCountries = useMemo(
    () => [...new Set(buildingsData.map(b => b.country).filter(Boolean))].sort(),
    []
  )
  const countryCount = useMemo(
    () => new Set(filteredBuildings.map(b => b.country)).size,
    [filteredBuildings]
  )

  const handleBuildingClick = useCallback(building => {
    setSelectedBuilding(building)
    setDetailsOpen(true)
  }, [])

  const handleSearchSelect = useCallback(building => {
    setSelectedBuilding(building)
    setDetailsOpen(true)
    setFocusBuilding(building)
    setSearchQuery('')
  }, [])

  const handleRandomBuilding = useCallback(() => {
    const pool = filteredBuildings.length > 0 ? filteredBuildings : buildingsData
    const random = pool[Math.floor(Math.random() * pool.length)]
    handleSearchSelect(random)
  }, [filteredBuildings, handleSearchSelect])

  const handleReset = useCallback(() => {
    setFocusBuilding(null)
    setSelectedBuilding(null)
    setDetailsOpen(false)
    setSearchQuery('')
    setFilters({ style: '', country: '', period: '' })
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white overflow-hidden">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredBuildings={filteredBuildings}
        onSelectBuilding={handleSearchSelect}
        onRandomBuilding={handleRandomBuilding}
        onReset={handleReset}
      />

      <div className="flex flex-1 overflow-hidden relative">
        <FilterPanel
          open={sidebarOpen}
          onToggle={() => setSidebarOpen(v => !v)}
          styles={uniqueStyles}
          countries={uniqueCountries}
          filters={filters}
          setFilters={setFilters}
          count={filteredBuildings.length}
          total={buildingsData.length}
        />

        <main className="flex-1 relative overflow-hidden">
          <GlobeComponent
            buildings={filteredBuildings}
            onBuildingClick={handleBuildingClick}
            focusBuilding={focusBuilding}
            selectedBuilding={selectedBuilding}
          />
        </main>

        {detailsOpen && selectedBuilding && (
          <BuildingDetails
            building={selectedBuilding}
            onClose={() => setDetailsOpen(false)}
          />
        )}
      </div>

      <footer className="flex items-center justify-center gap-6 py-2 px-6 text-xs text-gray-500 bg-gray-950 border-t border-gray-800 flex-shrink-0">
        <span>
          <span className="text-amber-400 font-semibold">{filteredBuildings.length}</span> buildings
        </span>
        <span>·</span>
        <span>
          <span className="text-teal-400 font-semibold">{countryCount}</span> countries
        </span>
        <span>·</span>
        <span>Architecture Globe</span>
      </footer>
    </div>
  )
}
