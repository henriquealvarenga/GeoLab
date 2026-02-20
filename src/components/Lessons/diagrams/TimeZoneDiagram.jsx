import { useState, useEffect } from 'react';

const ZONES = [
  { offset: -8, city: 'LA', color: '#7E57C2' },
  { offset: -5, city: 'NY', color: '#5C6BC0' },
  { offset: -3, city: 'BRA', color: '#4FC3F7' },
  { offset: 0, city: 'LON', color: '#66BB6A' },
  { offset: 1, city: 'PAR', color: '#81C784' },
  { offset: 3, city: 'MOC', color: '#FFB74D' },
  { offset: 5.5, city: 'MUM', color: '#FF8A65' },
  { offset: 8, city: 'PEQ', color: '#EF5350' },
  { offset: 9, city: 'TOK', color: '#EC407A' },
  { offset: 11, city: 'SYD', color: '#AB47BC' },
];

export default function TimeZoneDiagram() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();

  return (
    <svg viewBox="0 0 420 200" style={{ width: '100%', maxWidth: 440 }}>
      {/* Background strip for day/night */}
      {ZONES.map((zone, i) => {
        const x = 20 + i * 39;
        const localH = ((utcH + zone.offset) % 24 + 24) % 24;
        const isDay = localH >= 6 && localH < 18;
        return (
          <g key={i}>
            <rect
              x={x}
              y="30"
              width="36"
              height="130"
              rx="6"
              fill={isDay ? 'rgba(255,235,59,0.08)' : 'rgba(30,30,80,0.3)'}
              stroke={zone.color}
              strokeWidth="1.5"
              opacity="0.7"
            />
            {/* Sun/Moon */}
            <text x={x + 18} y="52" textAnchor="middle" fontSize="14">
              {isDay ? '☀️' : '🌙'}
            </text>
            {/* Time */}
            <text
              x={x + 18}
              y="80"
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
              fontWeight="700"
            >
              {String(Math.floor(localH)).padStart(2, '0')}:
              {String(utcM).padStart(2, '0')}
            </text>
            {/* UTC offset */}
            <text
              x={x + 18}
              y="100"
              textAnchor="middle"
              fill={zone.color}
              fontSize="8"
              fontWeight="600"
            >
              UTC{zone.offset >= 0 ? '+' : ''}{zone.offset}
            </text>
            {/* City */}
            <text
              x={x + 18}
              y="120"
              textAnchor="middle"
              fill="rgba(255,255,255,0.7)"
              fontSize="9"
              fontWeight="600"
            >
              {zone.city}
            </text>
            {/* Day/night bar */}
            <rect
              x={x + 6}
              y="130"
              width="24"
              height="4"
              rx="2"
              fill={isDay ? '#FFD54F' : '#5C6BC0'}
              opacity="0.6"
            />
          </g>
        );
      })}

      {/* Title */}
      <text x="210" y="18" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontWeight="600">
        Fusos Horários ao Redor do Mundo (Tempo Real)
      </text>

      {/* Legend */}
      <circle cx="130" cy="180" r="5" fill="#FFD54F" opacity="0.6" />
      <text x="140" y="184" fill="rgba(255,255,255,0.5)" fontSize="9">Dia</text>
      <circle cx="180" cy="180" r="5" fill="#5C6BC0" opacity="0.6" />
      <text x="190" y="184" fill="rgba(255,255,255,0.5)" fontSize="9">Noite</text>

      {/* Arrow showing direction */}
      <text x="330" y="184" fill="rgba(255,255,255,0.35)" fontSize="8">
        ← Oeste | Leste →
      </text>
    </svg>
  );
}
