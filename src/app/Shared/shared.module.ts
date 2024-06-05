import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { FormatDatePipe } from '../Pipes/format-date.pipe';
import { PhoneFormatPipe } from '../Pipes/phone-format.pipe';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [FilterPipe, AlertComponent, FormatDatePipe, PhoneFormatPipe],
  imports: [CommonModule],
  exports: [FilterPipe, AlertComponent, FormatDatePipe, PhoneFormatPipe],
})
export class SharedModule {}
