import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import APODSection from '@/components/APODSection'
import MoonSection from '@/components/MoonSection'
import MarsSection from '@/components/MarsSection'
import AsteroidSection from '@/components/AsteroidSection'
import StatsSection from '@/components/StatsSection'
import Footer from '@/components/Footer'
import Stars from '@/components/Stars'
import { getTodayAPOD, getAPOD, getMarsPhotos, getMoonPhotos, getNearEarthObjects } from '@/lib/nasa'

export default async function Home() {
  const [todayAPOD, apodGallery, marsPhotos, moonPhotos, asteroids] = await Promise.all([
    getTodayAPOD().catch((e) => { console.error('APOD today error:', e.message); return null }),
    getAPOD(12).catch((e) => { console.error('APOD gallery error:', e.message); return [] }),
    getMarsPhotos('curiosity').catch((e) => { console.error('Mars photos error:', e.message); return [] }),
    getMoonPhotos().catch((e) => { console.error('Moon photos error:', e.message); return [] }),
    getNearEarthObjects().catch((e) => { console.error('Asteroids error:', e.message); return [] }),
  ])

  return (
    <main className="bg-space-black min-h-screen relative">
      <Stars />
      <div className="relative z-10">
        <Navbar />
        <Hero apod={todayAPOD} />
        <StatsSection />
        <APODSection photos={apodGallery} />
        <MarsSection photos={marsPhotos} />
        <MoonSection photos={moonPhotos} />
        <AsteroidSection asteroids={asteroids} />
        <Footer />
      </div>
    </main>
  )
}
