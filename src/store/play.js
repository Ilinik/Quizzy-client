import { makeAutoObservable } from 'mobx';
import QuestionService from '@/services/QuestionService';

export class PlayStore {
  questions = [];
  currentIndex = 0;
  selectedIndex = null;
  isLoaded = false;
  error = null;

  correctAnswers = 0;
  userAnswers = [];

  constructor() {
    makeAutoObservable(this);
  }

  get result() {
    return this.correctAnswers;
  }

  setSelectedIndex(i) {
    this.selectedIndex = i;
  }

  setCurrentIndex(i) {
    this.currentIndex = i;
  }

  increaseCorrect() {
    this.correctAnswers++;
  }

  async fetchQuestions(quizId) {
    this.isLoaded = false;
    try {
      const response = await QuestionService.getQuestionsById(quizId);

      this.questions = response.data;
      this.currentIndex = 0;
      this.selectedIndex = null;
      this.correctAnswers = 0;
      this.userAnswers = [];

      this.isLoaded = true;
    } catch (e) {
      console.log(e);
    }
  }
}
