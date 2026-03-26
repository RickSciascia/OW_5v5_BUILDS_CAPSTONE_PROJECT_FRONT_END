import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "../redux/actions";
import logoImage from "../assets/logo-ow-black-2.png";

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
          <img src={logoImage} className="img-logo" />
        </Link>
        <Navbar.Collapse id="main-menu">
          <Nav className="me-auto">
            <Link className="nav-link fw-bold" to="/">
              <i className="bi bi-house-fill pe-1"></i>
              Home
            </Link>
            <Link className="nav-link fw-bold" to="/gallery">
              <i className="bi bi-person-square pe-1"></i>
              Galleria Eroi
            </Link>
            {/* <Link className="nav-link" to="">
              Build Eroi
            </Link> */}
            {userLogged?.role === "ADMIN" && (
              <Link className="nav-link fw-bold" to="/manage-heroes">
                <i className="bi bi-person-plus-fill pe-1"></i>
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
                  <i className="bi bi-person-circle pe-1"></i>
                  Il mio profilo
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className="fw-bold">
                  <i className="bi bi-box-arrow-right pe-1"></i>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // NON LOGGATO
              <>
                <Link to="/login" className="nav-link fw-bold">
                  <i className="bi bi-box-arrow-in-right pe-1"></i>
                  Login
                </Link>
                <Link to="/register" className="nav-link fw-bold">
                  <i className="bi bi-pencil-square pe-1"></i>
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
