import React from 'react';
import './styles/App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Komponen Landing Page
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Layanan from './components/Layanan';
import LogoKlien from './components/LogoKlien';
import Produk from './components/Produk';
import Kontak from './components/Kontak';

// Import Komponen Admin
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
        
        {/* 1. Rute Halaman Utama (Landing Page) */}
        {/* Ketika pengguna membuka '/' (alamat utama), PublicLayout akan dimuat */}
        <Route path="/" element={<PublicLayout />} />

        {/* 2. Rute Halaman Admin (Standalone) */}
        {/* Ketika pengguna membuka '/admin', hanya AdminTable yang dimuat. */}
        <Route path="/admin" element={<AdminTable />} />
        
        {/* Catatan: Tambahkan rute untuk 404 Not Found jika diperlukan */}
      </Routes>
    </Router>
  );
}

export default App;