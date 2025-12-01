import { Navbar, Nav, Container, Image , Row, Col} from "react-bootstrap";
import logo from "../assets/Photo/Logo Yen/LOGO YEN.png"

function Navbars() {
  return (
    <Navbar fixed="top" expand="xl" bg="dark" variant="dark">
      <Container className="justify-content-start ms-5 me-5"  style={{ maxWidth: '1920px'}}>
        <Navbar.Brand href="#home">
          <Image src={logo} style={{ height: "100%", maxHeight: "70px" }} />
        </Navbar.Brand>
        <Navbar.Text>
          <Col>
             Baso Yen
          </Col>
          <Col>
             Sajian Praktis Istimewa
          </Col>
        </Navbar.Text>
        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto gap-5">
            <Nav.Link href="#home">Beranda</Nav.Link>
            <Nav.Link href="#tentang_Kami">Tentang Kami</Nav.Link>
            <Nav.Link href="#layanan">Layanan</Nav.Link>
            <Nav.Link href="#produk">Produk</Nav.Link>
            <Nav.Link href="#kontak">Kontak</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navbars
