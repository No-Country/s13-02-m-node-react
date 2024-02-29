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

//Agregado por vicky
// import { Provider } from 'react-redux'
// import {store} from '../redux/store'

export default function Home() {
  const isXsOrMd = useMediaQuery("(max-width:768px)");

  // Simulacion de la carga de datos en 3 segundos
  const [dataLoaded, setDataLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setDataLoaded(true);
    }, 3000);
  }, []);


  const [stacks, setStacks] = useState([])
  const [selectedLanguageId, setSelectedLanguageId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stacks`)
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
    //Provider agregado por vicky
    //<Provider store={store}>
      <>
        <div className="w-full relative">
          <div className="sticky top-0 z-50">
            <NavBar />
          </div>
          <div className="p-2 lg:p-5">
            <main className="grid gap-2 grid-cols-1 lg:grid-cols-4 relative">
              <aside className="w-60 lg:w-full lg:max-w-60 xl:max-w-80 hidden lg:block lg:col-span-1 space-y-5">
                <div className="w-full sticky top-24">
                  <CardHome />
                  <CardHome secondary={true} />
                </div>
              </aside>
              <section className="w-full lg:col-span-3 flex gap-5 flex-col items-center justify-center">
                <div className="w-full sticky top-20 z-40 bg-rich-black-500">
                  <div className="w-full flex items-center justify-center relative">
                    <ProgressBar
                      value={50}
                      data={"50%"}
                      title={"Tu progreso de hoy"}
                    />
                    <div className="absolute right-0 hidden lg:block">
                      <HeartCounter lives={2} dataLoaded={dataLoaded} />
                    </div>
                  </div>
                </div>
                <Languages data={stacks} onLanguageSelect={handleLanguageSelect} />
                <CardDefLenguajeHome />
           
                <Roadmap selectedLanguageId={selectedLanguageId ? selectedLanguageId : "616c8a2c-1c9b-4b4d-a0ab-6bd7f962bf0d"} />
              </section>
            </main>
          </div>
          <Footer />
        </div>
      </>
    //</Provider>
  );
}
