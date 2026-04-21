# Starbase 🚀

Personal mission control for space exploration. Built with Next.js 14 and powered by NASA's Open APIs — real-time asteroid tracking, Mars rover feeds, Moon archives, and a daily astronomy gallery.

<div align="center">
  <img src="screenshots/Starbase Hero.png" width="600" />
  <img src="screenshots/Starbase Hero Mobile.png" width="200" />
</div>

## Features

- **Astronomy Picture of the Day** — Daily NASA imagery with full descriptions, randomized gallery
- **Mars Rover Feed** — Photos from Curiosity, Perseverance, and Opportunity via NASA Image Library
- **Moon Gallery** — Apollo missions, lunar surface, and Earth/Moon orbital shots
- **Asteroid Tracker** — Live near-Earth object data with size, velocity, and risk classification

<div align="center">
  <img src="screenshots/Starbase Picture of the day.png" width="600" />
  <img src="screenshots/Starbase Picture of the day Mobile.png" width="200" />
</div>

<div align="center">
  <img src="screenshots/Starbase Asteroid Tracker.png" width="600" />
  <img src="screenshots/Starbase Asteroid Tracker Mobile.png" width="200" />
</div>

## Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router, server components, API routes
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [NASA Open APIs](https://api.nasa.gov/) — APOD, Image Library, NeoWs

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_NASA_API_KEY=your_api_key_here
NEXT_PUBLIC_NASA_BASE_URL=https://api.nasa.gov
```

Get a free API key at [api.nasa.gov](https://api.nasa.gov).

<div align="center">
  <img src="screenshots/Starbase Footer.png" width="600" />
  <img src="screenshots/Starbase Footer Mobile.png" width="200" />
</div>
