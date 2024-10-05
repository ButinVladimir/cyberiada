import { IProgram } from '@state/progam-factory/interfaces/program';
import { IUIEventEmitter } from '@shared/interfaces/ui-event-emitter';
import { ISerializedDevelopingProgram } from './serialized-developing-program';

export interface IDevelopingProgram extends IUIEventEmitter {
  program: IProgram;
  isActive: boolean;
  currentDevelopmentPoints: number;
  update(program: IProgram): void;
  toggleActive(active: boolean): void;
  increaseDevelopment(delta: number): void;
  serialize(): ISerializedDevelopingProgram;
  removeEventListeners(): void;
}
