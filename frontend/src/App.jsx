import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aurora from "./components/Bins/background/Aurora";
import LandingSection from "./components/pages/LandingSection";
import LoginRegister from "./components/pages/Login&Register";

function App() {
  const [logoUrl] = useState(
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759634539/Logo_arbfm1.png"
  );

  return (
    <Router>
      <div className="App">
        {/* Aurora as full background */}
        <Aurora
          colorStops={["#6a45ff", "#ff8b2d", "#32ab1f"]} // violet, orange, green
          blend={0.0}
          amplitude={2.0}
          speed={0.5}
        />

        {/* Foreground content */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingSection logoUrl={logoUrl} />} />
            <Route path="/login" element={<LoginRegister logoUrl={logoUrl} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

