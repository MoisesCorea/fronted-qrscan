import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService, deleteResponse } from 'src/app/Services/event.service';
import { EventDTO } from 'src/app/Models/event.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { finalize } from 'rxjs/operators';

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
    this.route.navigateByUrl('/eventos/item/');
  }

  updateEvent(eventoId: number): void {
    this.route.navigateByUrl('/eventos/item/' + eventoId);
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
    let responseOK: boolean = false;
    let response: any;

    // show confirmation popup
    let result = confirm(
      'Confirma elminar el registro con ID: ' + eventId + ' .'
    );
    if (result) {
      this.eventService
        .deleteEvent(eventId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.route.navigateByUrl('eventos');
            }
          })
        )
        .subscribe(
          (rowsAffected: deleteResponse) => {
            if (rowsAffected.affected > 0) {
              response = rowsAffected;
              responseOK = true;
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
