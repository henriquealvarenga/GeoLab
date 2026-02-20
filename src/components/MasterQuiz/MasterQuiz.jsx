import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../../context/PlayerContext';
import useSound from '../../hooks/useSound';
import quizzes from '../../data/quizzes';
import styles from './MasterQuiz.module.css';

export default function MasterQuiz() {
  const navigate = useNavigate();
  const { player, passMasterQuiz, saveQuizScore } = usePlayer();
  const { play } = useSound();
  const questions = quizzes.master;

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const allLessonsComplete = player.lessonsCompleted.length >= 4;

  if (!started) {
    return (
      <div className={styles.container}>
        <div className={styles.introCard}>
          <div className={styles.trophy}>🏆</div>
          <h1>Quiz Mestre</h1>
          <p className={styles.introDesc}>
            O desafio final! 10 perguntas que cobrem todos os temas.
            Acerte pelo menos 7 para conquistar o título de <strong>Mestre da Geografia</strong>!
          </p>
          {!allLessonsComplete ? (
            <div className={styles.locked}>
              <p>🔒 Complete todas as 4 lições primeiro!</p>
              <p className={styles.progress}>
                {player.lessonsCompleted.length}/4 lições completas
              </p>
              <button className={styles.btn} onClick={() => navigate('/home')}>
                Voltar às Lições
              </button>
            </div>
          ) : (
            <>
              <div className={styles.reward}>
                <p>🏆 +500 XP ao passar</p>
                <p>🎖️ Badge exclusiva: Mestre da Geografia</p>
              </div>
              <button className={styles.btn} onClick={() => { play('click'); setStarted(true); }}>
                Aceitar o Desafio!
              </button>
              <button className={styles.btnSecondary} onClick={() => navigate('/home')}>
                Voltar
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  if (finished) {
    const finalScore = answers.filter((a) => a.isCorrect).length;
    const passed = finalScore >= 7;

    if (passed && !player.masterQuizPassed) {
      passMasterQuiz();
    }

    return (
      <div className={styles.container}>
        <div className={styles.resultCard}>
          <div className={styles.resultEmoji}>{passed ? '🏆' : '💪'}</div>
          <h1>{passed ? 'Você é um Mestre!' : 'Quase lá!'}</h1>
          <div className={styles.scoreDisplay}>
            <span className={styles.scoreNum}>{finalScore}</span>
            <span className={styles.scoreTotal}>/{questions.length}</span>
          </div>
          {passed ? (
            <>
              <p className={styles.xpGain}>+500 XP + Badge Mestre!</p>
              <p className={styles.passMsg}>
                Parabéns! Você dominou latitude, longitude, fusos horários e coordenadas!
              </p>
            </>
          ) : (
            <p className={styles.failMsg}>
              Você precisa de pelo menos 7/10 para passar. Revise as lições e tente novamente!
            </p>
          )}
          <div className={styles.resultBtns}>
            <button className={styles.btn} onClick={() => navigate('/home')}>Início</button>
            {!passed && (
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
            )}
          </div>
        </div>
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
    if (isCorrect) play('correct');
    else play('wrong');
    setAnswers((a) => [...a, { selected, correct: q.correct, isCorrect }]);
    if (isCorrect) setScore((s) => s + 1);
    setShowResult(true);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      saveQuizScore('master', score, questions.length);
      play('complete');
      setFinished(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.quizCard}>
        <div className={styles.quizProgress}>
          <div
            className={styles.quizProgressFill}
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className={styles.quizHeader}>
          <span>🏆 Quiz Mestre — Pergunta {current + 1}/{questions.length}</span>
        </div>

        <h2 className={styles.question}>{q.question}</h2>

        <div className={styles.options}>
          {q.options.map((opt, idx) => {
            let cls = styles.option;
            if (showResult) {
              if (idx === q.correct) cls += ` ${styles.correct}`;
              else if (idx === selected) cls += ` ${styles.wrong}`;
            } else if (idx === selected) {
              cls += ` ${styles.selected}`;
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)} disabled={showResult}>
                <span className={styles.optLetter}>{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={styles.explanation}>
            <span>{selected === q.correct ? '✅' : '❌'}</span>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className={styles.quizNav}>
          {!showResult ? (
            <button className={styles.btn} onClick={handleConfirm} disabled={selected === null}>
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
