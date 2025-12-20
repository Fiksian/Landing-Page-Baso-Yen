import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/public/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="bg-light py-5 mt-5">
        <Container>
          {/* Tombol Kembali ke Beranda */}
          <div className="mb-4">
            <Button 
              as={Link} 
              to="/" 
              variant="outline-secondary" 
              className="border-0 shadow-sm bg-white"
            >
              ← Kembali ke Beranda
            </Button>
          </div>

          <div className="text-center mb-5">
            <h2 className="fw-bold">Katalog Produk Baso Yen</h2>
            <p className="text-muted">Kualitas Premium untuk Dapur Profesional</p>
            <Form.Control 
                className="mx-auto w-50 shadow-sm" 
                placeholder="Cari produk favorit Anda..." 
                onChange={e => setSearch(e.target.value)} 
            />
          </div>

          <Row className="g-4">
            {filtered.length > 0 ? (
              filtered.map(p => (
                <Col key={p.id} xs={12} sm={6} lg={3}>
                  <Card className="h-100 border-0 shadow-sm overflow-hidden card-product">
                    <div style={{ position: 'relative' }}>
                      <Card.Img variant="top" src={p.image_url} style={{ height: '200px', objectFit: 'cover' }} />
                      {p.discount > 0 && (
                          <Badge bg="danger" className="position-absolute top-0 end-0 m-2">-{p.discount}%</Badge>
                      )}
                    </div>
                    <Card.Body>
                      <Card.Title className="fs-6 fw-bold">{p.name}</Card.Title>
                      <Card.Text className="small text-muted text-truncate-2" style={{height: '40px'}}>
                        {p.description}
                      </Card.Text>
                      <div className="mt-2">
                          <span className="fw-bold text-orange fs-5" style={{color: '#ff6b00'}}>
                            Rp {parseInt(p.price).toLocaleString('id-ID')}
                          </span>
                          {p.discount > 0 && (
                              <div className="text-muted small text-decoration-line-through">
                                Rp {parseInt(p.original_price).toLocaleString('id-ID')}
                              </div>
                          )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center py-5">
                <p className="text-muted">Produk "{search}" tidak ditemukan.</p>
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;