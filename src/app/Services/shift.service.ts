import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ShiftDTO } from '../Models/shift.dto';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'turnos';
    this.urlQrScanApi = environment.apiUrl + this.controller;
  }

  getShifts(): Observable<ShiftDTO[]> {
    return this.http
      .get<ShiftDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getShiftById(shiftId: number): Observable<ShiftDTO> {
    return this.http
      .get<ShiftDTO>(this.urlQrScanApi + '/' + shiftId)
      .pipe(catchError(this.sharedService.handleError));
  }
  createShift(shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http
      .post<ShiftDTO>(this.urlQrScanApi, shift)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateShift(shiftId: string, shift: ShiftDTO): Observable<ShiftDTO> {
    return this.http
      .put<ShiftDTO>(this.urlQrScanApi + '/' + shiftId, shift)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteShift(shiftId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + shiftId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
