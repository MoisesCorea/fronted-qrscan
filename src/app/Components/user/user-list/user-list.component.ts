import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService, deleteResponse } from 'src/app/Services/user.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { ShiftService } from 'src/app/Services/shift.service';
import { UserDTO } from 'src/app/Models/user.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { SharedService } from 'src/app/Services/shared.service';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  users?: UserDTO[];
  private cachedDepartments: { [department_id: number]: Observable<string> } =
    {};
  private cachedShifts: { [shift_id: number]: Observable<string> } = {};

  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private departmentService: DepartmentService,
    private shiftService: ShiftService,
    private route: Router
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

  getDepartmentName(department_id: number): Observable<string> {
    if (this.cachedDepartments[department_id]) {
      return this.cachedDepartments[department_id];
    } else {
      const department$ = this.departmentService
        .getDepartmentById(department_id)
        .pipe(
          tap(() => console.log('Obteniendo nombre del rol')),
          map((department: DepartmentDTO) => {
            console.log('Rol obtenido:', department);
            return department.name;
          }),
          catchError((error) => {
            console.error('Error obteniendo el nombre del rol:', error);
            return of('Error al obtener el nombre del rol');
          })
        );

      this.cachedDepartments[department_id] = department$;
      return department$;
    }
  }

  getShiftName(shift_id: number): Observable<string> {
    if (this.cachedShifts[shift_id]) {
      return this.cachedShifts[shift_id];
    } else {
      const shift$ = this.shiftService.getShiftById(shift_id).pipe(
        tap(() => console.log('Obteniendo nombre del turno')),
        map((shift: ShiftDTO) => {
          console.log('Rol obtenido:', shift);
          return shift.name;
        }),
        catchError((error) => {
          console.error('Error obteniendo el nombre del rol:', error);
          return of('Error al obtener el nombre del rol');
        })
      );

      this.cachedShifts[shift_id] = shift$;
      return shift$;
    }
  }

  createUser(): void {
    this.route.navigateByUrl('/usuario/item/');
  }

  updateUser(rolId: string): void {
    this.route.navigateByUrl('/usuario/item/' + rolId);
  }

  deleteUser(userId: string): void {
    let errorResponse: any;

    // show confirmation popup
    let result = confirm('Confirm delete category with id: ' + userId + ' .');
    if (result) {
      this.userService.deleteUser(userId).subscribe(
        (rowsAffected: deleteResponse) => {
          if (rowsAffected.affected > 0) {
            this.loadUsers();
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
