import { Container, Row, Col, Card, Badge, Button} from "react-bootstrap";
import { Link } from 'react-router-dom';    
import produk from '../assets/produk' 

/* =======================
    DATA PRODUK
======================= */
const featuredProducts = [
  {
    name: "Bakso Daging Sapi Premium",
    image: produk.logoyenBakso.basoStandar, 
    desc: "Produk terlaris untuk restoran dan foodcourt dengan rasa konsisten dan tekstur kenyal.",
    badge: "Best Seller"
  },
  {
    name: "Sosis Sapi Premium",
    image: produk.logoyenSosis.beefBreakfast,
    desc: "Pilihan utama untuk menu western dan Asian food, praktis dan efisien.",
    badge: "Best Seller"
  },
  {
    name: "Mie Basah Premium",
    image: produk.logoyenMie.miePremium,
    desc: "Mie segar dengan elastisitas tinggi, cocok untuk dapur profesional."
  },
  {
    name: "Kulit Pangsit",
    image: produk.logoyenKulitpangsit.kpDimsumKuning,
    desc: "Kulit pangsit tipis dan lentur untuk berbagai kebutuhan menu."
  }
];

const Produk = () => {
  return (
    <section id="produk" className="py-5 bg-white">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Produk Unggulan</h2>
          <p className="text-muted fs-5">
            Produk berkualitas tinggi untuk menunjang operasional dapur profesional
          </p>
        </div>
        <Row className="g-4 justify-content-center">
          {featuredProducts.map((product, idx) => (
            <Col xs={12} md={6} key={idx}>
              <Card className="h-100 shadow-sm border-0 product-card"> 
                <div style={{ position: 'relative' }}>
                    <Card.Img
                        variant="top"
                        src={product.image}
                        alt={product.name}
                        style={{ height: "250px", objectFit: "cover" }}
                    />
                    
                    {product.badge && (
                        <Badge pill bg="warning" className="position-absolute top-0 start-0 m-2">
                            {product.badge}
                        </Badge>
                    )}
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
        <div className="d-grid gap-2 col-6 mx-auto">
            <Link to="/products">
                <Button className="allproduk-button mt-4 w-100" size="lg">
                    Tampilkan Semua Produk
                </Button>
            </Link>
        </div>

      </Container>
    </section>
  );
};

export default Produk;