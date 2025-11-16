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

  get currentIndex() {
    return this._currentIndex;
  }

  get selectedAnser() {
    return this._selectedAnswer;
  }

  get score() {
    return this._score;
  }

  get isFinished() {
    return this._isFinished;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  setQuizzes(quizzes) {
    this._quizzes = quizzes;
  }

  setCurrentQuiz(quiz) {
    this._currentQuiz = quiz;
  }

  setCurrentIndex(index) {
    this._currentIndex = index;
  }

  setSelectedAnser(answer) {
    this._selectedAnswer = answer;
  }

  setScore(score) {
    this._score = score;
  }

  setIsFinished(bool) {
    this._isFinished = bool;
  }

  async createQuiz(quizData) {
    this.setIsLoading(true);
    try {
      const createdQuiz = await QuizService.createQuiz(quizData);
      this._quizzes.push(createdQuiz);
      return createdQuiz;
    } catch (e) {
      console.error('Quiz creation error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchPublishedQuizzes() {
    this.setIsLoading(true);
    try {
      const quizzes = await QuizService.fetchPublishedQuizzes();
      this.setQuizzes(quizzes);
    } catch (e) {
      console.error('Fetch published quizzes error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchUserQuizzes() {
    this.setIsLoading(true);
    try {
      const quizzes = await QuizService.fetchUserQuizzes();
      this.setQuizzes(quizzes);
    } catch (e) {
      console.error('Fetch user quizzes error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async loadQuiz(id) {
    this.setIsLoading(true);
    try {
      const quiz = await QuizService.getQuizById(id);
      this.setCurrentQuiz(quiz);
      this.setCurrentIndex(0);
      this.setSelectedAnser(null);
      this.setScore(0);
      this.setIsFinished(false);
    } catch (e) {
      console.error('Error loading quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async publishQuiz(id) {
    this.setIsLoading(true);
    try {
      const result = await QuizService.publishQuiz(id);
      const updated = this._quizzes.map((q) =>
        q.id === id ? { ...q, status: 'PUBLISHED' } : q,
      );
      this.setQuizzes(updated);
      return result;
    } catch (e) {
      console.error('Failed to publish quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteQuiz(id) {
    this.setIsLoading(true);
    try {
      await QuizService.deleteQuiz(id);
      this.setQuizzes(this.quizzes.filter((q) => q.id !== id));
    } catch (e) {
      console.error('Failed to delete quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateQuiz(id, data) {
    this.setIsLoading(true);
    try {
      const updatedQuiz = await QuizService.updateQuiz(id, data);
      const updated = this._quizzes.map((q) =>
        q.id === id ? updatedQuiz.quiz : q,
      );
      this.setQuizzes(updated);
      return updatedQuiz;
    } catch (e) {
      console.error('Failed to update quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchAllQuizzes() {
    this.setIsLoading(true);
    try {
      const quizzes = await QuizService.fetchAllQuizzes();
      this.setQuizzes(quizzes);
    } catch (e) {
      console.error('Fetch quizzes error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }
}
