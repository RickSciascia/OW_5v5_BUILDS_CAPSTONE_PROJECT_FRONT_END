import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import WeaponCard from "./WeaponCard";
import SkillCard from "./SkillCard";
import UltimateCard from "./UltimateCard";
import PassiveCard from "./PassiveCard";
import PerkCard from "./PerkCard";

function HeroDetailsPage() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { heroId } = useParams();
  const endpoint = `http://localhost:3001/heroes/${heroId}`;

  const getHeroDetail = function () {
    fetch(endpoint)
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else throw new Error("Errore nella response : " + r.status);
      })
      .then((data) => {
        console.log(data);
        setHero(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Errore nella fetch: ", e);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    getHeroDetail();
    document.title = `Overwatch Heroes Hub`;
  }, [heroId]);

  useEffect(() => {
    if (hero?.name) {
      document.title = `Overwatch Heroes Hub | ${hero.name}`;
    }
  });

  return (
    <>
      <Container fluid className="p-3 bg-dark text-white min-vh-100">
        {error && (
          <Container fluid>
            <p className="text-center">
              Errore nel caricamento dell'Eroe! - riprova più tardi
            </p>
          </Container>
        )}
        {!loading && hero && (
          <>
            <Row className="pb-4 border-bottom">
              <Col xs={12} md={6} lg={4}>
                <h1 className="display-4 fw-bold text-uppercase">
                  {hero.name}
                </h1>
                <div>
                  <span className="badge bg-primary fs-5 mb-3">
                    {hero.role}
                  </span>
                </div>
                <div className="text-center">
                  <img
                    src={hero.image}
                    alt={hero.name}
                    className="img-fluid rounded mb-3 hero-image"
                  />
                </div>

                <div className="p-3 bg-dark text-white rounded">
                  <h3 className="pb-3 border-bottom">Statistiche Eroe:</h3>
                  <h5 className="my-1"> HP: {hero.hp}</h5>
                  <h6 className="my-1"> Salute: {hero.health}</h6>
                  <h6 className="my-1">
                    {hero.shield > 0 ? `Scudi: ${hero.shield}` : null}
                  </h6>
                  <h6 className="mb-1">
                    {hero.armor > 0 ? `Armatura: ${hero.armor}` : null}
                  </h6>
                </div>
              </Col>

              <Col xs={12} md={6} lg={4}>
                <h3 className="border-bottom pb-2">Armi & Ultimate</h3>
                <h5>Armi</h5>
                {hero.weapons.map((w) => (
                  <WeaponCard key={w.id} weapon={w} />
                ))}
                <h5 className="pt-2">Ultimate :</h5>
                {hero.ultimates.map((u) => (
                  <UltimateCard key={u.id} ultimate={u} />
                ))}
              </Col>

              <Col xs={12} md={12} lg={4}>
                <h3 className="border-bottom pb-2">Abilità & Passive</h3>
                <h5>Abilità</h5>
                {hero.skills.map((s) => (
                  <SkillCard key={s.id} skill={s} />
                ))}
                <h5 className="pt-2">Passive:</h5>
                {hero.passive.map((p) => (
                  <PassiveCard key={p.id} passive={p} />
                ))}
              </Col>
              <Col xs={12} md={12} lg={4}></Col>
            </Row>
            <Row>
              <h3 className="pt-2">Perks :</h3>
              {hero.perks.map((p) => (
                <Col xs={12} md={6} lg={3} key={p.id}>
                  <PerkCard perk={p} />
                </Col>
              ))}
            </Row>

            <hr className="my-5" />

            {/* Sezione Build Community */}
            <Row>
              <Col xs={12}>
                <h2 className="text-center mb-4">Build della Community</h2>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default HeroDetailsPage;
