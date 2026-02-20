import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import stories from '../../data/stories';
import styles from './Stories.module.css';

function renderText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

export default function Stories() {
  const [openStory, setOpenStory] = useState(null);
  const navigate = useNavigate();
  const { readStory, player } = usePlayer();
  const { play } = useSound();

  const handleOpen = (story) => {
    play('navigate');
    setOpenStory(story);
    readStory(story.id);
  };

  const handleClose = () => {
    play('click');
    setOpenStory(null);
  };

  if (openStory) {
    return (
      <div className={styles.container}>
        <div className={styles.storyFull}>
          <button className={styles.closeBtn} onClick={handleClose}>← Voltar às Histórias</button>
          <div className={styles.storyHeader} style={{ borderColor: openStory.color }}>
            <span className={styles.storyEmoji}>{openStory.emoji}</span>
            <div>
              <h1 className={styles.storyTitle}>{openStory.title}</h1>
              <p className={styles.storyMeta}>
                📅 {openStory.period} • 📍 {openStory.location} • 🌐 {openStory.coordinates}
              </p>
            </div>
          </div>
          <div className={styles.storyBody}>
            {openStory.paragraphs.map((p, i) => (
              <p
                key={i}
                className={styles.paragraph}
                style={{ animationDelay: `${i * 0.1}s` }}
                dangerouslySetInnerHTML={{ __html: renderText(p) }}
              />
            ))}
          </div>
          <div className={styles.storyFooter}>
            <span className={styles.xpBadge}>+50 XP</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/home')}>← Voltar</button>
        <h1 className={styles.title}>📖 Histórias Épicas</h1>
        <p className={styles.subtitle}>As histórias reais por trás da Geografia que mudaram o mundo</p>
      </div>

      <div className={styles.grid}>
        {stories.map((story) => {
          const isRead = player.storiesRead.includes(story.id);
          return (
            <button
              key={story.id}
              className={`${styles.card} ${isRead ? styles.read : ''}`}
              style={{ '--accent': story.color }}
              onClick={() => handleOpen(story)}
            >
              <div className={styles.cardEmoji}>{story.emoji}</div>
              <h3 className={styles.cardTitle}>{story.title}</h3>
              <p className={styles.cardPeriod}>{story.period} • {story.location}</p>
              <p className={styles.cardPreview}>
                {story.paragraphs[0].replace(/\*\*/g, '').slice(0, 100)}...
              </p>
              {isRead && <span className={styles.readBadge}>✓ Lida</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
