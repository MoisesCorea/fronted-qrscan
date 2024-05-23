import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RolesService, deleteResponse } from 'src/app/Services/roles.service';
import { RolesDTO } from 'src/app/Models/roles.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent {
  roles?: RolesDTO[];

  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  constructor(
    private rolesService: RolesService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private route: Router
  ) {
    this.loadRoles();
  }

  private loadRoles(): void {
    let errorResponse: any;

    this.rolesService.getRoles().subscribe(
      (roles: RolesDTO[]) => {
        this.roles = roles;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  createRol(): void {
    this.route.navigateByUrl('/rol/item/');
  }

  updateRol(rolId: number): void {
    this.route.navigateByUrl('/rol/item/' + rolId);
  }

  deleteRol(adminId: number): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete category with id: ' + adminId + ' .');
    if (result) {
      this.rolesService.deleteRol(adminId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            console.log('Llegamos a las filas afectadas');
            this.loadRoles();
          }
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }
}
