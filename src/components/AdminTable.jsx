import React, { useState, useEffect, useCallback } from 'react';
import { Table, Alert, Spinner, Form, Button, Badge, Modal } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:5000/api/b2b-data'; 

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    
    // State untuk Modal Detail Pesan
    const [showModal, setShowModal] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            const result = await response.json();
            if (response.ok && result.success) {
                setData(result.data);
            } else {
                setError(result.message || 'Gagal mengambil data.');
            }
        } catch (err) {
            setError('Koneksi server gagal.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus data ID #${id}?`)) {
            try {
                const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
                const result = await response.json();
                if (response.ok && result.success) {
                    setData(data.filter(item => item.id !== id));
                }
            } catch (err) {
                alert('Gagal terkoneksi ke server.');
            }
        }
    };

    const handleUpdateStatus = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status_proses: newStatus }),
            });
            if (response.ok) {
                setData(prevData => 
                    prevData.map(item => item.id === id ? { ...item, status_proses: newStatus } : item)
                );
                setEditingId(null);
            }
        } catch (err) {
            alert('Gagal update status.');
        }
    };

    const getBadgeVariant = (status) => {
        switch (status) {
            case 'Selesai': return 'success';
            case 'Diproses': return 'warning';
            case 'Diabaikan': return 'danger';
            case 'Baru': return 'info';
            default: return 'secondary';
        }
    };

    const openMessageModal = (message) => {
        setSelectedMessage(message);
        setShowModal(true);
    };

    if (loading) return <div className="text-center py-5"><Spinner animation="border" /></div>;

    return (
        <div className="admin-b2b-section">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Daftar Permintaan B2B</h4>
                <Badge bg="dark" className="px-3 py-2">Total: {data.length}</Badge>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Table striped hover responsive className="align-middle shadow-sm bg-white border">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Waktu</th>
                        <th>Perusahaan / Nama</th>
                        <th>Kontak</th>
                        <th>Pesan Kebutuhan</th>
                        <th>Status</th>
                        <th className="text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className="fw-bold text-muted">#{item.id}</td>
                            <td><small>{item.tanggal_kirim ? new Date(item.tanggal_kirim).toLocaleDateString('id-ID') : '-'}</small></td>
                            <td>
                                <div className="fw-bold">{item.nama_perusahaan || 'Personal'}</div>
                                <div className="small text-muted">{item.nama_lengkap}</div>
                                <div style={{fontSize: '10px'}} className="text-uppercase text-primary fw-bold">{item.jenis_usaha}</div>
                            </td>
                            <td>
                                <div className="small">{item.email}</div>
                                <div className="small text-success fw-bold">{item.whatsapp_number}</div>
                            </td>
                            {/* KOLOM PESAN KEBUTUHAN DENGAN LIMIT TEKS */}
                            <td>
                                <div 
                                    style={{ maxWidth: '200px', cursor: 'pointer' }} 
                                    className="text-truncate text-muted small"
                                    onClick={() => openMessageModal(item.pesan_kebutuhan)}
                                    title="Klik untuk lihat detail"
                                >
                                    {item.pesan_kebutuhan}
                                </div>
                                <Button 
                                    variant="link" 
                                    size="sm" 
                                    className="p-0 text-decoration-none" 
                                    style={{fontSize: '11px'}}
                                    onClick={() => openMessageModal(item.pesan_kebutuhan)}
                                >
                                    Lihat Detail
                                </Button>
                            </td>
                            <td>
                                {editingId === item.id ? (
                                    <Form.Select size="sm" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                                        <option value="Baru">Baru</option>
                                        <option value="Diproses">Diproses</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Diabaikan">Diabaikan</option>
                                    </Form.Select>
                                ) : (
                                    <Badge bg={getBadgeVariant(item.status_proses)}>{item.status_proses || 'Baru'}</Badge>
                                )}
                            </td>
                            <td className="text-center">
                                <div className="d-flex gap-2 justify-content-center">
                                    {editingId === item.id ? (
                                        <>
                                            <Button variant="success" size="sm" onClick={() => handleUpdateStatus(item.id)}>Simpan</Button>
                                            <Button variant="outline-secondary" size="sm" onClick={() => setEditingId(null)}>Batal</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button 
                                                variant="outline-primary" 
                                                size="sm" 
                                                onClick={() => { setEditingId(item.id); setNewStatus(item.status_proses || 'Baru'); }}
                                            >
                                                Edit
                                            </Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(item.id)}>Hapus</Button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* MODAL UNTUK DETAIL PESAN */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Pesan Kebutuhan</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light p-4">
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {selectedMessage}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminTable;