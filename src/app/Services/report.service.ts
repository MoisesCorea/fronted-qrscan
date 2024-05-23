import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ReportDTO } from '../Models/report.dto';
import { SharedService } from './shared.service';
@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'report';
    this.urlQrScanApi = 'http://localhost:8000/api/' + this.controller;
  }

  attendanceReportUsaurio(report: ReportDTO): Observable<any> {
    const url = `${this.urlQrScanApi}/usuario?email=${report.email}&initial_date=${report.initial_date}&end_date=${report.end_date} &event_id=${report.event_id}`;

    return this.http
      .get<any>(url)
      .pipe(catchError(this.sharedService.handleError));
  }

  getDailyAttendace(): Observable<any[]> {
    return this.http
      .get<any[]>('http://localhost:8000/api/asistencia')
      .pipe(catchError(this.sharedService.handleError));
  }
}
