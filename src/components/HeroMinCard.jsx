import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function HeroMinCard() {
  return (
    <Col xs={6} md={3} lg={2}>
      <Card>
        <Card.Img variant="top" src="https://placehold.co/198x226" />
        <Card.Body>
          <Card.Title className="text-center">Nome Eroe</Card.Title>
          <Card.Text className="text-center">Ruolo</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HeroMinCard;
