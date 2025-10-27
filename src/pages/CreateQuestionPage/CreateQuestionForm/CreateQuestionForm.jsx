import { useStore } from '@/hooks/useStore.js';
import Input from '@/components/commons/Input/Input.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import { observer } from 'mobx-react-lite';
import styles from './CreateQuestionForm.module.scss';

const CreateQuestionForm = observer(({ quizId }) => {
  const formStore = useStore().form;
  const formData = formStore.questionFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    formStore.setQuestionField(name, value);
  };

  const handleAnswerChange = (index, value) => {
    formStore.setAnswer(index, value);
  };

  const handleCorrectSelect = (index) => {
    formStore.markAsCorrect(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formStore.addQuestion(quizId);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Текст вопроса"
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Например: Что такое React?"
        required
      />

      <div className={styles.questions}>
        {formData.answers.map((answer, index) => (
          <div key={index} className={styles.field}>
            <Input
              label={`Вариант ответа ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Укажите вариант ответа"
              required
            />
            <label className={styles.radioLabel}>
              <input
                className={styles.radio}
                type="radio"
                name="correct"
                checked={answer.isCorrect}
                onChange={() => handleCorrectSelect(index)}
              />
              <span className={styles.radioText}>Правильный</span>
            </label>
          </div>
        ))}
      </div>

      <div className={styles.buttons}>
        <Button type="submit">Создать вопрос</Button>
        <Button
          variant="outline"
          color="danger"
          type="button"
          onClick={() => formStore.questionFormReset()}
        >
          Отменить создание
        </Button>
      </div>

      <Button color="success" className={styles.completeButton} type="button">
        Завершить
      </Button>
    </form>
  );
});

export default CreateQuestionForm;
