import { Row, Col, Badge } from "react-bootstrap";
import Card from "react-bootstrap/Card";
function PerkCard({ perk }) {
  return (
    <>
      <Card bg="dark" text="light" className="border border-0">
        <Row className="justify-content-center">
          <Col xs={3} className="align-content-center justify-content-center">
            <Card.Img src={perk.perkImage} alt={perk.name} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{perk.name}</Card.Title>
              <Badge>{perk.perkType} PERK</Badge>
              <Card.Text>{perk.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default PerkCard;
