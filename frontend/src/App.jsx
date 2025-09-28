import React, { useState } from "react";
import Aurora from "./components/Bins/Aurora";
import LandingSection from "./components/LandingSection";
import "./App.css";

function App() {
  const [logoUrl, setLogoUrl] = useState(
    "https://res.cloudinary.com/demo/image/upload/t_logo.png"
  );

  // function to update logo dynamically
  const updateLogo = (newUrl) => {
    setLogoUrl(newUrl);
  };

  return (
    <div className="App">
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />
      <LandingSection logoUrl={logoUrl} />
    </div>
  );
}

export default App;
