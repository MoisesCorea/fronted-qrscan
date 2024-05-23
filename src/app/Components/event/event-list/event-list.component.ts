import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService, deleteResponse } from 'src/app/Services/event.service';
import { EventDTO } from 'src/app/Models/event.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
  events?: EventDTO[];

  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  constructor(
    private eventService: EventService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private route: Router
  ) {
    this.loadEvents();
  }

  private loadEvents(): void {
    let errorResponse: any;

    this.eventService.getEvents().subscribe(
      (event: EventDTO[]) => {
        this.events = event;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }
  createEvent(): void {
    this.route.navigateByUrl('/evento/item/');
  }

  updateEvent(eventoId: number): void {
    this.route.navigateByUrl('/evento/item/' + eventoId);
  }

  updateStatus(eventID: number, event: any): void {
    let errorResponse: any;
    const newStatus = event.target.checked ? 1 : 0;

    this.events;
    this.eventService.toggleEventStatus(eventID, newStatus).subscribe(
      () => {
        this.loadEvents();
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  updateDailyAttendance(eventID: number, event: any): void {
    let errorResponse: any;
    const newStatus = event.target.checked ? 1 : 0;

    this.events;
    this.eventService.toggleEventDailyAttendance(eventID, newStatus).subscribe(
      () => {
        this.loadEvents();
      },
      (error) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  deleteEvent(eventId: number): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete department with id: ' + eventId + ' .'
    );
    if (result) {
      this.eventService.deleteEvent(eventId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            console.log('Llegamos a las filas afectadas');
            this.loadEvents();
          }
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
