'use client'

import { useState, useEffect } from 'react'
import { Bitcoin, Zap, Radio, Waves, Trees, Landmark, Home, Building2, Globe, MapPin, Star } from 'lucide-react'
import { BitcoinPlace, Category } from '@/lib/types'
import { getBitcoinPlaces, getCategories } from '@/lib/api'
import { BreadcrumbNav } from '@/components/breadcrumb-nav'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loading } from '@/components/loading'

const iconMap: Record<string, any> = {
  waves: Waves,
  trees: Trees,
  landmark: Landmark,
  home: Home,
  building: Building2,
}

export default function TouristPage() {
  const [places, setPlaces] = useState<BitcoinPlace[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showBitcoinOnly, setShowBitcoinOnly] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        const [placesData, categoriesData] = await Promise.all([
          getBitcoinPlaces(),
          getCategories(),
        ])

        setPlaces(placesData)
        setCategories([{ id: 'all', name: 'All', icon: 'globe' }, ...categoriesData])
      } catch (err) {
        setError('Error loading data. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const filteredPlaces = places
    .filter((place) => selectedCategory === 'all' || place.category === selectedCategory)
    .filter((place) => !showBitcoinOnly || place.acceptsBitcoin)

  const bitcoinCount = places.filter(p => p.acceptsBitcoin).length
  const lightningCount = places.filter(p => p.acceptsLightning).length
  const contactlessCount = places.filter(p => p.acceptsContactless).length

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="h-full overflow-y-auto flex flex-col">
        <div className="border-b bg-background sticky top-0 z-10">
          <div className="px-6 py-3">
            <BreadcrumbNav />
          </div>
        </div>
        <div className="flex-1 px-4 md:px-6 lg:px-8 py-4 md:py-6">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-destructive">
                {error}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-6 py-3">
          <BreadcrumbNav />
        </div>
      </div>

      <div className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              Discover{' '}
              <span className="bg-gradient-to-r from-bitcoin via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                El Salvador
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the most beautiful places in the country and enjoy paying with Bitcoin
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Card className="w-fit">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Bitcoin className={`h-5 w-5 ${showBitcoinOnly ? 'text-bitcoin' : 'text-muted-foreground'}`} />
                  <span className="text-sm font-medium">
                    Bitcoin accepting places only
                  </span>
                  <button
                    onClick={() => setShowBitcoinOnly(!showBitcoinOnly)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showBitcoinOnly ? 'bg-bitcoin' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                        showBitcoinOnly ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <Badge variant="secondary" className="text-xs">
                    {bitcoinCount} places
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="outline" className="gap-2 py-2 px-4">
                <Bitcoin className="h-4 w-4 text-bitcoin" />
                <span>{bitcoinCount} with Bitcoin</span>
              </Badge>
              <Badge variant="outline" className="gap-2 py-2 px-4">
                <Zap className="h-4 w-4 text-bitcoin" />
                <span>{lightningCount} with Lightning</span>
              </Badge>
              <Badge variant="outline" className="gap-2 py-2 px-4">
                <Radio className="h-4 w-4 text-bitcoin" />
                <span>{contactlessCount} with Contactless</span>
              </Badge>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-muted-foreground">Find the perfect destination for your adventure</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => {
                const Icon = iconMap[category.icon] || Globe
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-bitcoin text-black shadow-lg'
                        : 'bg-card border hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {category.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <Card key={place.id} className="overflow-hidden group hover:shadow-lg transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  <div className="absolute top-2 right-2 flex gap-1">
                    {place.acceptsBitcoin && (
                      <Badge className="bg-bitcoin text-black hover:bg-bitcoin/90">
                        <Bitcoin className="w-3 h-3" />
                      </Badge>
                    )}
                    {place.acceptsLightning && (
                      <Badge className="bg-bitcoin hover:bg-bitcoin/90 text-black">
                        <Zap className="w-3 h-3" />
                      </Badge>
                    )}
                    {place.acceptsContactless && (
                      <Badge className="bg-bitcoin hover:bg-bitcoin/90 text-black">
                        <Radio className="w-3 h-3" />
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-bitcoin text-bitcoin" />
                    <span className="text-xs text-white font-medium">{place.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="line-clamp-1">{place.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {place.location}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {place.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPlaces.length === 0 && (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-xl text-muted-foreground mb-4">
                    No places found with these filters
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setShowBitcoinOnly(false)
                    }}
                    className="text-bitcoin hover:underline font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Bitcoin className="h-5 w-5 text-bitcoin" />
                <span className="font-bold text-lg">Payment Methods</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Bitcoin className="h-4 w-4 text-bitcoin mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Bitcoin:</strong> Traditional on-chain payments, ideal for large transactions
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-4 w-4 text-bitcoin mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Lightning:</strong> Instant payments with minimal fees
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Radio className="h-4 w-4 text-bitcoin mt-0.5 flex-shrink-0" />
                  <div>
                    <strong>Lightning Contactless:</strong> Contactless payment via NFC — just tap your device
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

