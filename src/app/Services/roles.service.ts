import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RolesDTO } from '../Models/roles.dto';
import { SharedService } from './shared.service';

export interface deleteResponse {
  affected: number;
}
@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'roles';
    this.urlQrScanApi = 'http://localhost:8000/api/' + this.controller;
  }

  getRoles(): Observable<RolesDTO[]> {
    return this.http
      .get<RolesDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getRolById(rolId: number): Observable<RolesDTO> {
    return this.http
      .get<RolesDTO>(this.urlQrScanApi + '/' + rolId)
      .pipe(catchError(this.sharedService.handleError));
  }
  createRol(rol: RolesDTO): Observable<RolesDTO> {
    return this.http.post<RolesDTO>(this.urlQrScanApi, rol).pipe(
      catchError(this.sharedService.handleError),
      tap((result) => {
        // Esto se ejecutará cada vez que se complete con éxito el registro
        console.log('Registro completado:', result);
        // Puedes agregar más lógica aquí según tus necesidades
      })
    );
  }

  updateRol(rolId: string, rol: RolesDTO): Observable<RolesDTO> {
    return this.http.put<RolesDTO>(this.urlQrScanApi + '/' + rolId, rol).pipe(
      catchError(this.sharedService.handleError),
      tap((result) => {
        // Esto se ejecutará cada vez que se complete con éxito el registro
        console.log('Registro completado:', result);
        // Puedes agregar más lógica aquí según tus necesidades
      })
    );
  }

  deleteRol(rolId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + rolId)
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
