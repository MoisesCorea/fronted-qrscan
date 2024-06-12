import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

const routes: Routes = [
  { path: '', data: { breadcrumb: 'admins' }, component: AdminListComponent },
  {
    path: 'item/:id',
    data: { breadcrumb: 'formulario' },
    component: AdminFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
