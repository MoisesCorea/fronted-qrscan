import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RolesListComponent } from './roles-list/roles-list.component';

const routes: Routes = [
  { path: '', component: RolesListComponent },
  {
    path: 'item/:id',
    component: RolesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
