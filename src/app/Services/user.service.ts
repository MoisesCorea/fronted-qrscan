import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserDTO } from '../Models/user.dto';
import { ReportDTO } from '../Models/report.dto';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'usuarios';
    this.urlQrScanApi = environment.apiUrl + this.controller;
  }

  getUsers(): Observable<UserDTO[]> {
    return this.http
      .get<UserDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.urlQrScanApi + '/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }
  createUser(user: FormData): Observable<any> {
    return this.http
      .post<any>(this.urlQrScanApi, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: FormData): Observable<any> {
    user.append('_method', 'PATCH');
    return this.http
      .post<any>(this.urlQrScanApi + '/' + userId, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUser(userId: string): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + userId)
      .pipe(catchError(this.sharedService.handleError));
  }

  userRegisterattendance(userId: string): Observable<any> {
    return this.http
      .post<any>(this.urlQrScanApi + '/' + userId + '/asistencia', userId)
      .pipe(catchError(this.sharedService.handleError));
  }
}
