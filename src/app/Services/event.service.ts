import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EventDTO } from '../Models/event.dto';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface updateResponse {
  affected: number;
}

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'eventos';
    this.urlQrScanApi = environment.apiUrl + this.controller;
  }

  getEvents(): Observable<EventDTO[]> {
    return this.http
      .get<EventDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  geteventById(eventId: number): Observable<EventDTO> {
    return this.http
      .get<EventDTO>(this.urlQrScanApi + '/' + eventId)
      .pipe(catchError(this.sharedService.handleError));
  }
  createEvent(event: EventDTO): Observable<EventDTO> {
    return this.http
      .post<EventDTO>(this.urlQrScanApi, event)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateEvent(eventId: string, event: EventDTO): Observable<EventDTO> {
    return this.http
      .patch<EventDTO>(this.urlQrScanApi + '/' + eventId, event)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteEvent(eventId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + eventId)
      .pipe(catchError(this.sharedService.handleError));
  }

  toggleEventStatus(eventId: number, event: number): Observable<EventDTO> {
    const eventStatus = { status: event };

    return this.http
      .patch<EventDTO>(
        this.urlQrScanApi + '/' + eventId + '/status',
        eventStatus
      )
      .pipe(catchError(this.sharedService.handleError));
  }

  toggleEventDailyAttendance(
    eventId: number,
    event: number
  ): Observable<EventDTO> {
    const eventStatus = { daily_attendance: event };

    return this.http
      .patch<EventDTO>(
        this.urlQrScanApi + '/' + eventId + '/daily-attendance',
        eventStatus
      )
      .pipe(catchError(this.sharedService.handleError));
  }
}
