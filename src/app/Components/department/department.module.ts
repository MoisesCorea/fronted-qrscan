import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [DepartmentFormComponent, DepartmentListComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DepartmentModule {}
