import { Container, Row, Col } from "react-bootstrap";

function AppFooter() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4}>
            <h5>My App</h5>
            <p>Aplikasi react sederhana.</p>
          </Col>
          <Col md={4}>
            <h5>Links</h5>
            <ul className="list-">
              <li><a href="#home" className="text-light text-decoration-none">Home</a></li>
              <li><a href="#about" className="text-light text-decoration-none">About</a></li>
              <li><a href="#contact" className="text-light text-decoration-none">Contact</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Social</h5>
            <p>Instagram, GitHub, dsb.</p>
          </Col>
        </Row>

        <div className="text-center mt-3">
          © 2025 My App — All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

export default AppFooter;

