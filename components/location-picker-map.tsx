'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const getCustomIcon = () => {
  return L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
}

interface LocationPickerMapProps {
  position: [number, number]
  onPositionChange: (position: [number, number]) => void
}

function LocationMarker({ position, onPositionChange }: LocationPickerMapProps) {
  useMapEvents({
    click(e) {
      const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng]
      onPositionChange(newPosition)
    },
  })

  return position ? <Marker position={position} icon={getCustomIcon()} /> : null
}

export function LocationPickerMap({ position, onPositionChange }: LocationPickerMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] bg-muted rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden border">
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} onPositionChange={onPositionChange} />
      </MapContainer>
    </div>
  )
}

