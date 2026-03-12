import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
function UltimateCard({ ultimate }) {
  return (
    <>
      <Card bg="dark" text="light" className="border border-0">
        <Row className="justify-content-center">
          <Col xs={3} className="align-content-center justify-content-center">
            <Card.Img src={ultimate.ultimateImage} alt={ultimate.name} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{ultimate.name}</Card.Title>
              <Badge bg="warning" text="dark">
                Costo: {ultimate.cost}
              </Badge>
              <Card.Text>{ultimate.description}</Card.Text>
              <Card.Subtitle>
                {ultimate.damage > 0 ? `Danno: ${ultimate.damage}` : null}
              </Card.Subtitle>
              <Card.Subtitle>
                {ultimate.healing > 0 ? `Cure: ${ultimate.healing}` : null}
              </Card.Subtitle>
              <Card.Subtitle>Durata: {ultimate.duration} secondi</Card.Subtitle>
              <Card.Subtitle>Raggio Azione: {ultimate.range}</Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default UltimateCard;
