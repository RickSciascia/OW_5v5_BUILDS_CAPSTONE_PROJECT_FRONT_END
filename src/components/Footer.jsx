import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <Navbar expand="md" bg="warning" data-bs-theme="light">
        <Container>
          <Nav>
            <Link className="navbar-brand" to="/">
              Overwatch Heroes Hub
            </Link>
            <Link to="/contattaci" className="nav-link">
              Contattaci
            </Link>
            <Link to="/tos" className="nav-link">
              Termini di Servizio
            </Link>
            <Link to="/privacy" className="nav-link">
              Privacy Policy
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid className="text-center bg-warning py-3">
        <p className="text-dark">
          COPYRIGHT© RICCARDO SCIASCIA 2026 - ALL RIGHTS RESERVED
        </p>
        <p className="text-dark">
          NON AFFILIATO con Blizzard Entertainment, Inc. <br />
          Overwatch è un marchio registrato di Blizzard Entertainment, Inc.
          <br />
          Tutte le immagini relative e i nomi degli eroi sono proprietà
          intellettuali di Blizzard Entertainment, Inc.
        </p>
      </Container>
    </>
  );
}

export default Footer;
