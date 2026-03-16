import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function HeroMinCard({ hero }) {
  return (
    <Col xs={6} md={3} lg={2}>
      <Link to={`heroes/${hero.id}`} className="text-decoration-none">
        <Card bg="warning" text="dark">
          <Card.Img
            variant="top"
            src={hero.portraitImage}
            alt={hero.name}
            className="bg-dark"
          />
          <Card.Body>
            <Card.Title className="text-center">{hero.name}</Card.Title>
            <Card.Text className="text-center small">{hero.role}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default HeroMinCard;
