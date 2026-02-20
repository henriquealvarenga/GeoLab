import { useNavigate } from 'react-router-dom';
import styles from './About.module.css';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate('/home')}>
        ← Voltar
      </button>

      <div className={styles.card}>
        <div className={styles.globe}>🌍</div>
        <h1 className={styles.title}>GeoExplorer</h1>
        <p className={styles.tagline}>Uma aventura interativa pelo mundo da Geografia</p>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Criado por</h2>
          <div className={styles.creators}>
            <div className={styles.creator}>
              <span className={styles.creatorEmoji}>👨‍💻</span>
              <span className={styles.creatorName}>Henrique Alvarenga</span>
              <span className={styles.creatorRole}>Pai & Desenvolvedor</span>
            </div>
            <span className={styles.amp}>&</span>
            <div className={styles.creator}>
              <span className={styles.creatorEmoji}>🧑‍🚀</span>
              <span className={styles.creatorName}>Leonardo Brighenti Alvarenga</span>
              <span className={styles.creatorRole}>Filho & Explorador</span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Construído com</h2>
          <div className={styles.techList}>
            <span className={styles.tech}>React</span>
            <span className={styles.tech}>Vite</span>
            <span className={styles.tech}>SVG Animations</span>
            <span className={styles.tech}>Web Audio API</span>
            <span className={styles.techHighlight}>Claude Code</span>
          </div>
          <p className={styles.claudeNote}>
            Este app foi desenvolvido com a ajuda do <strong>Claude Code</strong>, assistente de programação da Anthropic.
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <a
            href="https://henriquealvarenga.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            🔗 henriquealvarenga.com
          </a>
        </div>

        <p className={styles.footer}>
          Feito com dedicação para tornar a Geografia divertida e acessível.
        </p>
      </div>
    </div>
  );
}
