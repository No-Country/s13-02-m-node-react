"use client"
import { CardHome } from '@/components/CardHome'
import Languages from '@/components/buttons/Languages'
import CardDefLenguajeHome from '@/components/cardDefLenguajeHome/CardDefLenguajeHome'
import Footer from '@/components/footer/Footer'
import HeartCounter from '@/components/lives-counter/HeartCounter'
import NavBar from '@/components/navBar/NavBar'
import ProgressBar from '@/components/progressBar/ProgressBar'
import Roadmap from '@/components/roadMap/RoadMap'
import { Container } from '@mui/material'
import { useMediaQuery } from "@mui/material";



export default function Home() {
  const isXsOrMd = useMediaQuery("(max-width:768px)");
  return (
    <>
      <Container
        maxWidth='xl'
        sx={{
          minHeight: '100vh'
        }}
        className='flex flex-col justify-between'
      >

        {/* <NavBar /> */}
        <main className='flex'>
          <aside className={`hidden md:block`}>
            <CardHome />
            <CardHome secondary={true} />
          </aside>
          <Container className='grid grid-cols-4'>

          <section className={`w-full flex flex-col items-center justify-around mt-[100px]  ${isXsOrMd
             ? 'col-span-4' : 'col-span-3'} `}>
           <ProgressBar/>
            <Languages/>
            <CardDefLenguajeHome />
            <Roadmap />
          </section>
          <section className={`hidden md:block`}>
            <HeartCounter lives={2}/>
          </section>
          </Container>
        </main>
        {/* <Footer /> */}
      </Container>
    </>
  )
}
