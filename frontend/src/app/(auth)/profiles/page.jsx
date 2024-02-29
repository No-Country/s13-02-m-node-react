import Profile from "@/components/profile/Profile"
import { CardHome } from "@/components/cardHome/CardHome"
import Languages from "@/components/buttons/Languages"
import CardDefLenguajeHome from "@/components/cardDefLenguajeHome/CardDefLenguajeHome"
import HeartCounter from "@/components/lives-counter/HeartCounter"
import ProgressBar from "@/components/progressBar/ProgressBar"
import Roadmap from "@/components/roadMap/RoadMap"
import Footer from "@/components/footer/Footer"
import NavBar from "@/components/navBar/NavBar"



const pageProfile = () => {
    return  <>
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
             
            </div>
          <Profile />
           
          </section>
        </main>
      </div>
      <Footer />
    </div>
  </>
  }
  
  export default pageProfile
  