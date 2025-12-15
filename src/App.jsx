import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Layanan from './components/Layanan';
import LogoKlien from './components/LogoKlien';
import Produk from './components/Produk';
import Kontak from './components/Kontak';
import AllProducts from './components/AllProduk'
import AdminTable from './components/AdminTable'; 

const PublicLayout = () => (
    <>
        <Hero />
        <AboutUs />
        <Layanan />
        <LogoKlien />
        <Produk />
        <Kontak />
    </>
);
// ----------------------------------------------


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />} />
        <Route path="/admin" element={<AdminTable />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    </Router>
  );
}

export default App;