import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminsRoutingModule } from './admins-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [AdminFormComponent, AdminListComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminsRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminsModule {}
