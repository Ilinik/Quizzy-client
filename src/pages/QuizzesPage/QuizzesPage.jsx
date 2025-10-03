import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';
import { observer } from 'mobx-react-lite';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';

import styles from './QuizzesPage.module.scss';
import { useStore } from '@/hooks/useStore.js';

const QuizzesPage = observer(() => {
  const quizStore = useStore().quiz;

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>Библиотека квизов</h1>
        <p className={styles.subtitle}>
          Погрузитесь в мир увлекательных викторин и тестов!
        </p>
      </div>
      <div className={styles.quizzesGrid}>
        {quizStore.quizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </WhiteTile>
  );
});

export default QuizzesPage;
