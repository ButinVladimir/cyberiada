import { injectable } from 'inversify';
import { decorators } from '@state/container';
import type { IStateUIConnector } from '@state/state-ui-connector/interfaces/state-ui-connector';
import { EventBatcher } from '@shared/event-batcher';
import { TYPES } from '@state/types';
import type { IGlobalState } from '../../interfaces/global-state';
import { IAvailableCategoryItemsState } from '../../interfaces/parameters/available-category-items-state';
import { IAvailableCategoryItemsSerializedState } from '../../interfaces/serialized-states/available-category-items-serialized-state';

const { lazyInject } = decorators;

@injectable()
export abstract class BaseAvailableCategoryItemsState implements IAvailableCategoryItemsState {
  readonly uiEventBatcher: EventBatcher;

  @lazyInject(TYPES.StateUIConnector)
  protected _stateUiConnector!: IStateUIConnector;

  @lazyInject(TYPES.GlobalState)
  protected _globalState!: IGlobalState;

  protected _loanedQuality: number;
  protected _neutralItems: Set<string>;
  protected _loanedItems: Set<string>;
  protected _itemsList: string[];

  constructor() {
    this._loanedQuality = 0;
    this._neutralItems = new Set();
    this._loanedItems = new Set();
    this._itemsList = [];

    this.recalculateList();

    this.uiEventBatcher = new EventBatcher();
    this._stateUiConnector.registerEventEmitter(this);
  }

  get loanedQuality() {
    return this._loanedQuality;
  }

  listAvailableItems(): string[] {
    return this._itemsList;
  }

  isItemAvailable(itemName: string, quality: number, level: number): boolean {
    if (!(this._neutralItems.has(itemName) || this._loanedItems.has(itemName))) {
      return false;
    }

    const highestAvailableQuality = this.getItemHighestAvailableQuality(itemName);
    if (quality > highestAvailableQuality) {
      return false;
    }

    return level <= this._globalState.development.level;
  }

  getItemHighestAvailableQuality(itemName: string): number {
    let result: number | undefined = undefined;

    if (this._neutralItems.has(itemName) || this._loanedItems.has(itemName)) {
      result = this._loanedQuality;
    }

    if (result === undefined) {
      throw new Error(`Item ${itemName} is not available`);
    }

    return result;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async startNewState(): Promise<void> {
    this._loanedQuality = 6;
    this._loanedItems.clear();

    this.recalculateNeutralItemsList();
    this.recalculateList();
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async deserialize(serializedState: IAvailableCategoryItemsSerializedState): Promise<void> {
    this._loanedQuality = serializedState.loanedQuality;
    this._loanedItems.clear();

    serializedState.loanedItems.forEach((itemName) => {
      this._loanedItems.add(itemName);
    });

    this.recalculateNeutralItemsList();
    this.recalculateList();
  }

  serialize(): IAvailableCategoryItemsSerializedState {
    return {
      loanedQuality: this._loanedQuality,
      loanedItems: Array.from(this._loanedItems.values()),
    };
  }

  protected abstract recalculateNeutralItemsList(): void;

  private recalculateList() {
    this._itemsList = Array.from(this._neutralItems.values());

    this._loanedItems.forEach((itemName) => {
      if (!this._neutralItems.has(itemName)) {
        this._itemsList.push(itemName);
      }
    });
  }
}
