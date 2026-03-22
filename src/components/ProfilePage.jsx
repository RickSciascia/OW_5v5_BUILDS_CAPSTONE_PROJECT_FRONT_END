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

function ProfilePage() {
  const { userLogged } = useSelector((state) => state.auth);
  const [newUsername, setNewUsername] = useState(userLogged?.username || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setErrors] = useState("");
  const dispatch = useDispatch();
  // const navigate = useNavigate();

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

  return (
    <Container fluid className="p-3 bg-dark text-white min-vh-100">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Row>
            <Col xs={12} md={4} className="text-end">
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
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
