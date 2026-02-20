import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cities from '../../data/cities';
import styles from './WorldClock.module.css';

function getTimeForCity(city) {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: city.timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const dayFormatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: city.timezone,
      weekday: 'short',
    });
    return {
      time: formatter.format(now),
      day: dayFormatter.format(now),
      hour: parseInt(formatter.format(now).split(':')[0], 10),
    };
  } catch {
    return { time: '--:--:--', day: '---', hour: 12 };
  }
}

function AnalogClock({ hour, minute, size = 80, color }) {
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const minuteAngle = minute * 6;
  const cx = size / 2, cy = size / 2;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={cx - 2} fill="rgba(255,255,255,0.03)" stroke={color} strokeWidth="2" opacity="0.5" />
      {/* Hour marks */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const inner = cx - 8;
        const outer = cx - 4;
        return (
          <line
            key={i}
            x1={cx + Math.cos(angle) * inner}
            y1={cy + Math.sin(angle) * inner}
            x2={cx + Math.cos(angle) * outer}
            y2={cy + Math.sin(angle) * outer}
            stroke={color}
            strokeWidth="1.5"
            opacity="0.5"
          />
        );
      })}
      {/* Hour hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos((hourAngle - 90) * (Math.PI / 180)) * (cx * 0.45)}
        y2={cy + Math.sin((hourAngle - 90) * (Math.PI / 180)) * (cx * 0.45)}
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + Math.cos((minuteAngle - 90) * (Math.PI / 180)) * (cx * 0.65)}
        y2={cy + Math.sin((minuteAngle - 90) * (Math.PI / 180)) * (cx * 0.65)}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r="3" fill={color} />
    </svg>
  );
}

export default function WorldClock() {
  const [now, setNow] = useState(new Date());
  const [selected, setSelected] = useState([0, 2, 4, 5]); // São Paulo, Londres, Tóquio, NY
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleCity = (idx) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/home')}>← Voltar</button>
        <h1 className={styles.title}>🕐 Relógio Mundial</h1>
        <p className={styles.subtitle}>Veja as horas ao redor do mundo em tempo real</p>
      </div>

      <div className={styles.clockGrid}>
        {selected.map((idx) => {
          const city = cities[idx];
          const { time, day, hour } = getTimeForCity(city);
          const parts = time.split(':');
          const h = parseInt(parts[0], 10);
          const m = parseInt(parts[1], 10);
          const isDay = h >= 6 && h < 18;
          const colors = ['#4FC3F7', '#CE93D8', '#FFB74D', '#81C784', '#EF5350', '#FF8A65'];
          const color = colors[idx % colors.length];

          return (
            <div key={idx} className={`${styles.clockCard} ${isDay ? styles.day : styles.night}`}>
              <div className={styles.cityInfo}>
                <span className={styles.cityEmoji}>{city.emoji}</span>
                <div>
                  <span className={styles.cityName}>{city.name}</span>
                  <span className={styles.cityCountry}>{city.country}</span>
                </div>
              </div>
              <AnalogClock hour={h} minute={m} size={90} color={color} />
              <div className={styles.digitalTime}>{time}</div>
              <div className={styles.dayLabel}>
                {day} • UTC{city.utcOffset >= 0 ? '+' : ''}{city.utcOffset}
                <span className={styles.dayNight}>{isDay ? ' ☀️' : ' 🌙'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.citySelector}>
        <h3 className={styles.selectorTitle}>Adicionar/Remover Cidades</h3>
        <div className={styles.cityChips}>
          {cities.map((city, idx) => (
            <button
              key={idx}
              className={`${styles.chip} ${selected.includes(idx) ? styles.chipActive : ''}`}
              onClick={() => toggleCity(idx)}
            >
              {city.emoji} {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
