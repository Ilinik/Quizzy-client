import { Header } from '@/components/commons/Header/Header.jsx';

import styles from './CreateQuizPage.module.scss';
import CreateQuizForm from '@/pages/CreateQuizPage/CreateQuizForm/CreateQuizForm.jsx';

const CreateQuizPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Создать новый квиз</h1>
          <p className={styles.subtitle}>
            Укажи основные данные квиза, а затем добавь вопросы
          </p>
          <CreateQuizForm />
        </section>
      </main>
    </div>
  );
};

export default CreateQuizPage;
