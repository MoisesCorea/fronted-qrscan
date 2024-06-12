import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';

const routes: Routes = [
  { path: '', data: { breadcrumb: 'eventos' }, component: EventListComponent },
  {
    path: 'item/:id',
    data: { breadcrumb: 'formulario' },
    component: EventFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
