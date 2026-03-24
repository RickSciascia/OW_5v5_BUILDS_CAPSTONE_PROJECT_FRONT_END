import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "Overwatch Heroes Hub - Home";
  }, []);
  return (
    <>
      <Container fluid className="min-vh-100 bg-dark text-white">
        <Row className="p-0">
          <Col className="d-flex flex-column justify-content-around text-light p-0 border border-end-0 border-start-0 border-top-0 heroes-hub-home-bg">
            <h1 className="text-center fs-1 fw-bolder">
              Benvenuti <br /> su Overwatch Heroes Hub
            </h1>
            <p className="fw-bold text-center">
              Il tuo punto di riferimento per Overwatch.
              <br />
              Qui troverai le build per il 5v5 e 6v6 dei tuoi eroi preferiti.
              <br />
              Unisciti a migliaia di giocatori e condividi la tua build con gli
              altri!
            </p>
          </Col>
        </Row>
        <Row className="mt-5 pt-5 text-center mx-3">
          <Link className="text-decoration-none text-white" to={"/gallery"}>
            <Col xs={12}>
              <Row className="border rounded-3">
                <Col className="align-content-center  p-0">
                  <h3>Galleria Eroi</h3>
                  <p>
                    Vai nella Galleria Eroi per esplorare gli Eroi con le
                    statistiche ed esplorare le Build della community!
                  </p>
                </Col>

                <Col xs={6} className="hero-gallery-img rounded-end-3"></Col>
              </Row>
            </Col>
          </Link>
        </Row>
      </Container>
    </>
  );
}

export default Home;
