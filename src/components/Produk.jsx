import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
// Pastikan Anda mengimpor file CSS di file root (misalnya App.js) atau di sini 
// jika Anda menggunakan bundler yang mendukungnya.

// import bakso from "../assets/bakso.jpg";
// import mie from "../assets/mie.jpg";
// import sosis from "../assets/sosis.jpg";
// import pangsit from "../assets/pangsit.jpg";

/* =======================
    DATA PRODUK
======================= */
const featuredProducts = [
  {
    name: "Bakso Daging Sapi Premium",
    // image: bakso,
    desc: "Produk terlaris untuk restoran dan foodcourt dengan rasa konsisten dan tekstur kenyal.",
    badge: "Best Seller"
  },
  {
    name: "Sosis Sapi Premium",
    // image: sosis,
    desc: "Pilihan utama untuk menu western dan Asian food, praktis dan efisien.",
    badge: "Best Seller"
  },
  {
    name: "Mie Basah Premium",
    // image: mie,
    desc: "Mie segar dengan elastisitas tinggi, cocok untuk dapur profesional."
  },
  {
    name: "Kulit Pangsit",
    // image: pangsit,
    desc: "Kulit pangsit tipis dan lentur untuk berbagai kebutuhan menu."
  }
];

const Produk = () => {
  return (
    <section id="produk" className="py-5 bg-white">
      <Container>
        {/* ... Header ... */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Produk Unggulan</h2>
          <p className="text-muted fs-5">
            Produk berkualitas tinggi untuk menunjang operasional dapur profesional
          </p>
        </div>

        {/* TATA LETAK 2X2 */}
        <Row className="g-4 justify-content-center">
          {featuredProducts.map((product, idx) => (
            <Col xs={12} md={6} key={idx}>
              {/* === TAMBAHKAN KELAS product-card DI SINI === */}
              <Card className="h-100 shadow-sm border-0 product-card"> 
                {/* Placeholder Image */}
                <div
                  className="bg-light d-flex align-items-center justify-content-center"
                  style={{ height: "220px", objectFit: "cover" }}
                >
                  {product.badge && (
                    <Badge pill bg="warning" className="position-absolute top-0 start-0 m-2">
                      {product.badge}
                    </Badge>
                  )}
                  <span className="text-muted">Placeholder Gambar</span>
                </div>
                
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {product.name}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    {product.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div className="text-center mt-5">
          <Button variant="primary" size="lg">
            Lihat Katalog Produk
          </Button>
        </div>

      </Container>
    </section>
  );
};

export default Produk;