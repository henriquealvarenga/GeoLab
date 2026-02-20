import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cities from '../../data/cities';
import styles from './WorldMap.module.css';

function coordToMap(lat, lng, width, height) {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

export default function WorldMap() {
  const [hoveredCity, setHoveredCity] = useState(null);
  const [mousePos, setMousePos] = useState(null);
  const navigate = useNavigate();
  const W = 800, H = 400;

  const handleMapMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    const lng = (x / W) * 360 - 180;
    const lat = 90 - (y / H) * 180;
    setMousePos({ x, y, lat: lat.toFixed(1), lng: lng.toFixed(1) });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/home')}>← Voltar</button>
        <h1 className={styles.title}>🗺️ Mapa Interativo</h1>
        <p className={styles.subtitle}>Explore coordenadas e localize cidades no mapa</p>
      </div>

      {mousePos && (
        <div className={styles.coords}>
          📍 {mousePos.lat}°{parseFloat(mousePos.lat) >= 0 ? 'N' : 'S'},{' '}
          {mousePos.lng}°{parseFloat(mousePos.lng) >= 0 ? 'E' : 'W'}
        </div>
      )}

      <div className={styles.mapWrap}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.map}
          onMouseMove={handleMapMove}
          onMouseLeave={() => setMousePos(null)}
        >
          {/* Ocean background */}
          <rect x="0" y="0" width={W} height={H} fill="rgba(13, 27, 42, 0.5)" rx="8" />

          {/* Grid lines */}
          {Array.from({ length: 13 }, (_, i) => {
            const lng = -180 + i * 30;
            const x = ((lng + 180) / 360) * W;
            return (
              <g key={`lng${lng}`}>
                <line x1={x} y1={0} x2={x} y2={H} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x={x} y={H - 4} fill="rgba(255,255,255,0.2)" fontSize="7" textAnchor="middle">{lng}°</text>
              </g>
            );
          })}
          {Array.from({ length: 7 }, (_, i) => {
            const lat = -90 + i * 30;
            const y = ((90 - lat) / 180) * H;
            return (
              <g key={`lat${lat}`}>
                <line x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <text x={4} y={y - 3} fill="rgba(255,255,255,0.2)" fontSize="7">{lat}°</text>
              </g>
            );
          })}

          {/* Equator */}
          <line x1={0} y1={H / 2} x2={W} y2={H / 2} stroke="#EF5350" strokeWidth="1" opacity="0.3" />
          {/* Greenwich */}
          <line x1={W / 2} y1={0} x2={W / 2} y2={H} stroke="#EF5350" strokeWidth="1" opacity="0.3" />

          {/* Tropics */}
          {[23.5, -23.5].map((lat) => {
            const y = ((90 - lat) / 180) * H;
            return (
              <line key={lat} x1={0} y1={y} x2={W} y2={y} stroke="#FFE082" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.3" />
            );
          })}

          {/* Simplified continent shapes */}
          {/* South America */}
          <path d="M230,210 L240,195 L255,195 L265,210 L270,240 L275,270 L270,300 L255,320 L240,310 L235,280 L225,250 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />
          {/* North America */}
          <path d="M150,80 L170,70 L210,75 L240,85 L260,100 L270,130 L265,155 L250,175 L240,190 L220,185 L200,170 L180,150 L160,130 L140,110 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />
          {/* Africa */}
          <path d="M390,175 L420,170 L445,180 L460,200 L465,240 L455,280 L440,310 L420,320 L400,300 L390,260 L385,220 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />
          {/* Europe */}
          <path d="M380,90 L400,80 L430,85 L450,100 L460,120 L455,145 L440,160 L420,165 L395,155 L380,135 L375,110 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />
          {/* Asia */}
          <path d="M460,60 L520,55 L580,65 L640,80 L680,100 L690,130 L680,160 L660,180 L620,190 L570,185 L530,170 L490,155 L465,135 L455,110 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />
          {/* Australia */}
          <path d="M630,260 L670,250 L710,260 L720,280 L710,310 L680,320 L650,310 L635,290 Z"
            fill="rgba(129,199,132,0.15)" stroke="rgba(129,199,132,0.3)" strokeWidth="1" />

          {/* Mouse crosshair */}
          {mousePos && (
            <>
              <line x1={mousePos.x} y1={0} x2={mousePos.x} y2={H} stroke="#4FC3F7" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 2" />
              <line x1={0} y1={mousePos.y} x2={W} y2={mousePos.y} stroke="#4FC3F7" strokeWidth="0.5" opacity="0.4" strokeDasharray="3 2" />
            </>
          )}

          {/* Cities */}
          {cities.map((city, idx) => {
            const { x, y } = coordToMap(city.lat, city.lng, W, H);
            const isHovered = hoveredCity === idx;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredCity(idx)}
                onMouseLeave={() => setHoveredCity(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={x} cy={y} r={isHovered ? 8 : 4} fill="#FFB74D" opacity={isHovered ? 1 : 0.7}>
                  {!isHovered && <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />}
                </circle>
                {isHovered && (
                  <>
                    <rect x={x - 55} y={y - 42} width="110" height="36" rx="6" fill="rgba(0,0,0,0.8)" />
                    <text x={x} y={y - 28} fill="#fff" fontSize="9" textAnchor="middle" fontWeight="700">
                      {city.emoji} {city.name}
                    </text>
                    <text x={x} y={y - 15} fill="#4FC3F7" fontSize="8" textAnchor="middle">
                      {city.lat}°{city.lat >= 0 ? 'N' : 'S'}, {city.lng}°{city.lng >= 0 ? 'E' : 'W'}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className={styles.legend}>
        <span><span className={styles.legendDot} style={{ background: '#EF5350' }} /> Equador / Greenwich</span>
        <span><span className={styles.legendDot} style={{ background: '#FFE082' }} /> Trópicos</span>
        <span><span className={styles.legendDot} style={{ background: '#FFB74D' }} /> Cidades</span>
      </div>
    </div>
  );
}
