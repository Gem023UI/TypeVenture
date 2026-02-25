import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { fetchAllGames } from "../../api/games.js";
import Loader from "../layout/Loader";
import "./GamesGrid.css";

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVerified, setIsVerified] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchAllGames();
      setGames(data);
      setIsVerified(true);
    } catch (err) {
      console.error("Error loading games:", err);
      
      // Handle email verification error
      if (err.status === 403 && err.isVerified === false) {
        setIsVerified(false);
        setError(err.message);
      } else {
        setError(err.message || "Failed to load games");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGameClick = (game) => {
    if (!isVerified) {
      alert("Please verify your email to play games");
      return;
    }
      if (game.gameType === "kerning") {
      navigate(`/games/kerning/${game._id}`, { state: { game } });
    } else if (game.gameType === "typeface") {
      navigate(`/games/typeface/${game._id}`, { state: { game } });
    } else if (game.gameType === "fontpairing") {
      navigate(`/games/fontpairing/${game._id}`, { state: { game } });
    } else if (game.gameType === "leading") {
      navigate(`/games/leading/${game._id}`, { state: { game } });
    } 
    else if (game.gameType.includes("lesson") && game.gameType.includes("quiz")) {
      navigate(`/games/${game.gameType}/${game._id}`, { state: { game } });
    }
    else if (game.gameType === "fontselection") {
      navigate(`/games/fontselection/${game._id}`, { state: { game } });
    }
  };

  const handleVerifyEmail = () => {
    navigate("/profile"); // Redirect to profile page for email verification
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader />
      </MainLayout>
    );
  }

  if (!isVerified) {
    return (
      <div className="games-page">
        <div className="games-container">
          <div className="games-header">
            <h1>TypeVenture Games</h1>
          </div>
          <div className="verification-required">
            <h2>⚠️ Email Verification Required</h2>
            <p>{error || "Please verify your email address to access and play games."}</p>
            <button className="verify-button" onClick={handleVerifyEmail}>
              Verify Email Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="games-page">
        <div className="games-container">
          <div className="error-container">
            <p>❌ {error}</p>
            <button className="verify-button" onClick={loadGames} style={{ marginTop: "20px" }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="games-page">
        <div className="games-container">
          <div className="empty-container">
            <p>No games available at the moment.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
        <div className="games-page">
            <div className="games-container">
                <div className="games-header">
                <h1>TypeVenture Games</h1>
                <p>Test your typography skills and master the art of kerning!</p>
                </div>

                <div className="games-grid">
                {games.map((game) => (
                    <div
                      key={game._id}
                      className="game-card"
                      onClick={() => handleGameClick(game)}
                      >
                      <img 
                        src={game.gameImage} 
                        alt={game.title}
                        className="game-card-image"
                      />
                      <div className="game-card-header">
                          <h2>{game.title}</h2>
                          <span className={`difficulty-badge ${game.difficulty}`}>
                          {game.difficulty}
                          </span>
                      </div>

                      <div className="game-card-body">
                          <p>{game.description}</p>
                      </div>

                      <div className="game-card-footer">
                          <span className="game-type">{game.gameType}</span>
                          <div className="play-icon">▶</div>
                      </div>
                      </div>
                  ))}
                </div>
            </div>
        </div>
    </MainLayout>
  );
};

export default Games;