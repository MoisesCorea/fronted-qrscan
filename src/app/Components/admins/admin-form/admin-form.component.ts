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
import { AdminDTO } from 'src/app/Models/admin.dto';
import { RolesDTO } from 'src/app/Models/roles.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { AdminService } from 'src/app/Services/admin.service';
import { RolesService } from 'src/app/Services/roles.service';

@Component({
  selector: 'app-register',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
})
export class AdminFormComponent implements OnInit {
  admin: AdminDTO;

  name: UntypedFormControl;
  last_name: UntypedFormControl;
  email: UntypedFormControl;
  alias: UntypedFormControl;
  password: UntypedFormControl;
  roles: UntypedFormControl;

  adminForm: UntypedFormGroup;
  isValidForm: boolean | null;

  rolesList!: RolesDTO[];

  private isUpdateMode: boolean;
  private adminId?: string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private sharedService: SharedService,
    private router: Router,
    private rolesService: RolesService
  ) {
    this.admin = new AdminDTO('', '', '', '', '', 0);
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.admin.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.last_name = new UntypedFormControl(this.admin.last_name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.email = new UntypedFormControl(this.admin.email, [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.alias = new UntypedFormControl(this.admin.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]);

    this.password = new UntypedFormControl(this.admin.password, []);

    this.roles = new UntypedFormControl(null, []);

    // get roles by admins and load multi select
    this.loadRoles();

    this.adminForm = this.formBuilder.group({
      name: this.name,
      last_name: this.last_name,
      email: this.email,
      alias: this.alias,
      password: this.password,
      rol_id: this.roles,
    });
  }

  ngOnInit(): void {
    this.adminId = this.activatedRoute.snapshot.paramMap.get('id');
    this.isUpdateMode = !!this.adminId; // Determinar el modo de actualización
    // update
    if (this.isUpdateMode) {
      this.loadAdmin();
    } else {
      // Aplicar validadores para el modo de creación
      this.password.setValidators([
        Validators.required,
        Validators.minLength(8),
      ]);
      this.password.updateValueAndValidity(); // Actualizar el estado del control
    }
  }

  loadAdmin(): void {
    let errorResponse: any;

    if (this.adminId) {
      this.adminService.getAdminById(this.adminId).subscribe(
        (admin: AdminDTO) => {
          this.admin = admin;

          this.name.setValue(this.admin.name);

          this.last_name.setValue(this.admin.last_name);

          this.email.setValue(this.admin.email);

          this.alias.setValue(this.admin.alias);

          this.roles.setValue(this.admin.rol_id);

          this.adminForm = this.formBuilder.group({
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            alias: this.alias,
            password: this.password,
            rol_id: this.roles,
          });
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
        }
      );
    }
  }

  private loadRoles(): void {
    let errorResponse: any;

    this.rolesService.getRoles().subscribe(
      (roles: RolesDTO[]) => {
        this.rolesList = roles;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  private editAdmin(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    if (this.adminId) {
      this.adminService
        .updateAdmin(this.adminId, this.admin)
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

  createAdmin(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.adminForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.admin = this.adminForm.value;

    console.log(this.admin);

    this.adminService
      .register(this.admin)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.adminForm.reset();
            this.router.navigateByUrl('admins');
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

  saveAdmin(): void {
    this.isValidForm = false;
    if (this.adminForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.admin = this.adminForm.value;

    if (this.isUpdateMode) {
      this.editAdmin();
    } else {
      this.createAdmin();
    }
  }
}
