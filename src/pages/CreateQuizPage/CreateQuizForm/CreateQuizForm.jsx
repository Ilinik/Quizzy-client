import Button from '@/components/commons/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore.js';
import { ICON_MAP } from '@/constants/icons.js';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { colors } from '@/constants/colors.js';
import Input from '@/components/commons/Input/Input.jsx';
import Textarea from '@/components/commons/Textarea/Textarea.jsx';
import Select from '@/components/commons/Select/Select.jsx';
import '@/assets/styles/base.scss';

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
    const isValid = formStore.validateForm();
    if (!isValid) return;

    const data = toJS(formStore.quizFormData);

    try {
      const createdQuiz = await quizStore.createQuiz(data);
      formStore.reset();

      const quizId = createdQuiz.quiz.id;

      if (quizId) {
        navigate(`/create-quiz/${quizId}/questions`);
      } else {
        console.error('Не удалось получить id квиза');
      }
    } catch (error) {
      console.error('Ошибка при создании квиза:', error);
    }
  };

  return (
    <form className={styles.form}>
      <Input
        label="Название квиза"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Например: Основы JavaScript"
        required
      />

      {formStore._errors.title && (
        <div className="formError">{formStore._errors.title}</div>
      )}

      <Textarea
        label="Описание"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Кратко опиши, о чём этот тест..."
        rows={3}
      />

      {formStore._errors.title && (
        <div className="formError">{formStore._errors.description}</div>
      )}

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

        <Select
          label="Сложность"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          options={[
            { value: 'EASY', label: 'Лёгкий' },
            { value: 'MEDIUM', label: 'Средний' },
            { value: 'HARD', label: 'Сложный' },
          ]}
        />

        <Select
          label="Категория"
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: 'PROGRAMMING', label: 'Программирование' },
            { value: 'DESIGN', label: 'Дизайн' },
            { value: 'MARKETING', label: 'Маркетинг' },
            { value: 'BUSINESS', label: 'Бизнес' },
            { value: 'OTHER', label: 'Другое' },
          ]}
        />
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
