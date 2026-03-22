import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OWHubNavBar from "./components/OWHubNavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import HeroGallery from "./components/HeroGallery";
import HeroDetailsPage from "./components/HeroDetailsPage";
import LoginPage from "./components/LoginPage";
import ManageHeroes from "./components/ManageHeroes";
import ScrollToTop from "./components/ScrollToTop";
import { Spinner, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setUserAction } from "./redux/actions";
import ProtectedRoute from "./components/ProtectedRoute";
import RegistrationPage from "./components/RegistrationPage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const dispatch = useDispatch();

  const getMyProfile = (token) => {
    const endpoint = "http://localhost:3001/users/me";
    return fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (r.ok) return r.json();
        else throw new Error("Token scaduto o non valido");
      })
      .then((userData) => {
        console.log(userData);
        dispatch(setUserAction(userData));
      })
      .catch((err) => {
        console.error("Errore Fetch Profile: ", err);
        localStorage.removeItem("token");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   getMyProfile(token).finally(() => setInitialLoading(false));
    // } else {
    //   setInitialLoading(false);
    // }

    const initializeApp = async () => {
      try {
        if (token) {
          await getMyProfile(token);
        }
      } catch (err) {
        console.log("Errore inizializzazione App: ", err);
      } finally {
        setInitialLoading(false);
      }
    };

    initializeApp();
  }, [dispatch]);

  if (initialLoading) {
    return (
      <>
        <Container fluid className="text-center">
          <Spinner animation="border" />
          <p>Caricamento in corso...</p>
        </Container>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <OWHubNavBar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<HeroGallery />} />
          <Route path="/gallery/heroes/:heroId" element={<HeroDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roleRequired={"USER"}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-heroes"
            element={
              <ProtectedRoute roleRequired={"ADMIN"}>
                <ManageHeroes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-heroes/:heroId"
            element={
              <ProtectedRoute roleRequired={"ADMIN"}>
                <ManageHeroes />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
