const TIME_PARTS = [
  {
    units: 24 * 60 * 60 * 1000,
    singleText: 'day',
    multipleText: 'days',
  },
  {
    units: 60 * 60 * 1000,
    singleText: 'hour',
    multipleText: 'hours',
  },
  {
    units: 60 * 1000,
    singleText: 'minute',
    multipleText: 'minutes',
  },
  {
    units: 1000,
    singleText: 'second',
    multipleText: 'seconds',
  },
];

export function formatTimeLong(passedTime: number): string {
  let remainingTime = passedTime;
  const result = [];

  for (const { units, singleText, multipleText } of TIME_PARTS) {
    const value = Math.floor(remainingTime / units);
    remainingTime = remainingTime - value * units;

    if (value === 1) {
      result.push(`${value} ${singleText}`);
    } else if (value > 0) {
      result.push(`${value} ${multipleText}`);
    }
  }

  if (result.length === 0) {
    result.push('Less than second');
  }

  return result.join(' ');
}

export function formatTimeShort(passedTime: number): string {
  let remainingTime = passedTime;
  const result = [];

  for (const { units} of TIME_PARTS) {
    const value = Math.floor(remainingTime / units);
    remainingTime = remainingTime - value * units;

    result.push(value.toString().padStart(2, '0'));
  }

  return result.join(':');
}

const locale = navigator.language;
export const moneyFormatter = Intl.NumberFormat(locale, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
export const floatFormatter = Intl.NumberFormat(locale, { minimumFractionDigits: 2 });
export const decimalFormatter = Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
