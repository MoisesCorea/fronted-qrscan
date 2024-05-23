import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdminDTO } from '../Models/admin.dto';
import { SharedService } from './shared.service';

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
    this.urlQrScanApi = 'http://localhost:8000/api/' + this.controller;
  }

  register(admin: AdminDTO): Observable<AdminDTO> {
    return this.http.post<AdminDTO>(this.urlQrScanApi, admin).pipe(
      catchError(this.sharedService.handleError),
      tap((result) => {
        // Esto se ejecutará cada vez que se complete con éxito el registro
        console.log('Registro completado:', result);
        // Puedes agregar más lógica aquí según tus necesidades
      })
    );
  }

  updateAdmin(adminId: string, admin: AdminDTO): Observable<AdminDTO> {
    return this.http
      .put<AdminDTO>(this.urlQrScanApi + '/' + adminId, admin)
      .pipe(
        catchError(this.sharedService.handleError),
        tap((result) => {
          // Esto se ejecutará cada vez que se complete con éxito el registro
          console.log('Registro completado:', result);
          // Puedes agregar más lógica aquí según tus necesidades
        })
      );
  }

  getAdminById(adminId: string): Observable<AdminDTO> {
    return this.http.get<AdminDTO>(this.urlQrScanApi + '/' + adminId).pipe(
      catchError(this.sharedService.handleError),
      tap((result) => {
        // Esto se ejecutará cada vez que se complete con éxito el registro
        console.log('Registro completado:', result);
        // Puedes agregar más lógica aquí según tus necesidades
      })
    );
  }

  getAdmins(): Observable<AdminDTO[]> {
    return this.http
      .get<AdminDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteAdmin(adminId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + adminId)
      .pipe(
        catchError(this.sharedService.handleError),
        tap((result) => {
          // Esto se ejecutará cada vez que se complete con éxito el registro
          console.log('Registro completado:', result);
          // Puedes agregar más lógica aquí según tus necesidades
        })
      );
  }
}
