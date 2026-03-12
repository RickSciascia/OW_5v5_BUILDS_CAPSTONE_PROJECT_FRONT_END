import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
function WeaponCard({ weapon }) {
  return (
    <>
      <Card bg="dark" text="light" className="border border-0">
        <Row className="justify-content-center">
          <Col xs={3} className="align-content-center justify-content-center">
            <Card.Img src={weapon.weaponImage} alt={weapon.name} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{weapon.name}</Card.Title>
              <Badge bg="danger text-dark">{weapon.weaponType}</Badge>
              <Card.Text>{weapon.description}</Card.Text>
              <Card.Subtitle>Danno:</Card.Subtitle>
              <Card.Text className="mb-0">Massimo: {weapon.maxDmg}</Card.Text>
              <Card.Text>Minimo: {weapon.minDmg}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default WeaponCard;
