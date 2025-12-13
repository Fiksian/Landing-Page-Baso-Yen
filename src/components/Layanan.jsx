import { Container, Row, Col, Card } from "react-bootstrap";
import {
  Truck,
  Layers,
  Sliders,
  Tag,
  Box,
  ShieldCheck,
  FileCheck,
  CheckCircle
} from "lucide-react";

/* =======================
   DATA LAYANAN B2B
======================= */
const services = [
  {
    icon: Truck,
    title: "Supplier Produk Kuliner",
    desc: "Pemasok bakso, mie, sosis, dan produk olahan untuk restoran, hotel, cafe, catering, dan distributor."
  },
  {
    icon: Layers,
    title: "Custom Order & Volume Besar",
    desc: "Melayani pesanan skala besar dan kebutuhan khusus untuk operasional dapur profesional."
  },
  {
    icon: Sliders,
    title: "Harga Kompetitif B2B",
    desc: "Skema harga yang mendukung efisiensi dan keberlanjutan bisnis mitra."
  },
  {
    icon: Tag,
    title: "Produk Konsisten & Terstandar",
    desc: "Standar rasa dan kualitas yang konsisten untuk menjaga mutu sajian bisnis Anda."
  },
  {
    icon: Box,
    title: "Distribusi Terjadwal",
    desc: "Sistem pengiriman terencana untuk memastikan suplai aman dan tepat waktu."
  }
];

/* =======================
   DATA SERTIFIKASI
======================= */
const halalCertificates = [
  {
    product: "Sosis & Bakso",
    number: "MUI ID32110001333131122"
  },
  {
    product: "Mie, Kulit Pangsit, dan Lain-lain",
    number: "MUI ID32110001333161122"
  },
  {
    product: "Saus, Minyak Bawang, dan Lain-lain",
    number: "MUI ID32110001333491122"
  }
];

const bpomCertificates = [
  {
    product: "Bakso Daging Sapi",
    number: "BPOM RI MD 239528004551"
  },
  {
    product: "Sosis Daging Sapi",
    number: "BPOM RI MD 239528003551"
  },
  {
    product: "Mie Basah",
    number: "BPOM RI MD 230828001551"
  }
];

const Layanan = () => {
  return (
    <section id="layanan" className="py-5 bg-light">
      <Container>

        {/* =======================
            LAYANAN B2B
        ======================= */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Layanan Bisnis</h2>
          <p className="text-muted fs-5">
            Solusi produk dan distribusi untuk mendukung operasional industri kuliner profesional
          </p>
        </div>

        <Row className="g-4 mb-5">
          {services.map((item, idx) => (
            <Col md={6} lg={4} key={idx}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <item.icon size={40} className="text-primary mb-3" />
                  <Card.Title className="fw-bold">{item.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {item.desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* =======================
            SERTIFIKASI
        ======================= */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">Bersertifikat & Terjamin</h2>
          <p className="text-muted fs-5">
            Produk Yen telah memenuhi standar halal, keamanan pangan, dan sistem mutu internasional
          </p>
        </div>

        {/* HALAL */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-3 d-flex align-items-center">
              <ShieldCheck className="text-success me-2" size={28} />
              Sertifikat Halal MUI (100% Halal)
            </h4>

            <Row>
              {halalCertificates.map((item, idx) => (
                <Col md={6} lg={4} key={idx} className="mb-3">
                  <div className="d-flex">
                    <CheckCircle className="text-success me-2 mt-1" size={20} />
                    <div>
                      <strong>{item.product}</strong>
                      <div className="text-muted">{item.number}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* BPOM */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-3 d-flex align-items-center">
              <FileCheck className="text-primary me-2" size={28} />
              Sertifikat BPOM RI
            </h4>

            <Row>
              {bpomCertificates.map((item, idx) => (
                <Col md={6} lg={4} key={idx} className="mb-3">
                  <div className="d-flex">
                    <CheckCircle className="text-primary me-2 mt-1" size={20} />
                    <div>
                      <strong>{item.product}</strong>
                      <div className="text-muted">{item.number}</div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* HACCP */}
        <Card className="shadow-sm">
          <Card.Body>
            <h4 className="fw-bold mb-3 d-flex align-items-center">
              <ShieldCheck className="text-warning me-2" size={28} />
              Sertifikasi HACCP
            </h4>

            <div className="d-flex">
              <CheckCircle className="text-warning me-2 mt-1" size={20} />
              <div>
                <strong>Hazard Analysis and Critical Control Points</strong>
                <div className="text-muted">HACCP-02012</div>
              </div>
            </div>

            <p className="text-muted mt-3 mb-0">
              Menjamin keamanan pangan melalui pengendalian proses produksi secara sistematis
              dan terstandar untuk kebutuhan bisnis dan keluarga.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
};

export default Layanan;
