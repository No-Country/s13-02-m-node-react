"use client"
import { CardHome } from '@/components/CardHome'
import Languages from '@/components/buttons/Languages'
import CardDefLenguajeHome from '@/components/cardDefLenguajeHome/CardDefLenguajeHome'
import ProgressBar from '@/components/progressBar/ProgressBar'
import Roadmap from '@/components/roadMap/RoadMap'
import { Container } from '@mui/material'
import { useMediaQuery } from "@mui/material";


export default function Home() {

  const isSm = useMediaQuery("(max-width:700px)");

  return (
    <>
     {isSm? 
     <Container align="center" justifyContent="center" >
     <ProgressBar/>
     <Languages/>
     <CardDefLenguajeHome/>
     <Roadmap/>
   </Container>
   :
      <Container
        maxWidth='xl'
        className='grid grid-cols-8 '
      >
        <Container className=' col-span-3'>

        <CardHome />
        <CardHome secondary={true} />
        </Container>
        <Container className=' col-span-4' align="center" justifyContent="center" >
          <ProgressBar/>
          <Languages/>
          <CardDefLenguajeHome/>
          <Roadmap/>
        </Container>
        <Container>

        </Container>
      </Container>
      
      
}
    </>
  )
}
