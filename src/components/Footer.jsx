import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import shopee from '../assets/Photo/Shopee.png'
import tokopedia from '../assets/Photo/tokopedia.png'

function AppFooter() {
  return (
    <Navbar fixed='bottom' bg='dark' variant='dark' className='mt-auto py-5 '>
      <Container style={{ maxWidth: '1920px' }} className='ms-5 me-5'>

        {/* 4 Kolom Utama */}
        <Row className='text-light'>

          <Col sm={3} className='mb-4'>
            <h5 className='fw-bold'>LAYANAN KAMI</h5>
            <p>
              Pabrik Mie, Baso, dan Sosis Yen memiliki dua toko offline dan online,
              melayani kebutuhan sehari-hari maupun keperluan usaha.
            </p>
          </Col>

          <Col sm={3} className='mb-4'>
            <h5 className='fw-bold'>MEDIA SOSIAL</h5>

            <div className='d-flex gap-3 mb-3'>
              <Button href='http://www.facebook.com' variant='outline-success'><FaFacebook size={24} color='#4CAF50' /></Button>
              <Button href='http://www.instagram.com' variant='outline-success'> <FaInstagram size={24} color='#4CAF50' /> </Button>
              <Button href='http://www.tiktok.com' variant='outline-success'> <FaTiktok size={24} color='#4CAF50' /> </Button>
              <Button href='http://www.youtube.com' variant='outline-success'> <FaYoutube size={24} color='#4CAF50' /> </Button>
            </div>

            <h6 className='fw-bold'>ONLINE STORE</h6>

            <div className='d-flex flex-column gap-2'>
              <Button variant='light' className='d-flex align-items-center gap-2'>
                <img src={shopee} width='25' alt='Shopee' />
                Shopee
              </Button>

              <Button variant='light' className='d-flex align-items-center gap-2'>
                <img src={tokopedia} width='25' alt='Tokopedia' />
                Tokopedia
              </Button>
            </div>
          </Col>

          <Col sm={3} className='mb-4'>
            <h5 className='fw-bold'>YEN FACTORY</h5>
            <p><FaMapMarkerAlt className='me-2' /> Komp. Puri BKR Kav 61 Regol, Bandung</p>
            <p><FaClock className='me-2' /> Jam Buka 07.00 – 17.00</p>

            <Button variant='light' size='sm' className='mb-3'>
              Yen Factory BKR
            </Button>

            <h5 className='fw-bold mt-4'>MEATBALL FACTORY YEN</h5>

            <p><FaMapMarkerAlt className='me-2' /> Jl. Pasirkaliki 106 Cicendo, Bandung</p>
            <p><FaClock className='me-2' /> Jam Buka 08.00 – 20.00</p>

            <Button variant='light' size='sm'>
              Meatball Factory Paskal
            </Button>
          </Col>

          <Col sm={3} className='mb-4'>
            <h5 className='fw-bold'>KONTAK KAMI</h5>
            <p>Yen Factory BKR: 08972078800</p>
            <p>Meatball Factory Paskal: 085100805080</p>
            <p>www.basoyen.com</p>
            <p>Baso Yen Shopee</p>
            <p>Baso Yen Tokopedia</p>
          </Col>
          
        {/* COPYRIGHT - PASTI DI BAWAH */}
        <div className='text-center text-secondary pt-3 border-top border-secondary'>
          © 2025 basoyen.com. All rights reserved.
        </div>
        </Row>
      </Container>
    </Navbar>
  );
}

export default AppFooter;
