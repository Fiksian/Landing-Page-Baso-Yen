import { ChefHat, Award, Clock, BookOpen, Target, Eye, CheckCircle } from 'lucide-react';
import { Container, Row, Col, Card } from "react-bootstrap";

import bgtoko from "../assets/Photo/Foto Store Baso Yen/20251212_100320.jpg";
import fotomangkok from "../assets/Photo/foto baru/foto_DSCF9943.jpg";
import packbaso from "../assets/Photo/foto baru/foto_DSCF9876.jpg";

const AboutUs = () => {
    const values = [
        {
            icon: ChefHat,
            title: "Standar Produksi Profesional",
            description: "Diproduksi menggunakan mesin modern dan SOP industri untuk memastikan konsistensi kualitas."
        },
        {
            icon: Award,
            title: "Kualitas Premium",
            description: "Bahan baku pilihan dan quality control berlapis, memenuhi kebutuhan restoran skala kecil hingga hotel bintang lima."
        },
        {
            icon: Clock,
            title: "Efisien & Cepat",
            description: "Produk praktis, siap diolah dengan waktu minimal—mendukung operasional dapur yang efisien."
        },
        {
            icon: BookOpen,
            title: "Inovasi Berkelanjutan",
            description: "Mengembangkan produk sesuai tren kuliner dan kebutuhan pasar HoReCa."
        }
    ];

    return (
        <section id="tentang_Kami" style={{ backgroundColor: "#fff" }}>

            {/* Background Section */}
            <div
                style={{
                    backgroundImage: `url(${bgtoko})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "65vh",
                    position: "relative",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                {/* Overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)"
                }}></div>

                {/* Content */}
                <Container style={{ position: "relative", zIndex: 1 }}>
                    <Row>
                        <Col md={8}>
                            <h1 className="text-white fw-bold display-4 mb-4" style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}>
                                Tentang Kami
                            </h1>
                            <p className="text-white fs-5 mb-3" style={{ textShadow: "0 0 6px rgba(0,0,0,0.6)" }}>
                                Baso Yen merupakan produsen mie, bakso, dan sosis yang telah melayani kebutuhan B2B sejak tahun 1980-an.
                            </p>
                            <p className="text-white fs-5 mb-3" style={{ textShadow: "0 0 6px rgba(0,0,0,0.6)" }}>
                                Kami berkomitmen menyediakan produk berkualitas tinggi yang konsisten, praktis, dan siap mendukung kebutuhan dapur profesional.
                            </p>
                            <p className="text-white fs-5" style={{ textShadow: "0 0 6px rgba(0,0,0,0.6)" }}>
                                Dipercaya oleh restoran, hotel, kafe, dan berbagai pelaku industri kuliner di seluruh Indonesia.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Vision & Mission */}
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={6} className="mb-4">
                        <h2 className="fw-bold mb-4">Visi & Misi (B2B)</h2>

                        {/* Visi */}
                        <Card className="mb-4 border-start border-warning border-4 shadow-sm">
                            <Card.Body>
                                <h3 className="fw-bold mb-3 d-flex align-items-center">
                                    <Eye className="me-3 text-warning" size={28} />
                                    Visi
                                </h3>
                                <p>
                                    Menjadi mitra terpercaya bagi industri kuliner profesional melalui kualitas produk yang unggul dan layanan yang responsif.
                                </p>
                            </Card.Body>
                        </Card>

                        {/* Misi */}
                        <Card className="border-start border-warning border-4 shadow-sm">
                            <Card.Body>
                                <h3 className="fw-bold mb-3 d-flex align-items-center">
                                    <Target className="me-3 text-warning" size={28} />
                                    Misi
                                </h3>
                                <ul className="ps-3">
                                    <li className="mb-3 d-flex">
                                        <CheckCircle className="text-warning me-2 mt-1" size={20} />
                                        Memberikan solusi produk berkualitas tinggi yang mendukung efisiensi dapur profesional.
                                    </li>
                                    <li className="mb-3 d-flex">
                                        <CheckCircle className="text-warning me-2 mt-1" size={20} />
                                        Berinovasi mengikuti kebutuhan pasar HoReCa.
                                    </li>
                                    <li className="d-flex">
                                        <CheckCircle className="text-warning me-2 mt-1" size={20} />
                                        Menjalin kerja sama jangka panjang berbasis konsistensi, kualitas, dan kepercayaan.
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Image */}
                    <Col md={6} className="text-center">
                        <img
                            src={fotomangkok}
                            alt="Food preparation"
                            className="img-fluid rounded shadow-lg"
                            style={{ maxWidth: "380px", objectFit: "cover" }}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Values Section */}
            <div style={{ background: "#f8f9fa" }} className="py-5">
                <Container>
                    <h2 className="fw-bold text-center mb-5">
                        Kenapa Mitra Bisnis Memilih Kami?
                    </h2>
                    <Row>
                        {values.map((value, idx) => (
                            <Col md={6} lg={3} className="text-center mb-4" key={idx}>
                                <div
                                    className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: "80px",
                                        height: "80px",
                                        background: "#ffe4c4",
                                    }}
                                >
                                    <value.icon size={36} className="text-warning" />
                                </div>
                                <h5 className="fw-bold">{value.title}</h5>
                                <p className="text-muted">{value.description}</p>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* Story Section */}
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={6} className="text-center mb-4">
                        <img
                            src={packbaso}
                            alt="produk baso"
                            className="img-fluid rounded shadow-lg"
                            style={{ maxWidth: "380px" }}
                        />
                    </Col>

                    <Col md={6}>
                        <h2 className="fw-bold mb-4">Filosofi Kami</h2>
                        <p className="text-muted fs-5">
                            Sejak 1988, Baso Yen berfokus pada kualitas, higienitas, dan konsistensi produk. Dengan fasilitas produksi modern, kami memastikan setiap produk mudah diolah dan memiliki rasa yang stabil—menjadi pilihan utama restoran, hotel, dan pelaku industri kuliner profesional lainnya.
                        </p>
                    </Col>
                </Row>
            </Container>

        </section>
    );
};

export default AboutUs;
