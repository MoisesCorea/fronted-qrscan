import { Component, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  DepartmentService,
  deleteResponse,
} from 'src/app/Services/department.service';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { finalize } from 'rxjs/operators';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  departments?: DepartmentDTO[];
  filterInput: string = '';
  page!: number;

  constructor(
    private departmentService: DepartmentService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private route: Router,
    @Inject(LoaderService) private loaderService: LoaderService
  ) {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    this.loaderService.show();
    let errorResponse: any;

    this.departmentService.getDepartments().subscribe(
      (department: DepartmentDTO[]) => {
        this.departments = department;
        this.loaderService.hide();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        this.loaderService.hide();
      }
    );
  }

  createDepartment(): void {
    this.route.navigateByUrl('/departamentos/item/');
  }

  updateDepartment(departmentId: number): void {
    this.route.navigateByUrl('/departamentos/item/' + departmentId);
  }

  deleteDepartment(departmentId: number): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    // show confirmation popup
    let result = confirm(
      'Confirma elminar el registro con ID: ' + departmentId + ' .'
    );
    if (result) {
      this.departmentService
        .deleteDepartment(departmentId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.route.navigateByUrl('departamentos');
            }
          })
        )
        .subscribe(
          (rowsAffected: deleteResponse) => {
            if (rowsAffected.affected > 0) {
              responseOK = true;
              response = rowsAffected;
              this.loadDepartments();
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
