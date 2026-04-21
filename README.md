# 🚀 Starbase — Explore the Universe

Your personal mission control for space exploration. Built with real NASA data, this app lets you browse stunning astronomy images, Mars rover photos, Moon mission photography, and live asteroid tracking — all in one place.

## What's Inside

- **Astronomy Picture of the Day** — Daily NASA space imagery with full descriptions
- **Mars Rover Photos** — Browse photos from Curiosity, Perseverance, and Opportunity
- **Moon Gallery** — Apollo missions, lunar surface, and Earth/Moon orbital shots
- **Asteroid Tracker** — Live near-Earth object data updated daily

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, server components, API routes
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [NASA Open APIs](https://api.nasa.gov/) — APOD, Image Library

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_NASA_API_KEY=your_api_key_here
NEXT_PUBLIC_NASA_BASE_URL=https://api.nasa.gov
```

Get a free API key at [api.nasa.gov](https://api.nasa.gov).
