import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import lessons from '../../data/lessons';
import styles from './Home.module.css';

const SECTIONS = [
  {
    key: 'lessons',
    title: 'Lições',
    items: lessons.map((l) => ({
      id: l.slug,
      path: `/lesson/${l.slug}`,
      emoji: l.emoji,
      label: l.title.split('—')[0].trim(),
      color: l.color,
    })),
  },
  {
    key: 'activities',
    title: 'Atividades',
    items: [
      { id: 'clock', path: '/clock', emoji: '🕐', label: 'Relógio Mundial', color: '#CE93D8' },
      { id: 'map', path: '/map', emoji: '🗺️', label: 'Mapa Interativo', color: '#4FC3F7' },
      { id: 'game', path: '/game', emoji: '🎯', label: 'Caçador de Coordenadas', color: '#FFB74D' },
      { id: 'stories', path: '/stories', emoji: '📖', label: 'Histórias Épicas', color: '#81C784' },
    ],
  },
  {
    key: 'challenge',
    title: 'Desafio',
    items: [
      { id: 'master', path: '/master-quiz', emoji: '🏆', label: 'Quiz Mestre', color: '#FFD54F' },
    ],
  },
];

export default function Home() {
  const navigate = useNavigate();
  const { player, getLevel } = usePlayer();
  const { play } = useSound();
  const { level, title } = getLevel();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <span className={styles.avatar}>{player.avatar}</span>
          <div>
            <h1 className={styles.name}>Olá, {player.name}!</h1>
            <p className={styles.level}>Nível {level} — {title}</p>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{player.xp}</span>
            <span className={styles.statLabel}>XP</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{player.lessonsCompleted.length}/4</span>
            <span className={styles.statLabel}>Lições</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{player.unlockedBadges.length}</span>
            <span className={styles.statLabel}>Badges</span>
          </div>
        </div>
      </header>

      {SECTIONS.map((section) => (
        <section key={section.key} className={styles.section}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <div className={styles.grid}>
            {section.items.map((item) => {
              const lessonObj = lessons.find((l) => l.slug === item.id);
              const completed = lessonObj
                ? player.lessonsCompleted.includes(lessonObj.id)
                : false;
              return (
                <button
                  key={item.id}
                  className={`${styles.card} ${completed ? styles.completed : ''}`}
                  style={{ '--accent': item.color }}
                  onClick={() => {
                    play('navigate');
                    navigate(item.path);
                  }}
                >
                  <span className={styles.cardEmoji}>{item.emoji}</span>
                  <span className={styles.cardLabel}>{item.label}</span>
                  {completed && <span className={styles.check}>✓</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
