import $api from '@/http/index.js';

export default class QuizService {
  static async createQuiz(data) {
    const response = await $api.post('/quiz', data);
    return response.data;
  }

  static async createUnpublishedQuiz(data) {
    const response = await $api.post('/quiz/unpublished', data);
    return response.data;
  }

  static async fetchQuizzes() {
    const response = await $api.get('/quiz/quizzes');
    return response.data;
  }

  static async fetchUnpublishedQuizzes() {
    const response = await $api.get('/quiz/quizzes-unpublished', {
      headers: { authorization: localStorage.getItem('token') },
    });
    return response.data;
  }

  static async getQuizById(quizId) {
    const response = await $api.get(`/quiz/${quizId}`);
    return response.data;
  }

  static async publishQuiz(quizId) {
    const response = await $api.post(`/quiz/publish/${quizId}`);
    return response.data;
  }
}
