import { expose } from 'comlink';
import { GameStateManager } from '@state/gameStateManager';
import './transfer-handlers';

expose(GameStateManager);