import { makeAutoObservable } from 'mobx';
import { AuthStore } from '@/store/auth.js';
import { QuizStore } from '@/store/quiz.js';
import { FormStore } from '@/store/form.js';
import { PlayStore } from '@/store/play.js';

class Store {
  auth;
  quiz;
  form;
  play;

  constructor() {
    this.auth = new AuthStore();
    this.quiz = new QuizStore();
    this.form = new FormStore();
    this.play = new PlayStore();

    makeAutoObservable(this);
  }
}

export default Store;
