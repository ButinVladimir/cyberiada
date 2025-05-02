import { v4 as uuid } from 'uuid';
import { EventBatcher, IEventBatcher, removeElementsFromArray } from '@shared/index';
import { decorators } from '@state/container';
import { type IGlobalState } from '@state/global-state';
import { type ICityState } from '@state/city-state';
import { type ICompanyState } from '../../interfaces';
import { type IStateUIConnector } from '@state/state-ui-connector';
import { TYPES } from '@state/types';
import {
  ISidejob,
  IMakeSidejobParameters,
  ISidejobsSerializedState,
  ISidejobsState,
  IAssignSidejobArguments,
} from './interfaces';
import { SidejobName } from './types';
import { Sidejob } from './sidejob';
import { SIDEJOBS_UI_EVENTS } from './constants';

const { lazyInject } = decorators;

export class SidejobsState implements ISidejobsState {
  readonly uiEventBatcher: IEventBatcher;

  @lazyInject(TYPES.GlobalState)
  private _globalState!: IGlobalState;

  @lazyInject(TYPES.CityState)
  private _cityState!: ICityState;

  @lazyInject(TYPES.CompanyState)
  private _companyState!: ICompanyState;

  @lazyInject(TYPES.StateUIConnector)
  private _stateUIConnector!: IStateUIConnector;

  private _sidejobsList: ISidejob[];
  private _sidejobCloneIdMap: Map<string, ISidejob>;
  private _sidejobMap: Map<string, ISidejob>;

  constructor() {
    this._sidejobsList = [];
    this._sidejobCloneIdMap = new Map<string, ISidejob>();
    this._sidejobMap = new Map<string, ISidejob>();

    this.uiEventBatcher = new EventBatcher();
    this._stateUIConnector.registerEventEmitter(this);
  }

  getSidejobByNameAndDistrict(sidejobName: SidejobName, districtIndex: number): ISidejob | undefined {
    return this._sidejobsList.find(
      (sidejob) => sidejob.templateName === sidejobName && sidejob.district.index == districtIndex,
    );
  }

  listSidejobs(): ISidejob[] {
    this._stateUIConnector.connectEventHandler(this, SIDEJOBS_UI_EVENTS.SIDEJOBS_UPDATED);

    return this._sidejobsList;
  }

  getSidejobByCloneId(cloneId: string): ISidejob | undefined {
    return this._sidejobCloneIdMap.get(cloneId);
  }

  getSidejobById(sidejobId: string): ISidejob | undefined {
    return this._sidejobMap.get(sidejobId);
  }

  makeSidejob(sidejobParameters: IMakeSidejobParameters): ISidejob {
    return new Sidejob({
      id: sidejobParameters.id,
      assignedClone: this._companyState.clones.getCloneById(sidejobParameters.assignedClone)!,
      templateName: sidejobParameters.templateName,
      district: this._cityState.getDistrictState(sidejobParameters.district),
    });
  }

  assignSidejob(sidejobParameters: IAssignSidejobArguments): boolean {
    if (!this._globalState.availableActivities.sidejobs.isActivityAvailable(sidejobParameters.templateName)) {
      return false;
    }

    const existingSidejob = this.getSidejobByNameAndDistrict(
      sidejobParameters.templateName,
      sidejobParameters.district,
    );

    if (existingSidejob) {
      return false;
    }

    const sidejob = this.makeSidejob({
      id: uuid(),
      ...sidejobParameters,
    });

    if (!sidejob.checkRequirements()) {
      sidejob.removeAllEventListeners();
      return false;
    }

    this.addSidejob(sidejob);

    this.uiEventBatcher.enqueueEvent(SIDEJOBS_UI_EVENTS.SIDEJOBS_UPDATED);

    return true;
  }

  removeSidejob(sidejobId: string): void {
    const sidejob = this.getSidejobById(sidejobId);
    const index = this._sidejobsList.findIndex((sidejob) => sidejob.id === sidejobId);

    if (index >= 0) {
      removeElementsFromArray(this._sidejobsList, index, 1);
    }

    if (sidejob) {
      sidejob.removeAllEventListeners();
      this._sidejobMap.delete(sidejobId);
      this._sidejobCloneIdMap.delete(sidejob.assignedClone.id);
    }

    this.uiEventBatcher.enqueueEvent(SIDEJOBS_UI_EVENTS.SIDEJOBS_UPDATED);
  }

  removeAllSidejobs(): void {
    for (const sidejob of this._sidejobsList) {
      sidejob.removeAllEventListeners();
    }

    this._sidejobsList.length = 0;
    this._sidejobCloneIdMap.clear();
    this._sidejobMap.clear();

    this.uiEventBatcher.enqueueEvent(SIDEJOBS_UI_EVENTS.SIDEJOBS_UPDATED);
  }

  async startNewState(): Promise<void> {
    this.removeAllSidejobs();
  }

  async deserialize(serializedState: ISidejobsSerializedState): Promise<void> {
    this.removeAllSidejobs();

    serializedState.sidejobs.forEach((serializedSidejob) => {
      const sidejob = this.makeSidejob(serializedSidejob);

      this.addSidejob(sidejob);
    });
  }

  serialize(): ISidejobsSerializedState {
    return {
      sidejobs: this._sidejobsList.map((sidejob) => sidejob.serialize()),
    };
  }

  private addSidejob(sidejob: ISidejob) {
    this._sidejobsList.push(sidejob);
    this._sidejobMap.set(sidejob.id, sidejob);
    this._sidejobCloneIdMap.set(sidejob.assignedClone.id, sidejob);
  }
}
