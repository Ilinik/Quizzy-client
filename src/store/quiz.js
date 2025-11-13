import { makeAutoObservable } from 'mobx';
import QuizService from '@/services/QuizService.js';

export class QuizStore {
  _quizzes = [];
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

  get currentQuiz() {
    return this._currentQuiz;
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
      console.error('Quiz creation error:', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async fetchAllQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchAllQuizzes();
      this._quizzes = quizzes;
    } catch (e) {
      console.error('Fetch quizzes error:', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async fetchPublishedQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchPublishedQuizzes();
      this._quizzes = quizzes;
    } catch (e) {
      console.error('Fetch published quizzes error:', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async fetchUserQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchUserQuizzes();
      this._quizzes = quizzes;
    } catch (e) {
      console.error('Fetch user quizzes error:', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  async loadQuiz(id) {
    this._isLoading = true;
    try {
      const quiz = await QuizService.getQuizById(id);
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

  async publishQuiz(id) {
    this._isLoading = true;
    try {
      const result = await QuizService.publishQuiz(id);
      const updated = this._quizzes.map((q) =>
        q.id === id ? { ...q, status: 'PUBLISHED' } : q,
      );
      this._quizzes = updated;
      return result;
    } catch (e) {
      console.error('Failed to publish quiz:', e);
    } finally {
      this._isLoading = false;
    }
  }

  async updateQuiz(id, data) {
    this._isLoading = true;
    try {
      const updatedQuiz = await QuizService.updateQuiz(id, data);
      const updated = this._quizzes.map((q) =>
        q.id === id ? updatedQuiz.quiz : q,
      );
      this._quizzes = updated;
      return updatedQuiz;
    } catch (e) {
      console.error('Failed to update quiz:', e);
    } finally {
      this._isLoading = false;
    }
  }

  async deleteQuiz(id) {
    this._isLoading = true;
    try {
      await QuizService.deleteQuiz(id);
      this._quizzes = this._quizzes.filter((q) => q.id !== id);
    } catch (e) {
      console.error('Failed to delete quiz:', e);
    } finally {
      this._isLoading = false;
    }
  }
}
