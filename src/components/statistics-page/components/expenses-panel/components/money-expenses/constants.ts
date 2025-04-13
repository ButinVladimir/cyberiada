import { PurchaseType } from '@shared/types';

export const MONEY_EXPENSE_NAMES: Record<PurchaseType, () => string> = {
  [PurchaseType.mainframePrograms]: () => 'On mainframe programs',
  [PurchaseType.mainframeHardware]: () => 'On mainframe hardware',
  [PurchaseType.clones]: () => 'On clones',
};
