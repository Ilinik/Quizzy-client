import { makeAutoObservable } from 'mobx';
import QuestionService from '@/services/QuestionService.js';
import QuizService from '@/services/QuizService.js';

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
  _isSubmitting = false;

  constructor() {
    makeAutoObservable(this);
  }

  get quizFormData() {
    return this._quizFormData;
  }

  get questionFormData() {
    return this._questionFormData;
  }

  get questions() {
    return this._questions;
  }

  get isSubmitting() {
    return this._isSubmitting;
  }

  setField(name, value) {
    this._quizFormData[name] = value;
  }

  setCreator(userId) {
    this._quizFormData.creatorId = userId;
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

  async createQuestion(quizId) {
    this._isSubmitting = true;
    try {
      const payload = {
        quizId,
        text: this._questionFormData.text.trim(),
        answers: this._questionFormData.answers.map(({ text, isCorrect }) => ({
          text: text.trim(),
          isCorrect,
        })),
      };

      const response = await QuestionService.createQuestion(
        payload.quizId,
        payload.text,
        payload.answers,
      );

      this._questions.push(response.data.question);
      this.questionFormReset();
    } catch (error) {
      console.error(
        'Question creation error:',
        error.response?.data || error.message,
      );
    } finally {
      this._isSubmitting = false;
    }
  }

  async publishQuiz(quizId) {
    this._isSubmitting = true;
    try {
      const response = await QuizService.publishQuiz(quizId);
      this.reset();
      this._questions = [];
      alert(response.message || 'Квиз успешно опубликован!');
    } catch (error) {
      console.error(
        'Publish quiz error:',
        error.response?.data || error.message,
      );
    } finally {
      this._isSubmitting = false;
    }
  }
}
