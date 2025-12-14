import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Alert, Spinner, Form, Button } from 'react-bootstrap';

// URL Endpoint server Express Anda (Ganti port jika berbeda)
const API_BASE_URL = 'http://localhost:5000/api/b2b-data'; 

const AdminTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    // Fungsi untuk mengambil data dari backend
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_BASE_URL);
            const result = await response.json();

            if (response.ok && result.success) {
                setData(result.data);
            } else {
                setError(result.message || 'Gagal mengambil data dari server.');
            }
        } catch (err) {
            setError('Koneksi server gagal. Pastikan server Express berjalan.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Panggil fungsi pengambilan data saat komponen dimuat
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Fungsi untuk memperbarui status proses
    const handleUpdateStatus = async (id, currentStatus) => {
        if (!newStatus) {
            alert("Pilih status baru sebelum memperbarui.");
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status_proses: newStatus }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert(`Status permintaan ${id} berhasil diupdate menjadi ${newStatus}.`);
                // Refresh data setelah update berhasil
                fetchData(); 
            } else {
                alert(result.message || 'Gagal memperbarui status.');
            }
        } catch (err) {
            alert('Gagal terkoneksi ke server saat update.');
            console.error(err);
        } finally {
            setEditingId(null);
            setNewStatus('');
        }
    };
    
    // Fungsi untuk mengaktifkan mode edit
    const startEditing = (id, currentStatus) => {
        setEditingId(id);
        setNewStatus(currentStatus);
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Memuat data...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">Error: {error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4">Data Permintaan B2B (Admin View)</h2>
            <p className="text-muted">Total Data: {data.length}</p>

            <Table striped bordered hover responsive size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Waktu Kirim</th>
                        <th>Nama & Perusahaan</th>
                        <th>Kontak (Email/WA)</th>
                        <th>Jenis Usaha</th>
                        <th>Kebutuhan</th>
                        <th>Status</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{new Date(item.tanggal_kirim).toLocaleString()}</td>
                            <td>
                                <strong>{item.nama_lengkap}</strong><br />
                                <small className="text-muted">{item.nama_perusahaan}</small>
                            </td>
                            <td>
                                <small>{item.email}</small><br />
                                <strong>{item.whatsapp_number}</strong>
                            </td>
                            <td>{item.jenis_usaha}</td>
                            <td style={{ maxWidth: '250px', whiteSpace: 'normal' }}>{item.pesan_kebutuhan}</td>
                            
                            {/* Kolom Status yang Bisa Diedit */}
                            <td>
                                {editingId === item.id ? (
                                    <Form.Select 
                                        value={newStatus} 
                                        onChange={(e) => setNewStatus(e.target.value)}
                                    >
                                        <option value="Baru">Baru</option>
                                        <option value="Diproses">Diproses</option>
                                        <option value="Selesai">Selesai</option>
                                        <option value="Diabaikan">Diabaikan</option>
                                    </Form.Select>
                                ) : (
                                    <span className={`badge ${
                                        item.status_proses === 'Selesai' ? 'bg-success' :
                                        item.status_proses === 'Diproses' ? 'bg-warning text-dark' :
                                        item.status_proses === 'Diabaikan' ? 'bg-danger' :
                                        'bg-secondary'
                                    }`}>
                                        {item.status_proses}
                                    </span>
                                )}
                            </td>

                            {/* Kolom Aksi */}
                            <td>
                                {editingId === item.id ? (
                                    <Button 
                                        variant="success" 
                                        size="sm" 
                                        onClick={() => handleUpdateStatus(item.id, item.status_proses)}
                                        className="me-2"
                                    >
                                        Simpan
                                    </Button>
                                ) : (
                                    <Button 
                                        variant="info" 
                                        size="sm" 
                                        onClick={() => startEditing(item.id, item.status_proses)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                <Button 
                                    variant="secondary" 
                                    size="sm" 
                                    onClick={() => setEditingId(null)}
                                    className="ms-2"
                                >
                                    Batal
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminTable;
