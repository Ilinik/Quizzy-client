import { useStore } from '@/hooks/useStore.js';
import Input from '@/components/commons/Input/Input.jsx';
import Button from '@/components/commons/Button/Button.jsx';
import { observer } from 'mobx-react-lite';
import styles from './CreateQuestionForm.module.scss';
import { useNavigate } from 'react-router-dom';

const CreateQuestionForm = observer(({ quizId }) => {
  const formStore = useStore().form;
  const formData = formStore.questionFormData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    formStore.setQuestionField(name, value);
    formStore.validateQuestionForm();
  };

  const handleAnswerChange = (index, value) => {
    formStore.setAnswer(index, value);
    formStore.validateQuestionForm();
  };

  const handleCorrectSelect = (index) => {
    formStore.markAsCorrect(index);
    formStore.validateQuestionForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formStore.validateQuestionForm()) return;
    await formStore.createQuestion(quizId);
  };

  const handlePublish = async (id) => {
    await formStore.publishQuiz(id);
    navigate('/my-quizzes');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        label="Текст вопроса"
        name="text"
        value={formData.text}
        onChange={handleChange}
        placeholder="Например: Что такое React?"
      />

      {formStore._errors.text && (
        <div className="formError">{formStore._errors.text}</div>
      )}

      <div className={styles.questions}>
        {formData.answers.map((answer, index) => (
          <div key={index} className={styles.field}>
            <Input
              label={`Вариант ответа ${index + 1}`}
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              placeholder="Укажите вариант ответа"
            />

            {formStore._errors[`answer_${index}`] && (
              <div className="formError">
                {formStore._errors[`answer_${index}`]}
              </div>
            )}

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

      {formStore._errors.correct && (
        <div className="formError">{formStore._errors.correct}</div>
      )}

      <div className={styles.buttons}>
        <Button type="submit">Создать вопрос</Button>
        <Button
          variant="outline"
          color="danger"
          type="button"
          onClick={() => navigate('/')}
        >
          Отменить создание
        </Button>
      </div>

      <Button
        color="success"
        className={styles.completeButton}
        type="button"
        onClick={() => handlePublish(quizId)}
      >
        Завершить
      </Button>

      {formStore._errors.server && (
        <div className="formError">{formStore._errors.server}</div>
      )}
    </form>
  );
});

export default CreateQuestionForm;
