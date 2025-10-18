import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aurora from "./components/bins/background/Aurora";
import LandingSection from "./components/pages/LandingSection";
import LoginRegister from "./components/pages/Login&Register";
import FrontPage from "./components/pages/FrontPage";
import GuestGame from './components/pages/GuestGame';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Leaderboards';

// Inside your Routes:
<Route path="/leaderboard" element={<Leaderboard />} />


function App() {
  const [logoUrl] = useState(
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759670092/Logo_urcuji.png"
  );

    const [consoleUrl] = useState (
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1760238483/controller_rgpxgl.png"
  );

  return (
    <Router>
      <div className="App">
        {/* Aurora as full background */}
        <Aurora
          colorStops={["#FF1414", "#FFFFFF", "#0029FF"]} // violet, orange, green
          blend={0.0}
          amplitude={2.0}
          speed={0.5}
        />

        {/* Foreground content */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingSection logoUrl={logoUrl} consoleUrl={consoleUrl} />} />
            <Route path="/login" element={<LoginRegister logoUrl={logoUrl} />} />
            <Route path="/lessons" element={<FrontPage />} />
            <Route path="/guest-game" element={<GuestGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboards" element={<Leaderboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;