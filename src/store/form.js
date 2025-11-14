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
    makeAutoObservable(this, {}, { autoBind: true });
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

  setQuizFormData(data) {
    this._quizFormData = data;
  }

  setQuestionFormData(data) {
    this._questionFormData = data;
  }

  setQuestions(list) {
    this._questions = list;
  }

  setIsSubmitting(bool) {
    this._isSubmitting = bool;
  }

  setField(name, value) {
    this._quizFormData = {
      ...this._quizFormData,
      [name]: value,
    };
  }

  setCreator(id) {
    this._quizFormData = {
      ...this._quizFormData,
      creatorId: id,
    };
  }

  setQuestionField(name, value) {
    this._questionFormData = {
      ...this._questionFormData,
      [name]: value,
    };
  }

  setAnswer(index, text) {
    const updated = [...this._questionFormData.answers];
    updated[index] = { ...updated[index], text };

    this._questionFormData = {
      ...this._questionFormData,
      answers: updated,
    };
  }

  markAsCorrect(index) {
    const updated = this._questionFormData.answers.map((a, i) => ({
      ...a,
      isCorrect: i === index,
    }));

    this._questionFormData = {
      ...this._questionFormData,
      answers: updated,
    };
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
    this.setIsSubmitting(true);

    try {
      const payload = {
        quizId,
        text: this._questionFormData.text.trim(),
        answers: this._questionFormData.answers.map((a) => ({
          text: a.text.trim(),
          isCorrect: a.isCorrect,
        })),
      };

      const res = await QuestionService.createQuestion(
        payload.quizId,
        payload.text,
        payload.answers,
      );

      this.setQuestions([...this._questions, res.data.question]);
      this.questionFormReset();
    } catch (e) {
      console.error('Question creation error:', e.response?.data || e);
    } finally {
      this.setIsSubmitting(false);
    }
  }

  async publishQuiz(quizId) {
    this.setIsSubmitting(true);

    try {
      await QuizService.publishQuiz(quizId);
      this.reset();
      this.setQuestions([]);
    } catch (e) {
      console.error('Publish quiz error:', e.response?.data || e);
    } finally {
      this.setIsSubmitting(false);
    }
  }
}
