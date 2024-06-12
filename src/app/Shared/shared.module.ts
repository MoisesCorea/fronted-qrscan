import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { FormatDatePipe } from '../Pipes/format-date.pipe';
import { PhoneFormatPipe } from '../Pipes/phone-format.pipe';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    FilterPipe,
    AlertComponent,
    FormatDatePipe,
    PhoneFormatPipe,
    BreadcrumbsComponent,
  ],
  imports: [CommonModule, MatDialogModule, MatButtonModule, RouterModule],
  exports: [
    FilterPipe,
    AlertComponent,
    FormatDatePipe,
    PhoneFormatPipe,
    BreadcrumbsComponent,
  ],
})
export class SharedModule {}
