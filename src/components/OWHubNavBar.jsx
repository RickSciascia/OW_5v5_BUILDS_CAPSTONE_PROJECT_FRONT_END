import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions";

function OWHubNavBar() {
  const { userLogged } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  return (
    <Navbar expand="md" bg="warning" data-bs-theme="light" fixed="top">
      <Container fluid>
        <Navbar.Toggle aria-controls="main-menu" />
        <Link to="/" className="navbar-brand">
          Overwatch Heroes Hub
        </Link>
        <Navbar.Collapse id="main-menu">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/gallery">
              Galleria Eroi
            </Link>
            {/* <Link className="nav-link" to="">
              Build Eroi
            </Link> */}
            {userLogged?.role === "ADMIN" && (
              <Link className="nav-link" to="/manage-heroes">
                Gestione Eroi
              </Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {userLogged ? (
              // LOGGATO
              <NavDropdown
                title={
                  <span>
                    <img
                      src={`${userLogged.image}`}
                      alt="profile"
                      className="rounded-circle me-2 navbar-profile-pic"
                    />
                    {userLogged.username}
                  </span>
                }
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item as={Link} to="/profile">
                  Il mio profilo
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="fw-bold">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // NON LOGGATO
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Registrati
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default OWHubNavBar;
