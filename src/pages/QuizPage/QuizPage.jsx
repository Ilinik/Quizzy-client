import { Header } from '@/components/commons/Header/Header.jsx';
import Loader from '@/components/commons/Loader/Loader.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { getDisplayName } from '@/helpers/getDisplayName.js';
import { getDifficultyColor } from '@/helpers/getDifficultyColor.js';

import styles from './QuizPage.module.scss';
import Button from '@/components/commons/Button/Button.jsx';

const QuizPage = observer(() => {
  const { quizId } = useParams();
  const quizStore = useStore().quiz;
  const navigate = useNavigate();

  useEffect(() => {
    quizStore.loadQuiz(quizId);
  }, [quizId]);

  if (quizStore.isLoading || !quizStore.currentQuiz) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader size="lg" />
      </div>
    );
  }

  const quiz = quizStore.currentQuiz;

  const randomQuestionId =
    quiz.questions[Math.floor(Math.random() * quiz.questions.length)].id;

  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.quizCard}>
          <h1 className={styles.title}>{quiz.title}</h1>
          {quiz.description && (
            <p className={styles.description}>{quiz.description}</p>
          )}

          <div className={styles.info}>
            <p>
              Уровень сложности:{' '}
              <span
                className={`${styles.difficulty} ${getDifficultyColor(
                  quiz.difficulty,
                  styles,
                )}`}
              >
                {getDisplayName(quiz.difficulty, 'difficulty')}
              </span>
            </p>

            <p>
              Категория:{' '}
              <span className={styles.category}>
                {getDisplayName(quiz.category, 'category')}
              </span>
            </p>

            <p>
              Вопросов: <strong>{quiz.questions.length}</strong>
            </p>
          </div>

          <Button
            color="primary"
            size="large"
            className={styles.startButton}
            onClick={() =>
              navigate(`/quizzes/${quiz.id}/play/${randomQuestionId}`)
            }
          >
            Начать квиз
          </Button>
        </section>
      </main>
    </div>
  );
});

export default QuizPage;
