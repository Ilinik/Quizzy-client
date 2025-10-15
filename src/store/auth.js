import { makeAutoObservable } from 'mobx';

export class AuthStore {
  user = null;
  isAuth = true;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  login(userData) {
    this.user = userData;
    this.isAuth = true;
  }

  logout() {
    this.user = null;
    this.isAuth = false;
  }

  setIsLoading(val) {
    this.isLoading = val;
  }
}
