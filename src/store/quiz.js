import { makeAutoObservable } from 'mobx';
import QuizService from '@/services/QuizService.js';

export class QuizStore {
  _quizzes = [];
  _unpublishedQuizzes = [];
  _isLoading = false;

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
      this._quizzes.push(createdQuiz);
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
}
