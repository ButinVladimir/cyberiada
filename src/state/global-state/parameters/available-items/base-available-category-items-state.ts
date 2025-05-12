import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { TYPES } from '@state/types';
import { Feature } from '@shared/types';
import {
  type IGlobalState,
  IAvailableCategoryItemsState,
  IAvailableCategoryItemsSerializedState,
} from '../../interfaces';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseAvailableCategoryItemsState<Key = string> implements IAvailableCategoryItemsState<Key> {
  protected UI_EVENTS = {
    AVAILABLE_ITEMS_UPDATED: Symbol('AVAILABLE_ITEMS_UPDATED'),
  };

  @lazyInject(TYPES.StateUIConnector)
  protected _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected _globalState!: IGlobalState;

  protected _loanedQuality: number;
  protected _neutralItems: Set<Key>;
  protected _loanedItems: Set<Key>;
  protected _itemsList: Key[];

  constructor() {
    this._loanedQuality = 0;
    this._neutralItems = new Set();
    this._loanedItems = new Set();
    this._itemsList = [];

    this._stateUiConnector.registerEvents(this.UI_EVENTS);
  }

  get loanedQuality() {
    return this._loanedQuality;
  }

  listAvailableItems(): Key[] {
    this._stateUiConnector.connectEvent(this.UI_EVENTS.AVAILABLE_ITEMS_UPDATED);

    return this._itemsList;
  }

  isItemAvailable(itemName: Key, quality: number, level: number): boolean {
    if (!(this._neutralItems.has(itemName) || this._loanedItems.has(itemName))) {
      return false;
    }

    const highestAvailableQuality = this.getItemHighestAvailableQuality(itemName);
    if (quality > highestAvailableQuality) {
      return false;
    }

    return level <= this._globalState.development.level;
  }

  getItemHighestAvailableQuality(itemName: Key): number {
    let result: number | undefined = undefined;

    if (this._neutralItems.has(itemName) || this._loanedItems.has(itemName)) {
      result = this._loanedQuality;
    }

    if (result === undefined) {
      throw new Error(`Item ${itemName} is not available`);
    }

    return result;
  }

  recalculate() {
    this.recalculateNeutralItemsList();
    this.recalculateCompleteList();

    this._stateUiConnector.enqueueEvent(this.UI_EVENTS.AVAILABLE_ITEMS_UPDATED);
  }

  async startNewState(): Promise<void> {
    this._loanedQuality = 6;
    this._loanedItems.clear();
  }

  async deserialize(serializedState: IAvailableCategoryItemsSerializedState<Key>): Promise<void> {
    this._loanedQuality = serializedState.loanedQuality;
    this._loanedItems.clear();

    serializedState.loanedItems.forEach((itemName) => {
      this._loanedItems.add(itemName);
    });
  }

  serialize(): IAvailableCategoryItemsSerializedState<Key> {
    return {
      loanedQuality: this._loanedQuality,
      loanedItems: Array.from(this._loanedItems.values()),
    };
  }

  protected abstract recalculateNeutralItemsList(): void;

  protected abstract getItemRequiredFeatures(itemName: Key): Feature[];

  private recalculateCompleteList() {
    const completeList = Array.from(this._neutralItems.values());

    this._loanedItems.forEach((itemName) => {
      if (!this._neutralItems.has(itemName)) {
        completeList.push(itemName);
      }
    });

    this._itemsList = completeList.filter((itemName) => {
      const requiredFeatures = this.getItemRequiredFeatures(itemName);
      const allFeaturesUnlocked = requiredFeatures.every((feature) =>
        this._globalState.unlockedFeatures.isFeatureUnlocked(feature),
      );

      return allFeaturesUnlocked;
    });
  }
}
