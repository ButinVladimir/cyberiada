import React from 'react';
import { IGameStateManager } from '@state/gameStateManager';

export const StateContext = React.createContext<IGameStateManager | null>(null);
