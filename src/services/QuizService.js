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
    const response = await $api.get('/quiz/quizzes-unpublished');
    return response.data;
  }

  static async getQuizById(id) {
    const response = await $api.get(`/quiz/${id}`);
    return response.data;
  }
}
