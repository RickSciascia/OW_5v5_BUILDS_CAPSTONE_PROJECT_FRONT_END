import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function HeroMinCard({ hero }) {
  return (
    <Col xs={6} md={3} lg={2}>
      <Card bg="info" text="light">
        <Card.Img variant="top" src={hero.portraitImage} alt={hero.name} />
        <Card.Body>
          <Card.Title className="text-center">{hero.name}</Card.Title>
          <Card.Text className="text-center small">{hero.role}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default HeroMinCard;
