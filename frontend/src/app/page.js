import { CardHome } from '@/components/CardHome'
import Languages from '@/components/buttons/Languages'
import CardDefLenguajeHome from '@/components/cardDefLenguajeHome/CardDefLenguajeHome'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import Roadmap from '@/components/roadMap/RoadMap'
import { Container } from '@mui/material'
export default function Home() {
  return (
    <>
      <Container
        maxWidth='xl'
        sx={{
          minHeight: '100vh'
        }}
        className='flex flex-col justify-between'
      >
        <NavBar />
        <main className='flex'>
          <aside>
            <CardHome />
            <CardHome secondary={true} />
          </aside>
          <section className='w-full flex flex-col items-center justify-around'>
            {/* <Languages /> */}
            <CardDefLenguajeHome />
            <Roadmap />
          </section>
        </main>
        <Footer />
      </Container>
    </>
  )
}
