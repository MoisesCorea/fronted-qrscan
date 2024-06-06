import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RolesService, deleteResponse } from 'src/app/Services/roles.service';
import { RolesDTO } from 'src/app/Models/roles.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/Services/loader.service';

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
    private route: Router,
    @Inject(LoaderService) private loaderService: LoaderService
  ) {
    this.loadRoles();
  }

  private loadRoles(): void {
    this.loaderService.show();
    let errorResponse: any;

    this.rolesService.getRoles().subscribe(
      (roles: RolesDTO[]) => {
        this.roles = roles;
        this.loaderService.hide();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        this.loaderService.hide();
      }
    );
  }

  createRol(): void {
    this.route.navigateByUrl('/roles/item/');
  }

  updateRol(rolId: number): void {
    this.route.navigateByUrl('/roles/item/' + rolId);
  }

  deleteRol(rolId: number): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;
    // show confirmation popup
    let result = confirm(
      'Confirma elminar el registro con ID: ' + rolId + ' .'
    );
    if (result) {
      this.rolesService
        .deleteRol(rolId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.route.navigateByUrl('roles');
            }
          })
        )
        .subscribe(
          (rowsAffected: deleteResponse) => {
            if (rowsAffected.affected > 0) {
              response = rowsAffected;
              responseOK = true;
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
