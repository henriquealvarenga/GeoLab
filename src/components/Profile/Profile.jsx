import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import badges from '../../data/badges';
import lessons from '../../data/lessons';
import styles from './Profile.module.css';

export default function Profile() {
  const navigate = useNavigate();
  const { player, getLevel, resetPlayer } = usePlayer();
  const { play } = useSound();
  const { level, title } = getLevel();

  const handleReset = () => {
    if (window.confirm('Tem certeza? Todo seu progresso será perdido!')) {
      resetPlayer();
      navigate('/');
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/home')}>← Voltar</button>

      {/* Profile header */}
      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>{player.avatar}</div>
        <h1 className={styles.name}>{player.name}</h1>
        <p className={styles.levelText}>Nível {level} — {title}</p>
        <div className={styles.xpBarLarge}>
          <div className={styles.xpFill} style={{ width: `${Math.min((player.xp % 300) / 3, 100)}%` }} />
        </div>
        <p className={styles.xpText}>{player.xp} XP Total</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statEmoji}>📚</span>
          <span className={styles.statValue}>{player.lessonsCompleted.length}/4</span>
          <span className={styles.statLabel}>Lições</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statEmoji}>🎯</span>
          <span className={styles.statValue}>{player.gameHighScore}</span>
          <span className={styles.statLabel}>Recorde</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statEmoji}>📖</span>
          <span className={styles.statValue}>{player.storiesRead.length}/4</span>
          <span className={styles.statLabel}>Histórias</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statEmoji}>🏆</span>
          <span className={styles.statValue}>{player.masterQuizPassed ? '✓' : '✗'}</span>
          <span className={styles.statLabel}>Mestre</span>
        </div>
      </div>

      {/* Lessons progress */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Progresso das Lições</h2>
        <div className={styles.lessonList}>
          {lessons.map((lesson) => {
            const completed = player.lessonsCompleted.includes(lesson.id);
            const quizScore = player.quizScores[lesson.id];
            return (
              <div key={lesson.id} className={`${styles.lessonItem} ${completed ? styles.done : ''}`}>
                <span className={styles.lessonEmoji}>{lesson.emoji}</span>
                <div className={styles.lessonInfo}>
                  <span className={styles.lessonName}>{lesson.title.split('—')[0].trim()}</span>
                  <span className={styles.lessonStatus}>
                    {completed ? '✓ Completa' : '○ Pendente'}
                    {quizScore && ` • Quiz: ${quizScore.score}/${quizScore.total}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          Badges ({player.unlockedBadges.length}/{badges.length})
        </h2>
        <div className={styles.badgeGrid}>
          {badges.map((badge) => {
            const unlocked = player.unlockedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`${styles.badge} ${unlocked ? styles.unlocked : styles.locked}`}
              >
                <span className={styles.badgeEmoji}>
                  {unlocked ? badge.emoji : '🔒'}
                </span>
                <span className={styles.badgeName}>{badge.name}</span>
                <span className={styles.badgeDesc}>{badge.description}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className={styles.dangerZone}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Resetar Progresso
        </button>
      </div>
    </div>
  );
}
