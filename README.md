# SatMap - Bitcoin Business Directory

A modern web application for discovering and verifying Bitcoin-accepting businesses with Lightning Network support.

## Features

- Interactive map to explore Bitcoin-friendly businesses
- Add new businesses to the directory
- Lightning Network wallet integration
- User profiles and contributions tracking
- Dark/Light theme support
- Responsive design for mobile and desktop

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Map:** Leaflet & React-Leaflet
- **State Management:** Zustand
- **Theme:** next-themes

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd satmap-front-end
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
satmap-front-end/
├── app/
│   ├── map/          # Map exploration page
│   ├── add/          # Add business page
│   ├── wallet/       # Lightning wallet page
│   ├── profile/      # User profile page
│   ├── layout.tsx    # Root layout with sidebar
│   ├── page.tsx      # Home (redirects to /map)
│   └── not-found.tsx # 404 page
├── components/
│   ├── layout/       # Layout components (sidebar, mobile nav)
│   ├── ui/           # shadcn/ui components
│   ├── Map.tsx       # Leaflet map component
│   ├── ModeToggle.tsx # Theme toggle
│   └── theme-provider.tsx
├── lib/
│   └── utils.ts      # Utility functions
└── public/           # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Features Roadmap

- [ ] Business markers on map
- [ ] Search and filter functionality
- [ ] Lightning Network payment integration
- [ ] User authentication
- [ ] Business verification system
- [ ] Rating and reviews
- [ ] Geolocation support
- [ ] Export/import business data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.