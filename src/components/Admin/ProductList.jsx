import React, { useState, useEffect } from 'react';
import { Table, Button, Image, Badge } from 'react-bootstrap';

const ProductList = ({ onEdit, onAdd }) => {
  const [products, setProducts] = useState([]);

  const loadProducts = () => {
    fetch('http://localhost:5000/api/public/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  useEffect(() => loadProducts(), []);

  const deleteProduct = (id) => {
    if(window.confirm("Hapus produk?")) {
        fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' })
          .then(() => loadProducts());
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h5>Daftar Produk Aktif</h5>
        <Button variant="success" size="sm" onClick={onAdd}>+ Tambah</Button>
      </div>
      <Table responsive hover>
        <thead className="table-light">
          <tr>
            <th>Gambar</th>
            <th>Nama</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td><Image src={p.image_url} width={40} rounded /></td>
              <td>{p.name}</td>
              <td>Rp {parseInt(p.price).toLocaleString('id-ID')}</td>
              <td>
                <Button variant="link" className="p-0 me-2" onClick={() => onEdit(p)}>Edit</Button>
                <Button variant="link" className="p-0 text-danger" onClick={() => deleteProduct(p.id)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductList;