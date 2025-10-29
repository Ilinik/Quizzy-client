import { makeAutoObservable } from 'mobx';
import QuizService from '@/services/QuizService.js';

export class QuizStore {
  _quizzes = [];
  _unpublishedQuizzes = [];
  _isLoading = false;

  _currentQuiz = null;
  _currentIndex = 0;
  _selectedAnswer = null;
  _score = 0;
  _isFinished = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get quizzes() {
    return this._quizzes;
  }

  get unpublishedQuizzes() {
    return this._unpublishedQuizzes;
  }

  get currentQuiz() {
    return this._currentQuiz;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  async createQuiz(quizData) {
    this._isLoading = true;
    try {
      const createdQuiz = await QuizService.createQuiz(quizData);
      this._quizzes.push(createdQuiz);
      return createdQuiz;
    } catch (e) {
      console.log('Quiz creation error: ', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async createUnpublishedQuiz(quizData) {
    this._isLoading = true;
    try {
      const createdQuiz = await QuizService.createUnpublishedQuiz(quizData);
      this._unpublishedQuizzes.push(createdQuiz);
      return createdQuiz;
    } catch (e) {
      console.log('Quiz creation error: ', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async fetchQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchQuizzes();
      this._quizzes = quizzes;
    } catch (e) {
      console.log('Fetch quizzes error', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async fetchUnpublishedQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchUnpublishedQuizzes();
      this._unpublishedQuizzes = quizzes;
    } catch (e) {
      console.log('Fetch unpublished quizzes error', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async loadQuiz(id) {
    this._isLoading = true;
    try {
      const quiz = await QuizService.getQuizById(id);
      console.log(quiz);
      this._currentQuiz = quiz;
      this._currentIndex = 0;
      this._selectedAnswer = null;
      this._score = 0;
      this._isFinished = false;
    } catch (e) {
      console.error('Error loading quiz:', e);
    } finally {
      this._isLoading = false;
    }
  }

  selectAnswer(answer) {
    this._selectedAnswer = answer;
  }

  nextQuestion() {
    if (!this._selectedAnswer) return;

    if (this._selectedAnswer.isCorrect) {
      this._score++;
    }

    const hasNext =
      this._currentQuiz &&
      this._currentIndex + 1 < this._currentQuiz.questions.length;

    if (hasNext) {
      this._currentIndex++;
      this._selectedAnswer = null;
    } else {
      this._isFinished = true;
    }
  }

  restartQuiz() {
    this._currentIndex = 0;
    this._selectedAnswer = null;
    this._score = 0;
    this._isFinished = false;
  }

  get progress() {
    if (!this._currentQuiz) return 0;
    return (
      ((this._currentIndex + 1) / this._currentQuiz.questions.length) * 100
    );
  }

  get percentScore() {
    if (!this._currentQuiz) return 0;
    return Math.round((this._score / this._currentQuiz.questions.length) * 100);
  }
}
