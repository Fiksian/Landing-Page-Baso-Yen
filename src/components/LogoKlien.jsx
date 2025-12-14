import { Container, Row, Col } from "react-bootstrap";
// Import file aset yang berisi semua path gambar
import produk from '../assets/produk'; 

// Data klien: Sekarang menggunakan path logo dari objek 'produk' yang diimpor
const clients = [
  { name: "Mie Gacoan", logo: produk.logoklien.logomiegacoan },
  { name: "Crowne Plaza", logo: produk.logoklien.crownePlazaHotelsResortsLogo },
  { name: "Grand Mercure", logo: produk.logoklien.grandMercureHotelsAndResortsVectorLogo },
  { name: "Ismaya Group", logo: produk.logoklien.ismaya },
  { name: "Padma", logo: produk.logoklien.padma }, 
  { name: "Sheraton", logo: produk.logoklien.sheratonhotels }, 
  { name: "The Papandayan", logo: produk.logoklien.thepapandayan },
  { name: "Bakso Boejangan", logo: produk.logoklien.baksoboejangan },
  { name: "Suki", logo: produk.logoklien.suki },
  { name: "Gaia Hotel", logo: produk.logoklien.gaiahotel },
  { name: "Jabrano", logo: produk.logoklien.jabrano },
  { name: "Altima Group", logo: produk.logoklien.altimagroup },
  { name: "Destiny Catering", logo: produk.logoklien.destinycatering },
  { name: "Trans", logo: produk.logoklien.TransMedia },
  { name: "Melinda Hospital", logo: produk.logoklien.melindahospita },
];

const Logo = () => {
  return (
    <section id="clients" className="py-5 bg-white">
      <Container>

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Dipercaya oleh Mitra Bisnis</h2>
          <p className="text-muted fs-5">
            Telah menjadi pemasok terpercaya bagi berbagai restoran, hotel, dan kafe
          </p>
        </div>

        {/* Logos */}
        <Row className="align-items-center justify-content-center g-4">
          {clients.map((client, idx) => (
            // Wrapper untuk efek hover (client-logo-wrapper dan py-2)
            <Col
              key={idx}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="text-center client-logo-wrapper py-2" 
            >
              <img
                // Menggunakan path logo yang diimpor dari file aset
                src={client.logo} 
                alt={client.name}
                className="img-fluid client-logo" // Kelas untuk styling dan animasi CSS
                style={{
                  maxWidth: "100%", 
                }}
              />
            </Col>
          ))}
        </Row>

      </Container>
    </section>
  );
};

export default Logo;