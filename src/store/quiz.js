import { makeAutoObservable } from 'mobx';
import QuizService from '@/services/QuizService.js';

export class QuizStore {
  _quizzes = [];
  _isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get quizzes() {
    return this._quizzes;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  addQuiz(quizData) {
    const newQuiz = {
      id: Date.now(),
      title: quizData.title,
      description: quizData.description,
      questionsCount: 0,
      difficulty: quizData.difficulty,
      category: quizData.category,
      emoji: quizData.emoji,
      color: quizData.color,
    };
    this._quizzes.push(newQuiz);
  }

  async createQuiz(quizData) {
    this._isLoading = true;
    try {
      const createdQuiz = await QuizService.createQuiz(quizData);
      this._quizzes.push(createdQuiz);
      return createdQuiz;
    } catch (e) {
      console.log('Quiz creation error: ', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }

  // async createQuizServer(quizData) {
  //   this._isLoading = true;
  //   try {
  //     const { quiz } = await QuizService.createQuiz(quizData);
  //     return quiz;
  //   } catch (e) {
  //     console.log('Quiz creation error:', e);
  //     throw e;
  //   } finally {
  //     this._isLoading = false;
  //   }
  // }
  //
  // async publishQuiz(quizId) {
  //   try {
  //     const response = await QuizService.getQuizById(quizId);
  //     const quiz = response.quiz;
  //     this._quizzes.push(quiz);
  //     return quiz;
  //   } catch (e) {
  //     console.log('Quiz publish error:', e);
  //     throw e;
  //   }
  // }

  async fetchQuizzes() {
    this._isLoading = true;
    try {
      const quizzes = await QuizService.fetchQuizzes();
      this._quizzes = quizzes;
    } catch (e) {
      console.log('Fetch quizzes error', e);
      throw e;
    } finally {
      this._isLoading = false;
    }
  }
}
