import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DepartmentDTO } from '../Models/department.dto';
import { SharedService } from './shared.service';

export interface deleteResponse {
  affected: number;
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private urlQrScanApi: string;
  private controller: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.controller = 'departmentos';
    this.urlQrScanApi = 'http://localhost:8000/api/' + this.controller;
  }

  getDepartments(): Observable<DepartmentDTO[]> {
    return this.http
      .get<DepartmentDTO[]>(this.urlQrScanApi)
      .pipe(catchError(this.sharedService.handleError));
  }

  getDepartmentById(departmentId: number): Observable<DepartmentDTO> {
    return this.http
      .get<DepartmentDTO>(this.urlQrScanApi + '/' + departmentId)
      .pipe(
        catchError(this.sharedService.handleError),
        tap((result) => {
          // Esto se ejecutará cada vez que se complete con éxito el registro
          console.log('Registro completado:', result);
          // Puedes agregar más lógica aquí según tus necesidades
        })
      );
  }
  createDepartment(rol: DepartmentDTO): Observable<DepartmentDTO> {
    return this.http.post<DepartmentDTO>(this.urlQrScanApi, rol).pipe(
      catchError(this.sharedService.handleError),
      tap((result) => {
        // Esto se ejecutará cada vez que se complete con éxito el registro
        console.log('Registro completado:', result);
        // Puedes agregar más lógica aquí según tus necesidades
      })
    );
  }

  updateDepartment(
    departmentId: string,
    rol: DepartmentDTO
  ): Observable<DepartmentDTO> {
    return this.http
      .put<DepartmentDTO>(this.urlQrScanApi + '/' + departmentId, rol)
      .pipe(
        catchError(this.sharedService.handleError),
        tap((result) => {
          // Esto se ejecutará cada vez que se complete con éxito el registro
          console.log('Registro completado:', result);
          // Puedes agregar más lógica aquí según tus necesidades
        })
      );
  }

  deleteDepartment(departmentId: number): Observable<deleteResponse> {
    return this.http
      .delete<deleteResponse>(this.urlQrScanApi + '/' + departmentId)
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
