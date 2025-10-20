import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';
import { observer } from 'mobx-react-lite';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';

import styles from './QuizzesPage.module.scss';
import { useStore } from '@/hooks/useStore.js';
import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

const QuizzesPage = observer(() => {
  const quizStore = useStore().quiz;
  const navigate = useNavigate();

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Библиотека квизов</h1>
          <p className={styles.subtitle}>
            Погрузитесь в мир увлекательных викторин и тестов!
          </p>
        </div>
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
        {quizStore._quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </WhiteTile>
  );
});

export default QuizzesPage;
