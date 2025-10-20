import { makeAutoObservable } from 'mobx';
import { AuthStore } from '@/store/auth.js';
import { QuizStore } from '@/store/quiz.js';
import { FormStore } from '@/store/form.js';

class Store {
  auth;
  quiz;
  form;

  constructor() {
    this.auth = new AuthStore();
    this.quiz = new QuizStore();
    this.form = new FormStore();

    makeAutoObservable(this);
  }
}

export default Store;
