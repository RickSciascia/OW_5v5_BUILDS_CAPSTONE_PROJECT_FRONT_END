import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const endpoint = "http://localhost:3001/auth/login";
  function login(e) {
    e.preventDefault();
    console.log("Invio i dati al server");
    setLoading(true);

    fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => {
        if (r.ok) return r.json();
        if (r.status === 401) throw new Error("Credenziali errate");
        else throw new Error("Errore nella response: " + r.status);
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.accessToken);
        dispatch(loginAction(data));
        navigate("/");
      })
      .catch((e) => {
        console.log("Errore :", e);
        setLoading(false);
        setError(e.message);
      });
  }

  useEffect(() => {
    document.title = "Overwatch Heroes Hub | Accedi";
  }, []);

  return (
    <Form onSubmit={login}>
      <h2 className="pt-0 text-center">Accedi</h2>
      <p className="text-center fs-5">
        Non hai un account?{" "}
        <Link className="text-white" to={"/register"}>
          Registrati
        </Link>
      </p>
      {error && (
        <Alert variant="danger" className="py-3 text-center">
          {error}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Inserisci l'email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button
        variant="warning"
        type="submit"
        className="w-100 fw-bold"
        disabled={loading}
      >
        {loading ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" />
            Verifica...
          </>
        ) : (
          "Accedi"
        )}
      </Button>
    </Form>
  );
}

export default LoginForm;
