import { makeAutoObservable } from 'mobx';

export class QuizStore {
  _quizzes = [];
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);

    this._quizzes = [
      {
        id: 1,
        title: 'JavaScript Basics',
        description: 'Проверьте свои знания основ JavaScript',
        questionsCount: 15,
        difficulty: 'Легкий',
        category: 'Программирование',
        image: '🚀',
      },
    ];
  }

  get isLoading() {
    return this._isLoading;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  addQuiz(quizData) {
    const newQuiz = {
      id: Date.now(),
      title: quizData.title,
      description: quizData.description,
      questionsCount: 0,
      difficulty: quizData.difficulty,
      category: quizData.category,
      image: quizData.emoji,
    };
    this._quizzes.push(newQuiz);
  }
}
