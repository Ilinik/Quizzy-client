import { makeAutoObservable } from 'mobx';
import QuestionService from '@/services/QuestionService.js';

export class PlayStore {
  _questions = [];
  _currentIndex = 0;
  _selectedIndex = null;
  _isLoaded = false;
  _error = null;

  constructor() {
    makeAutoObservable(this);
  }

  get questions() {
    return this._questions;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  get currentQuestion() {
    return this._questions[this._currentIndex];
  }

  get isLoaded() {
    return this._isLoaded;
  }

  get error() {
    return this._error;
  }

  setQuestions(questions) {
    this._questions = questions;
  }

  setCurrentIndex(index) {
    this._currentIndex = index;
  }

  setSelectedIndex(index) {
    this._selectedIndex = index;
  }

  setLoaded(bool) {
    this._isLoaded = bool;
  }

  setError(message) {
    this._error = message;
  }

  async fetchQuestions(quizId) {
    this.setLoaded(false);
    this.setError(null);

    try {
      const response = await QuestionService.getQuestionsById(quizId);
      this.setQuestions(response.data);
      this.setLoaded(true);
    } catch (e) {
      console.error('Failed to fetch questions', e);
      this.setError('Не удалось загрузить вопросы');
      this.setLoaded(true);
    }
  }
}
