import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import shopee from '../assets/Photo/Shopee.png';
import tokopedia from '../assets/Photo/tokopedia.png';

function AppFooter() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto">
      <Container>

        {/* ROW UTAMA */}
        <Row className="gy-5">

          {/* Kolom 1 */}
          <Col xs={12} md={3}>
            <h5 className="fw-bold mb-3">LAYANAN KAMI</h5>
            <p className="text-secondary">
              Pabrik Mie, Baso, dan Sosis Yen memiliki dua toko offline dan online,
              melayani kebutuhan sehari-hari maupun keperluan usaha.
            </p>
          </Col>

          {/* Kolom 2 */}
          <Col xs={12} md={3}>
            <h5 className="fw-bold mb-3">MEDIA SOSIAL</h5>

            <div className="d-flex gap-2 mb-4">
              {[FaFacebook, FaInstagram, FaTiktok, FaYoutube].map((Icon, idx) => (
                <Button
                  key={idx}
                  variant="outline-success"
                  className="d-flex align-items-center justify-content-center p-2"
                  style={{ width: "42px", height: "42px", borderRadius: "50%" }}
                >
                  <Icon size={20} color="#4CAF50" />
                </Button>
              ))}
            </div>

            <h6 className="fw-bold mb-2">ONLINE STORE</h6>

            <div className="d-flex flex-column gap-2">
              <Button variant="light" className="d-flex align-items-center gap-2">
                <img src={shopee} width="25" alt="Shopee" /> Shopee
              </Button>

              <Button variant="light" className="d-flex align-items-center gap-2">
                <img src={tokopedia} width="25" alt="Tokopedia" /> Tokopedia
              </Button>
            </div>
          </Col>

          {/* Kolom 3 */}
          <Col xs={12} md={3}>
            <h5 className="fw-bold mb-3">YEN FACTORY</h5>

            <p><FaMapMarkerAlt className="me-2" /> Komp. Puri BKR Kav 61 Regol, Bandung</p>
            <p><FaClock className="me-2" /> Jam Buka 07.00 – 17.00</p>

            <Button variant="light" size="sm" className="mb-4">Yen Factory BKR</Button>

            <h5 className="fw-bold mb-3">MEATBALL FACTORY YEN</h5>
            <p><FaMapMarkerAlt className="me-2" /> Jl. Pasirkaliki 106 Cicendo, Bandung</p>
            <p><FaClock className="me-2" /> Jam Buka 08.00 – 20.00</p>

            <Button variant="light" size="sm">Meatball Factory Paskal</Button>
          </Col>

          {/* Kolom 4 */}
          <Col xs={12} md={3}>
            <h5 className="fw-bold mb-3">KONTAK KAMI</h5>

            <p className="mb-1">Yen Factory BKR: 08972078800</p>
            <p className="mb-1">Meatball Factory Paskal: 085100805080</p>
            <p className="mb-1">www.basoyen.com</p>
            <p className="mb-1">Baso Yen Shopee</p>
            <p>Baso Yen Tokopedia</p>
          </Col>

        </Row>

        {/* COPYRIGHT */}
        <div className="text-center text-secondary pt-3 mt-4 border-top border-secondary">
          © 2025 basoyen.com. All rights reserved.
        </div>

      </Container>
    </footer>
  );
}

export default AppFooter;
