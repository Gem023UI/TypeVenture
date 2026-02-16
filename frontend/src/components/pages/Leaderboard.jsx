import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../layout/MainLayout";
import { fetchAllGames, fetchGameLeaderboard, fetchUserProfile } from '../../api/games';
import './Leaderboard.css';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState('');
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [topPlayer, setTopPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all games on component mount
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        const gamesData = await fetchAllGames(); // Use the API function
        setGames(gamesData);
        if (gamesData.length > 0) {
          setSelectedGameId(gamesData[0]._id);
        }
      } catch (err) {
        console.error('Error fetching games:', err);
        if (err.status === 401 || err.status === 403) {
          navigate('/login');
        } else {
          setError('Failed to load games');
        }
      }
    };
  
    fetchGames();
  }, [navigate]);

  // Fetch leaderboard data when game selection changes
  useEffect(() => {
    if (!selectedGameId) return;
  
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError('');
      try {
        const leaderboardData = await fetchGameLeaderboard(selectedGameId, 100);
  
        const sortedData = leaderboardData.sort((a, b) => {
          // Sort by score descending
          if (b.score !== a.score) {
            return b.score - a.score;
          }
          // If same score, most recent first
          return new Date(b.completedAt) - new Date(a.completedAt);
        });
  
        setLeaderboardData(sortedData);
        
        // Set top player - userId is now populated with full user details
        if (sortedData.length > 0 && sortedData[0].userId) {
          setTopPlayer(sortedData[0].userId);
        } else {
          setTopPlayer(null);
        }
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeaderboard();
  }, [selectedGameId]);

  const handleGameChange = (e) => {
    setSelectedGameId(e.target.value);
  };

  const getRankStyle = (index, score) => {
    // Check if this score is in top 3
    const top3Scores = [...new Set(leaderboardData.map(d => d.score))]
      .sort((a, b) => b - a)
      .slice(0, 3);
    
    if (top3Scores.includes(score)) {
      const rank = top3Scores.indexOf(score) + 1;
      if (rank === 1) return 'rank-gold';
      if (rank === 2) return 'rank-silver';
      if (rank === 3) return 'rank-bronze';
    }
    return '';
  };

  const getRankBadge = (index, score) => {
    const top3Scores = [...new Set(leaderboardData.map(d => d.score))]
      .sort((a, b) => b - a)
      .slice(0, 3);
    
    if (top3Scores.includes(score)) {
      const rank = top3Scores.indexOf(score) + 1;
      if (rank === 1) return '🥇';
      if (rank === 2) return '🥈';
      if (rank === 3) return '🥉';
    }
    return `#${index + 1}`;
  };

  const getAchievementBadge = (achievement) => {
    switch(achievement) {
      case 'gold':
        return <span className="achievement-badge gold">🏆 Gold</span>;
      case 'silver':
        return <span className="achievement-badge silver">🥈 Silver</span>;
      case 'bronze':
        return <span className="achievement-badge bronze">🥉 Bronze</span>;
      default:
        return null;
    }
  };

  const selectedGame = games.find(g => g._id === selectedGameId);

  return (
    <MainLayout>
        <div className="leaderboard-page">
            <div className="leaderboard-container">
                <h1 className="leaderboard-title">LEADERBOARDS</h1>

                <div className="game-selector-section">
                <label htmlFor="game-category" className="category-label">
                    Game Category
                </label>
                <select
                    id="game-category"
                    className="game-dropdown"
                    value={selectedGameId}
                    onChange={handleGameChange}
                    disabled={loading}
                >
                    {games.map((game) => (
                    <option key={game._id} value={game._id}>
                        {game.title} ({game.difficulty})
                    </option>
                    ))}
                </select>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading leaderboard...</p>
                </div>
                ) : leaderboardData.length === 0 ? (
                <div className="no-data">
                    <p>No scores recorded for this game yet.</p>
                    <p>Be the first to play!</p>
                </div>
                ) : (
                <div className="leaderboard-content">
                    {/* Top Player Showcase */}
                    <div className="top-player-section">
                    <div className="crown-icon">👑</div>
                    <h2 className="top-player-header">Top Player</h2>
                    
                    {topPlayer ? (
                        <div className="top-player-card">
                        <div className="top-player-avatar">
                            {topPlayer.profilePicture ? (
                            <img 
                                src={topPlayer.profilePicture} 
                                alt={topPlayer.username}
                            />
                            ) : (
                            <div className="avatar-placeholder">
                                {topPlayer.username?.charAt(0).toUpperCase()}
                            </div>
                            )}
                        </div>
                        <div className="top-player-info">
                            <h3 className="top-player-name">{topPlayer.username}</h3>
                            <p className="top-player-email">{topPlayer.email}</p>
                            <div className="top-player-stats">
                            <div className="stat-item">
                                <span className="stat-label">Score</span>
                                <span className="stat-value">{leaderboardData[0].score}</span>
                            </div>
                            {getAchievementBadge(leaderboardData[0].achievement)}
                            </div>
                        </div>
                        </div>
                    ) : (
                        <div className="loading-top-player">Loading player info...</div>
                    )}
                    </div>

                    {/* Rankings List */}
                    <div className="rankings-section">
                    <h2 className="rankings-header">Overall Rankings</h2>
                    <div className="rankings-list">
                        {leaderboardData.map((entry, index) => (
                        <div 
                            key={`${entry.userId}-${entry.gameId}`}
                            className={`ranking-item ${getRankStyle(index, entry.score)}`}
                        >
                            <div className="rank-number">
                            {getRankBadge(index, entry.score)}
                            </div>
                            <div className="player-details">
                            <span className="player-name">{entry.username}</span>
                            {getAchievementBadge(entry.achievement)}
                            </div>
                            <div className="player-score">
                            <span className="score-value">{entry.score}</span>
                            <span className="score-label">pts</span>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    </MainLayout>
  );
};

export default Leaderboard;