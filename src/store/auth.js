import { makeAutoObservable } from 'mobx';
import AuthService from '@/services/AuthService.js';
import axios from 'axios';
import { API_URL } from '@/http/index.js';

export class AuthStore {
  _user = {};
  _isAuth = false;
  _isLoading = false;
  _isRefreshing = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoading() {
    return this._isLoading;
  }

  get isRefreshing() {
    return this._isRefreshing;
  }

  get isAuth() {
    return this._isAuth;
  }

  setAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setIsLoading(bool) {
    this._isLoading = bool;
  }

  setIsRefreshing(bool) {
    this._isRefreshing = bool;
  }

  async login(email, password) {
    this.setIsLoading(true);
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async registration(name, email, password) {
    this.setIsLoading(true);
    try {
      const response = await AuthService.registration(name, email, password);
      console.log(response);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async logout() {
    this.setIsLoading(true);
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
    }
  }

  async checkAuth() {
    if (this.isRefreshing) return;
    this.setIsRefreshing(true);
    this.setIsLoading(true);

    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setIsLoading(false);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsLoading(false);
      this.setIsRefreshing(false);
    }
  }
}
