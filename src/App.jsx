import {} from 'react'
import './styles/App.scss'
import Hero from './components/Hero'
import AboutUs from './components/AboutUs'
import Layanan from './components/Layanan'
import LogoKlien from './components/LogoKlien'
import Produk from './components/Produk'
import Kontak from './components/Kontak'

function App() {


  return (
   <>
   <Hero />
   <AboutUs />
   <Layanan />
   <LogoKlien />
   <Produk/>
   <Kontak/>
   </>
  )
}

export default App
