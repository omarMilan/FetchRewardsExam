import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Header from "./components/Header";
import LoginPage from "./Pages/LoginPage";
import MatchMePage from "./Pages/MatchMePage";
import FavoritePage from "./Pages/FavoritePage";

function App() {
  return (
    <Router>
      <div className="w-screen h-screen fixed top-0 left-0">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/match-me" element={<MatchMePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
