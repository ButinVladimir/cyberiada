const TIME_PARTS = [
  {
    units: 24 * 60 * 60 * 1000,
  },
  {
    units: 60 * 60 * 1000,
  },
  {
    units: 60 * 1000,
  },
  {
    units: 1000,
  },
];

export function formatTimeShort(passedTime: number): string {
  let remainingTime = passedTime;
  const result = [];

  for (const { units } of TIME_PARTS) {
    const value = Math.floor(remainingTime / units);
    remainingTime = remainingTime - value * units;

    result.push(value.toString().padStart(2, '0'));
  }

  return result.join(':');
}

const QUALITY_NAME_MAP: Record<number, string> = {
  0: 'I',
  1: 'II',
  2: 'III',
  3: 'IV',
  4: 'V',
  5: 'VI',
  6: 'VII',
};

export function formatQuality(quality: number): string {
  if (quality < 0) {
    return '0-';
  }

  if (quality > 6) {
    return 'VIII+';
  }

  return QUALITY_NAME_MAP[quality];
}
