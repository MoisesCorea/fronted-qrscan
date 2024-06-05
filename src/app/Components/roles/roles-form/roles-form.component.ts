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
import { RolesDTO } from 'src/app/Models/roles.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { RolesService } from 'src/app/Services/roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent implements OnInit {
  rol: RolesDTO;

  name: UntypedFormControl;
  description: UntypedFormControl;

  rolForm: UntypedFormGroup;
  isValidForm: boolean | null;

  rolesList!: RolesDTO[];

  private isUpdateMode: boolean;
  private rolId: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private rolesService: RolesService
  ) {
    this.rol = new RolesDTO(0, '', '');
    this.rolId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.rol.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.description = new UntypedFormControl(this.rol.description, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.rolForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;
    // update
    if (this.rolId) {
      this.isUpdateMode = true;

      this.rolesService.getRolById(parseInt(this.rolId)).subscribe(
        (rol: RolesDTO) => {
          this.rol = rol;

          this.name.setValue(this.rol.name);

          this.description.setValue(this.rol.description);

          this.rolForm = this.formBuilder.group({
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

  createRol(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.rolForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.rol = this.rolForm.value;

    console.log(this.rol);

    this.rolesService
      .createRol(this.rol)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.rolForm.reset();
            this.router.navigateByUrl('roles');
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

  private editRol(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    if (this.rolId) {
      this.rolesService
        .updateRol(this.rolId, this.rol)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('roles');
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

  saveRol(): void {
    this.isValidForm = false;
    if (this.rolForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.rol = this.rolForm.value;

    if (this.isUpdateMode) {
      this.editRol();
    } else {
      this.createRol();
    }
  }
}
