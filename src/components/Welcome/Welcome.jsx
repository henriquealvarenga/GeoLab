import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import styles from './Welcome.module.css';

const AVATARS = ['🧑‍🚀', '👩‍🚀', '🚀', '🛸', '🌍', '🌎', '🌏', '🪐', '⭐', '🌟', '☄️', '🔭'];

export default function Welcome() {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🧑‍🚀');
  const [step, setStep] = useState(0);
  const { createPlayer } = usePlayer();
  const navigate = useNavigate();
  const { play } = useSound();

  const handleStart = () => {
    if (!name.trim()) return;
    play('levelup');
    createPlayer(name.trim(), avatar);
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {step === 0 && (
          <div className={styles.step}>
            <div className={styles.planet}>🌍</div>
            <h1 className={styles.title}>GeoExplorer</h1>
            <p className={styles.subtitle}>
              Uma aventura interativa pelo mundo da Geografia!
            </p>
            <p className={styles.desc}>
              Descubra os segredos de latitude, longitude, fusos horários e coordenadas
              em uma jornada espacial incrível.
            </p>
            <button
              className={styles.btn}
              onClick={() => { play('click'); setStep(1); }}
            >
              Iniciar Missão
            </button>
          </div>
        )}

        {step === 1 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>Como te chamam, explorador(a)?</h2>
            <input
              className={styles.input}
              type="text"
              placeholder="Seu nome de explorador..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && name.trim()) {
                  play('click');
                  setStep(2);
                }
              }}
            />
            <button
              className={styles.btn}
              disabled={!name.trim()}
              onClick={() => { play('click'); setStep(2); }}
            >
              Continuar
            </button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h2 className={styles.stepTitle}>Escolha seu avatar</h2>
            <div className={styles.avatarGrid}>
              {AVATARS.map((a) => (
                <button
                  key={a}
                  className={`${styles.avatarBtn} ${avatar === a ? styles.selected : ''}`}
                  onClick={() => { play('click'); setAvatar(a); }}
                >
                  {a}
                </button>
              ))}
            </div>
            <div className={styles.preview}>
              <span className={styles.previewAvatar}>{avatar}</span>
              <span className={styles.previewName}>{name}</span>
            </div>
            <button className={styles.btn} onClick={handleStart}>
              Explorar o Mundo!
            </button>
          </div>
        )}

        {step > 0 && (
          <div className={styles.dots}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${styles.dot} ${step >= i ? styles.active : ''}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
