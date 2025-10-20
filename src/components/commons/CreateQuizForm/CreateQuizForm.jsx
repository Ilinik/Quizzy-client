import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';

import styles from './CreateQuizForm.module.scss';

const CreateQuizForm = observer(() => {
  const quizStore = useStore().quiz;
  const formStore = useStore().form;
  const navigate = useNavigate();
  const formData = formStore._quizFormData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    formStore.setField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    quizStore.addQuiz(formData);
    formStore.reset();
    navigate('/quizzes');
  };

  return (
    <form className={styles.form}>
      <div className={styles.field}>
        <label>Название квиза</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Например: Основы JavaScript"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Описание</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Кратко опиши, о чём этот тест..."
          rows="3"
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label>Эмодзи</label>
          <select name="emoji" value={formData.emoji} onChange={handleChange}>
            <option>💻</option>
            <option>🎨</option>
            <option>🧠</option>
            <option>🚀</option>
            <option>📚</option>
          </select>
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
          <label>Категория</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="PROGRAMMING">Программирование</option>
            <option value="DESIGN">Дизайн</option>
            <option value="MARKETING">Маркетинг</option>
            <option value="BUSINESS">Бизнес</option>
            <option value="OTHER">Другое</option>
          </select>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Создать квиз
        </Button>
        <Button
          variant="outline"
          color="neutral"
          onClick={() => navigate('/quizzes')}
          type="button"
        >
          Отмена
        </Button>
      </div>
    </form>
  );
});

export default CreateQuizForm;
