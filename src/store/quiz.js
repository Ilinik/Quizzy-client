import { makeAutoObservable } from 'mobx';

export class QuizStore {
  quizzes = [];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this.quizzes = [
      {
        id: 1,
        title: 'JavaScript Basics',
        description: 'Проверьте свои знания основ JavaScript',
        questionsCount: 15,
        difficulty: 'Легкий',
        category: 'Программирование',
        image: '🚀',
      },
      {
        id: 2,
        title: 'React Framework',
        description: 'Тест на знание React и его экосистемы',
        questionsCount: 20,
        difficulty: 'Средний',
        category: 'Программирование',
        image: '⚛️',
      },
      {
        id: 3,
        title: 'CSS & Design',
        description: 'Проверьте знания CSS и веб-дизайна',
        questionsCount: 12,
        difficulty: 'Легкий',
        category: 'Дизайн',
        image: '🎨',
      },
      {
        id: 4,
        title: 'TypeScript',
        description: 'Углублённый тест по TypeScript',
        questionsCount: 18,
        difficulty: 'Сложный',
        category: 'Программирование',
        image: '📘',
      },
      {
        id: 5,
        title: 'Web Security',
        description: 'Основы безопасности веб-приложений',
        questionsCount: 10,
        difficulty: 'Средний',
        category: 'Безопасность',
        image: '🔒',
      },
      {
        id: 6,
        title: 'Node.js',
        description: 'Backend разработка с Node.js',
        questionsCount: 16,
        difficulty: 'Средний',
        category: 'Программирование',
        image: '🟢',
      },
    ];
  }

  get totalQuizzes() {
    return this.quizzes.length;
  }

  setIsLoading(val) {
    this.isLoading = val;
  }

  addQuiz(quiz) {
    this.quizzes = [...this.quizzes, quiz];
  }

  setQuizzes(quizzes) {
    this.quizzes = quizzes;
  }
}
