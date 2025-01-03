import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import "./App.css";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="App from-gray-900 via-gray-800 to-gray-700 bg-gradient-to-br">
        <Sidebar />
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
