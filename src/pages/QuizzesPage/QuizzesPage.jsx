import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';
import { observer } from 'mobx-react-lite';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';
import { useStore } from '@/hooks/useStore.js';
import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './QuizzesPage.module.scss';
import PageTitle from '@/components/commons/PageTitle/PageTitle.jsx';

const QuizzesPage = observer(() => {
  const quizStore = useStore().quiz;
  const navigate = useNavigate();

  useEffect(() => {
    quizStore.fetchQuizzes();
  }, []);

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <PageTitle
          title="Библиотека квизов"
          subtitle="Погрузитесь в мир увлекательных викторин и тестов!"
        />
        <div className={styles.rightSide}>
          <Button
            onClick={() => {
              navigate('/create-quiz');
            }}
          >
            Добавить квиз
          </Button>
        </div>
      </div>
      <div className={styles.quizzesGrid}>
        {quizStore.quizzes.length > 0 ? (
          quizStore.quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} quizId={quiz.id} />
          ))
        ) : (
          <div className={styles.quizStatus}>Не удалось найти квизы</div>
        )}
      </div>
    </WhiteTile>
  );
});

export default QuizzesPage;
