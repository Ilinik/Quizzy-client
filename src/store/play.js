import { makeAutoObservable } from 'mobx';
import QuestionService from '@/services/QuestionService';

export class PlayStore {
  _questions = [];
  _currentIndex = 0;
  _selectedIndex = null;
  _isLoaded = false;
  _error = null;

  _correctAnswers = 0;
  _userAnswers = [];

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

  get isLoaded() {
    return this._isLoaded;
  }

  get error() {
    return this._error;
  }

  get userAnswers() {
    return this._userAnswers;
  }

  get result() {
    return this._correctAnswers;
  }

  get currentQuestion() {
    return this._questions[this._currentIndex] || null;
  }

  setQuestions(questions) {
    this._questions = questions;
  }

  setIsLoaded(bool) {
    this._isLoaded = bool;
  }

  setError(msg) {
    this._error = msg;
  }

  setUserAnswers(answers) {
    this._userAnswers = answers;
  }

  setSelectedIndex(i) {
    this._selectedIndex = i;
  }

  setCurrentIndex(i) {
    this._currentIndex = i;
  }

  setCorrectAnswers(count) {
    this._correctAnswers = count;
  }

  increaseCorrect() {
    this._correctAnswers++;
  }

  async fetchQuestions(quizId) {
    this.setIsLoaded(false);
    this.setError(null);

    try {
      const response = await QuestionService.getQuestionsById(quizId);

      this.setQuestions(response.data.questions || response.data);
      this.setCurrentIndex(0);
      this.setSelectedIndex(null);
      this.setCorrectAnswers(0);
      this.setUserAnswers([]);

      this.setIsLoaded(true);
    } catch (e) {
      console.log(e);
      this.setError('Не удалось загрузить вопросы');
      this.setIsLoaded(true);
    }
  }

  saveAnswer(questionIndex, answerIndex) {
    const updated = [...this._userAnswers];
    updated[questionIndex] = answerIndex;
    this._userAnswers = updated;
  }
}
