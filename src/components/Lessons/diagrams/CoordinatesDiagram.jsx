import { useState } from 'react';

const PLACES = [
  { name: 'São Paulo', lat: -23.5, lng: -46.6, emoji: '🇧🇷' },
  { name: 'Paris', lat: 48.9, lng: 2.3, emoji: '🇫🇷' },
  { name: 'Cairo', lat: 30.0, lng: 31.2, emoji: '🇪🇬' },
  { name: 'Tóquio', lat: 35.7, lng: 139.7, emoji: '🇯🇵' },
  { name: 'NY', lat: 40.7, lng: -74.0, emoji: '🇺🇸' },
];

function coordToSVG(lat, lng) {
  const x = 200 + (lng / 180) * 180;
  const y = 110 - (lat / 90) * 100;
  return { x, y };
}

export default function CoordinatesDiagram() {
  const [active, setActive] = useState(null);

  return (
    <svg viewBox="0 0 400 240" style={{ width: '100%', maxWidth: 440 }}>
      {/* Grid */}
      {/* Vertical lines (longitude) */}
      {[-180, -120, -60, 0, 60, 120, 180].map((lng) => {
        const x = 200 + (lng / 180) * 180;
        return (
          <g key={`lng${lng}`}>
            <line x1={x} y1={10} x2={x} y2={210} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <text x={x} y={225} fill="rgba(255,255,255,0.35)" fontSize="7" textAnchor="middle">
              {lng}°
            </text>
          </g>
        );
      })}

      {/* Horizontal lines (latitude) */}
      {[-90, -60, -30, 0, 30, 60, 90].map((lat) => {
        const y = 110 - (lat / 90) * 100;
        return (
          <g key={`lat${lat}`}>
            <line x1={20} y1={y} x2={380} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            <text x={14} y={y + 3} fill="rgba(255,255,255,0.35)" fontSize="7" textAnchor="end">
              {lat}°
            </text>
          </g>
        );
      })}

      {/* Equator highlight */}
      <line x1={20} y1={110} x2={380} y2={110} stroke="#EF5350" strokeWidth="1" opacity="0.4" />
      {/* Greenwich highlight */}
      <line x1={200} y1={10} x2={200} y2={210} stroke="#EF5350" strokeWidth="1" opacity="0.4" />

      {/* Origin point */}
      <circle cx={200} cy={110} r="3" fill="#EF5350" opacity="0.6">
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Places */}
      {PLACES.map((place, i) => {
        const { x, y } = coordToSVG(place.lat, place.lng);
        const isActive = active === i;
        return (
          <g
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Crosshair when active */}
            {isActive && (
              <>
                <line x1={x} y1={10} x2={x} y2={210} stroke="#4FC3F7" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 2" />
                <line x1={20} y1={y} x2={380} y2={y} stroke="#4FC3F7" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 2" />
              </>
            )}
            <circle
              cx={x}
              cy={y}
              r={isActive ? 8 : 5}
              fill={isActive ? '#4FC3F7' : '#FFB74D'}
              opacity={isActive ? 0.9 : 0.7}
              style={{ transition: 'all 0.2s' }}
            >
              {!isActive && (
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite" />
              )}
            </circle>
            <text x={x} y={y - 10} textAnchor="middle" fontSize="12">
              {place.emoji}
            </text>
            {isActive && (
              <text x={x} y={y + 20} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600">
                {place.name} ({place.lat}°, {place.lng}°)
              </text>
            )}
          </g>
        );
      })}

      {/* Labels */}
      <text x="200" y="238" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="8">Longitude</text>
      <text x="6" y="110" fill="rgba(255,255,255,0.4)" fontSize="7" transform="rotate(-90, 6, 110)">Latitude</text>
    </svg>
  );
}
