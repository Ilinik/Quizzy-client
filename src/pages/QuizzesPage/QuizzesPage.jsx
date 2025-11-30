import { WhiteTile } from '../../components/commons/WhiteTile/WhiteTile';
import { observer } from 'mobx-react-lite';
import QuizCard from '@/components/commons/QuizCard/QuizCard.jsx';
import { useStore } from '@/hooks/useStore.js';
import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowDownFromLine } from 'lucide-react';

import styles from './QuizzesPage.module.scss';
import PageTitle from '@/components/commons/PageTitle/PageTitle.jsx';
import SortSelect from '@/components/commons/SortSelect/SortSelect.jsx';
import Input from '@/components/commons/Input/Input.jsx';

const QuizzesPage = observer(() => {
  const quizStore = useStore().quiz;
  const navigate = useNavigate();

  useEffect(() => {
    quizStore.fetchPublishedQuizzes();
  }, []);

  const sortQuizzes = (field) => {
    quizStore.sortBy(field);
  };

  const searchQuizzes = (value) => {
    quizStore.searchQuiz(value);
  };

  return (
    <WhiteTile>
      <div className={styles.titleWrapper}>
        <PageTitle
          title="Библиотека тестов"
          subtitle="Погрузитесь в мир увлекательных викторин и тестов!"
        />
        <div className={styles.rightSide}>
          <Button
            onClick={() => {
              navigate('/create-quiz');
            }}
          >
            Добавить тест
          </Button>
        </div>
      </div>

      <Input
        style={{ maxWidth: '350px', marginBottom: 25 }}
        label={`Найти нужный тест`}
        placeholder="Укажите название теста"
        value={quizStore._searchValue}
        onChange={searchQuizzes}
      />

      <div className={styles.sortWrapper}>
        <SortSelect
          value={quizStore._sortField}
          onChange={sortQuizzes}
          defaultValue="Сортировка тестов"
          options={[
            { value: 'difficulty', name: 'По сложности' },
            { value: 'questionsCount', name: 'По количеству вопросов' },
          ]}
        />

        <Button
          variant="outline"
          color="neutral"
          onClick={() => {
            quizStore.toggleReverse();
            quizStore.sortBy(quizStore._sortField);
          }}
        >
          <ArrowDownFromLine />
        </Button>
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
