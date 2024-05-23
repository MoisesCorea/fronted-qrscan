import { Component } from '@angular/core';
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
    private departmentService: DepartmentService
  ) {
    this.loadUsers();
  }

  private loadUsers(): void {
    let errorResponse: any;

    this.userService.getUsers().subscribe(
      (users: UserDTO[]) => {
        this.users = users;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
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
}
