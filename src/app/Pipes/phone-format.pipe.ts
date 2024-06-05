import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (!value) {
      return '';
    }

    const stringValue = value.toString();

    const cleanedValue = stringValue.replace(/\D/g, '');

    if (cleanedValue.length === 8) {
      return `${cleanedValue.substring(0, 4)}-${cleanedValue.substring(4, 8)}`;
    } else {
      return value;
    }
  }
}
