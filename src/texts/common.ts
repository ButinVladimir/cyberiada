import { msg, str } from "@lit/localize";

export const COMMON_TEXTS = {
  notEnoughMoney: () => msg('Not enough money'),
  willBeAvailableIn: (time: string) => msg(str`Will be available in ${time}`),
  higherDevelopmentLevelRequired: () => msg('Higher development level required'),
  buyIncrease: (increase: string, cost: string) => msg(str`Buy x${increase} for ${cost}`),
  buyMax: () => msg('Buy max'),
  buyMaxAllUpgrades: () => msg('Buy all upgrades'),
  enableAutoupgrade: () => msg('Enable autoupgrade'),
  disableAutoupgrade: () => msg('Disable autoupgrade'),
}