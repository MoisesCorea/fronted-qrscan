import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/Models/user.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { UserService } from 'src/app/Services/user.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  user!: UserDTO;
  private cachedDepartments: { [department_id: number]: Observable<string> } =
    {};

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.userService.getUserById(id).subscribe(
        (user: UserDTO) => {
          this.user = user;
        },
        (error: HttpErrorResponse) => {
          const errorResponse = error.error;
          console.log(errorResponse);
        }
      );
    }
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
