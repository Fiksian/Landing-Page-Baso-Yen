import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaClock, FaPhoneAlt, FaShoppingCart, FaExternalLinkAlt } from 'react-icons/fa';
import logo from "../assets/Photo/Logo Yen/LOGO YEN.png"; 
import shopeeLogo from '../assets/Photo/Shopee.png';
import tokopediaLogo from '../assets/Photo/tokopedia.png';

function AppFooter() {
  
  return (
    <footer className="py-5 footer-yen">
      <Container>

        {/* ROW UTAMA */}
        <Row className="gy-5">

          {/* Kolom 1: BASO YEN (DESKRIPSI & PENGIRIMAN) */}
          <Col xs={12} md={4} lg={3}>
            <div className="d-flex align-items-center mb-3"> 
                <img 
                    src={logo} 
                    alt="Baso Yen Logo"
                    // Ukuran logo sedikit lebih besar di footer
                    style={{ height: "60px", objectFit: "cover", marginRight: "10px" }} 
                />
                <div className="d-flex flex-column lh-1 footer-title">
                    <span className="fw-bold" style={{ fontSize: '1.4rem' }}>Baso Yen</span>
                </div>
            </div>
            <p style={{ fontSize: '0.9rem' }} className="mt-3">
              Sajikan cita rasa restoran bintang lima di rumah Anda. Nikmati kemewahan Bakso, Mie, Pangsit, dan Dimsum premium kami dengan bahan baku pilihan dan resep otentik.
            </p>
          </Col>

          {/* Kolom 2: KONTAK KAMI & IKUTI KAMI */}
          <Col xs={12} md={4} lg={3}>
            <h5 className="fw-bold mb-3">Kontak Kami</h5>
            <p className="mb-1"><FaPhoneAlt className="me-2" /> 0812-3456-7890</p>
            <p className="mb-1"><FaPhoneAlt className="me-2" /> 0812-3456-7890</p>
            <h5 className="fw-bold mb-3">Ikuti Kami</h5>
            <div className="d-flex gap-2 mb-4">
              {[FaFacebook, FaInstagram, FaTiktok, FaYoutube].map((Icon, idx) => (
                <div key={idx} className="social-icon-wrapper">
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </Col>

          {/* Kolom 3: LOKASI TOKO */}
          <Col xs={12} md={4} lg={3}>
            <h5 className="fw-bold mb-3">Lokasi Toko</h5>

            {/* Meatball Factory Yen */}
            <div className="store-card">
              <h6 className="fw-bold"><FaMapMarkerAlt className="me-2" /> MEATBALL FACTORY YEN</h6>
              <p className="mb-1" style={{ fontSize: '0.9rem' }}>Jl. Pasirkaliki 106 Cicendo, Bandung</p>
              <p className="mb-0" style={{ fontSize: '0.9rem' }}><FaClock className="me-2" /> Senin - Minggu: 08:00 – 19:00</p>
            </div>

            {/* Yen Factory */}
            <div className="store-card">
              <h6 className="fw-bold"><FaMapMarkerAlt className="me-2" /> Yen Factory</h6>
              <p className="mb-1" style={{ fontSize: '0.9rem' }}>Komp. Puri BKR Kav 61 Regol, Bandung</p>
              <p className="mb-0" style={{ fontSize: '0.9rem' }}><FaClock className="me-2" /> Senin - Minggu: 08:00 – 19:00</p>
            </div>
          </Col>

          {/* Kolom 4: BELANJA ONLINE */}
          <Col xs={12} md={6} lg={3}>
            <h5 className="fw-bold mb-3"><FaShoppingCart className="me-2" /> Belanja Online</h5>
            <p style={{ fontSize: '0.9rem' }}>
              Nikmati kemudahan berbelanja produk Baso Yen favorit Anda melalui marketplace terpercaya.
            </p>

            {/* Shopee */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2 marketplace-card">
                <img src={shopeeLogo} width="25" alt="Shopee" />
                <div className="flex-grow-1">Shopee Official Store</div>
                <FaExternalLinkAlt size={14} className="text-secondary" />
              </div>
            </a>
            
            {/* Tokopedia */}
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
              <div className="d-flex align-items-center gap-2 marketplace-card">
                <img src={tokopediaLogo} width="25" alt="Tokopedia" />
                <div className="flex-grow-1">Tokopedia Official Store</div>
                <FaExternalLinkAlt size={14} className="text-secondary" />
              </div>
            </a>
          </Col>

        </Row>

        {/* COPYRIGHT & PRIVACY POLICY */}
        <div className="text-center pt-3 mt-4 footer-divider" style={{ fontSize: '0.8rem' }}>
          © 2025 Baso Yen. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}

export default AppFooter;