import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PlayerProvider, usePlayer } from './context/PlayerContext';
import Navbar from './components/Layout/Navbar';
import StarBackground from './components/Layout/StarBackground';
import Welcome from './components/Welcome/Welcome';
import Home from './components/Home/Home';
import LessonPage from './components/Lessons/LessonPage';
import Quiz from './components/Quiz/Quiz';
import WorldClock from './components/WorldClock/WorldClock';
import WorldMap from './components/Map/WorldMap';
import CoordinateHunter from './components/Game/CoordinateHunter';
import Stories from './components/Stories/Stories';
import MasterQuiz from './components/MasterQuiz/MasterQuiz';
import Profile from './components/Profile/Profile';
import About from './components/About/About';
import './App.css';

function AppRoutes() {
  const { player, toggleTheme } = usePlayer();
  const theme = player?.theme || 'dark';

  return (
    <div className="app" data-theme={theme}>
      <StarBackground theme={theme} />
      <Navbar onToggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={player ? <Navigate to="/home" replace /> : <Welcome />} />
          <Route path="/home" element={player ? <Home /> : <Navigate to="/" replace />} />
          <Route path="/lesson/:slug" element={player ? <LessonPage /> : <Navigate to="/" replace />} />
          <Route path="/quiz/:lessonId" element={player ? <Quiz /> : <Navigate to="/" replace />} />
          <Route path="/clock" element={player ? <WorldClock /> : <Navigate to="/" replace />} />
          <Route path="/map" element={player ? <WorldMap /> : <Navigate to="/" replace />} />
          <Route path="/game" element={player ? <CoordinateHunter /> : <Navigate to="/" replace />} />
          <Route path="/stories" element={player ? <Stories /> : <Navigate to="/" replace />} />
          <Route path="/master-quiz" element={player ? <MasterQuiz /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={player ? <Profile /> : <Navigate to="/" replace />} />
          <Route path="/about" element={player ? <About /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <PlayerProvider>
        <AppRoutes />
      </PlayerProvider>
    </HashRouter>
  );
}
