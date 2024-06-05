import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule {}
