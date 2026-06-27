import { inject, injectable } from 'inversify';
import { Ajv } from 'ajv';
import savefileSchema from '@configs/schemas/savefile.json';
import programNamesSchema from '@configs/schemas/common/program-name.json';
import milestoneSchema from '@configs/schemas/common/milestone.json';
import hotkeysSchema from '@configs/schemas/common/hotkeys.json';
import { styleText } from 'node:util';
import { ISerializedState } from '@state/app-state';
import { type ISavefileValidator, ISavefileValidatorFacade } from './interfaces';
import { VALIDATOR_TYPES } from './types';

@injectable()
export class SavefileValidatorFacade implements ISavefileValidatorFacade {
  @inject(VALIDATOR_TYPES.SavefileValidator)
  private _savefileValidator!: ISavefileValidator;

  async validate(serializedState: ISerializedState): Promise<void> {
    console.log('Savefile validation has started');

    const ajv = this.prepareAjv();

    await this.validateSchema(ajv, serializedState);
    this._savefileValidator.validate(serializedState);

    console.log('Savefile validation has finished');
  }

  private async validateSchema(ajv: Ajv, serializedState: ISerializedState): Promise<void> {
    console.log(`\tValidating ${styleText('cyanBright', 'savefile schema')}`);

    const validate = await ajv.compile(savefileSchema);

    if (!validate(serializedState)) {
      console.log(`\t\t${styleText('cyanBright', 'Savefile schema')} is ${styleText('redBright', 'incorrect')}`);
      console.error(validate.errors);
    }
  }

  private prepareAjv(): Ajv {
    return new Ajv({
      schemas: [savefileSchema, programNamesSchema, milestoneSchema, hotkeysSchema],
      allErrors: true,
    });
  }
}
