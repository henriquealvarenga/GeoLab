import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import cities from '../../data/cities';
import styles from './CoordinateHunter.module.css';

const W = 700, H = 350;

function coordToMap(lat, lng) {
  return {
    x: ((lng + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  };
}

function mapToCoord(x, y) {
  return {
    lat: 90 - (y / H) * 180,
    lng: (x / W) * 360 - 180,
  };
}

function distance(lat1, lng1, lat2, lng2) {
  const dLat = Math.abs(lat1 - lat2);
  const dLng = Math.abs(lng1 - lng2);
  return Math.sqrt(dLat * dLat + dLng * dLng);
}

function getRandomTarget() {
  const city = cities[Math.floor(Math.random() * cities.length)];
  return { ...city };
}

export default function CoordinateHunter() {
  const navigate = useNavigate();
  const { updateGameScore, player } = usePlayer();
  const { play } = useSound();

  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [target, setTarget] = useState(null);
  const [click, setClick] = useState(null);
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [roundResult, setRoundResult] = useState(null);
  const [totalRounds] = useState(5);

  const startGame = useCallback(() => {
    setGameState('playing');
    setTarget(getRandomTarget());
    setRound(1);
    setScore(0);
    setClick(null);
    setTimeLeft(30);
    setRoundResult(null);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || roundResult) return;
    if (timeLeft <= 0) {
      handleClick(W / 2, H / 2); // force center click on timeout
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, gameState, roundResult]);

  const handleClick = (mapX, mapY) => {
    if (gameState !== 'playing' || roundResult) return;

    const coord = mapToCoord(mapX, mapY);
    setClick({ x: mapX, y: mapY, ...coord });

    const dist = distance(coord.lat, coord.lng, target.lat, target.lng);
    let points = 0;
    if (dist < 5) points = 200;
    else if (dist < 15) points = 150;
    else if (dist < 30) points = 100;
    else if (dist < 50) points = 50;
    else points = Math.max(0, Math.round(100 - dist));

    // Time bonus
    const timeBonus = Math.round(timeLeft * 2);
    const totalPoints = points + timeBonus;

    setScore((s) => s + totalPoints);
    setRoundResult({ dist: Math.round(dist), points: totalPoints, timeBonus });

    if (points >= 100) play('correct');
    else play('wrong');
  };

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    handleClick(x, y);
  };

  const nextRound = () => {
    if (round >= totalRounds) {
      setGameState('finished');
      updateGameScore(score);
      play('complete');
    } else {
      setRound((r) => r + 1);
      setTarget(getRandomTarget());
      setClick(null);
      setTimeLeft(30);
      setRoundResult(null);
    }
  };

  // Ready screen
  if (gameState === 'ready') {
    return (
      <div className={styles.container}>
        <div className={styles.readyCard}>
          <div className={styles.readyEmoji}>🎯</div>
          <h1>Caçador de Coordenadas</h1>
          <p className={styles.readyDesc}>
            Uma cidade vai aparecer. Clique no mapa onde você acha que ela está!
            Quanto mais perto e mais rápido, mais pontos!
          </p>
          <div className={styles.readyRules}>
            <p>🎯 5 rodadas</p>
            <p>⏱️ 30 segundos por rodada</p>
            <p>⭐ Bônus de velocidade!</p>
          </div>
          <p className={styles.highScore}>
            Recorde: {player.gameHighScore} pontos
          </p>
          <button className={styles.btn} onClick={startGame}>
            Começar!
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate('/home')}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // Finished
  if (gameState === 'finished') {
    const isHighScore = score >= player.gameHighScore;
    return (
      <div className={styles.container}>
        <div className={styles.readyCard}>
          <div className={styles.readyEmoji}>{isHighScore ? '🏆' : '🎯'}</div>
          <h1>{isHighScore ? 'Novo Recorde!' : 'Fim de Jogo!'}</h1>
          <div className={styles.finalScore}>{score}</div>
          <p className={styles.finalLabel}>pontos</p>
          {isHighScore && <p className={styles.highScoreMsg}>Você superou seu recorde anterior!</p>}
          <div className={styles.readyRules}>
            <button className={styles.btn} onClick={startGame}>Jogar Novamente</button>
            <button className={styles.btnSecondary} onClick={() => navigate('/home')}>Início</button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  const targetPos = target ? coordToMap(target.lat, target.lng) : null;

  return (
    <div className={styles.container}>
      {/* HUD */}
      <div className={styles.hud}>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Rodada</span>
          <span className={styles.hudValue}>{round}/{totalRounds}</span>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Alvo</span>
          <span className={styles.hudTarget}>{target?.emoji} {target?.name}</span>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Tempo</span>
          <span className={`${styles.hudValue} ${timeLeft <= 10 ? styles.warning : ''}`}>
            {timeLeft}s
          </span>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Pontos</span>
          <span className={styles.hudValue}>{score}</span>
        </div>
      </div>

      {/* Hint */}
      <div className={styles.hint}>
        Onde fica <strong>{target?.name}, {target?.country}</strong>? Clique no mapa!
        <br />
        <span className={styles.hintCoord}>
          Dica: ~{target?.lat}°{target?.lat >= 0 ? 'N' : 'S'}, ~{target?.lng}°{target?.lng >= 0 ? 'E' : 'W'}
        </span>
      </div>

      {/* Map */}
      <div className={styles.mapWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.map}
          onClick={handleMapClick}
          style={{ cursor: roundResult ? 'default' : 'crosshair' }}
        >
          <rect x="0" y="0" width={W} height={H} fill="rgba(13, 27, 42, 0.5)" />

          {/* Grid */}
          {Array.from({ length: 13 }, (_, i) => {
            const x = (i / 12) * W;
            return <line key={`v${i}`} x1={x} y1={0} x2={x} y2={H} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
          })}
          {Array.from({ length: 7 }, (_, i) => {
            const y = (i / 6) * H;
            return <line key={`h${i}`} x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
          })}

          {/* Equator & Greenwich */}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#EF5350" strokeWidth="0.8" opacity="0.3" />
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#EF5350" strokeWidth="0.8" opacity="0.3" />

          {/* Continents simplified */}
          <path d="M230,210 L240,195 L255,195 L265,210 L270,240 L275,270 L270,300 L255,320 L240,310 L235,280 L225,250 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />
          <path d="M150,80 L170,70 L210,75 L240,85 L260,100 L270,130 L265,155 L250,175 L240,190 L220,185 L200,170 L180,150 L160,130 L140,110 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />
          <path d="M390,175 L420,170 L445,180 L460,200 L465,240 L455,280 L440,310 L420,320 L400,300 L390,260 L385,220 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />
          <path d="M380,90 L400,80 L430,85 L450,100 L460,120 L455,145 L440,160 L420,165 L395,155 L380,135 L375,110 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />
          <path d="M460,60 L520,55 L580,65 L640,80 L680,100 L690,130 L680,160 L660,180 L620,190 L570,185 L530,170 L490,155 L465,135 L455,110 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />
          <path d="M630,260 L670,250 L710,260 L720,280 L710,310 L680,320 L650,310 L635,290 Z"
            fill="rgba(129,199,132,0.1)" stroke="rgba(129,199,132,0.2)" strokeWidth="0.8" transform="scale(0.875 0.875)" />

          {/* Click marker */}
          {click && (
            <>
              <circle cx={click.x} cy={click.y} r="6" fill="none" stroke="#EF5350" strokeWidth="2">
                <animate attributeName="r" from="6" to="20" dur="0.5s" fill="freeze" />
                <animate attributeName="opacity" from="1" to="0.3" dur="0.5s" fill="freeze" />
              </circle>
              <circle cx={click.x} cy={click.y} r="4" fill="#EF5350" />
              <text x={click.x + 8} y={click.y - 8} fill="#EF5350" fontSize="9" fontWeight="600">Seu clique</text>
            </>
          )}

          {/* Target reveal */}
          {roundResult && targetPos && (
            <>
              <circle cx={targetPos.x} cy={targetPos.y} r="8" fill="#81C784" opacity="0.8">
                <animate attributeName="r" from="0" to="8" dur="0.3s" />
              </circle>
              <text x={targetPos.x} y={targetPos.y - 12} fill="#81C784" fontSize="10" fontWeight="700" textAnchor="middle">
                {target.emoji} {target.name}
              </text>
              {/* Line between click and target */}
              {click && (
                <line x1={click.x} y1={click.y} x2={targetPos.x} y2={targetPos.y}
                  stroke="#FFD54F" strokeWidth="1" strokeDasharray="4 2" opacity="0.5" />
              )}
            </>
          )}
        </svg>
      </div>

      {/* Round result */}
      {roundResult && (
        <div className={styles.roundResult}>
          <p className={styles.resultDist}>
            Distância: ~{roundResult.dist}° {roundResult.dist < 15 ? '🎯' : roundResult.dist < 30 ? '👍' : '🗺️'}
          </p>
          <p className={styles.resultPoints}>+{roundResult.points} pontos (bônus tempo: +{roundResult.timeBonus})</p>
          <button className={styles.btn} onClick={nextRound}>
            {round >= totalRounds ? 'Ver Resultado' : 'Próxima Rodada →'}
          </button>
        </div>
      )}
    </div>
  );
}
