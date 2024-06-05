import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShiftRoutingModule } from './shift-routing.module';
import { ShiftFormComponent } from './shift-form/shift-form.component';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ShiftFormComponent, ShiftListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ShiftRoutingModule,
    SharedModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShiftModule {}
