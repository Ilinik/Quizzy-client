export const getDifficultyColor = (difficulty, styles) => {
  if (!difficulty || !styles) {
    return;
  }
  switch (difficulty) {
    case 'EASY':
      return styles.easy;
    case 'MEDIUM':
      return styles.medium;
    case 'HARD':
      return styles.hard;
    default:
      return '';
  }
};
