import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
function PassiveCard({ passive }) {
  return (
    <>
      <Card bg="dark" text="light" className="border border-0 my-5">
        <Row className="justify-content-center">
          <Col xs={3} className="align-content-center justify-content-center">
            <Card.Img src={passive.passiveImage} alt={passive.name} />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title>{passive.name}</Card.Title>
              <Card.Text>{passive.description}</Card.Text>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default PassiveCard;
