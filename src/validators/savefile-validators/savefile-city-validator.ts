import { injectable } from 'inversify';
import { styleText } from 'node:util';
import { ICitySerializedState, IDistrictSerializedState, typedDistrictTypes } from '@state/city-state';
import { DISTRICT_NAMES } from '@texts/index';
import { typedFactions } from '@state/faction-state';
import { ISavefileCityValidator } from '../interfaces';
import { typedContracts } from '@/state/activity-state';

@injectable()
export class SavefileCityValidator implements ISavefileCityValidator {
  private _currentState!: ICitySerializedState;

  validate(state: ICitySerializedState): void {
    console.log(`\t\tValidating city serialized state`);

    this._currentState = state;

    this.validateLayout();
    this.validateDistricts();
  }

  private validateLayout() {
    for (let x = 0; x < this._currentState.layout.length; x++) {
      for (let y = 0; y < this._currentState.layout[x].length; y++) {
        const districtIndex = this._currentState.layout[x][y];

        if (this._currentState.districts[districtIndex] === undefined) {
          console.log(
            `\t\t\tDistrict index ${styleText('cyanBright', districtIndex.toString())} at position ${styleText('cyanBright', `(${x}, ${y})`)} is ${styleText('redBright', 'missing')}`,
          );
        }
      }
    }
  }

  private validateDistricts() {
    for (const [index, district] of Object.entries(this._currentState.districts)) {
      this.validateDistrict(district, index);
    }
  }

  private validateDistrict(district: IDistrictSerializedState, index: string) {
    if (DISTRICT_NAMES[district.name] === undefined) {
      console.log(
        `\t\t\tDistrict name ${styleText('cyanBright', district.name)} for district index ${styleText('cyanBright', index)} is ${styleText('redBright', 'missing')}`,
      );
    }

    if (typedDistrictTypes[district.districtType] === undefined) {
      console.log(
        `\t\t\tDistrict type ${styleText('cyanBright', district.districtType)} for district index ${styleText('cyanBright', index)} is ${styleText('redBright', 'missing')}`,
      );
    }

    if (typedFactions[district.faction] === undefined) {
      console.log(
        `\t\t\tDistrict faction ${styleText('cyanBright', district.faction)} for district index ${styleText('cyanBright', index)} is ${styleText('redBright', 'missing')}`,
      );
    }

    this.validateDistrictCounters(district, index);
  }

  private validateDistrictCounters(district: IDistrictSerializedState, index: string) {
    this.validateDistrictContractsCounters(district, index);
  }

  private validateDistrictContractsCounters(district: IDistrictSerializedState, index: string) {
    for (const contract of Object.keys(district.counters.contracts.availableAmounts)) {
      if (typedContracts[contract] === undefined) {
        console.log(
          `\t\t\tContract ${styleText('cyanBright', contract)} in available amounts for district index ${styleText('cyanBright', index)} is ${styleText('redBright', 'missing')}`,
        );
      }
    }

    for (const contract of Object.keys(district.counters.contracts.passedTimes)) {
      if (typedContracts[contract] === undefined) {
        console.log(
          `\t\t\tContract ${styleText('cyanBright', contract)} in passed times for district index ${styleText('cyanBright', index)} is ${styleText('redBright', 'missing')}`,
        );
      }
    }
  }
}
