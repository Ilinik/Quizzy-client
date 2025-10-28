import { Header } from '@/components/commons/Header/Header.jsx';
import CreateQuestionForm from '@/pages/CreateQuestionPage/CreateQuestionForm/CreateQuestionForm.jsx';

import styles from './CreateQuestionPage.module.scss';
import { useParams } from 'react-router-dom';

const CreateQuestionPage = () => {
  const quizId = useParams().quizId;
  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Меню создания вопросов</h1>
          <p className={styles.subtitle}>Создайте вопросы для своего квиз</p>
          <CreateQuestionForm quizId={quizId} />
        </section>
      </main>
    </div>
  );
};

export default CreateQuestionPage;
