import { makeAutoObservable } from 'mobx';
import { AuthStore } from '@/store/auth.js';
import { QuizStore } from '@/store/quiz.js';

class Store {
  auth;
  quiz;

  constructor() {
    this.auth = new AuthStore();
    this.quiz = new QuizStore();

    makeAutoObservable(this);
  }
}

export default Store;
