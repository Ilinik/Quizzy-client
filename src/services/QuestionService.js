import $api from '@/http/index.js';

export default class QuestionService {
  static async getQuestionsById(quizId) {
    return $api.get(`/questions/quiz/${quizId}`);
  }

  static async createQuestion(quizId, text, answers) {
    return await $api.post(`/questions/${quizId}`, { text, answers });
  }
}
