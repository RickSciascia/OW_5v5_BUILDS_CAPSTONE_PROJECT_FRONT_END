import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OWHubNavBar from "./components/OWHubNavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import HeroGallery from "./components/HeroGallery";

function App() {
  return (
    <>
      <BrowserRouter>
        <OWHubNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<HeroGallery />} />
          <Route path="/builds" />
          <Route path="/login" />
          <Route path="/register" />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
