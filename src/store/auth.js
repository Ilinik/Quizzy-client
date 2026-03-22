import { API_URL } from '@/http/index.js';
import AuthService from '@/services/AuthService.js';
import axios from 'axios';
import { makeAutoObservable } from 'mobx';

export class AuthStore {
  _user = {};
  _isAuth = false;
  _isLoading = false;
  _isRefreshing = false;
  _loginError = false;
  _registrationError = false;

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

  get user() {
    return this._user;
  }

  get loginError() {
    return this._loginError;
  }

  get registrationError() {
    return this._registrationError;
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

  setLoginError(bool) {
    this._loginError = bool;
  }

  setRegistrationError(bool) {
    this._registrationError = bool;
  }

  async login(email, password) {
    this.setLoginError(false);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      this.setLoginError(true);
      console.log(e.response?.data?.message);
    }
  }

  async registration(name, email, password) {
    this.setLoginError(false);
    try {
      const response = await AuthService.registration(name, email, password);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      this.setLoginError(true);
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    if (this._isRefreshing || !localStorage.getItem('token')) return;

    this.setIsRefreshing(true);
    this.setIsLoading(true);

    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem('token', response.data.tokens.accessToken);

      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    } finally {
      this.setIsRefreshing(false);
      this.setIsLoading(false);
    }
  }
}
