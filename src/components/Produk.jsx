 import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";

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
        {/* =======================
            PRODUK UNGGULAN
        ======================= */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Produk Unggulan</h2>
          <p className="text-muted fs-5">
            Produk berkualitas tinggi untuk menunjang operasional dapur profesional
          </p>
        </div>

        <Row className="g-4">
          {featuredProducts.map((product, idx) => (
            <Col md={6} lg={4} key={idx}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img
                  variant="top"
                //   src={product.image}
                  style={{ height: "220px", objectFit: "cover" }}
                />
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
