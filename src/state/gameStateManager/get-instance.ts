import { GameStateManager } from "./classes";

let gameStateManagerInstance: GameStateManager | null = null;

export const getGameStateManagerInstance = (): GameStateManager => {
  if (gameStateManagerInstance === null) {
    gameStateManagerInstance = new GameStateManager();
  }

  return gameStateManagerInstance;
};
