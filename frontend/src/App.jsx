import React, { useState } from "react";
import Aurora from "./components/Bins/background/Aurora";
import LandingSection from "./components/LandingSection";
import "./App.css";

function App() {
  const [logoUrl] = useState(
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1759137664/3_ffrpo9.png"
  );

  return (
    <div className="App">
      <Aurora
        colorStops={["#FA0370", "#FFFFFF", "#F9F30A"]}
        blend={0.0}
        amplitude={2.0}
        speed={0.5}
      />
      <LandingSection logoUrl={logoUrl} />
    </div>
  );
}

export default App;
