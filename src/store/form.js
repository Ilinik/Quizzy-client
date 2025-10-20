import { makeAutoObservable } from 'mobx';

export class FormStore {
  _quizFormData = {
    title: '',
    description: '',
    emoji: '💻',
    difficulty: 'EASY',
    category: 'PROGRAMMING',
  };

  constructor() {
    makeAutoObservable(this);
  }

  setField(name, value) {
    this._quizFormData[name] = value;
  }

  reset() {
    this._quizFormData = {
      title: '',
      description: '',
      emoji: '💻',
      difficulty: 'EASY',
      category: 'PROGRAMMING',
    };
  }
}
