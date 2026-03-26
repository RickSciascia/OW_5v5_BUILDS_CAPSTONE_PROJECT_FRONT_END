import { Container, Row, Col, Spinner } from "react-bootstrap";
import HeroMinCard from "./HeroMinCard";
import { useState, useEffect } from "react";

function HeroGallery() {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const endpoint = "http://localhost:3001/heroes/gallery";

  const getHeroesCard = function () {
    fetch(endpoint)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          throw new Error("Errore nella response: " + r.status);
        }
      })
      .then((data) => {
        setHeroes(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Errore nella fetch: ", e);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Overwatch Heroes Hub - Galleria";
    getHeroesCard();
  }, []);

  return (
    <>
      <Container fluid className="min-vh-100 bg-dark text-white">
        <h4 className="pt-3 text-center">
          {" "}
          Clicca su un eroe per vedere i suoi dettagli e le build della
          community!
        </h4>
        {error && (
          <Container fluid>
            <p className="text-center">
              Errore nel caricamento degli eroi! - riprova più tardi
            </p>
          </Container>
        )}
        <Row className="g-3 py-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">TANK</h2>
          </Col>
          {loading && (
            <div className="text-center text-warning">
              <Spinner animation="border" variant="warning" />
              <p>Caricamento...</p>
            </div>
          )}
          {heroes
            .filter((hero) => hero.role === "TANK")
            .map((hero) => (
              <HeroMinCard key={hero.id} hero={hero} />
            ))}
        </Row>
        <Row className="g-3 py-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">ATTACCO</h2>
          </Col>
          {loading && (
            <div className="text-center text-warning">
              <Spinner animation="border" variant="warning" />
              <p>Caricamento...</p>
            </div>
          )}
          {heroes
            .filter((hero) => hero.role === "DAMAGE")
            .map((hero) => (
              <HeroMinCard key={hero.id} hero={hero} />
            ))}
        </Row>
        <Row className="g-3 py-3 justify-content-center">
          <Col xs={12}>
            <h2 className="text-center">SUPPORTO</h2>
          </Col>
          {loading && (
            <div className="text-center text-warning">
              <Spinner animation="border" variant="warning" />
              <p>Caricamento...</p>
            </div>
          )}
          {heroes
            .filter((hero) => hero.role === "SUPPORT")
            .map((hero) => (
              <HeroMinCard key={hero.id} hero={hero} />
            ))}
        </Row>
      </Container>
    </>
  );
}

export default HeroGallery;
