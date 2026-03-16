import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
function SkillCard({ skill }) {
  return (
    <>
      <Card bg="dark" text="light" className="border border-0">
        <Row className="justify-content-center">
          <Col xs={3} className="align-content-center justify-content-center">
            <Card.Img src={skill.skillImage} alt={skill.name} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{skill.name}</Card.Title>
              <Badge bg="warning" text="dark">
                Tempo di recupero: {skill.cooldown} sec
              </Badge>
              <Card.Text>{skill.description}</Card.Text>
              <Card.Subtitle>
                {skill.damage > 0 ? `Danno: ${skill.damage}` : null}
              </Card.Subtitle>
              <Card.Subtitle>
                {skill.healing > 0 ? `Cure: ${skill.healing}` : null}
              </Card.Subtitle>
              <Card.Subtitle>Durata: {skill.duration} secondi</Card.Subtitle>
              <Card.Subtitle>
                {skill.range > 0 ? `Raggio Azione: ${skill.range}` : null}
              </Card.Subtitle>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default SkillCard;
