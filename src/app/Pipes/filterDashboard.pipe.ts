import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDashboard',
})
export class FilterDashboardPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultRegisters = [];

    for (const register of value) {
      if (register.user_name.indexOf(arg) > -1) {
        resultRegisters.push(register);
      }
    }
    return resultRegisters;
  }
}
