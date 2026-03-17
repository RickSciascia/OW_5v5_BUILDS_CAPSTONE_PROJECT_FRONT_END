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

function App() {
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
          <Route path="/register" />
          <Route path="/manage-heroes" element={<ManageHeroes />} />
          <Route path="/manage-heroes/:heroId" element={<ManageHeroes />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
