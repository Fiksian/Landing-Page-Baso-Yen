import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';


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
          <div className="text-center mb-5">
            <h2 className="fw-bold">Katalog Produk Baso Yen</h2>
            <p className="text-muted">Kualitas Premium untuk Dapur Profesional</p>
            <Form.Control 
                className="mx-auto w-50" 
                placeholder="Cari produk..." 
                onChange={e => setSearch(e.target.value)} 
            />
          </div>

          <Row className="g-4">
            {filtered.map(p => (
              <Col key={p.id} xs={12} sm={6} lg={3}>
                <Card className="h-100 border-0 shadow-sm overflow-hidden">
                  <div style={{ position: 'relative' }}>
                    <Card.Img variant="top" src={p.image_url} style={{ height: '200px', objectFit: 'cover' }} />
                    {p.discount > 0 && (
                        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">-{p.discount}%</Badge>
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title className="fs-6 fw-bold">{p.name}</Card.Title>
                    <Card.Text className="small text-muted">{p.description}</Card.Text>
                    <div className="mt-2">
                        <span className="fw-bold text-orange fs-5">Rp {parseInt(p.price).toLocaleString('id-ID')}</span>
                        {p.discount > 0 && (
                            <div className="text-muted small text-decoration-line-through">Rp {parseInt(p.original_price).toLocaleString('id-ID')}</div>
                        )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ProductsPage;