'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full rounded-lg bg-muted animate-pulse flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-orange-500 mb-2">
            SatMap ⚡
          </h1>
          <p className="text-xl text-muted-foreground">
            Community map of Bitcoin-friendly businesses
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Map />
        </div>
      </div>
    </main>
  );
}
