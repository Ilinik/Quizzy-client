import Button from '@/components/commons/Button/Button.jsx';
import { ICON_MAP } from '@/constants/icons.js';
import { colors } from '@/constants/colors.js';
import { getDifficultyColor } from '@/helpers/getDifficultyColor.js';
import { getDisplayName } from '@/helpers/getDisplayName.js';

import styles from './QuizCard.module.scss';
import { useNavigate } from 'react-router-dom';

const QuizCard = ({ quiz, quizId }) => {
  const navigate = useNavigate();
  const Icon = ICON_MAP[quiz.emoji] || ICON_MAP['Laptop'];

  const colorObj = colors.find((c) => c.name === quiz.color);
  const iconColor = colorObj ? colorObj.value : '#3b82f6';

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
            {quiz.questionCount} вопросов
          </span>
          <span className={styles.quizCardCategory}>
            {getDisplayName(quiz.category, 'category')}
          </span>
          <span
            className={`${styles.quizCardDifficulty} ${getDifficultyColor(
              quiz.difficulty,
              styles,
            )}`}
          >
            {getDisplayName(quiz.difficulty, 'difficulty')}
          </span>
        </div>

        <Button
          onClick={() => {
            navigate(`/quizzes/${quizId}`);
          }}
        >
          Начать квиз
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
