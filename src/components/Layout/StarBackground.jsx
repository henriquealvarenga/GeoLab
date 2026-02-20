import { useMemo } from 'react';
import styles from './StarBackground.module.css';

export default function StarBackground({ theme }) {
  const stars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 120; i++) {
      arr.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      });
    }
    return arr;
  }, []);

  if (theme === 'light') {
    return <div className={`${styles.bg} ${styles.light}`} />;
  }

  return (
    <div className={styles.bg}>
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
