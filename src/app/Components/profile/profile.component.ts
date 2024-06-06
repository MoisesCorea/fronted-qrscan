import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { AdminDTO } from 'src/app/Models/admin.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { AdminService } from 'src/app/Services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileUser: AdminDTO;

  isEnabled: boolean = false;

  name: UntypedFormControl;
  last_name: UntypedFormControl;
  email: UntypedFormControl;
  alias: UntypedFormControl;
  current_password: UntypedFormControl;
  new_password: UntypedFormControl;
  confirm_password: UntypedFormControl;

  profileForm: UntypedFormGroup;
  passwordForm: UntypedFormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router,
    @Inject(LoaderService) private loaderService: LoaderService
  ) {
    this.profileUser = new AdminDTO('', '', '', '', '', 0);

    this.isValidForm = null;

    this.name = new UntypedFormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.last_name = new UntypedFormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);

    this.email = new UntypedFormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.alias = new UntypedFormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.current_password = new UntypedFormControl('', Validators.required);
    this.new_password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);
    this.confirm_password = new UntypedFormControl('', Validators.required);

    this.profileForm = this.formBuilder.group({
      name: this.name,
      last_name: this.last_name,
      email: this.email,
      alias: this.alias,
    });

    this.passwordForm = this.formBuilder.group({
      current_password: this.current_password,
      new_password: this.new_password,
      new_password_confirmation: this.confirm_password,
    });
  }

  ngOnInit(): void {
    let errorResponse: any;

    // load user data
    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.loaderService.show();

      this.adminService.getAdminById(userId).subscribe(
        (userData: AdminDTO) => {
          this.name.setValue(userData.name);
          this.last_name.setValue(userData.last_name);
          this.email.setValue(userData.email);
          this.alias.setValue(userData.alias);

          this.profileForm = this.formBuilder.group({
            name: this.name,
            last_name: this.last_name,
            email: this.email,
            alias: this.alias,
          });
          this.loaderService.hide();
        },
        (error: HttpErrorResponse) => {
          errorResponse = error.error;
          this.sharedService.errorLog(errorResponse);
          this.loaderService.hide();
        }
      );
    }
  }

  updateUser(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.profileForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.profileUser = this.profileForm.value;

    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.adminService
        .updateAdmin(userId, this.profileUser)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('perfil');
            }
          })
        )
        .subscribe(
          (data) => {
            response = data;
            responseOK = true;
            this.toggleDisabled();
          },
          (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
            this.loaderService.hide();
          }
        );
    }
  }

  onSubmitPassword(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.passwordForm.invalid) {
      return;
    }

    this.isValidForm = true;

    this.adminService
      .changePassword(this.passwordForm.value)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.passwordForm.reset();
            this.router.navigateByUrl('perfil');
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

  toggleDisabled(): void {
    Object.keys(this.profileForm.controls).forEach((controlName) => {
      const control = this.profileForm.get(controlName);

      if (control?.disabled) {
        control?.enable();
      } else {
        control?.disable();
      }
    });
  }

  isFormDisabled(): boolean {
    return Object.keys(this.profileForm.controls).every(
      (controlName) => this.profileForm.get(controlName)?.disabled
    );
  }
}
