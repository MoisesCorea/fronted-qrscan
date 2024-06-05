import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

const routes: Routes = [
  { path: '', component: AdminListComponent },
  {
    path: 'item/:id',
    component: AdminFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminsRoutingModule {}
