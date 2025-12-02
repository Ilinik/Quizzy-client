import { makeAutoObservable } from 'mobx';
import QuizService from '@/services/QuizService.js';

export class QuizStore {
  _quizzes = [];

  page = 1;
  limit = 8;
  hasMore = true;

  _sortField = 'difficulty';
  _searchValue = '';
  _reverse = false;

  _isLoading = false;

  _currentQuiz = null;
  _currentIndex = 0;
  _selectedAnswer = null;
  _score = 0;
  _isFinished = false;

  constructor() {
    makeAutoObservable(this);
  }

  get searchValue() {
    return this._searchValue;
  }

  get isLoading() {
    return this._isLoading;
  }

  get quizzes() {
    return this._quizzes;
  }

  get currentQuiz() {
    return this._currentQuiz;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  get selectedAnser() {
    return this._selectedAnswer;
  }

  get score() {
    return this._score;
  }

  get isFinished() {
    return this._isFinished;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  setQuizzes(quizzes) {
    this._quizzes = quizzes;
  }

  setCurrentQuiz(quiz) {
    this._currentQuiz = quiz;
  }

  setCurrentIndex(index) {
    this._currentIndex = index;
  }

  setSelectedAnser(answer) {
    this._selectedAnswer = answer;
  }

  setScore(score) {
    this._score = score;
  }

  setIsFinished(bool) {
    this._isFinished = bool;
  }

  setSearchValue(value) {
    this._searchValue = value;
  }

  async createQuiz(quizData) {
    this.setIsLoading(true);
    try {
      const createdQuiz = await QuizService.createQuiz(quizData);
      this._quizzes.push(createdQuiz);
      return createdQuiz;
    } catch (e) {
      console.error('Quiz creation error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchInitialPublished() {
    this.page = 1;
    this.setQuizzes([]);
    this.hasMore = true;

    await this.fetchMorePublishedQuizzes();
  }

  async fetchMorePublishedQuizzes() {
    if (this._isLoading || !this.hasMore) return;

    this.setIsLoading(true);
    try {
      const data = await QuizService.fetchPublishedQuizzes(
        this.page,
        this.limit,
      );

      this._quizzes.push(...data.items);

      this.hasMore = data.hasMore;
      this.page += 1;

      if (this._sortField) {
        this.sortBy(this._sortField);
      }
    } catch (e) {
      console.error('Fetch published quizzes error:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchUserQuizzes() {
    this.setIsLoading(true);
    try {
      const quizzes = await QuizService.fetchUserQuizzes();
      this.setQuizzes(quizzes);
    } catch (e) {
      console.error('Fetch user quizzes error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  async loadQuiz(id) {
    this.setIsLoading(true);
    try {
      const quiz = await QuizService.getQuizById(id);
      this.setCurrentQuiz(quiz);
      this.setCurrentIndex(0);
      this.setSelectedAnser(null);
      this.setScore(0);
      this.setIsFinished(false);
    } catch (e) {
      console.error('Error loading quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async publishQuiz(id) {
    this.setIsLoading(true);
    try {
      const result = await QuizService.publishQuiz(id);
      const updated = this._quizzes.map((q) =>
        q.id === id ? { ...q, status: 'PUBLISHED' } : q,
      );
      this.setQuizzes(updated);
      return result;
    } catch (e) {
      console.error('Failed to publish quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async deleteQuiz(id) {
    this.setIsLoading(true);
    try {
      await QuizService.deleteQuiz(id);
      this.setQuizzes(this.quizzes.filter((q) => q.id !== id));
    } catch (e) {
      console.error('Failed to delete quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateQuiz(id, data) {
    this.setIsLoading(true);
    try {
      const updatedQuiz = await QuizService.updateQuiz(id, data);
      const updated = this._quizzes.map((q) =>
        q.id === id ? updatedQuiz.quiz : q,
      );
      this.setQuizzes(updated);
      return updatedQuiz;
    } catch (e) {
      console.error('Failed to update quiz:', e);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchAllQuizzes() {
    this.setIsLoading(true);
    try {
      const quizzes = await QuizService.fetchAllQuizzes();
      this.setQuizzes(quizzes);
    } catch (e) {
      console.error('Fetch quizzes error:', e);
      throw e;
    } finally {
      this.setIsLoading(false);
    }
  }

  toggleReverse() {
    this._reverse = !this._reverse;

    if (this._sortField) {
      this.sortBy(this._sortField);
    }
  }

  sortBy(field) {
    this._sortField = field;

    const order = {
      EASY: 1,
      MEDIUM: 2,
      HARD: 3,
    };

    let sorted = this._quizzes.slice().sort((a, b) => {
      if (field === 'difficulty') {
        return order[a.difficulty] - order[b.difficulty];
      }

      if (field === 'questionsCount') {
        return a.questionCount - b.questionCount;
      }

      return 0;
    });

    if (this._reverse) sorted = sorted.reverse();

    this.setQuizzes(sorted);
  }

  async searchQuiz(e) {
    this.setSearchValue(e.target.value);

    const searchedQuizzes = this._quizzes.filter((item) =>
      item.title.toLowerCase().includes(this._searchValue.toLowerCase()),
    );

    if (this.searchValue !== '') {
      this.setQuizzes(searchedQuizzes);
    } else {
      this.fetchPublishedQuizzes();
    }
  }
}
