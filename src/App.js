//components
import Header from "./components/Header";
import Home from "./components/Home";
import Favorite from "./components/Favorite";
import Details from "./components/Details";
//bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";

//rutiranje
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
