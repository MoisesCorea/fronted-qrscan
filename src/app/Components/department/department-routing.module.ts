import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';

const routes: Routes = [
  { path: '', component: DepartmentListComponent },
  {
    path: 'item/:id',
    component: DepartmentFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
