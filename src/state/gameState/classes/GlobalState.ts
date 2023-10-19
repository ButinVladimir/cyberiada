import { makeAutoObservable } from 'mobx';
import { IGlobalState } from '../interfaces';

export class GlobalState implements IGlobalState {
  time = 0;
  speed = 1;

  constructor() {
    makeAutoObservable(this);
  }

  changeSpeed = (newSpeed: number): void => {
    this.speed = newSpeed;
  };

  updateTime = (): void => {
    this.time += this.speed * 1000;
  };
}
