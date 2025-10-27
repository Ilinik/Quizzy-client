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

  _questionFormData = {
    text: '',
    answers: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
  };

  _questions = [];

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

  get questionFormData() {
    return this._questionFormData;
  }

  get questions() {
    return this._questions;
  }

  setQuestionField(name, value) {
    this._questionFormData[name] = value;
  }

  setAnswer(index, text) {
    this._questionFormData.answers[index].text = text;
  }

  markAsCorrect(index) {
    this._questionFormData.answers.forEach((a, i) => {
      a.isCorrect = i === index;
    });
  }

  addQuestion(quizId) {
    this._questions.push({
      quizId,
      text: this._questionFormData.text.trim(),
      answers: this._questionFormData.answers.map(({ text, isCorrect }) => ({
        text: text.trim(),
        isCorrect,
      })),
    });

    this.questionFormReset();
  }

  questionFormReset() {
    this._questionFormData = {
      text: '',
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    };
  }
}
