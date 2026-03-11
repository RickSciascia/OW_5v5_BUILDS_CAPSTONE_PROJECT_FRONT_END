import { Container, Row, Col } from "react-bootstrap";
import HeroMinCard from "./HeroMinCard";

function HeroGallery() {
  return (
    <>
      <head>
        <title>Overwatch Heroes Hub - Galleria Eroi</title>
      </head>
      <Container className="min-vh-100">
        <Row className="g-3 my-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">TANK</h2>
          </Col>
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
        </Row>
        <Row className="g-3 my-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">ATTACCO</h2>
          </Col>
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
        </Row>
        <Row className="g-3 my-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">SUPPORTO</h2>
          </Col>
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
          <HeroMinCard />
        </Row>
      </Container>
      ;
    </>
  );
}

export default HeroGallery;
