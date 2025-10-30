import { useState } from 'react';
import { Header } from '@/components/commons/Header/Header.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import styles from './PlayPage.module.scss';

const PlayPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isResult, setIsResult] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };

  const handleNext = () => {
    if (selectedIndex === currentQuestion.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
    } else {
      setIsResult(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <>
            <h1 className={styles.title}>{currentQuestion.text}</h1>

            <div className={styles.answers}>
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={`${styles.answer} ${
                    selectedIndex === index ? styles.selected : ''
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  {answer}
                </button>
              ))}
            </div>

            {selectedIndex !== null && (
              <div className={styles.footer}>
                <Button size="large" color="primary" onClick={handleNext}>
                  {currentIndex + 1 === questions.length
                    ? 'Завершить'
                    : 'Далее'}
                </Button>
              </div>
            )}
          </>
        </section>
      </main>
    </div>
  );
};

export default PlayPage;
