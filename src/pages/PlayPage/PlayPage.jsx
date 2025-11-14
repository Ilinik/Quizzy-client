import { useEffect } from 'react';
import { Header } from '@/components/commons/Header/Header.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './PlayPage.module.scss';

const PlayPage = observer(() => {
  const { quizId } = useParams();
  const playStore = useStore().play;
  const navigate = useNavigate();

  useEffect(() => {
    playStore.fetchQuestions(quizId);
  }, [quizId]);

  if (!playStore.isLoaded) {
    return <div className={styles.wrapper}>Загрузка...</div>;
  }

  if (playStore.error) {
    return <div className={styles.wrapper}>{playStore.error}</div>;
  }

  const { currentQuestion, currentIndex, selectedIndex, questions } = playStore;

  if (!currentQuestion) {
    return <div className={styles.wrapper}>Вопросы не найдены</div>;
  }

  const handleSelect = (index) => {
    playStore.setSelectedIndex(index);
  };

  const handleNext = () => {
    const question = currentQuestion;
    const selectedAnswer = question.answers[selectedIndex];

    playStore.saveAnswer(currentIndex, selectedIndex);

    if (selectedAnswer.isCorrect) {
      playStore.increaseCorrect();
    }

    if (currentIndex + 1 < questions.length) {
      playStore.setCurrentIndex(currentIndex + 1);
      playStore.setSelectedIndex(null);
    } else {
      navigate(`/results/${quizId}`);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />
      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>{currentQuestion.text}</h1>

          <div className={styles.answers}>
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={answer.id}
                className={`${styles.answer} ${
                  selectedIndex === index ? styles.selected : ''
                }`}
                onClick={() => handleSelect(index)}
              >
                {answer.text}
              </button>
            ))}
          </div>

          {selectedIndex !== null && (
            <div className={styles.footer}>
              <Button size="large" color="primary" onClick={handleNext}>
                {currentIndex + 1 === questions.length ? 'Завершить' : 'Далее'}
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
});

export default PlayPage;
