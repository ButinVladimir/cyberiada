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