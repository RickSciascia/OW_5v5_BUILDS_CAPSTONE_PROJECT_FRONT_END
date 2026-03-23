import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Badge,
  Button,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { setUserAction } from "../redux/actions/index";
import BuildCard from "./BuildCard";

function ProfilePage() {
  const { userLogged } = useSelector((state) => state.auth);
  const [newUsername, setNewUsername] = useState(userLogged?.username || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setErrors] = useState("");
  const dispatch = useDispatch();

  // MY BUILDS
  const [myBuilds, setMyBuilds] = useState([]);
  const [loadingBuilds, setLoadingBuilds] = useState(true);
  const myBuildsEndpoint = "http://localhost:3001/builds/me";
  // PAGINAZIONE BUILD
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const getMyBuilds = function (pageNumber = 0, append = false) {
    if (append) setLoadingMore(true);
    else setLoadingBuilds(true);

    fetch(`${myBuildsEndpoint}?page=${pageNumber}&size=3`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((r) => {
        if (r.ok) return r.json();
        else throw new Error("Errore nel caricamento delle build utente");
      })
      .then((data) => {
        if (append) {
          setMyBuilds((prev) => [...prev, ...data.content]);
        } else {
          setMyBuilds(data.content);
        }
        setIsLastPage(data.last);
        setPage(data.number);
      })
      .catch((e) => console.log("Errore fetch delle build utente: ", e))
      .finally(() => {
        setLoadingBuilds(false);
        setLoadingMore(false);
      });
  };

  const handleDelete = function (buildId) {
    const buildDeleteEndpoint = `http://localhost:3001/builds/${buildId}`;
    if (window.confirm("Sei sicuro di voler eliminare questa build?")) {
      fetch(buildDeleteEndpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((r) => {
          if (r.ok) {
            setMyBuilds((prev) => prev.filter((b) => b.id !== buildId));
          } else throw new Error("Errore durante l'eliminazione della build!");
        })
        .catch((e) => alert(e.message));
    }
  };

  const handleUsernamePatch = function (e) {
    e.preventDefault();
    setIsUpdating(true);

    const endpoint = "http://localhost:3001/users/me";
    const token = localStorage.getItem("token");

    fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: newUsername }),
    })
      .then(async (r) => {
        if (r.ok) return r.json();
        else {
          const errorData = await r.json();
          throw new Error(
            errorData.message || "Errore durante l'aggiornamento",
          );
        }
      })
      .then((updatedUser) => {
        dispatch(setUserAction(updatedUser));
        setIsEditing(false);
        alert("Username aggiornato con successo!");
      })
      .catch((e) => {
        setErrors(e.message);
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  useEffect(() => {
    if (userLogged) {
      document.title = `Overwatch Heroes Hub | Profilo di ${userLogged.username}`;
    }
  }, [userLogged]);

  useEffect(() => {
    const initPage = async () => {
      try {
        getMyBuilds(0, false);
      } catch (err) {
        console.error("Errore inizializzazione: ", err);
      }
    };

    initPage();
  }, []);

  return (
    <Container fluid className="p-3 bg-dark text-white min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Row>
            <Col xs={12} md={4} className="text-center d-md-none">
              <img src={userLogged.image} className="w-50 rounded-circle" />
            </Col>
            <Col xs={12} md={4} className="text-end d-none d-md-block">
              <img src={userLogged.image} className="w-50 rounded-circle" />
            </Col>
            <Col xs={12} md={8} className="align-content-center">
              {error && (
                <Alert type="invalid" className="d-block">
                  {error}
                </Alert>
              )}
              {isEditing ? (
                <Form
                  onSubmit={handleUsernamePatch}
                  className="d-flex align-items-center gap-2 mb-2"
                >
                  <Form.Control
                    type="text"
                    isInvalid={!!error}
                    value={newUsername}
                    onChange={(e) => {
                      setNewUsername(e.target.value);
                      if (error) setErrors("");
                    }}
                    autoFocus
                  />
                  <Button variant="success" type="submit" disabled={isUpdating}>
                    {isUpdating ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Salva"
                    )}
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors("");
                    }}
                  >
                    X
                  </Button>
                </Form>
              ) : (
                <>
                  <h1>Profilo di {userLogged.username}</h1>
                  <Button
                    variant="warning"
                    onClick={() => {
                      setNewUsername(userLogged.username);
                      setIsEditing(true);
                    }}
                  >
                    Modifica Username
                  </Button>
                </>
              )}

              <h3>
                <Badge bg="info">{userLogged.role}</Badge>
              </h3>
              <h6>Email: {userLogged.email}</h6>
            </Col>
          </Row>
          <h3 className="text-center">Le tue build</h3>
          {loadingBuilds ? (
            <div className="text-center">
              <Spinner animation="border" variant="warning" />
              <p>Caricamento Build di {userLogged.username}...</p>
            </div>
          ) : myBuilds.length > 0 ? (
            <>
              <Row>
                {myBuilds.map((b) => (
                  <Col xs={12} key={b.id} className="g-3">
                    <BuildCard
                      build={b}
                      onDelete={handleDelete}
                      canDelete={true}
                    />
                  </Col>
                ))}
              </Row>
              {!isLastPage && myBuilds.length > 0 && (
                <Row className="justify-content-center mt-4">
                  <Col xs="auto">
                    <Button
                      variant="outline-warning"
                      disabled={loadingMore}
                      onClick={() => getMyBuilds(page + 1, true)}
                    >
                      {loadingMore ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Caricamento...
                        </>
                      ) : (
                        "Carica Altre Build"
                      )}
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          ) : (
            <p className="text-center">
              Non hai ancora creato nessuna build. Vai nella galleria Eroi e
              creane una per visualizzarle qui!
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
