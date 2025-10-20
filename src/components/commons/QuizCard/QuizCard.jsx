import Button from '@/components/commons/Button/Button.jsx';
import { ICON_MAP } from '@/constants/icons.js';

import styles from '@/components/commons/QuizCard/QuizCard.module.scss';

const QuizCard = ({ quiz }) => {
  const Icon = ICON_MAP[quiz.emoji] || ICON_MAP['Laptop'];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Легкий':
        return styles.easy;
      case 'Средний':
        return styles.medium;
      case 'Сложный':
        return styles.hard;
      default:
        return '';
    }
  };

  const colorMap = {
    primary: '#3b82f6',
    accent: '#59e5ff',
    success: '#22b07d',
    warning: '#fbbf24',
    danger: '#ef4444',
    info: '#3b82f6',
  };

  const iconColor = colorMap[quiz.color] || colorMap.primary;

  return (
    <div className={styles.quizCard}>
      <div className={styles.quizCardContent}>
        <div className={styles.quizCardIcon}>
          <Icon size={32} strokeWidth={2} color={iconColor} />
        </div>

        <div className={styles.quizCardInfo}>
          <h3 className={styles.quizCardTitle}>{quiz.title}</h3>
          <p className={styles.quizCardDescription}>{quiz.description}</p>
        </div>

        <div className={styles.quizCardMeta}>
          <span className={styles.quizCardQuestions}>
            {quiz.questionsCount} вопросов
          </span>
          <span className={styles.quizCardCategory}>{quiz.category}</span>
          <span
            className={`${styles.quizCardDifficulty} ${getDifficultyColor(
              quiz.difficulty,
            )}`}
          >
            {quiz.difficulty}
          </span>
        </div>

        <Button>Начать квиз</Button>
      </div>
    </div>
  );
};

export default QuizCard;
