import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Remove all non-numeric characters
    value = value.replace(/\D/g, '');

    // Format the phone number
    if (value.length === 10) {
      return `(${value.substring(0, 3)}) ${value.substring(
        3,
        6
      )}-${value.substring(6, 10)}`;
    } else {
      return value; // or handle invalid length as needed
    }
  }
}
