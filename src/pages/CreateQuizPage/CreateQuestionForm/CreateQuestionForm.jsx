import Button from '@/components/commons/Button/Button.jsx';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '@/hooks/useStore.js';

import styles from './CreateQuestionForm.module.scss';

const CreateQuestionForm = observer(() => {
  const { question: questionStore } = useStore();
  const navigate = useNavigate();

  const formData = questionStore._questionFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    questionStore.setField(name, value);
  };

  const handleOptionChange = (index, value) => {
    questionStore.setOption(index, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    questionStore.addQuestion(formData);
    questionStore.reset();
    navigate('/questions');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label>Вопрос</label>
        <input
          type="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Например: Что делает метод map() в JavaScript?"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Сложность</label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
        >
          <option value="EASY">Лёгкий</option>
          <option value="MEDIUM">Средний</option>
          <option value="HARD">Сложный</option>
        </select>
      </div>

      <div className={styles.field}>
        <label>Варианты ответов</label>
        {formData.options.map((option, index) => (
          <div key={index} className={styles.optionRow}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Ответ ${index + 1}`}
              required
            />
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="correctIndex"
                value={index}
                checked={formData.correctIndex === index}
                onChange={() => questionStore.setField('correctIndex', index)}
              />
              Правильный
            </label>
          </div>
        ))}
      </div>

      <div className={styles.actions}>
        <Button type="submit">Создать вопрос</Button>
        <Button
          variant="outline"
          color="neutral"
          onClick={() => navigate('/questions')}
          type="button"
        >
          Отмена
        </Button>
      </div>
    </form>
  );
});

export default CreateQuestionForm;
