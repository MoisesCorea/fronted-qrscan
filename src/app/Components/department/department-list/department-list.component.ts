import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  DepartmentService,
  deleteResponse,
} from 'src/app/Services/department.service';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

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
    private route: Router
  ) {
    this.loadDepartments();
  }

  private loadDepartments(): void {
    let errorResponse: any;

    this.departmentService.getDepartments().subscribe(
      (department: DepartmentDTO[]) => {
        this.departments = department;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  createDepartment(): void {
    this.route.navigateByUrl('/departamento/item/');
  }

  updateDepartment(departmentId: number): void {
    this.route.navigateByUrl('/departamento/item/' + departmentId);
  }

  deleteDepartment(departmentId: number): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm(
      'Confirm delete department with id: ' + departmentId + ' .'
    );
    if (result) {
      this.departmentService.deleteDepartment(departmentId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            console.log('Llegamos a las filas afectadas');
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
