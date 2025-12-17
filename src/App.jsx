import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Komponen Public Utama
import Hero from './components/Hero.jsx';
import AboutUs from './components/AboutUs.jsx';
import Layanan from './components/Layanan.jsx';
import LogoKlien from './components/LogoKlien.jsx';
import Produk from './components/Produk.jsx';
import Kontak from './components/Kontak.jsx';
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProductsPage from './pages/ProductPage.jsx';
import Login from './pages/AdminLogin.jsx';     
import AdminDashboard from './components/Admin/AdminDashboard.jsx'; 

import './styles/App.scss';

// Layout untuk Landing Page (Halaman Depan)
const PublicLayout = () => (
    <>
        <Navbar />
        <Hero />
        <AboutUs />
        <Layanan />
        <LogoKlien />
        <Produk />
        <Kontak />
        <Footer />
    </>
);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Cek status login saat aplikasi dimuat
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Halaman Beranda */}
                <Route path="/" element={<PublicLayout />} />

                {/* Halaman Katalog - Sekarang menggunakan ProductsPage baru */}
                <Route path="/products" element={<ProductsPage />} />

                {/* Halaman Login Admin */}
                <Route 
                    path="/admin" 
                    element={
                        isAuthenticated ? (
                            <Navigate to="/admindashboard" />
                        ) : (
                            <Login setIsAuthenticated={setIsAuthenticated} />
                        )
                    } 
                />

                {/* Panel Dashboard Admin (Terlindungi) */}
                <Route 
                    path="/admindashboard" 
                    element={
                        isAuthenticated ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/admin" />
                        )
                    } 
                />

                {/* Redirect jika rute tidak dikenal */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;