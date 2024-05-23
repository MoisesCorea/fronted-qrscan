import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultRegisters = [];
    for (const register of value) {
      if (register.name.indexOf(arg) > -1) {
        resultRegisters.push(register);
      }
    }
    return resultRegisters;
  }
}
