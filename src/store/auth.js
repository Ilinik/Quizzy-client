import { makeAutoObservable } from 'mobx';
import AuthService from '@/services/AuthService.js';

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

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(name, email, password) {
    try {
      const response = await AuthService.registration(name, email, password);
      console.log(response);
      localStorage.setItem('token', response.data.tokens.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({});
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
