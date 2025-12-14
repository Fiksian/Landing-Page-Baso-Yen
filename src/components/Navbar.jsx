import { Navbar, Nav, Container, Image , Row, Col} from "react-bootstrap";
import logo from "../assets/Photo/Logo Yen/LOGO YEN.png"

function Navbars() {
  return (
    <Navbar sticky="top" expand="xl" className="navbar-yen">
      <Container style={{ maxWidth: '100%'}}>
        
        <Navbar.Brand href="#home" className="d-flex align-items-center me-4"> 
          <Image 
            src={logo} 
            style={{ height: "50px", objectFit: "cover", marginRight: "10px" }} 
          />
          <div className="d-flex flex-column lh-1">
            <span className="fw-bold" style={{ fontSize: '1.2rem' }}>Baso Yen</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Sajian Praktis Istimewa</span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar-nav" className="ms-auto" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto gap-5 nav-link-yen">
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
export default Navbars;