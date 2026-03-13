import LoginForm from "./LoginForm";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
function LoginPage() {
  return (
    <Container
      fluid
      className="bg-dark text-white py-3 min-vh-100 align-content-center"
    >
      <Row className="justify-content-center">
        <Link className="navbar-brand text-center fs-1" to={"/"}>
          Overwatch Heroes Hub
        </Link>
        <Col xs={10} sm={6} md={4}>
          <LoginForm />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
