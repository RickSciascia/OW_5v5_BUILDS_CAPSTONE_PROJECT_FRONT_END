import LoginForm from "./LoginForm";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImage from "../assets/logo.png";
function LoginPage() {
  return (
    <Container
      fluid
      className="mt-0 pt-0 bg-dark text-white min-vh-100 align-content-space-around"
    >
      <Row className="mt-0 pt-0 justify-content-center">
        <Col xs={12} className="text-center">
          <Link className="navbar-brand text-center fs-1" to={"/"}>
            <img src={logoImage} className="img-logo-text" />
          </Link>
        </Col>

        <Col xs={10} sm={6} md={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
