import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Komponen
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import AboutUs from './components/AboutUs.jsx';
import Layanan from './components/Layanan.jsx';
import LogoKlien from './components/LogoKlien.jsx';
import Produk from './components/Produk.jsx';
import Kontak from './components/Kontak.jsx';
import ProductsPage from './pages/ProductPage.jsx';
import Login from './pages/AdminLogin.jsx';      
import AdminDashboard from './components/Admin/AdminDashboard.jsx'; 

import './styles/App.scss';

// --- LAYOUT WRAPPER ---
// Ini akan membungkus halaman agar selalu ada Navbar dan Footer
const MainLayout = ({ children }) => (
    <>
        <Navbar />
        {children}
        <Footer />
    </>
);

// Konten khusus untuk Halaman Beranda (Home)
const HomePage = () => (
    <>
        <Hero />
        <AboutUs />
        <Layanan />
        <LogoKlien />
        <Produk />
        <Kontak />
    </>
);

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                {/* Halaman Beranda dengan Navbar & Footer */}
                <Route path="/" element={
                    <MainLayout>
                        <HomePage />
                    </MainLayout>
                } />

                {/* Halaman Produk dengan Navbar & Footer */}
                <Route path="/products" element={
                    <MainLayout>
                        <ProductsPage />
                    </MainLayout>
                } />

                {/* Halaman Admin (Tanpa Navbar/Footer Public) */}
                <Route 
                    path="/admin" 
                    element={
                        isAuthenticated ? <Navigate to="/admindashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />
                    } 
                />

                <Route 
                    path="/admindashboard" 
                    element={
                        isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin" />
                    } 
                />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;