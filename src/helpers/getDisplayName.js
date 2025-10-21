export const getDisplayName = (value, type) => {
  if (!value) return '';

  const val = value.toUpperCase();

  switch (type) {
    case 'difficulty':
      switch (val) {
        case 'EASY':
          return 'Легкий';
        case 'MEDIUM':
          return 'Средний';
        case 'HARD':
          return 'Сложный';
        default:
          return value;
      }

    case 'category':
      switch (val) {
        case 'PROGRAMMING':
          return 'Программирование';
        case 'DESIGN':
          return 'Дизайн';
        case 'MARKETING':
          return 'Маркетинг';
        case 'BUSINESS':
          return 'Бизнес';
        case 'OTHER':
          return 'Другое';
        default:
          return value;
      }

    default:
      return value;
  }
};
