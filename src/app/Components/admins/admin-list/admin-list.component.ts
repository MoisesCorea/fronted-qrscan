import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminDTO } from 'src/app/Models/admin.dto';
import { AdminService, deleteResponse } from 'src/app/Services/admin.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { RolesService } from 'src/app/Services/roles.service';
import { Role } from 'src/app/Models/rol.type';
import { RolesDTO } from 'src/app/Models/roles.dto';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent {
  shouldShowRow(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  admins?: AdminDTO[];
  userId: string | null;
  private cachedRoles: { [rol_id: number]: Observable<string> } = {};

  filterInput: string = '';
  page!: number;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private rolesService: RolesService
  ) {
    this.userId = this.localStorageService.get('user_id');
    this.loadAdmins();
  }

  getNum(param: string | null): number {
    if (param) {
      return parseInt(param);
    }
    return 100;
  }

  private loadAdmins(): void {
    let errorResponse: any;

    this.adminService.getAdmins().subscribe(
      (admins: AdminDTO[]) => {
        this.admins = admins;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  getRolName(rol_id: number): Observable<string> {
    if (this.cachedRoles[rol_id]) {
      return this.cachedRoles[rol_id];
    } else {
      const role$ = this.rolesService.getRolById(rol_id).pipe(
        tap(() => console.log('Obteniendo nombre del rol')),
        map((rol: RolesDTO) => {
          console.log('Rol obtenido:', rol);
          return rol.name;
        }),
        catchError((error) => {
          console.error('Error obteniendo el nombre del rol:', error);
          return of('Error al obtener el nombre del rol');
        })
      );

      this.cachedRoles[rol_id] = role$;
      return role$;
    }
  }

  createAdmin(): void {
    this.router.navigateByUrl('/admins/item/');
  }

  updateAdmin(adminId: number | undefined): void {
    this.router.navigateByUrl('/admins/item/' + adminId);
  }

  deleteAdmin(adminId: number | undefined): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    // show confirmation popup
    let result = confirm(
      'Confirma elminar el registro con ID: ' + adminId + ' .'
    );
    if (result) {
      if (adminId) {
        this.adminService
          .deleteAdmin(adminId)
          .pipe(
            finalize(async () => {
              await this.sharedService.managementToast(
                'apiAlert',
                responseOK,
                errorResponse,
                response
              );

              if (responseOK) {
                this.router.navigateByUrl('admins');
              }
            })
          )
          .subscribe(
            (rowsAffected: deleteResponse) => {
              if (rowsAffected.affected > 0) {
                response = rowsAffected;
                responseOK = true;
                this.loadAdmins();
              }
            },
            (error: HttpErrorResponse) => {
              errorResponse = error.error;
              this.sharedService.errorLog(errorResponse);
            }
          );
      } else {
        alert('No puedes eliminar el registro');
      }
    }
  }
}
