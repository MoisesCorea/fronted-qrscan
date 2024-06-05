import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftFormComponent } from './shift-form/shift-form.component';

const routes: Routes = [
  { path: '', component: ShiftListComponent },
  {
    path: 'item/:id',
    component: ShiftFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftRoutingModule {}
