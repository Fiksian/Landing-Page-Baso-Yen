import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import React, { useState } from 'react';

// URL Endpoint server Express Anda (Ganti port jika berbeda)
const API_URL = 'http://localhost:5000/api/b2b-request'; 

const Kontak = () => {
    // State untuk menyimpan data formulir
    const [formData, setFormData] = useState({
        nama_lengkap: '',
        nama_perusahaan: '',
        email: '',
        whatsapp_number: '',
        jenis_usaha: '',
        pesan_kebutuhan: '',
    });

    // State untuk feedback (loading, success, error)
    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    // Fungsi untuk menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Fungsi untuk mengirim data ke server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponseMessage({ type: '', text: '' }); // Reset pesan

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setResponseMessage({ type: 'success', text: data.message || 'Permintaan berhasil dikirim!' });
                setFormData({ // Reset formulir
                    nama_lengkap: '',
                    nama_perusahaan: '',
                    email: '',
                    whatsapp_number: '',
                    jenis_usaha: '',
                    pesan_kebutuhan: '',
                });
            } else {
                setResponseMessage({ type: 'danger', text: data.message || 'Gagal mengirim permintaan. Coba lagi.' });
            }
        } catch (error) {
            console.error('Error saat mengirim data:', error);
            setResponseMessage({ type: 'danger', text: 'Koneksi ke server gagal. Pastikan server berjalan.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="kontak" className="py-5 bg-light">
            <Container>

                {/* Heading */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold">Hubungi Kami</h2>
                    <p className="text-muted fs-5">
                        Formulir permintaan informasi & kerja sama bisnis (B2B)
                    </p>
                </div>

                <Row className="g-4 align-items-stretch">

                    {/* INFO PERUSAHAAN (Tidak berubah) */}
                    <Col md={5}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <h4 className="fw-bold mb-4">Kontak Perusahaan</h4>
                                <div className="d-flex mb-3">
                                <MapPin className="text-primary me-3 mt-1" />
                                <div>
                                    <strong>Alamat</strong>
                                    <div className="text-muted">
                                    Jl. Pasirkaliki 106 Cicendo, Bandung
                                    </div>
				    <div className="text-muted">
                                    Komp. Puri BKR Kav 61 Regol, Bandung
                                    </div>
                                </div>
                                </div>

                                <div className="d-flex mb-3">
                                <Phone className="text-primary me-3 mt-1" />
                                <div>
                                    <strong>Telepon / WhatsApp</strong>
                                    <div className="text-muted">+62 897-2078-800 (Pasirkaliki)</div>
				    <div className="text-muted">+62 851-0080-5080 (BKR)</div>
                                </div>
                                </div>

                                <div className="d-flex mb-3">
                                <Mail className="text-primary me-3 mt-1" />
                                <div>
                                    <strong>Email</strong>
                                    <div className="text-muted">sales@basoyen.com</div>
                                </div>
                                </div>

                                <div className="d-flex">
                                <Clock className="text-primary me-3 mt-1" />
                                <div>
                                    <strong>Jam Operasional</strong>
                                    <div className="text-muted">
                                    Senin – Minggu, 07.00 – 17.00 WIB
                                    </div>
                                </div>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                    {/* FORM B2B */}
                    <Col md={7}>
                        <Card className="h-100 shadow-sm">
                            <Card.Body>
                                <h4 className="fw-bold mb-4">Form Permintaan Penawaran</h4>
                                
                                {/* Tampilkan pesan feedback */}
                                {responseMessage.text && (
                                    <Alert variant={responseMessage.type}>{responseMessage.text}</Alert>
                                )}

                                {/* Tambahkan onSubmit handler */}
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Nama Lengkap</Form.Label>
                                                {/* Tambahkan name, value, dan onChange */}
                                                <Form.Control 
                                                    type="text" 
                                                    name="nama_lengkap"
                                                    value={formData.nama_lengkap}
                                                    onChange={handleChange}
                                                    placeholder="Nama Anda" 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Nama Perusahaan</Form.Label>
                                                <Form.Control 
                                                    type="text" 
                                                    name="nama_perusahaan"
                                                    value={formData.nama_perusahaan}
                                                    onChange={handleChange}
                                                    placeholder="Nama usaha / restoran" 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control 
                                                    type="email" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="email@perusahaan.com" 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>

                                        <Col md={6} className="mb-3">
                                            <Form.Group>
                                                <Form.Label>No. WhatsApp</Form.Label>
                                                <Form.Control 
                                                    type="tel" 
                                                    name="whatsapp_number"
                                                    value={formData.whatsapp_number}
                                                    onChange={handleChange}
                                                    placeholder="+62..." 
                                                    required 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Jenis Usaha</Form.Label>
                                        <Form.Select 
                                            name="jenis_usaha"
                                            value={formData.jenis_usaha}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Pilih jenis usaha</option>
                                            <option>Restoran</option>
                                            <option>Hotel</option>
                                            <option>Kafe</option>
                                            <option>Catering</option>
                                            <option>Lainnya</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Pesan / Kebutuhan Produk</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            name="pesan_kebutuhan"
                                            value={formData.pesan_kebutuhan}
                                            onChange={handleChange}
                                            placeholder="Contoh: kebutuhan bakso 50kg/minggu, mie basah, dll"
                                            required
                                        />
                                    </Form.Group>

                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        type="submit"
                                        disabled={loading} // Nonaktifkan saat loading
                                    >
                                        <Send className="me-2" />
                                        {loading ? 'Mengirim...' : 'Kirim Permintaan'}
                                    </Button>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </section>
    );
};

export default Kontak;