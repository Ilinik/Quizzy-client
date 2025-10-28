import $api from '@/http/index.js';

export default class QuestionService {
  static async createQuestionForUnpublished(quizId, text, answers) {
    return $api.post('/questions/unpublished', {
      unpublishedQuizId: quizId,
      text,
      answers,
    });
  }
}
