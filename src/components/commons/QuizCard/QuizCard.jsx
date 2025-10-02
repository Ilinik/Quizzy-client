import Button from '@/components/commons/Button/Button.jsx';

import styles from '@/components/commons/QuizCard/QuizCard.module.scss';


const QuizCard = ({ quiz }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Легкий': return styles.easy;
      case 'Средний': return styles.medium;
      case 'Сложный': return styles.hard;
      default: return '';
    }
  };

  return (
    <div className={styles.quizCard}>
      <div className={styles.quizCardContent}>
        <div className={styles.quizCardIcon}>{quiz.image}</div>

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
              quiz.difficulty
            )}`}
          >
            {quiz.difficulty}
          </span>
        </div>

        <Button>
          Начать квиз
        </Button>
      </div>
    </div>
  );
};

export default QuizCard;
