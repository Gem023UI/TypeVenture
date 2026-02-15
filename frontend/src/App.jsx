import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Aurora from "./components/bins/background/Aurora";
import LandingSection from "./components/pages/LandingSection";
import LoginRegister from "./components/pages/Login&Register";
import FrontPage from "./components/pages/FrontPage";
import GuestGame from './components/pages/GuestGame';
import Games from './components/pages/GamesGrid';
import KerningGame from './components/pages/games/Kerning';
import TypefaceGame from './components/pages/games/Typeface';
import FontPairingGame from './components/pages/games/FontPairing';
import LeadingGame from './components/pages/games/Leading';
import Lesson1QuizGame from './components/pages/games/Quizzes/Lesson1';
import Lesson2QuizGame from './components/pages/games/Quizzes/Lesson2';
import Lesson3QuizGame from './components/pages/games/Quizzes/Lesson3';
import Lesson4QuizGame from './components/pages/games/Quizzes/Lesson4';
import Lesson5QuizGame from './components/pages/games/Quizzes/Lesson5';
import Lesson6QuizGame from './components/pages/games/Quizzes/Lesson6';
import Lesson7QuizGame from './components/pages/games/Quizzes/Lesson7';
import Lesson8QuizGame from './components/pages/games/Quizzes/Lesson8';
import Lesson9QuizGame from './components/pages/games/Quizzes/Lesson9';
import Lesson10QuizGame from './components/pages/games/Quizzes/Lesson10';
import Lesson11QuizGame from './components/pages/games/Quizzes/Lesson11';
import Profile from './components/pages/Profile';
import Leaderboard from './components/pages/Profile';
import Citations from './components/pages/Citations';
import AboutUs from './components/pages/AboutUs';
import ArticleList from './components/pages/ArticleList';
import ArticleOne from './components/pages/articles/ArticleOne';
import ArticleTwo from './components/pages/articles/ArticleTwo';
import ArticleThree from './components/pages/articles/ArticleThree';
import ArticleFour from './components/pages/articles/ArticleFour';
import ArticleFive from './components/pages/articles/ArticleFive';
import ArticleSix from './components/pages/articles/ArticleSix';
import ArticleSeven from './components/pages/articles/ArticleSeven';

// Inside your Routes:
<Route path="/leaderboard" element={<Leaderboard />} />


function App() {
  const [logoUrl] = useState(
    "https://res.cloudinary.com/dxnb2ozgw/image/upload/v1761813542/t_xkqsgo.png"
  );

  return (
    <Router>
      <div className="App">
        {/* Aurora as full background */}
        <Aurora
          colorStops={["#0029FF", "#FFFFFF", "#FF1414"]}
          blend={0.0}
          amplitude={2.0}
          speed={0.5}
        />

        {/* Foreground content */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingSection logoUrl={logoUrl} />} />
            <Route path="/login" element={<LoginRegister logoUrl={logoUrl} />} />
            <Route path="/lessons" element={<FrontPage />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/article/font-pairings-2026" element={<ArticleOne />} />
            <Route path="/article/typographic-hierarchies" element={<ArticleTwo />} />
            <Route path="/article/kerning-guide" element={<ArticleThree />} />
            <Route path="/article/font-management-issues" element={<ArticleFour />} />
            <Route path="/article/font-psychology" element={<ArticleFive />} />
            <Route path="/article/ux-typography-guide" element={<ArticleSix />} />
            <Route path="/article/design-trends-2026" element={<ArticleSeven />} />
            <Route path="/guest-game" element={<GuestGame />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/kerning/:gameId" element={<KerningGame />} />
            <Route path="/games/typeface/:gameId" element={<TypefaceGame />} />
            <Route path="/games/fontpairing/:gameId" element={<FontPairingGame />} />
            <Route path="/games/leading/:gameId" element={<LeadingGame />} />
            <Route path="/games/lesson1quiz/:gameId" element={<Lesson1QuizGame />} />
            <Route path="/games/lesson2quiz/:gameId" element={<Lesson2QuizGame />} />
            <Route path="/games/lesson3quiz/:gameId" element={<Lesson3QuizGame />} />
            <Route path="/games/lesson4quiz/:gameId" element={<Lesson4QuizGame />} />
            <Route path="/games/lesson5quiz/:gameId" element={<Lesson5QuizGame />} />
            <Route path="/games/lesson6quiz/:gameId" element={<Lesson6QuizGame />} />
            <Route path="/games/lesson7quiz/:gameId" element={<Lesson7QuizGame />} />
            <Route path="/games/lesson8quiz/:gameId" element={<Lesson8QuizGame />} />
            <Route path="/games/lesson9quiz/:gameId" element={<Lesson9QuizGame />} />
            <Route path="/games/lesson10quiz/:gameId" element={<Lesson10QuizGame />} />
            <Route path="/games/lesson11quiz/:gameId" element={<Lesson11QuizGame />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboards" element={<Leaderboard />} />
            <Route path="/citations" element={<Citations />} />
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;