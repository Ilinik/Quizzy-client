import $api from '@/http/index.js';

export default class QuizService {
  static async createQuiz(data) {
    const response = await $api.post('/quiz', data);
    return response.data;
  }

  static async fetchAllQuizzes() {
    const response = await $api.get('/quiz');
    return response.data;
  }

  static async fetchPublishedQuizzes() {
    const response = await $api.get('/quiz/published');
    return response.data;
  }

  static async fetchUserQuizzes() {
    const response = await $api.get('/quiz/user', {
      headers: { authorization: localStorage.getItem('token') },
    });
    return response.data;
  }

  static async getQuizById(quizId) {
    const response = await $api.get(`/quiz/${quizId}`);
    return response.data;
  }

  static async publishQuiz(quizId) {
    const response = await $api.post(`/quiz/${quizId}/publish`);
    return response.data;
  }

  static async updateQuiz(quizId, data) {
    const response = await $api.patch(`/quiz/${quizId}`, data);
    return response.data;
  }

  static async deleteQuiz(quizId) {
    const response = await $api.delete(`/quiz/${quizId}`);
    return response.data;
  }
}
