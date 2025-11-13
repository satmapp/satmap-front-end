'use client'

import { useState, useEffect } from 'react'
import { Bitcoin, Zap, MapPin, Store, Coffee, Hotel, ShoppingBag, Briefcase, CheckCircle, Star, Phone, Globe } from 'lucide-react'
import { Commerce } from '@/lib/types'
import { getCommerces } from '@/lib/api'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/loading'

const categoryIcons: Record<string, any> = {
  restaurant: Store,
  cafe: Coffee,
  hotel: Hotel,
  shop: ShoppingBag,
  service: Briefcase,
}

export default function TouristPage() {
  const [places, setPlaces] = useState<Commerce[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const data = await getCommerces(true)
      setPlaces(data)
      setLoading(false)
    }
    loadData()
  }, [])

  const categories = [
    { id: 'all', name: 'All Places' },
    { id: 'restaurant', name: 'Restaurants' },
    { id: 'cafe', name: 'Cafes' },
    { id: 'hotel', name: 'Hotels' },
    { id: 'shop', name: 'Shops' },
    { id: 'service', name: 'Services' },
    { id: 'other', name: 'Other' },
  ]

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(p => p.category === selectedCategory)

  if (loading) {
    return <Loading />
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-4 md:px-6 lg:px-8 py-3">
          <BreadcrumbNav />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 md:px-6 lg:px-8 py-6 pb-20 md:pb-6 max-w-7xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex items-center gap-2">
              <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-bitcoin" />
              <span className="break-words">Bitcoin Tourist Guide</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Discover verified businesses accepting Bitcoin in El Salvador
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                size="sm"
                className="text-xs sm:text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {filteredPlaces.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No places found</h3>
                  <p className="text-muted-foreground">
                    Try selecting a different category or check back later.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => {
                const Icon = categoryIcons[place.category] || Store
                
                return (
                  <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {place.photo_url && (
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={place.photo_url} 
                          alt={place.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2">
                            <Icon className="w-5 h-5" />
                            {place.name}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {place.city}, {place.country}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm">{place.address}</p>

                      <div className="flex flex-wrap gap-2">
                        {place.verified && (
                          <Badge className="bg-green-500 gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline" className="gap-1">
                          <Zap className="w-3 h-3 text-bitcoin" />
                          {place.payment_method}
                        </Badge>
                        <Badge variant="secondary" className="capitalize">
                          {place.category}
                        </Badge>
                        {place.premium && (
                          <Badge className="bg-yellow-500 text-black gap-1">
                            <Star className="w-3 h-3" />
                            Premium
                          </Badge>
                        )}
                      </div>

                      {place.phone && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {place.phone}
                        </p>
                      )}

                      {place.website && (
                        <a
                          href={place.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-bitcoin hover:underline inline-flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          Visit Website
                        </a>
                      )}

                      <div className="pt-2">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="w-full gap-2">
                            <MapPin className="w-4 h-4" />
                            View on Map
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
