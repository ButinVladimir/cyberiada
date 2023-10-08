import React from 'react';
import { Remote } from 'comlink';
import { IGameStateManager } from '@state/gameStateManager';

export const StateContext = React.createContext<Remote<IGameStateManager> | null>(null);