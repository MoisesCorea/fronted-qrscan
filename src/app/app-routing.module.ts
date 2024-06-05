import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AdminFormComponent } from './Components/admins/admin-form/admin-form.component';
import { AuthGuard } from './Guards/auth.guard';
import { AdminListComponent } from './Components/admins/admin-list/admin-list.component';
import { RolesListComponent } from './Components/roles/roles-list/roles-list.component';
import { RolesFormComponent } from './Components/roles/roles-form/roles-form.component';
import { DepartmentListComponent } from './Components/department/department-list/department-list.component';
import { DepartmentFormComponent } from './Components/department/department-form/department-form.component';
import { EventListComponent } from './Components/event/event-list/event-list.component';
import { EventFormComponent } from './Components/event/event-form/event-form.component';
import { ShiftListComponent } from './Components/shift/shift-list/shift-list.component';
import { ShiftFormComponent } from './Components/shift/shift-form/shift-form.component';
import { UserListComponent } from './Components/user/user-list/user-list.component';
import { UserFormComponent } from './Components/user/user-form/user-form.component';
import { UsersCardComponent } from './Components/reports/users-card/user-card.component';
import { AttendanceUserComponent } from './Components/reports/attendance-user/attendance-user.component';
import { AttendaceUsersComponent } from './Components/reports/attendace-users/attendace-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admins',
    data: {
      allowedRoles: ['Admin'],
    },
    component: AdminListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/item/:id',
    data: {
      allowedRoles: ['Admin'],
    },
    component: AdminFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'roles',
    data: {
      allowedRoles: ['Admin'],
    },
    component: RolesListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'rol/item/:id',
    data: {
      allowedRoles: ['Admin'],
    },
    component: RolesFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'departamentos',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: DepartmentListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'departamento/item/:id',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: DepartmentFormComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'eventos',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: EventListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'evento/item/:id',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: EventFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'turnos',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: ShiftListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'turno/item/:id',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: ShiftFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuario/item/:id',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    component: UserFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'carnets',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    component: UsersCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte/usuarios',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    component: AttendaceUsersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte/usuario',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    component: AttendanceUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'dashboard',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'perfil',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
