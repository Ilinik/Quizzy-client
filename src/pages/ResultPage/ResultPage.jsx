import { Header } from '@/components/layouts/Header/Header.jsx';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { useNavigate } from 'react-router-dom';

import styles from './ResultPage.module.scss';
import Button from '@/components/commons/Button/Button.jsx';

const ResultPage = observer(() => {
  const playStore = useStore().play;
  const navigate = useNavigate();

  const correct = playStore.result;
  const total = playStore.questions.length;
  const questions = playStore.questions;
  const userAnswers = playStore.userAnswers;

  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.resultCard}>
          <h1 className={styles.title}>Результат</h1>

          <p className={styles.score}>
            Вы ответили правильно на{' '}
            <strong>
              {correct} / {total}
            </strong>{' '}
            вопросов
          </p>

          <div className={styles.questionsList}>
            {questions.map((q, index) => {
              const userAnswerIndex = userAnswers[index];
              return (
                <div key={q.id} className={styles.questionItem}>
                  <h3 className={styles.questionText}>{q.text}</h3>

                  <ul className={styles.answers}>
                    {q.answers.map((a, aIndex) => {
                      const isCorrect = a.isCorrect;
                      const isChosen = aIndex === userAnswerIndex;

                      return (
                        <li
                          key={a.id}
                          className={`
                            ${styles.answer}
                            ${isCorrect ? styles.correct : ''}
                            ${isChosen && !isCorrect ? styles.wrong : ''}
                          `}
                        >
                          {a.text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>

          <Button
            size="large"
            color="primary"
            className={styles.backButton}
            onClick={() => navigate('/')}
          >
            Вернуться к тестам
          </Button>
        </section>
      </main>
    </div>
  );
});

export default ResultPage;
