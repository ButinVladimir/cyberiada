export interface IGlobalState {
  time: number;
  speed: number;
  updateTime: () => void;
  changeSpeed: (newSpeed: number) => void;
}
