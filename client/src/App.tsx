import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App from-gray-900 via-gray-800 to-gray-700 bg-gradient-to-br">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
