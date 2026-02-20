import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import lessons from '../../data/lessons';
import LatitudeDiagram from './diagrams/LatitudeDiagram';
import LongitudeDiagram from './diagrams/LongitudeDiagram';
import TimeZoneDiagram from './diagrams/TimeZoneDiagram';
import CoordinatesDiagram from './diagrams/CoordinatesDiagram';
import styles from './LessonPage.module.css';

const DIAGRAMS = {
  LatitudeDiagram,
  LongitudeDiagram,
  TimeZoneDiagram,
  CoordinatesDiagram,
};

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n- /g, '<br/>• ')
    .replace(/\n/g, '<br/>');
}

export default function LessonPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { completeLesson, player } = usePlayer();
  const { play } = useSound();

  const lesson = lessons.find((l) => l.slug === slug);
  const [currentSection, setCurrentSection] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!lesson) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <p>Lição não encontrada!</p>
          <button className={styles.btn} onClick={() => navigate('/home')}>Voltar</button>
        </div>
      </div>
    );
  }

  const section = lesson.sections[currentSection];
  const isLast = currentSection === lesson.sections.length - 1;
  const alreadyCompleted = player.lessonsCompleted.includes(lesson.id);

  const handleNext = () => {
    if (isLast) {
      if (!alreadyCompleted) {
        completeLesson(lesson.id);
        play('complete');
        setCompleted(true);
      } else {
        navigate(`/quiz/${lesson.id}`);
      }
    } else {
      play('click');
      setCurrentSection((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      play('click');
      setCurrentSection((prev) => prev - 1);
    }
  };

  if (completed) {
    return (
      <div className={styles.container}>
        <div className={styles.completedCard}>
          <div className={styles.completedEmoji}>🎉</div>
          <h2>Lição Completa!</h2>
          <p className={styles.xpGain}>+{lesson.xpReward} XP</p>
          <p>Você completou: <strong>{lesson.title}</strong></p>
          <div className={styles.completedBtns}>
            <button className={styles.btn} onClick={() => navigate(`/quiz/${lesson.id}`)}>
              Fazer Quiz
            </button>
            <button className={styles.btnSecondary} onClick={() => navigate('/home')}>
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const DiagramComponent = section.type === 'diagram' ? DIAGRAMS[section.diagram] : null;

  return (
    <div className={styles.container}>
      <div className={styles.lessonCard}>
        {/* Progress bar */}
        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{ width: `${((currentSection + 1) / lesson.sections.length) * 100}%`, background: lesson.color }}
          />
        </div>

        {/* Header */}
        <div className={styles.lessonHeader}>
          <span className={styles.lessonEmoji}>{lesson.emoji}</span>
          <div>
            <h1 className={styles.lessonTitle}>{lesson.title}</h1>
            <p className={styles.sectionCount}>
              {currentSection + 1} / {lesson.sections.length}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {section.type === 'diagram' && DiagramComponent && (
            <div className={styles.diagramWrap}>
              <DiagramComponent />
              <p className={styles.diagramHint}>Passe o mouse sobre os elementos para explorar!</p>
            </div>
          )}

          {section.type !== 'diagram' && (
            <>
              <div className={styles.sectionIcon}>
                {section.type === 'intro' && '🚀'}
                {section.type === 'concept' && '💡'}
                {section.type === 'funFact' && '🌟'}
              </div>
              <h2 className={styles.sectionTitle}>{section.title}</h2>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(section.text) }}
              />
            </>
          )}
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <button
            className={styles.btnSecondary}
            onClick={handlePrev}
            disabled={currentSection === 0}
          >
            ← Anterior
          </button>
          <button
            className={styles.btn}
            onClick={handleNext}
            style={{ background: isLast ? `linear-gradient(135deg, ${lesson.color}, #1976D2)` : undefined }}
          >
            {isLast
              ? alreadyCompleted
                ? 'Ir para Quiz →'
                : 'Completar Lição ✓'
              : 'Próximo →'}
          </button>
        </div>
      </div>
    </div>
  );
}
