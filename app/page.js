import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import APODSection from '@/components/APODSection'
import MarsSection from '@/components/MarsSection'
import AsteroidSection from '@/components/AsteroidSection'
import StatsSection from '@/components/StatsSection'
import Footer from '@/components/Footer'
import Stars from '@/components/Stars'
import { getTodayAPOD, getAPOD, getMarsPhotos, getNearEarthObjects } from '@/lib/nasa'

export default async function Home() {
  const [todayAPOD, apodGallery, marsPhotos, asteroids] = await Promise.all([
    getTodayAPOD().catch(() => null),
    getAPOD(6).catch(() => []),
    getMarsPhotos('curiosity', 1000).catch(() => []),
    getNearEarthObjects().catch(() => []),
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
        <AsteroidSection asteroids={asteroids} />
        <Footer />
      </div>
    </main>
  )
}
