import { msg } from '@lit/localize';
import { PurchaseType } from '@shared/types';

export const MONEY_EXPENSE_NAMES: Record<PurchaseType, () => string> = {
  [PurchaseType.mainframePrograms]: () => msg('On mainframe programs'),
  [PurchaseType.mainframeHardware]: () => msg('On mainframe hardware'),
  [PurchaseType.clones]: () => msg('On clones'),
};
