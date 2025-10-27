import { Header } from '@/components/commons/Header/Header.jsx';
import CreateQuestionForm from '@/pages/CreateQuestionPage/CreateQuestionForm/CreateQuestionForm.jsx';

import styles from './CreateQuestionPage.module.scss';

const CreateQuestionPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Меню создания вопросов</h1>
          <p className={styles.subtitle}>Создайте вопросы для своего квиз</p>
          <CreateQuestionForm />
        </section>
      </main>
    </div>
  );
};

export default CreateQuestionPage;
