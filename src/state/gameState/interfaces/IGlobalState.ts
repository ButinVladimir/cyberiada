export interface IGlobalState {
  time: number;
  speed: number;

  updateTime: () => void;
  changeSpeed: (newSpeed: number) => void;
  serialize: () => ISerializedGlobalState;
}

export interface ISerializedGlobalState {
  time: number;
  speed: number;
}