import { Component, Input } from '@angular/core';
import { CardDTO } from 'src/app/Models/card.dto';
import { DepartmentDTO } from 'src/app/Models/department.dto';
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { ShiftService } from 'src/app/Services/shift.service';
import { DepartmentService } from 'src/app/Services/department.service';
import { SharedService } from 'src/app/Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserDTO } from 'src/app/Models/user.dto';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  private cachedDepartments: { [department_id: number]: Observable<string> } =
    {};
  constructor(
    private shiftService: ShiftService,
    private departmentService: DepartmentService,
    private sharedService: SharedService
  ) {}

  @Input() item: UserDTO = {
    id: '',
    name: '',
    last_name: '',
    age: 0,
    gender: '',
    email: '',
    address: '',
    phone_number: 0,
    profile_image: '',
    shift_id: 0,
    department_id: 0,
    qr_image: '',
    status: '',
  };

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
