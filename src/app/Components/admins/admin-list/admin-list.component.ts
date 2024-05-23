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
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent {
  admins?: AdminDTO[];
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
    this.loadAdmins();
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
    this.router.navigateByUrl('/admin/item/');
  }

  updateAdmin(adminId: number | undefined): void {
    this.router.navigateByUrl('/admin/item/' + adminId);
  }

  deleteAdmin(adminId: number | undefined): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete category with id: ' + adminId + ' .');
    if (result) {
      if (adminId) {
        console.log('entramos al if del admin');
        this.adminService.deleteAdmin(adminId).subscribe(
          (rowsAffected: deleteResponse) => {
            if (rowsAffected.affected > 0) {
              console.log('Llegamos a las filas afectadas');
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
