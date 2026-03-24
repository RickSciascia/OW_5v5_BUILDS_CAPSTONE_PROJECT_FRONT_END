import RegistrationForm from "./RegistrationForm";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";

function RegistrationPage() {
  return (
    <Container fluid className="bg-dark text-white min-vh-100">
      <Row className="justify-content-center">
        <Link className="navbar-brand text-center fs-1" to={"/"}>
          <img src={logoImage} className="img-logo-text" />
        </Link>
        <Col xs={8}>
          <RegistrationForm />
        </Col>
      </Row>
    </Container>
  );
}

export default RegistrationPage;
