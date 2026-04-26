import React, { useRef, useEffect, useState, useCallback } from 'react'
import Globe from 'react-globe.gl'

const GLOBE_IMAGE = '//unpkg.com/three-globe/example/img/earth-night.jpg'
const BG_IMAGE = '//unpkg.com/three-globe/example/img/night-sky.png'

export default function GlobeComponent({ buildings, onBuildingClick, focusBuilding, selectedBuilding }) {
  const globeRef = useRef()
  const containerRef = useRef()
  const [size, setSize] = useState({ w: 800, h: 600 })

  // Responsive sizing via ResizeObserver
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setSize({ w: Math.floor(width), h: Math.floor(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Auto-rotate — pause on drag, resume on release
  useEffect(() => {
    if (!globeRef.current) return
    const controls = globeRef.current.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.enableDamping = true
    controls.dampingFactor = 0.1
    controls.minDistance = 150
    controls.maxDistance = 800

    const canvas = globeRef.current.renderer().domElement
    const stop = () => { controls.autoRotate = false }
    const start = () => { controls.autoRotate = true }
    canvas.addEventListener('pointerdown', stop)
    canvas.addEventListener('pointerup', start)
    return () => {
      canvas.removeEventListener('pointerdown', stop)
      canvas.removeEventListener('pointerup', start)
    }
  }, [])

  // Fly to building when focusBuilding changes
  useEffect(() => {
    if (!focusBuilding || !globeRef.current) return
    globeRef.current.pointOfView(
      { lat: focusBuilding.latitude, lng: focusBuilding.longitude, altitude: 1.8 },
      1200
    )
  }, [focusBuilding])

  const getMarkerColor = useCallback(
    b => (selectedBuilding && b.id === selectedBuilding.id ? '#fbbf24' : '#14b8a6'),
    [selectedBuilding]
  )

  const getMarkerRadius = useCallback(
    b => (selectedBuilding && b.id === selectedBuilding.id ? 0.55 : 0.35),
    [selectedBuilding]
  )

  const getLabel = useCallback(
    b =>
      `<div class="globe-label"><b>${b.name}</b>${b.city}, ${b.country} · ${b.year || '?'}</div>`,
    []
  )

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        globeImageUrl={GLOBE_IMAGE}
        backgroundImageUrl={BG_IMAGE}
        atmosphereColor="#1e40af"
        atmosphereAltitude={0.18}
        pointsData={buildings}
        pointLat={d => d.latitude}
        pointLng={d => d.longitude}
        pointColor={getMarkerColor}
        pointRadius={getMarkerRadius}
        pointAltitude={0.008}
        pointLabel={getLabel}
        onPointClick={onBuildingClick}
        pointsMerge={false}
        rendererConfig={{ antialias: true }}
      />
    </div>
  )
}
