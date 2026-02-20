import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import badges from '../data/badges';

const PlayerContext = createContext(null);

const DEFAULT_PLAYER = {
  name: '',
  avatar: '🧑‍🚀',
  xp: 0,
  lessonsCompleted: [],
  quizScores: {},
  perfectQuizzes: 0,
  gameHighScore: 0,
  storiesRead: [],
  masterQuizPassed: false,
  unlockedBadges: [],
  theme: 'dark',
};

function loadPlayer() {
  try {
    const saved = localStorage.getItem('geoexplorer_player');
    if (saved) {
      return { ...DEFAULT_PLAYER, ...JSON.parse(saved) };
    }
  } catch (e) {
    // ignore parse errors
  }
  return null;
}

export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState(() => loadPlayer());

  useEffect(() => {
    if (player) {
      localStorage.setItem('geoexplorer_player', JSON.stringify(player));
    }
  }, [player]);

  const checkBadges = useCallback((updatedPlayer) => {
    const newBadges = [...updatedPlayer.unlockedBadges];
    let gained = false;
    badges.forEach((badge) => {
      if (!newBadges.includes(badge.id) && badge.condition(updatedPlayer)) {
        newBadges.push(badge.id);
        gained = true;
      }
    });
    if (gained) {
      return { ...updatedPlayer, unlockedBadges: newBadges };
    }
    return updatedPlayer;
  }, []);

  const createPlayer = useCallback((name, avatar) => {
    const newPlayer = { ...DEFAULT_PLAYER, name, avatar };
    setPlayer(newPlayer);
  }, []);

  const addXP = useCallback((amount) => {
    setPlayer((prev) => {
      const updated = { ...prev, xp: prev.xp + amount };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const completeLesson = useCallback((lessonId) => {
    setPlayer((prev) => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev;
      const updated = {
        ...prev,
        lessonsCompleted: [...prev.lessonsCompleted, lessonId],
        xp: prev.xp + 100,
      };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const saveQuizScore = useCallback((quizId, score, total) => {
    setPlayer((prev) => {
      const isPerfect = score === total;
      const updated = {
        ...prev,
        quizScores: { ...prev.quizScores, [quizId]: { score, total } },
        perfectQuizzes: isPerfect ? prev.perfectQuizzes + 1 : prev.perfectQuizzes,
        xp: prev.xp + score * 20,
      };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const updateGameScore = useCallback((score) => {
    setPlayer((prev) => {
      if (score <= prev.gameHighScore) return prev;
      const updated = { ...prev, gameHighScore: score, xp: prev.xp + Math.floor(score / 10) };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const readStory = useCallback((storyId) => {
    setPlayer((prev) => {
      if (prev.storiesRead.includes(storyId)) return prev;
      const updated = {
        ...prev,
        storiesRead: [...prev.storiesRead, storyId],
        xp: prev.xp + 50,
      };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const passMasterQuiz = useCallback(() => {
    setPlayer((prev) => {
      if (prev.masterQuizPassed) return prev;
      const updated = { ...prev, masterQuizPassed: true, xp: prev.xp + 500 };
      return checkBadges(updated);
    });
  }, [checkBadges]);

  const toggleTheme = useCallback(() => {
    setPlayer((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  }, []);

  const resetPlayer = useCallback(() => {
    localStorage.removeItem('geoexplorer_player');
    setPlayer(null);
  }, []);

  const getLevel = useCallback(() => {
    if (!player) return { level: 0, title: '' };
    const xp = player.xp;
    if (xp >= 2000) return { level: 10, title: 'Mestre Espacial' };
    if (xp >= 1500) return { level: 8, title: 'Comandante Estelar' };
    if (xp >= 1000) return { level: 6, title: 'Navegador Galáctico' };
    if (xp >= 600) return { level: 4, title: 'Explorador Orbital' };
    if (xp >= 300) return { level: 3, title: 'Viajante Cósmico' };
    if (xp >= 100) return { level: 2, title: 'Cadete Espacial' };
    return { level: 1, title: 'Iniciante' };
  }, [player]);

  return (
    <PlayerContext.Provider
      value={{
        player,
        createPlayer,
        addXP,
        completeLesson,
        saveQuizScore,
        updateGameScore,
        readStory,
        passMasterQuiz,
        toggleTheme,
        resetPlayer,
        getLevel,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be inside PlayerProvider');
  return ctx;
}
