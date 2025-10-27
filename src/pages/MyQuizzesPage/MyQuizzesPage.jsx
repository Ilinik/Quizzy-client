import { WhiteTile } from '@/components/commons/WhiteTile/WhiteTile.jsx';
import { useStore } from '@/hooks/useStore.js';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './MyQuizzesPage.module.scss';

const MyQuizzesPage = observer(() => {
  const quizStore = useStore().quiz;

  useEffect(() => {
    quizStore.fetchUnpublishedQuizzes();
    console.log('fetch unpublish');
  }, []);

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <div className={styles.leftSide}>
          <h1 className={styles.title}>Список ваших квизов</h1>
          <p className={styles.subtitle}>
            Создавайте, редактируйте и публикуйте свои квизы.
          </p>
        </div>
      </div>

      <div className={styles.quizzesGrid}>
        {quizStore.unpublishedQuizzes.length > 0 ? (
          quizStore.unpublishedQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))
        ) : (
          <div className={styles.quizStatus}>
            У вас пока нет созданных квизов. Добавьте свой первый на странице
            «Квизы».
          </div>
        )}
      </div>
    </WhiteTile>
  );
});

export default MyQuizzesPage;
