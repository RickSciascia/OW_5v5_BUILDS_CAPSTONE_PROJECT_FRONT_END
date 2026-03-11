import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function OWHubNavBar() {
  return (
    <Navbar expand="md" bg="primary" data-bs-theme="dark" fixed="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-menu" />
        <Link to="/" className="navbar-brand">
          Overwatch Heroes Hub
        </Link>
        <Navbar.Collapse id="main-menu">
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
        <Navbar.Collapse id="account-menu">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/login">
              Accedi
            </Link>
            <Link className="nav-link" to="/register">
              Registrati
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="account-menu" />
      </Container>
    </Navbar>
  );
}

export default OWHubNavBar;
