import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCardComponent } from './users-card/user-card.component';
import { AttendanceUserComponent } from './attendance-user/attendance-user.component';
import { AttendaceUsersComponent } from './attendace-users/attendace-users.component';

const routes: Routes = [
  { path: 'carnets', component: UsersCardComponent },
  { path: 'individual', component: AttendanceUserComponent },
  { path: 'general', component: AttendaceUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsRoutingModule {}
