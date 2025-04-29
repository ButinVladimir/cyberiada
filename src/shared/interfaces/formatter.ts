import { IFormatterParameters } from './formatter-parameters';

export interface IFormatter {
  formatTimeShort(time: number, parameters?: IFormatterParameters): string;
  formatNumberFloat(value: number, parameters?: IFormatterParameters): string;
  formatNumberDecimal(value: number, parameters?: IFormatterParameters): string;
  formatLevel(value: number, parameters?: IFormatterParameters): string;
  formatQuality(value: number, parameters?: IFormatterParameters): string;
  formatDateTime(date: Date): string;
  updateBuiltInFormatters(): void;
}
