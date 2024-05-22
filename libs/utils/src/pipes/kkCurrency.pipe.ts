import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'kkCurrency',
})
export class KkCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) return '';

    return this.convertToCustomCurrency(value);
  }

  private convertToCustomCurrency(value: number): string {
    if (value < 1000) {
      return Math.round(value) + 'Y';
    } else if (value < 1_000_000) {
      const thousands = Math.floor(value / 1000);
      const remainder = value % 1000;
      return remainder > 0
        ? `${thousands}k ${this.convertToCustomCurrency(remainder)}`
        : `${thousands}k`;
    } else if (value < 1_000_000_000) {
      const millions = Math.floor(value / 1_000_000);
      const remainder = value % 1_000_000;
      return remainder > 0
        ? `${millions}kk ${this.convertToCustomCurrency(remainder)}`
        : `${millions}kk`;
    } else {
      const billions = Math.floor(value / 1_000_000_000);
      const remainder = value % 1_000_000_000;
      return remainder > 0
        ? `${billions}w ${this.convertToCustomCurrency(remainder)}`
        : `${billions}w`;
    }
  }
}
