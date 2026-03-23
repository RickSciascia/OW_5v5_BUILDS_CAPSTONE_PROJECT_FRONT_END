import { Card, Badge, Row, Col, Button } from "react-bootstrap";

const BuildCard = function ({ build, onDelete, canDelete }) {
  return (
    <Card className="bg-dark text-white border-secondary h-100 shadow">
      <Card.Body>
        <Card.Title className="text-warning fw-bold border-bottom pb-2">
          {build.name}
        </Card.Title>
        <div className="mt-3">
          <h5>{build.heroName}</h5>
          <Card.Text className="small mb-2">
            Creato da: <span className="text-info">{build.username}</span>
            {canDelete && (
              <Button
                className="ms-3"
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(build.id)}
              >
                Elimina
              </Button>
            )}
          </Card.Text>

          <Row className="justify-content-center">
            <Col
              xs={2}
              className="d-flex d-none d-md-block align-content-center"
            >
              <div className="align-content-center">
                <Card.Img
                  src={build.heroPortrait}
                  alt={build.heroName}
                  className="border"
                />
              </div>
            </Col>
            <Col xs={5}>
              <Row className="d-flex">
                <Col className=" text-center align-content-center">
                  <Badge bg="primary">MINOR</Badge>
                  <h6>{build.minorPerk.name}</h6>
                  <img
                    src={build.minorPerk.perkImage}
                    alt={build.minorPerk.name}
                  />
                </Col>
                <Col className="d-none d-md-block text-start align-content-center">
                  <h6 className="small">Descrizione Perk:</h6>
                  <p>{build.minorPerk.description}</p>
                </Col>
              </Row>
            </Col>
            <Col xs={5}>
              <Row className="d-flex">
                <Col className=" text-center align-content-center">
                  <Badge bg="primary">MAJOR</Badge>
                  <h6>{build.majorPerk.name}</h6>
                  <img
                    src={build.majorPerk.perkImage}
                    alt={build.majorPerk.name}
                  />
                </Col>
                <Col className="d-none d-md-block text-start align-content-center">
                  <h6 className="small">Descrizione Perk:</h6>
                  <p>{build.majorPerk.description}</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Card.Body>
      <Card.Footer className="small text-end bg-transparent border-0">
        {new Date(build.createdAt).toLocaleDateString()}
      </Card.Footer>
    </Card>
  );
};

export default BuildCard;
