'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { MapPin, Store, Phone, Globe, Zap, Wifi, Link2, Navigation } from 'lucide-react'
import { toast } from 'sonner'
import { addBusinessSchema, type AddBusinessFormData } from '@/lib/validations/business'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { LocationPickerMap } from '@/components/location-picker-map'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AddBusinessForm() {
  const router = useRouter()
  const form = useForm<AddBusinessFormData>({
    resolver: zodResolver(addBusinessSchema),
    defaultValues: {
      businessName: '',
      address: '',
      city: '',
      country: '',
      phone: '',
      website: '',
      paymentMethod: 'lightning',
      latitude: 13.6929,
      longitude: -89.2182,
    },
  })

  const handleUseCurrentLocation = () => {
    if ('geolocation' in navigator) {
      toast.loading('Getting your location...', { id: 'geolocation' })
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          form.setValue('latitude', lat)
          form.setValue('longitude', lng)
          toast.success('Location set!', { id: 'geolocation' })
        },
        (error) => {
          toast.error('Unable to get location', { 
            id: 'geolocation',
            description: 'Please allow location access or enter coordinates manually'
          })
        }
      )
    } else {
      toast.error('Geolocation is not supported by your browser')
    }
  }

  const onSubmit = async (data: AddBusinessFormData) => {
    try {
      toast.loading('Adding business...', { id: 'add-business' })
      
      const { createCommerce } = await import('@/lib/api')
      const { useAuthStore } = await import('@/lib/store/auth-store')
      
      const user = useAuthStore.getState().user
      
      if (!user) {
        toast.error('Please login to add businesses', { id: 'add-business' })
        router.push('/login')
        return
      }
      
      await createCommerce({
        name: data.businessName,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone || undefined,
        website: data.website || undefined,
        category: data.category,
        payment_method: data.paymentMethod,
        latitude: data.latitude,
        longitude: data.longitude,
      }, user.id)
      
      toast.success(
        'Business added successfully! You\'ll earn 150 sats when verified by 3 users',
        { id: 'add-business', duration: 5000 }
      )
      
      setTimeout(() => {
        router.push('/map')
      }, 500)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to add business. Please try again.', { id: 'add-business' })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Business Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter business name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </FormLabel>
                <FormControl>
                  <Input placeholder="Street address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </CardTitle>
              <CardDescription>
                Click on the map to set the exact location, or enter coordinates manually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LocationPickerMap
                position={[form.watch('latitude'), form.watch('longitude')]}
                onPositionChange={(position) => {
                  form.setValue('latitude', position[0])
                  form.setValue('longitude', position[1])
                }}
              />
              
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleUseCurrentLocation}
                  className="gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  Use My Location
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="13.6929"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="any"
                          placeholder="-89.2182"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="+1 234 567 8900" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Website
                </FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="cafe">Cafe</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="shop">Shop</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment Methods</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="lightning" id="payment-lightning" />
                      <Label htmlFor="payment-lightning" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Zap className="w-4 h-4 text-bitcoin" />
                        <span className="text-sm">Lightning Network</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="onchain" id="payment-onchain" />
                      <Label htmlFor="payment-onchain" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Link2 className="w-4 h-4 text-bitcoin" />
                        <span className="text-sm">On-chain Bitcoin</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer">
                      <RadioGroupItem value="contactless" id="payment-contactless" />
                      <Label htmlFor="payment-contactless" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Wifi className="w-4 h-4 text-bitcoin" />
                        <span className="text-sm">Contactless Lightning</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
            disabled={form.formState.isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Submitting...' : 'Submit Business'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

