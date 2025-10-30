import { makeAutoObservable } from 'mobx';

export class PlayStore {
  constructor() {
    makeAutoObservable(this);
  }
}
