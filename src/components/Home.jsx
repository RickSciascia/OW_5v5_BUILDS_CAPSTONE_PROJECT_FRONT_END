import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Overwatch Heroes Hub - Home";
  }, []);
  return (
    <>
      <Container fluid className="min-vh-100">
        <Row className="my-3">
          <Col>
            <h1 className="text-center">
              Benvenuti <br /> su Overwatch Heroes Hub
            </h1>
            <p className="fs-2 text-center">
              Il tuo punto di riferimento per Overwatch.
              <br />
              Qui troverai le build per il 5v5 e 6v6 dei tuoi eroi preferiti.
              <br />
              Unisciti a migliaia di giocatori e condividi la tua build con gli
              altri.
            </p>
          </Col>
        </Row>
        <Row className="my-3 text-center">
          <Col xs={12} md={6}>
            <h3>Galleria Eroi</h3>
            <p>
              Vai nella Galleria Eroi per esplorare gli Eroi con le statistiche
            </p>
          </Col>
          <Col xs={12} md={6}>
            <h3>Immagine Galleria Eroi</h3>
            <p>IMMAGINE QUI</p>
          </Col>
        </Row>
        <Row className="my-3 text-center">
          <Col xs={12} md={6}>
            <h3>IMMAGINE Build Eroi</h3>
            <p>IMMAGINE QUI</p>
          </Col>
          <Col xs={12} md={6}>
            <h3>Build Eroi</h3>
            <p>Esplora le Build consigliate e le build degli altri utenti</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
