import { Component, Inject } from '@angular/core';
import { UserDTO } from 'src/app/Models/user.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { UserService } from 'src/app/Services/user.service';
import { SharedService } from 'src/app/Services/shared.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ShiftService } from 'src/app/Services/shift.service';
import { catchError, map, tap } from 'rxjs/operators';
import { CardDTO } from 'src/app/Models/card.dto';
import { LoaderService } from 'src/app/Services/loader.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UsersCardComponent {
  users?: UserDTO[];
  department?: DepartmentDTO;
  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  private cachedDepartments: { [department_id: number]: Observable<string> } =
    {};

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private shiftService: ShiftService,
    private departmentService: DepartmentService,
    @Inject(LoaderService) private loaderService: LoaderService
  ) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loaderService.show();
    let errorResponse: any;

    this.userService.getUsers().subscribe(
      (users: UserDTO[]) => {
        this.users = users;
        this.loaderService.hide();
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
        this.loaderService.hide();
      }
    );
  }

  convertToCardDTO(user: UserDTO): UserDTO {
    return {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      age: user.age,
      gender: user.gender,
      email: user.email,
      address: user.address,
      phone_number: user.phone_number,
      profile_image: user.profile_image,
      shift_id: user.shift_id,
      department_id: user.department_id,
      qr_image: user.qr_image,
      status: user.status,
    };
  }

  getDepartmentName(department_id: any): Observable<string> {
    if (this.cachedDepartments[department_id]) {
      return this.cachedDepartments[department_id];
    } else {
      const departmentObservable = this.departmentService
        .getDepartmentById(department_id)
        .pipe(
          map((department: DepartmentDTO) => department.name),
          catchError((error) => {
            console.error(
              'Error obteniendo el nombre del departamento:',
              error
            );
            return of('Error al obtener el nombre del departamento');
          })
        );

      this.cachedDepartments[department_id] = departmentObservable;

      return departmentObservable;
    }
  }
}
