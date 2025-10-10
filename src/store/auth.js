import { makeAutoObservable } from 'mobx';

export class AuthStore {
  user = null;
  isAuthenticated = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(userData) {
    this.user = userData;
    this.isAuthenticated = true;
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
  }

  setIsLoading(val) {
    this.isLoading = val;
  }
}
