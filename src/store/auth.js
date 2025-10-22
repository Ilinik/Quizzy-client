import { makeAutoObservable } from 'mobx';
import AuthService from '@/services/AuthService.js';
import axios from 'axios';
import { API_URL } from '@/http/index.js';

export class AuthStore {
  _user = {};
  _isAuth = false;
  _isLoading = false;
  _isLoadingAuth = false;
  _isRefreshing = false;

  constructor() {
    makeAutoObservable(this);
    this.checkAuth();
  }

  get isLoading() {
    return this._isLoading;
  }

  get isLoadingAuth() {
    return this._isLoadingAuth;
  }

  get isRefreshing() {
    return this._isRefreshing;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
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

  setIsLoadingAuth(bool) {
    this._isLoadingAuth = bool;
  }

  setIsRefreshing(bool) {
    this._isRefreshing = bool;
  }

  async login(email, password) {
    this._isLoadingAuth = true;
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this._isLoadingAuth = false;
    }
  }

  async registration(name, email, password) {
    this._isLoadingAuth = true;
    try {
      const response = await AuthService.registration(name, email, password);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this._isLoadingAuth = false;
    }
  }

  async logout() {
    this._isLoading = true;
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this._isLoading = false;
    }
  }

  async checkAuth() {
    if (this.isRefreshing || !localStorage.getItem('token')) return;
    this._isRefreshing = true;
    this._isLoading = true;

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
      this._isRefreshing = false;
      this._isLoading = false;
    }
  }
}
