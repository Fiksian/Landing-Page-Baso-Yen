import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function Navbars() {
  return (
    <Navbar expand="xl" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Bakso Yen</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Tentang Kami</Nav.Link>
            <Nav.Link href="#features">Layanan</Nav.Link>
            <Nav.Link href="#features">Produk</Nav.Link>
            <Nav.Link href="#features">Kontak</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbars
