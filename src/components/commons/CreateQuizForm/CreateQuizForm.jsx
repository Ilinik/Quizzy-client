import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { ICON_MAP } from '@/constants/icons.js';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { colors } from '@/constants/colors.js';

import styles from './CreateQuizForm.module.scss';

const CreateQuizForm = observer(() => {
  const formStore = useStore().form;
  const quizStore = useStore().quiz;
  const authStore = useStore().auth;
  const navigate = useNavigate();
  const formData = formStore._quizFormData;

  useEffect(() => {
    if (authStore._user?.id) formStore.setCreator(authStore._user.id);
  }, [authStore._user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    formStore.setField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = toJS(formStore._quizFormData);
    console.log(data);
    await quizStore.createQuiz(data);
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
          <label>Иконка</label>
          <div className={styles.iconGrid}>
            {Object.keys(ICON_MAP).map((iconName) => {
              const Icon = ICON_MAP[iconName];
              const isSelected = formData.emoji === iconName;

              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => formStore.setField('emoji', iconName)}
                  className={`${styles.iconButton} ${isSelected ? styles.selected : ''}`}
                >
                  <Icon
                    size={28}
                    strokeWidth={2}
                    color={isSelected ? '#2563eb' : '#374151'}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.field}>
          <label>Цвет иконки</label>
          <div className={styles.colorGrid}>
            {colors.map((color) => {
              const isSelected = formData.color === color.name;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => formStore.setField('color', color.name)}
                  className={`${styles.colorButton} ${
                    isSelected ? styles.selectedColor : ''
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              );
            })}
          </div>
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
          onClick={async (e) => {
            await handleSubmit(e);
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
