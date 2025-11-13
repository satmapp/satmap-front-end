'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { getCommerces, verifyCommerce } from '@/lib/api'
import type { Commerce } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import { CheckCircle, Star, Phone, Globe, Zap } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export const verifiedIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const pendingIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export const premiumIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function Map() {
  const [commerces, setCommerces] = useState<Commerce[]>([])
  const [loading, setLoading] = useState(true)
  const position: [number, number] = [13.6929, -89.2182]
  const { user } = useAuthStore()

  useEffect(() => {
    loadCommerces()
  }, [])

  const loadCommerces = async () => {
    try {
      const data = await getCommerces()
      setCommerces(data)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (commerceId: number) => {
    if (!user || !user.lnbits_invoice_key) {
      toast.error('Please login to verify businesses')
      return
    }

    try {
      const result = await verifyCommerce(commerceId, user.lnbits_invoice_key)
      toast.success(result.message)
      if (result.verified) {
        toast.success('Commerce verified! Rewards distributed!', { duration: 5000 })
      }
      await loadCommerces()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getIcon = (commerce: Commerce) => {
    if (commerce.premium) return premiumIcon
    if (commerce.verified) return verifiedIcon
    return pendingIcon
  }

  return (
    <MapContainer
      center={position}
      zoom={10}
      scrollWheelZoom={true}
      className="h-full w-full"
      style={{ background: 'var(--muted)' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {commerces.map((commerce) => (
        <Marker
          key={commerce.id}
          position={[commerce.latitude, commerce.longitude]}
          icon={getIcon(commerce)}
        >
          <Popup>
            <div className="p-2 min-w-[220px] space-y-2">
              {commerce.photo_url && (
                <img 
                  src={commerce.photo_url} 
                  alt={commerce.name}
                  className="w-full h-32 object-cover rounded-md"
                />
              )}
              <h3 className="font-bold text-lg">{commerce.name}</h3>
              <p className="text-sm text-gray-600">{commerce.address}</p>
              <p className="text-xs text-gray-500">{commerce.city}, {commerce.country}</p>
              
              <div className="flex gap-2 flex-wrap">
                <Badge variant={commerce.verified ? "default" : "secondary"} className="text-xs flex items-center gap-1">
                  {commerce.verified ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </>
                  ) : (
                    `Pending (${commerce.verification_count}/3)`
                  )}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {commerce.payment_method}
                </Badge>
                {commerce.premium && (
                  <Badge className="text-xs bg-yellow-500 text-black flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Premium
                  </Badge>
                )}
              </div>

              {commerce.phone && (
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {commerce.phone}
                </p>
              )}

              {commerce.website && (
                <a 
                  href={commerce.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Globe className="w-3 h-3" />
                  Website
                </a>
              )}
              
              {!commerce.verified && (
                <Button 
                  size="sm" 
                  onClick={() => handleVerify(commerce.id)}
                  className="w-full mt-2 gap-1"
                >
                  <Zap className="w-4 h-4" />
                  Verify & Earn 50 sats
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      
      {loading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[1000]">
          Loading commerces...
        </div>
      )}
      
      {!loading && commerces.length === 0 && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg z-[1000]">
          No commerces found. Add the first one!
        </div>
      )}
    </MapContainer>
  )
}

