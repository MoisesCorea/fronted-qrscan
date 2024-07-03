import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdminDTO } from '../Models/admin.dto';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'admins';
    this.urlQrScanApi = environment.apiUrl + this.controller;
  }

  register(admin: AdminDTO): Observable<AdminDTO> {
    return this.http
      .post<AdminDTO>(this.urlQrScanApi, admin)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateAdmin(adminId: string, admin: AdminDTO): Observable<AdminDTO> {
    return this.http
      .patch<AdminDTO>(this.urlQrScanApi + '/' + adminId, admin)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAdminById(adminId: string): Observable<AdminDTO> {
    return this.http
      .get<AdminDTO>(this.urlQrScanApi + '/' + adminId)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAdmins(): Observable<AdminDTO[]> {
    return this.http
      .get<AdminDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteAdmin(adminId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + adminId)
      .pipe(catchError(this.sharedService.handleError));
  }

  changePassword(password: any): Observable<any> {
    return this.http
      .post<AdminDTO>(environment.apiUrl + 'change-password', password)
      .pipe(catchError(this.sharedService.handleError));
  }
}
