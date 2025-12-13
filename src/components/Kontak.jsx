import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Kontak = () => {
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

          {/* INFO PERUSAHAAN */}
          <Col md={5}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h4 className="fw-bold mb-4">Kontak Perusahaan</h4>

                <div className="d-flex mb-3">
                  <MapPin className="text-primary me-3 mt-1" />
                  <div>
                    <strong>Alamat</strong>
                    <div className="text-muted">
                      Jl. Contoh Alamat No.123, Bandung, Jawa Barat
                    </div>
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <Phone className="text-primary me-3 mt-1" />
                  <div>
                    <strong>Telepon / WhatsApp</strong>
                    <div className="text-muted">+62 812-3456-7890</div>
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
                      Senin – Jumat, 08.00 – 17.00 WIB
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

                <Form>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control type="text" placeholder="Nama Anda" required />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Nama Perusahaan</Form.Label>
                        <Form.Control type="text" placeholder="Nama usaha / restoran" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email@perusahaan.com" required />
                      </Form.Group>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label>No. WhatsApp</Form.Label>
                        <Form.Control type="tel" placeholder="+62..." required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Jenis Usaha</Form.Label>
                    <Form.Select required>
                      <option value="">Pilih jenis usaha</option>
                      <option>Restoran</option>
                      <option>Hotel</option>
                      <option>Kafe</option>
                      <option>Catering</option>
                      <option>Distributor</option>
                      <option>Lainnya</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Pesan / Kebutuhan Produk</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Contoh: kebutuhan bakso 50kg/minggu, mie basah, dll"
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" size="lg" type="submit">
                    <Send className="me-2" />
                    Kirim Permintaan
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
