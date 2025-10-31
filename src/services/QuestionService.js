import $api from '@/http/index.js';

export default class QuestionService {
  static async createQuestionForUnpublished(quizId, text, answers) {
    return $api.post('/questions/unpublished', {
      unpublishedQuizId: quizId,
      text,
      answers,
    });
  }

  static async getQuestionsById(quizId) {
    return $api.get(`/questions/quiz/${quizId}`);
  }
}
