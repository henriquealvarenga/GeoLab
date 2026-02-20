import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import quizzes from '../../data/quizzes';
import lessons from '../../data/lessons';
import styles from './Quiz.module.css';

export default function Quiz() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore } = usePlayer();
  const { play } = useSound();

  const questions = quizzes[lessonId];
  const lesson = lessons.find((l) => l.id === Number(lessonId));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  if (!questions) {
    return (
      <div className={styles.container}>
        <p>Quiz não encontrado!</p>
        <button className={styles.btn} onClick={() => navigate('/home')}>Voltar</button>
      </div>
    );
  }

  const q = questions[current];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correct;
    if (isCorrect) {
      play('correct');
      setScore((s) => s + 1);
    } else {
      play('wrong');
    }
    setAnswers((a) => [...a, { selected, correct: q.correct, isCorrect }]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const finalScore = score + (selected === q.correct ? 0 : 0);
      saveQuizScore(lessonId, finalScore + (answers[answers.length - 1]?.isCorrect ? 0 : 0), questions.length);
      play('complete');
      setFinished(true);
    }
  };

  if (finished) {
    const finalScore = answers.filter((a) => a.isCorrect).length;
    const isPerfect = finalScore === questions.length;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <div className={styles.resultEmoji}>
            {isPerfect ? '🏆' : percentage >= 60 ? '⭐' : '📚'}
          </div>
          <h2 className={styles.resultTitle}>
            {isPerfect ? 'Perfeito!' : percentage >= 60 ? 'Muito bem!' : 'Continue estudando!'}
          </h2>
          <div className={styles.scoreCircle}>
            <span className={styles.scoreNum}>{finalScore}</span>
            <span className={styles.scoreTotal}>/{questions.length}</span>
          </div>
          <p className={styles.xpEarned}>+{finalScore * 20} XP ganhos!</p>
          {isPerfect && (
            <p className={styles.perfectMsg}>Todas corretas! Você é incrível!</p>
          )}
          <div className={styles.resultBtns}>
            <button className={styles.btn} onClick={() => navigate('/home')}>
              Início
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => {
                setCurrent(0);
                setSelected(null);
                setShowResult(false);
                setScore(0);
                setFinished(false);
                setAnswers([]);
              }}
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.quizCard}>
        {/* Progress */}
        <div className={styles.progress}>
          <div
            className={styles.progressFill}
            style={{
              width: `${((current + 1) / questions.length) * 100}%`,
              background: lesson?.color || '#4FC3F7',
            }}
          />
        </div>

        <div className={styles.quizHeader}>
          <span className={styles.qNum}>
            Pergunta {current + 1} de {questions.length}
          </span>
          {lesson && <span className={styles.lessonTag} style={{ color: lesson.color }}>{lesson.emoji} {lesson.title.split('—')[0].trim()}</span>}
        </div>

        <h2 className={styles.question}>{q.question}</h2>

        <div className={styles.options}>
          {q.options.map((opt, idx) => {
            let optClass = styles.option;
            if (showResult) {
              if (idx === q.correct) optClass += ` ${styles.correct}`;
              else if (idx === selected) optClass += ` ${styles.wrong}`;
            } else if (idx === selected) {
              optClass += ` ${styles.selected}`;
            }
            return (
              <button
                key={idx}
                className={optClass}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
              >
                <span className={styles.optLetter}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={styles.explanation}>
            <span className={styles.expIcon}>{selected === q.correct ? '✅' : '❌'}</span>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className={styles.quizNav}>
          {!showResult ? (
            <button
              className={styles.btn}
              onClick={handleConfirm}
              disabled={selected === null}
            >
              Confirmar
            </button>
          ) : (
            <button className={styles.btn} onClick={handleNext}>
              {current < questions.length - 1 ? 'Próxima →' : 'Ver Resultado'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
