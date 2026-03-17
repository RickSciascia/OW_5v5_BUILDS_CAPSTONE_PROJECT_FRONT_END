import { Container, Row, Col } from "react-bootstrap";
import HeroForm from "./HeroForm";

function ManageHeroes() {
  // useEffect(() => {
  //   document.title = `Overwatch Heroes Hub | Gestione Eroi`;
  // }, []);

  return (
    <>
      <Container fluid className="p-3 bg-dark text-white min-vh-100">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <HeroForm />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ManageHeroes;
