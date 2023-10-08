import { IGlobalState, ISerializedGlobalState } from '../interfaces';

export class GlobalState implements IGlobalState {
  time = 1;
  speed = 1;

  changeSpeed = (newSpeed: number): void => {
    this.speed = newSpeed;
  };

  updateTime = (): void => {
    this.time += this.speed;
  };

  serialize = (): ISerializedGlobalState => {
    return {
      time: this.time,
      speed: this.speed,
    };
  };

  static deserialize = (obj: ISerializedGlobalState): IGlobalState => {
    const gameState = new GlobalState();
    gameState.time = obj.time;
    gameState.speed = obj.speed;

    return gameState;
  };
}
