import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { BreadcrumbsComponent } from './Shared/breadcrumbs/breadcrumbs.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'home' },
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
      breadcrumb: 'admins',
      allowedRoles: ['Admin'],
    },
    loadChildren: () =>
      import('./Components/admins/admins.module').then((m) => m.AdminsModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'roles',
    data: {
      breadcrumb: 'roles',
      allowedRoles: ['Admin'],
    },
    loadChildren: () =>
      import('./Components/roles/roles.module').then((m) => m.RolesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'departamentos',
    data: {
      breadcrumb: 'departamentos',
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
      breadcrumb: 'eventos',
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/event/event.module').then((m) => m.EventModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'horarios',
    data: {
      breadcrumb: 'horarios',
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/shift/shift.module').then((m) => m.ShiftModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'usuarios',
    data: {
      breadcrumb: 'usuarios',
      allowedRoles: ['Admin', 'Admin-1'],
    },
    loadChildren: () =>
      import('./Components/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'reporte',
    data: {
      breadcrumb: 'reporte',
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
    data: { breadcrumb: 'home' },
    loadChildren: () =>
      import('./Components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'dashboard',
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
      breadcrumb: 'perfil',
      allowedRoles: ['Admin', 'Admin-1', 'Admin-2'],
    },
    loadChildren: () =>
      import('./Components/profile/profile.module').then(
        (m) => m.ProfileModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
