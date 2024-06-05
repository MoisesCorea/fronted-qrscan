import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [EventListComponent, EventFormComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EventModule {}
