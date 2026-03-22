import { useState, useEffect } from "react";
import { Alert, Spinner, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function RegistrationForm() {
  const [regData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    if (regData.password !== regData.confirmPassword) {
      setErrors(["Le password inserite non coincidono"]);
      setLoading(false);
      return;
    }

    const endpoint = "http://localhost:3001/auth/register";

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: regData.username,
        email: regData.email,
        password: regData.password,
      }),
    })
      .then(async (r) => {
        if (r.ok) {
          alert(
            "Registrazione effettuata con successo! Ora puoi effettuare il login!",
          );
          navigate("/login");
        } else {
          const response = await r.json();
          if (response.errorsList && response.errorsList.length > 0) {
            setErrors(response.errorsList);
          } else {
            setErrors([
              response.message ||
                "Si è verificato un errore in fase di registrazione!",
            ]);
          }
        }
      })
      .catch((err) => {
        console.error("Errore di rete: ", err);
        setErrors(["Impossibile connettersi al server. Riprova più tardi"]);
      })
      .finally(() => {
        setLoading(false);
        window.scroll({ top: 0, behavior: "smooth" });
      });
  };

  useEffect(() => {
    document.title = "Overwatch Heroes Hub | Registrati";
  }, []);

  return (
    <>
      {errors.length > 0 && (
        <Alert>
          <Alert.Heading>Attenzione!</Alert.Heading>
          <ul className="mb-0">
            {errors.map((errore, index) => (
              <li key={index}>{errore}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form onSubmit={handleRegister}>
        <h2 className="pt-3 text-center">Registrati</h2>
        <p className="text-center fs-5">
          Hai già un account?{" "}
          <Link className="text-white" to={"/login"}>
            Esegui il login
          </Link>
        </p>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            required
            value={regData.username}
            onChange={(e) =>
              setRegData({ ...regData, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={regData.email}
            onChange={(e) => setRegData({ ...regData, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={regData.password}
            onChange={(e) =>
              setRegData({ ...regData, password: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Conferma Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={regData.confirmPassword}
            onChange={(e) =>
              setRegData({ ...regData, confirmPassword: e.target.value })
            }
          />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          className="w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" animation="border" className="me-2" />
              Invio dei dati...
            </>
          ) : (
            "Registrati"
          )}
        </Button>
      </Form>
    </>
  );
}

export default RegistrationForm;
