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
import { UserDTO } from 'src/app/Models/user.dto';
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';
import { ShiftService } from 'src/app/Services/shift.service';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: UserDTO;
  shiftsList?: ShiftDTO[];
  departmentsList?: DepartmentDTO[];

  statusOptions = [
    { label: 'Activo', value: 'Activo' },
    { label: 'Inactivo', value: 'Inactivo' },
  ];

  genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Femenino', value: 'Femenino' },
    { label: 'Otro', value: 'Otro' },
  ];

  file: any;

  name: UntypedFormControl;
  last_name: UntypedFormControl;
  age: UntypedFormControl;
  gender: UntypedFormControl;
  email: UntypedFormControl;
  address: UntypedFormControl;
  phone_number: UntypedFormControl;
  profile_image: UntypedFormControl;
  shift_id: UntypedFormControl;
  department_id: UntypedFormControl;
  status: UntypedFormControl;

  userForm: UntypedFormGroup;
  isValidForm: boolean | null;

  private isUpdateMode: boolean;
  private userId?: string | null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService,
    private shiftService: ShiftService,
    private departmentService: DepartmentService
  ) {
    this.user = new UserDTO('', '', '', 0, '', '', '', 0, '', '', 0, 0, '');
    this.isUpdateMode = false;
    this.isValidForm = null;

    this.name = new UntypedFormControl(this.user.name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.last_name = new UntypedFormControl(this.user.last_name, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.age = new UntypedFormControl('', [Validators.required]);

    this.gender = new UntypedFormControl(null, []);

    this.email = new UntypedFormControl(this.user.email, [
      Validators.required,
      Validators.maxLength(255),
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.address = new UntypedFormControl(this.user.address, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]);

    this.phone_number = new UntypedFormControl('', [
      Validators.required,
      Validators.max(999999999999999),
    ]);

    this.profile_image = new UntypedFormControl(
      null,
      this.isUpdateMode ? [] : [Validators.required]
    );

    this.shift_id = new UntypedFormControl(null, []);

    this.loadshifts();

    this.department_id = new UntypedFormControl(null, []);

    this.loadDepartments();

    this.status = new UntypedFormControl(null, []);

    this.userForm = this.formBuilder.group({
      name: this.name,
      last_name: this.last_name,
      age: this.age,
      gender: this.gender,
      email: this.email,
      address: this.address,
      phone_number: this.phone_number,
      profile_image: this.profile_image,
      shift_id: this.shift_id,
      department_id: this.department_id,
      status: this.status,
    });
  }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');

    this.userId ? (this.isUpdateMode = true) : (this.isUpdateMode = false);
    this.loadUser();
  }

  private loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (user: UserDTO) => {
          this.user = user;

          this.name.setValue(this.user.name);
          this.last_name.setValue(this.user.last_name);
          this.age.setValue(this.user.age);
          this.gender.setValue(this.user.gender);
          this.email.setValue(this.user.email);
          this.address.setValue(this.user.address);
          this.phone_number.setValue(this.user.phone_number);
          this.shift_id.setValue(this.user.shift_id);
          this.department_id.setValue(this.user.department_id);
          this.status.setValue(this.user.status);

          this.userForm = this.formBuilder.group({
            name: this.name,
            last_name: this.last_name,
            age: this.age,
            gender: this.gender,
            email: this.email,
            address: this.address,
            phone_number: this.phone_number,
            profile_image: null,
            shift_id: this.shift_id,
            department_id: this.department_id,
            status: this.status,
          });
        },
        (error: HttpErrorResponse) => {
          const errorResponse = error.error;
          console.log(errorResponse);
        }
      );
    }
  }

  private loadshifts(): void {
    let errorResponse: any;

    this.shiftService.getShifts().subscribe(
      (shifts: ShiftDTO[]) => {
        this.shiftsList = shifts;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  private loadDepartments(): void {
    let errorResponse: any;

    this.departmentService.getDepartments().subscribe(
      (departments: DepartmentDTO[]) => {
        this.departmentsList = departments;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  createUser(): void {
    let responseOK: boolean = false;
    this.isValidForm = false;
    let errorResponse: any;
    let response: any;

    if (this.userForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.user = this.userForm.value;

    let formData = this.getFormData(this.user);

    this.userService
      .createUser(formData)
      .pipe(
        finalize(async () => {
          await this.sharedService.managementToast(
            'apiAlert',
            responseOK,
            errorResponse,
            response
          );

          if (responseOK) {
            this.userForm.reset();
            this.router.navigateByUrl('usuarios');
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

  private editUser(): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    let formData = this.getFormData(this.user);

    if (this.userId) {
      this.userService
        .updateUser(this.userId, formData)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.router.navigateByUrl('usuarios');
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

  onFileChange(event: any): void {
    try {
      this.file = event.target.files[0];
      console.log(this.file);
    } catch (error) {
      console.error('Error al manejar el cambio de archivo:', error);
    }
  }

  getFormData(data: any): FormData {
    const formData = new FormData();

    if (this.file) {
      formData.append('profile_image', this.file, this.file.name);
    }

    formData.append('name', this.user.name);
    formData.append('last_name', this.user.last_name);
    formData.append('age', this.user.age.toString());
    formData.append('gender', this.user.gender);
    formData.append('email', this.user.email);
    formData.append('address', this.user.address);
    formData.append('phone_number', this.user.phone_number.toString());
    formData.append('shift_id', this.user.shift_id.toString());
    formData.append('department_id', this.user.department_id.toString());
    formData.append('status', this.user.status.toString());

    return formData;
  }

  saveUser(): void {
    this.isValidForm = false;
    if (this.userForm.invalid) {
      return;
    }

    this.isValidForm = true;
    this.user = this.userForm.value;

    if (this.isUpdateMode) {
      this.editUser();
    } else {
      this.createUser();
    }
  }
}
