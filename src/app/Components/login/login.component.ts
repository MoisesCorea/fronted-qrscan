import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthDTO } from 'src/app/Models/auth.dto';
import { HeaderMenus } from 'src/app/Models/header-menus.dto';
import { AuthService, AuthToken } from 'src/app/Services/auth.service';
import { HeaderMenusService } from 'src/app/Services/header-menus.service';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUser: AuthDTO;
  email: UntypedFormControl;
  password: UntypedFormControl;
  loginForm: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.loginUser = new AuthDTO(0, '', '', '', '');

    this.email = new UntypedFormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    let responseOK: boolean = false;
    let errorResponse: any;
    let response: any;

    this.loginUser.email = this.email.value;
    this.loginUser.password = this.password.value;

    this.authService
      .login(this.loginUser)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            const isAuthenticated = this.authService.isAuthenticated();
            this.headerMenusService.updateHeaderMenus(isAuthenticated);
            this.router.navigateByUrl('dashboard');
          }
        })
      )
      .subscribe(
        (resp: AuthToken) => {
          response = resp;
          responseOK = true;
          this.loginUser.user_id = resp.user_id;
          this.loginUser.access_token = resp.access_token;
          this.loginUser.rol = resp.rol;

          this.localStorageService.set('user_id', `${this.loginUser.user_id}`);
          this.localStorageService.set(
            'access_token',
            this.loginUser.access_token
          );
          this.localStorageService.set('rol', `${this.loginUser.rol}`);
        },
        (error: HttpErrorResponse) => {
          responseOK = false;
          errorResponse = error.error;

          const isAuthenticated = this.authService.isAuthenticated();
          this.headerMenusService.updateHeaderMenus(isAuthenticated);

          this.sharedService.errorLog(error.error);
        }
      );
  }
}
