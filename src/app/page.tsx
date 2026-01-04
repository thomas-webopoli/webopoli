import Hero from '@/components/Hero'
import Philosophie from '@/components/Philosophie'
import EcoPerformance from '@/components/EcoPerformance'
import Services from '@/components/Services'
import Realisations from '@/components/Realisations'
import Processus from '@/components/Processus'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Philosophie />
      <EcoPerformance />
      <Services />
      <Processus />
      <Realisations />
      <Contact />
    </>
  )
}
