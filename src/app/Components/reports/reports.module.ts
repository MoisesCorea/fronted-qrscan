import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UsersCardComponent } from './users-card/user-card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPrintModule } from 'ngx-print';
import { AttendaceUsersComponent } from './attendace-users/attendace-users.component';
import { AttendanceUserComponent } from './attendance-user/attendance-user.component';

import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  declarations: [
    AttendaceUsersComponent,
    AttendanceUserComponent,
    UsersCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule,
    NgxPaginationModule,
    NgxPrintModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ReportsModule {}
