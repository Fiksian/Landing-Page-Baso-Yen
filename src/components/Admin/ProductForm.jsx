import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Image, Alert } from 'react-bootstrap';

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '', original_price: '', discount: 0, description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(''); // Untuk pesan error validasi

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        original_price: product.original_price || '',
        discount: product.discount || 0,
        description: product.description || ''
      });
      setPreview(product.image_url);
    } else {
      // Reset form jika tambah produk baru
      setFormData({ name: '', original_price: '', discount: 0, description: '' });
      setPreview(null);
      setSelectedFile(null);
    }
  }, [product]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError('');

    if (file) {
      // Validasi Ukuran (Contoh: Max 2MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('Ukuran file terlalu besar. Maksimal 10MB.');
        e.target.value = null; // Reset input file
        return;
      }

      // Validasi Tipe
      if (!file.type.startsWith('image/')) {
        setError('Hanya file gambar yang diizinkan.');
        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const finalPrice = formData.original_price * (1 - formData.discount / 100);

    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('description', formData.description);
    dataToSend.append('price', finalPrice);
    dataToSend.append('original_price', formData.original_price);
    dataToSend.append('discount', formData.discount);
    
    if (selectedFile) {
      dataToSend.append('image', selectedFile); 
    }

    const method = product ? 'PUT' : 'POST';
    const url = product 
      ? `http://localhost:5000/api/products/${product.id}` 
      : 'http://localhost:5000/api/products';

    try {
      const response = await fetch(url, {
        method: method,
        body: dataToSend
      });

      if (response.ok) {
        alert('Berhasil menyimpan produk!');
        onSave();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Gagal menyimpan produk');
      }
    } catch (error) {
      console.error("Error:", error);
      setError('Terjadi kesalahan koneksi ke server.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h4 className="mb-4">{product ? 'Edit Produk' : 'Tambah Produk'}</h4>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Nama Produk</Form.Label>
        <Form.Control 
          value={formData.name} 
          onChange={e => setFormData({...formData, name: e.target.value})} 
          required 
          placeholder="Contoh: Baso Sapi Urat"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Harga Asli (Rp)</Form.Label>
            <Form.Control 
              type="number" 
              value={formData.original_price} 
              onChange={e => setFormData({...formData, original_price: e.target.value})} 
              required 
              min="0"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Diskon (%)</Form.Label>
            <Form.Control 
              type="number" 
              value={formData.discount} 
              onChange={e => setFormData({...formData, discount: e.target.value})} 
              min="0"
              max="100"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Gambar Produk</Form.Label>
        <Form.Control 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
        />
        <Form.Text className="text-muted">Format: JPG, PNG, WEBP. Maksimal 10MB.</Form.Text>
        
        {preview && (
          <div className="mt-2 text-center border p-2 bg-light rounded shadow-sm">
            <Image 
              src={preview} 
              style={{ maxHeight: '150px', objectFit: 'contain' }} 
              fluid 
              rounded 
            />
            <p className="small text-muted mb-0 mt-1">Preview Gambar</p>
          </div>
        )}
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Deskripsi</Form.Label>
        <Form.Control 
          as="textarea" 
          rows={3} 
          value={formData.description} 
          onChange={e => setFormData({...formData, description: e.target.value})} 
          placeholder="Jelaskan detail produk..."
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit" className="px-4">
          {product ? 'Perbarui Produk' : 'Tambah Produk'}
        </Button>
        <Button variant="outline-secondary" onClick={onCancel}>
          Batal
        </Button>
      </div>
    </Form>
  );
}

export default ProductForm;