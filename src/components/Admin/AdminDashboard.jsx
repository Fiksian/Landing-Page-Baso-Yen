import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Nav, Navbar, Button } from 'react-bootstrap';
import ProductList from './ProductList';
import AdminTable from '../AdminTable';
import ProductForm from './ProductForm';

function AdminDashboard() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('list');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Admin');
  };

  // Fungsi untuk merender konten utama berdasarkan menu yang dipilih
  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return (
          <ProductList 
            onEdit={(p) => { setSelectedProduct(p); setCurrentView('form'); }} 
            onAdd={() => { setSelectedProduct(null); setCurrentView('form'); }} 
          />
        );
      case 'form':
        return (
          <ProductForm 
            product={selectedProduct} 
            onCancel={() => setCurrentView('list')} 
            onSave={() => setCurrentView('list')}
          />
        );
      case 'b2b':
        return <AdminTable />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 shadow border-bottom border-secondary">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">Baso Yen Admin</Navbar.Brand>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container>
        <Row>
          {/* Sidebar Menu */}
          <Col md={3} className="mb-4">
            <div className="bg-white p-3 rounded shadow-sm border">
              <h6 className="text-muted mb-3 px-2">Main Menu</h6>
              <Nav variant="pills" className="flex-column">
                <Nav.Link 
                  active={currentView === 'list'} 
                  onClick={() => setCurrentView('list')}
                  className="mb-1"
                  style={{cursor: 'pointer'}}
                >
                  📦 Daftar Produk
                </Nav.Link>

                <Nav.Link 
                  active={currentView === 'form'} 
                  onClick={() => { setSelectedProduct(null); setCurrentView('form'); }}
                  className="mb-1"
                  style={{cursor: 'pointer'}}
                >
                  ➕ Tambah Produk
                </Nav.Link>

                <hr />
                <h6 className="text-muted mb-3 px-2">B2B & Leads</h6>

                <Nav.Link 
                  active={currentView === 'b2b'} 
                  onClick={() => setCurrentView('b2b')}
                  className="mb-1"
                  style={{cursor: 'pointer'}}
                >
                  🤝 Tabel Pesanan
                </Nav.Link>
              </Nav>
            </div>
          </Col>

          {/* Konten Utama */}
          <Col md={9}>
            <div className="bg-white p-4 rounded shadow-sm border" style={{ minHeight: '400px' }}>
              {renderContent()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;