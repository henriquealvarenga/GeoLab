import { useState } from 'react';

export default function LongitudeDiagram() {
  const [activeMeridian, setActiveMeridian] = useState(null);

  const meridians = [
    { angle: -60, label: '120°W', color: '#CE93D8' },
    { angle: -30, label: '60°W', color: '#CE93D8' },
    { angle: 0, label: '0° Greenwich', color: '#EF5350' },
    { angle: 30, label: '60°E', color: '#FFB74D' },
    { angle: 60, label: '120°E', color: '#FFB74D' },
  ];

  const cx = 200, cy = 130, rx = 140, ry = 110;

  return (
    <svg viewBox="0 0 400 270" style={{ width: '100%', maxWidth: 420 }}>
      <defs>
        <radialGradient id="earthGradLng" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="50%" stopColor="#1976D2" />
          <stop offset="100%" stopColor="#0D47A1" />
        </radialGradient>
      </defs>

      {/* Earth */}
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#earthGradLng)" opacity="0.15" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#4FC3F7" strokeWidth="1.5" opacity="0.4" />

      {/* Equator reference */}
      <line x1={cx - rx} y1={cy} x2={cx + rx} y2={cy} stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />

      {/* Meridians as ellipses */}
      {meridians.map((m, i) => {
        const horizRadius = Math.abs(Math.sin((m.angle * Math.PI) / 180)) * rx;
        const offsetX = Math.cos((m.angle * Math.PI) / 180) * rx * 0.1;
        const isActive = activeMeridian === i;
        const isGreenwich = m.angle === 0;
        return (
          <g
            key={i}
            onMouseEnter={() => setActiveMeridian(i)}
            onMouseLeave={() => setActiveMeridian(null)}
            style={{ cursor: 'pointer' }}
          >
            <ellipse
              cx={cx + offsetX}
              cy={cy}
              rx={Math.max(horizRadius, 2)}
              ry={ry}
              fill="none"
              stroke={m.color}
              strokeWidth={isActive ? 3 : isGreenwich ? 2.5 : 1.5}
              strokeDasharray={isGreenwich ? 'none' : '6 3'}
              opacity={isActive ? 1 : 0.6}
            />
            {/* Pole labels */}
            <text
              x={cx + offsetX}
              y={cy - ry - 6}
              fill={isActive ? '#fff' : m.color}
              fontSize={isActive ? 10 : 8}
              textAnchor="middle"
              fontWeight={isActive ? 700 : 400}
            >
              {m.label}
            </text>
            {isActive && (
              <text
                x="200"
                y="258"
                fill="#fff"
                fontSize="12"
                textAnchor="middle"
                fontWeight="600"
              >
                Meridiano: {m.label}
              </text>
            )}
          </g>
        );
      })}

      {/* Poles */}
      <circle cx={cx} cy={cy - ry} r="3" fill="#fff" opacity="0.7" />
      <circle cx={cx} cy={cy + ry} r="3" fill="#fff" opacity="0.7" />
      <text x={cx + 8} y={cy - ry - 2} fill="rgba(255,255,255,0.6)" fontSize="9">Polo Norte</text>
      <text x={cx + 8} y={cy + ry + 12} fill="rgba(255,255,255,0.6)" fontSize="9">Polo Sul</text>

      {/* W/E labels */}
      <text x={cx - rx - 16} y={cy + 4} fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600">W</text>
      <text x={cx + rx + 8} y={cy + 4} fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600">E</text>
    </svg>
  );
}
