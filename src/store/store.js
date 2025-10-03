import { makeAutoObservable } from 'mobx';
import { QuizStore } from '@/store/quiz.js';

class Store {
  quiz;

  constructor() {
    this.quiz = new QuizStore();

    makeAutoObservable(this);
  }
}

export default Store;
