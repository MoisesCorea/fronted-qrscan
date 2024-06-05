import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShiftService, deleteResponse } from 'src/app/Services/shift.service';
import { ShiftDTO } from 'src/app/Models/shift.dto';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { SharedService } from 'src/app/Services/shared.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.scss'],
})
export class ShiftListComponent {
  shifts?: ShiftDTO[];
  filterInput: string = ''; //PipeFilter
  page!: number; // pagination

  weekDays = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miercoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
  ];

  constructor(
    private shiftService: ShiftService,
    private localStorageService: LocalStorageService,
    private sharedService: SharedService,
    private route: Router
  ) {
    this.loadShifts();
  }

  private loadShifts(): void {
    let errorResponse: any;

    this.shiftService.getShifts().subscribe(
      (shifts: ShiftDTO[]) => {
        this.shifts = shifts;
      },
      (error: HttpErrorResponse) => {
        errorResponse = error.error;
        this.sharedService.errorLog(errorResponse);
      }
    );
  }

  createShift(): void {
    this.route.navigateByUrl('/turno/item/');
  }

  updateShift(rolId: number): void {
    this.route.navigateByUrl('/turno/item/' + rolId);
  }

  deleteShift(shiftId: number): void {
    let errorResponse: any;
    let responseOK: boolean = false;
    let response: any;

    // show confirmation popup
    let result = confirm(
      'Confirma elminar el registro con ID: ' + shiftId + ' .'
    );
    if (result) {
      this.shiftService
        .deleteShift(shiftId)
        .pipe(
          finalize(async () => {
            await this.sharedService.managementToast(
              'apiAlert',
              responseOK,
              errorResponse,
              response
            );

            if (responseOK) {
              this.route.navigateByUrl('turnos');
            }
          })
        )
        .subscribe(
          (rowsAffected: deleteResponse) => {
            if (rowsAffected.affected > 0) {
              response = rowsAffected;
              responseOK = true;
              this.loadShifts();
            }
          },
          (error: HttpErrorResponse) => {
            errorResponse = error.error;
            this.sharedService.errorLog(errorResponse);
          }
        );
    }
  }

  daysOfWork(ids: string): string {
    let workingDaysArray: number[] = JSON.parse(ids);
    let dayNames = workingDaysArray.map((id) => {
      let day = this.weekDays.find((day) => day.id === id);
      return day ? day.name : '';
    });

    return dayNames.filter((name) => name).join(', ');
  }
}
