import { makeAutoObservable } from 'mobx';
import AuthService from '@/services/AuthService.js';
import axios from 'axios';
import { API_URL } from '@/http/index.js';

export class AuthStore {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  setIsLoading(bool) {
    this.isLoading = bool;
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
    }
  }
}
