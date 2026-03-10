import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function OWHubNavBar() {
  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark" fixed="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Link to="/" className="navbar-brand">
          Overwatch Heroes Hub
        </Link>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/gallery">
              Galleria Eroi
            </Link>
            <Link className="nav-link" to="/builds">
              Build Eroi
            </Link>
            <Link className="nav-link" to="/backoffice">
              Backoffice
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Link className="nav-link" to="/login">
            Accedi
          </Link>
          <Link className="nav-link" to="/register">
            Registrati
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default OWHubNavBar;
