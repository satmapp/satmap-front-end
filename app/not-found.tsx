import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-6xl font-bold text-bitcoin">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="mt-4">
          <Link href="/map" className="gap-2">
            <MapPin className="w-4 h-4" />
            Back to Map
          </Link>
        </Button>
      </div>
    </div>
  )
}

