import { useEffect, useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function HeroForm() {
  const [heroData, setHeroData] = useState({
    name: "",
    role: "TANK",
    hp: 225,
    health: 225,
    shield: 0,
    armor: 0,
    image: "",
    portraitImage: "",
    weapons: [],
    skills: [],
    perks: [],
    ultimates: [],
    passive: [],
  });
  const [errors, setErrors] = useState({ message: "", list: [] });
  const navigate = useNavigate();
  const { heroId } = useParams();
  const isEditMode = !!heroId;
  const token = useSelector((state) => state.auth.token);

  const [databasePassive, setDatabasePassive] = useState([]);

  const getPassive = () => {
    const endpointPassive = "http://localhost:3001/passive";
    fetch(endpointPassive, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => {
        if (r.ok) return r.json();
        else throw new Error("Errore nella response: " + r.status);
      })
      .then((data) => {
        setDatabasePassive(data);
      })
      .catch((e) => {
        console.log("Errore nella fetch passive: ", e);
      });
  };

  const getHeroToEdit = () => {
    const endpointHero = `http://localhost:3001/heroes/${heroId}`;
    fetch(endpointHero)
      .then((r) => {
        if (r.ok) return r.json();
        throw new Error("Eroe non trovato");
      })
      .then((data) => {
        setHeroData(data);
      })
      .catch((err) => console.log("Errore nel recupero eroe: ", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData({ ...heroData, [name]: value });
  };

  const addWeapon = () => {
    setHeroData({
      ...heroData,
      weapons: [
        ...heroData.weapons,
        {
          name: "",
          description: "",
          maxDmg: 0,
          minDmg: 0,
          weaponType: "HITSCAN",
          weaponImage: "",
        },
      ],
    });
  };

  const addSkill = () => {
    setHeroData({
      ...heroData,
      skills: [
        ...heroData.skills,
        {
          name: "",
          description: "",
          damage: 0,
          healing: 0,
          duration: 0,
          cooldown: 0,
          range: 0,
          skillImage: "",
        },
      ],
    });
  };

  const addPerk = () => {
    setHeroData({
      ...heroData,
      perks: [
        ...heroData.perks,
        {
          name: "",
          description: "",
          perkType: "MINOR",
          perkImage: "",
        },
      ],
    });
  };

  const addUltimate = () => {
    setHeroData({
      ...heroData,
      ultimates: [
        ...heroData.ultimates,
        {
          name: "",
          description: "",
          damage: 0,
          healing: 0,
          duration: 0,
          range: 0,
          cost: 280,
          ultimateImage: "",
        },
      ],
    });
  };

  const addPassive = () => {
    setHeroData({
      ...heroData,
      passive: [
        ...heroData.passive,
        {
          name: "",
          description: "",
          passiveImage: "",
        },
      ],
    });
  };

  const removeWeapon = (index) => {
    const filteredWeapons = heroData.weapons.filter((_, i) => i !== index);
    setHeroData({
      ...heroData,
      weapons: filteredWeapons,
    });
  };

  const removeSkill = (index) => {
    const filteredSkills = heroData.skills.filter((_, i) => i !== index);
    setHeroData({
      ...heroData,
      skills: filteredSkills,
    });
  };

  const removePerk = (index) => {
    const filteredPerks = heroData.perks.filter((_, i) => i !== index);
    setHeroData({
      ...heroData,
      perks: filteredPerks,
    });
  };

  const removeUltimate = (index) => {
    const filteredUltimates = heroData.ultimates.filter((_, i) => i !== index);
    setHeroData({
      ...heroData,
      ultimates: filteredUltimates,
    });
  };

  const removePassive = (index) => {
    const filteredPassive = heroData.passive.filter((_, i) => i !== index);
    setHeroData({
      ...heroData,
      passive: filteredPassive,
    });
  };

  const handleWeaponChange = (index, e) => {
    const { name, value } = e.target;
    const newWeapon = [...heroData.weapons];
    newWeapon[index][name] = value;
    setHeroData({
      ...heroData,
      weapons: newWeapon,
    });
  };

  const handleSkillChange = (index, e) => {
    const { name, value } = e.target;
    const newSkill = [...heroData.skills];
    newSkill[index][name] = value;
    setHeroData({
      ...heroData,
      skills: newSkill,
    });
  };

  const handlePerkChange = (index, e) => {
    const { name, value } = e.target;
    const newPerk = [...heroData.perks];
    newPerk[index][name] = value;
    setHeroData({
      ...heroData,
      perks: newPerk,
    });
  };

  const handleUltimateChange = (index, e) => {
    const { name, value } = e.target;
    const newUltimate = [...heroData.ultimates];
    newUltimate[index][name] = value;
    setHeroData({
      ...heroData,
      ultimates: newUltimate,
    });
  };

  const handlePassiveChange = (index, e) => {
    const { name, value } = e.target;
    const newPassive = [...heroData.passive];
    newPassive[index][name] = value;
    setHeroData({
      ...heroData,
      passive: newPassive,
    });
  };

  const handlePassiveSelect = (index, e) => {
    const selectedId = e.target.value;
    const newPassiveList = [...heroData.passive];

    if (selectedId === "") {
      newPassiveList[index] = {
        id: null,
        name: "",
        description: "",
        passiveImage: "",
      };
    } else {
      const selected = databasePassive.find(
        (dbp) => dbp.id === parseInt(selectedId),
      );
      newPassiveList[index] = { ...selected };
    }
    setHeroData({ ...heroData, passive: newPassiveList });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({ message: "", list: [] });

    const heroDTO = {
      ...heroData,
      hp: Number(heroData.hp),
      health: Number(heroData.health),
      shield: Number(heroData.shield),
      armor: Number(heroData.armor),

      weapons: heroData.weapons.map((weapon) => ({
        ...weapon,
        maxDmg: Number(weapon.maxDmg),
        minDmg: Number(weapon.minDmg),
      })),

      skills: heroData.skills.map((skill) => ({
        ...skill,
        damage: Number(skill.damage),
        healing: Number(skill.healing),
        duration: Number(skill.duration),
        cooldown: Number(skill.cooldown),
        range: Number(skill.range),
      })),

      perks: heroData.perks,

      ultimates: heroData.ultimates.map((ultimate) => ({
        ...ultimate,
        damage: Number(ultimate.damage),
        healing: Number(ultimate.healing),
        duration: Number(ultimate.duration),
        range: Number(ultimate.range),
        cost: Number(ultimate.cost),
      })),

      passive: heroData.passive,
    };

    const endpoint = isEditMode
      ? `http://localhost:3001/heroes/${heroId}`
      : "http://localhost:3001/heroes";

    const method = isEditMode ? "PUT" : "POST";

    fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(heroDTO),
    })
      .then(async (r) => {
        if (r.ok) {
          alert(isEditMode ? "Eroe aggiornato" : "Eroe salvato correttamente!");
          navigate("/gallery");
        } else {
          const response = await r.json();
          if (response.errorsList) {
            setErrors({ list: response.errorsList, message: response.message });
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setErrors({ message: response.message });
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      })
      .catch((e) => {
        console.log("Errore nel salvataggio eroe: ", e);
        alert(e.message);
      });
  };

  useEffect(() => {
    getPassive();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      getHeroToEdit();
    }
  }, [heroId, isEditMode]);

  useEffect(() => {
    if (isEditMode && heroData.name) {
      document.title = `Overwatch Heroes Hub | Modifica ${heroData.name}`;
    } else {
      document.title = `Overwatch Heroes Hub | Crea Nuovo Eroe`;
    }
  }, [heroData.name, isEditMode]);

  return (
    <>
      {errors.message && (
        <Alert variant="danger">
          {errors.message}
          {errors.list && errors.list.length > 0 && (
            <ul className="mt-2 mb-0">
              {errors.list.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          )}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <h3>Informazioni Base Eroe:</h3>
        <Row>
          <Col xs={12} sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Nome Eroe</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="name"
                type="text"
                value={heroData.name}
                placeholder="es. D.va"
                required
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Ruolo: </Form.Label>
              <Form.Select
                onChange={handleChange}
                name="role"
                value={heroData.role}
                required
                aria-label="Ruolo Eroe"
              >
                <option>Seleziona il ruolo dell'eroe!</option>
                <option value="TANK">Tank</option>
                <option value="DAMAGE">Attacco</option>
                <option value="SUPPORT">Supporto</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>HP</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="hp"
                type="number"
                value={heroData.hp}
                required
                placeholder="inserisci i punti vita totali dell'eroe"
                min={1}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salute</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="health"
                type="number"
                required
                value={heroData.health}
                placeholder="inserisci i punti salute dell'eroe"
                min={1}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Scudi</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="shield"
                type="number"
                required
                value={heroData.shield}
                placeholder="inserisci i punti scudo dell'eroe"
                min={0}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Armatura</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="armor"
                type="number"
                required
                value={heroData.armor}
                placeholder="inserisci i punti armatura dell'eroe"
                min={0}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Immagine Eroe</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="image"
            type="text"
            required
            value={heroData.image}
            placeholder="inserisci il link della risorsa"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Immagine Ritratto Eroe</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="portraitImage"
            type="text"
            required
            value={heroData.portraitImage}
            placeholder="inserisci il link della risorsa"
          />
        </Form.Group>
        <h3>Armi:</h3>
        {heroData.weapons.map((weapon, index) => (
          <div
            key={index}
            className="p-3 mb-3 border rounded position-relative"
          >
            {heroData.weapons.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => removeWeapon(index)}
              >
                X
              </Button>
            )}

            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Nome Arma</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Cannoni a fusione"
                    type="text"
                    name="name"
                    required
                    value={weapon.name}
                    onChange={(e) => handleWeaponChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Tipologia Arma:</Form.Label>
                  <Form.Select
                    className="mb-2"
                    placeholder="Tipologia Arma"
                    type="text"
                    required
                    name="weaponType"
                    value={weapon.weaponType}
                    onChange={(e) => handleWeaponChange(index, e)}
                  >
                    <option>Seleziona la tipologia di arma!</option>
                    <option value="HITSCAN">Hitscan</option>
                    <option value="PROJECTILE">Projectile</option>
                    <option value="MELEE">Corpo a corpo</option>
                    <option value="BEAM">Raggio</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12} sm={12}>
                <Form.Group>
                  <Form.Label>Descrizione Arma</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Armi automatiche a corto raggio e ampia rosata."
                    as="textarea"
                    required
                    rows={2}
                    name="description"
                    value={weapon.description}
                    onChange={(e) => handleWeaponChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Danni Massimi</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="number"
                    required
                    min={0}
                    step="any"
                    name="maxDmg"
                    value={weapon.maxDmg}
                    onChange={(e) => handleWeaponChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Danni Minimi</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="number"
                    required
                    min={0}
                    step="any"
                    name="minDmg"
                    value={weapon.minDmg}
                    onChange={(e) => handleWeaponChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Immagine Arma</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    required
                    placeholder="inserisci il link della risorsa"
                    name="weaponImage"
                    value={weapon.weaponImage}
                    onChange={(e) => handleWeaponChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-warning" onClick={addWeapon}>
          + Aggiungi Arma
        </Button>

        <h3>Abilità:</h3>
        {heroData.skills.map((skill, index) => (
          <div
            key={index}
            className="p-3 mb-3 border rounded position-relative"
          >
            {heroData.skills.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => removeSkill(index)}
              >
                X
              </Button>
            )}
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Nome abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Matrice Difensiva"
                    type="text"
                    required
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Tempo di recupero abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="Tempo di recupero in secondi"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="cooldown"
                    value={skill.cooldown}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12}>
                <Form.Group>
                  <Form.Label>Descrizione abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Blocca i proiettili nell area frontale"
                    as="textarea"
                    required
                    rows={2}
                    name="description"
                    value={skill.description}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Danni abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="numero di danni abilità se fa danni"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="damage"
                    value={skill.damage}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Cure abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="numero di cure abilità se può curare"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="healing"
                    value={skill.healing}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Durata abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="Tempo di durata dell'abilità in secondi"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="duration"
                    value={skill.duration}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Range abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="Raggio di azione abilità"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="range"
                    value={skill.range}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} sm={12}>
                <Form.Group>
                  <Form.Label>Immagine abilità</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="inserisci il link alla risorsa"
                    type="text"
                    required
                    name="skillImage"
                    value={skill.skillImage}
                    onChange={(e) => handleSkillChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-warning" onClick={addSkill}>
          + Aggiungi Abilità
        </Button>

        <h3>Perks:</h3>
        {heroData.perks.map((perk, index) => (
          <div
            key={index}
            className="p-3 mb-3 border rounded position-relative"
          >
            {heroData.perks.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => removePerk(index)}
              >
                X
              </Button>
            )}
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Nome perk</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Potere del coniglio"
                    type="text"
                    required
                    name="name"
                    value={perk.name}
                    onChange={(e) => handlePerkChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Tipo di perk</Form.Label>
                  <Form.Select
                    className="mb-2"
                    placeholder="Tipologia di perk"
                    required
                    onChange={(e) => handlePerkChange(index, e)}
                    name="perkType"
                    value={perk.perkType}
                  >
                    <option>Seleziona il tipo di perk</option>
                    <option value="MINOR">Minore</option>
                    <option value="MAJOR">Maggiore</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Descrizione Perk</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Espulsione! fornisce 75 salute extra temporanea e l'area di danno di Richiama Mech aumenta del 50%."
                    as="textarea"
                    required
                    rows={2}
                    name="description"
                    value={perk.description}
                    onChange={(e) => handlePerkChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Immagine perk</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="inserisci il link alla risorsa"
                    type="text"
                    required
                    name="perkImage"
                    value={perk.perkImage}
                    onChange={(e) => handlePerkChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-warning" onClick={addPerk}>
          + Aggiungi Perk
        </Button>

        <h3>Ultimate:</h3>
        {heroData.ultimates.map((ultimate, index) => (
          <div
            key={index}
            className="p-3 mb-3 border rounded position-relative"
          >
            {heroData.ultimates.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => removeUltimate(index)}
              >
                X
              </Button>
            )}
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Nome ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Autodistruzione"
                    type="text"
                    required
                    name="name"
                    value={ultimate.name}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Costo ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="inserisci il costo della ultimate"
                    type="number"
                    required
                    name="cost"
                    value={ultimate.cost}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Descrizione Ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="es. Ti catapulti fuori dal mech, sovraccaricandolo e causandone l'esplosione poco dopo."
                    as="textarea"
                    required
                    rows={2}
                    name="description"
                    value={ultimate.description}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Danni ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="numero di danni ultimate se fa danni"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="damage"
                    value={ultimate.damage}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Cure ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="numero di cure ultimate se può curare"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="healing"
                    value={ultimate.healing}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Durata ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="Tempo di durata dell'ultimate in secondi"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="duration"
                    value={ultimate.duration}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <Form.Label>Range ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    placeholder="Raggio di azione ultimate"
                    type="number"
                    required
                    step="any"
                    min={0}
                    name="range"
                    value={ultimate.range}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Immagine ultimate</Form.Label>
                  <Form.Control
                    className="mb-2"
                    type="text"
                    required
                    placeholder="inserisci il link della risorsa"
                    name="ultimateImage"
                    value={ultimate.ultimateImage}
                    onChange={(e) => handleUltimateChange(index, e)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-warning" onClick={addUltimate}>
          + Aggiungi Ultimate
        </Button>

        <h3>Passive:</h3>
        {heroData.passive.map((passive, index) => (
          <div
            key={index}
            className="p-3 mb-3 border rounded position-relative"
          >
            {heroData.passive.length > 1 && (
              <Button
                variant="outline-danger"
                size="sm"
                className="position-absolute top-0 end-0 m-2"
                onClick={() => removePassive(index)}
              >
                X
              </Button>
            )}
            <Row>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Seleziona una passiva esistente</Form.Label>
                  <Form.Select
                    onChange={(e) => handlePassiveSelect(index, e)}
                    value={passive.id || ""}
                  >
                    <option value="">Crea nuova o seleziona</option>
                    {databasePassive.map((dbp) => (
                      <option key={dbp.id} value={dbp.id}>
                        {dbp.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Nome passiva (nuova)</Form.Label>
                  <Form.Control
                    name="name"
                    required
                    value={passive.name}
                    onChange={(e) => handlePassiveChange(index, e)}
                    placeholder="es. Espulsione!"
                    disabled={!!passive.id}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Descrizione passiva (nuova)</Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    required
                    rows={2}
                    value={passive.description}
                    onChange={(e) => handlePassiveChange(index, e)}
                    placeholder="es. Ti catapulti fuori dal mech quando viene distrutto.!"
                    disabled={!!passive.id}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Immagine passiva (nuova)</Form.Label>
                  <Form.Control
                    name="passiveImage"
                    required
                    value={passive.passiveImage}
                    onChange={(e) => handlePassiveChange(index, e)}
                    placeholder="inserisci il link della risorsa"
                    disabled={!!passive.id}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        ))}
        <Button variant="outline-warning" onClick={addPassive}>
          + Aggiungi Passiva
        </Button>

        <div className="pt-3">
          <Button variant="warning" type="submit">
            SALVA
          </Button>
        </div>
      </Form>
    </>
  );
}

export default HeroForm;
