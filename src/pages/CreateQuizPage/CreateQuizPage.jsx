import { Header } from '@/components/layouts/Header/Header.jsx';
import CreateQuizForm from '@/pages/CreateQuizPage/CreateQuizForm/CreateQuizForm.jsx';
import styles from './CreateQuizPage.module.scss';

const CreateQuizPage = () => {
  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Создать новый тест</h1>
          <p className={styles.subtitle}>
            Укажи основные данные теста, а затем добавь вопросы
          </p>
          <CreateQuizForm />
        </section>
      </main>
    </div>
  );
};

export default CreateQuizPage;
