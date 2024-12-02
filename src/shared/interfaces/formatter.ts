export interface IFormatter {
  formatTimeShort(time: number): string;
  formatNumberFloat(value: number): string;
  formatNumberDecimal(value: number): string;
  formatNumberLong(value: number): string;
  formatQuality(value: number): string;
}
