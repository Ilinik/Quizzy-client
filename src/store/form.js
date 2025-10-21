import { makeAutoObservable } from 'mobx';

export class FormStore {
  _quizFormData = {
    title: '',
    description: '',
    emoji: 'Laptop',
    color: 'primary',
    difficulty: 'EASY',
    category: 'PROGRAMMING',
    creatorId: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  get quizFormData() {
    return this._quizFormData;
  }

  setField(name, value) {
    this._quizFormData[name] = value;
  }

  setCreator(userId) {
    this._quizFormData.creatorId = userId;
  }

  reset() {
    this._quizFormData = {
      title: '',
      description: '',
      emoji: 'Laptop',
      color: 'primary',
      difficulty: 'EASY',
      category: 'PROGRAMMING',
      creatorId: null,
    };
  }
}
