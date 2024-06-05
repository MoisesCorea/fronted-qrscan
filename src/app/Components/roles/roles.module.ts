import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesListComponent } from './roles-list/roles-list.component';

@NgModule({
  declarations: [RolesFormComponent, RolesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule,
    RolesRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RolesModule {}
