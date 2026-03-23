import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Form } from "react-bootstrap";
import WeaponCard from "./WeaponCard";
import SkillCard from "./SkillCard";
import UltimateCard from "./UltimateCard";
import PassiveCard from "./PassiveCard";
import PerkCard from "./PerkCard";
import BuildCard from "./BuildCard";

import { useSelector } from "react-redux";

function HeroDetailsPage() {
  // Hero
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Build
  const [builds, setBuilds] = useState([]);
  const [loadingBuilds, setLoadingBuilds] = useState(true);

  // Form Build
  const [showForm, setShowForm] = useState(false);
  const [newBuild, setNewBuild] = useState({
    name: "",
    majorPerkId: "",
    minorPerkId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { heroId } = useParams();
  const { userLogged } = useSelector((state) => state.auth);
  const endpoint = `http://localhost:3001/heroes/${heroId}`;
  const buildsEndpoint = `http://localhost:3001/builds/hero/${heroId}`;
  const buildCreationEndpoint = "http://localhost:3001/builds";

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

  const getBuilds = function () {
    fetch(buildsEndpoint)
      .then((r) => {
        if (r.ok) return r.json();
        else throw new Error("Errore nel caricamento delle build");
      })
      .then((data) => {
        setBuilds(data.content);
      })
      .catch((e) => console.log("Errore fetch delle build: ", e))
      .finally(() => setLoadingBuilds(false));
  };

  const handleCreateBuild = function (e) {
    e.preventDefault();
    if (!newBuild.minorPerkId || !newBuild.majorPerkId) {
      alert("Seleziona entrambi i perk per poter inviare una build!");
      return;
    }

    setIsSubmitting(true);

    fetch(buildCreationEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: newBuild.name,
        heroId: hero.id,
        minorPerkId: newBuild.minorPerkId,
        majorPerkId: newBuild.majorPerkId,
      }),
    })
      .then((r) => {
        if (r.ok) {
          setNewBuild({ name: "", minorPerkId: "", majorPerkId: "" });
          setShowForm(false);
          getBuilds();
        } else throw new Error("Errore durante il salvataggio");
      })
      .catch((e) => alert(e.message))
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    getHeroDetail();
    getBuilds();
    document.title = `Overwatch Heroes Hub`;
  }, [heroId]);

  useEffect(() => {
    if (hero?.name) {
      document.title = `Overwatch Heroes Hub | ${hero.name}`;
    }
  }, [hero]);

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
                  {userLogged?.role === "ADMIN" && (
                    <Link
                      className="btn btn-outline-warning"
                      to={`/manage-heroes/${heroId}`}
                    >
                      Modifica
                    </Link>
                  )}
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
            <Row>
              <Col className=" text-center">
                {userLogged && (
                  <>
                    <h2 className="text-center mb-3">Crea la tua build!</h2>
                    <Button
                      className="mb-3"
                      variant={showForm ? "outline-light" : "warning"}
                      onClick={() => setShowForm(!showForm)}
                    >
                      {showForm ? "Annulla" : "+ Crea Nuova Build"}
                    </Button>
                  </>
                )}
              </Col>
            </Row>

            {showForm && (
              <Form
                onSubmit={handleCreateBuild}
                className="bg-dark p-4 rounded border border-secondary mb-5"
              >
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nome della Build</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        value={newBuild.name}
                        onChange={(e) =>
                          setNewBuild({ ...newBuild, name: e.target.value })
                        }
                        placeholder="Es: Aggressive Tank"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Minor Perk</Form.Label>
                      <Form.Select
                        required
                        value={newBuild.minorPerkId}
                        onChange={(e) =>
                          setNewBuild({
                            ...newBuild,
                            minorPerkId: e.target.value,
                          })
                        }
                      >
                        <option value="">Scegli...</option>
                        {hero.perks
                          .filter((p) => p.perkType === "MINOR")
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Major Perk</Form.Label>
                      <Form.Select
                        required
                        value={newBuild.majorPerkId}
                        onChange={(e) =>
                          setNewBuild({
                            ...newBuild,
                            majorPerkId: e.target.value,
                          })
                        }
                      >
                        <option value="">Scegli...</option>
                        {hero.perks
                          .filter((p) => p.perkType === "MAJOR")
                          .map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Button
                    className="w-50"
                    variant="warning"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner size="sm" animation="border" />
                    ) : (
                      "Salva Build"
                    )}
                  </Button>
                </Row>
              </Form>
            )}

            {/* Sezione Build Community */}
            <Row>
              <Col xs={12}>
                <h2 className="text-center mb-4">Build della Community</h2>
                {loadingBuilds ? (
                  <div>
                    <Spinner animation="border" variant="warning" />
                    <p>Caricamento Builds in corso...</p>
                  </div>
                ) : builds.length > 0 ? (
                  <Row>
                    {builds.map((b) => (
                      <Col xs={12} key={b.id} className="g-3">
                        <BuildCard build={b} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-center text-muted fst-italic">
                    Nessuna build disponibile per questo eroe.
                  </p>
                )}
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default HeroDetailsPage;
