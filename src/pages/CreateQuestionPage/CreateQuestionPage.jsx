import { Header } from '@/components/commons/Header/Header.jsx';
import CreateQuestionForm from '@/pages/CreateQuestionPage/CreateQuestionForm/CreateQuestionForm.jsx';
import { useParams } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';
import { observer } from 'mobx-react-lite';

import styles from './CreateQuestionPage.module.scss';

const CreateQuestionPage = observer(() => {
  const quizId = useParams().quizId;
  const formStore = useStore().form;
  return (
    <div className={styles.wrapper}>
      <Header showSearch={false} />

      <main className={styles.main}>
        <section className={styles.card}>
          <h1 className={styles.title}>Меню создания вопросов</h1>
          <p className={styles.subtitle}>Создайте вопросы для своего квиз</p>
          <CreateQuestionForm quizId={quizId} />
        </section>

        {formStore.questions.length > 0 && (
          <section className={styles.questionsSection}>
            <h2 className={styles.questionsTitle}>Созданные вопросы</h2>

            <ul className={styles.questionsList}>
              {formStore.questions.map((q, index) => (
                <li key={q.id || index} className={styles.questionItem}>
                  <div className={styles.questionHeader}>
                    <span className={styles.questionIndex}>{index + 1}.</span>
                    <p className={styles.questionText}>{q.text}</p>
                  </div>

                  <ul className={styles.answersList}>
                    {q.answers.map((a, i) => (
                      <li
                        key={i}
                        className={`${styles.answerItem} ${
                          a.isCorrect ? styles.correct : ''
                        }`}
                      >
                        {a.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
});

export default CreateQuestionPage;
