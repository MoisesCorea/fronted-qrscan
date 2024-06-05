import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./Components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./Components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admins',
    data: {
      allowedRoles: ['Admin'],
    },
    loadChildren: () =>
      import('./Components/admins/admins.module').then((m) => m.AdminsModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'roles',
    data: {
      allowedRoles: ['Admin'],
    },
    loadChildren: () =>
      import('./Components/roles/roles.module').then((m) => m.RolesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'departamentos',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/department/department.module').then(
        (m) => m.DepartmentModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'eventos',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/event/event.module').then((m) => m.EventModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'horarios',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/shift/shift.module').then((m) => m.ShiftModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'usuarios',
    data: {
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    loadChildren: () =>
      import('./Components/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./Components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    loadChildren: () =>
      import('./Components/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [AuthGuard],
  },

  {
    path: 'perfil',
    data: {
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    loadChildren: () =>
      import('./Components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte',
    loadChildren: () =>
      import('./Components/reports/reports.module').then(
        (m) => m.ReportsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
