import { useState } from 'react';

export default function LatitudeDiagram() {
  const [hovered, setHovered] = useState(null);

  const lines = [
    { y: 50, label: 'Círculo Polar Ártico', deg: '66,5°N', color: '#90CAF9' },
    { y: 88, label: 'Trópico de Câncer', deg: '23,5°N', color: '#FFE082' },
    { y: 130, label: 'Equador', deg: '0°', color: '#EF5350' },
    { y: 172, label: 'Trópico de Capricórnio', deg: '23,5°S', color: '#FFE082' },
    { y: 210, label: 'Círculo Polar Antártico', deg: '66,5°S', color: '#90CAF9' },
  ];

  return (
    <svg viewBox="0 0 400 260" style={{ width: '100%', maxWidth: 420 }}>
      {/* Earth ellipse */}
      <defs>
        <radialGradient id="earthGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#4FC3F7" />
          <stop offset="50%" stopColor="#1976D2" />
          <stop offset="100%" stopColor="#0D47A1" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="130" rx="140" ry="110" fill="url(#earthGrad)" opacity="0.2" />
      <ellipse cx="200" cy="130" rx="140" ry="110" fill="none" stroke="#4FC3F7" strokeWidth="1.5" opacity="0.5" />

      {/* Latitude lines */}
      {lines.map((line, i) => {
        const halfWidth = 140 * Math.sqrt(1 - Math.pow((line.y - 130) / 110, 2));
        const isHovered = hovered === i;
        return (
          <g
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'pointer' }}
          >
            <line
              x1={200 - halfWidth}
              y1={line.y}
              x2={200 + halfWidth}
              y2={line.y}
              stroke={line.color}
              strokeWidth={isHovered ? 3 : line.deg === '0°' ? 2.5 : 1.5}
              strokeDasharray={line.deg === '0°' ? 'none' : '6 3'}
              opacity={isHovered ? 1 : 0.7}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="18"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
            {/* Label */}
            <text
              x={200 + halfWidth + 8}
              y={line.y + 4}
              fill={isHovered ? '#fff' : line.color}
              fontSize={isHovered ? 11 : 9}
              fontWeight={isHovered ? 700 : 400}
              style={{ transition: 'all 0.2s' }}
            >
              {line.deg}
            </text>
            {isHovered && (
              <text
                x="200"
                y="250"
                fill="#fff"
                fontSize="12"
                textAnchor="middle"
                fontWeight="600"
              >
                {line.label} ({line.deg})
              </text>
            )}
          </g>
        );
      })}

      {/* Axis */}
      <line x1="200" y1="10" x2="200" y2="250" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="200" y="8" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle">N</text>
      <text x="200" y="258" fill="rgba(255,255,255,0.5)" fontSize="8" textAnchor="middle">S</text>

      {/* Arrows showing N/S */}
      <polygon points="200,16 196,24 204,24" fill="rgba(255,255,255,0.4)" />
      <polygon points="200,244 196,236 204,236" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}
