import React from 'react';
import { IGameStateManager } from '@state/gameStateManager';

export const stateContext = React.createContext<IGameStateManager | null>(null);
