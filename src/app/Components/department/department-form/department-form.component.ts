import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent implements OnInit {
  department: DepartmentDTO;

  name: UntypedFormControl;
  description: UntypedFormControl;

  departmentForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private departmentId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private departmentService: DepartmentService
  ) {
    this.department = new DepartmentDTO(0, '', '');
    this.departmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.department.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.description = new UntypedFormControl(this.department.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.departmentForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;
    // update
    if (this.departmentId) {
      this.isUpdateMode = true;

      this.departmentService
        .getDepartmentById(parseInt(this.departmentId))
        .subscribe(
          (rol: DepartmentDTO) => {
            this.department = rol;

            this.name.setValue(this.department.name);

            this.description.setValue(this.department.description);

            this.departmentForm = this.formBuilder.group({
              name: this.name,
              description: this.description,
            });
          },
          (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }

  createDepartment(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.departmentForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.department = this.departmentForm.value;

    console.log(this.department);

    this.departmentService
      .createDepartment(this.department)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.departmentForm.reset();
            this.router.navigateByUrl('departamentos');
          }
        })
      )
      .subscribe(
        (data) => {
          response = data;
          responseOK = true;
        },
        (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
  }

  private editDepartment(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    if (this.departmentId) {
      this.departmentService
        .updateDepartment(this.departmentId, this.department)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('departamentos');
            }
          })
        )
        .subscribe(
          (data) => {
            response = data;
            responseOK = true;
          },
          (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }

  saveDepartment(): void {
    this.isValidForm = false;
    if (this.departmentForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.department = this.departmentForm.value;

    if (this.isUpdateMode) {
      this.editDepartment();
    } else {
      this.createDepartment();
    }
  }
}
