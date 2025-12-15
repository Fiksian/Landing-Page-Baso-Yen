import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// 1. Import ASSET GAMBAR (ini adalah file yang Anda beri nama produk.js)
import assets from '../assets/produk'; 

// 2. Import DATA PRODUK (daftar produk yang sudah dipetakan)
import productList from '../assets/produklist'; 

const AllProduk = () => {
 // Menggunakan productList yang diimpor
 const productData = productList; 

 // --- KONFIGURASI PAGINASI ---
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage = 12;

  // Hitung indeks produk
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  // Ambil slice data yang akan ditampilkan di halaman saat ini
  const currentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);

  // Hitung total halaman
  const totalPages = Math.ceil(productData.length / productsPerPage);

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Buat item paginasi
  const renderPaginationItems = () => {
    let items = [];
    // Logika untuk menampilkan tombol pagination
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  };

  return (
    <section className="py-5">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Semua Produk Baso Yen</h2>
          <p className="text-muted fs-5">Lihat koleksi lengkap Sajian Praktis Istimewa kami.</p>
        </div>

        {/* Tombol kembali ke home */}
        <Link to="/" className="text-decoration-none d-block mb-4">
            &larr; Kembali ke Halaman Utama
        </Link>

        {/* Tampilan Grid Produk */}
        <Row className="g-4 mb-5">
          {currentProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card className="h-100 shadow-sm border-0">
                
                {/* LOGIKA PENGAMBILAN GAMBAR DARI ASSETS BARU */}
                {/* Akses gambar melalui objek assets (produk.js) menggunakan kunci dinamis */}
                <Card.Img 
                    variant="top" 
                    src={assets[product.image_group][product.image_key]}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-truncate">{product.name}</Card.Title>
                  <Card.Text className="text-muted small flex-grow-1">
                    {product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Kontrol Paginasi */}
        <div className="d-flex justify-content-center">
            <Pagination>
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {renderPaginationItems()}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
        </div>
      </Container>
    </section>
  );
};

export default AllProduk;