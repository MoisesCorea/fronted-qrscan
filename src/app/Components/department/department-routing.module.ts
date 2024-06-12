import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
    data: { breadcrumb: 'departamentos' },
  },
  {
    path: 'item/:id',
    data: { breadcrumb: 'formulario' },
    component: DepartmentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
