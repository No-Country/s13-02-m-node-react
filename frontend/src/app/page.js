'use client'
import { CardHome } from '@/components/cardHome/CardHome'
import Languages from '@/components/buttons/Languages'
import CardDefLenguajeHome from '@/components/cardDefLenguajeHome/CardDefLenguajeHome'
import HeartCounter from '@/components/lives-counter/HeartCounter'
import ProgressBar from '@/components/progressBar/ProgressBar'
import Roadmap from '@/components/roadMap/RoadMap'
import { Container } from '@mui/material'
import { useMediaQuery } from '@mui/material'
// import data from '@/utils/db/stackThemes'
import Footer from '@/components/footer/Footer'
import NavBar from '@/components/navBar/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
export default function Home() {
  const isXsOrMd = useMediaQuery('(max-width:768px)')

  const [stacks, setStacks] = useState([])
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://nekode-rqas.onrender.com/api/stacks')
        setStacks(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [])
  
  const handleLanguageSelect = (languageId) => {
    setSelectedLanguageId(languageId);
  };
  

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
          <aside className={`hidden md:block mt-[100px] '`}>
            <CardHome />
            <CardHome secondary={true} />
          </aside>
          <div className=' grid grid-cols-4'>
            <section
              className={`w-full flex flex-col items-center justify-around mt-[100px]  ${
                isXsOrMd ? 'col-span-4' : 'col-span-3'
              } `}
            >
              <ProgressBar
                value={50}
                data={'50%'}
                title={'Tu progreso de hoy'}
              />
              <Languages data={stacks} onLanguageSelect={handleLanguageSelect} />
              <CardDefLenguajeHome />
              <Roadmap selectedLanguageId={selectedLanguageId?selectedLanguageId:"616c8a2c-1c9b-4b4d-a0ab-6bd7f962bf0d"} />
            </section>
            <section className={`hidden md:block mt-[140px]`}>
              <HeartCounter lives={2} position={'fixed'} />
            </section>
          </div>
        </main>
        <Footer />
      </Container>
    </>
  )
}
