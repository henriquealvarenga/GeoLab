import { useNavigate, useLocation } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import styles from './Navbar.module.css';

export default function Navbar({ onToggleTheme }) {
  const { player, getLevel } = usePlayer();
  const navigate = useNavigate();
  const location = useLocation();
  const { level, title } = getLevel();

  if (!player || location.pathname === '/') return null;

  return (
    <nav className={styles.navbar}>
      <button className={styles.brand} onClick={() => navigate('/home')}>
        <span className={styles.logo}>GeoExplorer</span>
      </button>

      <div className={styles.center}>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${Math.min((player.xp % 300) / 3, 100)}%` }} />
        </div>
        <span className={styles.xpText}>{player.xp} XP — Nv.{level} {title}</span>
      </div>

      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={() => navigate('/about')} title="Sobre">
          ℹ️
        </button>
        <button className={styles.iconBtn} onClick={onToggleTheme} title="Alternar tema">
          {player.theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <button
          className={styles.avatar}
          onClick={() => navigate('/profile')}
          title="Perfil"
        >
          {player.avatar}
        </button>
      </div>
    </nav>
  );
}
