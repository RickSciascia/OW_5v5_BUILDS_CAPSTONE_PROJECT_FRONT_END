import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import OWHubNavBar from "./components/OWHubNavBar";

function App() {
  return (
    <>
      <head>
        <title>Overwatch Heroes Hub</title>
      </head>
      <BrowserRouter>
        <OWHubNavBar />
        <Routes>
          <Route path="/" />
          <Route path="/gallery" />
          <Route path="/builds" />
          <Route path="/login" />
          <Route path="/register" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
