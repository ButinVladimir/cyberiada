import { XORShift128Plus } from 'random-seedable';
import padStart from 'lodash/padStart';
import names from '@configs/names.json';
import { CLONE_NAMES } from '@texts/names';
import { ICloneNameGenerator, ICloneNameGeneratorArgs, ICloneNameGeneratorResult } from './interfaces';

export class CloneNameGenerator implements ICloneNameGenerator {
  private _random: XORShift128Plus;

  constructor(args: ICloneNameGeneratorArgs) {
    this._random = new XORShift128Plus(args.randomSeed, args.randomShift);
  }

  generate(): ICloneNameGeneratorResult {
    const namePart = CLONE_NAMES[this._random.choice(names.clones)]();

    const serialNumber = this._random.randRange(0, 9999);
    const serialNumberPart = padStart(serialNumber.toString(), 4, '0');

    return {
      name: `${namePart}#${serialNumberPart}`,
      randomShift: this._random.y,
    };
  }
}
