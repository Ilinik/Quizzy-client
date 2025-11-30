import { WhiteTile } from '@/components/commons/WhiteTile/WhiteTile.jsx';
import { useStore } from '@/hooks/useStore.js';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import styles from './MyQuizzesPage.module.scss';
import PageTitle from '@/components/commons/PageTitle/PageTitle.jsx';

const MyQuizzesPage = observer(() => {
  const quizStore = useStore().quiz;

  useEffect(() => {
    quizStore.fetchUserQuizzes();
  }, []);

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <PageTitle
          title="Список ваших тестов"
          subtitle="Создавайте, редактируйте и публикуйте свои тесты"
        />
      </div>

      <div className={styles.quizzesGrid}>
        {quizStore.quizzes.length > 0 ? (
          quizStore.quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quizId={quiz.id}
              quiz={quiz}
              variant="myQuiz"
            />
          ))
        ) : (
          <div className={styles.quizStatus}>
            У вас пока нет созданных квизов. Добавьте свой первый на странице
            «Тесты».
          </div>
        )}
      </div>
    </WhiteTile>
  );
});

export default MyQuizzesPage;
